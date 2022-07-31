const query = require("../utils/mysql-queries");

const { expect, assert } = require("chai");
const MySQL = require("../models/MySQL");
const sinon = require("sinon");

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

describe("Models Unit Tests", function () {
  // Guarantees new Model won't interfere with database
  const createTableQueryStub = sinon.stub(query, "createTable").resolves();
  const fakeModel = new MySQL("sql", "Fake");

  describe("Create Table", () => {
    it("should throw an error if parameter is missing", async () => {
      createTableQueryStub.resolves();
      return expect(() => new MySQL("sql")).to.throw(
        "Table and SQL need to be declared in Model"
      );
    });
  });

  describe("Insert One Record", () => {
    it("should return inserted record", async () => {
      // Stub simulating insert query in db using fakeDb
      const insertQueryStub = sinon
        .stub(query, "insert")
        .callsFake(insertStubCb);
      // Stub simulating select query in db using fakeDb
      const selectByParamsQueryStub = sinon
        .stub(query, "selectByParams")
        .callsFake(selectByParamsStubCb);
      // create in Model calls insert and select queries
      const createdRecord = await fakeModel.create({
        foo: "String to Add",
        bar: true,
        baz: 2.0,
      });
      assert(insertQueryStub.called);
      assert(selectByParamsQueryStub.called);
      // return expects record to match the one in fakeDb
      return expect(createdRecord).to.have.deep.equal(fakeDb[fakeInsertId]);
    });
  });

  describe("Get All Records", () => {
    it("should return all existing records", async () => {
      // Stub simulating select all query in db using fakeDb
      const selectAllQueryStub = sinon.stub(query, "selectAll").returns(fakeDb);
      // getAll in Model calls selectAll query
      const returnedRecords = await fakeModel.getAll();
      assert(selectAllQueryStub.called);
      // return expects records to match the ones in fakeDb
      return expect(returnedRecords).to.have.deep.equal(fakeDb);
    });
  });

  describe("Get One Record by ID", () => {
    it("should return record matching ID", async () => {
      // Stub simulating select query in db using fakeDb
      const selectByParamsQueryStub = sinon
        .stub(query, "selectByParams")
        .callsFake(selectByParamsStubCb);
      // getOneByParams in Model calls selectByParams query
      const returnedRecord = await fakeModel.getOneByParams({
        id: 0,
      });
      assert(selectByParamsQueryStub.called);
      // return expects record to match the one with same id in fakeDb
      return expect(returnedRecord).to.have.deep.equal(fakeDb[0]);
    });
  });

  describe("Update One Record by ID", () => {
    it("should return updated record", async () => {
      // Stub simulating update query in db using fakeDb
      const updateByIdQueryStub = sinon
        .stub(query, "updateById")
        .callsFake(updateByIdStubCb);
      // Stub simulating select query in db using fakeDb
      const selectByParamsQueryStub = sinon
        .stub(query, "selectByParams")
        .callsFake(selectByParamsStubCb);
      // updateById in Model calls updateById and selectByParams queries
      const updatedRecord = await fakeModel.updateById(0, {
        foo: "Updated String",
      });
      assert(updateByIdQueryStub.called);
      assert(selectByParamsQueryStub.called);
      // return expects record to match the one with same id in fakeDb
      return expect(updatedRecord).to.have.deep.equal(fakeDb[0]);
    });
  });

  describe("Delete One Record by ID", () => {
    const deleteId = 1;
    it("should return deleted record", async () => {
      // Stub simulating select query in db using fakeDb
      const selectByParamsQueryStub = sinon
        .stub(query, "selectByParams")
        .callsFake(selectByParamsStubCb);
      // Stub simulating delete query in db using fakeDb
      const deleteByIdQueryStub = sinon
        .stub(query, "deleteById")
        .callsFake(deleteByIdStubCb);
      // Copy to compare value after delete
      const fakeDbCopy = fakeDb;
      // deleteById in Model calls selectByParams and deleteById queries
      const deletedRecord = await fakeModel.deleteById(deleteId);
      assert(deleteByIdQueryStub.called);
      assert(selectByParamsQueryStub.called);
      // return expects record to match the one with same id deleted from fakeDb
      return expect(deletedRecord).to.have.deep.equal(fakeDbCopy[deleteId]);
    });
  });
});

/* CALLBACKS */
let fakeDb = [
  {
    id: 0,
    foo: "String",
    bar: false,
    baz: 0.0,
  },
  {
    id: 1,
    foo: "Another String",
    bar: true,
    baz: 1.0,
  },
];

const fakeInsertId = 2;

insertStubCb = (record, _table) => {
  // Inserts record into fakeDb
  fakeDb.push({ id: fakeInsertId, ...record });
  return { insertId: fakeInsertId };
};

selectByParamsStubCb = (params, _table) => {
  // Finds el matching params in fakeDb
  const foundRecord = fakeDb.find((el) =>
    Object.keys(params).reduce(
      (prev, curr) => params[curr] === el[curr] && prev,
      true
    )
  );
  // Returns record wrapped in array, simulating a database
  return [foundRecord];
};

updateByIdStubCb = (id, values, _table) => {
  const recordToUpdate = fakeDb.find((el) => el.id === id);
  const indexToUpdate = fakeDb.indexOf(recordToUpdate);
  // Simulate updating db
  Object.keys(values).forEach((key) => {
    if (fakeDb[indexToUpdate][key]) fakeDb[indexToUpdate][key] = values[key];
  });
};

deleteByIdStubCb = (id, _table) => {
  const recordToDelete = fakeDb.find((el) => el.id === id);
  const indexToDelete = fakeDb.indexOf(recordToDelete);
  // Simulates deleting from db
  fakeDb = fakeDb.filter((_value, index) => index === indexToDelete);
};
