import React from 'react';
import OfflineStreamInfo from './OfflineStreamInfo'

class OfflineStreams extends React.Component {
  render() {
    return (
    	<div>
      	<h1>OfflineStreams Are Here!</h1>
            <ul>
            {
              Object
              .keys(this.props.offlineChannels)
              .map(key => 
                <li>
                  <OfflineStreamInfo
                    key={key}
                    index={key}
                    details={this.props.offlineChannels[key]}
                  />
                </li>
              )
            }
          </ul>
    	</div>
    )
  }
}

export default OfflineStreams;