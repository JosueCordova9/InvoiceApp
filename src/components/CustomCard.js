import React from "react";
import Card from 'react-bootstrap/Card';

export default class CustomCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card>
                <Card.Header as='h4'>
                    {this.props.head}
                </Card.Header>
                <Card.Body>
                    {this.props.children}
                </Card.Body>
            </Card>
        );
    }
}