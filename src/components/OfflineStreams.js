import React from 'react';
import OfflineStreamInfo from './OfflineStreamInfo'

class OfflineStreams extends React.Component {
  render() {
    return (
    	<div class="offlineWrapper">
      	<h2 class="offline-title">Offline Streams</h2>
            {
              Object
              .keys(this.props.offlineChannels)
              .map(key => 
                  <OfflineStreamInfo
                    key={key}
                    index={key}
                    details={this.props.offlineChannels[key]}
                  />
              )
            }
    	</div>
    )
  }
}

export default OfflineStreams;