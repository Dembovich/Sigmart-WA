import express from 'express'
import router from "./router.js"

const PORT = 3000;

const app = express()

app.use(express.json())
app.use('/api', router)

async function startApp() {
    try {

        // await Подключение к БД
        app.listen(PORT, () => console.log('Server started on port - ' + PORT))


    } catch (e) {
        console.log(e)
    }
}

startApp()