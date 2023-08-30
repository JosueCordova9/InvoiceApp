import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';

export default class MainContainer extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <Jumbotron>
                <Card bg="dark" text="white">
                    <Card.Header as="h1" style={{textAlign:"center"}}>
                        {this.props.head}
                    </Card.Header>
                    <Card.Body style={{color:"black"}}>
                        {this.props.children}
                    </Card.Body>
                </Card>
            </Jumbotron>
        );
    }
}