import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import OnlineStreams from './OnlineStreams';
import OfflineStreams from './OfflineStreams';

class App extends Component {
  constructor() {
    super();
    this.showAll = this.showAll.bind(this);
    this.showLive = this.showLive.bind(this);
    this.showOffline = this.showOffline.bind(this);
    this.state = {
      liveChannels: {},
      offlineChannels: {},
      showLive: true,
      showOffline: true,
    }
  }

  componentWillMount() {
    this.streamsLookup();
  }

  showAll() {
    this.setState({showLive: true, showOffline: true})
  }

  showLive() {
    this.setState({showLive: true, showOffline: false})
  }

  showOffline() {
    this.setState({showLive: false, showOffline: true})
  }

  streamsLookup() {
    let liveChannels = this.state.liveChannels;
    let offlineChannels = this.state.offlineChannels;
    let channelList = {};
    let streamPromises = [];
    const kraken = axios.create({
      baseURL: 'https://api.twitch.tv/kraken/',
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    });

    kraken.get('users/' + process.env.REACT_APP_USER_ID + '/follows/channels?sortby=last_broadcast&limit=100')
    .then((results) => {
      results.data.follows.forEach((response) => {
        channelList[response.channel._id] = response.channel;
        streamPromises.push(kraken.get('streams/' + response.channel._id));
      });
      return axios.all(streamPromises);
    })
    .then((results) => {
      results.forEach((response) => {
        if (response.data.stream !== null) {
          liveChannels[response.data.stream.channel.name] = response.data.stream
        } else {
          var idRegExp = /(?<=streams\/)\d+/;
          var channelId = idRegExp.exec(response.request.responseURL)[0];
          let channel = channelList[channelId];
          offlineChannels[channel.name] = channel;
        }
      });
      this.setState({
        liveChannels: liveChannels,
        offlineChannels: offlineChannels
      });
    });
  }

  render() {
    return (
      <div className="App">
        <nav id="primary-nav" className="navbar navbar-default sticky-top">
          <div className="navbar-nav navbar-left">
            <a href="https://github.com/bramleyjl/twitch_follower">
              <h1 className="App-title" data-toggle="tooltip" data-placement="bottom" title="View on GitHub">
              Twitch Follower</h1>
            </a>
          </div>
          <div className="navbar-nav navbar-right">
            <button className={(this.state.showLive && this.state.showOffline) ? "App-subtitle-selected" : "App-subtitle"} onClick={this.showAll}>All</button>
            <button className={(this.state.showLive && !this.state.showOffline) ? "App-subtitle-selected" : "App-subtitle"} onClick={this.showLive}>Live</button>
            <button className={(!this.state.showLive && this.state.showOffline) ? "App-subtitle-selected" : "App-subtitle"} onClick={this.showOffline}>Offline</button>
          </div>
        </nav>
        <div className="container">
          { this.state.showLive ? <OnlineStreams liveChannels={this.state.liveChannels} /> : null }
          { this.state.showOffline ? <OfflineStreams offlineChannels={this.state.offlineChannels} /> : null }
        </div>
      </div>
    );
  }
}

export default App;