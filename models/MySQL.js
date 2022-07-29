const pool = require("../config/db-connection");
const mysql = require("../utils/mysql-queries");

class MySQL {
  #table;

  constructor(sql, table) {
    if (!table || !sql) throw "Table and SQL need to be declared in Model";

    this.#table = table;
    pool.query(sql, (error) => {
      // fatal already logged on index
      if (error && !error.fatal)
        console.error(`${this.#table} Table not created: ${error}`);
    });
  }

  /** @returns Created record */
  async create(record) {
    try {
      const { insertId } = await mysql.insert(record, this.#table);
      const result = await this.getOneByParams({ id: insertId });
      return result;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Array of records */
  async getAll() {
    try {
      const results = await mysql.selectAll(this.#table);
      return results;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns First record matching search params */
  async getOneByParams(searchParams) {
    try {
      const [result] = await mysql.selectByParams(searchParams, this.#table);
      return result;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Updated record */
  async updateById(id, values) {
    try {
      await mysql.updateById(id, values, this.#table);
      const result = await this.getOneByParams({ id });
      return result;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }

  /** @returns Deleted record */
  async deleteById(id) {
    try {
      const result = await this.getOneByParams({ id });
      await mysql.deleteById(id, this.#table);
      return result;
    } catch (error) {
      if (!error.fatal) console.error(error); // propagated if fatal, already logged on index
    }
  }
}

module.exports = MySQL;
