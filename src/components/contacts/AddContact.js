import React, { Component } from 'react'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

import { Consumer } from '../../context';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone } = this.state;

        // Check for Errors
        if(name === ''){
            this.setState({errors: {
                name: 'Name is Required'
            }});
            return;
        }

        if (email === '') {
            this.setState({
                errors: {
                    email: 'Email is Required'
                }
            });
            return;
        }

        if (phone === '') {
            this.setState({
                errors: {
                    phone: 'Phone is Required'
                }
            });
            return;
        }

        const newContact = {
            name,
            email,
            phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data });

            
        // to clear state after add
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // this will redirect to the page to home after subit button
        // clicked, it react way to react which not reload the page.
        this.props.history.push('/');
    }

  render() {
      // destructuring
      const {name, email, phone, errors } = this.state;

      return(
          <Consumer>
              {value => {
                  const { dispatch } = value;
                  return (
                      <div className="card mb-3">
                          <div className="card-header">Add Contact</div>
                          <div className="card-body">
                              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                  <TextInputGroup 
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                  />
                                  <TextInputGroup
                                      label="Email"
                                      name="email"
                                      type="email"
                                      placeholder="Enter Email"
                                      value={email}
                                      onChange={this.onChange}
                                      error={errors.email}
                                  />

                                  <TextInputGroup
                                      label="Phone"
                                      name="phone"
                                      placeholder="Enter Phone"
                                      value={phone}
                                      onChange={this.onChange}
                                      error={errors.phone}
                                  />
                                  <input type="submit" value="Add Contact"
                                      className="btn btn-primary" />
                              </form>
                          </div>
                      </div>
                  );
              }}
          </Consumer>
      )
  }
}

export default AddContact;;
