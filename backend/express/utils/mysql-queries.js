const connection = require("../config/db-connection");

const insert = (values, table) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ?? SET ?`,
      [table, values],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

const selectAll = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ??`, table, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const selectByParams = (params, table) => {
  return new Promise((resolve, reject) => {
    connection.query(
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
    connection.query(
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
    connection.query(
      `DELETE FROM ?? WHERE id=?`,
      [table, id],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

module.exports = {
  insert,
  selectAll,
  selectByParams,
  updateById,
  deleteById,
};
