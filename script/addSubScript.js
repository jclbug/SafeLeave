const submit = document.getElementById("submit");
const id = document.getElementById("id");
const pw = document.getElementById("pw");
const autoCal = document.getElementById("autoCal");
const body = document.getElementById("body");
const manualCal = document.getElementById("manualCal");
const overlay = document.getElementById("overlay");
const stdName = document.getElementById("stdName");
const perIn = document.getElementById("perIn");
const dateBox = document.getElementById("dateBox");
const dateLoad = document.getElementById("dateLoad");
const dateSub = document.getElementById("dateSub");
const dateHead = document.getElementById("dateHead");
const retry = document.getElementById("retry");

const captchaImage = document.getElementById("captchaImage");
const captchaValue = document.getElementById("captchaValue");

const addSub = document.getElementById("addSub");
const subjects = document.getElementById("subjects");
const calLeave = document.getElementById("calLeave");
const resultBox = document.getElementById("resultBox");
const closeBtn = document.getElementById("close");
const cardBox = document.getElementById("cardBox");
const timer = document.getElementById("time-box");
let totalSub = 1;
let time;
let clearTime;

const HOST = "https://worker.echocors.workers.dev/";
let SESSION_DATA = null;

let success = false;
let x;
let mode;
let need;
let isGoingBackAllowed = false;

// **********************
// let vpass = "";
// const V_CHECK_PASS = "#WJocvli71816;";
// **********************

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get("page");

if (page) {
  body.classList = urlParamToRedirectPageClass(page);
  history.replaceState(
    { page: urlParamToRedirectUrlParam(page) },
    "",
    `?page=${urlParamToRedirectUrlParam(page)}`
  );
} else {
  body.classList = "home";
  history.replaceState({ page: "home" }, "", "?page=home");
}

manualCal.addEventListener("click", function () {
  totalSub = 1;
  perIn.value = "75";
  body.classList = "addSubBody";
  addSub.classList.remove("hide");
  subjects.style.marginBottom = "0px";
  cardBox.classList.add("subDateHide");
  subjects.classList.remove("disable");
  document.querySelector(".subName ").removeAttribute("disabled");
  history.pushState({ page: "manualSub" }, "", "?page=manualSub");
  mode = history.state.page.includes("auto") ? "auto" : "manual";
  isGoingBackAllowed = true;
  window.scrollTo(0, 0);
});

window.addEventListener("popstate", function (event) {
  if (isGoingBackAllowed) {
    if (event.state.page) {
      if (event.state.page === "login") {
        timer.textContent = "0 : 00";
        clearInterval(clearTime);
        timer.style.animationName = "";
        timer.textContent = "";
      }
      body.classList = urlParamToPageClass(event.state.page);
    } else {
      body.classList = "home";
    }
  } else {
    let currentPageClass = body.classList[0];
    if (currentPageClass == "addSubBody") {
      currentPageClass = "manualSub";
    }

    if (currentPageClass == "login" || currentPageClass == "manualSub") {
      body.classList = "home";
      history.replaceState({ page: "home" }, "", "?page=home");
    } else {
      history.replaceState(
        { page: currentPageClass },
        "",
        `?page=${currentPageClass}`
      );
    }
  }
});

window.addEventListener(
  "popstate",
  function (event) {
    const state = event.state;
    if (typeof state === "object") {
      if (state.obsolete !== true) {
        history.replaceState({ obsolete: true }, "");
        history.pushState(state, "");
      } else {
        history.back();
      }
    }
  },
  false
);

function urlParamToRedirectPageClass(urlParam) {
  switch (urlParam) {
    case "home":
      return "home";
    case "autoSub":
      return "login";
    case "manualSub":
      return "addSubBody";
    case "autoResult":
      return "login";
    case "manualResult":
      return "addSubBody";
    case "login":
      return "login";
    default:
      return "home";
  }
}

