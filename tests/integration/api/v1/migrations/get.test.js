import database from "infra/database";

async function cleanDatabase(){
  await database.query("drop schema public cascade; create schema public")
}

describe("GET to /api/v1/migrations should return 200", ()=>{

  beforeAll(cleanDatabase)
  test("should return status 200", async () => {

    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
