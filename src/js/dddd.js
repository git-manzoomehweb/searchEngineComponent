var calendar_type = document.querySelector(".calendar-type").value;
function empty_value(t) {
    const reserveField = t.closest(".reserve-field");
    reserveField.querySelector(".reserve-location").value = "";
    const searchList = reserveField.querySelector(".searchList");
    searchList.classList.remove("hidden");
    

    reserveField.querySelector(".reserve-location").focus();
    reserveField.querySelector(".ul-list").style.display = "block";
    const siblings = Array.from(reserveField.parentNode.children).filter(child => child !== reserveField);
    siblings.forEach(sibling => {
        const siblingSearchList = sibling.querySelector(".searchList");
        if (siblingSearchList) siblingSearchList.classList.add("hidden");
    });
}
function city_search(t) {
    if (t.which === 0 || t.ctrlKey || t.metaKey || t.altKey) return;
    const reserveField = t.closest(".reserve-field");
    const dataType = t.getAttribute("data-type");
    const miniLoading = reserveField.querySelector(".mini-loading");
    const locationResult = reserveField.querySelector(".locationResult");
    const ulList = reserveField.querySelector(".ul-list");
    const sendRequest = (params) => {
        miniLoading.style.display = "block";
        ulList.style.display = "none";
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
    if (dataType === "4") {
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
        if (dataType === "3" && (value === "رم" || value === "قم")) {
            if (value.length > 1) {
                sendRequest({ term: value, type: dataType, lid: "1", select_value: "0" });
            } else {
                locationResult.innerHTML = "";
                ulList.style.display = "block";
            }
        } else if (value.length > 2) {
            sendRequest({ term: value, type: dataType, lid: "1", select_value: "0" });
        } else {
            locationResult.innerHTML = "";
            ulList.style.display = "block";
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

if (window.innerWidth <= 750) {
    const flightSearch = document.getElementById("flightSearch");

    if (flightSearch.getAttribute("action") === "/Tem3_Roundtrip_Search.bc") {
        flightSearch.setAttribute("action", "/M_Roundtrip_Search.bc");
    }

    if (flightSearch.getAttribute("action") === "/Tem3_Oneway_Search.bc") {
        flightSearch.setAttribute("action", "/M_Oneway_Search.bc");
    }

    if (flightSearch.getAttribute("action") === "/Tem3_Multicity_Search.bc") {
        flightSearch.setAttribute("action", "/M_Multicity_Search.bc");
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
    document.querySelectorAll(".return-date").forEach(function(element) {
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
    document.querySelectorAll(".return-date").forEach(function (element) {
      element.classList.add("no-activedate");
    });
    if(document.querySelector(".formflight").classList.contains("multicity-flight-form")){
      hide_Multicity()
    }
  });
  document.querySelector("#multi").addEventListener("click", function () {
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

    document.querySelector(".flight-btn").addEventListener("click", function () {
      document.querySelectorAll(".reserve-btn").forEach(function (btn) {
        btn.classList.remove("active-module");
      });
      this.classList.add("active-module");
      document.querySelectorAll(".module-form").forEach(function (form) {
        form.style.display = "hidden";
      });
      document.querySelector(".r-flight").style.display = "block";
      const topBannerResize = document.querySelector(".search-engine-banner");
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
   function Change_AdultCount_Flight(t) {
    const nextInput = t.closest("ul").querySelector(".adultcount");
    let e = parseInt(nextInput.value);
    let i = t.textContent === "+" ? e + 1 : e > 0 ? e - 1 : 0;
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
    let i = t.textContent === "+" ? e + 1 : e > 0 ? e - 1 : 0;
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
  function createChildDropdown(t) {
    const e = document.createElement("div");
    e.className = "createChildDropdown mb-4 w-full float-right clear-both";
    const label = document.createElement("label");
    label.className = "float-right text-sm leading-8 text-textColor";
    label.setAttribute("for", "select-age-" + t);
    label.textContent = "سن کودک " + t;
    e.appendChild(label);
    const select = document.createElement("select");
    select.className = "select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2";
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
function openNextCal(t) {
  const activeModule = document.querySelector(".reservation-item > li.active-module");
  if (!activeModule) return;
  const dataId = activeModule.getAttribute("data-id");
  if (dataId === "r-flighthotel") {
    const extraHotelDateWrapper = document.querySelector(".Wrapper-ExteraHoteldate");

    if (extraHotelDateWrapper && extraHotelDateWrapper.style.display !== "none") {
      const checkinInput = extraHotelDateWrapper.querySelector(".checkin");
      const nextCalOpeningEx = extraHotelDateWrapper.querySelector(".nextCalOpeningex");

      if (checkinInput && checkinInput.value !== "" && nextCalOpeningEx && nextCalOpeningEx.value === "") {
        nextCalOpeningEx.click();
      }
    } else {
      const returnDateInput = document.querySelector(`.${dataId} .nextCalOpening`);
      if (returnDateInput && returnDateInput.value === "") {
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
function show_Multicity(){
  document.querySelector("#flightSearch").classList.remove("flex", "gap-2","one-btb-flight-form")
  document.querySelector("#flightSearch").classList.add("block","multicity-flight-form")
  document.querySelectorAll(".return-date").forEach(function (element) {
    element.classList.add("hidden");
  });
  document.querySelectorAll(".reserve-field").forEach(function (element) {
    element.classList.add("w-1/4");
    element.classList.remove("w-1/5","w-auto");
  });
  document.querySelectorAll(".Basis_Date_Box").forEach(function (box) {
    box.classList.add("w-1/4");
    box.classList.remove("w-1/5");
    box.querySelectorAll(".reserve-field").forEach(function (element) {
        element.classList.add("w-full");
        element.classList.remove("w-1/2");
    });
});
const departureRoute = document.querySelector('.departure-route');
const destinationRoute = document.querySelector('.destination-route');
const basisDateBox = document.querySelector('.Basis_Date_Box');
if (departureRoute && destinationRoute && basisDateBox) {
  const routeContainer = document.createElement('div');
  routeContainer.className = 'route-container';
  const routeContent = document.createElement('div');
  routeContent.className = 'route-content w-full mb-4 relative';
  routeContent.setAttribute('data-index', '1');
  const titleDiv = document.createElement('div');
  titleDiv.className = 'multi-route-tlt mb-2 text-textColor text-base w-auto';
  titleDiv.textContent = 'مقصد اول';
  const flexContainer = document.createElement('div');
  flexContainer.className = 'route-content-inner w-full flex gap-2 max-xl:block max-xl:gap-0';
  const clonedDeparture = departureRoute.cloneNode(true);
  const clonedDestination = destinationRoute.cloneNode(true);
  const clonedBasisDate = basisDateBox.cloneNode(true);
  flexContainer.appendChild(clonedDeparture);
  flexContainer.appendChild(clonedDestination);
  flexContainer.appendChild(clonedBasisDate);
  const deleteButton = document.createElement('div');
  deleteButton.className = 'route-minus-btn text-xl pr-4 text-red-600 w-1/4 h-20 leading-[80px] max-xl:absolute max-xl:top-0 max-xl:left-0 max-xl:h-auto max-xl:leading-normal max-xl:text-base max-xl:text-left hover:text-primary';
  flexContainer.appendChild(deleteButton);
  routeContent.appendChild(titleDiv);
  routeContent.appendChild(flexContainer);
  routeContainer.appendChild(routeContent);
  departureRoute.parentNode.insertBefore(routeContainer, departureRoute);
  const secondRouteContent = routeContent.cloneNode(true);
  secondRouteContent.setAttribute('data-index', '2');
  secondRouteContent.querySelector('.multi-route-tlt').textContent = 'مقصد دوم';
  routeContainer.appendChild(secondRouteContent);
  departureRoute.remove();
  destinationRoute.remove();
  basisDateBox.remove();
} 
const flightclass = document.querySelector('.flightclass-field');
const passengers = document.querySelector('.passengers-field');
const search = document.querySelector('.reserve-search');
if (flightclass && passengers && search) {
search.classList.remove("w-auto");
search.classList.add("w-1/4");
const flexContainer = document.createElement('div');
flexContainer.className = 'multiroute-fields flex gap-2 w-full max-xl:block max-xl:gap-0';
const clonedflightclass = flightclass.cloneNode(true);
const clonedpassengers = passengers.cloneNode(true);
const clonedsearch = search.cloneNode(true);
flexContainer.appendChild(clonedflightclass);
flexContainer.appendChild(clonedpassengers);
flexContainer.appendChild(clonedsearch);
flightclass.parentNode.insertBefore(flexContainer, flightclass);
flightclass.remove();
passengers.remove();
search.remove();
const addRouteContainer = document.createElement('div');
addRouteContainer.className = 'reserve-field w-1/4 h-20 relative max-xl:w-full max-xl:mb-4 max-xl:h-auto max-xl:my-2 max-xl:text-center';
const buttonWrapper = document.createElement('div');
buttonWrapper.className = 'h-full';
const addRouteButton = document.createElement('button');
addRouteButton.className = 'add-routs h-full text-xl cursor-pointer text-primary hover:text-secondary bg-inherit';
addRouteButton.setAttribute('type', 'button');
addRouteButton.setAttribute('onclick', 'addMulticityRoute(this)');
addRouteButton.innerHTML = '<span>افزودن مقصد</span>';
buttonWrapper.appendChild(addRouteButton);
addRouteContainer.appendChild(buttonWrapper);
const flightClassField = document.querySelector('.flightclass-field');
if (flightClassField) {
flightClassField.parentNode.insertBefore(addRouteContainer, flightClassField);
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
  document.querySelectorAll(".reserve-field").forEach(function (element) {
    element.classList.add("w-1/5");
    element.classList.remove("w-1/4");
  });
  document.querySelectorAll(".Basis_Date_Box").forEach(function (box) {
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
function deleteMulticityRoute(t) {
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
  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) gDayNo++;

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
  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) gDayNo++;

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
document.querySelector(".start_date").value = persian_today;
var spStartDiv = document.querySelector(".start_date").closest("div");
spStartDiv.querySelector(".selected-day").textContent = persian_today_split[2];
spStartDiv.querySelector(".selected-month").textContent =
  months[persian_today_split[1]];

document.querySelectorAll(".end_date").forEach(function (endElement) {
  if (!endElement.disabled) {
    endElement.value = persian_tomorrow;
    var spEndDiv = endElement.closest("div");
    spEndDiv.querySelector(".selected-day").textContent =
      persian_tomorrow_split[2];
    spEndDiv.querySelector(".selected-month").textContent =
      months[persian_tomorrow_split[1]];
  }
});