function urlParamToRedirectUrlParam(urlParam) {
  switch (urlParam) {
    case "home":
      return "home";
    case "autoSub":
      return "login";
    case "manualSub":
      return "manualSub";
    case "autoResult":
      return "login";
    case "manualResult":
      return "manualSub";
    case "login":
      return "login";
    default:
      return "home";
  }
}

function urlParamToPageClass(urlParam) {
  switch (urlParam) {
    case "home":
      return "home";
    case "login":
      return "login";
    case "autoSub":
      return "addSubBody";
    case "manualSub":
      return "addSubBody";
    case "autoResult":
      return "result";
    case "manualResult":
      return "result";
    default:
      return "home";
  }
}

mode = history.state.page.includes("auto") ? "auto" : "manual";

// ******************************************************

// alert(
//   "Sorry for the inconvenience. This feature is currently disabled due to university instructions. In the meantime, please use the manual mode to calculate your leave."
// );

// let devHoldTimer = null;
// autoCal.addEventListener("mousedown", function (event) {
//   if (devHoldTimer) {
//     clearTimeout(devHoldTimer);
//   }

//   devHoldTimer = setTimeout(function () {
//     const passCode = askForDevSpecialModePassword();
//     if (passCode) {
//       activateDevSpecialMode();
//     }
//   }, 1000);
// });

// body.addEventListener("mouseup", function () {
//   if (devHoldTimer) {
//     clearTimeout(devHoldTimer);
//   }
// });

// For Mobile Devices
// autoCal.addEventListener("touchstart", function (event) {
//   if (devHoldTimer) {
//     clearTimeout(devHoldTimer);
//   }

//   devHoldTimer = setTimeout(function () {
//     const passCode = askForDevSpecialModePassword();
//     if (passCode) {
//       activateDevSpecialMode();
//     }
//   }, 10000);
// });

// body.addEventListener("touchend", function () {
//   if (devHoldTimer) {
//     clearTimeout(devHoldTimer);
//   }
// });

// function askForDevSpecialModePassword() {
//   let tempVpass = prompt("");
//   // if cancel is pressed
//   if (!tempVpass) {
//     return 0;
//   }
//   while (tempVpass !== V_CHECK_PASS) {
//     tempVpass = prompt("");
//   }
//   vpass = tempVpass;
//   return 1;
// }

// function activateDevSpecialMode() {
//   totalSub = 0;
//   perIn.value = "75";
//   body.classList = "login";
//   history.pushState({ page: "login" }, "", "?page=login");
//   mode = history.state.page.includes("auto") ? "auto" : "manual";
//   isGoingBackAllowed = true;

//   body.classList = "login";
//   mode = "auto";
// }

// ******************************************************

manualCal.addEventListener("click", function () {
  mode = "manual";
  body.classList = "addSubBody";
  success = false;
  dateBox.classList.add("hide");
  const subCards = document.querySelectorAll(".subCard");
  for (let i = 1; i < subCards.length; i++) subCards[i].remove();
  document.querySelector(".subName").value = "";
  document.querySelector(".totLec").value = "";
  document.querySelector(".totAbs").value = "";
});

