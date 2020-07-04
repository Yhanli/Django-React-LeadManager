import React, {Fragment} from 'react';
import Form from "./Form";
import Leads from "./Leads";

function Dashboard(props) {
    return (
        <Fragment>
            <Form />
            <Leads />
        </Fragment>
    );
}

export default Dashboard;