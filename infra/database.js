import { Client } from 'pg';

async function query(queryObject){
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD
    });

    console.log({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD
    });

    try{ 
        await client.connect();
        return await client.query(queryObject);
    }catch(error){
        console.error(error);
        throw error;
    }finally{
        console.log("aqui")
        await client.end();
    }
}


export default {
    query: query,
};
