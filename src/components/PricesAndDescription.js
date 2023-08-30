import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class PricesAndDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const itemsInformation = this.props.itemsInfo;
        let markup = [];
        itemsInformation.map((item, index)=>{
            markup.push(
                <Row key={'index-'+index}>
                    <Col>{item.description}</Col>
                    <Col>${item.price}</Col>
                </Row>
            );
        });
        return(
            <Container style={{fontSize: '1.3em', fontWeight: 'bold'}}>
                {markup}
            </Container>
        );
    }



}