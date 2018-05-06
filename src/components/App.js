import React, { Component } from 'react';
import logo from '../logo.svg';
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

  componentDidMount() {
    let liveChannels = this.state.liveChannels;
    let streamPromises = []
    const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
    Object.keys(this.state.channels).map( i => 
      streamPromises.push(axios.get(this.state.channels[i].streamLink + clientId)) 
    )
    axios.all(streamPromises).then((results) => {
      results.forEach((response) => {
        if (response.data.stream !== null) {
          liveChannels[response.data.stream.channel.name] = response.data.stream
        } else {
          console.log('Offline!')
        }
      })
      this.setState({liveChannels});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Twitch Follower</h1>
        </header>
        <OnlineStreams liveChannels={this.state.liveChannels} />
        {/*<OfflineStreams channels={this.state.channels} />*/}
      </div>
    );
  }
}

export default App;