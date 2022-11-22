const oracledb = require("oracledb");
const windows1256 = require("windows-1256");

exports.getLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.render("user/userLogin", {
      pageTitle: "Hussain Forms",
      navTitle: "Hussain Forms",
      errorMessage: req.flash("loginError"),
      deletedUser: req.flash("deletedUser"),
    });
  } else {
    res.redirect("/home");
  }
};

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let text;
  try {
    connection = await oracledb.getConnection({
      user: "PER",
      password: "PER",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.107.203.181)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=KCSCLOUD2)))",
    });
    const id = 7;
    result = await connection.execute(
      `SELECT * FROM users WHERE USR_NAME_E = '${username}' and USR_PASS = '${password}'`,
      {},
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data.rows[0] ?? "data is null");
          if (data.rows[0] != null) {
            var user = data.rows[0];
            var userNameE, userNameA, userId, userStatus, pageTitle;
            req.session.userId = userId = user[0];
            req.session.userNameA = userNameA = user[1];
            req.session.userNameE = userNameE = user[2];
            req.session.userStatus = userStatus = user[4];
            pageTitle = "Hussain Forms";
            if (req.session.userStatus != 0) {
              req.session.isLoggedIn = true;
              res.render("user/userHome", {
                pageTitle: pageTitle,
                userName: userNameA,
                alert: null,
                serNo: null,
              });
            } else {
              req.flash("deletedUser", "الموظف تم حذفه من النظام");
              res.redirect("/");
            }
          } else {
            req.flash(
              "loginError",
              "الرجاء التاكد من اسم الموظف او كلمة المرور"
            );
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getHome = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.render("user/userHome", {
      pageTitle: "Hussain Forms",
      userName: req.session.userNameA,
      alert: req.session.alert,
      serNo: req.session.serNo,
    });
  } else {
    res.redirect("/");
  }
};
