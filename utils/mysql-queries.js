const pool = require("../config/db-connection");

const createTable = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error) => {
      if (error) reject(error);
      resolve(null);
    });
  });
};

const insert = (values, table) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO ?? SET ?`, [table, values], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const selectAll = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ??`, table, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const selectByParams = (params, table) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM ?? WHERE ?`,
      [table, params],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

const updateById = (id, values, table) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ?? SET ? WHERE id=?`,
      [table, values, id],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

const deleteById = (id, table) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ?? WHERE id=?`, [table, id], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  createTable,
  insert,
  selectAll,
  selectByParams,
  updateById,
  deleteById,
};
