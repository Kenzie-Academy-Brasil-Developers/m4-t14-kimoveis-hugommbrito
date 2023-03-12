import { AppDataSource } from "./data-source"
import app from "./app"
import 'dotenv/config'


AppDataSource.initialize()
    .then(async () => {
        console.log('DataBase Connected.');

        const PORT: number = parseInt(process.env.PORT!) || 3000
        const serverMsg: string = `App is running on http://localhost:${PORT}`

        app.listen(PORT, () => {
            console.log(serverMsg);
        })
    })
    .catch((err) => console.error(err))