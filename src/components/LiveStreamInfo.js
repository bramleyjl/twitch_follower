import React from 'react';

class LiveStreamInfo extends React.Component {
  render() {

  	const {details} = this.props;

    return (
    	<div className="card liveStream" id={this.props.index}>
        <div className="card-body">
  				  <a href={details.channel.url}>
              <img src={details.preview.medium} className="img-fluid mx-auto rounded" alt={this.props.index} />
              <h6 className="card-img-overlay live-stream">{details.game}</h6>
              <h5 className="card-title live-stream">{details.channel.display_name}</h5>
            </a>
          <p className="card-text">{details.channel.status}</p>
        </div>
      </div>
    )
  }
}

export default LiveStreamInfo;