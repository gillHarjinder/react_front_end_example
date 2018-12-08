import React, { Component } from 'react'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

import { Consumer } from '../../context';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    async componentDidMount() {
        // This id we getting from the Edit we clicked
        const { id } = this.props.match.params;

        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phonert
        })
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        // Check for Errors
        if (name === '') {
            this.setState({
                errors: {
                    name: 'Name is Required'
                }
            });
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

        const updateContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);

        dispatch({type: 'UPDATE_CONTACT', payload: res.data})
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
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
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
                                    <input type="submit" value="Update Contact"
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

export default EditContact;
