import * as TGbot from "./TGbot.js"
import * as OzonPush from "./OzonPush.js"

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
                    //TGbot.sendMessage(211614859, 'Пинганули - ' + JSON.stringify(req.body), 'Markdown')
                    return res.status(200).json({ version: '0.8', name: 'Sigmart-WA', time: TimeNow })

                // Новое сообщение в чате
                case 'TYPE_NEW_MESSAGE':
                    TGbot.sendMessage(211614859, OzonPush.TYPE_NEW_MESSAGE(req.body), 'Markdown')
                    return _ozonResponse(res, 200, TimeNow)

                // Новое сообщение в чате
                case 'TYPE_CREATE_OR_UPDATE_ITEM':
                    TGbot.sendMessage(211614859, OzonPush.TYPE_CREATE_OR_UPDATE_ITEM(req.body), 'Markdown')
                    return _ozonResponse(res, 200, TimeNow)

                // !Обновление товара (DONT WORK)
                case 'TYPE_UPDATE_ITEM':
                    return _ozonResponse(res, 200, TimeNow)

                // !Создания товара (DONT WORK)
                case 'TYPE_CREATE_ITEM':
                    return _ozonResponse(res, 200, TimeNow)

                // Изменение ценового индекса
                case 'TYPE_PRICE_INDEX_CHANGED':
                    //TYPE_PRICE_INDEX_CHANGED(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                // Новое отправление
                case 'TYPE_NEW_POSTING':
                    //TYPE_NEW_POSTING(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                // Отмена отправления
                case 'TYPE_POSTING_CANCELLED':
                    //TYPE_POSTING_CANCELLED(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                default:
                    console.log('Неизвестный приложению тип')
                    return _ozonResponse(res, 501, TimeNow)


            }





        } catch (e) {
            console.log(e)
            _ozonResponse(res, 500, TimeNow)

        }
    }





}


export default new PostController();