const autoBtnFun = function () {
  // if (vpass === V_CHECK_PASS) {
  if (!/^\d+$/.test(`${id.value}`) || pw.value == "") {
    id.value = "";
    pw.value = "";
    alert("Id or Password field can not be blank");
    return 0;
  }

  if (captchaValue.value.trim() === "") {
    captchaValue.value = "";
    alert("Captcha Field can not be blank");
    return 0;
  }

  overlay.classList.remove("hide");
  fetch(HOST + "lectures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${id.value}`,
      password: `${pw.value}`,
      captcha: captchaValue.value.trim(),
      session: SESSION_DATA,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.scrollTo(0, 0);
        timer.style.animationName = "";
        timer.textContent = "";
        timerStart();
        // perIn.value = "75";
        addSub.classList.add("hide");
        subjects.style.marginBottom = "100px";
        subjects.classList.add("disable");
        id.classList.remove("wrong");
        pw.classList.remove("wrong");
        LecName = data.subjects;
        lecCount = data.total;
        lecAbs = data.absent;
        uname = data.name;
        set = data.set;
        uid = data.u_id;
        success = data.success;

        // New Session Data
        SESSION_DATA = data.clientData;

        stdName.innerText = "";
        stdName.innerText = uname;
        const subCards = document.querySelectorAll(".subCard");
        for (let i = 1; i < subCards.length; i++) subCards[i].remove();

        for (let i = 0; i < LecName.length - 1; i++) {
          addSub.insertAdjacentHTML("beforebegin", subTemp);
        }
        const subject = document.querySelectorAll(".subName");
        const tLecs = document.querySelectorAll(".totLec");
        const abs = document.querySelectorAll(".totAbs");
        for (let i = 0; i < subject.length; i++) {
          subject[i].value = LecName[i];
          subject[i].setAttribute("disabled", "");
          tLecs[i].value = lecCount[i];
          abs[i].value = lecAbs[i];
        }

        totalSub = subject.length;

        overlay.classList.add("hide");
        body.classList = "addSubBody";
        history.pushState({ page: "autoSub" }, "", "?page=autoSub");
        mode = history.state.page.includes("auto") ? "auto" : "manual";
        pw.value = "";
        isGoingBackAllowed = true;
      } else if (
        data.message.toLowerCase().includes("password") ||
        data.message.toLowerCase().includes("username") ||
        data.message.toLowerCase().includes("user name")
      ) {
        id.classList.add("wrong");
        id.value = "";
        pw.classList.add("wrong");
        pw.value = "";
        overlay.classList.add("hide");
      } else if (data.message.toLowerCase().includes("captcha")) {
        captchaValue.classList.add("wrong");
        captchaValue.value = "";
        loadCaptchaImage();
        overlay.classList.add("hide");
      } else {
        alert("Not reached to the server. Try again");
        overlay.classList.add("hide");
      }
    });
  // }
};

submit.addEventListener("click", autoBtnFun);

const arrow = document.querySelectorAll(".arrow");
const faq = document.querySelectorAll(".faq");
const ans = document.querySelectorAll(".ans");

const autoSec = document.getElementById("autoSec");
const header = document.getElementById("header");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

for (let x = 0; x < faq.length; x++) {
  arrow[x].addEventListener("click", function () {
    if (arrow[x].classList.contains("opened")) {
      arrow[x].classList.remove("opened");
      arrow[x].style.transform = "rotate(0)";
      ans[x].classList.add("hide");
    } else {
      arrow[x].classList.add("opened");
      arrow[x].style.transform = "rotate(180deg)";
      ans[x].classList.remove("hide");
    }
  });
}

let LecName = [];
let lecCount = [];
const lecPre = [];
let lecAbs = [];
const lecPercent = [];
const leave = [];
let uname;
let set;
let uid;

const subTemp = `<div class="card subCard">
                    <p class="lab">Subject Name</p>
                    <input type="text" class="subName inp" placeholder="Ex: Artificial Intelligence">
                    <div class="lecBox">
                        <div class="tLec">
                            <p class="lab">Total Lectures</p>
                            <input type="number" class="inp totLec" placeholder="Ex: 28">
                        </div>
                        <div class="abs">
                            <p class="lab">Absent</p>
                            <input type="number" class="inp totAbs" placeholder="Ex: 2">
                        </div>
                    </div>
                </div>`;

addSub.addEventListener("click", function () {
  addSub.insertAdjacentHTML("beforebegin", subTemp);
  totalSub++;
});

