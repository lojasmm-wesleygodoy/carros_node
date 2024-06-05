const marcaController = require("../controller/marca-controller");

const router = require("express").Router();

router.get("/consultar/:idMarca", marcaController.consultarMarca);
router.post("/criar", marcaController.criarMarca);
router.put("/atualizar", marcaController.atualizarMarca);
router.delete("/excluir/:idMarca", marcaController.excluirMarca);

module.exports = router;