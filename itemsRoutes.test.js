const request = require('supertest');

const app = require('./app');
const DataStore = require('./datastore');

const datastore = new DataStore('shopping-list-test.json');

