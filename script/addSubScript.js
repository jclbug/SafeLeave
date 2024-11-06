const autoCal = document.getElementById("autoCal");
const body = document.getElementById("body");
const manualCal = document.getElementById("manualCal");
const perIn = document.getElementById("perIn");
const addSub = document.getElementById("addSub");
const subjects = document.getElementById("subjects");
const calLeave = document.getElementById("calLeave");
const cardBox = document.getElementById("cardBox");
let totalSub = 1
let x
let need;
let isGoingBackAllowed = false;

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

autoCal.addEventListener("click", function () {
  alert("Sorry for the inconvenience. This feature is disabled for now due to the instructions from the university. Meanwhile, you can use the manual mode to calculate your leave.")
});

manualCal.addEventListener("click", function () {
  totalSub = 1;
  perIn.value = "75";
  body.classList = "addSubBody";
  addSub.classList.remove("hide");
  subjects.style.marginBottom = "0px";
  cardBox.classList.add("subDateHide");
  subjects.classList.remove("disable");
  history.pushState({ page: "manualSub" }, "", "?page=manualSub");
  isGoingBackAllowed = true;
  window.scrollTo(0, 0);
});

window.addEventListener("popstate", function (event) {
  if (isGoingBackAllowed) {
    if (event.state.page) {
      body.classList = urlParamToPageClass(event.state.page);
    } else {
      body.classList = "home";
    }
  } else {
    let currentPageClass = body.classList[0];
    if (currentPageClass == "addSubBody") {
      currentPageClass = "manualSub";
    }
    if (currentPageClass == "manualSub") {
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
    case "manualSub":
      return "addSubBody";
    case "manualResult":
      return "addSubBody";
    default:
      return "home";
  }
}

function urlParamToRedirectUrlParam(urlParam) {
  switch (urlParam) {
    case "home":
      return "home";
    case "manualSub":
      return "manualSub";
    case "manualResult":
      return "manualSub";
    default:
      return "home";
  }
}

function urlParamToPageClass(urlParam) {
  switch (urlParam) {
    case "home":
      return "home";
    case "manualSub":
      return "addSubBody";
    case "manualResult":
      return "result";
    default:
      return "home";
  }
}

manualCal.addEventListener("click", function () {

  const subCards = document.querySelectorAll(".subCard");
  for (let i = 1; i < subCards.length; i++) subCards[i].remove();
  document.querySelector(".subName").value = "";
  document.querySelector(".totLec").value = "";
  document.querySelector(".totAbs").value = "";
});

const arrow = document.querySelectorAll(".arrow");
const faq = document.querySelectorAll(".faq");
const ans = document.querySelectorAll(".ans");

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
                        <p class="prcnt">${percent == "NaN" || percent == "-Infinity"
      ? "&nbsp&nbsp0"
      : percent
    }%</p>
                    </div>                        
                    ${percent < Number(perIn.value)
      ? `<div class="msgBox">Attend ${need} more classes continuously to cross ${Number(
        perIn.value
      )}%</div>`
      : ``
    }</div>
                </div>`;
  cardBox.insertAdjacentHTML("beforeend", card);
};

const fetchDetails = function () {
  window.scrollTo(0, 0);

  if (Number(perIn.value) > 0 && Number(perIn.value) <= 100) {
    dateLoad.classList.remove("hide");
    dates.classList.add("hide");
    dateHead.innerText = "You can safely take leave from";
    dateHead.classList.remove("hide");
    dateSub.classList.add("hide");
    retry.classList.add("hide");
    cardBox.innerHTML = "";
    const subNames = document.querySelectorAll(".subName");
    const totalLecs = document.querySelectorAll(".totLec");
    const totalAbs = document.querySelectorAll(".totAbs");
    let arr = [];

    for (i = 0; i < totalSub; i++) {
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

    const subType = new URLSearchParams(window.location.search).get("page");
    if (subType == "manualSub") {
      body.classList = "result";
      history.pushState({ page: "manualResult" }, "", "?page=manualResult");

      isGoingBackAllowed = true;
    }

  } else {
    alert("Please enter percentage between 1% to 100%");
  }
};

calLeave.addEventListener("click", fetchDetails);
