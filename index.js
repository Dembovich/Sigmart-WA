import express from 'express'
import router from "./router.js"
import * as TGbot from "./TGbot.js"
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000;
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

console.log('START')
TGbot.sendMessage(211614859, 'Сервер запущен!', 'html')


startApp()