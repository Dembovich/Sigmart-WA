import fetch from 'node-fetch';

export async function request({
        url,
        method = 'get',
        headers = { 'Content-Type': 'application/json' },
        body
    }) {

    let options = {
        method: method,
        headers: headers
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    //console.log(data);

    return data

}



