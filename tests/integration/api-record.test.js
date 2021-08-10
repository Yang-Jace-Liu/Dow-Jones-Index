const request = require("supertest");
const app = require("../../src/index");
const sequelize = require("sequelize");
const { Record } = require("../../src/db/models");

afterAll(async () => {
  // DB is still running, need to close it to exit properly
  const db = require("../../src/db");
  await db.close();
});

describe("Test Record API [POST]", () => {
  it("should create a new post", async () => {
    const res = await request(app).post("/api/record").send({
      quarter: 2,
      stock: "AA",
      date: "2011-07-01",
      open: 15.82,
      high: 20,
      low: 18.1,
      close: 17.3,
      volume: 10000000,
      percent_change_price: 1.234,
      next_weeks_open: 12.34,
      next_weeks_close: 14.56,
      percent_change_next_weeks_price: 1.123,
      days_to_next_dividend: 123,
      percent_return_next_dividend: 1.321
    });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"].includes("application/json"));
    expect(res.body && res.body.stock === "AA");
  });

  it("should create a new post (with prev week's data)", async () => {
    const length = await Record.count();
    const res = await request(app).post("/api/record").send({
      quarter: 2,
      stock: "AA",
      date: "2011-07-01",
      open: 15.82,
      high: 20,
      low: 18.1,
      close: 17.3,
      volume: 10000000,
      percent_change_price: 1.234,
      next_weeks_open: 12.34,
      next_weeks_close: 14.56,
      percent_change_next_weeks_price: 1.123,
      days_to_next_dividend: 123,
      percent_return_next_dividend: 1.321,
      percent_change_volume_over_last_wk: 1.23,
      previous_weeks_volume: 123
    });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"].includes("application/json"));
    expect(res.body && res.body.stock === "AA");
    const newLength = await Record.count();
    expect(newLength).toEqual(length + 1);
  });

  it("should not validated (wrong date format)", async () => {
    const res = await request(app).post("/api/record").send({
      quarter: 2,
      stock: "AA",
      date: "2011-07-01123",
      open: 15.82,
      high: 20,
      low: 18.1,
      close: 17.3,
      volume: 10000000,
      percent_change_price: 1.234,
      next_weeks_open: 12.34,
      next_weeks_close: 14.56,
      percent_change_next_weeks_price: 1.123,
      days_to_next_dividend: 123,
      percent_return_next_dividend: 1.321
    });
    expect(res.statusCode).toEqual(400);
    expect(res.headers["content-type"].includes("application/json"));
    expect(res.errors && res.errors.length !== 0 && res.errors[0].param === "date");
  });

  it("should not validated (wrong open format)", async () => {
    const res = await request(app).post("/api/record").send({
      quarter: 2,
      stock: "AA",
      date: "2011-07-01",
      open: "15.82abc",
      high: 20,
      low: 18.1,
      close: 17.3,
      volume: 10000000,
      percent_change_price: 1.234,
      next_weeks_open: 12.34,
      next_weeks_close: 14.56,
      percent_change_next_weeks_price: 1.123,
      days_to_next_dividend: 123,
      percent_return_next_dividend: 1.321
    });
    expect(res.statusCode).toEqual(400);
    expect(res.headers["content-type"].includes("application/json"));
    expect(res.errors && res.errors.length !== 0 && res.errors[0].param === "open");
  });

  it("should not validated (wrong volume format)", async () => {
    const res = await request(app).post("/api/record").send({
      quarter: 2,
      stock: "AA",
      date: "2011-07-01",
      open: "15.82abc",
      high: 20,
      low: 18.1,
      close: 17.3,
      volume: 10000000.123,
      percent_change_price: 1.234,
      next_weeks_open: 12.34,
      next_weeks_close: 14.56,
      percent_change_next_weeks_price: 1.123,
      days_to_next_dividend: 123,
      percent_return_next_dividend: 1.321
    });
    expect(res.statusCode).toEqual(400);
    expect(res.headers["content-type"].includes("application/json"));
    expect(res.errors && res.errors.length !== 0 && res.errors[0].param === "volume");
  });
});
