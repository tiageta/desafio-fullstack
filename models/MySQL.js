const pool = require("../config/db-connection");
const mysql = require("../utils/mysql-queries");

class MySQL {
  #table;

  constructor(sql, table) {
    if (!table || !sql) throw "Table and SQL need to be declared in Model";

    this.#table = table;
    // Try to create tables
    pool.query(sql, (error) => {
      // fatal already logged on index
      if (error && !error.fatal)
        console.error(`${this.#table} Table not created: ${error}`);
    });
  }

  /** @returns Created record */
  async create(record) {
    try {
      // Insert record and retrieve its ID
      const { insertId } = await mysql.insert(record, this.#table);
      // Return newly inserted record
      return await this.getOneByParams({ id: insertId });
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Array of records */
  async getAll() {
    try {
      // Return all records from database
      return await mysql.selectAll(this.#table);
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns First record matching search params */
  async getOneByParams(searchParams) {
    try {
      // Get a single record matching params
      const [record] = await mysql.selectByParams(searchParams, this.#table);

      return record;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Updated record */
  async updateById(id, values) {
    try {
      // Update record matching id
      await mysql.updateById(id, values, this.#table);
      // Return updated record
      return await this.getOneByParams({ id });
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Deleted record */
  async deleteById(id) {
    try {
      // Get record to return later
      const result = await this.getOneByParams({ id });
      // Delete record matching ID
      await mysql.deleteById(id, this.#table);

      return result;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }
}

module.exports = MySQL;
