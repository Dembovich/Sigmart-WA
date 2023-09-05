
export function sendMessage(chatId, message, parse_mode = 'html') {

    let lastChar = message.indexOf('\n', 4000)

    if (lastChar == -1 || lastChar >= 4096) {

        lastChar = message.indexOf(' ', 4000)

        if (lastChar == -1 || lastChar >= 4096) {

            lastChar = 4000

        }
    }

    UrlFetchApp.fetch(telegramUrl + '/sendMessage', {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
            chat_id: chatId, // Δενθρ: 211614859 
            text: message.substring(0, lastChar),
            parse_mode: parse_mode,
        })
    })

    if (message.length > lastChar) {

        message = message.substring(lastChar, message.length)

        return sendMessage(chatId, message, parse_mode)

    }

}



