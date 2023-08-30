import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToShowAllInvoices(props){
    const history = useHistory();

    function handlerClick(){
        history.push('/showallinvoices');
    }
    return(
        <Button
        size='lg'
        style={{marginTop:'2em'}}
        variant="danger"
        onClick={handlerClick}
        >
            Show All Invoices
        </Button>
    );
}