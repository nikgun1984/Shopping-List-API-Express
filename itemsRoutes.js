const express = require('express');

const router = new express.Router();

const ITEMS = require('./fakeDB');

router.get('/',(req,res)=>{
    res.json(ITEMS);
})

router.post('/', (req,res)=> {

})

// router.post

module.exports = router;