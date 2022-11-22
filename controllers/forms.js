const oracledb = require("oracledb");
const windows1256 = require("windows-1256");

const mypw = process.env.dbPass;

exports.getAIF = (req, res, next) => {
  const datetime = new Date().toISOString().slice(0, 10);
  res.render("forms/AIF", {
    pageTitle: "تحقيق اداري",
    navTitle: "نوذج تحقيق اداري",
    userName: req.session.userNameA,
    userId: req.session.userId,
    todayDate: datetime,
  });
};

exports.postAIF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const empjob = req.body.empjob;
  const bossName = req.body.bossName;
  const bossJob = req.body.bossJob;
  const errorDate = req.body.errorDate;
  const nowDate = req.body.nowDate;
  const erorrPlace = req.body.erorrPlace;
  const errorTime = req.body.errorTime;
  const errorDesc = req.body.errorDesc;
  const witnessesDesc = req.body.witnessesDesc;
  const membersNames = req.body.membersNames;
  const ADM_ACTION = req.body.ADM_ACTION;
  let ADM_ACTION_OTHER = req.body.ADM_ACTION_OTHER;
  let PUNISH_START_DATE = req.body.PUNISH_START_DATE;
  let PUNISH_END_DATE = req.body.PUNISH_END_DATE;
  const punishGoals = req.body.punishGoals;
  const errorRepeat = req.body.errorRepeat;
  const emp_statment = req.body.emp_statment;
  const datetime = new Date().toISOString().slice(0, 10);
  if (ADM_ACTION != 5) {
    ADM_ACTION_OTHER = "null";
  }

  if (ADM_ACTION != 3) {
    PUNISH_START_DATE = datetime;
    PUNISH_END_DATE = datetime;
  }
  try {
    connection = await oracledb.getConnection({
      user: "PER",
      password: "PER",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.107.203.181)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=KCSCLOUD2)))",
    });
    result = await connection.execute(
      `INSERT INTO ADMINISTRATIVE_INQUIRY_TRS
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${empjob}', '${bossName}', '${bossJob}', 
        DATE'${errorDate}', DATE'${nowDate}', '${errorTime}', '${errorDesc}'
        , '${witnessesDesc}' , '${membersNames}', '${ADM_ACTION}', '${ADM_ACTION_OTHER}', DATE'${PUNISH_START_DATE}'
        , DATE'${PUNISH_END_DATE}', '${punishGoals}', '${errorRepeat}', '${emp_statment}', DATE'${datetime}', '${erorrPlace}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getARTCF = (req, res, next) => {
  res.render("forms/ARTCF", {
    pageTitle: "إقرار استلام سيارة",
    navTitle: "إقرار استلام سيارة",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postARTCF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const userNationality = req.body.nat;
  const userIdt = req.body.id;
  const userId_place = req.body.id_place;
  const userId_exp = req.body.id_exp;
  const car_model = req.body.car_model;
  const car_year = req.body.car_year;
  const car_pord = req.body.car_pord;
  const car_color = req.body.car_color;
  const companyName = req.body.companyName;
  const emp_signature = req.body.emp_signature;
  const emp_received_car_date = req.body.emp_received_car_date;
  const datetime = new Date().toISOString().slice(0, 10);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO CAR_RECIVE_TRS 
      (SER_NO, EMP_CODE, EMP_NAME, NAT_NAME, CAR_NAME,
         CAR_PORD, CAR_MODEL, ID_CARD, ID_EXP_DATE, 
        ID_PLACE, CAR_COLOR, COMP_POL_NAME, RECIVER_NAME, 
        RECIVER_SIGN, RECIVE_DATE, TRS_DATE) 
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${userNationality}', '${car_model}', '${car_pord}',
         '${car_year}', '${userIdt}', DATE'${userId_exp}', '${userId_place}', '${car_color}', '${companyName}', 
         '${username}', '${emp_signature}', DATE'${emp_received_car_date}', DATE'${datetime}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getARTLF = (req, res, next) => {
  res.render("forms/ARTLF", {
    pageTitle: "إقرار استلام لائحة عمل",
    navTitle: "إقرار استلام لائحة عمل",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postARTLF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const emp_job = req.body.emp_job;
  const emp_dep = req.body.emp_dep;
  const req_date = req.body.req_date;
  const datetime = new Date().toISOString().slice(0, 10);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO RECEIPT_LIST_TRS 
      (SER_NO, EMP_CODE, EMP_NAME, EMP_JOB, EMP_DEP,
        TRS_DATE, REQ_DATE) 
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${emp_job}', '${emp_dep}', DATE'${datetime}' , DATE'${req_date}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getPPF = (req, res, next) => {
  res.render("forms/PPF", {
    pageTitle: "إجراء جزائي",
    navTitle: "إجراء جزائي",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postPPF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const empNo = req.body.empNo;
  const empAdmini = req.body.empAdmini;
  const empSection = req.body.empSection;
  const empJob = req.body.empJob;
  const joinDate = req.body.joinDate;
  const lastPenaltyDate = req.body.lastPenaltyDate;
  const subject = req.body.subject;
  const directResponsible = req.body.directResponsible;
  const thePenalty = req.body.thePenalty;
  let DEDUCTION_DAYS = req.body.DEDUCTION_DAYS;
  let thePenaltyStoppingDays = req.body.thePenaltyStoppingDays;
  const mr = req.body.mr;
  const hrAdmini = req.body.hrAdmini;
  const hrDate = req.body.hrDate;
  const datetime = new Date().toISOString().slice(0, 10);
  if (DEDUCTION_DAYS == null) {
    DEDUCTION_DAYS = 0;
  }
  if (thePenaltyStoppingDays == null) {
    thePenaltyStoppingDays = 0;
  }
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO PENALTY_PROCEDURE_TRS
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${empNo}', '${empAdmini}', '${empSection}', '${empJob}', DATE'${joinDate}'
        , DATE'${lastPenaltyDate}', '${subject}', '${directResponsible}', '${thePenalty}', '${mr}', '${hrAdmini}'
        , DATE'${hrDate}', DATE'${datetime}', '${DEDUCTION_DAYS}', '${thePenaltyStoppingDays}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getJMRF = (req, res, next) => {
  res.render("forms/JMRF", {
    pageTitle: "تكليف بمهمة عمل",
    navTitle: "تكليف بمهمة عمل",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postJMRF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const localInterJob = req.body.localInterJob;
  const empId = req.body.empId;
  const empDate = req.body.empDate;
  const embJob = req.body.embJob;
  const empAdmini = req.body.empAdmini;
  const empDep = req.body.empDep;
  const directionMission = req.body.directionMission;
  const durationMission = req.body.durationMission;
  const durationFrom = req.body.durationFrom;
  const durationTo = req.body.durationTo;
  const missionSpecification = req.body.missionSpecification;
  let missionExpense = req.body.missionExpense ?? "null"; //last thing in database
  let missionExpense2 = req.body.missionExpense2 ?? "null"; //last thing in database
  let missionExpense3 = req.body.missionExpense3 ?? "null"; //last thing in database
  let expenseAmount = req.body.expenseAmount ?? 0;
  let travelingTicket = req.body.travelingTicket ?? "null";
  let visas = req.body.visas ?? "null";
  const msName = req.body.msName;
  const msDate = req.body.msDate;
  const edToName = req.body.edToName;
  const edForDays = req.body.edForDays;
  const edForDate = req.body.edForDate;
  const edName = req.body.edName;
  const edJob = req.body.edJob;
  const edDate = req.body.edDate;
  const aApproved = req.body.aApproved;
  const GENERAL_DIRECTOR_DATE = req.body.GENERAL_DIRECTOR_DATE;
  const datetime = new Date().toISOString().slice(0, 10);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO JOB_MISSION_REQUEST_TRS
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${localInterJob}', '${empId}', DATE'${empDate}', '${embJob}', '${empAdmini}', 
        '${empDep}', '${directionMission}', '${durationMission}', DATE'${durationFrom}', DATE'${durationTo}', '${missionSpecification}', 
        '${expenseAmount}', '${travelingTicket}', '${visas}', '${msName}', DATE'${msDate}', '${edToName}', '${edForDays}', DATE'${edForDate}', 
        '${edName}', '${edJob}', DATE'${edDate}', '${aApproved}', DATE'${GENERAL_DIRECTOR_DATE}', DATE'${datetime}', '${missionExpense}', 
        '${missionExpense2}', '${missionExpense3}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getDAF = (req, res, next) => {
  res.render("forms/DAF", {
    pageTitle: "تفويض الصلاحيات",
    navTitle: "تفويض الصلاحيات",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postDAF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const giFrom = req.body.giFrom;
  const delegateFully = req.body.delegateFully;
  const delegateJob = req.body.delegateJob;
  const delegateStartDay = req.body.delegateStartDay;
  const delegateStartDate = req.body.delegateStartDate;
  const delegateEndDay = req.body.delegateEndDay;
  const delegateEndDate = req.body.delegateEndDate;
  const delegateInsts = req.body.delegateInsts;
  const authorizedName = req.body.authorizedName;
  const authorizedJob = req.body.authorizedJob;
  const authorizedDate = req.body.authorizedDate;
  const authorizedToName = req.body.authorizedToName;
  const authorizedToJob = req.body.authorizedToJob;
  const authorizedToDate = req.body.authorizedToDate;
  const actualDelegateStartDay = req.body.actualDelegateStartDay;
  const actualDelegateStartDate = req.body.actualDelegateStartDate;
  const actualDelegateEndDay = req.body.actualDelegateEndDay;
  const actualDelegateEndDate = req.body.actualDelegateEndDate;
  const authorizedNote1 = req.body.authorizedNote1;
  const authorizedToNote1 = req.body.authorizedToNote1;
  const datetime = new Date().toISOString().slice(0, 10);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO DELEGATION_OF_AUTHORITY_TRS
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${username}', '${giFrom}', '${delegateFully}', 
        '${delegateJob}', '${delegateStartDay}', DATE'${delegateStartDate}', '${delegateEndDay}', DATE'${delegateEndDate}', 
        '${delegateInsts}', '${authorizedName}', '${authorizedJob}', DATE'${authorizedDate}', '${authorizedToName}', '${authorizedToJob}', 
         DATE'${authorizedToDate}', '${actualDelegateStartDay}', DATE'${actualDelegateStartDate}', '${actualDelegateEndDay}', 
         '${authorizedNote1}' , '${authorizedToNote1}' , DATE'${datetime}', DATE'${actualDelegateEndDate}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getARCF = (req, res, next) => {
  res.render("forms/ARCF", {
    pageTitle: "إقرار استلام عهدة",
    navTitle: "إقرار استلام عهدة",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postARCF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const userIdt = req.body.ID_CARD;
  const userId_place = req.body.ID_PLACE;
  const empJob = req.body.EMP_JOP;
  const first = req.body.FST;
  const second = req.body.SND;
  const third = req.body.TRD;
  const fourth = req.body.FTH;
  const fifth = req.body.FITH;
  const sixth = req.body.STH;
  const reqDate = req.body.req_date;
  const EMP_ID = req.body.EMP_ID;
  const datetime = new Date().toISOString().slice(0, 10);

  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO RECEIPT_OF_CUSTODY_TRS 
      (SER_NO, EMP_CODE, EMP_NAME, ID_CARD, ID_PLACE,
        EMP_JOB, FIRST_RECEIVE, SECOND_RECEIVE, THIRD_RECEIVE, FOURTH_RECEIVE, FIFTH_RECEIVE, 
        SIXTH_RECEIVE, REQ_DATE, TRS_DATE, EMP_ID) 
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${userIdt}', '${userId_place}', '${empJob}', 
        '${first}', '${second}', '${third}', '${fourth}', '${fifth}', 
        '${sixth}', DATE'${reqDate}', DATE'${datetime}', '${EMP_ID}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getIMF = (req, res, next) => {
  res.render("forms/IMF", {
    pageTitle: "نموذج التعريف بالموظف",
    navTitle: "نموذج التعريف بالموظف",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postIMF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const userNationality = req.body.nat;
  const startContract = req.body.start_contract;
  const endContract = req.body.end_contract;
  const empJob = req.body.emp_job;
  const empSalary = req.body.emp_salary;
  const datetime = new Date().toISOString().slice(0, 10);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO EMP_IDENT_TRS 
      (SER_NO, EMP_CODE, EMP_NAME, NAT_NAME, CONTRACT_START,
        CONTRACT_END, EMP_JOB, EMP_SALARY, TRS_DATE) 
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${userNationality}', DATE'${startContract}', DATE'${endContract}',
         '${empJob}', '${empSalary}', DATE'${datetime}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getCF = (req, res, next) => {
  res.render("forms/CF", {
    pageTitle: "إخلاء طرف",
    navTitle: "إخلاء طرف",
    userName: req.session.userNameA,
    userId: req.session.userId,
  });
};

exports.postCF = async (req, res, next) => {
  const serialNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = req.session.userId;
  const username = req.session.userNameA;
  const empId = req.body.empId;
  const empNat = req.body.empNat;
  const empAdmini = req.body.empAdmini;
  const empDep = req.body.empDep;
  const empJob = req.body.empJob;
  const vacExit = req.body.vacExit;
  const edName = req.body.edName;
  const edDate = req.body.edDate;
  const edClearance = req.body.edClearance;
  const edReason = req.body.edReason;
  const itdName = req.body.itdName;
  const itdDate = req.body.itdDate;
  const itdClearance = req.body.itdClearance;
  const itdReason = req.body.itdReason;
  const sName = req.body.sName;
  const sDate = req.body.sDate;
  const sClearance = req.body.sClearance;
  const sReason = req.body.sReason;
  const fName = req.body.fName;
  const fDate = req.body.fDate;
  const fClearance = req.body.fClearance;
  const fReason = req.body.fReason;
  let hrHousing = req.body.hrHousing;
  let hrMedicalCard = req.body.hrMedicalCard;
  let hrEmpCard = req.body.hrEmpCard;
  let hrLoans = req.body.hrLoans;
  let hrTransportation = req.body.hrTransportation;
  let hrTelecom = req.body.hrTelecom;
  const hrName = req.body.hrName;
  const hrDate = req.body.hrDate;
  const hrClearance = req.body.hrClearance;
  const hrReason = req.body.hrReason;
  const eaClearance = req.body.eaClearance;
  const eaReason = req.body.eaReason;
  const eaDate = req.body.eaDate;
  const datetime = new Date().toISOString().slice(0, 10);
  let crVacation;
  let crExit;
  if (vacExit == 1) {
    crVacation = 1;
    crExit = 0;
  } else {
    crVacation = 0;
    crExit = 1;
  }
  let edClear;
  let edNotClear;
  if (edClearance == 1) {
    edClear = 1;
    edNotClear = 0;
  } else {
    edClear = 0;
    edNotClear = 1;
  }
  let itdClear;
  let itdNotClear;
  if (itdClearance == 1) {
    itdClear = 1;
    itdNotClear = 0;
  } else {
    itdClear = 0;
    itdNotClear = 1;
  }
  let sClear;
  let sNotClear;
  if (sClearance == 1) {
    sClear = 1;
    sNotClear = 0;
  } else {
    sClear = 0;
    sNotClear = 1;
  }
  let fClear;
  let fNotClear;
  if (fClearance == 1) {
    fClear = 1;
    fNotClear = 0;
  } else {
    fClear = 0;
    fNotClear = 1;
  }
  if (hrHousing == null) {
    hrHousing = 0;
  }
  if (hrMedicalCard == null) {
    hrMedicalCard = 0;
  }
  if (hrEmpCard == null) {
    hrEmpCard = 0;
  }
  if (hrLoans == null) {
    hrLoans = 0;
  }
  if (hrTransportation == null) {
    hrTransportation = 0;
  }
  if (hrTelecom == null) {
    hrTelecom = 0;
  }
  let hrClear;
  let hrNotClear;
  if (hrClearance == 1) {
    hrClear = 1;
    hrNotClear = 0;
  } else {
    hrClear = 0;
    hrNotClear = 1;
  }
  let eaClear;
  let eaNotClear;
  if (eaClearance == 1) {
    eaClear = 1;
    eaNotClear = 0;
  } else {
    eaClear = 0;
    eaNotClear = 1;
  }
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbUser,
      password: mypw,
      connectString:
        `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.dbHost})(PORT=${process.env.dbPort}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${process.env.dbServiceName})))`
    });
    result = await connection.execute(
      `INSERT INTO CLEARANCE_FORM_TRS 
        VALUES 
        (${serialNumber}, '${userId}', '${username}', '${empId}', '${empNat}', '${empAdmini}', '${empDep}', '${empJob}', '${crVacation}', 
        '${crExit}', '${edName}', DATE'${edDate}', '${edClear}', '${edNotClear}', '${edReason}', DATE'${itdDate}', 
        '${itdClear}', '${itdNotClear}', '${itdReason}', '${sName}', DATE'${sDate}', '${sClear}', '${sNotClear}', '${sReason}'
        , '${fName}', DATE'${fDate}', '${fClear}', '${fNotClear}', '${fReason}', '${hrName}', DATE'${hrDate}', 
        '${hrClear}', '${hrNotClear}', '${hrReason}', '${hrHousing}', '${hrMedicalCard}', '${hrEmpCard}', '${hrLoans}', '${hrTransportation}', 
        '${hrTelecom}' , '${eaClear}', '${eaNotClear}', '${eaReason}', DATE'${eaDate}', DATE'${datetime}', '${itdName}')`,
      function async(err, data) {
        if (err) {
          console.log(err);
        } else {
          if (username != null && userId != null) {
            connection.commit();
            console.log(data);
            console.log("data has been inserted");
            const pageTitle = "Hussain Forms";
            req.session.serNo = serialNumber;
            req.session.alert = 1;
            return res.redirect('/home');
          } else {
            return res.redirect("/");
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};
