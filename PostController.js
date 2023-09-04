
let arrName = [];
class PostController {


    async create(req, res) {
        try {

            console.log(req.body);
            arrName.push(req.body.name)
            res.status(200).json({ version: '0.1', name: 'Sigmart-WA', time: new Date() })

        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            console.log(req);
            res.status(200).json({ state: 'Сервер работает!', array: arrName })

        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {

            console.log(req.body);
            res.status(200).json('Сервер работает!')

        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {

            console.log(req.body);
            res.status(200).json('Сервер работает!')

        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {

            console.log(req.body);
            res.status(200).json('Сервер работает!')

        } catch (e) {
            res.status(500).json(e)
        }
    }



}


export default new PostController();
