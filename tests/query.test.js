const request = require('supertest');
const app = require('../src/app'); 

describe("API Endpoint Tests", () => {

    test("POST /query - Should return pseudo-SQL", async () => {
        const response = await request(app)
            .post("/query")
            .send({ query: "list all users" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("sql");
    });

    test("POST /explain - Should return explanation", async () => {
        const response = await request(app)
            .post("/explain")
            .send({ query: "get latest sales" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("translatedSQL");
    });

    test("POST /validate - Should validate query", async () => {
        const response = await request(app)
            .post("/validate")
            .send({ query: "total revenue last month" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("valid");
    });

});
