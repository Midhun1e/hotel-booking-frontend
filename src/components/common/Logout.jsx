import React, { Component } from 'react'
import auth from '../../services/authService';
import Loader from './Loader';

class Logout extends Component {
    componentDidMount(){
        auth.logout();
        window.location='/';
    }
    render() { 
        return <Loader/>;
    }
}
 
export default Logout;