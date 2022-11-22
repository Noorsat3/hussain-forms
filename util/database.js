const oracledb = require('oracledb');
const windows1256 = require('windows-1256');

const mypw = process.env.dbPass;  // set mypw to the hr schema password

const connection = oracledb.getConnection({
  user: process.env.dbUser,
  password: mypw,
  connectString:
    `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))
     (CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
});

module.exports = connection;