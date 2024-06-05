const { Pool } = require('pg');


class Database {
  query(sql) {
    return new Promise(function (resolve) {

      var pool = new Pool({ connectionString: 'postgres://postgres:1234@localhost:5432/postgres' });

      pool.query(sql, (error, res) => {
        if (error) {
          console.error("***********************************************************");
          console.error(error.message);
          console.error();
          console.error(sql);
          console.error("***********************************************************");
          console.log();
          resolve({
            status: false,
            msg: 'Um erro ocorreu ao executar a SQL.',
            msgDb: error.message,
            code: error.code,
          });
          pool.end();
        } else {
          console.log(sql);
          console.log();
          resolve({ status: true, rows: res.rows });
          pool.end();
        }
      });
    });
  };

}

module.exports = new Database();