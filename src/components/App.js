import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import OnlineStreams from './OnlineStreams';
import OfflineStreams from './OfflineStreams';
import channelList from '../channelList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      channels: channelList,
      liveChannels: {},
      offlineChannels: {}
    }
  }

  componentWillMount() {
    this.streamsLookup();
  }

  streamsLookup() {
    let liveChannels = this.state.liveChannels;
    let offlineChannels = this.state.offlineChannels;
    let streamPromises = []
    const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
    Object.keys(channelList).map( i => 
      streamPromises.push(axios.get(this.state.channels[i].streamLink + clientId)) 
    )
    axios.all(streamPromises)
    .then((results) => {
      results.forEach((response) => {
        if (response.data.stream !== null) {
          liveChannels[response.data.stream.channel.name] = response.data.stream
          this.setState({liveChannels: liveChannels});
        } else {
          axios.get(response.data._links.channel + clientId)
          .then((results) => {
            offlineChannels[results.data.name] = results.data
            this.setState({offlineChannels: offlineChannels});
          })
        }
      });
    })
  }

  render() {
    return (
      <div className="App">
        <nav id="primary-nav" class="navbar navbar-default sticky-top">
          <div class="navbar-nav navbar-left">
            <h1 class="App-title">Twitch Follower</h1>
          </div>
          <div class="navbar-nav navbar-right">
              <h4 class="App-subtitle">All</h4>
              <h4 class="App-subtitle">Live</h4>
              <h4 class="App-subtitle">Offline</h4>
          </div>
        </nav>
        <div class="container">
          <OnlineStreams liveChannels={this.state.liveChannels} />
          <OfflineStreams offlineChannels={this.state.offlineChannels} />
        </div>
      </div>
    );
  }
}

export default App;