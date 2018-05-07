import React from 'react';
import moment from 'moment';

class OfflineStreamInfo extends React.Component {
  render() {

    const {details} = this.props;
    let startTime = details.created_at.replace(/[A-z]/,'')
  	startTime = moment(startTime, 'YYYY-MM-DDHH:mm:SS');
  	let now =  moment();
  	var duration = moment.duration(startTime.diff(now)).humanize();

    return (
      <div id={this.props.index}>
        <ul>
          <a href={details.url}><li>{details.display_name}</li></a>
          <li>{details.game}</li>
          <li>{details.status}</li>
          <img src={details.logo} alt={details.display_name} />
        </ul>
      </div>
    )
  }
}

export default OfflineStreamInfo;