import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomTextArea from "./CustomTextArea";
import CustomTextField from "./CustomTextField";
import PricesAndDescription from "./PricesAndDescription";
import SubmitPriceAndDescription from "./SubmitPriceAndDescription";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomAlert from "./CustomAlert";
import CustomCard from "./CustomCard";
import Card from "react-bootstrap/Card";
import ButtonToMainMenu from "./ButtonToMainMenu";
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDescription: "",
      sellerName: "",
      sellerAddress: "",
      customerName: "",
      customerAddress: "",
      itemsInfo: [],
      itemDescription: "",
      itemPrice: "",
      termsAndConditions: "",
      finalPrice: 0,
      show: false,
      title: "",
      content: "",
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.updateMode || !this.props.invoiceId) {
      return;
    }
    //este metodo se ejecuta automaticamente
    fetch('/api/readinvoice/' + this.props.invoiceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Hubo problemas con el servidor");
        }
      }).then((responseAsJson) => {
        //Si todo sale bien
        this.setState({
          invoiceDescription: responseAsJson.invoiceDescription,
          sellerName: responseAsJson.sellerName,
          sellerAddress: responseAsJson.sellerAddress,
          customerName: responseAsJson.customerName,
          customerAddress: responseAsJson.customerAddress,
          itemsInfo: responseAsJson.items,
          finalPrice: responseAsJson.finalPrice,
          termsAndConditions: responseAsJson.terms,
        });
        console.log(responseAsJson);
      }).catch(() => {
        console.log(Error());
      });
  }

  closeAlert() {
    this.setState({
      show: false,
    });
  }

  updateInvoice(event) {
    const data = {
      sellerName: this.state.sellerName,
      sellerAddress: this.state.sellerAddress,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      items: this.state.itemsInfo,
      finalPrice: this.state.finalPrice,
      terms: this.state.termsAndConditions,
      invoiceDescription: this.state.invoiceDescription,
    };

    fetch('/api/updateinvoice/' + this.props.invoiceId, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        this.setState({
          show: true,
          title: "The invoice was updated successfully",
          content: "The invoice was saved into the system",
        });
      } else {
        this.setState({
          show: true,
          title: "The invoice was not updated",
          content: "There was some problems, try it again",
        });
      }
    });

    event.preventDefault();
  }

  createInvoice(event) {
    const data = {
      sellerName: this.state.sellerName,
      sellerAddress: this.state.sellerAddress,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      items: this.state.itemsInfo,
      finalPrice: this.state.finalPrice,
      terms: this.state.termsAndConditions,
      invoiceDescription: this.state.invoiceDescription,
    };

    fetch('/api/createinvoice', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        this.setState({
          show: true,
          title: "The invoice was created successfully",
          content: "The invoice was saved into the system",
        });
      } else {
        this.setState({
          show: true,
          title: "The invoice was not created",
          content: "There was some problems, try it again",
        });
      }
    });
    event.preventDefault();
  }

  clickHandler() {
    this.setState((state, props) => {
      const currentItems = state.itemsInfo;
      let totalPrice = 0;

      state.itemsInfo.map((item, index) => {
        let price = parseFloat(item.price);
        totalPrice = totalPrice + price;
      });

      totalPrice = totalPrice + parseFloat(state.itemPrice);

      return {
        itemsInfo: currentItems.concat([
          {
            description: state.itemDescription,
            price: state.itemPrice,
          },
        ]),
        finalPrice: totalPrice,
      };
    });
    console.log("Añadir precio y descripcion");
  }

  inputHandler(event) {
    if (event.target.name === "invoice-description") {
      this.setState({
        invoiceDescription: event.target.value,
      });

      console.log("Invoice description: " + event.target.value);
    }

    if (event.target.name === "sellerName") {
      this.setState({
        sellerName: event.target.value,
      });

      console.log("Seller Name: " + event.target.value);
    }

    if (event.target.name === "sellerAddress") {
      this.setState({
        sellerAddress: event.target.value,
      });

      console.log("Seller Address: " + event.target.value);
    }

    if (event.target.name === "customerName") {
      this.setState({
        customerName: event.target.value,
      });

      console.log("Customer Name: " + event.target.value);
    }

    if (event.target.name === "customerAddress") {
      this.setState({
        customerAddress: event.target.value,
      });

      console.log("Customer Address: " + event.target.value);
    }

    if (event.target.name === "itemDescription") {
      this.setState({
        itemDescription: event.target.value,
      });

      console.log("Item Description: " + event.target.value);
    }

    if (event.target.name === "itemPrice") {
      this.setState({
        itemPrice: event.target.value,
      });

      console.log("Item Price: " + event.target.value);
    }

    if (event.target.name === "termsAndConditions") {
      this.setState({
        termsAndConditions: event.target.value,
      });

      console.log("Terms and Conditions: " + event.target.value);
    }
  }

  handlerSubmit(event) {
    if (this.props.updateMode) {
      this.updateInvoice(event);
    }
    if (!this.props.updateMode) {
      this.createInvoice(event);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handlerSubmit}>
          <Container>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <CustomCard head="Invoice Description">
                  <CustomTextArea
                    name="invoice-description"
                    label="Invoice Description"
                    val={this.state.invoiceDescription}
                    changeHandler={this.inputHandler}
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <CustomCard head="Seller's information">
                  <CustomTextField
                    customId="seller-name"
                    label="Seller's name"
                    val={this.state.sellerName}
                    name="sellerName"
                    placeholder="Enter name..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full name"
                  ></CustomTextField>
                  <CustomTextField
                    customId="seller-address"
                    label="Seller's address"
                    val={this.state.sellerAddress}
                    name="sellerAddress"
                    placeholder="Enter address..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full address"
                  ></CustomTextField>
                </CustomCard>
              </Col>
              <Col>
                <CustomCard head="Customer's information">
                  <CustomTextField
                    customId="customer-name"
                    label="Customer's name"
                    val={this.state.customerName}
                    name="customerName"
                    placeholder="Enter name..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full name"
                  ></CustomTextField>
                  <CustomTextField
                    customId="customer-address"
                    label="Customer's address"
                    val={this.state.customerAddress}
                    name="customerAddress"
                    placeholder="Enter address..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full address"
                  ></CustomTextField>
                </CustomCard>
              </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <CustomCard head="Items/Services purchased">
                  <PricesAndDescription
                    itemsInfo={this.state.itemsInfo}
                  ></PricesAndDescription>
                  <SubmitPriceAndDescription
                    descriptionVal={this.state.itemDescription}
                    handler={this.inputHandler}
                    priceVal={this.state.itemPrice}
                    buttonHandler={this.clickHandler}
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <CustomCard head="Total price">
                  <h5>${this.state.finalPrice}</h5>
                </CustomCard>
              </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <CustomCard head="Terms and Conditions">
                  <CustomTextArea
                    label="Terms and Conditions"
                    name="termsAndConditions"
                    val={this.state.termsAndConditions}
                    changeHandler={this.inputHandler}
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{marginTop:'2em'}}>
              <Col>
                <Card>
                  <Card.Body>
                    {
                    (this.props.updateMode)?
                      <><Button
                          type="submit"
                          style={{ marginTop: "2em" }}
                          variant="warning"
                          size="lg">
                          Update Invoice
                        </Button><ButtonToShowAllInvoices/></>:
                      <><Button
                          type="submit"
                          style={{ marginTop: "2em" }}
                          variant="primary"
                          size="lg"
                        >
                          Create Invoice
                        </Button><ButtonToMainMenu /></>
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Form>
        <CustomAlert
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          close={this.closeAlert}
        />
      </div>
    );
  }
}
