import React from 'react';
import logo from '../images/twitch-background.jpg';

class OfflineStreamInfo extends React.Component {
  render() {

    const {details} = this.props;
    if (details.video_banner === null) {
      details.video_banner = logo;
    }

    return (
      <div className="card" id={this.props.index}>
        <a href={details.url + '/videos'}>
          <img src={details.video_banner} className="img-fluid mx-auto rounded" alt={this.props.index} />
          <h6 className="card-img-overlay offline-stream">Offline</h6>          
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