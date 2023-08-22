//dependencies
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//database connection
mongoose.connect('mongodb+srv://jcordova8681:i4mMOLtVnX-eyBu'+
'@apiinvoices.cproiwy.mongodb.net/invoiceContainer'+
'?retryWrites=true&w=majority',{
     useNewUrlParser: true , 
     useUnifiedTopology: true });

mongoose.connection.on('error', ()=>{
    console.log('ERROR: ' + error);
});

mongoose.connection.on('open', ()=>{
    console.log('The database connection is working');
});

//configurar body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static web server
app.use(express.static(path.join(__dirname,'dist')));

//route
app.use('/api/readinvoice', require('./routes/read.js'));
app.use('/api/createinvoice', require('./routes/create.js'));
app.use('/api/updateinvoice', require('./routes/update.js'));
app.use('/api/deleteinvoice', require('./routes/delete.js'));

app.get('/',(request, response)=>{
    response.sendFile(path.join(
        __dirname,'dist/invoiceGenerator.html'));
});

app.listen(3000, ()=>{
    console.log('Listening at localhost:3000');
});