const calLeaveFun = function (tLec, toAbnt) {
  const arr = [];
  const present = tLec - toAbnt;
  arr[0] = present;
  let per = (100 / tLec) * present;
  arr[1] = per.toFixed(2);
  let safeLeave = 0;
  while (per >= Number(perIn.value)) {
    tLec++;
    per = (100 / tLec) * present;
    if (per >= Number(perIn.value)) safeLeave++;
  }
  arr[2] = safeLeave;
  return arr;
};

const needClass = function (tLec, present) {
  let per = (100 / tLec) * present;
  let x = 0;
  while (per <= Number(perIn.value)) {
    tLec++;
    present++;
    per = (100 / tLec) * present;
    x++;
  }
  return x;
};

const cardFun = function (name, lec, pre, absnt, percent, leave) {
  let cardColor;
  if (leave >= 7) cardColor = "cardG";
  else if (leave < 7 && leave > 0) cardColor = "cardY";
  else {
    cardColor = "cardR";
    need = needClass(lec, pre);
  }

  const card = `<div class="card ${cardColor}">
                    <p class="subTitle">${name}</p>
                    <div class="subDate"></div>
                    <div class="detailBox">
                    <div class="details">
                    <p class="info">Total Lecture</p>
                    <p class="dot">:</p>
                    <p class="infoValue">${lec}</p>
                    <p class="info">Present</p>
                    <p class="dot">:</p>
                    <p class="infoValue">${pre}</p>
                    <p class="absnt">Absent</p>
                    <p class="dot">:</p>
                    <p class="infoValue">${absnt}</p>
                    </div>
                    <div class="leaveBox">
                    <p class="lvNo">${leave}</p>
                    <p class="lvCont">Leave Count</p>
                    </div>
                    </div>
                    <div class="attendBox">
                    <p class="attend">Attendance</p>
                    <p class="dot">:</p>
                        <p class="prcnt">${
                          percent == "NaN" || percent == "-Infinity"
                            ? "&nbsp&nbsp0"
                            : percent
                        }%</p>
                    </div>
                    ${
                      percent < Number(perIn.value)
                        ? `<div class="msgBox">Attend ${need} more classes continuously to cross ${Number(
                            perIn.value
                          )}%</div>`
                        : ``
                    }</div>
                </div>`;
  cardBox.insertAdjacentHTML("beforeend", card);
};

const retryFun = async function (id) {
  x = await getLeaveDateRangeMask(LecName, leave, id, set);
  dates.innerText = "";

  if (x.failed == -1) {
    dateHead.classList.remove("hide");
    retry.classList.remove("hide");
    dateHead.innerText = "Fetching leave date range failed";
    dateLoad.classList.add("hide");
    dateSub.classList.add("hide");
    dateBox.style.minHeight = "15rem";
  } else if (x.all == 0) {
    dateBox.style.minHeight = "12rem";
    dates.classList.remove("hide");
    dates.innerText = "You are ineligible to take leave";
    dates.style.color = "red";
    dateSub.classList.remove("hide");
    dateSub.style.color = "red";
    dateHead.classList.add("hide");
    dateLoad.classList.add("hide");
    setSubjectLeaveDate(x.individual);
    cardBox.classList.remove("subDateHide");
  } else {
    dateBox.style.minHeight = "15rem";
    dateSub.style.color = "var(--bg)";
    dates.style.color = "var(--bg)";
    dateLoad.classList.add("hide");
    dates.innerText = x.all;
    dates.classList.remove("hide");
    dateSub.classList.remove("hide");
    setSubjectLeaveDate(x.individual);
    cardBox.classList.remove("subDateHide");
  }
};

retry.addEventListener("click", function () {
  dateBox.style.minHeight = "15rem";
  dateHead.classList.remove("hide");
  dateHead.innerText = "You can safely take leave from";
  dateLoad.classList.remove("hide");
  dateSub.classList.add("hide");
  retry.classList.add("hide");
  retryFun(x.uid);
});

