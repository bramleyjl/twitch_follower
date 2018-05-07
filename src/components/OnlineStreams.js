import React from 'react';
import LiveStreamInfo from './LiveStreamInfo'

class OnlineStreams extends React.Component {
  render() {
    return (
    	<div>
      	<h1>OnlineStreams Are Here!</h1>
    		  <ul>
            {
              Object
              .keys(this.props.liveChannels)
              .map(key => 
              	<li>
              		<LiveStreamInfo
                		key={key}
                		index={key}
                		details={this.props.liveChannels[key]} 
                	/>
                </li>
            	)
            }
          </ul>
    	</div>
    )
  }
}

export default OnlineStreams;