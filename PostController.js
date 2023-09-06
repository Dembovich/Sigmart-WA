import * as TGbot from "./TGbot.js"
import * as OzonPush from "./OzonPush.js"
import ENUM from './enum.json' assert { type: "json" };

class PostController {


    async OzonPushNotifications(req, res) {

        const TimeNow = new Date()
        function _ozonResponse(res, state, TimeNow) {
            switch (state) {

                case 200:
                    return res.status(state).json({ result: true })
                    break
                case 500:
                    return res.status(state).json({ error: { code: "ERROR_UNKNOWN", message: 'Сорян, наша вина', details: null } })
                    break
                case 501:
                    return res.status(state).json({ error: { code: "ERROR_UNKNOWN", message: 'Неизвестный приложению тип', details: null } })
                    break
            }

        }

        try {

            console.log(req.body);
            const message_type = req.body.message_type
            console.log('Ozon прислал - ' + message_type);


            switch (message_type) {

                // Проверка связи
                case 'TYPE_PING':
                    //TGbot.sendMessage(ENUM.TGchatID.dembovich, 'Пинганули - ' + JSON.stringify(req.body), 'Markdown')
                    return res.status(200).json({ version: '0.9', name: 'Sigmart-WA', time: TimeNow })

                // Новое сообщение в чате
                case 'TYPE_NEW_MESSAGE':
                    TGbot.sendMessage(ENUM.TGchatID.dembovich, OzonPush.TYPE_NEW_MESSAGE(req.body))
                    return _ozonResponse(res, 200, TimeNow)

                // Создание или обновление товара
                case 'TYPE_CREATE_OR_UPDATE_ITEM':
                    TGbot.sendMessage(ENUM.TGchatID.dembovich, OzonPush.TYPE_CREATE_OR_UPDATE_ITEM(req.body))
                    return _ozonResponse(res, 200, TimeNow)

                // Изменение ценового индекса
                case 'TYPE_PRICE_INDEX_CHANGED':
                    TGbot.sendMessage(ENUM.TGchatID.dembovich, OzonPush.TYPE_PRICE_INDEX_CHANGED(req.body))
                    return _ozonResponse(res, 200, TimeNow)

                // Новое отправление
                case 'TYPE_NEW_POSTING':
                    TGbot.sendMessage(ENUM.TGchatID.dembovich, OzonPush.TYPE_NEW_POSTING(req.body))
                    return _ozonResponse(res, 200, TimeNow)

                // Отмена отправления
                case 'TYPE_POSTING_CANCELLED':
                    TGbot.sendMessage(ENUM.TGchatID.dembovich, OzonPush.TYPE_POSTING_CANCELLED(req.body))
                    return _ozonResponse(res, 200, TimeNow)

                // Если сток стал <10 ALARM
                default:
                    console.log('Неизвестный приложению тип')
                    return _ozonResponse(res, 501, TimeNow)


            }





        } catch (e) {
            console.log(e)
            TGbot.sendMessage(ENUM.TGchatID.dembovich, '🔴 *Ошибка в PostController* - ' - e.message)
            _ozonResponse(res, 500, TimeNow)

        }
    }





}


export default new PostController();
