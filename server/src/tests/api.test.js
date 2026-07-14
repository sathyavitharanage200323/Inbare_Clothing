import request from "supertest";
import { jest } from "@jest/globals";

jest.setTimeout(30000);

let app;

beforeAll(async () => {
    const mod = await import("../app.js");
    app = mod.default;
});

describe("Health Check", () => {
    it("GET /api/health should return status ok", async () => {
        const res = await request(app).get("/api/health");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("ok");
        expect(res.body).toHaveProperty("timestamp");
        expect(res.body).toHaveProperty("uptime");
    });
});

describe("Root API", () => {
    it("GET / should return welcome message", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain("INBARE");
    });
});

describe("Categories API", () => {
    it("GET /api/categories should return categories array", async () => {
        const res = await request(app).get("/api/categories");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.categories)).toBe(true);
    });
});

describe("Products API", () => {
    it("GET /api/products should return paginated products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty("products");
        expect(res.body).toHaveProperty("total");
        expect(res.body).toHaveProperty("totalPages");
    });

    it("GET /api/products?search=tee should return search results", async () => {
        const res = await request(app).get("/api/products?search=tee");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});

describe("Auth API", () => {
    const testUser = {
        firstName: "Test",
        lastName: "User",
        email: `test${Date.now()}@example.com`,
        password: "password123",
    };

    it("POST /api/auth/register should create a new user", async () => {
        const res = await request(app).post("/api/auth/register").send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.email).toBe(testUser.email);
    });

    it("POST /api/auth/login should return token", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty("token");
    });

    it("POST /api/auth/login with wrong password should fail", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: "wrongpassword",
        });
        expect(res.status).toBe(401);
    });
});

describe("Protected Routes", () => {
    let token;

    beforeAll(async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "admin@inbare.com",
            password: "admin123",
        });
        token = res.body.token;
    });

    it("GET /api/auth/me without token should fail", async () => {
        const res = await request(app).get("/api/auth/me");
        expect(res.status).toBe(401);
    });

    it("GET /api/auth/me with token should return user", async () => {
        const res = await request(app)
            .get("/api/auth/me")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.user).toHaveProperty("email");
    });
});

describe("404 Handler", () => {
    it("GET /api/nonexistent should return 404", async () => {
        const res = await request(app).get("/api/nonexistent");
        expect(res.status).toBe(404);
    });
});
