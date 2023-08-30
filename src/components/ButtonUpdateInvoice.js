import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonUpdateInvoice(props){
    const history = useHistory();

    function handlerClick(){
        history.push('/updateinvoice/'+ props.invoiceId);
    }
    return(
        <Button
        variant="primary"
        onClick={handlerClick}
        >
            Update
        </Button>
    );
}