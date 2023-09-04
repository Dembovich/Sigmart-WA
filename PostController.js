
class PostController {


    async OzonPushNotifications(req, res) {

        const TimeNow = new Date()
        function _ozonResponse(res, state, TimeNow) {
            switch (state) {

                case 200:
                    return res.status(state).json({ version: '0.1', name: 'Sigmart-WA', time: TimeNow })
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
                    
                    return _ozonResponse(res, 200, TimeNow)

                // Новое сообщение в чате
                case 'TYPE_NEW_MESSAGE':
                    //TYPE_NEW_MESSAGE(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                // Обновление товара
                case 'TYPE_UPDATE_ITEM':
                    //TYPE_UPDATE_ITEM(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                // Изменение ценового индекса
                case 'TYPE_PRICE_INDEX_CHANGED':
                    //TYPE_PRICE_INDEX_CHANGED(contentRequest, shLog)
                    return _ozonResponse(res, 200, TimeNow)

                // Создания товара
                case 'TYPE_CREATE_ITEM':
                    //TYPE_CREATE_ITEM(contentRequest, shLog)
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
