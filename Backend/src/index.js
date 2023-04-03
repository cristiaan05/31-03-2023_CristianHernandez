import app from "./app.js";
import { getConnection } from "./database/connection.js";

const port = app.get("port")

export async function dbfun() {
    try {
        let db = await getConnection();
        //console.log(db)
        return db;
    } catch (error) {
        return error
    }


}

app.listen(port, async () => {
    let dbconnect = await dbfun();
    if (dbconnect.connected == true) {
        console.log("DB is running successfuly")
        console.log(`App listening on port ${port}!`)
    } else {
        console.log("Error in the server")
    }

})