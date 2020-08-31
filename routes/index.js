const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    res.render('index');

})

router.get('/Oussama', (req, res) => {

    res.render('Oussama');

})






module.exports = router;