const fetchDetails = async function () {
  window.scrollTo(0, 0);
  if (mode == "manual") {
    cardBox.classList.add("subDateHide");
    subjects.classList.remove("disable");
  }
  if (Number(perIn.value) > 0 && Number(perIn.value) <= 100) {
    dateLoad.classList.remove("hide");
    dates.classList.add("hide");
    dateHead.innerText = "You can safely take leave from"; // chnage
    dateHead.classList.remove("hide");
    dateSub.classList.add("hide");
    retry.classList.add("hide");
    cardBox.innerHTML = "";
    const subNames = document.querySelectorAll(".subName");
    const totalLecs = document.querySelectorAll(".totLec");
    const totalAbs = document.querySelectorAll(".totAbs");
    let arr = [];

    for (let i = 0; i < totalSub; i++) {
      LecName[i] = subNames[i].value;
      lecCount[i] = totalLecs[i].value;
      lecAbs[i] = totalAbs[i].value;
      arr = calLeaveFun(totalLecs[i].value, totalAbs[i].value);
      lecPre[i] = arr[0];
      lecPercent[i] = arr[1];
      leave[i] = arr[2];
    }
    for (let i = 0; i < totalSub; i++) {
      cardFun(
        LecName[i],
        lecCount[i],
        lecPre[i],
        lecAbs[i],
        lecPercent[i],
        leave[i]
      );
    }
    if (success) {
      dateBox.classList.remove("hide");
    }
    body.classList = "result";
    if (mode == "auto") {
      retryFun(uid);
    }

    const subType = new URLSearchParams(window.location.search).get("page");
    if (subType == "manualSub") {
      body.classList = "result";
      history.pushState({ page: "manualResult" }, "", "?page=manualResult");
      mode = history.state.page.includes("auto") ? "auto" : "manual";
      isGoingBackAllowed = true;
    } else {
      body.classList = "result";
      history.pushState({ page: "autoResult" }, "", "?page=autoResult");
      mode = history.state.page.includes("auto") ? "auto" : "manual";
      isGoingBackAllowed = true;
    }
  } else {
    alert("Please enter percentage between 1% to 100%");
  }
};

calLeave.addEventListener("click", fetchDetails);

const hideResult = function () {
  resultBox.classList.remove("show");
  resultBox.classList.add("hide");
  setTimeout(function () {
    resultBox.style.display = "none";
  }, 300);

  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < totalSub; i++) {
    cards[i].remove();
  }
};

// -------------------------------------------------------

