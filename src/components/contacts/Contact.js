import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../../context';

class Contact extends Component {

  state = {
    showContactInfo: false
  }

  // this use to toggle the state
  onShowClick = (e) => {
   this.setState({
     showContactInfo: !this.state.showContactInfo
   });
  };

  // this is to use X to delete
  onDeleteClick = (id, dispatch) => {
    // calling dispatch 
    dispatch({type: 'DELETE_CONTACT', payload: id});
  };

  render() {
      // Using Destructure which extract the type from Props
      const {id, name, email, phone } = this.props.contact;
      const { showContactInfo } = this.state;



    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(
            <div className="card card-body mb-3">
              <h4>{name}
                <i onClick={this.onShowClick} className="fas fa-sort-down" style={{ cursor: 'pointer' }}></i>
                <i className="fas fa-times" style={{ cursor: 'pointer', float: 'right', color: 'red' }} onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

// Check the passed Prop types
Contact.propTypes = {
    contact: PropTypes.object.isRequired
};

export default Contact;
