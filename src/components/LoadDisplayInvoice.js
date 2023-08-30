import React from "react";
import DisplayInvoice from "./DisplayInvoice";
import {useParams} from "react-router-dom";

export default function LoadDisplayInvoice(props){
    const {invoiceId} = useParams();
    return(
        <DisplayInvoice invoiceId={invoiceId}></DisplayInvoice>
    );

}