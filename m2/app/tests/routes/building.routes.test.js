const request = require('supertest');
const app = require('../../../app');
require("dotenv").config();

const mongoose = require("mongoose");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
})

describe("GET /api/building", () => {
  it("should return a building", async () => {
    const res = await request(app).get("/api/building");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/building", () => {
  it("should create a building", async () => {
    const res = await request(app).post("/building").send({
      name: "publick_html",
      address: "мамыр 2",
      passDate: "12.01.23",
      incomePercentage: 100,
      cityId: "63c5128daf6eb1d367d00484",
      totalArea: 12,
      decription: "Бюлдинг хехе"
    });
    expect(res.statusCode).toBe(200);
  });
});
