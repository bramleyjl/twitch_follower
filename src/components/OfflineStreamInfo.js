import React from 'react';
import moment from 'moment';

class OfflineStreamInfo extends React.Component {
  render() {

    const {details} = this.props;

    return (
      <div class="card" id={this.props.index}>
        <div class="card-body">
          <a href={details.url}>
            <img src={details.video_banner} class="mx-auto rounded img-fluid" alt={this.props.index} />
          </a>
          <h5 class="card-title offline-stream">{details.display_name}</h5>
          <p class="card-text">{details.status}</p>
        </div>
      </div>
    )
  }
}

export default OfflineStreamInfo;