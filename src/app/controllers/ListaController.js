import conexao from '../database/conexao.js'

class ListaController {
    index(req, res) {
        const sql = 'SELECT * FROM`lista`.items'
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(200).json(result)
            }
        })
    }

    store(req, res) {
        console.log(req.body)
        const { nome, quantidade } = req.body; // Desestruture os campos do body
        const lista = { nome, quantidade };
        const sql = 'INSERT INTO `lista`.`items` SET ?;'

        conexao.query(sql, lista, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(201).json(result)
            }
        })
    }

    show(req, res) {
        const id = req.params.id;
        const sql = 'SELECT * FROM `lista`.`items` where iditems=?'
        conexao.query(sql, id, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(200).json(result[0])
            }
        })

    }

    update(req, res) {
        const id = req.params.id;
        const lista = req.body;
        const sql = 'UPDATE `lista`.`items` SET ? WHERE iditems = ?;'
        conexao.query(sql, [lista, id], (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(201).json(result)
            }
        })
    }

    delete(req, res) {
        const id = req.params.id;
        const sql = 'DELETE FROM `lista`.`items` where iditems=?'
        conexao.query(sql, id, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(200).json(result)
            }
        })
    }
}
export default new ListaController();
