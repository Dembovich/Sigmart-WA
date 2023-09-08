import ENUM from './enum.json' assert { type: "json" };

var arrMessageSeller_Notification = []

function getOzShop(id) {
    return ENUM.Shop[id] ? ENUM.Shop[id] : id
}
function getOzChatType(chatType) {
    return ENUM.ChatType[chatType] ? ENUM.ChatType[chatType] : chatType
}

// Превращаем массив products в строки
function getProductInPosting(arrProduct) {
    let readyString = '';
    for (const product in arrProduct) {
        readyString = readyString + `${arrProduct[product].sku} - ${arrProduct[product].quantity} шт\n`
    }
    return readyString;
}

// Новое сообщение в чате
export function TYPE_NEW_MESSAGE(content) {

    if (content.user.id == 'chat_seller_bot' || content.data[0] == "Оцените нашу работу") { return null }

    // НЕ повторять одинаковые оповещения с разных кабинетов

    if (content.chat_type == 'Seller_Notification') {

        let pieceMessage = content.data[0].substring(0, 50);
        let skip = false;

        arrMessageSeller_Notification.forEach((el) => {

            if (el == pieceMessage) { skip = true; }

        })

        if (skip) { return null }

        arrMessageSeller_Notification.push(pieceMessage)
    }

    console.log(arrMessageSeller_Notification)

    let textToTG =
        `💽 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${getOzShop(content.seller_id)}
*Тип чата:* ${getOzChatType(content.chat_type)}
*ID отправителя:* ${content.user.id}
*Тип отправителя:* ${content.user.type}
*Дата:* ${(new Date(content.created_at)).toLocaleString('ru')}
*Сообщение:* ${content.data}`
            .replace(/_/gi, ' ')	// Replace '_' => 'space'

    return textToTG

}

// Создание или обновление товара
export function TYPE_CREATE_OR_UPDATE_ITEM(content) {

    if (!content.is_error) { return null }

    const textToTG =

        `💽 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${getOzShop(content.seller_id)}
*Артикул:* ${content.offer_id}
*Информация:* ${content.is_error ? 'Были ошибки, товар не создан или не обновлён' : 'Товар создан или обновлён без ошибок'}
*Дата изменения:* ${(new Date(content.changed_at)).toLocaleString('ru')}`
            .replace(/_/gi, ' ')

    return textToTG

}

// Новое отправление
export function TYPE_NEW_POSTING(content) {

    const textToTG =

        `💽 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${getOzShop(content.seller_id)}
*Номер отправления:* ${content.posting_number}
*Начало обработки отправления:* ${(new Date(content.in_process_at)).toLocaleString('ru')}

*Товыры(пока что SKU):*
${getProductInPosting(content.products)}`
            .replace(/_/gi, ' ')

    return textToTG

}

// Отмена отправления
export function TYPE_POSTING_CANCELLED(content) {

    const textToTG =

        `💽🔴 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${getOzShop(content.seller_id)}
*Номер отправления:* ${content.posting_number}
*Время изменения статуса:* ${(new Date(content.changed_state_date)).toLocaleString('ru')}
*Предыдущий статус отправления:* ${content.old_state}
*Новый статус отправления:* ${content.new_state}`
            .replace(/_/gi, ' ')

    return textToTG

}

// Изменение ценового индекса
export function TYPE_PRICE_INDEX_CHANGED(content) {

    if (content.price_index <= 1) { return null } // Если индекс меньше 1, то не отправлять

    const textToTG =

        `💽🔴 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${getOzShop(content.seller_id)}
*Артикул(пока что SKU):* ${content.sku}
*Ценовой индекс:* ${content.price_index}
`
            .replace(/_/gi, ' ')

    return textToTG

}

