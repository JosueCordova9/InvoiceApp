import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import MainContainer from './components/MainContainer.js';
import CustomTextField from './components/CustomTextField.js';
import CustomTextArea from './components/CustomTextArea.js';
import PricesAndDescription from './components/PricesAndDescription.js';
import SubmitPriceAndDescription from './components/SubmitPriceAndDescription.js';
import CustomAlert from './components/CustomAlert.js';
import Layout from './components/Layout.js';
import DisplayInvoice from './components/DisplayInvoice.js';
import DisplayAllInvoices from './components/DisplayAllInvoices.js';
import LoadInvoiceUpdater from './components/LoadInvoiceUpdater.js';
import LoadDisplayInvoice from './components/LoadDisplayInvoice.js';
import Homepage from './components/Homepage.js';
import NotFound from './components/NotFound.js';
import {
    BrowserRouter,
    Switch,
    Route
}from 'react-router-dom';

class App extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Homepage/>
                    </Route>
                    <Route path='/createinvoice'>
                        <MainContainer head="Invoice Generator">
                            <Layout/>
                        </MainContainer>
                    </Route>
                    <Route path='/showallinvoices'>
                        <DisplayAllInvoices></DisplayAllInvoices>
                    </Route>
                    <Route path='/updateinvoice/:invoiceId'>
                        <LoadInvoiceUpdater/>
                    </Route>
                    <Route path='/displayinvoice/:invoiceId'>
                        <LoadDisplayInvoice/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App></App>
        ,
    document.getElementById('root'));