const database = require("../config/database");

class ModeloModel {
  async consultarModelo(idModelo) {
    try {
      const sql = `SELECT id, nome, ano, cor, id_marca FROM estudos.modelo WHERE id = ${idModelo};`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar consultar um modelo no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar consultar um modelo no banco de dados.");
    }
  }

  async criarModelo(modelo) {
    try {
      const sql = 
        `INSERT INTO estudos.modelo (
          nome,
          ano,
          cor,
          id_marca
        ) VALUES (
          '${modelo.nome}',
          ${modelo.ano},
          '${modelo.cor}',
          ${modelo.id_marca}
        ) RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar inserir um modelo no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar inserir um modelo no banco de dados.");
    }
  }

  async atualizarModelo(modelo) {
    try {
      const sql = 
        `UPDATE estudos.modelo SET 
          nome = '${modelo.nome}',
          ano = ${modelo.ano},
          cor = '${modelo.cor}',
          id_marca = ${modelo.id_marca}
        WHERE id = ${modelo.id}
        RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar atualizar um modelo no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar atualizar um modelo no banco de dados.");
    }
  }

  async excluirModelo(idModelo) {
    try {
      const sql = 
        `DELETE FROM estudos.modelo
          WHERE id = ${idModelo}
        RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar excluir um modelo no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar excluir um modelo no banco de dados.");
    }
  }
}

module.exports = new ModeloModel();