import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config()

const body = {
    chat_id: 211614859,
    text: 'ЙОУ из node js',
    parse_mode: 'html'
};

const response = await fetch('https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/sendMessage', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();

console.log(data);


