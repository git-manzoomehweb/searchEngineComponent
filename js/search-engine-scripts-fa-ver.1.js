var calendar_type = document.querySelector(".calendar-type").value;
if(document.querySelector(".flight-module")){
  var flight_module = document.querySelector(".flight-module").value;
  if(document.querySelector(".flighttype-dropDown")){
    if(document.querySelector(".flighttype-dropDown-text")){
      document.querySelector(".flighttype-items").classList.add("hidden");
      document.querySelector(".flighttype-dropDown-text").classList.remove("hidden");
      document.querySelector(".flighttype-dropDown-text").addEventListener("click", function () {
        document.querySelector('.flighttype-items').classList.toggle('hidden');
      })
    }
  }
}
if(document.querySelector(".multiflight-module")){
  var multiflight_module = document.querySelector(".multiflight-module").value;
}
if(document.querySelector(".hotel-module")){
  var hotel_module = document.querySelector(".hotel-module").value;
}
if(document.querySelector(".flighthotel-module")){
  var flighthotel_module = document.querySelector(".flighthotel-module").value;
}
if(document.querySelector(".tour-module")){
  var tour_module = document.querySelector(".tour-module").value;
}
if(document.querySelector(".insurance-module")){
  var insurance_module = document.querySelector(".insurance-module").value;
}
if(document.querySelector(".cip-module")){
  var cip_module = document.querySelector(".cip-module").value;
}
if(document.querySelector(".visa-module")){
  var visa_module = document.querySelector(".visa-module").value;
}
if(document.querySelector(".service-module")){
  var service_module = document.querySelector(".service-module").value;
}
if(document.querySelector(".train-module")){
  var train_module = document.querySelector(".train-module").value;
}
if(document.querySelector("#module-order")){
  const btn = Array.from(document.querySelectorAll(".reserve-btn"));
  const moduleOrder = document.getElementById("module-order").value.split(",").map(Number);
  btn.sort((a, b) => {
    return moduleOrder.indexOf(Number(a.getAttribute("data-type"))) - moduleOrder.indexOf(Number(b.getAttribute("data-type")));
  });
  const parent = btn[0].parentNode;
  btn.forEach(btn => parent.appendChild(btn));

  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
  btn[0].classList.add("active-module");
  const active_module = btn[0].getAttribute("data-id");
  document.querySelectorAll(".module-form").forEach(function (form) {
    if(form.getAttribute("id") == active_module){
      form.classList.remove("hidden");
    }else {
      form.classList.add("hidden");
    }
  });
}
function empty_value(t) {
    const reserveField = t.closest(".reserve-field");
    reserveField.querySelector(".reserve-location").value = "";
    const searchList = reserveField.querySelector(".searchList");
    searchList.classList.remove("hidden");
    reserveField.querySelector(".reserve-location").focus();
    if(reserveField.querySelector(".ul-list")){
      reserveField.querySelector(".ul-list").style.display = "block";
    }
    const siblings = Array.from(reserveField.parentNode.children).filter(child => child !== reserveField);
    siblings.forEach(sibling => {
        const siblingSearchList = sibling.querySelector(".searchList");
        if (siblingSearchList) siblingSearchList.classList.add("hidden");
    });
    if(t.closest(".reserve-field").querySelector(".load-location-options")){
      const url = 'Client_Search_engine_Locations.bc';
      const module_type = t.closest("form").getAttribute("data-form");
      const params = new URLSearchParams({ 'module-type': module_type });
      fetch(`${url}?${params.toString()}`)
          .then(response => response.text())
          .then(data => {
            t.closest(".reserve-field").querySelector(".load-location-options").innerHTML = data;
          })
          .catch(error => console.error('Error loading page:', error));
    }
}
function city_search(t) {
    if (t.which == 0 || t.ctrlKey || t.metaKey || t.altKey) return;
    const reserveField = t.closest(".reserve-field");
    const dataType = t.getAttribute("data-type");
    const miniLoading = reserveField.querySelector(".mini-loading");
    const locationResult = reserveField.querySelector(".locationResult");
    const ulList = reserveField.querySelector(".ul-list");
    const sendRequest = (params) => {
        miniLoading.style.display = "block";
        if(ulList){
          ulList.style.display = "none";
        }
        fetch(`/Client_City_Search_ver.2.bc?${new URLSearchParams(params)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then((html) => {
                miniLoading.style.display = "none";
                locationResult.innerHTML = html;
                locationResult.style.display = "block";
                const scripts = locationResult.querySelectorAll("script");
                scripts.forEach((script) => {
                    const newScript = document.createElement("script");
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                    document.body.removeChild(newScript);
                });
            })
            .catch((error) => {
                miniLoading.style.display = "none";
                console.error("Error:", error);
            });
    };
    if (dataType == "4") {
        t.value = "";
        reserveField.querySelector(".locationId").value = "";
        miniLoading.style.display = "block";
        if (t.getAttribute("data-active") !== "1") {
            sendRequest({ type: dataType, lid: "1" });
            t.setAttribute("data-active", "1");
        } else {
            locationResult.style.display = "block";
        }
    } else {
        const value = t.value.trim();
        t.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        if (dataType == "3" && (value == "رم" || value == "قم")) {
            if (value.length > 1) {
                sendRequest({ term: value, type: dataType, lid: "1", select_value: "0" });
            } else {
                locationResult.innerHTML = "";
                if(ulList){
                  ulList.style.display = "block";
                }
            }
        } else if (value.length > 2) {
            sendRequest({ term: value, type: dataType, lid: "1", select_value: "0" });
        } else {
            locationResult.innerHTML = "";
            if(ulList){
              ulList.style.display = "block";
            }
        }
    }
}
function SelectPlace(t) {
    const element = t.getAttribute("data-id");
    const spanText = t.querySelector("span").textContent;
    const splitText = spanText.split("-");
    const Element = t.closest(".reserve-field");
    Element.querySelector(".text-value").value = spanText;
    Element.querySelector(".locationId").value = element;
    Element.querySelector(".auto-fit").textContent = splitText[0];
    Element.querySelector(".searchList").classList.add("hidden");
    const nextCity = Element.nextElementSibling;
    if (nextCity) {
        const nextSearchList = nextCity.querySelector(".searchList");
        if (nextSearchList) nextSearchList.classList.remove("hidden");
        const clickContent = nextCity.querySelector(".click-content");
        if (clickContent) clickContent.dispatchEvent(new Event("click"));
    }
    const nextDiv = Element.nextElementSibling;
    if (nextDiv && nextDiv.classList.contains("Basis_Date_Box")) {
        const startDate = nextDiv.querySelector(".start_date");
        if (startDate) startDate.click();
    } else if (Element.classList.contains("tocity_container")) {
        const routeContent = Element.closest(".route-content");
        if (routeContent) {
            const startDate = routeContent.querySelector(".start_date");
            if (startDate) startDate.click();
        }
    }
}
function show_passengerbox(e) {
  const element = e.closest(".reserve-field").querySelector('.hidden-box');
  if (element) {
    element.classList.toggle('hidden');
  }
}
function close_passenger(e) {
  e.closest(".hidden-box").classList.add('hidden');
  let passBox = e.closest('.reserve-field');
  if (passBox) {
    let nextDiv = passBox.nextElementSibling;
    if (nextDiv && nextDiv.classList.contains('reserve-field')) {
      let hiddenBox = nextDiv.querySelector('.hidden-box');
      if (hiddenBox) {
        hiddenBox.classList.remove("hidden");
      }
    }
  }
}  
function createChildDropdown(t) {
  const e = document.createElement("div");
  e.className = "createChildDropdown mb-4 w-full float-right clear-both";
  const label = document.createElement("label");
  label.className = "float-right text-sm leading-8 text-textColor";
  label.setAttribute("for", "select-age-" + t);
  label.textContent = "سن کودک " + t;
  e.appendChild(label);
  const select = document.createElement("select");
  select.className = "select-age float-left w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2";
  select.id = "select-age" + t;
  e.appendChild(select);
  const options = [
    "تا 1 سال",
    "1 تا 2 سال ",
    "2 تا 3 سال",
    "3 تا 4 سال ",
    "4 تا 5 سال",
    "5 تا 6 سال",
    "6 تا 7 سال",
    "7 تا 8 سال",
    "8 تا 9 سال",
    "9 تا 10 سال",
    "10 تا 11 سال",
    "11 تا 12 سال"
  ];
  options.forEach((text, i) => {
    const option = document.createElement("option");
    option.textContent = text;
    option.value = i + 1;
    select.appendChild(option);
  });
  return e;
}
function destroyChildDropdown(t, e) {
  const dropdowns = t.querySelectorAll("div.createChildDropdown");
  if (dropdowns[e]) {
    dropdowns[e].remove();
  }
}
document.querySelectorAll(".Basis_Date").forEach(function (element) {
  element.addEventListener("click", function () {
    document.querySelectorAll(".searchList").forEach(function (searchElement) {
      searchElement.classList.add("hidden")
    });
  });
});
document.addEventListener("click", function (event) {
  if (!event.target.closest(".searchList, .reserve-location, .selectLocation, .reserve-field, .form-search-input")) {
    document.querySelectorAll(".searchList").forEach(element => {
      element.classList.add("hidden");
    });
  }
});
// persain current
var PersianDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
PersianDate.GregorianToPersian = function (gYear, gMonth, gDay) {
  gYear = parseInt(gYear);
  gMonth = parseInt(gMonth) - 1;
  gDay = parseInt(gDay);

  var gy = gYear - 1600,
    gm = gMonth,
    gd = gDay - 1,
    gDayNo =
      365 * gy +
      Math.floor((gy + 3) / 4) -
      Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);

  for (var i = 0; i < gm; ++i) gDayNo += PersianDate.g_days_in_month[i];
  if (gm > 1 && ((gy % 4 == 0 && gy % 100 !== 0) || gy % 400 == 0)) gDayNo++;

  gDayNo += gd;

  var jDayNo = gDayNo - 79;

  var jNp = Math.floor(jDayNo / 12053);
  jDayNo %= 12053;

  var jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365);
    jDayNo = (jDayNo - 1) % 365;
  }

  for (var j = 0; j < 11 && jDayNo >= PersianDate.j_days_in_month[j]; ++j)
    jDayNo -= PersianDate.j_days_in_month[j];

  var jm = j + 1;
  var jd = jDayNo + 1;

  return [
    jy,
    jm < 10 ? "0" + jm : jm,
    jd < 10 ? "0" + jd : jd
  ].join("-");
};
var today = new Date();
var gYear = today.getFullYear();
var gMonth = today.getMonth() + 1;
var gDay = today.getDate();
var persianCurrent = PersianDate.GregorianToPersian(gYear, gMonth, gDay);
document.querySelector(".persiancurrent").value = persianCurrent;
// show date in engine
var PersianDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
PersianDate.GregorianToPersian = function (gYear, gMonth, gDay) {
  gYear = parseInt(gYear);
  gMonth = parseInt(gMonth) - 1; // Zero-based
  gDay = parseInt(gDay);

  var gy = gYear - 1600,
    gm = gMonth,
    gd = gDay - 1,
    gDayNo =
      365 * gy +
      Math.floor((gy + 3) / 4) -
      Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);

  for (var i = 0; i < gm; ++i) gDayNo += PersianDate.g_days_in_month[i];
  if (gm > 1 && ((gy % 4 == 0 && gy % 100 !== 0) || gy % 400 == 0)) gDayNo++;

  gDayNo += gd;

  var jDayNo = gDayNo - 79;

  var jNp = Math.floor(jDayNo / 12053); // 33-year cycles
  jDayNo %= 12053;

  var jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365);
    jDayNo = (jDayNo - 1) % 365;
  }

  for (var j = 0; j < 11 && jDayNo >= PersianDate.j_days_in_month[j]; ++j)
    jDayNo -= PersianDate.j_days_in_month[j];

  var jm = j + 1;
  var jd = jDayNo + 1;

  return [
    jy,
    jm < 10 ? "0" + jm : jm,
    jd < 10 ? "0" + jd : jd
  ].join("-");
};
// Calculate future dates
var currentTime = new Date();
currentTime.setDate(currentTime.getDate() + 2);
var gregorian_month = currentTime.getMonth() + 1;
var gregorian_day = currentTime.getDate();
var gregorian_year = currentTime.getFullYear();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 4);
var gregorian_month_tomorrow = tomorrow.getMonth() + 1;
var gregorian_day_tomorrow = tomorrow.getDate();
var gregorian_year_tomorrow = tomorrow.getFullYear();
// Convert Gregorian to Persian
var persian_today = PersianDate.GregorianToPersian(
  gregorian_year,
  gregorian_month,
  gregorian_day
);
var persian_tomorrow = PersianDate.GregorianToPersian(
  gregorian_year_tomorrow,
  gregorian_month_tomorrow,
  gregorian_day_tomorrow
);
var persian_today_split = persian_today.split("-");
var persian_tomorrow_split = persian_tomorrow.split("-");
// Persian months
var months = {
  "01": "فروردین",
  "02": "اردیبهشت",
  "03": "خرداد",
  "04": "تیر",
  "05": "مرداد",
  "06": "شهریور",
  "07": "مهر",
  "08": "آبان",
  "09": "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند"
};
// Update `.start_date` and `.end_date`
document.querySelectorAll(".start_date").forEach(function (startElement) {
  if (startElement && !startElement.classList.contains("checkin")) {
    startElement.value = persian_today;
    var spStartDiv = startElement.closest("div");
    spStartDiv.querySelector(".selected-day").textContent = persian_today_split[2];
    spStartDiv.querySelector(".selected-month").textContent = months[persian_today_split[1]];
  }
});
document.querySelectorAll(".end_date").forEach(function (endElement) {
  if (!endElement.disabled && !endElement.classList.contains("checkout")) {
    endElement.value = persian_tomorrow;
    var spEndDiv = endElement.closest("div");
    spEndDiv.querySelector(".selected-day").textContent =
      persian_tomorrow_split[2];
    spEndDiv.querySelector(".selected-month").textContent =
      months[persian_tomorrow_split[1]];
  }
});
if(flight_module == "true"){
// start flight module scripts
if (window.innerWidth <= 750) {
  const flightSearch = document.getElementById("flightSearch");

  if (flightSearch.getAttribute("action") == "/Tem3_Roundtrip_Search.bc") {
      flightSearch.setAttribute("action", "/M_Roundtrip_Search.bc");
  }

  if (flightSearch.getAttribute("action") == "/Tem3_Oneway_Search.bc") {
      flightSearch.setAttribute("action", "/M_Oneway_Search.bc");
  }
}
document.querySelectorAll(".formflight").forEach(function(form) {
  form.addEventListener("submit", function(event) {
    let ageString = "";
    
    form.querySelectorAll(".createChildDropdown").forEach(function(dropdown) {
      ageString += dropdown.querySelector("select").value + ",";
    });

    if (ageString !== "") {
      const selectAgeValue = form.querySelector(".select-age-value");
      selectAgeValue.value = ageString;

      const updatedAgeString = selectAgeValue.value.replace(/,(?=[^,]*$)/, "");
      selectAgeValue.value = updatedAgeString;
    }

    const adults = parseInt(form.querySelector(".adultcount").value) || 0;
    const children = parseInt(document.querySelector(".childcount").value) || 0;
    const totalPassengers = adults + children;

    let infants = 0;
    document.querySelectorAll(".select-age").forEach(function(select) {
      if (parseInt(select.value) <= 2) {
        infants += 1;
      }
    });

    const alertText = document.querySelector(".alert-text");
    if (infants > adults) {
      event.preventDefault();
      alertText.textContent = "به ازای هر بزرگسال تنها یک نوزاد انتخاب کنید!";
    }
    if (totalPassengers > 10) {
      event.preventDefault();
      alertText.textContent = "باید مجموع تعداد بزرگسال و کودک کمتر از 10 باشد !";
    }
    if (adults < 1) {
      event.preventDefault();
      alertText.textContent = "حداقل یک بزرگسال انتخاب کنید !";
    }
  });
});
document.querySelector("#backtoback").addEventListener("click", function() {
  if(document.querySelector('.flighttype-dropDown')){
    document.querySelector('.flighttype-items').classList.add("hidden");
    document.querySelector('.flighttype-dropDown-text').textContent = document.querySelector('#backtoback span').textContent;
  }
  check_searchHistory('flight')
  document.querySelector('#flightSearch').setAttribute('method', 'get');
  this.classList.add("active-r-btn");
  document.querySelector("#oneway").classList.remove("active-r-btn");
  document.querySelector("#multi").classList.remove("active-r-btn");
  document.querySelector("#flightSearch").setAttribute("data-form", "flight");
  document.querySelector("#flightSearch").setAttribute("data-flighttype", "2");
  document.querySelector("#flightSearch").setAttribute("action", "/Tem3_Roundtrip_Search.bc");
  const end_date = document.querySelector("#flightSearch .end_date");
  if (end_date) {
    end_date.disabled = false;
  }
  document.getElementById("flightSearch").querySelectorAll(".return-date").forEach(function(element) {
    element.classList.remove("no-activedate");
  });
  const endDate = document.querySelector("#flightSearch .end_date");
  if (endDate) {
    if(calendar_type == "simple-calendar"){
      endDate.classList.add("nextCalOpening");
    }
  }
  if (window.innerWidth <= 750) {
    document.querySelector("#flightSearch").setAttribute("action", "/M_Roundtrip_Search.bc");
  }
  if(document.querySelector(".formflight").classList.contains("multicity-flight-form")){
    hide_Multicity()
  }
});
document.querySelector("#oneway").addEventListener("click", function () {
  if(document.querySelector('.flighttype-dropDown')){
    document.querySelector('.flighttype-items').classList.add("hidden");
    document.querySelector('.flighttype-dropDown-text').textContent = document.querySelector('#oneway span').textContent;
  }
  check_searchHistory('flight')
  document.querySelector('#flightSearch').setAttribute('method', 'get');
  this.classList.add("active-r-btn");
  document.querySelector("#backtoback").classList.remove("active-r-btn");
  document.querySelector("#multi").classList.remove("active-r-btn");
  document.querySelector("#flightSearch").setAttribute("data-form", "flight");
  document.querySelector("#flightSearch").setAttribute("data-flighttype", "1");
  document.querySelector("#flightSearch").setAttribute("action", "/Tem3_Oneway_Search.bc");
  const end_date = document.querySelector("#flightSearch .end_date");
  if (end_date) {
    end_date.disabled = true;
  }
  const endDate = document.querySelector("#flightSearch .end_date");
  if (endDate) {
    if(calendar_type == "simple-calendar"){
      endDate.classList.remove("nextCalOpening");
    }
  }
  if (window.innerWidth <= 750) {
    document.querySelector("#flightSearch").setAttribute("action", "/M_Oneway_Search.bc");
  }
  document.getElementById("flightSearch").querySelectorAll(".return-date").forEach(function (element) {
    element.classList.add("no-activedate");
  });
  if(document.querySelector(".formflight").classList.contains("multicity-flight-form")){
    hide_Multicity()
  }
});
document.querySelector(".flight-btn").addEventListener("click", function () {
  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
  this.classList.add("active-module");
  document.querySelectorAll(".module-form").forEach(function (form) {
    form.classList.add("hidden");
  });
  document.querySelector(".r-flight").classList.remove("hidden")
  const topBannerResize = document.querySelector(".module-banner");
  if (topBannerResize) {
    topBannerResize.style.backgroundImage = 'url("../images/flight-search-bg.jpg")';
  }
  //simple-calendar
  if(calendar_type == "simple-calendar"){
    const dateInfoSelected = document.querySelector(".date_info_selected");
    if (dateInfoSelected) {
      const typeDate = dateInfoSelected.querySelector(".type_date");
      const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
      const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

      if (typeDate) typeDate.textContent = "تاریخ رفت :";
      if (dayOfDate) dayOfDate.textContent = "---";
      if (monthOfDate) monthOfDate.textContent = " ";
  }
  }
  //simple-calendar end
});
function ExchangeRoute(t) {
  const reserveField = t.closest(".reserve-field");
  const departureInput = reserveField.querySelector(".departure");
  const destinationInput = reserveField.nextElementSibling.querySelector(".destination");
  const locationIdInput = reserveField.querySelector(".locationId");
  const nextLocationIdInput = reserveField.nextElementSibling.querySelector(".locationId");
  const autoFitText = reserveField.querySelector(".auto-fit");
  const nextAutoFitText = reserveField.nextElementSibling.querySelector(".auto-fit");
  const departureValue = departureInput.value;
  const destinationValue = destinationInput.value;
  const locationIdValue = locationIdInput.value;
  const nextLocationIdValue = nextLocationIdInput.value;
  const autoFitValue = autoFitText.textContent;
  const nextAutoFitValue = nextAutoFitText.textContent;
  departureInput.value = destinationValue;
  destinationInput.value = departureValue;
  locationIdInput.value = nextLocationIdValue;
  nextLocationIdInput.value = locationIdValue;
  autoFitText.textContent = nextAutoFitValue;
  nextAutoFitText.textContent = autoFitValue;
}
// end flight module scripts
}
if(multiflight_module == "true"){
// start multiflight module scripts
if (window.innerWidth <= 750) {
  const flightSearch = document.getElementById("flightSearch");
  if (flightSearch.getAttribute("action") == "/Tem3_Multicity_Search.bc") {
      flightSearch.setAttribute("action", "/M_Multicity_Search.bc");
  }
}
document.querySelector("#multi").addEventListener("click", function () {
  if(document.querySelector('.flighttype-dropDown')){
    document.querySelector('.flighttype-items').classList.add("hidden");
    document.querySelector('.flighttype-dropDown-text').textContent = document.querySelector('#multi span').textContent;
  }
  document.querySelector('#flightSearch').setAttribute('method', 'post');
  this.classList.add("active-r-btn");
  document.querySelector("#backtoback").classList.remove("active-r-btn");
  document.querySelector("#oneway").classList.remove("active-r-btn");
  document.querySelector("#flightSearch").setAttribute("data-form", "multi");
  document.querySelector("#flightSearch").setAttribute("data-flighttype", "3");
  document.querySelector("#flightSearch").setAttribute("action", "/Tem3_Multicity_Search.bc");
  const end_date = document.querySelector("#flightSearch .end_date");
  if (end_date) {
    end_date.disabled = true;
  }
  const endDate = document.querySelector("#flightSearch .end_date");
  if (endDate) {
    if(calendar_type == "simple-calendar"){
      endDate.classList.remove("nextCalOpening");
    } 
  }

  if (window.innerWidth <= 750) {
    document.querySelector("#flightSearch").setAttribute("action", "/M_Multicity_Search.bc");
  }
  show_Multicity()
  check_searchHistory('multi')
});
function show_Multicity(){
  document.querySelector("#flightSearch").classList.remove("flex", "gap-2","one-btb-flight-form")
  document.querySelector("#flightSearch").classList.add("block","multicity-flight-form")
  document.querySelectorAll("#flightSearch .return-date").forEach(function (element) {
    element.classList.add("hidden");
  });
  document.querySelectorAll("#flightSearch .Basis_Date_Box").forEach(function (box) {
    box.classList.add("w-1/4");
    box.classList.remove("w-1/5");
    box.querySelectorAll(".reserve-field").forEach(function (element) {
        element.classList.add("w-full");
        element.classList.remove("w-1/2");
    });
});
const flight_routes = document.querySelector('.flight-routes');
const basisDateBox = document.querySelector('.Basis_Date_Box');
if (flight_routes && basisDateBox) {
  const routeContainer = document.createElement('div');
  routeContainer.className = 'route-container w-full';
  const routeContent = document.createElement('div');
  routeContent.className = 'route-content w-full mb-4 relative';
  routeContent.setAttribute('data-index', '1');
  const titleDiv = document.createElement('div');
  titleDiv.className = 'multi-route-tlt mb-2 text-textColor text-base w-auto';
  titleDiv.textContent = 'مقصد اول';
  const flexContainer = document.createElement('div');
  flexContainer.className = 'route-content-inner w-full flex gap-2 max-xl:block max-xl:gap-0';
  const clonedflight_routes = flight_routes.cloneNode(true);
  const clonedBasisDate = basisDateBox.cloneNode(true);
  flexContainer.appendChild(clonedflight_routes);
  flexContainer.appendChild(clonedBasisDate);
  const deleteButton = document.createElement('div');
  deleteButton.className = 'route-minus-btn text-xl pr-4 text-red-600 w-1/4 h-20 leading-[80px] max-xl:absolute max-xl:top-0 max-xl:left-0 max-xl:h-auto max-xl:leading-normal max-xl:text-base max-xl:text-left hover:text-primary';
  flexContainer.appendChild(deleteButton);
  routeContent.appendChild(titleDiv);
  routeContent.appendChild(flexContainer);
  routeContainer.appendChild(routeContent);
  flight_routes.parentNode.insertBefore(routeContainer, flight_routes);
  const secondRouteContent = routeContent.cloneNode(true);
  secondRouteContent.setAttribute('data-index', '2');
  secondRouteContent.querySelector('.multi-route-tlt').textContent = 'مقصد دوم';
  routeContainer.appendChild(secondRouteContent);
  flight_routes.remove();
  basisDateBox.remove();
} 
const Flightclass_Passenger = document.querySelector('.Flightclass-Passenger');
const search = document.querySelector('.reserve-search');
if (Flightclass_Passenger && search) {
search.classList.remove("w-auto");
search.classList.add("w-1/4");
const flexContainer = document.createElement('div');
flexContainer.className = 'multiroute-fields flex gap-2 w-full max-xl:block max-xl:gap-0';
const clonedFlightclass_Passenger = Flightclass_Passenger.cloneNode(true);
const clonedsearch = search.cloneNode(true);
flexContainer.appendChild(clonedFlightclass_Passenger);
flexContainer.appendChild(clonedsearch);
Flightclass_Passenger.parentNode.insertBefore(flexContainer, Flightclass_Passenger);
Flightclass_Passenger.remove();
search.remove();
const addRouteContainer = document.createElement('div');
addRouteContainer.className = 'reserve-field w-1/4 h-20 relative max-xl:w-full max-xl:mb-4 max-xl:h-auto max-xl:my-2 max-xl:text-center';
const buttonWrapper = document.createElement('div');
buttonWrapper.className = 'h-full';
const addRouteButton = document.createElement('button');
addRouteButton.className = 'add-routs w-1/2 h-full text-xl cursor-pointer text-primary hover:text-secondary bg-inherit';
addRouteButton.setAttribute('type', 'button');
addRouteButton.setAttribute('onclick', 'addMulticityRoute(this)');
addRouteButton.innerHTML = '<span>افزودن مقصد</span>';
buttonWrapper.appendChild(addRouteButton);

const removeAllRouteButton = document.createElement('button');
removeAllRouteButton.className = 'remove-routs w-1/2 h-full text-xl cursor-pointer text-primary hover:text-secondary bg-inherit deactive-removemc';
removeAllRouteButton.setAttribute('type', 'button');
removeAllRouteButton.setAttribute('onclick', 'removeAllMulticityRoute(this)');
removeAllRouteButton.innerHTML = '<span>حذف همه</span>';
buttonWrapper.appendChild(removeAllRouteButton);

addRouteContainer.appendChild(buttonWrapper);
const passengers_field = document.querySelector('.Flightclass-Passenger');
if (passengers_field) {
  passengers_field.parentNode.insertBefore(addRouteContainer, passengers_field.nextSibling);
}

}
if (window.innerWidth >= 1024) {
  document.querySelectorAll(".route-content").forEach(function (element) {
    element.classList.add("set_Date_Box");
  });
}
}
function hide_Multicity() {
  document.querySelector("#flightSearch").classList.add("flex", "gap-2","one-btb-flight-form");
  document.querySelector("#flightSearch").classList.remove("block","multicity-flight-form");
  const elementToRemove = document.querySelector('.route-container');
  if (elementToRemove) {
    const parent = elementToRemove.parentNode;
    while (elementToRemove.firstChild) {
      parent.insertBefore(elementToRemove.firstChild, elementToRemove);
    }
    elementToRemove.remove();
  }
  const allElements = document.querySelectorAll('.route-content');
  if (allElements.length > 0) {
    const elementToKeep = allElements[0];
    allElements.forEach(function(element) {
      if (element !== elementToKeep) {
        element.remove();
      }
    });
  }
   document.querySelectorAll('.route-content').forEach(function(elementToRemove) {
    const parent = elementToRemove.parentNode;
    while (elementToRemove.firstChild) {
      parent.insertBefore(elementToRemove.firstChild, elementToRemove);
    }
    elementToRemove.remove();
  });
     document.querySelectorAll('.route-content-inner').forEach(function(elementToRemove) {
      const parent = elementToRemove.parentNode;
      while (elementToRemove.firstChild) {
        parent.insertBefore(elementToRemove.firstChild, elementToRemove);
      }
      elementToRemove.remove();
    });
    document.querySelectorAll('.multiroute-fields').forEach(function(elementToRemove) {
      const parent = elementToRemove.parentNode;
      while (elementToRemove.firstChild) {
        parent.insertBefore(elementToRemove.firstChild, elementToRemove);
      }
      elementToRemove.remove();
    });
   document.querySelectorAll('.multi-route-tlt').forEach(function(elementToRemove) {
    elementToRemove.remove();
   });
   document.querySelectorAll('.route-minus-btn').forEach(function(elementToRemove) {
    elementToRemove.remove();
   });
   document.querySelector(".add-routs").closest(".reserve-field").remove();
   document.querySelectorAll(".return-date").forEach(function (element) {
    element.classList.remove("hidden");
  });
  const flightSearch = document.querySelector("#flightSearch");
  if (flightSearch) {
    flightSearch.classList.add("flex", "gap-2");
    flightSearch.classList.remove("block");
  }
  document.querySelectorAll("#flightSearch .Basis_Date_Box").forEach(function (box) {
    box.classList.remove("w-1/4");
    box.classList.add("w-1/5");
    box.querySelectorAll(".reserve-field").forEach(function (element) {
        element.classList.remove("w-1/5","w-full");
        element.classList.add("w-1/2");
    });
});
document.querySelector(".reserve-search").classList.remove("w-1/4");
document.querySelector(".reserve-search").classList.add("w-auto");
document.querySelector(".flightclass-field").classList.remove("w-1/5");
document.querySelector(".flightclass-field").classList.add("w-auto");
}
const destination_nth_txt = ["مقصد اول", "مقصد دوم", "مقصد سوم", "مقصد چهارم"];
function addMulticityRoute(t) {
  document.querySelector(".remove-routs").classList.remove("deactive-removemc");
  const routeContainer = document.querySelector(".route-container");
  const routeContents = routeContainer.querySelectorAll(".route-content");
  if (routeContents.length < 4) {
    const firstRouteContentHTML = routeContents[0].innerHTML;
    const newRoute = document.createElement("div");
    newRoute.innerHTML = firstRouteContentHTML;
    if (window.innerWidth >= 1024) {
      newRoute.className = "route-content w-full mb-4 relative set_Date_Box";
    } else {
      newRoute.className = "route-content w-full mb-4 relative";
    }
    const routeTitle = newRoute.querySelector(".multi-route-tlt");
    const destinationText = destination_nth_txt[routeContents.length];
    if (routeTitle) routeTitle.innerText = destinationText;
    newRoute.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    newRoute.querySelector(".route-content-inner").querySelector(".route-minus-btn").innerHTML = 'حذف <i class="fa remove-multiroute-icon"></i>';
    newRoute.querySelector(".route-content-inner").querySelector(".route-minus-btn").setAttribute("onclick", "deleteMulticityRoute(this)");
    newRoute.querySelector(".route-content-inner").querySelector(".route-minus-btn").classList.add("cursor-pointer")
    const gregorianDate = newRoute.querySelector(".gregorian_date");
    if (gregorianDate) gregorianDate.remove();
    routeContainer.appendChild(newRoute);
    const newIndex = t.closest("form").querySelector(".route-container").querySelectorAll(".route-content").length;
    newRoute.setAttribute("data-index", newIndex);
    const previousRoute = newRoute.previousElementSibling;
    if (previousRoute) {
      const previousDestinationLocation = previousRoute.querySelector(".destination-route .reserve-location").value;
      const previousDestinationLocationId = previousRoute.querySelector(".destination-route .locationId").value;
      newRoute.querySelector(".departure-route .reserve-location").value = previousDestinationLocation;
      newRoute.querySelector(".departure-route .locationId").value = previousDestinationLocationId;
    }
  }
  checkButtonAddCity();
}
function removeAllMulticityRoute(t){
    document.querySelectorAll(".route-content").forEach(function (route) {
      if(parseInt(route.getAttribute("data-index")) > 2){
        route.remove();
      }
    });
    document.querySelector(".remove-routs").classList.add("deactive-removemc");
}
function deleteMulticityRoute(t) {
  if(document.querySelectorAll(".route-content").length < 4 ){
    document.querySelector(".remove-routs").classList.add("deactive-removemc");
  }
  t.closest(".route-content").remove();
  let index = 0;
  const routeContents = document.querySelector(".multicity-flight-form").querySelector(".route-container").querySelectorAll(".route-content");
  routeContents.forEach((route) => {
    route.querySelector(".multi-route-tlt").innerText = destination_nth_txt[index];
    index++;
    route.setAttribute("data-index", index);
  });
  checkButtonAddCity();
}
function checkButtonAddCity() {
  const routeContents = document.querySelector(".route-container").querySelectorAll(".route-content");
  const addButton = document.getElementsByClassName("add-routs")[0];
  if (routeContents.length >= 4) {
    addButton.classList.add("deactive-addmc");
  } else {
    addButton.classList.remove("deactive-addmc");
  }
};
// end multiflight module scripts
}
if(hotel_module == "true"){
// start hotel module scripts
if (window.innerWidth <= 750) {
  const hotelSearch = document.getElementById("hotelSearch");
  hotelSearch.setAttribute("action", "/M_Hotel_Search.bc");
}
document.querySelector(".hotel-btn").addEventListener("click", function () {
  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
  this.classList.add("active-module");
  document.querySelectorAll(".module-form").forEach(function (form) {
    form.classList.add("hidden");
  });
  document.querySelector(".r-hotel").classList.remove("hidden")
  const topBannerResize = document.querySelector(".module-banner");
  if (topBannerResize) {
    topBannerResize.style.backgroundImage = 'url("../images/hotel-search-bg.jpg")';
  }

  //simple-calendar
  if(calendar_type == "simple-calendar"){
    const dateInfoSelected = document.querySelector(".date_info_selected");
    if (dateInfoSelected) {
      const typeDate = dateInfoSelected.querySelector(".type_date");
      const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
      const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

      if (typeDate) typeDate.textContent = "تاریخ رفت :";
      if (dayOfDate) dayOfDate.textContent = "---";
      if (monthOfDate) monthOfDate.textContent = " ";
  }
  }
  //simple-calendar end
});
}
if(flighthotel_module == "true"){
// start flighthotel module scripts
if (window.innerWidth <= 750) {
  const flightHotelSearch = document.getElementById("flightHotelSearch");
  flightHotelSearch.setAttribute("action", "/M_FlightHotel_Search.bc");
}
document.querySelector(".flighthotel-btn").addEventListener("click", function () {
  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
  this.classList.add("active-module");
  document.querySelectorAll(".module-form").forEach(function (form) {
    form.classList.add("hidden");
  });
  document.querySelector(".r-flighthotel").classList.remove("hidden")
  const topBannerResize = document.querySelector(".module-banner");
  if (topBannerResize) {
    topBannerResize.style.backgroundImage = 'url("../images/flighthotel-search-bg.jpg")';
  }

  //simple-calendar
  if(calendar_type == "simple-calendar"){
    const dateInfoSelected = document.querySelector(".date_info_selected");
    if (dateInfoSelected) {
      const typeDate = dateInfoSelected.querySelector(".type_date");
      const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
      const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

      if (typeDate) typeDate.textContent = "تاریخ رفت :";
      if (dayOfDate) dayOfDate.textContent = "---";
      if (monthOfDate) monthOfDate.textContent = " ";
  }
  }
  //simple-calendar end
});
function CheckExteraHoteldate(t) {
  var e = t.checked;
  if (e) {
      t.value = 1;
      document.querySelector(".Wrapper-ExteraHoteldate").classList.remove("hidden");
      document.querySelector(".checkout").setAttribute("required", true);
      document.querySelector(".checkin").setAttribute("required", true);
  } else {
      t.value = 0;
      document.querySelector(".Wrapper-ExteraHoteldate").classList.add("hidden");
      document.querySelector(".checkout").setAttribute("required", false);
      document.querySelector(".checkin").setAttribute("required", false);
      document.querySelector(".checkout").value = "";
      document.querySelector(".checkin").value = "";
  }
}
}
if(tour_module == "true"){
  // start tour module scripts
  if (window.innerWidth <= 750) {
    const tourSearch = document.getElementById("tourSearch");
    tourSearch.setAttribute("action", "/M_Tour_Search.bc");
  }
  document.querySelector(".tour-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-tour").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/tour-search-bg.jpg")';
    }
  
    //simple-calendar
    if(calendar_type == "simple-calendar"){
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
  
        if (typeDate) typeDate.textContent = "تاریخ رفت :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
    }
    }
    //simple-calendar end
  });
  document.querySelector("#tourSearch .reserve-location").addEventListener("keyup", function () {
    var t = this.value.toLowerCase();
    var locations = document.querySelectorAll(".selectLocation");
    
    locations.forEach(function (location) {
      if (location.textContent.toLowerCase().includes(t)) {
        location.style.display = "";
      } else {
        location.style.display = "none";
      }
    });
  });
  
}
if(hotel_module == "true" || flighthotel_module == "true" || tour_module == "true"){
  function Change_Room_Count(t) {
    let e = parseInt(t.closest("ul").querySelector(".roomcount").value);
    let n = t.textContent == "+" ? e + 1 : e > 0 ? e - 1 : 0;
    if (n >= 1 && n < 5) {
      t.closest("ul").querySelector(".roomcount").value = n;
      if (e < n) {
        let s = n;
        const roomsContainer = t.closest("form").querySelector(".Rooms");
        
        let newRoom = document.createElement("div");
        newRoom.className = "contentRoom";
        newRoom.innerHTML = `
          <div class="numberOfRoom text-sm text-primary float-right clear-both w-1/2 mb-4 text-right">اتاق${s}</div>
          <div class="deleteRoom text-sm warningColor-100 float-left w-1/2 mb-4 text-left cursor-pointer" onclick="remove_Room(this)">حذف</div>
            <div class="passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-adultcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>بزرگسال</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span>+</span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-adultcount${s}" type="text" class="adultcount w-full text-center" name="_root.rooms__${s}.adultcount" maxlength="4000" value="2" readonly>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span>-</span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <div class="passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-childcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>کودک</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span>+</span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-childcount${s}" type="text" class="childcount w-full text-center" maxlength="4000" value="0" readonly>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span>-</span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <input type="hidden" name="_root.rooms__${s}.childcountandage" class="childcountandage" />
            <div class="section-select-age clear-both"></div>
        `;
        roomsContainer.appendChild(newRoom);
      } else if (e > n) {
        destroyRoomDropdown(t.closest("form").querySelector(".Rooms"), n);
      }
      const form = t.closest("form");
      form.querySelector(".passenger-counts").style.display = "inline-block";
      form.querySelector(".room-count .count").textContent = n;
      Sum_AdultCount(t);
      Sum_ChildCount(t);
    }
  }
  function remove_Room(e){
    let room = e.closest(".contentRoom");
    let t = e.closest(".Rooms");
    let count = 1;
    room.remove();
    let roomsContainer = document.querySelector(".Rooms");
    let rooms = roomsContainer.querySelectorAll(".contentRoom");
    rooms.forEach((room, index) => {
      room.querySelector(".numberOfRoom").textContent = `اتاق${index + 1}`;
      room.querySelector("input.adultcount").setAttribute("name", `_root.rooms__${index + 1}.adultcount`);
      room.querySelector("input.childcount").setAttribute("name", `_root.rooms__${index + 1}.childcount`);
      room.querySelector("input.childcountandage").setAttribute("name", `_root.rooms__${index + 1}.childcountandage`);
      count = index + 1;
    });
    t.closest(".passengers-field").querySelector(".room-count .count").textContent = count;
    t.closest(".passengers-field").querySelector(".roomcount ").value = count;
    Sum_AdultCount(t);
    Sum_ChildCount(t);
  }
  function destroyRoomDropdown(container, count) {
    if (count < 1) return;
    const roomToRemove = container.querySelector(`div.contentRoom:nth-child(${count + 1})`);
    if (roomToRemove) roomToRemove.remove();
  }
  function Change_AdultCount(t) {
    const button = t.querySelector("span");
    const adultCountInput = button.closest("ul").querySelector(".adultcount");
    const currentValue = parseInt(adultCountInput.value);
    const updatedValue = button.textContent == "+" ? currentValue + 1 : currentValue > 0 ? currentValue - 1 : 0;
    if (updatedValue < 10 || updatedValue >= 1) {
      adultCountInput.value = updatedValue;
      Sum_AdultCount(button);
    }
  }
  function Sum_AdultCount(t) {
    let totalAdults = 0;
    const form = t.closest("form");
    form.querySelectorAll(".contentRoom").forEach(room => {
      const adultCountInput = room.querySelector(".adultcount");
      totalAdults += parseInt(adultCountInput.value) || 0;
    });
    form.querySelector(".passenger-counts").style.display = "inline-block";
    form.querySelector(".adult-count .count").textContent = totalAdults;
  }
  function Change_ChildCount(t) {
    const span = t.querySelector("span");
    const room = t.closest(".contentRoom");
    const childCountInput = t.closest("ul").querySelector(".childcount");
    const currentCount = parseInt(childCountInput.value);
    const updatedCount = span.textContent == "+" ? currentCount + 1 : currentCount > 0 ? currentCount - 1 : 0;
  
    if (updatedCount < 5) {
      childCountInput.value = updatedCount;
  
      if (currentCount < updatedCount) {
        const sectionSelectAge = room.querySelector(".section-select-age");
        sectionSelectAge.innerHTML = ""; // Clear the section
  
        for (let i = 1; i <= updatedCount; i++) {
          const e = document.createElement("div");
          e.className = "createChildDropdown mb-4 w-full float-right clear-both";
          e.innerHTML = `
            <label for="select-age${i}" class="float-right text-sm leading-8 text-textColor">سن کودک ${i}</label>
            <select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2" id="select-age${i}">
              <option value="1">تا 1 سال</option>
              <option value="2">1 تا 2</option>
              <option value="3">2 تا 3</option>
              <option value="4">3 تا 4</option>
              <option value="5">4 تا 5</option>
              <option value="6">5 تا 6</option>
              <option value="7">6 تا 7</option>
              <option value="8">7 تا 8</option>
              <option value="9">8 تا 9</option>
              <option value="10">9 تا 10</option>
              <option value="11">10 تا 11</option>
              <option value="12">11 تا 12</option>
            </select>`;
          sectionSelectAge.appendChild(e);
        }
      } else if (currentCount > updatedCount) {
        const childDropdownsContainer = span.closest(".contentRoom").querySelector(".section-select-age");
        destroyChildDropdown(childDropdownsContainer, updatedCount);
      }
  
      }
      Sum_ChildCount(t);
  }
  function Sum_ChildCount(t) {
    let totalChildren = 0;
  
    const form = t.closest("form");
    form.querySelectorAll(".contentRoom").forEach(room => {
      const childCountInput = room.querySelector(".childcount");
      totalChildren += parseInt(childCountInput.value) || 0;
    });
  
    form.querySelector(".child-count .count").textContent = totalChildren;
    form.querySelector(".passenger-counts").style.display = "inline-block";
  }
  function destroyChildDropdown(t, e) {
    const dropdowns = t.querySelectorAll("div.createChildDropdown");
    if (dropdowns[e]) {
      dropdowns[e].remove();
    }
  }
}
if(calendar_type == "simple-calendar"){
// start simple calendar scripts
function openNextCal(t) {
  const activeModule = document.querySelector(".reservation-item > li.active-module");
  if (!activeModule) return;
  const dataId = activeModule.getAttribute("data-id");
  if (dataId == "r-flighthotel") {
    const extraHotelDateWrapper = document.querySelector(".Wrapper-ExteraHoteldate");

    if (extraHotelDateWrapper && !extraHotelDateWrapper.classList.contains("hidden")) {
      const checkinInput = extraHotelDateWrapper.querySelector(".checkin");
      const nextCalOpeningEx = extraHotelDateWrapper.querySelector(".nextCalOpeningex");

      if (checkinInput && checkinInput.value !== "" && nextCalOpeningEx && nextCalOpeningEx.value == "") {
        nextCalOpeningEx.click();
      }
    } else {
      const returnDateInput = document.querySelector(`.${dataId} .nextCalOpening`);
      if (returnDateInput && returnDateInput.value == "") {
        returnDateInput.click();
      }
    }
  } else {
    const nextCalOpening = document.querySelector(`.${dataId} .nextCalOpening`);
    if (nextCalOpening) {
      nextCalOpening.click();
    }
  }
}
// end simple calendar scripts
}
if(insurance_module == "true"){
  // start insurance module scripts
  if (window.innerWidth <= 750) {
    const insuranceSearch = document.getElementById("insuranceSearch");
    insuranceSearch.setAttribute("action", "/M_Insurance_Search.bc");
  }
  document.querySelector(".insurance-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-insurance").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/insurance-search-bg.jpg")';
    }
  });
  function Change_passenger_insurance(t) {
    const nextInput = t.closest("ul").querySelector(".passengercount");
    let e = parseInt(nextInput.value);
    let i = t.textContent == "+" ? e + 1 : e > 0 ? e - 1 : 0;
    let n = "";
    if (i >= 9 || i < 1) return;
    nextInput.value = i;

    const Dropdown = t.closest(".reserve-field");
    const passengerAge = Dropdown.querySelector(".section-passenger-birthday");
    if (e < i && passengerAge) {
      passengerAge.appendChild(createPassengerDropdown(i));
    } else if (e > i && passengerAge) {
      destroyPassengerDropdown(passengerAge, i);
    }
    n = n.substring(0, n.length - 2);
    const field = t.closest(".reserve-field");
    if (field) {
      const countPassengerElement = field.querySelector(".passenger-count").querySelector(".count");
      if (countPassengerElement) {
        countPassengerElement.textContent = i;
      }
    }
    reinitializeDropdowns();
  }
  function createPassengerDropdown(t) {
    const e = document.createElement("div");
    e.className = "createPassengerDropdown mb-4 w-full float-right clear-both";
    const label = document.createElement("label");
    label.className = "float-right text-sm leading-8 text-textColor";
    label.setAttribute("for", "passenger-birthday" + t);
    label.textContent = "تاریخ تولد مسافر " + t;
    e.appendChild(label);
    const div2 = document.createElement("div");
    div2.className = "birthdate-dates clear-both flex gap-2";
    const passenger_bithdate = document.createElement("input");
    passenger_bithdate.type = "hidden";
    passenger_bithdate.className ="passenger-bithdate"
    e.appendChild(passenger_bithdate);


    const div3 = document.createElement("div");
    div3.className = "birthdate-day relative";
    const input_day = document.createElement("input");
    input_day.className = "birthdate-day-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_day.maxLength = 2;
    input_day.placeholder = "روز";
    input_day.addEventListener('click', reinitializeDropdowns); 
    div3.appendChild(input_day);
    div2.appendChild(div3);

    const div4 = document.createElement("div");
    div4.className = "birthdate-month relative";
    const input_month = document.createElement("input");
    input_month.className = "birthdate-month-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_month.placeholder = "ماه";
    input_month.addEventListener('click', reinitializeDropdowns); 
    div4.appendChild(input_month);
    div2.appendChild(div4);

    const div5 = document.createElement("div");
    div5.className = "birthdate-year relative";
    const input_year = document.createElement("input");
    input_year.className = "birthdate-year-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_year.placeholder = "سال";
    input_year.addEventListener('click', reinitializeDropdowns); 
    div5.appendChild(input_year);
    div2.appendChild(div5);
    e.appendChild(div2);
    return e;
  }
  function destroyPassengerDropdown(t, e) {
    const dropdowns = t.querySelectorAll("div.createPassengerDropdown");
    if (dropdowns[e]) {
      dropdowns[e].remove();
    }
  }
//passenger birthday//////////////////////////////////////////////////////////////////
// وضعیت تقویم (شمسی یا میلادی)
let isSolarCalendar = false;
// لیست ماه‌های شمسی و میلادی
const solarMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const gregorianMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// ایجاد Dropdown
let ulElement;
// پاکسازی و ریست کردن ورودی تاریخ
function clearDateInputs() {
  const dateInputs = document.querySelectorAll('.birthdate-day-value, .birthdate-month-value, .birthdate-year-value');
  dateInputs.forEach(input => input.value = '');
  document.querySelectorAll('.passenger-bithdate').forEach(input => input.value = '');
}
function createDropdown(items, input) {
  if (ulElement) ulElement.remove();
  ulElement = document.createElement('ul');
  ulElement.classList.add('passenger-birthday-dropdown');
  ulElement.style.width = `${input.offsetWidth}px`;
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => {
      input.value = item;
      ulElement.style.display = 'none';
      setupBirthdateUpdate();
    });
    li.addEventListener('mouseover', () => {
      li.style.backgroundColor = '#f0f0f0';
    });
    li.addEventListener('mouseout', () => {
      li.style.backgroundColor = '#fff';
    });
    ulElement.appendChild(li);
  });
  document.body.appendChild(ulElement);
  const rect = input.getBoundingClientRect();
  ulElement.style.top = `${rect.bottom + window.scrollY}px`;
  ulElement.style.left = `${rect.left + window.scrollX}px`;
  ulElement.style.display = 'block';
}
// بستن دراپ داون
function closeDropdown() {
  if (ulElement) ulElement.style.display = 'none';
}
// تنظیم Dropdown و لیست آیتم‌ها
function setupDropdown(inputSelector, items, type) {
  const inputElements = document.querySelectorAll(inputSelector);
  inputElements.forEach((input) => {
    input.addEventListener('click', (event) => {
      createDropdown(items, input);
      event.stopPropagation();
    });
    // فیلتر گزینه‌ها هنگام تایپ
    input.addEventListener('input', () => {
      const filterText = input.value.trim().toLowerCase();
      const filteredItems = items.filter((item, index) => {
        // فیلتر هم بر اساس نام و هم شماره ماه
        if (type === 'month') {
          return item.toLowerCase().includes(filterText) || (index + 1).toString().includes(filterText);
        }
        return item.toLowerCase().includes(filterText);
      });
      createDropdown(filteredItems, input);
    });
  });
}
// بازسازی دراپ‌دان‌ها بر اساس تقویم
function reinitializeDropdowns() {
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = isSolarCalendar ? solarMonths : gregorianMonths;
  const years = Array.from(
    { length: 2026 - 1925 + 1 },
    (_, i) => isSolarCalendar ? (1925 + i - 621).toString() : (1925 + i).toString()
  );
  setupDropdown('.birthdate-day-value', days, 'day');
  setupDropdown('.birthdate-month-value', months, 'month');
  setupDropdown('.birthdate-year-value', years, 'year');
}
// تغییر تقویم با کلیک دکمه
document.querySelector('.toggle-calendar').addEventListener('click', () => {
    isSolarCalendar = !isSolarCalendar;
    document.querySelector('.toggle-calendar').textContent = isSolarCalendar ? 'تبدیل به تقویم میلادی' : 'تبدیل به تقویم شمسی';
    if(document.querySelector('.toggle-calendar').getAttribute("data-active") != 1 ){
      clearDateInputs();
    }
    reinitializeDropdowns();
    document.querySelector(".toggle-calendar").setAttribute("data-active",0)
  });

// بسته شدن دراپ‌داون در کلیک بیرون
document.addEventListener('click', (event) => {
  if (ulElement && !ulElement.contains(event.target)) {
    closeDropdown();
  }
});
// مقداردهی اولیه دراپ‌دان‌ها
reinitializeDropdowns();
//passenger-bithdate///////////////////////////////////////////////////////////////////////////
function updateHiddenBirthdateInput(container) {
  const dayInput = container.querySelector('.birthdate-day-value');
  const monthInput = container.querySelector('.birthdate-month-value');
  const yearInput = container.querySelector('.birthdate-year-value');
  const hiddenInput = container.querySelector('.passenger-bithdate');
  if (!dayInput || !monthInput || !yearInput || !hiddenInput) return;
  const day = dayInput.value.trim().padStart(2, '0');
  const month = (isSolarCalendar
    ? solarMonths.indexOf(monthInput.value.trim()) + 1
    : gregorianMonths.indexOf(monthInput.value.trim()) + 1
  ).toString().padStart(2, '0');
  const year = yearInput.value.trim();
  // بررسی اینکه تمام مقادیر کامل باشند
  if (day && month && year && day !== '00' && month !== '00') {
    hiddenInput.value = `${year}-${month}-${day}`;
    let container = dayInput.closest(".createPassengerDropdown")
    if(year.toString().length > 3) {
      check_valid_date(day,month,year,container)
    }
  } else {
    hiddenInput.value = '';
  }
}

function setupBirthdateUpdate() {
  document.querySelectorAll('.createPassengerDropdown').forEach(container => {
    const inputs = container.querySelectorAll('.birthdate-day-value, .birthdate-month-value, .birthdate-year-value');

    inputs.forEach(input => {
      // تغییر مقدار به محض وارد کردن یا تغییر هر فیلد
      updateHiddenBirthdateInput(container);
      input.addEventListener('input', () => {
        updateHiddenBirthdateInput(container);
      });
    });
  });
}
// فراخوانی اولیه
setupBirthdateUpdate();
//Valid Date/////////////////////////////////////////////////////////////////
function check_valid_date(day, month, year, container) {
  let maxDays;
  if (isSolarCalendar) {
    maxDays = getSolarMonthDays(parseInt(month), parseInt(year));
  } else {
    maxDays = getGregorianMonthDays(parseInt(month), parseInt(year));
  }

  if (day < 1 || day > maxDays || year < 1) {
    showErrorMessage(container, "تاریخ وارد شده نامعتبر است.");
    container.querySelector(".birthdate-day-value").value = '';
    container.querySelector(".birthdate-month-value").value = '';
    container.querySelector(".birthdate-year-value").value = '';
    container.querySelector(".passenger-bithdate").value = '';

  } else {
    removeErrorMessage(container);
  }
}

function getSolarMonthDays(month, year) {
  if (month >= 1 && month <= 6) return 31;
  if (month >= 7 && month <= 11) return 30;
  if (month === 12) {
    return solarLeapYears.includes(year) ? 30 : 29;
  }
  return 0;
}

const solarLeapYears = [
  1301, 1305, 1309, 1313, 1317, 1322, 1326, 1330,
  1334, 1338, 1342, 1346, 1350, 1355, 1359, 1363,
  1367, 1371, 1375, 1379, 1383, 1387, 1391, 1395,
  1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428,
  1432, 1437, 1441, 1445, 1449, 1453, 1457, 1461,
  1465, 1469, 1473, 1478, 1482, 1486, 1490, 1494,
  1498
];

function getGregorianMonthDays(month, year) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month === 2 && isGregorianLeapYear(year) ? 29 : monthDays[month - 1];
}

function isGregorianLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function showErrorMessage(container, message) {
  let errorElement = container.querySelector('.birthdate-error-message');

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'birthdate-error-message';
    container.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function removeErrorMessage(container) {
  const errorElement = container.querySelector('.birthdate-error-message');
  if (errorElement) {
    container.removeChild(errorElement);
  }
}
/////////////////////////////////////////////////////////////////////////////
}
if(cip_module == "true"){
  // start cip module scripts
  if (window.innerWidth <= 750) {
    const cipSearch = document.getElementById("cipSearch");
    cipSearch.setAttribute("action", "/M_Cip_Search.bc");
  }
  document.querySelector(".cip-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-cip").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/cip-search-bg.jpg")';
    }
    //simple-calendar
    if(calendar_type == "simple-calendar"){
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
        if (typeDate) typeDate.textContent = "تاریخ ورود یا خروج :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
    }
    }
    //simple-calendar end
  });
  function show_traveltype(e) {
    const element = e.closest(".reserve-field").querySelector('.hidden-box');
    if (element) {
      element.classList.toggle('hidden');
    }
  }    
  function select_traveltype(e){
    var dataValue = e.getAttribute("data-value");
        var dataText = e.textContent;
        var valueInput = e.closest(".reserve-field").querySelector(".traveltype-value");
        if (valueInput) {
          valueInput.value = dataValue;
        }
        var textElement = e.closest(".reserve-field").querySelector(".traveltype-text");
        if (textElement) {
          textElement.textContent = dataText;
        }
        e.closest(".reserve-field").querySelector('.hidden-box').classList.add('hidden');
  
        let classBox = e.closest('.reserve-field');
        if (classBox) {
          let nextDiv = classBox.nextElementSibling;
          if (nextDiv && nextDiv.classList.contains('reserve-field')) {
            let hiddenBox = nextDiv.querySelector('.hidden-box');
            if (hiddenBox) {
              hiddenBox.classList.remove("hidden");
            }
          }
        }
  };
  function show_flighttype(e) {
    const element = e.closest(".reserve-field").querySelector('.hidden-box');
    if (element) {
      element.classList.toggle('hidden');
    }
  }    
  function select_flighttype(e){
    var dataValue = e.getAttribute("data-value");
        var dataText = e.textContent;
        var valueInput = e.closest(".reserve-field").querySelector(".flighttype-value");
        if (valueInput) {
          valueInput.value = dataValue;
        }
        var textElement = e.closest(".reserve-field").querySelector(".flighttype-text");
        if (textElement) {
          textElement.textContent = dataText;
        }
        e.closest(".reserve-field").querySelector('.hidden-box').classList.add('hidden');
  
        let classBox = e.closest('.reserve-field');
        if (classBox) {
          let nextDiv = classBox.nextElementSibling;
          if (nextDiv && nextDiv.classList.contains('reserve-field')) {
            let hiddenBox = nextDiv.querySelector('.hidden-box');
            if (hiddenBox) {
              hiddenBox.classList.remove("hidden");
            }
          }
        }
  };
}
if(flight_module == "true" || cip_module == "true" || service_module == "true" || train_module == "true"){
  function Change_AdultCount_Flight(t) {
    const nextInput = t.closest("ul").querySelector(".adultcount");
    let e = parseInt(nextInput.value);
    let i = t.textContent == "+" ? e + 1 : e > 0 ? e - 1 : 0;
    if (i >= 10 || i < 1) return;
    nextInput.value = i;
    document.querySelectorAll(".adultcount").forEach(function (adultcount) {
      const nextSpan = adultcount.nextElementSibling;
      if (nextSpan) {
        nextSpan.textContent = nextSpan.textContent;
      }
    });
    const field = t.closest(".reserve-field");
    if (field) {
      const countAdultElement = field.querySelector(".adult-count").querySelector(".count");
      if (countAdultElement) {
        countAdultElement.textContent = i;
      }
    }
  }
  function Change_ChildCount_Flight(t) {
    const nextInput = t.closest("ul").querySelector(".childcount");
    let e = parseInt(nextInput.value);
    let i = t.textContent == "+" ? e + 1 : e > 0 ? e - 1 : 0;
    let n = "";
    if (i >= 5) return;
    nextInput.value = i;
    const prevInput = t.closest("ul").previousElementSibling;
    if (prevInput) prevInput.value = i + ",";
    t.querySelectorAll(".childcount").forEach(function (childcount) {
        const nextSpan = childcount.nextElementSibling;
        if (nextSpan) {
          const text = nextSpan.textContent;
          n += text + ": " + childcount.value + "، ";
        }
      });
    const Dropdown = t.closest(".reserve-field");
    const childsAge = Dropdown.querySelector(".section-select-age");
    if (e < i && childsAge) {
      childsAge.appendChild(createChildDropdown(i));
    } else if (e > i && childsAge) {
      destroyChildDropdown(childsAge, i);
    }
    n = n.substring(0, n.length - 2);
    const field = t.closest(".reserve-field");
    if (field) {
      const countChildElement = field.querySelector(".child-count").querySelector(".count");
      if (countChildElement) {
        countChildElement.textContent = i;
      }
    }
  }

}
if(flight_module == "true" || flighthotel_module == "true"){
  function show_flightclass(e) {
    const element = e.closest(".reserve-field").querySelector('.hidden-box');
    if (element) {
      element.classList.toggle('hidden');
    }
  }    
  function select_flightclass(e){
    var dataValue = e.getAttribute("data-value");
        var dataText = e.textContent;
        var valueInput = e.closest(".reserve-field").querySelector(".FlightClass-value");
        if (valueInput) {
          valueInput.value = dataValue;
        }
        var textElement = e.closest(".reserve-field").querySelector(".FlightClass-text");
        if (textElement) {
          textElement.textContent = dataText;
        }
        e.closest(".reserve-field").querySelector('.hidden-box').classList.add('hidden');
  
        let classBox = e.closest('.reserve-field');
        if (classBox) {
          let nextDiv = classBox.nextElementSibling;
          if (nextDiv && nextDiv.classList.contains('reserve-field')) {
            let hiddenBox = nextDiv.querySelector('.hidden-box');
            if (hiddenBox) {
              hiddenBox.classList.remove("hidden");
            }
          }
        }
  };
}
if(visa_module == "true"){
  // start visa module scripts
  if (window.innerWidth <= 750) {
    const visaSearch = document.getElementById("visaSearch");
    visaSearch.setAttribute("action", "/M_Visa_Search.bc");
  }
  document.querySelector(".visa-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-visa").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/visa-search-bg.jpg")';
    }
  });
}
if(service_module == "true"){
  // start service module scripts
  if (window.innerWidth <= 750) {
    const serviceSearch = document.getElementById("serviceSearch");
    serviceSearch.setAttribute("action", "/M_TouristPanel_Search.bc");
  }
  document.querySelector(".service-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-service").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/service-search-bg.jpg")';
    }
    //simple-calendar
    if(calendar_type == "simple-calendar"){
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
        if (typeDate) typeDate.textContent = "تاریخ ورود یا خروج :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
    }
    }
    //simple-calendar end
  });
}
if(train_module == "true"){
  // start train module scripts
  if (window.innerWidth <= 750) {
    const trainSearch = document.getElementById("trainSearch");
  
    if (trainSearch.getAttribute("action") == "/Tem3_Train_Roundtrip_Search.bc") {
      trainSearch.setAttribute("action", "/M_Train_Roundtrip_Search.bc");
    }
  
    if (trainSearch.getAttribute("action") == "/Tem3_Train_Oneway_Search.bc") {
      trainSearch.setAttribute("action", "/M_Train_Oneway_Search.bc");
    }
  }
  document.querySelectorAll(".formtrain").forEach(function(form) {
    form.addEventListener("submit", function(event) {
      let ageString = "";
      
      form.querySelectorAll(".createChildDropdown").forEach(function(dropdown) {
        ageString += dropdown.querySelector("select").value + ",";
      });
  
      if (ageString !== "") {
        const selectAgeValue = form.querySelector(".select-age-value");
        selectAgeValue.value = ageString;
  
        const updatedAgeString = selectAgeValue.value.replace(/,(?=[^,]*$)/, "");
        selectAgeValue.value = updatedAgeString;
      }
  
      const adults = parseInt(form.querySelector(".adultcount").value) || 0;
      const children = parseInt(document.querySelector(".childcount").value) || 0;
      const totalPassengers = adults + children;
  
      let infants = 0;
      document.querySelectorAll(".select-age").forEach(function(select) {
        if (parseInt(select.value) <= 2) {
          infants += 1;
        }
      });
  
      const alertText = document.querySelector(".alert-text");
      if (infants > adults) {
        event.preventDefault();
        alertText.textContent = "به ازای هر بزرگسال تنها یک نوزاد انتخاب کنید!";
      }
      if (totalPassengers > 10) {
        event.preventDefault();
        alertText.textContent = "باید مجموع تعداد بزرگسال و کودک کمتر از 10 باشد !";
      }
      if (adults < 1) {
        event.preventDefault();
        alertText.textContent = "حداقل یک بزرگسال انتخاب کنید !";
      }
    });
  });
  document.querySelector("#backtoback-train").addEventListener("click", function() {
    check_searchHistory('train')
    this.classList.add("active-r-btn");
    document.querySelector("#oneway-train").classList.remove("active-r-btn");
    document.querySelector("#trainSearch").setAttribute("data-form", "train");
    document.querySelector("#trainSearch").setAttribute("data-traintype", "2");
    document.querySelector("#trainSearch").setAttribute("action", "/Tem3_Train_Roundtrip_Search.bc");
    const end_date = document.querySelector("#trainSearch .end_date");
    if (end_date) {
      end_date.disabled = false;
    }
    document.getElementById("trainSearch").querySelectorAll(".return-date").forEach(function(element) {
      element.classList.remove("no-activedate");
    });
    const endDate = document.querySelector("#trainSearch .end_date");
    if (endDate) {
      if(calendar_type == "simple-calendar"){
        endDate.classList.add("nextCalOpening");
      }
    }
    if (window.innerWidth <= 750) {
      document.querySelector("#trainSearch").setAttribute("action", "/M_Train_Roundtrip_Search.bc");
    }
  });
  document.querySelector("#oneway-train").addEventListener("click", function () {
    check_searchHistory('train')
    this.classList.add("active-r-btn");
    document.querySelector("#backtoback-train").classList.remove("active-r-btn");
    document.querySelector("#trainSearch").setAttribute("data-form", "train");
    document.querySelector("#trainSearch").setAttribute("data-traintype", "1");
    document.querySelector("#trainSearch").setAttribute("action", "/Tem3_Train_Oneway_Search.bc");
    const end_date = document.querySelector("#trainSearch .end_date");
    if (end_date) {
      end_date.disabled = true;
    }
    const endDate = document.querySelector("#trainSearch .end_date");
    if (endDate) {
      if(calendar_type == "simple-calendar"){
        endDate.classList.remove("nextCalOpening");
      }
    }
    if (window.innerWidth <= 750) {
      document.querySelector("#trainSearch").setAttribute("action", "/M_Train_Oneway_Search.bc");
    }
    document.getElementById("trainSearch").querySelectorAll(".return-date").forEach(function (element) {
      element.classList.add("no-activedate");
    });
  });
  document.querySelector(".train-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-train").classList.remove("hidden")
    const topBannerResize = document.querySelector(".module-banner");
    if (topBannerResize) {
      topBannerResize.style.backgroundImage = 'url("../images/train-search-bg.jpg")';
    }
    //simple-calendar
    if(calendar_type == "simple-calendar"){
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
  
        if (typeDate) typeDate.textContent = "تاریخ رفت :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
    }
    }
    //simple-calendar end
  });
  function ExchangeRoute(t) {
    const reserveField = t.closest(".reserve-field");
    const departureInput = reserveField.querySelector(".departure");
    const destinationInput = reserveField.nextElementSibling.querySelector(".destination");
    const locationIdInput = reserveField.querySelector(".locationId");
    const nextLocationIdInput = reserveField.nextElementSibling.querySelector(".locationId");
    const autoFitText = reserveField.querySelector(".auto-fit");
    const nextAutoFitText = reserveField.nextElementSibling.querySelector(".auto-fit");
    const departureValue = departureInput.value;
    const destinationValue = destinationInput.value;
    const locationIdValue = locationIdInput.value;
    const nextLocationIdValue = nextLocationIdInput.value;
    const autoFitValue = autoFitText.textContent;
    const nextAutoFitValue = nextAutoFitText.textContent;
    departureInput.value = destinationValue;
    destinationInput.value = departureValue;
    locationIdInput.value = nextLocationIdValue;
    nextLocationIdInput.value = locationIdValue;
    autoFitText.textContent = nextAutoFitValue;
    nextAutoFitText.textContent = autoFitValue;
  }
  function CheckPrivateCompartment(elementent) {
    const isChecked = elementent.checked;
    elementent.value = isChecked ? 1 : 0;
  }
  function show_Compartment(e) {
    const element = e.closest(".reserve-field").querySelector('.hidden-box');
    if (element) {
      element.classList.toggle('hidden');
    }
  }    
  function select_Compartment(e){
    var dataValue = e.getAttribute("data-value");
        var dataText = e.textContent;
        var valueInput = e.closest(".reserve-field").querySelector(".Compartment-value");
        if (valueInput) {
          valueInput.value = dataValue;
        }
        var textElement = e.closest(".reserve-field").querySelector(".Compartment-text");
        if (textElement) {
          textElement.textContent = dataText;
        }
        e.closest(".reserve-field").querySelector('.hidden-box').classList.add('hidden');
        let CompartmentBox = e.closest('.reserve-field');
        if (CompartmentBox) {
          let nextDiv = CompartmentBox.nextElementSibling;
          if (nextDiv && nextDiv.classList.contains('reserve-field')) {
            let hiddenBox = nextDiv.querySelector('.hidden-box');
            if (hiddenBox) {
              hiddenBox.classList.remove("hidden");
            }
          }
        }
  };
  // end train module scripts
  }


