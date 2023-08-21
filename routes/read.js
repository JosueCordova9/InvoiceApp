const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');

router.get('/all', (request, response )=> {
    invoiceModel.find((err, docs)=>{
        if(err){
            console.log('ERROR: '+ err);
            response.status(500).json({message:'No se pudo leer la informacion'});
        }else{
            console.log('Se ha leido la informacion correctamente');
            response.status(200).json(docs);
        }
    });
});

router.get('/:invoiceNumber', (request, response)=>{
    invoiceModel.findOne({
        _id : request.params.invoiceNumber
    },(err, doc)=>{
        if(err){
            console.log('ERROR: '+ err);
            response.status(500).json({message:"No se pudo encontrar la factura"});
        }else{
            console.log('Se ha encontrado la factura');
            response.status(200).json(doc);
        }
    });
});

module.exports = router;