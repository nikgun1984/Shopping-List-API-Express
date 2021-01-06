const express = require('express');
const ExpressError = require('./expressError');
const DataStore = require('./datastore');

const router = new express.Router();

//get our 'database' which is just json file
const datastore = new DataStore("shopping-list.json");
const items = datastore.items;

/* Get all items in the list*/
router.get('/',(req,res)=>{
    res.json({ items:items });
})

/* Create item and add it to the shopping list*/
router.post('/', function(req,res){
    let newId = items.length? items[items.length-1].id+1:1;
    const newItem = Object.assign({ id: newId }, req.body);

    items.push(newItem);
    datastore.writeDataToDataStore(
        res.status(201).json({
            status: "success",
            items: {
                item: newItem,
            },
        })
	);
})

/* Find an item in database */
router.get('/:name', (req,res) =>{
    const item = items.find(item=>item.name === req.params.name);
    if(!item) {
        throw new ExpressError("Cannot find the item", 404)
    }
    res.json({item: item})
})

/* Update some fields of a queried item */
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
    datastore.writeDataToDataStore(
        res.status(201).json({
            status: "success",
            message: "Successfully updated"
        })
	);
})

/* Delete a specific item from database*/
router.delete('/:name',(req,res)=>{
    const item = items.find((item) => item.name === req.params.name);
    if(!item) {
        throw new ExpressError("Cannot find the item", 404);
    }
    items.splice(item,1);
    datastore.writeDataToDataStore(
        res.status(201).json({
            status: "success",
            message: "Successfully deleted"
        })
	);
})

module.exports = router;