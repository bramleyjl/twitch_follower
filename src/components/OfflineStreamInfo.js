import React from 'react';

class OfflineStreamInfo extends React.Component {
  render() {

    const {details} = this.props;

    return (
      <div className="card hoverable" id={this.props.index}>
          <a href={details.url}>
            <img src={details.video_banner} className="img-fluid mx-auto rounded" alt={this.props.index} />
            <h5 className="card-title offline-stream">{details.display_name}</h5>
          </a>
        <div className="card-body d-flex align-items-center justify-content-center">
          <p className="card-text">{details.status}</p>
        </div>
      </div>
    )
  }
}

export default OfflineStreamInfo;