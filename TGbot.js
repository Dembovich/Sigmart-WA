import { request } from './request.js'
import dotenv from 'dotenv'
dotenv.config()

export function sendMessage(chatId, message, parse_mode = 'Markdown') {

    if (!message || !chatId) {
        return
    }

    let urlMethodSendMessage = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`
    let lastChar = message.indexOf('\n', 4000)

    if (lastChar == -1 || lastChar >= 4096) {

        lastChar = message.indexOf(' ', 4000)

        if (lastChar == -1 || lastChar >= 4096) {

            lastChar = 4000

        }
    }

    let options = {
        url: urlMethodSendMessage,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        body: {
            chat_id: chatId, // @dembovich: 211614859 
            text: message.substring(0, lastChar),
            parse_mode: parse_mode
        }
    }

    const data = request(options)

    if (message.length > lastChar) {

        message = message.substring(lastChar, message.length)

        return sendMessage(chatId, message, parse_mode)

    }

}





