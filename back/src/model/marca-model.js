const database = require("../config/database");

class MarcaModel {
  async listarTodasMarcas() {
    try {
      const sql = `SELECT id, nome, criado_em, atualizado_em FROM estudos.marca;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar listar todas as marcas no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar listar todas as marcas no banco de dados.");
    }
  }

  async consultarMarca(idMarca) {
    try {
      const sql = `SELECT id, nome, criado_em, atualizado_em FROM estudos.marca WHERE id = ${idMarca};`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar consultar uma marca no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar consultar uma marca no banco de dados.");
    }
  }

  async criarMarca(nome) {
    try {
      const sql = 
        `INSERT INTO estudos.marca (
         nome
        ) VALUES (
          '${nome}'
        ) RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar inserir uma marca no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar inserir uma marca no banco de dados.");
    }
  }

  async atualizarMarca(marca) {
    try {
      const sql = 
        `UPDATE estudos.marca SET 
          nome = '${marca.nome}',
          atualizado_em = 'now()'
          WHERE id = ${marca.id}
        RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar atualizar uma marca no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar atualizar uma marca no banco de dados.");
    }
  }

  async excluirMarca(idMarca) {
    try {
      const sql = 
        `DELETE FROM estudos.marca
          WHERE id = ${idMarca}
        RETURNING *;`;

      const { rows } = await database.query(sql);

      return rows && rows.length > 0 ? rows : null;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar excluir uma marca no banco de dados.");
      throw new Error("Ocorreu um erro ao tentar excluir uma marca no banco de dados.");
    }
  }
}

module.exports = new MarcaModel();