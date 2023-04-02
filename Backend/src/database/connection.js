import sql from "mssql";
const dbSettings = {
    user: 'prueba',
    password: 'default123',
    server: 'localhost',
    database: 'gestiones',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error)
    }
}

export { sql };