const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');

router.delete('/:invoiceNumber', (request, response )=> {
    invoiceModel.deleteOne({
        _id : request.params.invoiceNumber
    },(err)=>{
        if(err){
            console.log('ERROR: '+ err);
            response.status(500).json({message:'No se pudo borrar la informacion'});
        }else{
            console.log('La factura se elimino exitosamente');
            response.status(200).json({message:'La factura se elimino correctamente'});
        }
    });
});

module.exports = router;