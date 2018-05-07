import React from 'react';
import moment from 'moment';

class LiveStreamInfo extends React.Component {
  render() {

  	const {details} = this.props;

  	let preview = details.preview.template
  	preview = preview.replace('{width}', '300')
  	preview = preview.replace('{height}', '300')

  	let startTime = details.created_at.replace(/[A-z]/,'')
  	startTime = moment(startTime, 'YYYY-MM-DDHH:mm:SS');
  	let now =  moment();
  	var duration = moment.duration(startTime.diff(now)).humanize();

    return (
    	<div class="liveContainer" id={this.props.index}>
    		<span class="streamInfo">
					<h3>{details.channel.display_name}:</h3>
					<h5>{details.game}</h5>
					<p>{details.channel.status}</p>
				</span>
				<span class="liveStreamPic">
					<figcaption>Online for {duration}</figcaption>
					<a href={details.channel.url}>
						<img src={details.preview.medium} alt={details.channel.display_name} />
					</a>
    		</span>
    	</div>
    )
  }
}

export default LiveStreamInfo;