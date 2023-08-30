import React from "react";
import MainContainer from "./MainContainer";
import Layout from "./Layout";
import {useParams} from "react-router-dom";

export default function LoadInvoiceUpdater(props) {
    const {invoiceId} = useParams();
    return (
        <MainContainer head="Invoice Generator">
            <Layout updateMode invoiceId={invoiceId}/>
        </MainContainer>
    );
}
