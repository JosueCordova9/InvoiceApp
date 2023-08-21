const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');


router.post('/', (request, response )=> {
    const input = request.body;
    const newDocument = new invoiceModel({
        sellerName : input.sellerName,
        sellerAddress : input.sellerAddress,
        customerName : input.customerName,
        customerAddress : input.customerAddress,
        items : input.items,
        finalPrice : input.finalPrice,
        terms : input.terms,
        invoiceDescription : input.invoiceDescription
    });

    //saving document
    newDocument.save((err, doc)=>{
        if(err){
            console.log('ERROR: ' + err);
            response.status(500).json({message:'No se pudo guardar la informacion'})
        }else{
            console.log('La informacion se ha guardado');
            response.status(200).json({message:'La informacion se ha guardado'})
        }
    });
});

module.exports = router;