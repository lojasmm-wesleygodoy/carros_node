const modeloController = require("../controller/modelo-controller");

const router = require("express").Router();

router.get("/listar-todos", modeloController.listarTodosModelos);
router.get("/consultar/:idModelo", modeloController.consultarModelo);
router.post("/criar", modeloController.criarModelo);
router.put("/atualizar", modeloController.atualizarModelo);
router.delete("/excluir/:idModelo", modeloController.excluirModelo);

module.exports = router;