import React from "react";
import MainContainer from "./MainContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InvoiceRow from "./InvoiceRow";
import CustomAlert from "./CustomAlert";
import ButtonToMainMenu from "./ButtonToMainMenu";


export default class DisplayAllInvoices extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show: false,
            alertTitle: '',
            alertContent: '',
            fetchingError: false,
            invoicesData: []
        }

    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    }

    closeAlert(){
        this.setState({
            show: false
        });
    }

    deleteInvoice( invoiceId ){
        fetch('/api/deleteinvoice/'+invoiceId ,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if (response.ok) {
                this.setState({
                    show: true,
                    alertTitle: 'Invoice deleted',
                    alertContent: 'The invoice was deleted from the server'
                });

                const invoicesCopy = this.state.invoicesData;

                this.state.invoicesData.map((invoice, index)=>{
                    if (invoice.id === invoiceId) {
                        invoicesCopy.splice(index, 1);
                        this.setState({
                            invoicesData: invoicesCopy
                        });
                    }
                });
            }else{
                this.setState({
                    show: true,
                    alertTitle: 'Invoice was not deleted',
                    alertContent: 'The invoice was not deleted from the server'
                });
            }
        });

        console.log('Quieres borrar esta factura ' + invoiceId);
    }

    componentDidMount(){
        //se ejecuta de forma automatica
        fetch('/api/readinvoice/all',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        }).then((response)=>{
            if (response.ok) {
                return response.json();
            }else{
                throw new Error();
            }
        }).then((responseAsJson)=>{
            let data = [];
            responseAsJson.map((item, index)=>{
                data.push(
                    {
                        id: item._id,
                        description: item.invoiceDescription
                    }
                );
            });
            this.setState((state,props)=>{
                return {
                    invoicesData: state.invoicesData.concat(data)
                }
            });
            console.log(responseAsJson);
        }).catch(()=>{
            this.setState({
                fetchingError: true
            });
            console.log('Hubo problemas con la informacion');
        });
    }

    render(){
        if (this.state.fetchingError) {
            //Hubo un error en el servidor
            return(
                <MainContainer
                head='Invoices listing'>
                    <h4 style={{textAlign: 'center', color: 'white'}}>
                        There was a poblem with the server, try it again.
                    </h4>
                </MainContainer>
            );
        }
        return(
            <MainContainer
            head='Invoices listing'>
                <Container style={{color:'white'}}>
                    <Row>
                        <Col><h5>Invoice Id</h5></Col>
                        <Col><h5>Description</h5></Col>
                        <Col><h5>Actions</h5></Col>
                    </Row>
                    <InvoiceRow
                    invoicesData={this.state.invoicesData}
                    deleteInvoice={this.deleteInvoice}></InvoiceRow>
                    <Row>
                        <Col>
                            <ButtonToMainMenu></ButtonToMainMenu>
                        </Col>
                    </Row>
                </Container>
                <CustomAlert
                show={this.state.show}
                title={this.state.alertTitle}
                content={this.state.alertContent}
                close={this.closeAlert}></CustomAlert>
            </MainContainer>
        );
    }
}