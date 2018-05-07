import React from 'react';
import moment from 'moment';

class LiveStreamInfo extends React.Component {
  render() {

  	const {details} = this.props;

    return (
    	<div class="card liveStream" id={this.props.index}>
        <div class="card-body">
  				  <a href={details.channel.url}>
              <img src={details.preview.medium} class="mx-auto rounded img-fluid" alt={this.props.index} />
              <h6 class="card-img-overlay live-stream">{details.game}</h6>
            </a>
          <h5 class="card-title live-stream">{details.channel.display_name}</h5>
          <p class="card-text">{details.channel.status}</p>
        </div>
      </div>
    )
  }
}

export default LiveStreamInfo;