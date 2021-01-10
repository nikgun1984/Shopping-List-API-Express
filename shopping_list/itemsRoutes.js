const express = require('express');
const ExpressError = require('./expressError');
const app = require('./app');
const datastore = require('./data');

const router = new express.Router();

const items = datastore.items;

/* Get all items in the list*/
router.get('/', (req, res) => {
  res.json({ items: items });
});

/* Create item and add it to the shopping list ✍🏻*/
router.post('/', function (req, res) {
  let newId = items.length ? items[items.length - 1].id + 1 : 1;
  console.log(req.body);
  const newItem = Object.assign({ id: newId }, req.body);
  items.push(newItem);
  datastore.writeDataToDataStore(
    res.status(201).json({
      status: 'success',
      items: {
        item: newItem,
      },
    })
  );
});

/* Find an item in database 🕵🏻*/
router.get('/:name', (req, res) => {
  const item = items.find((item) => item.name === req.params.name);
  if (!item) {
    throw new ExpressError('Cannot find the item', 404);
  }
  res.json({ item: item });
});

/* Update some fields of a queried item */
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw new ExpressError('Cannot find the item', 404);
  }
  if (req.body.product) {
    item.product = req.body.product;
  }
  if (req.body.amount) {
    item.amount = req.body.amount;
  }
  datastore.writeDataToDataStore(
    res.status(200).json({
      status: 'success',
      message: 'Successfully updated',
      items: {
        item,
      },
    })
  );
});

/* Delete a specific item from database 🗑*/
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw new ExpressError('Cannot find the item', 404);
  }
  items.splice(item, 1);
  datastore.writeDataToDataStore(
    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted',
    })
  );
});

module.exports = router;
