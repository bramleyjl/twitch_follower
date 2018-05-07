import React from 'react';
import LiveStreamInfo from './LiveStreamInfo'

class OnlineStreams extends React.Component {
  render() {
    return (
    	<div class="row justify-content-center liveWrapper">
            {
              Object
              .keys(this.props.liveChannels)
              .map(key => 
              		<LiveStreamInfo
                		key={key}
                		index={key}
                		details={this.props.liveChannels[key]} 
                	/>
            	)
            }
    	</div>
    )
  }
}

export default OnlineStreams;