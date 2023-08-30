import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToCreateInvoice(props){
    const history = useHistory();

    function handlerClick(){
        history.push('/createinvoice');
    }
    return(
        <Button
        size='lg'
        style={{marginTop:'2em'}}
        variant="primary"
        onClick={handlerClick}
        >
            Create Invoice
        </Button>
    );
}
