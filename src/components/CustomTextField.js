import React from "react";
import Form from "react-bootstrap/Form";

export default class CustomTextField extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Form.Group controlId={this.props.customId}>
                <Form.Label>
                    <h5>{this.props.label}</h5>
                </Form.Label>
                <Form.Control 
                type="text" 
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.val}
                onChange={this.props.changeHandler}></Form.Control>
                <Form.Text className="text-muted">
                    {this.props.aid}
                </Form.Text>
            </Form.Group>
        );
    }
}