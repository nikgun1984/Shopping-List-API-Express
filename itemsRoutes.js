const express = require('express');
const ExpressError = require('./expressError');

const router = new express.Router();

const items = require('./fakeDB');

router.get('/',(req,res)=>{
    res.json({items})
})

router.post('/', function(req,res){
    // const newId = ITEMS[ITEMS.length-1].id+1;
    //const newItem = Object.assign({id:newId}, req.body);
    // console.log(`Price: ${req.body.item}`);
    // console.log(`Price: ${req.body.price}`)
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem);
    res.status(201).json({
        items: newItem
    })
})

router.get('/:name', (req,res) =>{
    const item = items.find(item=>item.name === req.params.name);
    if(!item) {
        throw new ExpressError("Cannot find the item", 404)
    }
    res.json({item: item})
})

router.patch('/:name', (req,res)=>{
    const item = items.find((item) => item.name === req.params.name);
    if (!item) {
        throw new ExpressError("Cannot find the item", 404);
    }
    item.name = req.body.name;
    item.price = req.body.price;
    res.json({item: item})
})

router.delete('/:name',(req,res)=>{
    const item = items.find((item) => item.name === req.params.name);
    if(!item) {
        throw new ExpressError("Cannot find the item", 404);
    }
    items.splice(item,1)
    res.json({message:"Deleted"})
})

module.exports = router;