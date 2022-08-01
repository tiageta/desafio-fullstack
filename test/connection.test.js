const pool = require("../config/db-connection");
const { expect } = require("chai");

const isConnected = () =>
  new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        resolve(false); // not connected!
        return;
      }
      connection.release();
      resolve(true);
    });
  });

describe("Database Connection Unit Test", () => {
  it("should return true if database is connected", async () => {
    expect(await isConnected()).to.true;
  });
});
