import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import OnlineStreams from './OnlineStreams';
import OfflineStreams from './OfflineStreams';
import channelList from '../channelList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      channels: channelList
    }
  }

  render() {
    console.log(process.env.REACT_APP_TWITCH_CLIENT_ID)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Twitch Follower</h1>
        </header>
        <OnlineStreams channels={this.state.channels} />
        <OfflineStreams channels={this.state.channels} />
      </div>
    );
  }
}

export default App;
