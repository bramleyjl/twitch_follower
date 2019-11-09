import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import UserLookup from './UserLookup';
import OnlineStreams from './OnlineStreams';
import OfflineStreams from './OfflineStreams';

class App extends Component {
  constructor() {
    super();
    this.showAll = this.showAll.bind(this);
    this.showLive = this.showLive.bind(this);
    this.showOffline = this.showOffline.bind(this);
    this.state = {
      userName: '',
      userLookup: '',
      liveChannels: {},
      offlineChannels: {},
      showLive: true,
      showOffline: true,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  componentWillMount() {
    this.streamsLookup(process.env.REACT_APP_USER_ID);
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

  getKraken() {
    const kraken = axios.create({
      baseURL: 'https://api.twitch.tv/kraken/',
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    });
    return kraken;    
  }

  streamsLookup(userId) {
    let liveChannels = {};
    let offlineChannels = {};
    let channelList = {};
    let streamPromises = [];
    let kraken = this.getKraken();

    kraken.get('users/' + userId)
    .then((results) => {
      let name = results.data.display_name ? results.data.display_name : results.data.name;
      this.setState({
        userName: name,
        userDisplay: 'User: ' + name 
      });
    })
    kraken.get('users/' + userId + '/follows/channels?sortby=last_broadcast&limit=100')
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

  onFormSubmit(e) {
    e.preventDefault()
    let kraken = this.getKraken();
    kraken.get('users?login=' + this.state.userLookup)
    .then((results) => {
      if (results.data.users.length !== 0) {
        this.streamsLookup(results.data.users[0]._id);
      } else {
        this.setState({
          userDisplay: 'User ' + this.state.userLookup + ' not found.'
        });
      }
    });
  }

  onTextChange(e) {
    this.setState({userLookup: e.target.value})
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

        <div className="navbar-nav">
          <form onSubmit={this.onFormSubmit}>
            <span className="user-select">{this.state.userDisplay}</span>
            <UserLookup user={this.state.userName} onTextChange={this.onTextChange} />
            <button type='submit'>Find User</button>
          </form>
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