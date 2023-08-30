import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SubmitPriceAndDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="item-description">
                          <Form.Label><h5>Item Description</h5></Form.Label>
                          <Form.Control type="text" 
                          placeholder="Enter item description"
                          value={this.props.descriptionVal}
                          onChange={this.props.handler}
                          name="itemDescription" />
                          <Form.Text className="text-muted">
                            Enter a brief description of the product.
                          </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="item-price">
                          <Form.Label><h5>Item Price</h5></Form.Label>
                          <Form.Control type="text" 
                          placeholder="Enter item price"
                          value={this.props.priceVal}
                          onChange={this.props.handler}
                          name="itemPrice" />
                          <Form.Text className="text-muted">
                            Enter the product price.
                          </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button
                        style={{marginTop:'2em'}} 
                        variant="primary"
                        size="lg"
                        onClick={this.props.buttonHandler}>
                            Submit Item
                        </Button>	
                    </Col>
                </Row>
            </Container>
        );
    }
}