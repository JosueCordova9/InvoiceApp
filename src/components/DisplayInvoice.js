import React from "react";
import MainContainer from "./MainContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PricesAndDescription from "./PricesAndDescription";
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices";

export default class DisplayInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingError: false,
      invoiceDescription: "",
      sellerName: "",
      sellerAddress: "",
      customerName: "",
      customerAddress: "",
      itemsInfo: [],
      termsAndConditions: "",
      finalPrice: 0,
      date: '',
      invoiceId: ''
    };
  }

  componentDidMount() {
    //este metodo se ejecuta de forma automatica
    fetch('/api/readinvoice/'+ this.props.invoiceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        this.setState({
            sellerName: responseAsJson.sellerName,
            sellerAddress: responseAsJson.sellerAddress,
            customerName: responseAsJson.customerName,
            customerAddress: responseAsJson.customerAddress,
            invoiceDescription: responseAsJson.invoiceDescription,
            date: responseAsJson.date,
            invoiceId: responseAsJson._id,
            itemsInfo: responseAsJson.items,
            termsAndConditions: responseAsJson.terms,
            finalPrice: responseAsJson.finalPrice
        });
        console.log(responseAsJson);
      })
      .catch(() => {
        this.setState({
          fetchingError: true,
        });
        console.log("Hubo un problema");
      });
  }

  render() {
    if (this.state.fetchingError) {
      return (
        <MainContainer head="Invoice">
          <h2 style={{color: 'white'}}>Hubo un error con el servidor, carga la pagina nuevamente</h2>
        </MainContainer>
      );
    }
    return (
      <MainContainer head="Invoice">
        <Container style={{fontSize:'1.2em'}}>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'right', color:'white'}}>
                    <h5>Seller's name and address</h5>
                    {this.state.sellerName}<br></br>
                    {this.state.sellerAddress}
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>Customer's name and address</h5>
                    {this.state.customerName}<br></br>
                    {this.state.customerAddress}
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>Invoice Id and Date</h5>
                    {this.state.invoiceId}<br></br>
                    {new Date(this.state.date).toLocaleString()}
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>Invoice Description</h5>
                    {this.state.invoiceDescription}
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>Items/Services Purchased</h5>
                    <PricesAndDescription
                    itemsInfo={this.state.itemsInfo}/>
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>$Final Price</h5>
                    {this.state.finalPrice}
                </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
                <Col
                style={{textAlign:'left', color:'white'}}>
                    <h5>Terms and Conditions</h5>
                    {this.state.termsAndConditions}
                </Col>
            </Row>
            <Row>
              <Col>
                <ButtonToShowAllInvoices></ButtonToShowAllInvoices>
              </Col>
            </Row>
        </Container>
      </MainContainer>
    );
  }
}
