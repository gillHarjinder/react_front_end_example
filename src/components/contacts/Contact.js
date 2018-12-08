import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  onDeleteClick = async (id, dispatch) => {
    // calling dispatch 
    // Thir try catch is BAD habit becasue it DELETing the Contact
    // which we ADD no matter what NEVER DO IN REAL LIFE Example
    try{
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
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
                <Link to={`contact/edit/${id}`}>
                <i className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                ></i>
                </Link>
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
