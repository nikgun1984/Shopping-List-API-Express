const express = require('express');
const fs = require('fs');
const ExpressError = require('./expressError');

const router = new express.Router();

//const items = require('./fakeDB');
const file = fs.readFileSync("shopping-list.json", "utf8");
const items = file ? JSON.parse(file) : [];
console.log(items);
router.get('/',(req,res)=>{
    res.json({items})
})

router.post('/', function(req,res){
    let newId = items.length? items[items.length-1].id+1:1;
    // if(items.length) {
    //     newId = items[items.length-1]+1;
    // } else {
    //     newId = 1;
    // }
    const newItem = Object.assign({ id: newId }, req.body);

    items.push(newItem);
    fs.writeFile("shopping-list.json", JSON.stringify(items), err => {
        res.status(201).json({
            status: "success",
            items: {
                item : newItem
            }
        })
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
    if(req.body.name){
        item.name = req.body.name;
    }
    if(req.body.price){
        item.price = req.body.price;
    }
    fs.writeFile("shopping-list.json", JSON.stringify(items), err => {
        res.status(201).json({
            status: "success",
            message: "Successfully updated"
        })
    })
})

router.delete('/:name',(req,res)=>{
    const item = items.find((item) => item.name === req.params.name);
    if(!item) {
        throw new ExpressError("Cannot find the item", 404);
    }
    items.splice(item,1)
    fs.writeFile("shopping-list.json", JSON.stringify(items), err => {
        res.status(201).json({
            status: "success",
            message: "Successfully deleted"
        })
    })
})

module.exports = router;