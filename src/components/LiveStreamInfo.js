import React from 'react';

class LiveStreamInfo extends React.Component {
  render() {

  	const {details} = this.props;

    return (
    	<div className="card" id={this.props.index}>
			  <a href={details.channel.url}>
          <img src={details.preview.medium} className="img-fluid mx-auto rounded" alt={this.props.index} />
          <h6 className="card-img-overlay live-stream">{details.game}</h6>
          <h5 className="card-title live-stream">{details.channel.display_name}</h5>
        </a>
        <div className="card-body d-flex align-items-center justify-content-center">
          <p className="card-text">{details.channel.status}</p>
        </div>
      </div>
    )
  }
}

export default LiveStreamInfo;