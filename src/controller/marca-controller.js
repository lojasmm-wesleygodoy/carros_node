const marcaModel = require("../model/marca-model");

class Marca {
  async consultarMarca(req, res) {
    try {
      const marca = await marcaModel.consultarMarca(req.params.idMarca);
      return res.status(200).send({ marca });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async criarMarca(req, res) {
    try {
      const marca = await marcaModel.criarMarca(req.body.nome);
      return res.status(200).send({ marca });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async atualizarMarca(req, res) {
    try {
      const marca = await marcaModel.atualizarMarca(req.body);
      return res.status(200).send({ marca });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }

  async excluirMarca(req, res) {
    try {
      const marca = await marcaModel.excluirMarca(req.params.idMarca);
      return res.status(200).send({ marca });
    } catch (error) {
      return res.status(400).send({ msg: `Opss... ${error.message}` });
    }
  }
}

module.exports = new Marca();