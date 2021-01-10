const fs = require('fs');

class DataStore {
  constructor(database) {
    this.database = database;
    this.items = this.getData();
    this.time = new Date().toISOString();
  }

  getData() {
    const file = fs.readFileSync(this.database, 'utf8');
    return file ? JSON.parse(file) : [];
  }

  writeDataToDataStore(status) {
    fs.writeFile(
      this.database,
      JSON.stringify(this.items, this.time),
      (err) => {
        status;
      }
    );
  }

  emptyDataStore() {
    fs.writeFileSync(this.database, '');
  }
}

module.exports = DataStore;
