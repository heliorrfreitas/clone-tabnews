import database from "infra/database.js"

async function status(request, response) {
    const database = {
      version: await getDbVersion(),
      max_connections: await getMaxConnections(),
      opened_connections: await getActiveConnections()
    }
  
    response.status(200).json({
      updated_at: new Date().toISOString(),
      dependencies: {database}
    });
}

async function getDbVersion(){
  const dbVersion = await database.query("SHOW server_version;")
  return dbVersion.rows[0].server_version;
}

async function getMaxConnections(){
  const maxConnections = await database.query("SHOW max_connections;")
  return parseInt(maxConnections.rows[0].max_connections);
}

async function getActiveConnections(){
  const databaseName = process.env.POSTGRES_DB;
  const activeConnections = await database.query({
    text: "SELECT COUNT(*)::int as opened_connections FROM pg_stat_activity WHERE datname = $1;", 
    values: [databaseName]
  });
  return activeConnections.rows[0].opened_connections;
}

export default status;
