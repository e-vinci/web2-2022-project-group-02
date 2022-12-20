const path = require('node:path');
const { JsonDB, Config: JsonDBConfig } = require('node-json-db');

class Database {
  constructor() {
    const dbPath = path.join(
      process.env.DB_PATH || path.join(__dirname, '..', 'data'),
      `catbyte-db.json`,
    );

    // Disable saveOnPush, we will save manually
    this.db = new JsonDB(new JsonDBConfig(dbPath, false, true, '/'));

    if (process.env.DB_PATH) {
      // eslint-disable-next-line no-console
      console.info('DB: Using custom database path:', dbPath);
    }
  }

  /**
   * Get the wanted data
   * @param {string} dataPath path of the data to retrieve
   */
  async get(dataPath) {
    const data = await this.db.getData(dataPath);
    // Clone the object to prevent mutation
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      return data;
    }
  }

  /**
   * Pushing data into the database
   * @param {string} dataPath path leading to the data
   * @param data data to push
   * @param {boolean?} override overriding or not the data, if not, it will merge them
   */
  async push(dataPath, data, override = true) {
    await this.db.push(dataPath, data, override);
    await this.db.save();
  }

  /**
   * Set default data
   * @param {string} dataPath path leading to the data
   * @param data data to push
   */
  async setDefault(dataPath, data) {
    const exists = await this.db.exists(dataPath);
    if (!exists) {
      await this.db.push(dataPath, data);

      // We're not saving here because we don't want to save the default data
    }
  }

  /**
   * Delete data
   * @param {string} dataPath path leading to the data
   */
  async delete(dataPath) {
    await this.db.delete(dataPath);
    await this.db.save();
  }
}

const database = new Database();

module.exports = database;
