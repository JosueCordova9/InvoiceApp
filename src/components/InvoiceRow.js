import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonViewInvoice from "./ButtonViewInvoice";
import ButtonUpdateInvoice from "./ButtonUpdateInvoice";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default class InvoiceRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.invoicesData;
    let markup = [];
    data.map((item, index) => {
      markup.push(
        <Row key={"index-" + index} style={{marginTop:'1em'}}>
          <Col style={{padding:'1.5em'}}>{item.id}</Col>
          <Col style={{padding:'1.5em'}}>{item.description}</Col>
          <Col style={{padding:'1.5em'}}>
            <ButtonGroup>
              <Button
                variant="danger"
                onClick={() => {
                  this.props.deleteInvoice(item.id);
                }}>
                Delete
              </Button>
              <ButtonViewInvoice invoiceId={item.id} />
              <ButtonUpdateInvoice invoiceId={item.id} />
            </ButtonGroup>
          </Col>
        </Row>
      );
    });
    return <React.Fragment>{markup}</React.Fragment>;
  }
}
