import request from "supertest";
import app from "../index.js";

describe("Pruebas API ADI Market", () => {

  test("GET / debe responder estado 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toBe("API ADI Market funcionando correctamente");
  });

  test("GET /api/test debe responder estado 200", async () => {
    const response = await request(app).get("/api/test");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET /api/publicaciones debe responder estado 200", async () => {
    const response = await request(app).get("/api/publicaciones");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/publicaciones/999 debe responder estado 404", async () => {
    const response = await request(app).get("/api/publicaciones/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Publicación no encontrada");
  });

});