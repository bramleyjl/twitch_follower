import React from 'react';
import StreamInfo from './StreamInfo'

class OnlineStreams extends React.Component {
  render() {
    return (
    	<div>
      	<h1>OnlineStreams Is Here!</h1>
    		  <ul>
            {
              Object
              .keys(this.props.channels)
              .map(key => <StreamInfo 
                key={key}
                index={key}
                details={this.props.channels[key]} />)
            }
          </ul>
    	</div>
    )
  }
}

export default OnlineStreams;