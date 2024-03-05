describe("When a GET request is made to /api/v1/status", ()=>{
  let response = {};
  let responseBody = {};

  beforeAll(async()=>{
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json()    
  });
  test("should return status 200", async () => {
    expect(response.status).toBe(200);
  });

  test("should contain update_at property with current date", ()=>{
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt)
  })

  test("should contain database object with dbVersion, maxConnections, and activeConnections", ()=>{
    const expected = {
      version: "16.0",
      max_connections: 100,
      opened_connections: 1
    }
    const {database} = responseBody.dependencies;
    expect(database).toEqual(expected)
  })
})
