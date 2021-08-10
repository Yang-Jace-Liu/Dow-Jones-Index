const request = require("supertest");
const app = require("../../src/index");
const { Record } = require("../../src/db/models");

afterAll(async () => {
  // DB is still running, need to close it to exit properly
  const db = require("../../src/db");
  await db.close();
});

describe("Test Records API [GET]", () => {
  it("should fail", async () => {
    const res = await request(app).post("/api/records").send();
    expect(res.statusCode).toEqual(400);
    expect(res.body && res.body.errors.length === 1);
  });

  it("should success", async () => {
    const res = await request(app).get("/api/records").query({ stock: "AA" }).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.data);
    for (const record of res.body.data) {
      expect(record.stock === "AA");
    }
  });
});

describe("Test Records API [POST]", () => {
  it("should success (with empty data)", async () => {
    const count = await Record.count();
    const res = await request(app).post("/api/records").send({
      data: []
    });
    expect(res.statusCode).toEqual(200);
    const newCount = await Record.count();
    expect(newCount).toEqual(count);
  });

  it("should success (with multiple records)", async () => {
    const count = await Record.count();
    const res = await request(app).post("/api/records").send({
      data: [
        {
          quarter: 3,
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
        },
        {
          quarter: 1,
          stock: "AABD",
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
        }
      ]
    });
    expect(res.statusCode).toEqual(200);
    const newCount = await Record.count();
    expect(newCount).toEqual(count + 2);
  });

  it("should fail (with multiple records)", async () => {
    const res = await request(app).post("/api/records").send({
      data: [
        {
          quarter: 3,
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
        },
        {
          quarter: 1,
          stock: "AABD",
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
        }
      ]
    });
    expect(res.statusCode).toEqual(400);
    expect(res.errors && res.errors.length === 1 && res.errors[0].param === "data[1].date");
  });
});
