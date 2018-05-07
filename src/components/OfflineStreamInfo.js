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
      <div class="offlineContainer" id={this.props.index}>
        <span class="streamInfo">
          <h3>{details.display_name}:</h3>
          <h5>{details.game}</h5>
          <p>{details.status}</p>
        </span>
        <span class="offlineStreamPic">
          <a href={details.url}>
            <img src={details.logo} alt={details.display_name} />
          </a>
        </span>
      </div>
    )
  }
}

export default OfflineStreamInfo;