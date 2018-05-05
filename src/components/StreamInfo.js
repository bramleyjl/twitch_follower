import React from 'react';

class StreamInfo extends React.Component {
  render() {

  	const {index, details} = this.props;
    
    return (
    	<div>
    		<p>{index}</p>
    		<p>{details.name}</p>
    		<p>{details.channelLink}</p>
    		<p>{details.streamLink}</p>
    	</div>
    )
  }
}

export default StreamInfo;