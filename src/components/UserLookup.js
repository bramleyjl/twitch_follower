import React from 'react';

class UserLookup extends React.Component {
  render() {

    return (
     <input 
        type='text' 
        value={this.props.userName} 
        onChange={this.props.onTextChange}
     />
    )
  }
}

export default UserLookup;