// const oracledb = require("oracledb");
// const windows1256 = require("windows-1256");

// exports.getLogin = (req, res, next) => {
//   res.render("admin/adminLogin", {
//     pageTitle: "Admin Panel",
//     navTitle: "Admin Login",
//   });
// };

// exports.postLogin = async (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   let text;
//   try {
//     connection = await oracledb.getConnection({
//       user: "PER",
//       password: "PER",
//       connectString:
//         "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.107.203.181)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=KCSCLOUD2)))",
//     });
//     const id = 7;
//     result = await connection.execute(
//       `SELECT * FROM users WHERE USR_NAME_E = '${username}' and USR_PASS = '${password}'`,
//       {},
//       function (err, data) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data.rows[0] ?? "data is null");
//           if (data.rows[0] != null) {
//             req.session.isLoggedIn = true;
//             res.render("admin/home", {
//               pageTitle: "Hussain Forms",
//               navTitle: `This is the ${data.rows[0][1]} page`,
//             });
//           } else {
//             res.redirect("/admin/login");
//           }
//         }
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//   }
// };
