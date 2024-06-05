const modeloModel = require("../model/modelo-model");

class Modelo {
  async consultarModelo(req, res) {
    try {
      const modelo = await modeloModel.consultarModelo(req.params.idModelo);
      return res.status(200).send({ modelo });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async criarModelo(req, res) {
    try {
      const modelo = await modeloModel.criarModelo(req.body);
      return res.status(200).send({ modelo });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async atualizarModelo(req, res) {
    try {
      const modelo = await modeloModel.atualizarModelo(req.body);
      return res.status(200).send({ modelo });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async excluirModelo(req, res) {
    try {
      const modelo = await modeloModel.excluirModelo(req.params.idModelo);
      return res.status(200).send({ modelo });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }
}

module.exports = new Modelo();