const getLeaveDateRange = function (
  subjectNameList,
  leaveCountList,
  parsedTimeTable,
  set,
  startDate = new Date(new Date().setDate(new Date().getDate() + 1))
) {
  // Skip Sunday as start date
  if (startDate.getDay() === 0) {
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }

  let lDate = startDate;
  let rDate = null;
  set = `(${set.trim()})`;

  let currentDateIndex = startDate.getDay();
  while (true) {
    const subjectListForCurrentIndex = Object.values(
      parsedTimeTable[currentDateIndex]
    );

    for (let i = 0; i < subjectListForCurrentIndex.length; i++) {
      let subjectName = subjectListForCurrentIndex[i];
      if (subjectName) {
        const regexForSet = /\([A-Z]\)/g;
        const extractedSet = subjectName.match(regexForSet);

        if (extractedSet && extractedSet[0] !== set) {
          continue;
        }

        subjectName = subjectName.split("(")[0].trim();
        if (subjectNameList.includes(subjectName)) {
          leaveCountList[subjectNameList.indexOf(subjectName)]--;
        }
      }
    }

    if (leaveCountList.every((leaveCount) => leaveCount > -1)) {
      if (rDate) {
        rDate = new Date(rDate.setDate(rDate.getDate() + 1));
      } else {
        rDate = new Date(lDate);
      }

      currentDateIndex = (currentDateIndex + 1) % 7;
    } else {
      break;
    }
  }

  if (rDate) {
    const formatedLDate = lDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formatedRDate = rDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${formatedLDate}  -  ${formatedRDate}`;
  } else {
    return 0;
  }
};

const getLeaveDateRangeMask = async function (
  subjectNameList,
  leaveCountList,
  uid,
  set,
  startDate = new Date(new Date().setDate(new Date().getDate() + 1))
) {
  const timeTableResponse = await fetch(HOST + "timetable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: SESSION_DATA,
    }),
  });
  const timeTableObj = await timeTableResponse.json();

  let timeTable = null;
  if (timeTableObj.success !== true) {
    console.error("Error: ", timeTableObj.message);
    return {
      failed: -1,
      uid: timeTableObj.u_id,
    };
  } else {
    timeTable = timeTableObj.timeTable;
  }
  const parsedTimeTable = JSON.parse(timeTable);

  parsedTimeTable.forEach((day) => {
    if (day["Days/Period"] === "Thrusday") {
      day["Days/Period"] = "Thursday";
    }
  });

  parsedTimeTable.unshift({
    "Days/Period": "Sunday",
    "(P1)09:00 - 09:55": null,
    "(P2)09:55 - 10:50": null,
    "(P3)10:50 - 11:45": null,
    "(P5)12:40 - 13:35": null,
    "(P6)13:35 - 14:30": null,
    "(P7)14:30 - 15:25": null,
    "(P8)15:25 - 16:20": null,
  });
  const dateRangeResult = { all: null, individual: [] };

  // All
  dateRangeResult.all = getLeaveDateRange(
    [...subjectNameList],
    [...leaveCountList],
    parsedTimeTable,
    set,
    startDate
  );

  // Individual
  for (let i = 0; i < subjectNameList.length; i++) {
    dateRangeResult.individual[i] = getLeaveDateRange(
      [subjectNameList[i]],
      [leaveCountList[i]],
      parsedTimeTable,
      set,
      startDate
    );
  }

  return dateRangeResult;
};

// -------------------------------------------------------

id.addEventListener("keyup", function () {
  id.classList.remove("wrong");
});

pw.addEventListener("keyup", function () {
  pw.classList.remove("wrong");
});

captchaValue.addEventListener("keyup", function () {
  captchaValue.classList.remove("wrong");
});

// timer

const timeClearFun = function () {
  timer.textContent = "0 : 00";
  clearInterval(clearTime);
  timer.style.animationName = "";
  timer.textContent = "";
  location.reload();
};

const timerStart = function () {
  time = 300;
  // countdown
  setTimeout(() => {
    timer.style.animationName = "changeColor";
    clearTime = setInterval(function () {
      countDown();
    }, 1000);
  }, 200);
};

const countDown = function () {
  if (time !== 0) {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timer.textContent = `${min} : ${sec < 10 ? "0" + sec : sec}`;
    time--;
  } else {
    timeClearFun();
  }
};

const setSubjectLeaveDate = function (arr) {
  const subs = document.querySelectorAll(".subDate");
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i]) == 0)
      subs[i].innerText = "Ineligible for leave in this subject";
    else subs[i].innerText = arr[i];
  }
};

autoCal.addEventListener("click", function () {
  loadCaptchaImage();
  totalSub = 0;
  perIn.value = "75";
  body.classList = "login";
  history.pushState({ page: "login" }, "", "?page=login");
  mode = history.state.page.includes("auto") ? "auto" : "manual";
  isGoingBackAllowed = true;
});

// Fetch Captcha Image When AutoPage is directly visited
if (page === "login") {
  loadCaptchaImage();
}

function loadCaptchaImage() {
  // Remove old captcha
  captchaImage.src = "#";

  // Load New Captcha
  fetch(HOST + "loginformdata")
    .then((res) => res.json())
    .then((data) => {
      captchaImage.src = data.captchaImage;
      SESSION_DATA = data.clientData;
    });
}
