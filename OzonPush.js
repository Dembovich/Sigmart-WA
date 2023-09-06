import ENUM from './enum.json' assert { type: "json" };

/*
var MessageType = {

	TYPE_NEW_MESSAGE: 'Новое сообщение в чате',									// DONE
	TYPE_CREATE_OR_UPDATE_ITEM: 'Создание или обновление товара',				// DONE
	TYPE_CREATE_ITEM: 'Создание товара',										// DONT WORK
	TYPE_UPDATE_ITEM: 'Обновление товара',										// DONT WORK
	TYPE_PRICE_INDEX_CHANGED: 'Изменение ценового индекса',						// DONE
	TYPE_NEW_POSTING: 'Новое отправление',										// DONE
	TYPE_POSTING_CANCELLED: 'Отмена отправления',								// DONE
	TYPE_STATE_CHANGED: 'Изменение статуса отправления',						// UNDONE
	TYPE_CUTOFF_DATE_CHANGED: 'Изменение даты отгрузки отправления (beta)',		// DONE
	TYPE_DELIVERY_DATE_CHANGED: 'Изменение даты доставки отправления (rFBS)',	// UNDONE
	TYPE_STOCKS_CHANGED: 'Изменение остатков на складах продавца',				// UNDONE
	TYPE_UPDATE_MESSAGE: 'Сообщение в чате изменено',							// UNDONE
	TYPE_MESSAGE_READ: 'Ваше сообщение прочитано',								// UNDONE
	TYPE_CHAT_CLOSED: 'Чат закрыт'												// UNDONE


}
*/
// Chats
var ChatType = {

	Seller_Support: 'Чат с поддержкой',
	Buyer_Seller: 'Чат с покупателем',
	Seller_Notification: 'Уведомления Ozon'

}

var Shop = {

	187388: 'Calathea',
	137219: 'Evo-Beauty',
	185483: 'Sesam Street',
	99050: 'Top Experts',
	155459: 'Большая разница',
	158380: 'В два клика',
	189126: 'Великие реки',
	124615: 'Гармония жизни',
	153226: 'Западный берег',
	149725: 'Западный экспресс',
	169016: 'Икра Слов',
	163613: 'Какая вам розница?',
	163627: 'Косая аллея',
	185829: 'Красивое название',
	189140: 'Летучий голландец',
	193339: 'Лучше Единорог',
	191455: 'Широкий жест',
	209498: 'Новая классика',
	209469: 'Длинная ночь',
	200087: 'Амурная ракета',
	213769: 'Топ Новинки',
	263121: 'Енот Полоскун',
	312747: 'Большой Ассортимент',
	91986: 'Athleus',
	96389: 'Athleus Professional',
	344000: 'Дайте две!',
	399010: 'Умная покупка',
	440514: 'Маленькая пятница',
	440671: 'Материальные ценности',
	537900: 'Evo Beauty',
	551591: 'Electerra',
	553056: 'Шарик&Мурзик',
	553131: 'Evo Sante',
	553915: 'Evo Lava',
	553922: 'Evo Chrono',
	557867: 'illumetik',
	603345: 'Carowell',
	603328: 'Evo Action',
	632795: 'Туда и Обратно',
	594385: 'Evo Mama',
	614076: 'Tinkly',
	614114: 'Eternal Friday',
	613932: 'Know House',
	632590: 'Amable',
	632612: 'Плюшевое настроение',
	603281: 'Maitre du bois',
	640801: 'MOI',
	669790: 'StyleGuard',
	669817: 'Мэри Крисмас',
	1007505: 'HoneyCare',
	1220669: 'Evo Indium',
	1274963: 'illumetik',
	1274865: 'Шарик&Мурзик',
	1293773: 'HoneyCare',
	1295549: 'MOI'

}

export function TYPE_NEW_MESSAGE(content) {

	if (content.user.id == 'chat_seller_bot' || content.data[0] == "Оцените нашу работу") { return null }

	/*
		if (content.chat_type == 'Seller_Notification') {
	
			let arrMessage = shLog.getRange('D:D').getValues().flat();
			let excerpt = content.data[0].substring(0, 50);
			let skip = false;
	
			arrMessage.forEach((el) => {
	
				if (el == excerpt) { skip = true; }
	
			})
	
			if (skip) { return null }
	
		}
	*/

	let textToTG =
		`💽 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${Shop[content.seller_id] ? Shop[content.seller_id] : content.seller_id}
*Тип чата:* ${ChatType[content.chat_type]}
*ID отправителя:* ${content.user.id}
*Тип отправителя:* ${content.user.type}
*Дата:* ${(new Date(content.created_at)).toLocaleString('ru')}
*Сообщение:* ${content.data}`
			.replace(/_/gi, ' ')	// Replace '_' => 'space'

	return textToTG

}


export function TYPE_CREATE_OR_UPDATE_ITEM(content) {

	const textToTG =

		`💽 *${ENUM.MessageType[content.message_type]}*

*Магазин:* ${Shop[content.seller_id] ? Shop[content.seller_id] : content.seller_id}
*Артикул:* ${content.offer_id}
*Информация:* ${content.is_error ? 'Были ошибки, товар не создан или не обновлён' : 'Товар создан или обновлён без ошибок'}
*Дата изменения:* ${(new Date(content.changed_at)).toLocaleString('ru')}`
			.replace(/_/gi, ' ')              

	return textToTG

}