const DataStore = require("./datastore");

//get our 'database' which is just json file 📀
let datastore;
console.log(process.argv);
if (process.argv.includes('itemsRoutes.test.js')) {
	datastore = new DataStore("shopping-list-test.json");
} else {
	datastore = new DataStore("shopping-list.json");
}
console.log(datastore.items);
module.exports = datastore;

