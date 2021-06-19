import React, {Component, Fragment} from 'react';
import { withAlert } from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps){
        // console.log(this.props);
        const {error, alert, message} = this.props;
        if (error !== prevProps.error){
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message) alert.error(`Email: ${error.msg.message.join()}`);

            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());

            if (error.msg.username) alert.error(error.msg.username.join());

        }
        if (message !== prevProps.message){
            if(message.deleteLead) alert.success(message.deleteLead);
            if(message.addLead) alert.success(message.addLead);
            if(message.success) alert.success(message.success);
            if(message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
            if(message.fail) alert.error(message.fail);
        }
    }

    
    render() {
        return (
            <Fragment />
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps) (withAlert()(Alerts));