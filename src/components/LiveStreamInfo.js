import React from 'react';
import moment from 'moment';

class LiveStreamInfo extends React.Component {
  render() {

  	const {details} = this.props;
  	let startTime = details.created_at.replace(/[A-z]/,'')
  	startTime = moment(startTime, 'YYYY-MM-DDHH:mm:SS');
  	let now =  moment();
  	var duration = moment.duration(startTime.diff(now)).humanize();

    return (
    	<div id={this.props.index}>
	    	<ul>
					<a href={details.channel.url}><li>{details.channel.display_name}</li></a>
					<li>{details.game}</li>
					<li>{details.channel.status}</li>
					<li>Online for {duration}</li>
					<img src={details.preview.medium} alt={details.channel.display_name} />
    		</ul>
    	</div>
    )
  }
}

export default LiveStreamInfo;