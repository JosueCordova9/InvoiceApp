const express = require('express');
const router = express.Router();

router.get('/', (request, response )=> {
    response.send('<h1>Saludos desde el router "read.js"</h1>');
});

module.exports = router;