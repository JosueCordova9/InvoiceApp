import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import ButtonToCreateInvoice from './ButtonToCreateInvoice.js';
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices.js";

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Jumbotron style={{
                width:'80%',
                marginLeft:'10%',
                height:'400px',
                marginTop:'10%'}}>
                <h1>Welcome to Invoice Generator</h1>
                <p style={{fontSize:'1.3em'}}>Press any of the button bellow</p>
                <ButtonToCreateInvoice></ButtonToCreateInvoice>
                {"   "}
                <ButtonToShowAllInvoices></ButtonToShowAllInvoices>
            </Jumbotron>
        );
    }

}