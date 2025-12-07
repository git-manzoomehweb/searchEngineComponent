var calendar_type = document.querySelector(".calendar-type").value;
if (document.querySelector(".flight-module")) {
  var flight_module = document.querySelector(".flight-module").value;
  if (document.querySelector(".flighttype-dropDown")) {
    if (document.querySelector(".flighttype-dropDown-text")) {
      const list = document.querySelector(".flighttype-items");
      const label = document.querySelector(".flighttype-dropDown-text");
      const icon = document.querySelector(".flighttype-field-icon svg");

      const setIcon = (isOpen) => {
        if (!icon) return;
        icon.classList.toggle("icon-rotate", !!isOpen);
      };

      if (list) {
        list.classList.add("hidden");
        list.hidden = true;
        list.style.display = "none";
        list.style.opacity = "0";
        list.style.transition = "";
      }
      if (label) label.classList.remove("hidden");
      setIcon(false);

      label.addEventListener("click", function () {
        if (!list) return;

        const isClosed = list.hidden || list.classList.contains("hidden");

        if (window.innerWidth > 1024) {
          if (isClosed) {
            list.hidden = false;
            list.classList.remove("hidden");
            list.style.display = "";
            list.style.transition = "opacity 0.7s";
            requestAnimationFrame(() => {
              void list.offsetHeight;
              list.style.opacity = "1";
            });
            setIcon(true);
          } else {
            setIcon(false);
            list.style.transition = "opacity 0.7s";
            list.style.opacity = "0";
            list.addEventListener(
              "transitionend",
              () => {
                list.classList.add("hidden");
                list.hidden = true;
                list.style.display = "none";
                list.style.transition = "";
                setIcon(false);
              },
              { once: true }
            );
          }
        } else {
          if (isClosed) {
            list.hidden = false;
            list.classList.remove("hidden");
            list.style.display = "";
            list.style.opacity = "1";
            list.classList.add("fixed-Dropdownflighttype");
            document.querySelector("body").classList.add("overflow-hidden");
            setIcon(true);
          } else {
            list.classList.remove("fixed-Dropdownflighttype");
            document.querySelector("body").classList.remove("overflow-hidden");
            list.classList.add("hidden");
            list.hidden = true;
            list.style.display = "none";
            list.style.transition = "";
            list.style.opacity = "0";
            setIcon(false);
          }
        }
      });
    }

    function close_Dropdownflighttype(t) {
      const el = t.closest(".flighttype-items");
      if (!el) return;
      el.classList.remove("fixed-Dropdownflighttype");
      if (
        document.querySelector("body").classList.contains("overflow-hidden")
      ) {
        document.querySelector("body").classList.remove("overflow-hidden");
      }
      el.classList.add("hidden");
      el.hidden = true;
      el.style.display = "none";
      el.style.transition = "";
      el.style.opacity = "0";

      const icon = t
        .closest(".flighttype-dropDown")
        ?.querySelector(".down-icon");
      if (icon) icon.classList.remove("icon-rotate");
    }

    document.addEventListener("click", function (event) {
      if (
        !event.target.closest(
          ".flighttype-dropDown, .flighttype-dropDown li, .flighttype-dropDown-text, .flighttype-dropDown div, .flighttype-dropDown span"
        )
      ) {
        document
          .querySelectorAll(".flighttype-dropDown .flighttype-items")
          .forEach((element) => {
            if (!element.classList.contains("hidden") || !element.hidden) {
              const icon = element
                .closest(".flighttype-field")
                ?.querySelector(".down-icon");

              if (window.innerWidth > 1024) {
                if (icon) icon.classList.remove("icon-rotate");

                element.style.transition = "opacity 0.7s";
                requestAnimationFrame(() => {
                  element.style.opacity = 0;
                });

                element.addEventListener(
                  "transitionend",
                  () => {
                    element.classList.add("hidden");
                    element.hidden = true;
                    element.style.display = "none";
                    element.style.transition = "";
                    if (icon) icon.classList.remove("icon-rotate");
                  },
                  { once: true }
                );
              } else {
                element.classList.add("hidden");
                element.hidden = true;
                element.style.display = "none";
                element.classList.remove("fixed-Dropdownflighttype");
                document.body.classList.remove("overflow-hidden");
                element.style.opacity = "0";
                element.style.transition = "";
                if (icon) icon.classList.remove("icon-rotate");
              }
            }
          });
      }
    });

    function __closeFrom(innerEl) {
      const field = innerEl.closest(".flighttype-field.flighttype-dropDown");
      const list = field?.querySelector(".flighttype-items");
      const ic = field?.querySelector(".down-icon");
      if (!list) return;

      if (window.innerWidth > 1024) {
        if (ic) ic.classList.remove("icon-rotate");
        list.style.transition = "opacity 0.7s";
        requestAnimationFrame(() => {
          list.style.opacity = "0";
        });
        list.addEventListener(
          "transitionend",
          () => {
            list.classList.add("hidden");
            list.hidden = true;
            list.style.display = "none";
            list.style.transition = "";
          },
          { once: true }
        );
      } else {
        list.classList.remove("fixed-Dropdownflighttype");
        document.body.classList.remove("overflow-hidden");
        list.classList.add("hidden");
        list.hidden = true;
        list.style.display = "none";
        list.style.transition = "";
        list.style.opacity = "0";
        if (ic) ic.classList.remove("icon-rotate");
      }
    }

    document.addEventListener("click", function (e) {
      const target = e.target.closest(
        ".flighttype-dropDown .flighttype-items-ul li, .flighttype-dropDown .flighttype-items-ul label, .flighttype-dropDown .flighttype-items-ul span"
      );
      if (!target) return;
      const radio = target.querySelector('input[type="radio"]');
      if (radio && !radio.checked) radio.checked = true;
      __closeFrom(target);
    });

    document.addEventListener("change", function (e) {
      const inp = e.target;
      if (
        inp.matches?.(
          '.flighttype-dropDown input[type="radio"][name="flighttype"]'
        )
      ) {
        __closeFrom(inp);
      }
    });
  } else {
    document.querySelectorAll(".flighttype-items").forEach((el) => {
      el.hidden = false;
      el.classList.remove("hidden");
      if (el.style.display === "none") el.style.display = "";
      el.style.opacity = "";
      el.style.transition = "";
      el.classList.remove("fixed-Dropdownflighttype");
    });
  }
}
if (document.querySelector(".multiflight-module")) {
  var multiflight_module = document.querySelector(".multiflight-module").value;
}
if (document.querySelector(".hotel-module")) {
  var hotel_module = document.querySelector(".hotel-module").value;
}
if (document.querySelector(".flighthotel-module")) {
  var flighthotel_module = document.querySelector(".flighthotel-module").value;
}
if (document.querySelector(".tour-module")) {
  var tour_module = document.querySelector(".tour-module").value;
}
if (document.querySelector(".insurance-module")) {
  var insurance_module = document.querySelector(".insurance-module").value;
}
if (document.querySelector(".cip-module")) {
  var cip_module = document.querySelector(".cip-module").value;
}
if (document.querySelector(".visa-module")) {
  var visa_module = document.querySelector(".visa-module").value;
}
if (document.querySelector(".service-module")) {
  var service_module = document.querySelector(".service-module").value;
}
if (document.querySelector(".train-module")) {
  var train_module = document.querySelector(".train-module").value;
}
if (document.querySelector(".bus-module")) {
  var bus_module = document.querySelector(".bus-module").value;
}
// add this condition code in mobile
if (window.innerWidth < 1024) {
  if (document.querySelector("#hide-forms")) {
    var hide_forms = document.querySelector("#hide-forms").value;
  }
}
if (document.querySelector("#module-order")) {
  const btn = Array.from(document.querySelectorAll(".reserve-btn"));
  const moduleOrder = document
    .getElementById("module-order")
    .value.split(",")
    .map(Number);
  btn.sort((a, b) => {
    return (
      moduleOrder.indexOf(Number(a.getAttribute("data-type"))) -
      moduleOrder.indexOf(Number(b.getAttribute("data-type")))
    );
  });
  const parent = btn[0].parentNode;
  btn.forEach((btn) => parent.appendChild(btn));

  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
  // add this condition code in mobile
  if (window.innerWidth < 1024) {
    if (hide_forms !== "true") {
      btn[0].classList.add("active-module");
    }
  } else if (window.innerWidth >= 1024) {
    btn[0].classList.add("active-module");
  }
  const active_module = btn[0].getAttribute("data-id");
  document.querySelectorAll(".module-form").forEach(function (form) {
    if (form.getAttribute("id") == active_module) {
      // add this condition code in mobile
      if (window.innerWidth < 1024) {
        if (hide_forms !== "true") {
          form.classList.remove("hidden");
        } else {
          form.classList.add("invisible-module-form");
        }
      } else if (window.innerWidth >= 1024) {
        form.classList.remove("hidden");
      }
    } else {
      form.classList.add("hidden");
    }
  });
  const order = document.getElementById("module-order").value.split(",");
  const firstType = order[0];
  const firstLi = document.querySelector(
    `.reservation-item li[data-type="${firstType}"]`
  );
  if (firstLi) {
    const moduleName = firstLi.getAttribute("data-nav");
    check_searchHistory(moduleName);
  }
}
if (document.querySelector("#empty-fields")) {
  if (!document.querySelector(".landing-search-engine")) {
    if (document.querySelector("#empty-fields").value === "true") {
      document.querySelectorAll(".text-value").forEach(function (field) {
        if (field.value !== "") {
          field.value = "";
        }
      });
      document.querySelectorAll(".auto-fit").forEach(function (field) {
        if (field.textContent !== "") {
          field.textContent = "";
        }
      });
      document.querySelectorAll(".locationId").forEach(function (field) {
        if (field.value !== "") {
          field.value = "";
        }
      });
    }
  }
}
function empty_value(t) {
  const reserveField = t.closest(".reserve-field");
  reserveField.querySelector(".reserve-location").value = "";
  document.querySelectorAll(".searchList").forEach((e) => {
    e.classList.add("hidden");
    if (
      e.closest(".reserve-field").querySelector(".down-icon") &&
      e
        .closest(".reserve-field")
        .querySelector(".down-icon")
        .classList.contains("rotate")
    ) {
      e.closest(".reserve-field")
        .querySelector(".down-icon")
        .classList.remove("rotate");
    }
  });
  const searchList = reserveField.querySelector(".searchList");
  searchList.classList.remove("hidden");
  if (window.innerWidth > 1024) {
    searchList.style.opacity = 0;
    searchList.style.transition = "opacity 0.7s";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        searchList.style.opacity = 1;
      });
    });
  }
  const icon = reserveField.querySelector(".down-icon");
  if (icon) {
    reserveField.querySelector(".down-icon").classList.toggle("rotate");
  }
  reserveField
    .querySelector(".reserve-location")
    .focus({ preventScroll: true });
  // add this code in mobile
  if (window.innerWidth < 1024) {
    searchList.classList.add("fixed-searchList");
    document.querySelector("body").classList.add("overflow-hidden");
  }
  if (reserveField.querySelector(".ul-list")) {
    reserveField.querySelector(".ul-list").style.display = "block";
  }
  const siblings = Array.from(reserveField.parentNode.children).filter(
    (child) => child !== reserveField
  );
  siblings.forEach((sibling) => {
    const siblingSearchList = sibling.querySelector(".searchList");
    if (siblingSearchList) siblingSearchList.classList.add("hidden");
  });
  if (t.closest(".reserve-field").querySelector(".load-location-options")) {
    const url = "Client_Search_engine_Locations.bc?lid=3";
    const module_type = t.closest("form").getAttribute("data-form");
    const params = new URLSearchParams({ "module-type": module_type });
    fetch(`${url}&${params.toString()}`)
      .then((response) => response.text())
      .then((data) => {
        t
          .closest(".reserve-field")
          .querySelector(".load-location-options").innerHTML = data;
      })
      .catch((error) => console.error("Error loading page:", error));
  }
}
//function for landing page
var landing_scroll_place = "#search-box";
function check_landing(t) {
  if (document.querySelector("#landing-page")) {
    var landing_page = document.querySelector("#landing-page").value;
    if (landing_page == "true") {
      if (document.querySelector("#landing-change-content")) {
        var change_content = document.querySelector(
          "#landing-change-content"
        ).value;
        if (change_content == "true") {
          if (document.querySelector(".landing-content")) {
            const url = `default-${t}.bc`;
            fetch(url)
              .then((response) => response.text())
              .then((result) => {
                document.querySelector(".landing-content").innerHTML = result;
                if (document.querySelector(".item-loading")) {
                  document
                    .querySelector(".item-loading")
                    .classList.add("hidden");
                }
                document
                  .querySelectorAll(".landing-content script[src]")
                  .forEach((script) => {
                    let newScript = document.createElement("script");
                    newScript.src = script.src;
                    newScript.type = script.type;
                    document.body.appendChild(newScript);
                  });
              });
          }
        }
      }

      if (document.querySelector("#landing-change-url")) {
        const activeItem = document.querySelector(`[data-nav="${t}"]`);
        if (activeItem) {
          const navValue = activeItem.getAttribute("data-nav");
          // const newUrl = `/${navValue}-AR`;
          if (document.querySelector("#multi-language").value == "true") {
            var newUrl = `/ar-${navValue}`;
          } else {
            var newUrl = `/${navValue}`;
          }
          window.history.pushState({}, "", newUrl);
        }
      }

      if (document.querySelector(".header-landing-items")) {
        document
          .querySelectorAll(".header-landing-items .landing-item")
          .forEach(function (header_item) {
            if (header_item.classList.contains("active-landing")) {
              header_item.classList.remove("active-landing");
            }
            const item_id = header_item.getAttribute("data-id").split("-");
            const module_item = item_id[1];
            if (t == module_item) {
              header_item.classList.add("active-landing");
            }
          });
      }
      if (document.querySelector(".footer-landing-items")) {
        document
          .querySelectorAll(".footer-landing-items .landing-item")
          .forEach(function (footer_item) {
            if (footer_item.classList.contains("active-landing")) {
              footer_item.classList.remove("active-landing");
            }
            const item_id = footer_item.getAttribute("data-id").split("-");
            const module_item = item_id[1];
            if (t == module_item) {
              footer_item.classList.add("active-landing");
            }
          });
      }
      if (document.querySelector(".reservation-item")) {
        document
          .querySelectorAll(".reservation-item li")
          .forEach(function (reservation_item) {
            if (reservation_item.classList.contains("active-landing")) {
              reservation_item.classList.remove("active-landing");
            }
            const item_id = reservation_item.getAttribute("data-id").split("-");
            const module_item = item_id[1];
            if (t == module_item) {
              reservation_item.classList.add("active-landing");
              reservation_item.click();
            }
          });
      }
    }
  }
  const clickedElement = event.currentTarget;
  if (
    clickedElement.closest(".header-landing-items") ||
    clickedElement.closest(".footer-landing-items")
  ) {
    if (landing_scroll_place && landing_scroll_place !== "") {
      document
        .querySelector(landing_scroll_place)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document
        .querySelector("#search-box")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
    if (ulList) {
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
      sendRequest({ type: dataType, lid: "3" });
      t.setAttribute("data-active", "1");
    } else {
      locationResult.style.display = "block";
    }
  } else {
    const value = t.value.trim();
    t.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (dataType == "3" && (value == "رم" || value == "قم")) {
      if (value.length > 1) {
        sendRequest({
          term: value,
          type: dataType,
          lid: "3",
          select_value: "0",
        });
      } else {
        locationResult.innerHTML = "";
        if (ulList) {
          ulList.style.display = "block";
        }
      }
    } else if (value.length > 2) {
      sendRequest({ term: value, type: dataType, lid: "3", select_value: "0" });
    } else {
      locationResult.innerHTML = "";
      if (ulList) {
        ulList.style.display = "block";
      }
    }
  }
}
function SelectPlace(t) {
  const check_place = t.getAttribute("data-id");
  let duplicate = false;
  if (!t.closest("form").classList.contains("multicity-flight-form")) {
    t.closest("form")
      .querySelectorAll(".locationId")
      .forEach((element) => {
        if (
          !t.closest(".reserve-field").contains(element) &&
          element.value === check_place
        ) {
          duplicate = true;
        }
      });
    if (duplicate) {
      if (!t.closest(".searchList").querySelector(".duplicate-place-error")) {
        const error = document.createElement("div");
        error.className =
          "duplicate-place-error text-sm warningColor-100 text-right";
        error.textContent = "لا يمكن أن يكون الأصل والوجهة هو نفسه.";
        t.closest(".searchList").appendChild(error);
        setTimeout(() => {
          error.remove();
        }, 3000);
      }
      return;
    }
    const oldError = t
      .closest(".searchList")
      .querySelector(".duplicate-place-error");
    if (oldError) oldError.remove();
  } else if (t.closest("form").classList.contains("multicity-flight-form")) {
    t.closest(".flight-routes")
      .querySelectorAll(".locationId")
      .forEach((element) => {
        if (
          !t.closest(".reserve-field").contains(element) &&
          element.value === check_place
        ) {
          duplicate = true;
        }
      });
    if (duplicate) {
      if (!t.closest(".searchList").querySelector(".duplicate-place-error")) {
        const error = document.createElement("div");
        error.className =
          "duplicate-place-error text-sm warningColor-100 text-right";
        error.textContent = "لا يمكن أن يكون الأصل والوجهة هو نفسه.";
        t.closest(".searchList").appendChild(error);
        setTimeout(() => {
          error.remove();
        }, 3000);
      }
      return;
    }
    const oldError = t
      .closest(".searchList")
      .querySelector(".duplicate-place-error");
    if (oldError) oldError.remove();
  }
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
  } else if (
    Element.classList.contains("destination-route") &&
    Element.closest(".reserve-field").closest(".flight-routes")
  ) {
    const nextsection =
      Element.closest(".reserve-field").closest(
        ".flight-routes"
      ).nextElementSibling;
    if (nextsection && nextsection.classList.contains("Basis_Date_Box")) {
      const startDate = nextsection.querySelector(".start_date");
      if (startDate) startDate.click();
    }
  }
  if (document.querySelector("body").classList.contains("overflow-hidden")) {
    document.querySelector("body").classList.remove("overflow-hidden");
  }
}
function show_passengerbox(e) {
  const element = e.closest(".reserve-field").querySelector(".hidden-box");
  const icon = e.closest(".reserve-field").querySelector(".down-icon");
  if (element) {
    if (window.innerWidth > 1024) {
      if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        element.style.opacity = 0;
        element.style.transition = "opacity 0.7s";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            element.style.opacity = 1;
          });
        });
        if (window.innerWidth < 1024) {
          element.classList.add("fixed-passengerbox");
          document.querySelector("body").classList.add("overflow-hidden");
        }
      } else {
        element.style.opacity = 0;
        element.addEventListener(
          "transitionend",
          () => {
            element.classList.add("hidden");
          },
          { once: true }
        );
      }
    } else {
      element.classList.toggle("hidden");
      // add this code in mobile
      if (window.innerWidth < 1024) {
        element.classList.add("fixed-passengerbox");
        document.querySelector("body").classList.add("overflow-hidden");
      }
    }
  }
  if (icon) {
    icon.classList.toggle("rotate");
  }
}
function close_passenger(e) {
  if (window.innerWidth > 1024) {
    e.closest(".hidden-box").style.opacity = 0;
    e.closest(".hidden-box").addEventListener(
      "transitionend",
      () => {
        e.closest(".hidden-box").classList.add("hidden");
      },
      { once: true }
    );
  } else {
    e.closest(".hidden-box").classList.add("hidden");
  }
  let passBox = e.closest(".reserve-field");
  let icon = e.closest(".reserve-field").querySelector(".down-icon");
  if (passBox) {
    let nextDiv = passBox.nextElementSibling;
    if (nextDiv && nextDiv.classList.contains("reserve-field")) {
      let hiddenBox = nextDiv.querySelector(".hidden-box");
      if (hiddenBox) {
        hiddenBox.classList.remove("hidden");
      }
    }
  }
  if (icon) {
    icon.classList.remove("rotate");
  }
  if (document.querySelector("body").classList.contains("overflow-hidden")) {
    document.querySelector("body").classList.remove("overflow-hidden");
  }
}
function createChildDropdown(t) {
  const ordinalWords = ["الأول", "الثاني", "الثالث", "الرابع"];
  const e = document.createElement("div");
  e.className = "createChildDropdown mb-4 w-full float-right clear-both";
  const label = document.createElement("label");
  label.className = "float-right text-sm leading-8 text-textColor";
  label.setAttribute("for", "select-age-" + t);
  label.textContent = "عمر الطفل " + (ordinalWords[t - 1] || t);
  e.appendChild(label);
  const select = document.createElement("select");
  select.className =
    "select-age float-left w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2";
  select.id = "select-age" + t;
  e.appendChild(select);
  const options = [
    "إلى سنة واحدة",
    "1 إلى 2 سنة",
    "2 إلى 3 سنة",
    "3 إلى 4 سنة ",
    "4 إلى 5 سنة",
    "5 إلى 6 سنة",
    "6 إلى 7 سنة",
    "7 إلى 8 سنة",
    "8 إلى 9 سنة",
    "9 إلى 10 سنة",
    "10 إلى 11 سنة",
    "11 إلى 12 سنة",
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
      searchElement.classList.add("hidden");
      const icon = searchElement
        .closest(".reserve-field")
        .querySelector(".down-icon");
      if (icon && icon.classList.contains("rotate")) {
        icon.classList.remove("rotate");
      }
    });
  });
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".searchList, .reserve-location, .selectLocation, .reserve-field.departure-route, .reserve-field.destination-route, .form-search-input"
    )
  ) {
    document.querySelectorAll(".searchList").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".reserve-field")
        .querySelector(".down-icon");
      if (icon && icon.classList.contains("rotate")) {
        icon.classList.remove("rotate");
      }
    });
  }
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".FlightClass, .FlightClass li,.flightclass-field,.flightclass-field div,.flightclass-field label,.flightclass-field span"
    )
  ) {
    document.querySelectorAll(".FlightClass").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".flightclass-field")
        .querySelector(".down-icon");
      if (icon) {
        icon.classList.remove("rotate");
      }
    });
  }
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".passengerbox,.passengers-field label,.passengers-field div,passengers-field span,.birthdate-dates,.birthdate-dates div,.birthdate-dates input,.passenger-birthday-dropdown,.passenger-birthday-dropdown li,.contentRoom .deleteRoom"
    )
  ) {
    document.querySelectorAll(".passengerbox").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".passengers-field")
        .querySelector(".down-icon");
      if (icon) {
        icon.classList.remove("rotate");
      }
    });
  }
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".traveltype, .traveltype li,.traveltype-field,.traveltype-field div,.traveltype-field label,.traveltype-field span"
    )
  ) {
    document.querySelectorAll(".traveltype").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".traveltype-field")
        .querySelector(".down-icon");
      if (icon) {
        icon.classList.remove("rotate");
      }
    });
  }
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".flighttype, .flighttype li,.flighttype-field,.flighttype-field div,.flighttype-field label,.flighttype-field span"
    )
  ) {
    document.querySelectorAll(".flighttype").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".flighttype-field")
        .querySelector(".down-icon");
      if (icon) {
        icon.classList.remove("rotate");
      }
    });
  }
});
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(
      ".Compartment, .Compartment li,.Compartment-field,.Compartment-field div,.Compartment-field label,.Compartment-field span"
    )
  ) {
    document.querySelectorAll(".Compartment").forEach((element) => {
      if (window.innerWidth > 1024) {
        if (!element.classList.contains("hidden")) {
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            element.style.opacity = 0;
          });
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.add("hidden");
      }
      const icon = element
        .closest(".Compartment-field")
        .querySelector(".down-icon");
      if (icon) {
        icon.classList.remove("rotate");
      }
    });
  }
});
// show date in engine
var today = new Date();
var gYear = today.getFullYear();
var gMonth = today.getMonth() + 1;
var gDay = today.getDate();
var persianCurrent = gYear + "-" + gMonth + "-" + gDay;
document.querySelector(".persiancurrent").value = persianCurrent;
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

var persian_today =
  gregorian_year + "-" + gregorian_month + "-" + gregorian_day;
var persian_tomorrow =
  gregorian_year_tomorrow +
  "-" +
  gregorian_month_tomorrow +
  "-" +
  gregorian_day_tomorrow;
var persian_today_split = persian_today.split("-");
var persian_tomorrow_split = persian_tomorrow.split("-");
// Persian months
var months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
// Update `.start_date` and `.end_date`
document.querySelectorAll(".start_date").forEach(function (startElement) {
  if (startElement && !startElement.classList.contains("checkin")) {
    if (document.querySelector("#empty-fields").value !== "true") {
      startElement.value = persian_today;
      var spStartDiv = startElement.closest("div");
      spStartDiv.querySelector(".selected-day").textContent =
        persian_today_split[2];
      spStartDiv.querySelector(".selected-month").textContent =
        months[persian_today_split[1]];
    }
  }
});
document.querySelectorAll(".end_date").forEach(function (endElement) {
  if (!endElement.disabled && !endElement.classList.contains("checkout")) {
    if (document.querySelector("#empty-fields").value !== "true") {
      endElement.value = persian_tomorrow;
      var spEndDiv = endElement.closest("div");
      spEndDiv.querySelector(".selected-day").textContent =
        persian_tomorrow_split[2];
      spEndDiv.querySelector(".selected-month").textContent =
        months[persian_tomorrow_split[1]];
    }
  }
});
function Check_Passenger_Count(t) {
  const module = t.closest("form").getAttribute("id");
  if (module == "hotelSearch") {
    if (
      t.closest(".passenger-item").classList.contains("adult-passenger-item")
    ) {
      const adult_count = t.closest("ul").querySelector(".adultcount").value;
      if (adult_count > 13) {
        if (!t.closest(".plus-count").classList.contains("disable-button")) {
          t.closest(".plus-count").classList.add("disable-button");
        }
      } else {
        if (t.closest(".contentRoom").querySelector(".alert-adults")) {
          t.closest(".contentRoom").querySelector(".alert-adults").remove();
        }
        t.closest(".contentRoom")
          .querySelectorAll(".plus-count")
          .forEach(function (button) {
            if (button.classList.contains("disable-button")) {
              button.classList.remove("disable-button");
            }
          });
        if (
          t.closest(".passengerbox").querySelector(".second-room-type") &&
          t
            .closest(".passengerbox")
            .querySelector(".second-room-type")
            .classList.contains("disable-button")
        ) {
          t.closest(".passengerbox")
            .querySelector(".second-room-type")
            .classList.remove("disable-button");
        }
      }
    }
  } else {
    const adult_count = t
      .closest(".passengers-field")
      .querySelector(".adult-count")
      .querySelector(".count").textContent;
    const child_count = t
      .closest(".passengers-field")
      .querySelector(".child-count")
      .querySelector(".count").textContent;
    let sum_passenger = 0;
    if (module == "flightSearch" || module == "serviceSearch") {
      const infant_count = t
        .closest(".passengers-field")
        .querySelector(".infant-count")
        .querySelector(".count").textContent;
      sum_passenger =
        parseInt(adult_count) + parseInt(child_count) + parseInt(infant_count);
    } else {
      sum_passenger = parseInt(adult_count) + parseInt(child_count);
    }
    if (sum_passenger > 8) {
      t.closest(".passengerbox")
        .querySelectorAll(".plus-count")
        .forEach(function (button) {
          if (!button.classList.contains("disable-button")) {
            button.classList.add("disable-button");
          }
        });
    } else {
      if (t.closest(".passengerbox").querySelector(".alert-passengers")) {
        t.closest(".passengerbox").querySelector(".alert-passengers").remove();
      }
      t.closest(".passengerbox")
        .querySelectorAll(".plus-count")
        .forEach(function (button) {
          if (button.classList.contains("disable-button")) {
            button.classList.remove("disable-button");
          }
        });
      if (
        t.closest(".passengerbox").querySelector(".second-room-type") &&
        t
          .closest(".passengerbox")
          .querySelector(".second-room-type")
          .classList.contains("disable-button")
      ) {
        t.closest(".passengerbox")
          .querySelector(".second-room-type")
          .classList.remove("disable-button");
      }
    }
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("disable-button")) {
    const module = event.target.closest("form").getAttribute("id");
    if (module == "hotelSearch") {
      if (
        !event.target.closest(".passengerbox").querySelector(".alert-adults")
      ) {
        const alertDiv = document.createElement("div");
        alertDiv.className =
          "alert-adults alert-for-passenger text-sm warningColor-100 text-right";
        alertDiv.textContent = "يجب أن يكون عدد البالغين أقل من 15!";
        event.target.closest(".adult-passenger-item").after(alertDiv);
        setTimeout(() => {
          alertDiv.remove();
        }, 3000);
      }
    } else {
      if (
        !event.target
          .closest(".passengerbox")
          .querySelector(".alert-passengers")
      ) {
        const alertDiv = document.createElement("div");
        alertDiv.className =
          "alert-passengers alert-for-passenger text-sm warningColor-100 text-right";
        alertDiv.textContent =
          "يجب أن يكون العدد الإجمالي للبالغين والأطفال أقل من 10!";
        event.target
          .closest(".passengerbox")
          .querySelector(".child-passenger-item")
          .after(alertDiv);
        setTimeout(() => {
          alertDiv.remove();
        }, 3000);
      }
    }
  }
});

if (flight_module == "true") {
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
  // new version of the following function
  document.querySelectorAll(".formflight").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      let ageString = "";
      const childCount =
        parseInt(form.querySelector(".childcount").value, 10) || 0;
      const infantCount =
        parseInt(form.querySelector(".infantcount").value, 10) || 0;
      const childAge = 3;
      const infantAge = 1;
      let sumCount = [];
      sumCount.push(...Array.from({ length: childCount }, () => childAge));
      sumCount.push(...Array.from({ length: infantCount }, () => infantAge));
      ageString = sumCount.join(",");
      if (ageString !== "") {
        const selectAgeValue = form.querySelector(".select-age-value");
        selectAgeValue.value = ageString;
      }
      const adults = parseInt(form.querySelector(".adultcount").value, 10) || 0;
      const childs = parseInt(form.querySelector(".childcount").value, 10) || 0;
      const infants =
        parseInt(form.querySelector(".infantcount").value, 10) || 0;
      const totalPassengers = adults + childs + infants;
      const alertText = form
        .querySelector(".passengerbox")
        .querySelector(".alert-text");
      if (alertText) {
        alertText.remove();
      }

      if (infants > adults) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">اختر طفلًا واحدًا فقط لكل شخص بالغ!</div>`
          );
      }
      if (totalPassengers > 10) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">يجب أن يكون العدد الإجمالي للبالغين والأطفال والرضع أقل من 10!</div>`
          );
      }
      if (adults < 1) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">اختر شخصًا بالغًا واحدًا على الأقل. !</div>`
          );
      }
    });
  });
  document.querySelector("#backtoback").addEventListener("click", function () {
    document.querySelector("#backtoback").setAttribute("data-change", "1");
    document.querySelector("#oneway").setAttribute("data-change", "0");
    document.querySelector("#multi").setAttribute("data-change", "0");
    document
      .querySelectorAll(".formflight .Basis_Date_Box .reserve-field")
      .forEach(function (el) {
        if (
          el.style.border === "1px solid rgb(244, 46, 54)" ||
          el.style.border === "1px solid #f42e36"
        ) {
          el.style.border = "";
        }
      });
    if (document.querySelector(".flighttype-dropDown")) {
      document.querySelector(".flighttype-items").classList.add("hidden");
      document
        .querySelector(".flighttype-field-icon svg")
        .classList.remove("icon-rotate");
      document.querySelector(".flighttype-dropDown-text").textContent =
        document.querySelector("#backtoback span").textContent;
    }
    check_searchHistory("flight");
    document.querySelector("#flightSearch").setAttribute("method", "get");
    this.classList.add("active-r-btn");
    document.querySelector("#oneway").classList.remove("active-r-btn");
    document.querySelector("#multi").classList.remove("active-r-btn");
    document.querySelector("#flightSearch").setAttribute("data-form", "flight");
    document
      .querySelector("#flightSearch")
      .setAttribute("data-flighttype", "2");
    document
      .querySelector("#flightSearch")
      .setAttribute("action", "/Tem3_Roundtrip_Search.bc");
    const end_date = document.querySelector("#flightSearch .end_date");
    if (end_date) {
      end_date.disabled = false;
    }
    document
      .getElementById("flightSearch")
      .querySelectorAll(".return-date")
      .forEach(function (element) {
        element.classList.remove("no-activedate");
      });
    const endDate = document.querySelector("#flightSearch .end_date");
    if (endDate) {
      if (calendar_type == "simple-calendar") {
        endDate.classList.add("nextCalOpening");
      }
    }
    if (window.innerWidth <= 750) {
      document
        .querySelector("#flightSearch")
        .setAttribute("action", "/M_Roundtrip_Search.bc");
    }
    if (
      document
        .querySelector(".formflight")
        .classList.contains("multicity-flight-form")
    ) {
      hide_Multicity();
    }
  });
  document.querySelector("#oneway").addEventListener("click", function () {
    document.querySelector("#backtoback").setAttribute("data-change", "0");
    document.querySelector("#oneway").setAttribute("data-change", "1");
    document.querySelector("#multi").setAttribute("data-change", "0");
    document
      .querySelectorAll(".formflight .Basis_Date_Box .reserve-field")
      .forEach(function (el) {
        if (
          el.style.border === "1px solid rgb(244, 46, 54)" ||
          el.style.border === "1px solid #f42e36"
        ) {
          el.style.border = "";
        }
      });
    if (document.querySelector(".flighttype-dropDown")) {
      document.querySelector(".flighttype-items").classList.add("hidden");
      document
        .querySelector(".flighttype-field-icon svg")
        .classList.remove("icon-rotate");
      document.querySelector(".flighttype-dropDown-text").textContent =
        document.querySelector("#oneway span").textContent;
    }
    check_searchHistory("flight");
    document.querySelector("#flightSearch").setAttribute("method", "get");
    this.classList.add("active-r-btn");
    document.querySelector("#backtoback").classList.remove("active-r-btn");
    document.querySelector("#multi").classList.remove("active-r-btn");
    document.querySelector("#flightSearch").setAttribute("data-form", "flight");
    document
      .querySelector("#flightSearch")
      .setAttribute("data-flighttype", "1");
    document
      .querySelector("#flightSearch")
      .setAttribute("action", "/Tem3_Oneway_Search.bc");
    const end_date = document.querySelector("#flightSearch .end_date");
    if (end_date) {
      end_date.disabled = true;
    }
    const endDate = document.querySelector("#flightSearch .end_date");
    if (endDate) {
      if (calendar_type == "simple-calendar") {
        endDate.classList.remove("nextCalOpening");
      }
    }
    if (window.innerWidth <= 750) {
      document
        .querySelector("#flightSearch")
        .setAttribute("action", "/M_Oneway_Search.bc");
    }
    document
      .getElementById("flightSearch")
      .querySelectorAll(".return-date")
      .forEach(function (element) {
        element.classList.add("no-activedate");
      });
    if (
      document
        .querySelector(".formflight")
        .classList.contains("multicity-flight-form")
    ) {
      hide_Multicity();
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
    document.querySelector(".r-flight").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document
          .querySelector(".r-flight")
          .classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-flight")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-flight")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.add("flight-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.add("flight-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/flight-search-bg.jpg" alt="flight-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/flight-search-bg.jpg" alt="flight-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

        if (typeDate) typeDate.textContent = "تاريخ المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
  function ExchangeRoute(t) {
    const FlightRoute = t.closest(".flight-routes");
    const departureInput = FlightRoute.querySelector(".departure");
    const destinationInput = FlightRoute.querySelector(".destination");
    const locationIdInput =
      FlightRoute.querySelector(".departure-route").querySelector(
        ".locationId"
      );
    const nextLocationIdInput =
      FlightRoute.querySelector(".destination-route").querySelector(
        ".locationId"
      );
    const autoFitText =
      FlightRoute.querySelector(".departure-route").querySelector(".auto-fit");
    const nextAutoFitText =
      FlightRoute.querySelector(".destination-route").querySelector(
        ".auto-fit"
      );
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
if (multiflight_module == "true") {
  // start multiflight module scripts
  if (window.innerWidth <= 750) {
    const flightSearch = document.getElementById("flightSearch");
    if (
      flightSearch.getAttribute("action") == "/Tem3_Multicity_Search.bc?lid=3"
    ) {
      flightSearch.setAttribute("action", "/M_Multicity_Search.bc?lid=3");
    }
  }
  document.querySelector("#multi").addEventListener("click", function () {
    document.querySelector("#backtoback").setAttribute("data-change", "0");
    document.querySelector("#oneway").setAttribute("data-change", "0");
    document.querySelector("#multi").setAttribute("data-change", "1");
    document
      .querySelectorAll(".formflight .Basis_Date_Box .reserve-field")
      .forEach(function (el) {
        if (
          el.style.border === "1px solid rgb(244, 46, 54)" ||
          el.style.border === "1px solid #f42e36"
        ) {
          el.style.border = "";
        }
      });
    if (document.querySelector(".flighttype-dropDown")) {
      document.querySelector(".flighttype-items").classList.add("hidden");
      document
        .querySelector(".flighttype-field-icon svg")
        .classList.remove("icon-rotate");
      document.querySelector(".flighttype-dropDown-text").textContent =
        document.querySelector("#multi span").textContent;
    }
    document.querySelector("#flightSearch").setAttribute("method", "post");
    document.querySelector("#backtoback").classList.remove("active-r-btn");
    document.querySelector("#oneway").classList.remove("active-r-btn");
    document.querySelector("#flightSearch").setAttribute("data-form", "multi");
    document
      .querySelector("#flightSearch")
      .setAttribute("data-flighttype", "3");
    document
      .querySelector("#flightSearch")
      .setAttribute("action", "/Tem3_Multicity_Search.bc?lid=3");
    const end_date = document.querySelector("#flightSearch .end_date");
    if (end_date) {
      end_date.disabled = true;
    }
    const endDate = document.querySelector("#flightSearch .end_date");
    if (endDate) {
      if (calendar_type == "simple-calendar") {
        endDate.classList.remove("nextCalOpening");
      }
    }

    if (window.innerWidth <= 750) {
      document
        .querySelector("#flightSearch")
        .setAttribute("action", "/M_Multicity_Search.bc?lid=3");
    }
    if (!this.classList.contains("active-r-btn")) {
      show_Multicity();
      this.classList.add("active-r-btn");
    }
    var second_exchange = document
      .querySelectorAll(".route-content")[1]
      .querySelector(".exchangeRoute");
    ExchangeRoute(second_exchange);
    check_searchHistory("multi");
  });
  function show_Multicity() {
    document
      .querySelector("#flightSearch")
      .classList.remove("flex", "gap-2", "one-btb-flight-form");
    document
      .querySelector("#flightSearch")
      .classList.add("block", "multicity-flight-form");
    //empty-fields
    if (document.querySelector("#empty-fields")) {
      if (!document.querySelector(".landing-search-engine")) {
        if (document.querySelector("#empty-fields").value === "true") {
          document.querySelectorAll(".text-value").forEach(function (field) {
            document
              .querySelectorAll(".multicity-flight-form .departure")
              .forEach(function (element) {
                if (element.value !== "") {
                  element.value = "";
                }
              });
            document
              .querySelectorAll(".multicity-flight-form .destination")
              .forEach(function (element) {
                if (element.value !== "") {
                  element.value = "";
                }
              });
            document
              .querySelectorAll(".multicity-flight-form .locationId")
              .forEach(function (element) {
                if (element.value !== "") {
                  element.value = "";
                }
              });
            document
              .querySelectorAll(
                ".multicity-flight-form .departure-route .auto-fit"
              )
              .forEach(function (element) {
                if (element.textContent !== "") {
                  element.textContent = "";
                }
              });
            document
              .querySelectorAll(
                ".multicity-flight-form .destination-route .auto-fit"
              )
              .forEach(function (element) {
                if (element.textContent !== "") {
                  element.textContent = "";
                }
              });
          });
        }
      }
    }
    document
      .querySelectorAll("#flightSearch .return-date")
      .forEach(function (element) {
        element.classList.add("hidden");
      });
    document
      .querySelectorAll("#flightSearch .Basis_Date_Box")
      .forEach(function (box) {
        box.classList.add("w-1/4");
        box.classList.remove("w-1/5");
        box.querySelectorAll(".reserve-field").forEach(function (element) {
          element.classList.add("w-full");
          element.classList.remove("w-1/2");
        });
      });
    const flight_routes = document.querySelector(".flight-routes");
    const basisDateBox = document.querySelector(".Basis_Date_Box");
    if (flight_routes && basisDateBox) {
      const routeContainer = document.createElement("div");
      routeContainer.className = "route-container w-full";
      const routeContent = document.createElement("div");
      routeContent.className = "route-content w-full mb-4 relative";
      routeContent.setAttribute("data-index", "1");
      const titleDiv = document.createElement("div");
      titleDiv.className =
        "multi-route-tlt mb-2 text-textColor text-base w-auto";
      if (window.innerWidth < 1024) {
        titleDiv.innerHTML =
          '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons-mobile.svg#engine-multiroute-icon"></use></svg></span> الوجهة الأولى';
      } else {
        titleDiv.innerHTML =
          '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons.svg#engine-multiroute-icon"></use></svg></span> الوجهة الأولى';
      }
      const flexContainer = document.createElement("div");
      flexContainer.className =
        "route-content-inner w-full flex gap-2 max-xl:block max-xl:gap-0";
      const clonedflight_routes = flight_routes.cloneNode(true);
      const clonedBasisDate = basisDateBox.cloneNode(true);
      flexContainer.appendChild(clonedflight_routes);
      flexContainer.appendChild(clonedBasisDate);
      const deleteButton = document.createElement("div");
      deleteButton.className =
        "route-minus-btn text-xl pr-4 text-red-600 w-1/4 h-20 leading-[80px] max-xl:absolute max-xl:top-0 max-xl:left-0 max-xl:h-auto max-xl:leading-normal max-xl:text-base max-xl:text-left hover:text-primary hover:text-remove-route-hover-color";
      flexContainer.appendChild(deleteButton);
      routeContent.appendChild(titleDiv);
      routeContent.appendChild(flexContainer);
      routeContainer.appendChild(routeContent);
      flight_routes.parentNode.insertBefore(routeContainer, flight_routes);
      const secondRouteContent = routeContent.cloneNode(true);
      secondRouteContent.setAttribute("data-index", "2");
      if (window.innerWidth < 1024) {
        secondRouteContent.querySelector(".multi-route-tlt").innerHTML =
          '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons-mobile.svg#engine-multiroute-icon"></use></svg></span> الوجهة الثانية';
      } else {
        secondRouteContent.querySelector(".multi-route-tlt").innerHTML =
          '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons.svg#engine-multiroute-icon"></use></svg></span> الوجهة الثانية';
      }
      secondRouteContent
        .querySelector(".departure-route label")
        .setAttribute("for", "departuresecondroute");
      secondRouteContent
        .querySelector(".departure-route .departure")
        .setAttribute("id", "departuresecondroute");
      secondRouteContent
        .querySelector(".destination-route label")
        .setAttribute("for", "destinationsecondroute");
      secondRouteContent
        .querySelector(".destination-route .destination")
        .setAttribute("id", "destinationsecondroute");
      routeContainer.appendChild(secondRouteContent);
      flight_routes.remove();
      basisDateBox.remove();
    }
    const Flightclass_Passenger = document.querySelector(
      ".Flightclass-Passenger"
    );
    const search = document.querySelector(".reserve-search");
    if (Flightclass_Passenger && search) {
      search.classList.remove("w-auto");
      search.classList.add("w-1/4");
      const flexContainer = document.createElement("div");
      flexContainer.className =
        "multiroute-fields flex gap-2 w-full max-xl:block max-xl:gap-0";
      const clonedFlightclass_Passenger = Flightclass_Passenger.cloneNode(true);
      const clonedsearch = search.cloneNode(true);
      flexContainer.appendChild(clonedFlightclass_Passenger);
      flexContainer.appendChild(clonedsearch);
      Flightclass_Passenger.parentNode.insertBefore(
        flexContainer,
        Flightclass_Passenger
      );
      Flightclass_Passenger.remove();
      search.remove();
      const addRouteContainer = document.createElement("div");
      addRouteContainer.className =
        "Add-Remove reserve-field w-1/4 h-20 relative max-xl:w-full max-xl:mb-4 max-xl:h-auto max-xl:my-2 max-xl:text-center";
      addRouteContainer.setAttribute("data-key", "Add-Remove");
      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "h-full";
      const addRouteButton = document.createElement("button");
      addRouteButton.className =
        "add-routs w-1/2 h-full text-xl cursor-pointer text-primary hover:text-secondary bg-inherit hover:text-add-route-hover-color";
      addRouteButton.setAttribute("type", "button");
      addRouteButton.setAttribute("data-key", "add-routs");
      addRouteButton.setAttribute("onclick", "addMulticityRoute(this)");
      addRouteButton.innerHTML =
        '<span>أضف الوجهة</span><svg class="addroute-icon align-middle" width="15" height="11"><use xlink:href="images/sprite-icons.svg#engine-addroute-icon"></use></svg>';
      buttonWrapper.appendChild(addRouteButton);

      const removeAllRouteButton = document.createElement("button");
      removeAllRouteButton.className =
        "remove-routs w-1/2 h-full text-xl cursor-pointer text-primary hover:text-secondary bg-inherit deactive-removemc hover:text-remove-route-hover-color";
      removeAllRouteButton.setAttribute("type", "button");
      removeAllRouteButton.setAttribute("data-key", "remove-routs");
      removeAllRouteButton.setAttribute(
        "onclick",
        "removeAllMulticityRoute(this)"
      );
      removeAllRouteButton.innerHTML =
        '<span>إزالة الكل</span><svg class="removeall-icon align-middle" width="15" height="11"><use xlink:href="images/sprite-icons.svg#engine-removeall-icon"></use></svg>';
      buttonWrapper.appendChild(removeAllRouteButton);

      addRouteContainer.appendChild(buttonWrapper);
      const passengers_field = document.querySelector(".Flightclass-Passenger");
      if (passengers_field) {
        passengers_field.parentNode.insertBefore(
          addRouteContainer,
          passengers_field.nextSibling
        );
      }
    }
    if (window.innerWidth >= 1024) {
      document.querySelectorAll(".route-content").forEach(function (element) {
        element.classList.add("set_Date_Box");
      });
    }
    if (dynamicData) {
      reorderMulticityFields(dynamicData);
    }
    document
      .querySelectorAll(".multicity-flight-form .start_date")
      .forEach((input, index) => {
        input.id = `fromdatemulti${index + 1}`;
        input
          .closest(".departure-date")
          .querySelector("label")
          .setAttribute("for", `fromdatemulti${index + 1}`);
      });
    document
      .querySelectorAll(".multicity-flight-form .end_date")
      .forEach((input, index) => {
        input.id = `todatemulti${index + 1}`;
        input
          .closest(".return-date")
          .querySelector("label")
          .setAttribute("for", `todatemulti${index + 1}`);
      });
  }
  function hide_Multicity() {
    document
      .querySelector("#flightSearch")
      .classList.add("one-btb-flight-form");
    if (window.innerWidth < 1024) {
      document.querySelector("#flightSearch").classList.remove("flex", "gap-2");
      document.querySelector("#flightSearch").classList.add("block");
    } else {
      document.querySelector("#flightSearch").classList.add("flex", "gap-2");
    }
    document
      .querySelector("#flightSearch")
      .classList.remove("block", "multicity-flight-form");
    const elementToRemove = document.querySelector(".route-container");
    if (elementToRemove) {
      const parent = elementToRemove.parentNode;
      while (elementToRemove.firstChild) {
        parent.insertBefore(elementToRemove.firstChild, elementToRemove);
      }
      elementToRemove.remove();
    }
    const allElements = document.querySelectorAll(".route-content");
    if (allElements.length > 0) {
      const elementToKeep = allElements[0];
      allElements.forEach(function (element) {
        if (element !== elementToKeep) {
          element.remove();
        }
      });
    }
    document
      .querySelectorAll(".route-content")
      .forEach(function (elementToRemove) {
        const parent = elementToRemove.parentNode;
        while (elementToRemove.firstChild) {
          parent.insertBefore(elementToRemove.firstChild, elementToRemove);
        }
        elementToRemove.remove();
      });
    document
      .querySelectorAll(".route-content-inner")
      .forEach(function (elementToRemove) {
        const parent = elementToRemove.parentNode;
        while (elementToRemove.firstChild) {
          parent.insertBefore(elementToRemove.firstChild, elementToRemove);
        }
        elementToRemove.remove();
      });
    document
      .querySelectorAll(".multiroute-fields")
      .forEach(function (elementToRemove) {
        const parent = elementToRemove.parentNode;
        while (elementToRemove.firstChild) {
          parent.insertBefore(elementToRemove.firstChild, elementToRemove);
        }
        elementToRemove.remove();
      });
    document
      .querySelectorAll(".multi-route-tlt")
      .forEach(function (elementToRemove) {
        elementToRemove.remove();
      });
    document
      .querySelectorAll(".route-minus-btn")
      .forEach(function (elementToRemove) {
        elementToRemove.remove();
      });
    document.querySelector(".add-routs").closest(".reserve-field").remove();
    document.querySelectorAll(".return-date").forEach(function (element) {
      element.classList.remove("hidden");
    });
    const flightSearch = document.querySelector("#flightSearch");
    if (flightSearch) {
      if (window.innerWidth < 1024) {
        flightSearch.classList.remove("flex", "gap-2");
        flightSearch.classList.add("block");
      } else {
        flightSearch.classList.add("flex", "gap-2");
        flightSearch.classList.remove("block");
      }
    }
    document
      .querySelectorAll("#flightSearch .Basis_Date_Box")
      .forEach(function (box) {
        box.classList.remove("w-1/4");
        box.classList.add("w-1/5");
        box.querySelectorAll(".reserve-field").forEach(function (element) {
          element.classList.remove("w-1/5", "w-full");
          element.classList.add("w-1/2");
        });
      });
    document.querySelector(".reserve-search").classList.remove("w-1/4");
    document.querySelector(".reserve-search").classList.add("w-auto");
    document.querySelector(".flightclass-field").classList.remove("w-1/5");
    document.querySelector(".flightclass-field").classList.add("w-auto");
    if (dynamicData) {
      resetMulticityOrder(dynamicData);
    }
  }
  const destination_nth_txt = [
    "الوجهة الأولى",
    "الوجهة الثانية",
    "الوجهة الثالثة",
    "الوجهة الرابعة",
  ];
  function addMulticityRoute(t) {
    document
      .querySelector(".remove-routs")
      .classList.remove("deactive-removemc");
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
      const departure_label = newRoute.querySelector(".departure-route label");
      const departure_input = newRoute.querySelector(
        ".departure-route .departure"
      );
      if (departure_label) {
        departure_label.setAttribute("for", `departure${destinationText}`);
      }
      if (departure_input) {
        departure_input.setAttribute("id", `departure${destinationText}`);
      }
      const destination_label = newRoute.querySelector(
        ".destination-route label"
      );
      const destination_input = newRoute.querySelector(
        ".destination-route .destination"
      );
      if (destination_label) {
        destination_label.setAttribute("for", `destination${destinationText}`);
      }
      if (destination_input) {
        destination_input.setAttribute("id", `destination${destinationText}`);
      }
      if (window.innerWidth < 1024) {
        if (routeTitle)
          routeTitle.innerHTML =
            '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons-mobile.svg#engine-multiroute-icon"></use></svg></span> ' +
            destinationText;
      } else {
        if (routeTitle)
          routeTitle.innerHTML =
            '<span class="multiroute-tlt-icon ml-1 hidden"><svg class="align-middle" width="15" height="15"><use xlink:href="images/sprite-icons.svg#engine-multiroute-icon"></use></svg></span> ' +
            destinationText;
      }
      newRoute.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      newRoute
        .querySelector(".route-content-inner")
        .querySelector(".route-minus-btn").innerHTML =
        '<span>يزيل</span><svg class="removeroute-icon align-middle" width="15" height="11"><use xlink:href="images/sprite-icons.svg#engine-removeroute-icon"></use></svg>';
      newRoute
        .querySelector(".route-content-inner")
        .querySelector(".route-minus-btn")
        .setAttribute("onclick", "deleteMulticityRoute(this)");
      newRoute
        .querySelector(".route-content-inner")
        .querySelector(".route-minus-btn")
        .classList.add("cursor-pointer");
      const gregorianDate = newRoute.querySelector(".gregorian_date");
      if (gregorianDate) gregorianDate.remove();
      routeContainer.appendChild(newRoute);
      const newIndex = t
        .closest("form")
        .querySelector(".route-container")
        .querySelectorAll(".route-content").length;
      newRoute.setAttribute("data-index", newIndex);
      const previousRoute = newRoute.previousElementSibling;
      if (previousRoute) {
        const previousDestinationLocation = previousRoute.querySelector(
          ".destination-route .reserve-location"
        ).value;
        const previousDestinationLocationId = previousRoute.querySelector(
          ".destination-route .locationId"
        ).value;
        newRoute.querySelector(".departure-route .reserve-location").value =
          previousDestinationLocation;
        newRoute.querySelector(".departure-route .locationId").value =
          previousDestinationLocationId;
      }
      const fromdate_label = newRoute.querySelector(".departure-date label");
      const fromdate_input = newRoute.querySelector(
        ".departure-date .start_date"
      );
      if (fromdate_label) {
        fromdate_label.setAttribute("for", `fromdatemulti${destinationText}`);
      }
      if (fromdate_input) {
        fromdate_input.setAttribute("id", `fromdatemulti${destinationText}`);
      }

      const toate_label = newRoute.querySelector(".return-date label");
      const todate_input = newRoute.querySelector(".return-date .end_date");
      if (toate_label) {
        toate_label.setAttribute("for", `todatemulti${destinationText}`);
      }
      if (todate_input) {
        todate_input.setAttribute("id", `todatemulti${destinationText}`);
      }
    }
    checkButtonAddCity();
  }
  function removeAllMulticityRoute(t) {
    document.querySelectorAll(".route-content").forEach(function (route) {
      if (parseInt(route.getAttribute("data-index")) > 2) {
        route.remove();
      }
    });
    document.querySelector(".remove-routs").classList.add("deactive-removemc");
    if (
      document.querySelector(".add-routs").classList.contains("deactive-addmc")
    ) {
      document.querySelector(".add-routs").classList.remove("deactive-addmc");
    }
  }
  function deleteMulticityRoute(t) {
    if (document.querySelectorAll(".route-content").length < 4) {
      document
        .querySelector(".remove-routs")
        .classList.add("deactive-removemc");
    }
    t.closest(".route-content").remove();
    let index = 0;
    const routeContents = document
      .querySelector(".multicity-flight-form")
      .querySelector(".route-container")
      .querySelectorAll(".route-content");
    routeContents.forEach((route) => {
      route.querySelector(".multi-route-tlt").innerText =
        destination_nth_txt[index];
      index++;
      route.setAttribute("data-index", index);
    });
    checkButtonAddCity();
  }
  function checkButtonAddCity() {
    const routeContents = document
      .querySelector(".route-container")
      .querySelectorAll(".route-content");
    const addButton = document.getElementsByClassName("add-routs")[0];
    if (routeContents.length >= 4) {
      addButton.classList.add("deactive-addmc");
    } else {
      addButton.classList.remove("deactive-addmc");
    }
  }
  // end multiflight module scripts
}
if (hotel_module == "true") {
  // start hotel module scripts
  if (window.innerWidth <= 750) {
    const hotelSearch = document.getElementById("hotelSearch");
    hotelSearch.setAttribute("action", "/M_Hotel_Search.bc?lid=3");
  }
  document.querySelector(".hotel-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-hotel").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document.querySelector(".r-hotel").classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-hotel")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-hotel")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.add("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.add("hotel-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/hotel-search-bg.jpg" alt="hotel-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/hotel-search-bg.jpg" alt="hotel-search-bg">';
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

        if (typeDate) typeDate.textContent = "تاريخ المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
}
if (flighthotel_module == "true") {
  // start flighthotel module scripts
  if (window.innerWidth <= 750) {
    const flightHotelSearch = document.getElementById("flightHotelSearch");
    flightHotelSearch.setAttribute("action", "/M_FlightHotel_Search.bc?lid=3");
  }
  document
    .querySelector(".flighthotel-btn")
    .addEventListener("click", function () {
      document.querySelectorAll(".reserve-btn").forEach(function (btn) {
        btn.classList.remove("active-module");
      });
      this.classList.add("active-module");
      document.querySelectorAll(".module-form").forEach(function (form) {
        form.classList.add("hidden");
      });
      document.querySelector(".r-flighthotel").classList.remove("hidden");
      // add this code in mobile
      if (window.innerWidth < 1024) {
        if (hide_forms == "true") {
          document
            .querySelector(".r-flighthotel")
            .classList.add("visible-module-form");
          if (
            document
              .querySelector(".r-flighthotel")
              .classList.contains("invisible-module-form")
          ) {
            document
              .querySelector(".r-flighthotel")
              .classList.remove("invisible-module-form");
          }
        }
      }
      const topBannerResize = document.querySelector(
        ".module-banner-background"
      );
      if (topBannerResize) {
        if (
          !topBannerResize.classList.contains("flighthotel-banner-background")
        ) {
          topBannerResize.classList.add("flighthotel-banner-background");
        }
        if (topBannerResize.classList.contains("hotel-banner-background")) {
          topBannerResize.classList.remove("hotel-banner-background");
        }
        if (topBannerResize.classList.contains("flight-banner-background")) {
          topBannerResize.classList.remove("flight-banner-background");
        }
        if (topBannerResize.classList.contains("tour-banner-background")) {
          topBannerResize.classList.remove("tour-banner-background");
        }
        if (topBannerResize.classList.contains("insurance-banner-background")) {
          topBannerResize.classList.remove("insurance-banner-background");
        }
        if (topBannerResize.classList.contains("cip-banner-background")) {
          topBannerResize.classList.remove("cip-banner-background");
        }
        if (topBannerResize.classList.contains("visa-banner-background")) {
          topBannerResize.classList.remove("visa-banner-background");
        }
        if (topBannerResize.classList.contains("service-banner-background")) {
          topBannerResize.classList.remove("service-banner-background");
        }
        if (topBannerResize.classList.contains("train-banner-background")) {
          topBannerResize.classList.remove("train-banner-background");
        }
      }
      const topBannerImageResize = document.querySelector(
        ".module-banner-image"
      );
      if (topBannerImageResize) {
        if (
          !topBannerImageResize.classList.contains("flighthotel-banner-image")
        ) {
          topBannerImageResize.classList.add("flighthotel-banner-image");
        }
        const path = topBannerImageResize.getAttribute("data-img-path");
        if (path) {
          topBannerImageResize.innerHTML = `<img src="${path}/images/flighthotel-search-bg.jpg" alt="flighthotel-search-bg">`;
        } else {
          topBannerImageResize.innerHTML =
            '<img src="images/flighthotel-search-bg.jpg" alt="flighthotel-search-bg">';
        }
        if (topBannerImageResize.classList.contains("hotel-banner-image")) {
          topBannerImageResize.classList.remove("hotel-banner-image");
        }
        if (topBannerImageResize.classList.contains("flight-banner-image")) {
          topBannerImageResize.classList.remove("flight-banner-image");
        }
        if (topBannerImageResize.classList.contains("tour-banner-image")) {
          topBannerImageResize.classList.remove("tour-banner-image");
        }
        if (topBannerImageResize.classList.contains("insurance-banner-image")) {
          topBannerImageResize.classList.remove("insurance-banner-image");
        }
        if (topBannerImageResize.classList.contains("cip-banner-image")) {
          topBannerImageResize.classList.remove("cip-banner-image");
        }
        if (topBannerImageResize.classList.contains("visa-banner-image")) {
          topBannerImageResize.classList.remove("visa-banner-image");
        }
        if (topBannerImageResize.classList.contains("service-banner-image")) {
          topBannerImageResize.classList.remove("service-banner-image");
        }
        if (topBannerImageResize.classList.contains("train-banner-image")) {
          topBannerImageResize.classList.remove("train-banner-image");
        }
      }
      //simple-calendar
      if (calendar_type == "simple-calendar") {
        const dateInfoSelected = document.querySelector(".date_info_selected");
        if (dateInfoSelected) {
          const typeDate = dateInfoSelected.querySelector(".type_date");
          const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
          const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

          if (typeDate) typeDate.textContent = "تاريخ المغادرة :";
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
      document
        .querySelector(".Wrapper-ExteraHoteldate")
        .classList.remove("hidden");
      document.querySelector(".checkout").setAttribute("required", true);
      document.querySelector(".checkin").setAttribute("required", true);
    } else {
      t.value = 0;
      document
        .querySelector(".Wrapper-ExteraHoteldate")
        .classList.add("hidden");
      document.querySelector(".checkout").setAttribute("required", false);
      document.querySelector(".checkin").setAttribute("required", false);
      document.querySelector(".checkout").value = "";
      document.querySelector(".checkin").value = "";
    }
  }
}
if (tour_module == "true") {
  // start tour module scripts
  if (window.innerWidth <= 750) {
    const tourSearch = document.getElementById("tourSearch");
    tourSearch.setAttribute("action", "/M_Tour_Search.bc?lid=3");
  }
  document.querySelector(".tour-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-tour").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document.querySelector(".r-tour").classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-tour")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-tour")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.add("tour-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.add("tour-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/tour-search-bg.jpg" alt="tour-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/tour-search-bg.jpg" alt="tour-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

        if (typeDate) typeDate.textContent = "تاريخ المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
  document
    .querySelector("#tourSearch .reserve-location")
    .addEventListener("keyup", function () {
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
if (
  hotel_module == "true" ||
  flighthotel_module == "true" ||
  tour_module == "true"
) {
  function Change_Room_Count(t) {
    let e = parseInt(t.closest("ul").querySelector(".roomcount").value);
    let n = t.textContent.indexOf("+") > -1 ? e + 1 : e > 0 ? e - 1 : 0;
    if (n >= 1 && n < 5) {
      t.closest("ul").querySelector(".roomcount").value = n;
      if (e < n) {
        let s = n;
        const roomsContainer = t.closest("form").querySelector(".Rooms");
        const adult_count = t
          .closest(".reserve-field")
          .querySelector(".adult-count .count").textContent;
        const child_count = t
          .closest(".reserve-field")
          .querySelector(".child-count .count").textContent;
        const sum_passenger = parseInt(adult_count) + parseInt(child_count);
        let number_diff = 9 - parseInt(sum_passenger);
        if (
          number_diff >= 2 ||
          t.closest("form").getAttribute("id") == "hotelSearch"
        ) {
          new_adult = 2;
        } else {
          new_adult = number_diff;
        }
        let newRoom = document.createElement("div");
        newRoom.className = "contentRoom";
        newRoom.innerHTML = `
          <div class="numberOfRoom text-sm text-primary float-right clear-both w-1/2 mb-4 text-right">غرفة ${s}</div>
          <div class="deleteRoom text-sm warningColor-100 float-left w-1/2 mb-4 text-left cursor-pointer hover:text-remove-room-hover-color" onclick="remove_Room(this)">يزيل الغرفة</div>
            <div class="passenger-item adult-passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-adultcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>البالغ</span><span class="exp-age text-grays-400 mr-2">(12 سنة فما فوق)</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="plus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span class="count-icon-simple">+</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-plus-icon"></use></svg></span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-adultcount${s}" type="text" class="adultcount w-full text-center" name="_root.rooms__${s}.adultcount" maxlength="4000" value=${new_adult} readonly>
                </li>
                <li class="minus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span class="count-icon-simple">-</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-minus-icon"></use></svg></span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <div class="passenger-item child-passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-childcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>الطفل</span><span class="exp-age text-grays-400 mr-2">(0 إلى 12 سنة)</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="plus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span class="count-icon-simple">+</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-plus-icon"></use></svg></span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-childcount${s}" type="text" class="childcount w-full text-center" maxlength="4000" value="0" readonly>
                </li>
                <li class="minus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span class="count-icon-simple">-</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-minus-icon"></use></svg></span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <input type="hidden" name="_root.rooms__${s}.childcountandage" class="childcountandage" />
            <div class="section-select-age clear-both"></div>
        `;
        roomsContainer.appendChild(newRoom);
        const adult_cont_new = newRoom.querySelector(".adultcount").value;
        const sum_passenger_second =
          parseInt(sum_passenger) + parseInt(adult_cont_new);
        if (
          sum_passenger_second >= 8 &&
          newRoom.closest("form").getAttribute("id") !== "hotelSearch"
        ) {
          if (
            newRoom.closest(".passengerbox").querySelector(".second-room-type")
          ) {
            newRoom
              .closest(".passengerbox")
              .querySelector(".second-room-type")
              .classList.add("disable-button");
          }
          newRoom
            .closest(".passengerbox")
            .querySelectorAll(".plus-count")
            .forEach((btn) => {
              btn.classList.add("disable-button");
            });
        }
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
  function Add_Room_Count(t) {
    let e = parseInt(t.closest("ul").querySelector(".roomcount").value);
    let n = e + 1;
    if (n >= 1 && n < 5) {
      t.closest("ul").querySelector(".roomcount").value = n;
      if (e < n) {
        let s = n;
        const roomsContainer = t.closest("form").querySelector(".Rooms");
        const adult_count = t
          .closest(".reserve-field")
          .querySelector(".adult-count .count").textContent;
        const child_count = t
          .closest(".reserve-field")
          .querySelector(".child-count .count").textContent;
        const sum_passenger = parseInt(adult_count) + parseInt(child_count);
        let number_diff = 9 - parseInt(sum_passenger);
        if (
          number_diff >= 2 ||
          t.closest("form").getAttribute("id") == "hotelSearch"
        ) {
          new_adult = 2;
        } else {
          new_adult = number_diff;
        }
        let newRoom = document.createElement("div");
        newRoom.className = "contentRoom";
        newRoom.innerHTML = `
          <div class="numberOfRoom text-sm text-primary float-right clear-both w-1/2 mb-4 text-right">غرفة ${s}</div>
          <div class="deleteRoom text-sm warningColor-100 float-left w-1/2 mb-4 text-left cursor-pointer hover:text-remove-room-hover-color" onclick="remove_Room(this)">يزيل الغرفة</div>
            <div class="passenger-item adult-passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-adultcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>البالغ</span><span class="exp-age text-grays-400 mr-2">(12 سنة فما فوق)</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="plus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span class="count-icon-simple">+</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-plus-icon"></use></svg></span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-adultcount${s}" type="text" class="adultcount w-full text-center" name="_root.rooms__${s}.adultcount" maxlength="4000" value=${new_adult} readonly>
                </li>
                <li class="minus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_AdultCount(this)">
                    <span class="count-icon-simple">-</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-minus-icon"></use></svg></span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <div class="passenger-item child-passenger-item clear-both w-full mb-4 relative">
              <label for="passenger-room-childcount${s}" class="float-right text-sm leading-8 text-textColor">
                <span>الطفل</span><span class="exp-age text-grays-400 mr-2">(0 إلى 12 سنة)</span>
              </label>
              <ul class="float-left h-8 leading-8">
                <li class="plus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span class="count-icon-simple">+</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-plus-icon"></use></svg></span>
                  </div>
                </li>
                <li class="inline-block w-8 h-8 leading-8 text-center hover:text-primary">
                  <input id="passenger-room-childcount${s}" type="text" class="childcount w-full text-center" maxlength="4000" value="0" readonly>
                </li>
                <li class="minus-count inline-block w-8 h-8 leading-8 text-center hover:text-primary radius-type-1 border-type-1 cursor-pointer">
                  <div class="h-full leading-8" onclick="Change_ChildCount(this)">
                    <span class="count-icon-simple">-</span><span class="count-icon-svg hidden"><svg class="align-middle" width="10" height="10"><use xlink:href="images/sprite-icons.svg#engine-minus-icon"></use></svg></span>
                  </div>
                </li>
              </ul>
              <div class="clr"></div>
            </div>
            <input type="hidden" name="_root.rooms__${s}.childcountandage" class="childcountandage" />
            <div class="section-select-age clear-both"></div>
        `;
        roomsContainer.appendChild(newRoom);
        const adult_cont_new = newRoom.querySelector(".adultcount").value;
        const sum_passenger_second =
          parseInt(sum_passenger) + parseInt(adult_cont_new);
        if (
          sum_passenger_second >= 8 &&
          newRoom.closest("form").getAttribute("id") !== "hotelSearch"
        ) {
          if (
            newRoom.closest(".passengerbox").querySelector(".second-room-type")
          ) {
            newRoom
              .closest(".passengerbox")
              .querySelector(".second-room-type")
              .classList.add("disable-button");
          }
          newRoom
            .closest(".passengerbox")
            .querySelectorAll(".plus-count")
            .forEach((btn) => {
              btn.classList.add("disable-button");
            });
        }
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
  function remove_Room(e) {
    let room = e.closest(".contentRoom");
    let t = e.closest(".Rooms");
    let k = e.closest(".reserve-field");
    let count = 1;
    room.remove();
    let roomsContainer = document.querySelector(".Rooms");
    let rooms = roomsContainer.querySelectorAll(".contentRoom");
    rooms.forEach((room, index) => {
      room.querySelector(".numberOfRoom").textContent = `غرفة${index + 1}`;
      room
        .querySelector("input.adultcount")
        .setAttribute("name", `_root.rooms__${index + 1}.adultcount`);
      room
        .querySelector("input.childcount")
        .setAttribute("name", `_root.rooms__${index + 1}.childcount`);
      room
        .querySelector("input.childcountandage")
        .setAttribute("name", `_root.rooms__${index + 1}.childcountandage`);
      count = index + 1;
    });
    t
      .closest(".passengers-field")
      .querySelector(".room-count .count").textContent = count;
    t.closest(".passengers-field").querySelector(".roomcount ").value = count;
    Sum_AdultCount(t);
    Sum_ChildCount(t);
    const adult_count = k.querySelector(".adult-count .count").textContent;
    const child_count = k.querySelector(".child-count .count").textContent;
    const sum_passenger = parseInt(adult_count) + parseInt(child_count);
    if (sum_passenger < 9) {
      k.querySelectorAll(".plus-count").forEach((btn) => {
        if (btn.classList.contains("disable-button")) {
          btn.classList.remove("disable-button");
        }
      });
    }
  }
  function destroyRoomDropdown(container, count) {
    if (count < 1) return;
    const roomToRemove = container.querySelector(
      `div.contentRoom:nth-child(${count + 1})`
    );
    if (roomToRemove) roomToRemove.remove();

    let adult_count = 0;
    let child_count = 0;
    container.querySelectorAll(".adultcount").forEach((adult) => {
      adult_count += parseInt(adult.value) || 0;
    });
    container.querySelectorAll(".childcount").forEach((child) => {
      child_count += parseInt(child.value) || 0;
    });
    const sum_passenger = parseInt(adult_count) + parseInt(child_count);
    if (sum_passenger < 9) {
      container
        .closest(".passengerbox")
        .querySelectorAll(".plus-count")
        .forEach((btn) => {
          if (btn.classList.contains("disable-button")) {
            btn.classList.remove("disable-button");
          }
        });
    }
  }
  function Change_AdultCount(t) {
    const button = t.querySelector("span");
    const adultCountInput = button.closest("ul").querySelector(".adultcount");
    const currentValue = parseInt(adultCountInput.value);
    const updatedValue =
      button.textContent.indexOf("+") > -1
        ? currentValue + 1
        : currentValue > 0
        ? currentValue - 1
        : 0;
    if (updatedValue < 10 || updatedValue >= 1) {
      adultCountInput.value = updatedValue;
      Sum_AdultCount(button);
    }
    Check_Passenger_Count(t);
  }
  function Sum_AdultCount(t) {
    let totalAdults = 0;
    const form = t.closest("form");
    form.querySelectorAll(".contentRoom").forEach((room) => {
      const adultCountInput = room.querySelector(".adultcount");
      totalAdults += parseInt(adultCountInput.value) || 0;
    });
    form.querySelector(".passenger-counts").style.display = "inline-block";
    form.querySelector(".adult-count .count").textContent = totalAdults;
  }
  function Change_ChildCount(t) {
    const ordinalWords = ["الأول", "الثاني", "الثالث", "الرابع"];
    const span = t.querySelector("span");
    const room = t.closest(".contentRoom");
    const childCountInput = t.closest("ul").querySelector(".childcount");
    const currentCount = parseInt(childCountInput.value);
    const updatedCount =
      span.textContent.indexOf("+") > -1
        ? currentCount + 1
        : currentCount > 0
        ? currentCount - 1
        : 0;

    if (updatedCount < 5) {
      childCountInput.value = updatedCount;

      if (currentCount < updatedCount) {
        const sectionSelectAge = room.querySelector(".section-select-age");
        sectionSelectAge.innerHTML = ""; // Clear the section

        for (let i = 1; i <= updatedCount; i++) {
          const e = document.createElement("div");
          e.className =
            "createChildDropdown mb-4 w-full float-right clear-both";
          e.innerHTML = `
            <label for="select-age${i}" class="float-right text-sm leading-8 text-textColor">عمر الطفل ${
            ordinalWords[i - 1] || i
          }</label>
            <select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2" id="select-age${i}">
              <option value="1">إلى سنة واحدة</option>
              <option value="2">1 إلى 2</option>
              <option value="3">2 إلى 3</option>
              <option value="4">3 إلى 4</option>
              <option value="5">4 إلى 5</option>
              <option value="6">5 إلى 6</option>
              <option value="7">6 إلى 7</option>
              <option value="8">7 إلى 8</option>
              <option value="9">8 إلى 9</option>
              <option value="10">9 إلى 10</option>
              <option value="11">10 إلى 11</option>
              <option value="12">11 إلى 12</option>
            </select>`;
          sectionSelectAge.appendChild(e);
        }
      } else if (currentCount > updatedCount) {
        const childDropdownsContainer = span
          .closest(".contentRoom")
          .querySelector(".section-select-age");
        destroyChildDropdown(childDropdownsContainer, updatedCount);
      }
    }
    Sum_ChildCount(t);
    Check_Passenger_Count(t);
  }
  function Sum_ChildCount(t) {
    let totalChildren = 0;

    const form = t.closest("form");
    form.querySelectorAll(".contentRoom").forEach((room) => {
      const childCountInput = room.querySelector(".childcount");
      totalChildren += parseInt(childCountInput.value) || 0;
    });
    if (
      form.querySelector(".child-count").classList.contains("hidden") &&
      totalChildren > 0
    ) {
      form.querySelector(".child-count").classList.remove("hidden");
    } else if (
      !form.querySelector(".child-count").classList.contains("hidden") &&
      totalChildren == 0
    ) {
      form.querySelector(".child-count").classList.add("hidden");
    }
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
if (calendar_type == "simple-calendar") {
  // start simple calendar scripts
  function openNextCal(t) {
    const activeModule = document.querySelector(
      ".reservation-item > li.active-module"
    );
    if (!activeModule) return;
    const dataId = activeModule.getAttribute("data-id");
    if (dataId == "r-flighthotel") {
      const extraHotelDateWrapper = document.querySelector(
        ".Wrapper-ExteraHoteldate"
      );

      if (
        extraHotelDateWrapper &&
        !extraHotelDateWrapper.classList.contains("hidden")
      ) {
        const checkinInput = extraHotelDateWrapper.querySelector(".checkin");
        const nextCalOpeningEx =
          extraHotelDateWrapper.querySelector(".nextCalOpeningex");

        if (
          checkinInput &&
          checkinInput.value !== "" &&
          nextCalOpeningEx &&
          nextCalOpeningEx.value == ""
        ) {
          nextCalOpeningEx.click();
        }
      } else {
        const returnDateInput = document.querySelector(
          `.${dataId} .nextCalOpening`
        );
        if (returnDateInput && returnDateInput.value == "") {
          returnDateInput.click();
        }
      }
    } else {
      const nextCalOpening = document.querySelector(
        `.${dataId} .nextCalOpening`
      );
      if (nextCalOpening) {
        nextCalOpening.click();
      }
    }
  }
  // end simple calendar scripts
}
if (insurance_module == "true") {
  // start insurance module scripts
  if (window.innerWidth <= 750) {
    const insuranceSearch = document.getElementById("insuranceSearch");
    insuranceSearch.setAttribute("action", "/M_Insurance_Search.bc?lid=3");
  }
  document
    .querySelector(".insurance-btn")
    .addEventListener("click", function () {
      document.querySelectorAll(".reserve-btn").forEach(function (btn) {
        btn.classList.remove("active-module");
      });
      this.classList.add("active-module");
      document.querySelectorAll(".module-form").forEach(function (form) {
        form.classList.add("hidden");
      });
      document.querySelector(".r-insurance").classList.remove("hidden");
      // add this code in mobile
      if (window.innerWidth < 1024) {
        if (hide_forms == "true") {
          document
            .querySelector(".r-insurance")
            .classList.add("visible-module-form");
          if (
            document
              .querySelector(".r-insurance")
              .classList.contains("invisible-module-form")
          ) {
            document
              .querySelector(".r-insurance")
              .classList.remove("invisible-module-form");
          }
        }
      }
      const topBannerResize = document.querySelector(
        ".module-banner-background"
      );
      if (topBannerResize) {
        if (
          !topBannerResize.classList.contains("insurance-banner-background")
        ) {
          topBannerResize.classList.add("insurance-banner-background");
        }
        if (topBannerResize.classList.contains("hotel-banner-background")) {
          topBannerResize.classList.remove("hotel-banner-background");
        }
        if (
          topBannerResize.classList.contains("flighthotel-banner-background")
        ) {
          topBannerResize.classList.remove("flighthotel-banner-background");
        }
        if (topBannerResize.classList.contains("tour-banner-background")) {
          topBannerResize.classList.remove("tour-banner-background");
        }
        if (topBannerResize.classList.contains("flight-banner-background")) {
          topBannerResize.classList.remove("flight-banner-background");
        }
        if (topBannerResize.classList.contains("cip-banner-background")) {
          topBannerResize.classList.remove("cip-banner-background");
        }
        if (topBannerResize.classList.contains("visa-banner-background")) {
          topBannerResize.classList.remove("visa-banner-background");
        }
        if (topBannerResize.classList.contains("service-banner-background")) {
          topBannerResize.classList.remove("service-banner-background");
        }
        if (topBannerResize.classList.contains("train-banner-background")) {
          topBannerResize.classList.remove("train-banner-background");
        }
      }
      const topBannerImageResize = document.querySelector(
        ".module-banner-image"
      );
      if (topBannerImageResize) {
        if (
          !topBannerImageResize.classList.contains("insurance-banner-image")
        ) {
          topBannerImageResize.classList.add("insurance-banner-image");
        }
        const path = topBannerImageResize.getAttribute("data-img-path");
        if (path) {
          topBannerImageResize.innerHTML = `<img src="${path}/images/insurance-search-bg.jpg" alt="insurance-search-bg">`;
        } else {
          topBannerImageResize.innerHTML =
            '<img src="images/insurance-search-bg.jpg" alt="insurance-search-bg">';
        }
        if (topBannerImageResize.classList.contains("hotel-banner-image")) {
          topBannerImageResize.classList.remove("hotel-banner-image");
        }
        if (
          topBannerImageResize.classList.contains("flighthotel-banner-image")
        ) {
          topBannerImageResize.classList.remove("flighthotel-banner-image");
        }
        if (topBannerImageResize.classList.contains("tour-banner-image")) {
          topBannerImageResize.classList.remove("tour-banner-image");
        }
        if (topBannerImageResize.classList.contains("flight-banner-image")) {
          topBannerImageResize.classList.remove("flight-banner-image");
        }
        if (topBannerImageResize.classList.contains("cip-banner-image")) {
          topBannerImageResize.classList.remove("cip-banner-image");
        }
        if (topBannerImageResize.classList.contains("visa-banner-image")) {
          topBannerImageResize.classList.remove("visa-banner-image");
        }
        if (topBannerImageResize.classList.contains("service-banner-image")) {
          topBannerImageResize.classList.remove("service-banner-image");
        }
        if (topBannerImageResize.classList.contains("train-banner-image")) {
          topBannerImageResize.classList.remove("train-banner-image");
        }
      }
    });
  function Change_passenger_insurance(t) {
    const nextInput = t.closest("ul").querySelector(".passengercount");
    let e = parseInt(nextInput.value);
    let i = t.textContent.indexOf("+") > -1 ? e + 1 : e > 0 ? e - 1 : 0;
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
      const countPassengerElement = field
        .querySelector(".passenger-count")
        .querySelector(".count");
      if (countPassengerElement) {
        countPassengerElement.textContent = i;
      }
    }
    reinitializeDropdowns();
  }
  function createPassengerDropdown(t) {
    const ordinalWords = [
      "الأول",
      "الثاني",
      "الثالث",
      "الرابع",
      "الخامس",
      "السادس",
      "السابع",
      "الثامن",
      "التاسع",
      "العاشر",
    ];
    const e = document.createElement("div");
    e.className = "createPassengerDropdown mb-4 w-full float-right clear-both";
    const label = document.createElement("label");
    label.className = "float-right text-sm leading-8 text-textColor";
    label.setAttribute("for", "passenger-birthday" + t);
    label.textContent = "تاريخ ميلاد الراكب " + (ordinalWords[t - 1] || t);
    e.appendChild(label);
    const div2 = document.createElement("div");
    div2.className = "birthdate-dates clear-both flex gap-2";
    const passenger_bithdate = document.createElement("input");
    passenger_bithdate.type = "hidden";
    passenger_bithdate.className = "passenger-bithdate";
    e.appendChild(passenger_bithdate);

    const div3 = document.createElement("div");
    div3.className = "birthdate-day relative";
    const input_day = document.createElement("input");
    input_day.className =
      "birthdate-day-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_day.maxLength = 2;
    input_day.placeholder = "يوم";
    input_day.addEventListener("click", reinitializeDropdowns);
    div3.appendChild(input_day);
    div2.appendChild(div3);

    const div4 = document.createElement("div");
    div4.className = "birthdate-month relative";
    const input_month = document.createElement("input");
    input_month.className =
      "birthdate-month-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_month.placeholder = "شهر";
    input_month.addEventListener("click", reinitializeDropdowns);
    div4.appendChild(input_month);
    div2.appendChild(div4);

    const div5 = document.createElement("div");
    div5.className = "birthdate-year relative";
    const input_year = document.createElement("input");
    input_year.className =
      "birthdate-year-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200";
    input_year.placeholder = "سنة";
    input_year.addEventListener("click", reinitializeDropdowns);
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
  const solarMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const gregorianMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // ایجاد Dropdown
  let ulElement;
  // پاکسازی و ریست کردن ورودی تاریخ
  function clearDateInputs() {
    const dateInputs = document.querySelectorAll(
      ".birthdate-day-value, .birthdate-month-value, .birthdate-year-value"
    );
    dateInputs.forEach((input) => (input.value = ""));
    document
      .querySelectorAll(".passenger-bithdate")
      .forEach((input) => (input.value = ""));
  }
  function createDropdown(items, input) {
    if (ulElement) ulElement.remove();
    ulElement = document.createElement("ul");
    ulElement.classList.add("passenger-birthday-dropdown");
    ulElement.style.width = `${input.offsetWidth}px`;
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => {
        input.value = item;
        ulElement.style.display = "none";
        setupBirthdateUpdate();
      });
      li.addEventListener("mouseover", () => {
        li.style.backgroundColor = "#f0f0f0";
      });
      li.addEventListener("mouseout", () => {
        li.style.backgroundColor = "#fff";
      });
      ulElement.appendChild(li);
    });
    document.body.appendChild(ulElement);
    const rect = input.getBoundingClientRect();
    ulElement.style.top = `${rect.bottom + window.scrollY}px`;
    ulElement.style.left = `${rect.left + window.scrollX}px`;
    ulElement.style.display = "block";
  }
  // بستن دراپ داون
  function closeDropdown() {
    if (ulElement) ulElement.style.display = "none";
  }
  // تنظیم Dropdown و لیست آیتم‌ها
  function setupDropdown(inputSelector, items, type) {
    const inputElements = document.querySelectorAll(inputSelector);
    inputElements.forEach((input) => {
      input.addEventListener("click", (event) => {
        createDropdown(items, input);
        event.stopPropagation();
      });
      // فیلتر گزینه‌ها هنگام تایپ
      input.addEventListener("input", () => {
        const filterText = input.value.trim().toLowerCase();
        const filteredItems = items.filter((item, index) => {
          // فیلتر هم بر اساس نام و هم شماره ماه
          if (type === "month") {
            return (
              item.toLowerCase().includes(filterText) ||
              (index + 1).toString().includes(filterText)
            );
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
    const years = Array.from({ length: 2025 - 1925 + 1 }, (_, i) =>
      isSolarCalendar ? (1925 + i - 621).toString() : (1925 + i).toString()
    );
    setupDropdown(".birthdate-day-value", days, "day");
    setupDropdown(".birthdate-month-value", months, "month");
    setupDropdown(".birthdate-year-value", years, "year");
  }
  // تغییر تقویم با کلیک دکمه
  document.querySelector(".toggle-calendar").addEventListener("click", () => {
    isSolarCalendar = !isSolarCalendar;
    document.querySelector(".toggle-calendar").textContent = isSolarCalendar
      ? "التحويل إلى التقويم الميلادي"
      : "تحويل إلى التقويم الشمسي";
    if (
      document.querySelector(".toggle-calendar").getAttribute("data-active") !=
      1
    ) {
      clearDateInputs();
    }
    reinitializeDropdowns();
    document.querySelector(".toggle-calendar").setAttribute("data-active", 0);
  });

  // بسته شدن دراپ‌داون در کلیک بیرون
  document.addEventListener("click", (event) => {
    if (ulElement && !ulElement.contains(event.target)) {
      closeDropdown();
    }
  });
  // مقداردهی اولیه دراپ‌دان‌ها
  reinitializeDropdowns();
  //passenger-bithdate///////////////////////////////////////////////////////////////////////////
  function updateHiddenBirthdateInput(container) {
    const dayInput = container.querySelector(".birthdate-day-value");
    const monthInput = container.querySelector(".birthdate-month-value");
    const yearInput = container.querySelector(".birthdate-year-value");
    const hiddenInput = container.querySelector(".passenger-bithdate");
    if (!dayInput || !monthInput || !yearInput || !hiddenInput) return;
    const day = dayInput.value.trim().padStart(2, "0");
    const month = (
      isSolarCalendar
        ? solarMonths.indexOf(monthInput.value.trim()) + 1
        : gregorianMonths.indexOf(monthInput.value.trim()) + 1
    )
      .toString()
      .padStart(2, "0");
    const year = yearInput.value.trim();
    // بررسی اینکه تمام مقادیر کامل باشند
    if (day && month && year && day !== "00" && month !== "00") {
      hiddenInput.value = `${year}-${month}-${day}`;
      let container = dayInput.closest(".createPassengerDropdown");
      if (year.toString().length > 3) {
        check_valid_date(day, month, year, container);
      }
    } else {
      hiddenInput.value = "";
    }
  }

  function setupBirthdateUpdate() {
    document
      .querySelectorAll(".createPassengerDropdown")
      .forEach((container) => {
        const inputs = container.querySelectorAll(
          ".birthdate-day-value, .birthdate-month-value, .birthdate-year-value"
        );

        inputs.forEach((input) => {
          // تغییر مقدار به محض وارد کردن یا تغییر هر فیلد
          updateHiddenBirthdateInput(container);
          input.addEventListener("input", () => {
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
      showErrorMessage(container, "التاريخ المدخل غير صالح.");
      container.querySelector(".birthdate-day-value").value = "";
      container.querySelector(".birthdate-month-value").value = "";
      container.querySelector(".birthdate-year-value").value = "";
      container.querySelector(".passenger-bithdate").value = "";
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
    1301, 1305, 1309, 1313, 1317, 1322, 1326, 1330, 1334, 1338, 1342, 1346,
    1350, 1355, 1359, 1363, 1367, 1371, 1375, 1379, 1383, 1387, 1391, 1395,
    1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1437, 1441, 1445,
    1449, 1453, 1457, 1461, 1465, 1469, 1473, 1478, 1482, 1486, 1490, 1494,
    1498,
  ];

  function getGregorianMonthDays(month, year) {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return month === 2 && isGregorianLeapYear(year) ? 29 : monthDays[month - 1];
  }

  function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function showErrorMessage(container, message) {
    let errorElement = container.querySelector(".birthdate-error-message");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "birthdate-error-message";
      container.appendChild(errorElement);
    }

    errorElement.textContent = message;
  }

  function removeErrorMessage(container) {
    const errorElement = container.querySelector(".birthdate-error-message");
    if (errorElement) {
      container.removeChild(errorElement);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
}
if (cip_module == "true") {
  // start cip module scripts
  if (window.innerWidth <= 750) {
    const cipSearch = document.getElementById("cipSearch");
    cipSearch.setAttribute("action", "/M_Cip_Search.bc?lid=3");
  }
  document.querySelector(".cip-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-cip").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document.querySelector(".r-cip").classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-cip")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-cip")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.add("cip-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.add("cip-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/cip-search-bg.jpg" alt="cip-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/cip-search-bg.jpg" alt="cip-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
        if (typeDate) typeDate.textContent = "تاريخ الوصول أو المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
  function show_traveltype(e) {
    const element = e.closest(".reserve-field").querySelector(".hidden-box");
    if (element) {
      if (window.innerWidth > 1024) {
        if (element.classList.contains("hidden")) {
          element.classList.remove("hidden");
          element.style.opacity = 0;
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              element.style.opacity = 1;
            });
          });
          // add this code in mobile
          if (window.innerWidth < 1024) {
            element.classList.add("fixed-traveltype");
            document.querySelector("body").classList.add("overflow-hidden");
          }
        } else {
          element.style.opacity = 0;
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.toggle("hidden");
        // add this code in mobile
        if (window.innerWidth < 1024) {
          element.classList.add("fixed-traveltype");
          document.querySelector("body").classList.add("overflow-hidden");
        }
      }
    }
    const icon = e.closest(".reserve-field").querySelector(".down-icon");
    if (icon) {
      icon.classList.toggle("rotate");
    }
  }
  function select_traveltype(e) {
    e.closest(".traveltype")
      .querySelectorAll("li")
      .forEach(function (li) {
        if (li.classList.contains("active-TravelType")) {
          li.classList.remove("active-TravelType");
        }
      });
    e.classList.add("active-TravelType");
    var dataValue = e.getAttribute("data-value");
    var dataText = e.textContent;
    var valueInput = e
      .closest(".reserve-field")
      .querySelector(".traveltype-value");
    if (valueInput) {
      valueInput.value = dataValue;
    }
    var textElement = e
      .closest(".reserve-field")
      .querySelector(".traveltype-text");
    if (textElement) {
      textElement.textContent = dataText;
    }
    e.closest(".reserve-field")
      .querySelector(".hidden-box")
      .classList.add("hidden");

    let classBox = e.closest(".reserve-field");
    if (classBox) {
      let nextDiv = classBox.nextElementSibling;
      if (nextDiv && nextDiv.classList.contains("reserve-field")) {
        let hiddenBox = nextDiv.querySelector(".hidden-box");
        if (hiddenBox) {
          setTimeout(() => {
            if (window.innerWidth > 1024) {
              hiddenBox.classList.remove("hidden");
              hiddenBox.style.opacity = 0;
              hiddenBox.style.transition = "opacity 0.7s";
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  hiddenBox.style.opacity = 1;
                });
              });
            } else {
              hiddenBox.classList.remove("hidden");
              hiddenBox.classList.add("fixed-flighttype");
              document.querySelector("body").classList.add("overflow-hidden");
            }
          }, 50);
        }
      }
    }
    if (document.querySelector("body").classList.contains("overflow-hidden")) {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
  // add this function in mobile
  function close_traveltype(t) {
    if (window.innerWidth > 1024) {
      t.closest(".traveltype").style.opacity = 0;
      t.closest(".traveltype").addEventListener(
        "transitionend",
        () => {
          t.closest(".traveltype").classList.remove("fixed-traveltype");
          if (
            document.querySelector("body").classList.contains("overflow-hidden")
          ) {
            document.querySelector("body").classList.remove("overflow-hidden");
          }
          t.closest(".traveltype").classList.add("hidden");
        },
        { once: true }
      );
    } else {
      t.closest(".traveltype").classList.remove("fixed-traveltype");
      if (
        document.querySelector("body").classList.contains("overflow-hidden")
      ) {
        document.querySelector("body").classList.remove("overflow-hidden");
      }
      t.closest(".traveltype").classList.add("hidden");
    }
  }
  function show_flighttype(e) {
    const element = e.closest(".reserve-field").querySelector(".hidden-box");
    if (element) {
      if (window.innerWidth > 1024) {
        if (element.classList.contains("hidden")) {
          element.classList.remove("hidden");
          element.style.opacity = 0;
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              element.style.opacity = 1;
            });
          });
          // add this code in mobile
          if (window.innerWidth < 1024) {
            element.classList.add("fixed-flighttype");
            document.querySelector("body").classList.add("overflow-hidden");
          }
        } else {
          element.style.opacity = 0;
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.toggle("hidden");
        // add this code in mobile
        if (window.innerWidth < 1024) {
          element.classList.add("fixed-flighttype");
          document.querySelector("body").classList.add("overflow-hidden");
        }
      }
    }
    const icon = e.closest(".reserve-field").querySelector(".down-icon");
    if (icon) {
      icon.classList.toggle("rotate");
    }
  }
  function select_flighttype(e) {
    e.closest(".flighttype")
      .querySelectorAll("li")
      .forEach(function (li) {
        if (li.classList.contains("active-FlightType")) {
          li.classList.remove("active-FlightType");
        }
      });
    e.classList.add("active-FlightType");
    var dataValue = e.getAttribute("data-value");
    var dataText = e.textContent;
    var valueInput = e
      .closest(".reserve-field")
      .querySelector(".flighttype-value");
    if (valueInput) {
      valueInput.value = dataValue;
    }
    var textElement = e
      .closest(".reserve-field")
      .querySelector(".flighttype-text");
    if (textElement) {
      textElement.textContent = dataText;
    }
    e.closest(".reserve-field")
      .querySelector(".hidden-box")
      .classList.add("hidden");

    let classBox = e.closest(".reserve-field");
    if (classBox) {
      let nextDiv = classBox.nextElementSibling;
      if (nextDiv && nextDiv.classList.contains("reserve-field")) {
        let hiddenBox = nextDiv.querySelector(".hidden-box");
        if (hiddenBox) {
          setTimeout(() => {
            if (window.innerWidth > 1024) {
              hiddenBox.classList.remove("hidden");
              hiddenBox.style.opacity = 0;
              hiddenBox.style.transition = "opacity 0.7s";
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  hiddenBox.style.opacity = 1;
                });
              });
            } else {
              hiddenBox.classList.remove("hidden");
              hiddenBox.classList.add("fixed-passengerbox");
              document.querySelector("body").classList.add("overflow-hidden");
            }
          }, 50);
        }
      }
    }
    if (document.querySelector("body").classList.contains("overflow-hidden")) {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
  // add this function in mobile
  function close_flighttype(t) {
    if (window.innerWidth > 1024) {
      t.closest(".flighttype").style.opacity = 0;
      t.closest(".flighttype").addEventListener(
        "transitionend",
        () => {
          t.closest(".flighttype").classList.remove("fixed-flighttype");
          if (
            document.querySelector("body").classList.contains("overflow-hidden")
          ) {
            document.querySelector("body").classList.remove("overflow-hidden");
          }
          t.closest(".flighttype").classList.add("hidden");
        },
        { once: true }
      );
    } else {
      t.closest(".flighttype").classList.remove("fixed-flighttype");
      if (
        document.querySelector("body").classList.contains("overflow-hidden")
      ) {
        document.querySelector("body").classList.remove("overflow-hidden");
      }
      t.closest(".flighttype").classList.add("hidden");
    }
  }
}
if (
  flight_module == "true" ||
  cip_module == "true" ||
  service_module == "true" ||
  train_module == "true"
) {
  function Change_AdultCount_Flight(t) {
    const nextInput = t.closest("ul").querySelector(".adultcount");
    let e = parseInt(nextInput.value);
    let i = t.textContent.indexOf("+") > -1 ? e + 1 : e > 0 ? e - 1 : 0;
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
      const countAdultElement = field
        .querySelector(".adult-count")
        .querySelector(".count");
      if (countAdultElement) {
        countAdultElement.textContent = i;
      }
    }

    (function syncInfantWithAdults() {
      const passengerBox = t.closest(".passengerbox");
      const infantInput = passengerBox?.querySelector(".infantcount");
      const infantPlusBtn = passengerBox?.querySelector(
        ".infant-passenger-item .plus-count"
      );
      if (!infantInput || !infantPlusBtn) return;

      let infants = parseInt(infantInput.value) || 0;

      if (infants > i) {
        infants = i;
        infantInput.value = infants;
      }

      if (infants < i) {
        infantPlusBtn.classList.remove(
          "disable-button",
          "deactive-change-button"
        );
      }

      const field = t.closest(".reserve-field");
      const infantCountWrap = field?.querySelector(".infant-count");
      if (infantCountWrap) {
        const countEl = infantCountWrap.querySelector(".count");
        if (countEl) countEl.textContent = infants;
        if (infants === 0) infantCountWrap.classList.add("hidden");
        else infantCountWrap.classList.remove("hidden");
      }

      if (infants >= i) {
        infantPlusBtn.classList.add("disable-button", "deactive-change-button");
      } else {
        infantPlusBtn.classList.remove(
          "disable-button",
          "deactive-change-button"
        );
      }
    })();

    Check_Passenger_Count(t);
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
      if (
        field.querySelector(".child-count").classList.contains("hidden") &&
        i > 0
      ) {
        field.querySelector(".child-count").classList.remove("hidden");
      } else if (
        !field.querySelector(".child-count").classList.contains("hidden") &&
        i == 0
      ) {
        field.querySelector(".child-count").classList.add("hidden");
      }
      const countChildElement = field
        .querySelector(".child-count")
        .querySelector(".count");
      if (countChildElement) {
        countChildElement.textContent = i;
      }
    }
    Check_Passenger_Count(t);
  }
  // new function replaced by Change_ChildCount_Flight

  function Change_ChildrenCount_Flight(t, selector, sibling) {
    const nextInput = t.closest("ul").querySelector(`.${selector}count`);
    const siblingCount = t
      .closest(".passengerbox")
      .querySelector(`.${sibling}count`);
    let e = parseInt(nextInput.value);
    let i = t.textContent.indexOf("+") > -1 ? e + 1 : e > 0 ? e - 1 : 0;
    let n = "";
    if (i >= 5) return;

     if (selector === "infant") {
      const adultsInput = t
        .closest(".passengerbox")
        .querySelector(".adultcount");
      const adults = adultsInput ? parseInt(adultsInput.value) || 0 : 0;
      if (i > adults) i = adults;
    }

    nextInput.value = i;

    const prevInput = t
      .closest(".passengerbox")
      .querySelector(".childcountinput");
    if (prevInput)
      prevInput.value = parseInt(i) + parseInt(siblingCount.value) + ",";

    t.querySelectorAll(`.${selector}count`).forEach(function (selectorcount) {
      const nextSpan = selectorcount.nextElementSibling;
      if (nextSpan) {
        const text = nextSpan.textContent;
        n += text + ": " + selectorcount.value + "، ";
      }
    });
    n = n.substring(0, n.length - 2);

    const field = t.closest(".reserve-field");
    if (field) {
      if (
        field
          .querySelector(`.${selector}-count`)
          .classList.contains("hidden") &&
        i > 0
      ) {
        field.querySelector(`.${selector}-count`).classList.remove("hidden");
      } else if (
        !field
          .querySelector(`.${selector}-count`)
          .classList.contains("hidden") &&
        i == 0
      ) {
        field.querySelector(`.${selector}-count`).classList.add("hidden");
      }

      const countChildElement = field
        .querySelector(`.${selector}-count`)
        .querySelector(".count");
      if (countChildElement) {
        countChildElement.textContent = i;
      }
    }

     if (selector === "infant") {
      const adultsInput = t
        .closest(".passengerbox")
        .querySelector(".adultcount");
      const adults = adultsInput ? parseInt(adultsInput.value) || 0 : 0;
      const infantPlusBtn = t
        .closest(".infant-passenger-item")
        ?.querySelector(".plus-count");

      if (infantPlusBtn) {
        if (i >= adults) {
          infantPlusBtn.classList.add(
            "disable-button",
            "deactive-change-button"
          );
        } else {
          infantPlusBtn.classList.remove(
            "disable-button",
            "deactive-change-button"
          );
        }
      }
    }

    Check_Passenger_Count(t);
  }
}
if (flight_module == "true" || flighthotel_module == "true") {
  function show_flightclass(e) {
    const element = e
      .closest(".flightclass-field")
      .querySelector(".hidden-box");
    const icon = e.closest(".flightclass-field").querySelector(".down-icon");
    if (element) {
      if (window.innerWidth > 1024) {
        if (element.classList.contains("hidden")) {
          element.classList.remove("hidden");
          element.style.opacity = 0;
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              element.style.opacity = 1;
            });
          });
          if (window.innerWidth < 1024) {
            element.classList.add("fixed-FlightClass");
            document.querySelector("body").classList.add("overflow-hidden");
          }
        } else {
          element.style.opacity = 0;
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.toggle("hidden");
        // add this code in mobile
        if (window.innerWidth < 1024) {
          element.classList.add("fixed-FlightClass");
          document.querySelector("body").classList.add("overflow-hidden");
        }
      }
    }
    if (icon) {
      icon.classList.toggle("rotate");
    }
  }
  function select_flightclass(e) {
    var dataValue = e.getAttribute("data-value");
    e.closest(".FlightClass")
      .querySelectorAll("li")
      .forEach(function (li) {
        if (li.classList.contains("active-FlightClass")) {
          li.classList.remove("active-FlightClass");
        }
      });
    e.classList.add("active-FlightClass");
    var spans = e.querySelectorAll("span");
    var dataText = "";

    spans.forEach(function (span) {
      if (window.getComputedStyle(span).display !== "none") {
        dataText = span.textContent;
      }
    });

    var valueInput = e.closest("form").querySelector(".FlightClass-value");
    if (valueInput) {
      valueInput.value = dataValue;
    }
    var textElement = e
      .closest(".flightclass-field")
      .querySelector(".FlightClass-text");
    if (textElement) {
      textElement.textContent = dataText;
    }
    e.closest(".flightclass-field")
      .querySelector(".hidden-box")
      .classList.add("hidden");
    if (
      !e
        .closest(".flightclass-field")
        .classList.contains("flightclass-in-passengerbox")
    ) {
      let classBox = e.closest(".reserve-field");
      if (classBox) {
        let nextDiv = classBox.nextElementSibling;
        if (nextDiv && nextDiv.classList.contains("reserve-field")) {
          let hiddenBox = nextDiv.querySelector(".hidden-box");
          if (hiddenBox) {
            setTimeout(() => {
              if (window.innerWidth > 1024) {
                hiddenBox.classList.remove("hidden");
                hiddenBox.style.opacity = 0;
                hiddenBox.style.transition = "opacity 0.7s";
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    hiddenBox.style.opacity = 1;
                  });
                });
              } else {
                hiddenBox.classList.remove("hidden");
                hiddenBox.classList.add("fixed-passengerbox");
                document.querySelector("body").classList.add("overflow-hidden");
              }
            }, 50);
          }
        }
      }
    }
    const icon = e.closest(".flightclass-field").querySelector(".down-icon");
    if (icon) {
      icon.classList.toggle("rotate");
    }
    if (document.querySelector("body").classList.contains("overflow-hidden")) {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
  // add this function in mobile
  function close_FlightClass(t) {
    t.closest(".FlightClass").classList.remove("fixed-FlightClass");
    if (document.querySelector("body").classList.contains("overflow-hidden")) {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
    t.closest(".FlightClass").classList.add("hidden");
  }
}
if (visa_module == "true") {
  // start visa module scripts
  if (window.innerWidth <= 750) {
    const visaSearch = document.getElementById("visaSearch");
    visaSearch.setAttribute("action", "/M_Visa_Search?lid=3");
  }
  document.querySelector(".visa-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-visa").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document.querySelector(".r-visa").classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-visa")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-visa")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.add("visa-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.add("visa-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/visa-search-bg.jpg" alt="visa-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/visa-search-bg.jpg" alt="visa-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
  });
}
if (service_module == "true") {
  // start service module scripts
  if (window.innerWidth <= 750) {
    const serviceSearch = document.getElementById("serviceSearch");
    serviceSearch.setAttribute("action", "/M_TouristPanel_Search.bc?lid=3");
  }
  document.querySelector(".service-btn").addEventListener("click", function () {
    document.querySelectorAll(".reserve-btn").forEach(function (btn) {
      btn.classList.remove("active-module");
    });
    this.classList.add("active-module");
    document.querySelectorAll(".module-form").forEach(function (form) {
      form.classList.add("hidden");
    });
    document.querySelector(".r-service").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document
          .querySelector(".r-service")
          .classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-service")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-service")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.add("service-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
      if (topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.remove("train-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.add("service-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/service-search-bg.jpg" alt="service-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/service-search-bg.jpg" alt="service-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
      if (topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.remove("train-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");
        if (typeDate) typeDate.textContent = "تاريخ الوصول أو المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
  document.querySelectorAll("#serviceSearch").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      let ageString = "";
      const childCount =
        parseInt(form.querySelector(".childcount").value, 10) || 0;
      const infantCount =
        parseInt(form.querySelector(".infantcount").value, 10) || 0;
      const childAge = 3;
      const infantAge = 1;
      let sumCount = [];
      sumCount.push(...Array.from({ length: childCount }, () => childAge));
      sumCount.push(...Array.from({ length: infantCount }, () => infantAge));
      ageString = sumCount.join(",");
      if (ageString !== "") {
        const selectAgeValue = form.querySelector(".select-age-value");
        selectAgeValue.value = ageString;
      }
      const adults = parseInt(form.querySelector(".adultcount").value, 10) || 0;
      const childs = parseInt(form.querySelector(".childcount").value, 10) || 0;
      const infants =
        parseInt(form.querySelector(".infantcount").value, 10) || 0;
      const totalPassengers = adults + childs + infants;
      const alertText = form
        .querySelector(".passengerbox")
        .querySelector(".alert-text");
      if (alertText) {
        alertText.remove();
      }

      if (infants > adults) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">اختر طفلًا واحدًا فقط لكل شخص بالغ!</div>`
          );
      }
      if (totalPassengers > 10) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">يجب أن يكون العدد الإجمالي للبالغين والأطفال والرضع أقل من 10!</div>`
          );
      }
      if (adults < 1) {
        event.preventDefault();
        form
          .querySelector(".passengerbox")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="alert-text alert-for-passenger">اختر شخصًا بالغًا واحدًا على الأقل. !</div>`
          );
      }
    });
  });
}
if (train_module == "true") {
  // start train module scripts
  if (window.innerWidth <= 750) {
    const trainSearch = document.getElementById("trainSearch");

    if (
      trainSearch.getAttribute("action") ==
      "/Tem3_Train_Roundtrip_Search.bc?lid=3"
    ) {
      trainSearch.setAttribute("action", "/M_Train_Roundtrip_Search.bc?lid=3");
    }

    if (
      trainSearch.getAttribute("action") == "/Tem3_Train_Oneway_Search.bc?lid=3"
    ) {
      trainSearch.setAttribute("action", "/M_Train_Oneway_Search.bc?lid=3");
    }
  }
  document.querySelectorAll(".formtrain").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      let ageString = "";

      form
        .querySelectorAll(".createChildDropdown")
        .forEach(function (dropdown) {
          ageString += dropdown.querySelector("select").value + ",";
        });

      if (ageString !== "") {
        const selectAgeValue = form.querySelector(".select-age-value");
        selectAgeValue.value = ageString;

        const updatedAgeString = selectAgeValue.value.replace(
          /,(?=[^,]*$)/,
          ""
        );
        selectAgeValue.value = updatedAgeString;
      }

      const adults = parseInt(form.querySelector(".adultcount").value) || 0;
      const children =
        parseInt(document.querySelector(".childcount").value) || 0;
      const totalPassengers = adults + children;

      let infants = 0;
      document.querySelectorAll(".select-age").forEach(function (select) {
        if (parseInt(select.value) <= 2) {
          infants += 1;
        }
      });

      const alertText = document.querySelector(".alert-text");
      if (infants > adults) {
        event.preventDefault();
        alertText.textContent = "اختر طفلًا واحدًا فقط لكل شخص بالغ!";
      }
      if (totalPassengers > 10) {
        event.preventDefault();
        alertText.textContent =
          "يجب أن يكون العدد الإجمالي للبالغين والأطفال أقل من 10. !";
      }
      if (adults < 1) {
        event.preventDefault();
        alertText.textContent = "اختر شخصًا بالغًا واحدًا على الأقل. !";
      }
    });
  });
  document
    .querySelector("#backtoback-train")
    .addEventListener("click", function () {
      document
        .querySelector("#backtoback-train")
        .setAttribute("data-change", "1");
      document.querySelector("#oneway-train").setAttribute("data-change", "0");
      check_searchHistory("train");
      this.classList.add("active-r-btn");
      document.querySelector("#oneway-train").classList.remove("active-r-btn");
      document.querySelector("#trainSearch").setAttribute("data-form", "train");
      document
        .querySelector("#trainSearch")
        .setAttribute("data-traintype", "2");
      document
        .querySelector("#trainSearch")
        .setAttribute("action", "/Tem3_Train_Roundtrip_Search.bc?lid=3");
      const end_date = document.querySelector("#trainSearch .end_date");
      if (end_date) {
        end_date.disabled = false;
      }
      document
        .getElementById("trainSearch")
        .querySelectorAll(".return-date")
        .forEach(function (element) {
          element.classList.remove("no-activedate");
        });
      const endDate = document.querySelector("#trainSearch .end_date");
      if (endDate) {
        if (calendar_type == "simple-calendar") {
          endDate.classList.add("nextCalOpening");
        }
      }
      if (window.innerWidth <= 750) {
        document
          .querySelector("#trainSearch")
          .setAttribute("action", "/M_Train_Roundtrip_Search.bc?lid=3");
      }
    });
  document
    .querySelector("#oneway-train")
    .addEventListener("click", function () {
      document
        .querySelector("#backtoback-train")
        .setAttribute("data-change", "0");
      document.querySelector("#oneway-train").setAttribute("data-change", "1");
      check_searchHistory("train");
      this.classList.add("active-r-btn");
      document
        .querySelector("#backtoback-train")
        .classList.remove("active-r-btn");
      document.querySelector("#trainSearch").setAttribute("data-form", "train");
      document
        .querySelector("#trainSearch")
        .setAttribute("data-traintype", "1");
      document
        .querySelector("#trainSearch")
        .setAttribute("action", "/Tem3_Train_Oneway_Search.bc?lid=3");
      const end_date = document.querySelector("#trainSearch .end_date");
      if (end_date) {
        end_date.disabled = true;
      }
      const endDate = document.querySelector("#trainSearch .end_date");
      if (endDate) {
        if (calendar_type == "simple-calendar") {
          endDate.classList.remove("nextCalOpening");
        }
      }
      if (window.innerWidth <= 750) {
        document
          .querySelector("#trainSearch")
          .setAttribute("action", "/M_Train_Oneway_Search.bc?lid=3");
      }
      document
        .getElementById("trainSearch")
        .querySelectorAll(".return-date")
        .forEach(function (element) {
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
    document.querySelector(".r-train").classList.remove("hidden");
    // add this code in mobile
    if (window.innerWidth < 1024) {
      if (hide_forms == "true") {
        document.querySelector(".r-train").classList.add("visible-module-form");
        if (
          document
            .querySelector(".r-train")
            .classList.contains("invisible-module-form")
        ) {
          document
            .querySelector(".r-train")
            .classList.remove("invisible-module-form");
        }
      }
    }
    const topBannerResize = document.querySelector(".module-banner-background");
    if (topBannerResize) {
      if (!topBannerResize.classList.contains("train-banner-background")) {
        topBannerResize.classList.add("train-banner-background");
      }
      if (topBannerResize.classList.contains("hotel-banner-background")) {
        topBannerResize.classList.remove("hotel-banner-background");
      }
      if (topBannerResize.classList.contains("flighthotel-banner-background")) {
        topBannerResize.classList.remove("flighthotel-banner-background");
      }
      if (topBannerResize.classList.contains("tour-banner-background")) {
        topBannerResize.classList.remove("tour-banner-background");
      }
      if (topBannerResize.classList.contains("insurance-banner-background")) {
        topBannerResize.classList.remove("insurance-banner-background");
      }
      if (topBannerResize.classList.contains("cip-banner-background")) {
        topBannerResize.classList.remove("cip-banner-background");
      }
      if (topBannerResize.classList.contains("visa-banner-background")) {
        topBannerResize.classList.remove("visa-banner-background");
      }
      if (topBannerResize.classList.contains("service-banner-background")) {
        topBannerResize.classList.remove("service-banner-background");
      }
      if (topBannerResize.classList.contains("flight-banner-background")) {
        topBannerResize.classList.remove("flight-banner-background");
      }
    }
    const topBannerImageResize = document.querySelector(".module-banner-image");
    if (topBannerImageResize) {
      if (!topBannerImageResize.classList.contains("train-banner-image")) {
        topBannerImageResize.classList.add("train-banner-image");
      }
      const path = topBannerImageResize.getAttribute("data-img-path");
      if (path) {
        topBannerImageResize.innerHTML = `<img src="${path}/images/train-search-bg.jpg" alt="train-search-bg">`;
      } else {
        topBannerImageResize.innerHTML =
          '<img src="images/train-search-bg.jpg" alt="train-search-bg">';
      }
      if (topBannerImageResize.classList.contains("hotel-banner-image")) {
        topBannerImageResize.classList.remove("hotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("flighthotel-banner-image")) {
        topBannerImageResize.classList.remove("flighthotel-banner-image");
      }
      if (topBannerImageResize.classList.contains("tour-banner-image")) {
        topBannerImageResize.classList.remove("tour-banner-image");
      }
      if (topBannerImageResize.classList.contains("insurance-banner-image")) {
        topBannerImageResize.classList.remove("insurance-banner-image");
      }
      if (topBannerImageResize.classList.contains("cip-banner-image")) {
        topBannerImageResize.classList.remove("cip-banner-image");
      }
      if (topBannerImageResize.classList.contains("visa-banner-image")) {
        topBannerImageResize.classList.remove("visa-banner-image");
      }
      if (topBannerImageResize.classList.contains("service-banner-image")) {
        topBannerImageResize.classList.remove("service-banner-image");
      }
      if (topBannerImageResize.classList.contains("flight-banner-image")) {
        topBannerImageResize.classList.remove("flight-banner-image");
      }
    }
    //simple-calendar
    if (calendar_type == "simple-calendar") {
      const dateInfoSelected = document.querySelector(".date_info_selected");
      if (dateInfoSelected) {
        const typeDate = dateInfoSelected.querySelector(".type_date");
        const dayOfDate = dateInfoSelected.querySelector(".day_of_date");
        const monthOfDate = dateInfoSelected.querySelector(".month_of_date");

        if (typeDate) typeDate.textContent = "تاريخ المغادرة :";
        if (dayOfDate) dayOfDate.textContent = "---";
        if (monthOfDate) monthOfDate.textContent = " ";
      }
    }
    //simple-calendar end
  });
  function ExchangeRoute_Train(t) {
    const TrainRoute = t.closest(".formtrain");
    if (TrainRoute) {
      const departureInput = TrainRoute.querySelector(".departure");
      const destinationInput = TrainRoute.querySelector(".destination");
      const locationIdInput =
        TrainRoute.querySelector(".departure-route").querySelector(
          ".locationId"
        );
      const nextLocationIdInput =
        TrainRoute.querySelector(".destination-route").querySelector(
          ".locationId"
        );
      const autoFitText =
        TrainRoute.querySelector(".departure-route").querySelector(".auto-fit");
      const nextAutoFitText =
        TrainRoute.querySelector(".destination-route").querySelector(
          ".auto-fit"
        );
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
  }
  function CheckPrivateCompartment(elementent) {
    const isChecked = elementent.checked;
    elementent.value = isChecked ? 1 : 0;
  }
  function show_Compartment(e) {
    const element = e.closest(".reserve-field").querySelector(".hidden-box");
    if (element) {
      if (window.innerWidth > 1024) {
        if (element.classList.contains("hidden")) {
          element.classList.remove("hidden");
          element.style.opacity = 0;
          element.style.transition = "opacity 0.7s";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              element.style.opacity = 1;
            });
          });
          // add this code in mobile
          if (window.innerWidth < 1024) {
            element.classList.add("fixed-Compartment");
            document.querySelector("body").classList.add("overflow-hidden");
          }
        } else {
          element.style.opacity = 0;
          element.addEventListener(
            "transitionend",
            () => {
              element.classList.add("hidden");
            },
            { once: true }
          );
        }
      } else {
        element.classList.toggle("hidden");
        // add this code in mobile
        if (window.innerWidth < 1024) {
          element.classList.add("fixed-Compartment");
          document.querySelector("body").classList.add("overflow-hidden");
        }
      }
    }
    const icon = e.closest(".reserve-field").querySelector(".down-icon");
    if (icon) {
      icon.classList.toggle("rotate");
    }
  }
  function select_Compartment(e) {
    e.closest(".Compartment")
      .querySelectorAll("li")
      .forEach(function (li) {
        if (li.classList.contains("active-Compartment")) {
          li.classList.remove("active-Compartment");
        }
      });
    e.classList.add("active-Compartment");
    var dataValue = e.getAttribute("data-value");
    var dataText = e.textContent;
    var valueInput = e
      .closest(".reserve-field")
      .querySelector(".Compartment-value");
    if (valueInput) {
      valueInput.value = dataValue;
    }
    var textElement = e
      .closest(".reserve-field")
      .querySelector(".Compartment-text");
    if (textElement) {
      textElement.textContent = dataText;
    }
    e.closest(".reserve-field")
      .querySelector(".hidden-box")
      .classList.add("hidden");
    let CompartmentBox = e.closest(".reserve-field");
    if (CompartmentBox) {
      let nextDiv = CompartmentBox.nextElementSibling;
      if (nextDiv && nextDiv.classList.contains("reserve-field")) {
        let hiddenBox = nextDiv.querySelector(".hidden-box");
        if (hiddenBox) {
          setTimeout(() => {
            if (window.innerWidth > 1024) {
              hiddenBox.classList.remove("hidden");
              hiddenBox.style.opacity = 0;
              hiddenBox.style.transition = "opacity 0.7s";
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  hiddenBox.style.opacity = 1;
                });
              });
            } else {
              hiddenBox.classList.remove("hidden");
              hiddenBox.classList.add("fixed-passengerbox");
              document.querySelector("body").classList.add("overflow-hidden");
            }
          }, 50);
        }
      }
    }
    if (document.querySelector("body").classList.contains("overflow-hidden")) {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
  // add this function in mobile
  function close_Compartment(t) {
    if (window.innerWidth > 1024) {
      t.closest(".Compartment").style.opacity = 0;
      t.closest(".Compartment").addEventListener(
        "transitionend",
        () => {
          t.closest(".Compartment").classList.remove("fixed-Compartment");
          if (
            document.querySelector("body").classList.contains("overflow-hidden")
          ) {
            document.querySelector("body").classList.remove("overflow-hidden");
          }
          t.closest(".Compartment").classList.add("hidden");
        },
        { once: true }
      );
    } else {
      t.closest(".Compartment").classList.remove("fixed-Compartment");
      if (
        document.querySelector("body").classList.contains("overflow-hidden")
      ) {
        document.querySelector("body").classList.remove("overflow-hidden");
      }
      t.closest(".Compartment").classList.add("hidden");
    }
  }
  // end train module scripts
}
//function for landing page
if (document.querySelector("#landing-change-url")) {
  const pathnamehome = window.location.pathname;
  if (pathnamehome) {
    document
      .querySelectorAll(".reservation-item li")
      .forEach(function (reservation_item) {
        const item_id = reservation_item.getAttribute("data-id").split("-");
        const module_item = item_id[1];
        if (pathnamehome == `/${module_item}`) {
          reservation_item.click();
        }
      });
  }
}
// add this function in mobile
function close_module_form(t) {
  const module_form = t.closest(".module-form");
  if (module_form.classList.contains("visible-module-form")) {
    module_form.classList.remove("visible-module-form");
    module_form.classList.add("invisible-module-form");
  }
  document.querySelectorAll(".reserve-btn").forEach(function (btn) {
    btn.classList.remove("active-module");
  });
}
// add this function in mobile
function close_searchList(t) {
  t.closest(".searchList").classList.remove("fixed-searchList");
  if (document.querySelector("body").classList.contains("overflow-hidden")) {
    document.querySelector("body").classList.remove("overflow-hidden");
  }
  t.closest(".searchList").classList.add("hidden");
  const icon = t.closest(".reserve-field").querySelector(".down-icon");
  if (icon && icon.classList.contains("rotate")) {
    icon.classList.remove("rotate");
  }
}
// add this function in mobile
function close_FlightClass(t) {
  t.closest(".FlightClass").classList.remove("fixed-FlightClass");
  if (document.querySelector("body").classList.contains("overflow-hidden")) {
    document.querySelector("body").classList.remove("overflow-hidden");
  }
  t.closest(".FlightClass").classList.add("hidden");
}
if (document.querySelector("#Dynamicjson")) {
  if (document.querySelector("#Dynamicjson").value == "true") {
    // Dynamic Data Start
    var dynamicData = null;
    fetch(`dynamic-data/engine/ver.1`)
      .then((response) => response.json())
      .then((data) => {
        dynamicData = data;
        if (data) {
          landing_scroll_place = data.landingscrollplace;
          // flight start
          if (flight_module == "true") {
            if (data.flight) {
              const flight_activeType = data.flight.activeType;
              if (flight_activeType && flight_activeType.labelText !== "") {
                const activeLi = document.getElementById(flight_activeType);
                if (activeLi) {
                  activeLi.classList.add("active-r-btn");
                  const radio = activeLi.querySelector('input[type="radio"]');
                  if (radio) {
                    activeLi.click();
                  }
                }
              }
              // flight departure
              const flight_departure = data.flight.departure;
              if (flight_departure) {
                const flight_label_departure = document.querySelector(
                  ".flight-routes .departure-route label > .label-text"
                );
                if (
                  flight_label_departure &&
                  flight_departure.labelText &&
                  flight_departure.labelText !== ""
                ) {
                  flight_label_departure.textContent =
                    flight_departure.labelText;
                }
                const flight_Input_departure = document.querySelector(
                  ".flight-routes .departure-route input.departure"
                );
                if (
                  flight_Input_departure &&
                  flight_departure.input &&
                  flight_departure.input.placeholder &&
                  flight_departure.input.placeholder !== ""
                ) {
                  flight_Input_departure.placeholder =
                    flight_departure.input.placeholder;
                }

                if (document.querySelector("#empty-fields").value !== "true") {
                  const flight_city_departure = document.querySelector(
                    ".flight-routes .departure-route .auto-fit"
                  );
                  if (
                    flight_city_departure &&
                    flight_departure.cityName &&
                    flight_departure.cityName !== ""
                  ) {
                    flight_city_departure.textContent =
                      flight_departure.cityName;
                  }
                  if (
                    flight_Input_departure &&
                    flight_departure.input &&
                    flight_departure.input.value &&
                    flight_departure.input.value !== ""
                  ) {
                    flight_Input_departure.value = flight_departure.input.value;
                  }

                  const flight_locationId_departure = document.querySelector(
                    ".flight-routes .departure-route .locationId.from"
                  );
                  if (
                    flight_locationId_departure &&
                    flight_departure.locationId &&
                    flight_departure.locationId !== ""
                  ) {
                    flight_locationId_departure.value =
                      flight_departure.locationId;
                  }
                }
              }

              // flight destination
              const flight_destination = data.flight.destination;
              if (flight_destination) {
                const flight_label_destination = document.querySelector(
                  ".flight-routes .destination-route label > .label-text"
                );
                if (
                  flight_label_destination &&
                  flight_destination.labelText &&
                  flight_destination.labelText !== ""
                ) {
                  flight_label_destination.textContent =
                    flight_destination.labelText;
                }
                const flight_Input_destination = document.querySelector(
                  ".flight-routes .destination-route input.destination"
                );
                if (
                  flight_Input_destination &&
                  flight_destination.input &&
                  flight_destination.input.placeholder &&
                  flight_destination.input.placeholder !== ""
                ) {
                  flight_Input_destination.placeholder =
                    flight_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const flight_city_destination = document.querySelector(
                    ".flight-routes .destination-route .auto-fit"
                  );
                  if (
                    flight_city_destination &&
                    flight_destination.cityName &&
                    flight_destination.cityName !== ""
                  ) {
                    flight_city_destination.textContent =
                      flight_destination.cityName;
                  }

                  if (
                    flight_Input_destination &&
                    flight_destination.input &&
                    flight_destination.input.value &&
                    flight_destination.input.value !== ""
                  ) {
                    flight_Input_destination.value =
                      flight_destination.input.value;
                  }

                  const flight_locationId_destination = document.querySelector(
                    ".flight-routes .destination-route .locationId.to"
                  );
                  if (
                    flight_locationId_destination &&
                    flight_destination.locationId &&
                    flight_destination.locationId !== ""
                  ) {
                    flight_locationId_destination.value =
                      flight_destination.locationId;
                  }
                }
              }

              const flight_dates = data.flight.dates;
              if (flight_dates) {
                const flight_labeldate_departure = document.querySelector(
                  "#flightSearch .departure-date label > .label-text"
                );
                if (
                  flight_labeldate_departure &&
                  flight_dates.departure_datelabel &&
                  flight_dates.departure_datelabel !== ""
                ) {
                  flight_labeldate_departure.textContent =
                    flight_dates.departure_datelabel;
                }

                const flight_placeholderdate_departure = document.querySelector(
                  "#flightSearch .departure-date input.Basis_Date"
                );
                if (
                  flight_placeholderdate_departure &&
                  flight_dates.departure_dateplaceholder &&
                  flight_dates.departure_dateplaceholder !== ""
                ) {
                  flight_placeholderdate_departure.placeholder =
                    flight_dates.departure_dateplaceholder;
                }

                const flight_labeldate_return = document.querySelector(
                  "#flightSearch .return-date label > .label-text"
                );
                if (
                  flight_labeldate_return &&
                  flight_dates.destination_datelabel &&
                  flight_dates.destination_datelabel !== ""
                ) {
                  flight_labeldate_return.textContent =
                    flight_dates.destination_datelabel;
                }

                const flight_placeholderdate_return = document.querySelector(
                  "#flightSearch .return-date input.Basis_Date"
                );
                if (
                  flight_placeholderdate_return &&
                  flight_dates.destination_dateplaceholder &&
                  flight_dates.destination_dateplaceholder !== ""
                ) {
                  flight_placeholderdate_return.placeholder =
                    flight_dates.destination_dateplaceholder;
                }
              }

              const flight_class = data.flight.flightclass;
              if (flight_class) {
                const flight_label_flightclass = document.querySelectorAll(
                  "#flightSearch .flightclass-field label > .label-text"
                );
                flight_label_flightclass.forEach(function (label) {
                  if (
                    label &&
                    flight_class.labelText &&
                    flight_class.labelText !== ""
                  ) {
                    label.textContent = flight_class.labelText;
                  }
                });
                const flight_flightclass_inpassengerbox =
                  document.querySelector(
                    "#flightSearch .flightclass-field.flightclass-in-passengerbox"
                  );
                const flight_flightclass_outofpassengerbox =
                  document.querySelector(
                    "#flightSearch .flightclass-field.flightclass-outof-passengerbox"
                  );
                if (
                  flight_flightclass_inpassengerbox &&
                  flight_flightclass_outofpassengerbox &&
                  flight_class.show_in_PassengerBox &&
                  flight_class.show_in_PassengerBox !== ""
                ) {
                  if (flight_class.show_in_PassengerBox == "yes") {
                    flight_flightclass_outofpassengerbox.classList.add(
                      "hidden"
                    );
                    flight_flightclass_inpassengerbox.classList.remove(
                      "hidden"
                    );
                  } else {
                    flight_flightclass_outofpassengerbox.classList.remove(
                      "hidden"
                    );
                    flight_flightclass_inpassengerbox.classList.add("hidden");
                  }
                }
              }

              const flight_passengers = data.flight.passengers;
              if (flight_passengers) {
                const flight_label_passengers = document.querySelector(
                  "#flightSearch .passengers-field label > .label-text"
                );
                if (
                  flight_label_passengers &&
                  flight_passengers.labelText &&
                  flight_passengers.labelText !== ""
                ) {
                  flight_label_passengers.textContent =
                    flight_passengers.labelText;
                }
              }

              const flight_search = data.flight.search;
              if (flight_search) {
                const fligh_text_search = document.querySelector(
                  "#flightSearch .reserve-search .search-flight > span"
                );
                if (
                  fligh_text_search &&
                  flight_search.buttonText &&
                  flight_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = flight_search.buttonText;
                }
              }
            }
          }

          // hotel start
          if (hotel_module == "true") {
            if (data.hotel) {
              const hotel_destination = data.hotel.destination;
              if (hotel_destination) {
                const hotel_label_departure = document.querySelector(
                  "#hotelSearch .departure-route label > .label-text"
                );
                if (
                  hotel_label_departure &&
                  hotel_destination.labelText &&
                  hotel_destination.labelText !== ""
                ) {
                  hotel_label_departure.textContent =
                    hotel_destination.labelText;
                }
                const hotel_Input_departure = document.querySelector(
                  "#hotelSearch .departure-route input.departure"
                );
                if (
                  hotel_Input_departure &&
                  hotel_destination.input &&
                  hotel_destination.input.placeholder &&
                  hotel_destination.input.placeholder !== ""
                ) {
                  hotel_Input_departure.placeholder =
                    hotel_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const hotel_city_departure = document.querySelector(
                    "#hotelSearch .departure-route .auto-fit"
                  );
                  if (
                    hotel_city_departure &&
                    hotel_destination.cityName &&
                    hotel_destination.cityName !== ""
                  ) {
                    hotel_city_departure.textContent =
                      hotel_destination.cityName;
                  }

                  if (
                    hotel_Input_departure &&
                    hotel_destination.input &&
                    hotel_destination.input.value &&
                    hotel_destination.input.value !== ""
                  ) {
                    hotel_Input_departure.value = hotel_destination.input.value;
                  }

                  const hotel_locationId_departure = document.querySelector(
                    "#hotelSearch .departure-route .locationId.from"
                  );
                  if (
                    hotel_locationId_departure &&
                    hotel_destination.locationId &&
                    hotel_destination.locationId !== ""
                  ) {
                    hotel_locationId_departure.value =
                      hotel_destination.locationId;
                  }
                }
              }

              const hotel_dates = data.hotel.dates;
              if (hotel_dates) {
                const hotel_labeldate_departure = document.querySelector(
                  "#hotelSearch .departure-date label > .label-text"
                );
                if (
                  hotel_labeldate_departure &&
                  hotel_dates.checkin_datelabel &&
                  hotel_dates.checkin_datelabel !== ""
                ) {
                  hotel_labeldate_departure.textContent =
                    hotel_dates.checkin_datelabel;
                }

                const hotel_placeholderdate_departure = document.querySelector(
                  "#hotelSearch .departure-date input.Basis_Date"
                );
                if (
                  hotel_placeholderdate_departure &&
                  hotel_dates.checkin_dateplaceholder &&
                  hotel_dates.checkin_dateplaceholder !== ""
                ) {
                  hotel_placeholderdate_departure.placeholder =
                    hotel_dates.checkin_dateplaceholder;
                }

                const hotel_labeldate_return = document.querySelector(
                  "#hotelSearch .return-date label > .label-text"
                );
                if (
                  hotel_labeldate_return &&
                  hotel_dates.checkout_datelabel &&
                  hotel_dates.checkout_datelabel !== ""
                ) {
                  hotel_labeldate_return.textContent =
                    hotel_dates.checkout_datelabel;
                }

                const hotel_placeholderdate_return = document.querySelector(
                  "#hotelSearch .return-date input.Basis_Date"
                );
                if (
                  hotel_placeholderdate_return &&
                  hotel_dates.checkout_dateplaceholder &&
                  hotel_dates.checkout_dateplaceholder !== ""
                ) {
                  hotel_placeholderdate_return.placeholder =
                    hotel_dates.checkout_dateplaceholder;
                }
              }

              const hotel_passengers = data.hotel.passengers;
              if (hotel_passengers) {
                const hotel_label_passengers = document.querySelector(
                  "#hotelSearch .passengers-field label > .label-text"
                );
                if (
                  hotel_label_passengers &&
                  hotel_passengers.labelText &&
                  hotel_passengers.labelText !== ""
                ) {
                  hotel_label_passengers.textContent =
                    hotel_passengers.labelText;
                }
              }

              const hotel_search = data.hotel.search;
              if (hotel_search) {
                const fligh_text_search = document.querySelector(
                  "#hotelSearch .reserve-search .search-hotel > span"
                );
                if (
                  fligh_text_search &&
                  hotel_search.buttonText &&
                  hotel_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = hotel_search.buttonText;
                }
              }
            }
          }

          // flight+hotel start
          if (flighthotel_module == "true") {
            // flighthotel departure
            if (data.flighthotel) {
              const flighthotel_departure = data.flighthotel.departure;
              if (flighthotel_departure) {
                const flighthotel_label_departure = document.querySelector(
                  "#flightHotelSearch .departure-route label > .label-text"
                );
                if (
                  flighthotel_label_departure &&
                  flighthotel_departure.labelText &&
                  flighthotel_departure.labelText !== ""
                ) {
                  flighthotel_label_departure.textContent =
                    flighthotel_departure.labelText;
                }
                const flighthotel_Input_departure = document.querySelector(
                  "#flightHotelSearch .departure-route input.departure"
                );
                if (
                  flighthotel_Input_departure &&
                  flighthotel_departure.input &&
                  flighthotel_departure.input.placeholder &&
                  flighthotel_departure.input.placeholder !== ""
                ) {
                  flighthotel_Input_departure.placeholder =
                    flighthotel_departure.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const flighthotel_city_departure = document.querySelector(
                    "#flightHotelSearch .departure-route .auto-fit"
                  );
                  if (
                    flighthotel_city_departure &&
                    flighthotel_departure.cityName &&
                    flighthotel_departure.cityName !== ""
                  ) {
                    flighthotel_city_departure.textContent =
                      flighthotel_departure.cityName;
                  }
                  if (
                    flighthotel_Input_departure &&
                    flighthotel_departure.input &&
                    flighthotel_departure.input.value &&
                    flighthotel_departure.input.value !== ""
                  ) {
                    flighthotel_Input_departure.value =
                      flighthotel_departure.input.value;
                  }
                  const flighthotel_locationId_departure =
                    document.querySelector(
                      "#flightHotelSearch .departure-route .locationId.from"
                    );
                  if (
                    flighthotel_locationId_departure &&
                    flighthotel_departure.locationId &&
                    flighthotel_departure.locationId !== ""
                  ) {
                    flighthotel_locationId_departure.value =
                      flighthotel_departure.locationId;
                  }
                }
              }

              // flighthotel destination
              const flighthotel_destination = data.flighthotel.destination;
              if (flighthotel_destination) {
                const flighthotel_label_destination = document.querySelector(
                  "#flightHotelSearch .destination-route label > .label-text"
                );
                if (
                  flighthotel_label_destination &&
                  flighthotel_destination.labelText &&
                  flighthotel_destination.labelText !== ""
                ) {
                  flighthotel_label_destination.textContent =
                    flighthotel_destination.labelText;
                }
                const flighthotel_Input_destination = document.querySelector(
                  "#flightHotelSearch .destination-route input.destination"
                );
                if (
                  flighthotel_Input_destination &&
                  flighthotel_destination.input &&
                  flighthotel_destination.input.placeholder &&
                  flighthotel_destination.input.placeholder !== ""
                ) {
                  flighthotel_Input_destination.placeholder =
                    flighthotel_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const flighthotel_city_destination = document.querySelector(
                    "#flightHotelSearch .destination-route .auto-fit"
                  );
                  if (
                    flighthotel_city_destination &&
                    flighthotel_destination.cityName &&
                    flighthotel_destination.cityName !== ""
                  ) {
                    flighthotel_city_destination.textContent =
                      flighthotel_destination.cityName;
                  }
                  if (
                    flighthotel_Input_destination &&
                    flighthotel_destination.input &&
                    flighthotel_destination.input.value &&
                    flighthotel_destination.input.value !== ""
                  ) {
                    flighthotel_Input_destination.value =
                      flighthotel_destination.input.value;
                  }

                  const flighthotel_locationId_destination =
                    document.querySelector(
                      "#flightHotelSearch .destination-route .locationId.to"
                    );
                  if (
                    flighthotel_locationId_destination &&
                    flighthotel_destination.locationId &&
                    flighthotel_destination.locationId !== ""
                  ) {
                    flighthotel_locationId_destination.value =
                      flighthotel_destination.locationId;
                  }
                }
              }

              const flighthotel_dates = data.flighthotel.dates;
              if (flighthotel_dates) {
                const flighthotel_labeldate_departure = document.querySelector(
                  "#flightHotelSearch .fh_firstpart_date .departure-date label > .label-text"
                );
                if (
                  flighthotel_labeldate_departure &&
                  flighthotel_dates.departure_datelabel &&
                  flighthotel_dates.departure_datelabel !== ""
                ) {
                  flighthotel_labeldate_departure.textContent =
                    flighthotel_dates.departure_datelabel;
                }

                const flighthotel_placeholderdate_departure =
                  document.querySelector(
                    "#flightHotelSearch .fh_firstpart_date .departure-date input.Basis_Date"
                  );
                if (
                  flighthotel_placeholderdate_departure &&
                  flighthotel_dates.departure_dateplaceholder &&
                  flighthotel_dates.departure_dateplaceholder !== ""
                ) {
                  flighthotel_placeholderdate_departure.placeholder =
                    flighthotel_dates.departure_dateplaceholder;
                }

                const flighthotel_labeldate_return = document.querySelector(
                  "#flightHotelSearch .fh_firstpart_date .return-date label > .label-text"
                );
                if (
                  flighthotel_labeldate_return &&
                  flighthotel_dates.destination_datelabel &&
                  flighthotel_dates.destination_datelabel !== ""
                ) {
                  flighthotel_labeldate_return.textContent =
                    flighthotel_dates.destination_datelabel;
                }

                const flighthotel_placeholderdate_return =
                  document.querySelector(
                    "#flightHotelSearch .fh_firstpart_date .return-date input.Basis_Date"
                  );
                if (
                  flighthotel_placeholderdate_return &&
                  flighthotel_dates.destination_dateplaceholder &&
                  flighthotel_dates.destination_dateplaceholder !== ""
                ) {
                  flighthotel_placeholderdate_return.placeholder =
                    flighthotel_dates.destination_dateplaceholder;
                }
              }

              const flighthotel_class = data.flighthotel.flightclass;
              if (flighthotel_class) {
                const flighthotel_label_flightclass = document.querySelectorAll(
                  "#flightHotelSearch .flightclass-field label > .label-text"
                );
                flighthotel_label_flightclass.forEach(function (label) {
                  if (
                    label &&
                    flighthotel_class.labelText &&
                    flighthotel_class.labelText !== ""
                  ) {
                    label.textContent = flighthotel_class.labelText;
                  }
                });

                const flighthotel_flightclass_inpassengerbox =
                  document.querySelector(
                    "#flightHotelSearch .flightclass-field.flightclass-in-passengerbox"
                  );
                const flighthotel_flightclass_outofpassengerbox =
                  document.querySelector(
                    "#flightHotelSearch .flightclass-field.flightclass-outof-passengerbox"
                  );
                if (
                  flighthotel_flightclass_inpassengerbox &&
                  flighthotel_flightclass_outofpassengerbox &&
                  flighthotel_class.show_in_PassengerBox &&
                  flighthotel_class.show_in_PassengerBox !== ""
                ) {
                  if (flighthotel_class.show_in_PassengerBox == "yes") {
                    flighthotel_flightclass_outofpassengerbox.classList.add(
                      "hidden"
                    );
                    flighthotel_flightclass_inpassengerbox.classList.remove(
                      "hidden"
                    );
                  } else {
                    flighthotel_flightclass_outofpassengerbox.classList.remove(
                      "hidden"
                    );
                    flighthotel_flightclass_inpassengerbox.classList.add(
                      "hidden"
                    );
                  }
                }
              }

              const flighthotel_passengers = data.flighthotel.passengers;
              if (flighthotel_passengers) {
                const flighthotel_label_passengers = document.querySelector(
                  "#flightHotelSearch .passengers-field label > .label-text"
                );
                if (
                  flighthotel_label_passengers &&
                  flighthotel_passengers.labelText &&
                  flighthotel_passengers.labelText !== ""
                ) {
                  flighthotel_label_passengers.textContent =
                    flighthotel_passengers.labelText;
                }
              }

              const flighthotel_ExteraHoteldate =
                data.flighthotel.ExteraHoteldate;
              if (flighthotel_ExteraHoteldate) {
                const flighthotel_labeldate_departure = document.querySelector(
                  "#flightHotelSearch .Wrapper-ExteraHoteldate .departure-date label > .label-text"
                );
                if (
                  flighthotel_labeldate_departure &&
                  flighthotel_ExteraHoteldate.checkin_datelabel &&
                  flighthotel_ExteraHoteldate.checkin_datelabel !== ""
                ) {
                  flighthotel_labeldate_departure.textContent =
                    flighthotel_ExteraHoteldate.checkin_datelabel;
                }

                const flighthotel_placeholderdate_departure =
                  document.querySelector(
                    "#flightHotelSearch .Wrapper-ExteraHoteldate .departure-date input.Basis_Date_ExteraHoteldate"
                  );
                if (
                  flighthotel_placeholderdate_departure &&
                  flighthotel_ExteraHoteldate.checkin_dateplaceholder &&
                  flighthotel_ExteraHoteldate.checkin_dateplaceholder !== ""
                ) {
                  flighthotel_placeholderdate_departure.placeholder =
                    flighthotel_ExteraHoteldate.checkin_dateplaceholder;
                }

                const flighthotel_labeldate_return = document.querySelector(
                  "#flightHotelSearch .Wrapper-ExteraHoteldate .return-date label > .label-text"
                );
                if (
                  flighthotel_labeldate_return &&
                  flighthotel_ExteraHoteldate.checkout_datelabel &&
                  flighthotel_ExteraHoteldate.checkout_datelabel !== ""
                ) {
                  flighthotel_labeldate_return.textContent =
                    flighthotel_ExteraHoteldate.checkout_datelabel;
                }

                const flighthotel_placeholderdate_return =
                  document.querySelector(
                    "#flightHotelSearch .Wrapper-ExteraHoteldate .return-date input.Basis_Date_ExteraHoteldate"
                  );
                if (
                  flighthotel_placeholderdate_return &&
                  flighthotel_ExteraHoteldate.checkout_dateplaceholder &&
                  flighthotel_ExteraHoteldate.checkout_dateplaceholder !== ""
                ) {
                  flighthotel_placeholderdate_return.placeholder =
                    flighthotel_ExteraHoteldate.checkout_dateplaceholder;
                }
              }

              const flighthotel_search = data.flighthotel.search;
              if (flighthotel_search) {
                const fligh_text_search = document.querySelector(
                  "#flightHotelSearch .reserve-search .search-flighthotel > span"
                );
                if (
                  fligh_text_search &&
                  flighthotel_search.buttonText &&
                  flighthotel_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = flighthotel_search.buttonText;
                }
              }
            }
          }

          // tour start
          if (tour_module == "true") {
            if (data.tour) {
              const tour_destination = data.tour.destination;
              if (tour_destination) {
                const tour_label_departure = document.querySelector(
                  "#tourSearch .departure-route label > .label-text"
                );
                if (
                  tour_label_departure &&
                  tour_destination.labelText &&
                  tour_destination.labelText !== ""
                ) {
                  tour_label_departure.textContent = tour_destination.labelText;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const tour_city_departure = document.querySelector(
                    "#tourSearch .departure-route .auto-fit"
                  );
                  if (
                    tour_city_departure &&
                    tour_destination.tourName &&
                    tour_destination.tourName !== ""
                  ) {
                    tour_city_departure.textContent = tour_destination.tourName;
                  }
                }

                const tour_Input_departure = document.querySelector(
                  "#tourSearch .departure-route input.departure"
                );
                if (
                  tour_Input_departure &&
                  tour_destination.input &&
                  tour_destination.input.placeholder &&
                  tour_destination.input.placeholder !== ""
                ) {
                  tour_Input_departure.placeholder =
                    tour_destination.input.placeholder;
                }
              }

              const tour_dates = data.tour.dates;
              if (tour_dates) {
                const tour_labeldate_departure = document.querySelector(
                  "#tourSearch .departure-date label > .label-text"
                );
                if (
                  tour_labeldate_departure &&
                  tour_dates.departure_datelabel &&
                  tour_dates.departure_datelabel !== ""
                ) {
                  tour_labeldate_departure.textContent =
                    tour_dates.departure_datelabel;
                }

                const tour_placeholderdate_departure = document.querySelector(
                  "#tourSearch .departure-date input.Basis_Date"
                );
                if (
                  tour_placeholderdate_departure &&
                  tour_dates.departure_dateplaceholder &&
                  tour_dates.departure_dateplaceholder !== ""
                ) {
                  tour_placeholderdate_departure.placeholder =
                    tour_dates.departure_dateplaceholder;
                }

                const tour_labeldate_return = document.querySelector(
                  "#tourSearch .return-date label > .label-text"
                );
                if (
                  tour_labeldate_return &&
                  tour_dates.return_datelabel &&
                  tour_dates.return_datelabel !== ""
                ) {
                  tour_labeldate_return.textContent =
                    tour_dates.return_datelabel;
                }

                const tour_placeholderdate_return = document.querySelector(
                  "#tourSearch .return-date input.Basis_Date"
                );
                if (
                  tour_placeholderdate_return &&
                  tour_dates.return_dateplaceholder &&
                  tour_dates.return_dateplaceholder !== ""
                ) {
                  tour_placeholderdate_return.placeholder =
                    tour_dates.return_dateplaceholder;
                }
              }

              const tour_passengers = data.tour.passengers;
              if (tour_passengers) {
                const tour_label_passengers = document.querySelector(
                  "#tourSearch .passengers-field label > .label-text"
                );
                if (
                  tour_label_passengers &&
                  tour_passengers.labelText &&
                  tour_passengers.labelText !== ""
                ) {
                  tour_label_passengers.textContent = tour_passengers.labelText;
                }
              }

              const tour_search = data.tour.search;
              if (tour_search) {
                const fligh_text_search = document.querySelector(
                  "#tourSearch .reserve-search .search-tour > span"
                );
                if (
                  fligh_text_search &&
                  tour_search.buttonText &&
                  tour_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = tour_search.buttonText;
                }
              }
            }
          }

          // insurance start
          if (insurance_module == "true") {
            if (data.insurance) {
              const insurance_destination = data.insurance.destination;
              if (insurance_destination) {
                const insurance_label_departure = document.querySelector(
                  "#insuranceSearch .departure-route label > .label-text"
                );
                if (
                  insurance_label_departure &&
                  insurance_destination.labelText &&
                  insurance_destination.labelText !== ""
                ) {
                  insurance_label_departure.textContent =
                    insurance_destination.labelText;
                }
                const insurance_Input_departure = document.querySelector(
                  "#insuranceSearch .departure-route input.departure"
                );
                if (
                  insurance_Input_departure &&
                  insurance_destination.input &&
                  insurance_destination.input.placeholder &&
                  insurance_destination.input.placeholder !== ""
                ) {
                  insurance_Input_departure.placeholder =
                    insurance_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const insurance_city_departure = document.querySelector(
                    "#insuranceSearch .departure-route .auto-fit"
                  );
                  if (
                    insurance_city_departure &&
                    insurance_destination.countryName &&
                    insurance_destination.countryName !== ""
                  ) {
                    insurance_city_departure.textContent =
                      insurance_destination.countryName;
                  }
                  if (
                    insurance_Input_departure &&
                    insurance_destination.input &&
                    insurance_destination.input.value &&
                    insurance_destination.input.value !== ""
                  ) {
                    insurance_Input_departure.value =
                      insurance_destination.input.value;
                  }
                  const insurance_locationId_departure = document.querySelector(
                    "#insuranceSearch .departure-route .locationId.from"
                  );
                  if (
                    insurance_locationId_departure &&
                    insurance_destination.locationId &&
                    insurance_destination.locationId !== ""
                  ) {
                    insurance_locationId_departure.value =
                      insurance_destination.locationId;
                  }
                }
              }

              const insurance_dates = data.insurance.dates;
              if (insurance_dates) {
                const insurance_labeldate_departure = document.querySelector(
                  "#insuranceSearch .departure-date label > .label-text"
                );
                if (
                  insurance_labeldate_departure &&
                  insurance_dates.departure_datelabel &&
                  insurance_dates.departure_datelabel !== ""
                ) {
                  insurance_labeldate_departure.textContent =
                    insurance_dates.departure_datelabel;
                }

                const insurance_placeholderdate_departure =
                  document.querySelector(
                    "#insuranceSearch .departure-date input.Basis_Date"
                  );
                if (
                  insurance_placeholderdate_departure &&
                  insurance_dates.departure_dateplaceholder &&
                  insurance_dates.departure_dateplaceholder !== ""
                ) {
                  insurance_placeholderdate_departure.placeholder =
                    insurance_dates.departure_dateplaceholder;
                }

                const insurance_labeldate_return = document.querySelector(
                  "#insuranceSearch .return-date label > .label-text"
                );
                if (
                  insurance_labeldate_return &&
                  insurance_dates.return_datelabel &&
                  insurance_dates.return_datelabel !== ""
                ) {
                  insurance_labeldate_return.textContent =
                    insurance_dates.return_datelabel;
                }

                const insurance_placeholderdate_return = document.querySelector(
                  "#insuranceSearch .return-date input.Basis_Date"
                );
                if (
                  insurance_placeholderdate_return &&
                  insurance_dates.return_dateplaceholder &&
                  insurance_dates.return_dateplaceholder !== ""
                ) {
                  insurance_placeholderdate_return.placeholder =
                    insurance_dates.return_dateplaceholder;
                }
              }

              const insurance_passengers = data.insurance.passengers;
              if (insurance_passengers) {
                const insurance_label_passengers = document.querySelector(
                  "#insuranceSearch .passengers-field label > .label-text"
                );
                if (
                  insurance_label_passengers &&
                  insurance_passengers.labelText &&
                  insurance_passengers.labelText !== ""
                ) {
                  insurance_label_passengers.textContent =
                    insurance_passengers.labelText;
                }
              }

              const insurance_search = data.insurance.search;
              if (insurance_search) {
                const fligh_text_search = document.querySelector(
                  "#insuranceSearch .reserve-search .search-insurance > span"
                );
                if (
                  fligh_text_search &&
                  insurance_search.buttonText &&
                  insurance_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = insurance_search.buttonText;
                }
              }
            }
          }

          // cip start
          if (cip_module == "true") {
            if (data.cip) {
              const cip_departure = data.cip.departure;
              if (cip_departure) {
                const cip_label_departure = document.querySelector(
                  "#cipSearch .departure-route label > .label-text"
                );
                if (
                  cip_label_departure &&
                  cip_departure.labelText &&
                  cip_departure.labelText !== ""
                ) {
                  cip_label_departure.textContent = cip_departure.labelText;
                }
                const cip_Input_departure = document.querySelector(
                  "#cipSearch .departure-route input.departure"
                );
                if (
                  cip_Input_departure &&
                  cip_departure.input &&
                  cip_departure.input.placeholder &&
                  cip_departure.input.placeholder !== ""
                ) {
                  cip_Input_departure.placeholder =
                    cip_departure.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const cip_city_departure = document.querySelector(
                    "#cipSearch .departure-route .auto-fit"
                  );
                  if (
                    cip_city_departure &&
                    cip_departure.cityName &&
                    cip_departure.cityName !== ""
                  ) {
                    cip_city_departure.textContent = cip_departure.cityName;
                  }
                  if (
                    cip_Input_departure &&
                    cip_departure.input &&
                    cip_departure.input.value &&
                    cip_departure.input.value !== ""
                  ) {
                    cip_Input_departure.value = cip_departure.input.value;
                  }

                  const cip_locationId_departure = document.querySelector(
                    "#cipSearch .departure-route .locationId.from"
                  );
                  if (
                    cip_locationId_departure &&
                    cip_departure.locationId &&
                    cip_departure.locationId !== ""
                  ) {
                    cip_locationId_departure.value = cip_departure.locationId;
                  }
                }
              }

              const cip_dates = data.cip.dates;
              if (cip_dates) {
                const cip_labeldate_departure = document.querySelector(
                  "#cipSearch .departure-date label > .label-text"
                );
                if (
                  cip_labeldate_departure &&
                  cip_dates.departure_datelabel &&
                  cip_dates.departure_datelabel !== ""
                ) {
                  cip_labeldate_departure.textContent =
                    cip_dates.departure_datelabel;
                }

                const cip_placeholderdate_departure = document.querySelector(
                  "#cipSearch .departure-date input.Basis_Date"
                );
                if (
                  cip_placeholderdate_departure &&
                  cip_dates.departure_dateplaceholder &&
                  cip_dates.departure_dateplaceholder !== ""
                ) {
                  cip_placeholderdate_departure.placeholder =
                    cip_dates.departure_dateplaceholder;
                }
              }

              const cip_traveltype = data.cip.traveltype;
              if (cip_traveltype) {
                const cip_label_traveltype = document.querySelector(
                  "#cipSearch .traveltype-field label > .label-text"
                );
                if (
                  cip_label_traveltype &&
                  cip_traveltype.labelText &&
                  cip_traveltype.labelText !== ""
                ) {
                  cip_label_traveltype.textContent = cip_traveltype.labelText;
                }
              }

              const cip_flighttype = data.cip.flighttype;
              if (cip_flighttype) {
                const cip_label_flighttype = document.querySelector(
                  "#cipSearch .flighttype-field label > .label-text"
                );
                if (
                  cip_label_flighttype &&
                  cip_flighttype.labelText &&
                  cip_flighttype.labelText !== ""
                ) {
                  cip_label_flighttype.textContent = cip_flighttype.labelText;
                }
              }

              const cip_passengers = data.cip.passengers;
              if (cip_passengers) {
                const cip_label_passengers = document.querySelector(
                  "#cipSearch .passengers-field label > .label-text"
                );
                if (
                  cip_label_passengers &&
                  cip_passengers.labelText &&
                  cip_passengers.labelText !== ""
                ) {
                  cip_label_passengers.textContent = cip_passengers.labelText;
                }
              }

              const cip_search = data.cip.search;
              if (cip_search) {
                const fligh_text_search = document.querySelector(
                  "#cipSearch .reserve-search .search-cip > span"
                );
                if (
                  fligh_text_search &&
                  cip_search.buttonText &&
                  cip_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = cip_search.buttonText;
                }
              }
            }
          }
          // visa start
          if (visa_module == "true") {
            if (data.visa) {
              const visa_destination = data.visa.destination;
              if (visa_destination) {
                const visa_label_destination = document.querySelector(
                  "#visaSearch .departure-route label > .label-text"
                );
                if (
                  visa_label_destination &&
                  visa_destination.labelText &&
                  visa_destination.labelText !== ""
                ) {
                  visa_label_destination.textContent =
                    visa_destination.labelText;
                }
                const visa_Input_destination = document.querySelector(
                  "#visaSearch .departure-route input.departure"
                );
                if (
                  visa_Input_destination &&
                  visa_destination.input &&
                  visa_destination.input.placeholder &&
                  visa_destination.input.placeholder !== ""
                ) {
                  visa_Input_destination.placeholder =
                    visa_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const visa_city_destination = document.querySelector(
                    "#visaSearch .departure-route .auto-fit"
                  );
                  if (
                    visa_city_destination &&
                    visa_destination.countryName &&
                    visa_destination.countryName !== ""
                  ) {
                    visa_city_destination.textContent =
                      visa_destination.countryName;
                  }
                  if (
                    visa_Input_destination &&
                    visa_destination.input &&
                    visa_destination.input.value &&
                    visa_destination.input.value !== ""
                  ) {
                    visa_Input_destination.value = visa_destination.input.value;
                  }
                  const visa_locationId_destination = document.querySelector(
                    "#visaSearch .departure-route .locationId.from"
                  );
                  if (
                    visa_locationId_destination &&
                    visa_destination.locationId &&
                    visa_destination.locationId !== ""
                  ) {
                    visa_locationId_destination.value =
                      visa_destination.locationId;
                  }
                }
              }
              const visa_search = data.visa.search;
              if (visa_search) {
                const fligh_text_search = document.querySelector(
                  "#visaSearch .reserve-search .search-visa > span"
                );
                if (
                  fligh_text_search &&
                  visa_search.buttonText &&
                  visa_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = visa_search.buttonText;
                }
              }
            }
          }
          // service start
          if (service_module == "true") {
            if (data.service) {
              const service_destination = data.service.destination;
              if (service_destination) {
                const service_label_destination = document.querySelector(
                  "#serviceSearch .departure-route label > .label-text"
                );
                if (
                  service_label_destination &&
                  service_destination.labelText &&
                  service_destination.labelText !== ""
                ) {
                  service_label_destination.textContent =
                    service_destination.labelText;
                }
                const service_Input_destination = document.querySelector(
                  "#serviceSearch .departure-route input.departure"
                );
                if (
                  service_Input_destination &&
                  service_destination.input &&
                  service_destination.input.placeholder &&
                  service_destination.input.placeholder !== ""
                ) {
                  service_Input_destination.placeholder =
                    service_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const service_city_destination = document.querySelector(
                    "#serviceSearch .departure-route .auto-fit"
                  );
                  if (
                    service_city_destination &&
                    service_destination.cityName &&
                    service_destination.cityName !== ""
                  ) {
                    service_city_destination.textContent =
                      service_destination.cityName;
                  }
                  if (
                    service_Input_destination &&
                    service_destination.input &&
                    service_destination.input.value &&
                    service_destination.input.value !== ""
                  ) {
                    service_Input_destination.value =
                      service_destination.input.value;
                  }
                  const service_locationId_destination = document.querySelector(
                    "#serviceSearch .departure-route .locationId.from"
                  );
                  if (
                    service_locationId_destination &&
                    service_destination.locationId &&
                    service_destination.locationId !== ""
                  ) {
                    service_locationId_destination.value =
                      service_destination.locationId;
                  }
                }
              }

              const service_dates = data.service.dates;
              if (service_dates) {
                const service_labeldate_destination = document.querySelector(
                  "#serviceSearch .departure-date label > .label-text"
                );
                if (
                  service_labeldate_destination &&
                  service_dates.destination_datelabel &&
                  service_dates.destination_datelabel !== ""
                ) {
                  service_labeldate_destination.textContent =
                    service_dates.destination_datelabel;
                }

                const service_placeholderdate_destination =
                  document.querySelector(
                    "#serviceSearch .departure-date input.Basis_Date"
                  );
                if (
                  service_placeholderdate_destination &&
                  service_dates.departure_dateplaceholder &&
                  service_dates.departure_dateplaceholder !== ""
                ) {
                  service_placeholderdate_destination.placeholder =
                    service_dates.departure_dateplaceholder;
                }
              }

              const service_passengers = data.service.passengers;
              if (service_passengers) {
                const service_label_passengers = document.querySelector(
                  "#serviceSearch .passengers-field label > .label-text"
                );
                if (
                  service_label_passengers &&
                  service_passengers.labelText &&
                  service_passengers.labelText !== ""
                ) {
                  service_label_passengers.textContent =
                    service_passengers.labelText;
                }
              }

              const service_search = data.service.search;
              if (service_search) {
                const fligh_text_search = document.querySelector(
                  "#serviceSearch .reserve-search .search-service > span"
                );
                if (
                  fligh_text_search &&
                  service_search.buttonText &&
                  service_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = service_search.buttonText;
                }
              }
            }
          }
          // tran start
          if (train_module == "true") {
            if (data.train) {
              const train_activeType = data.train.activeType;
              if (train_activeType && train_activeType.labelText !== "") {
                const activeLi = document.getElementById(train_activeType);
                if (activeLi) {
                  activeLi.classList.add("active-r-btn");
                  const radio = activeLi.querySelector('input[type="radio"]');
                  if (radio) {
                    activeLi.click();
                  }
                }
              }
              // train departure
              const train_departure = data.train.departure;
              if (train_departure) {
                const train_label_departure = document.querySelector(
                  "#trainSearch .departure-route label > .label-text"
                );
                if (
                  train_label_departure &&
                  train_departure.labelText &&
                  train_departure.labelText !== ""
                ) {
                  train_label_departure.textContent = train_departure.labelText;
                }
                const train_Input_departure = document.querySelector(
                  "#trainSearch .departure-route input.departure"
                );
                if (
                  train_Input_departure &&
                  train_departure.input &&
                  train_departure.input.placeholder &&
                  train_departure.input.placeholder !== ""
                ) {
                  train_Input_departure.placeholder =
                    train_departure.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const train_city_departure = document.querySelector(
                    "#trainSearch .departure-route .auto-fit"
                  );
                  if (
                    train_city_departure &&
                    train_departure.cityName &&
                    train_departure.cityName !== ""
                  ) {
                    train_city_departure.textContent = train_departure.cityName;
                  }
                  if (
                    train_Input_departure &&
                    train_departure.input &&
                    train_departure.input.value &&
                    train_departure.input.value !== ""
                  ) {
                    train_Input_departure.value = train_departure.input.value;
                  }
                  const train_locationId_departure = document.querySelector(
                    "#trainSearch .departure-route .locationId.from"
                  );
                  if (
                    train_locationId_departure &&
                    train_departure.locationId &&
                    train_departure.locationId !== ""
                  ) {
                    train_locationId_departure.value =
                      train_departure.locationId;
                  }
                }
              }

              // train destination
              const train_destination = data.train.destination;
              if (train_destination) {
                const train_label_destination = document.querySelector(
                  "#trainSearch .destination-route label > .label-text"
                );
                if (
                  train_label_destination &&
                  train_destination.labelText &&
                  train_destination.labelText !== ""
                ) {
                  train_label_destination.textContent =
                    train_destination.labelText;
                }
                const train_Input_destination = document.querySelector(
                  "#trainSearch .destination-route input.destination"
                );
                if (
                  train_Input_destination &&
                  train_destination.input &&
                  train_destination.input.placeholder &&
                  train_destination.input.placeholder !== ""
                ) {
                  train_Input_destination.placeholder =
                    train_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const train_city_destination = document.querySelector(
                    "#trainSearch .destination-route .auto-fit"
                  );
                  if (
                    train_city_destination &&
                    train_destination.cityName &&
                    train_destination.cityName !== ""
                  ) {
                    train_city_destination.textContent =
                      train_destination.cityName;
                  }
                  if (
                    train_Input_destination &&
                    train_destination.input &&
                    train_destination.input.value &&
                    train_destination.input.value !== ""
                  ) {
                    train_Input_destination.value =
                      train_destination.input.value;
                  }
                  const train_locationId_destination = document.querySelector(
                    "#trainSearch .destination-route .locationId.to"
                  );
                  if (
                    train_locationId_destination &&
                    train_destination.locationId &&
                    train_destination.locationId !== ""
                  ) {
                    train_locationId_destination.value =
                      train_destination.locationId;
                  }
                }
              }

              const train_dates = data.train.dates;
              if (train_dates) {
                const train_labeldate_departure = document.querySelector(
                  "#trainSearch .departure-date label > .label-text"
                );
                if (
                  train_labeldate_departure &&
                  train_dates.departure_datelabel &&
                  train_dates.departure_datelabel !== ""
                ) {
                  train_labeldate_departure.textContent =
                    train_dates.departure_datelabel;
                }

                const train_placeholderdate_departure = document.querySelector(
                  "#trainSearch .departure-date input.Basis_Date"
                );
                if (
                  train_placeholderdate_departure &&
                  train_dates.departure_dateplaceholder &&
                  train_dates.departure_dateplaceholder !== ""
                ) {
                  train_placeholderdate_departure.placeholder =
                    train_dates.departure_dateplaceholder;
                }

                const train_labeldate_return = document.querySelector(
                  "#trainSearch .return-date label > .label-text"
                );
                if (
                  train_labeldate_return &&
                  train_dates.destination_datelabel &&
                  train_dates.destination_datelabel !== ""
                ) {
                  train_labeldate_return.textContent =
                    train_dates.destination_datelabel;
                }

                const train_placeholderdate_return = document.querySelector(
                  "#trainSearch .return-date input.Basis_Date"
                );
                if (
                  train_placeholderdate_return &&
                  train_dates.destination_dateplaceholder &&
                  train_dates.destination_dateplaceholder !== ""
                ) {
                  train_placeholderdate_return.placeholder =
                    train_dates.destination_dateplaceholder;
                }
              }

              const train_class = data.train.compartment;
              if (train_class) {
                const train_label_compartment = document.querySelector(
                  "#trainSearch .Compartment-field label > .label-text"
                );
                if (
                  train_label_compartment &&
                  train_class.labelText &&
                  train_class.labelText !== ""
                ) {
                  train_label_compartment.textContent = train_class.labelText;
                }
              }

              const train_passengers = data.train.passengers;
              if (train_passengers) {
                const train_label_passengers = document.querySelector(
                  "#trainSearch .passengers-field label > .label-text"
                );
                if (
                  train_label_passengers &&
                  train_passengers.labelText &&
                  train_passengers.labelText !== ""
                ) {
                  train_label_passengers.textContent =
                    train_passengers.labelText;
                }
              }

              const train_search = data.train.search;
              if (train_search) {
                const fligh_text_search = document.querySelector(
                  "#trainSearch .reserve-search .search-train > span"
                );
                if (
                  fligh_text_search &&
                  train_search.buttonText &&
                  train_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = train_search.buttonText;
                }
              }
            }
          }
          // bus start
          if (bus_module == "true") {
            if (data.bus) {
              const bus_activeType = data.bus.activeType;
              if (bus_activeType && bus_activeType.labelText !== "") {
                const activeLi = document.getElementById(bus_activeType);
                if (activeLi) {
                  activeLi.classList.add("active-r-btn");
                  const radio = activeLi.querySelector('input[type="radio"]');
                  if (radio) {
                    activeLi.click();
                  }
                }
              }
              // bus departure
              const bus_departure = data.bus.departure;
              if (bus_departure) {
                const bus_label_departure = document.querySelector(
                  "#busSearch .departure-route label > .label-text"
                );
                if (
                  bus_label_departure &&
                  bus_departure.labelText &&
                  bus_departure.labelText !== ""
                ) {
                  bus_label_departure.textContent = bus_departure.labelText;
                }

                const bus_Input_departure = document.querySelector(
                  "#busSearch .departure-route input.departure"
                );
                if (
                  bus_Input_departure &&
                  bus_departure.input &&
                  bus_departure.input.placeholder &&
                  bus_departure.input.placeholder !== ""
                ) {
                  bus_Input_departure.placeholder =
                    bus_departure.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const bus_city_departure = document.querySelector(
                    "#busSearch .departure-route .auto-fit"
                  );
                  if (
                    bus_city_departure &&
                    bus_departure.cityName &&
                    bus_departure.cityName !== ""
                  ) {
                    bus_city_departure.textContent = bus_departure.cityName;
                  }
                  if (
                    bus_Input_departure &&
                    bus_departure.input &&
                    bus_departure.input.value &&
                    bus_departure.input.value !== ""
                  ) {
                    bus_Input_departure.value = bus_departure.input.value;
                  }
                  const bus_locationId_departure = document.querySelector(
                    "#busSearch .departure-route .locationId.from"
                  );
                  if (
                    bus_locationId_departure &&
                    bus_departure.locationId &&
                    bus_departure.locationId !== ""
                  ) {
                    bus_locationId_departure.value = bus_departure.locationId;
                  }
                }
              }
              // bus destination
              const bus_destination = data.bus.destination;
              if (bus_destination) {
                const bus_label_destination = document.querySelector(
                  "#busSearch .destination-route label > .label-text"
                );
                if (
                  bus_label_destination &&
                  bus_destination.labelText &&
                  bus_destination.labelText !== ""
                ) {
                  bus_label_destination.textContent = bus_destination.labelText;
                }
                const bus_Input_destination = document.querySelector(
                  "#busSearch .destination-route input.destination"
                );
                if (
                  bus_Input_destination &&
                  bus_destination.input &&
                  bus_destination.input.placeholder &&
                  bus_destination.input.placeholder !== ""
                ) {
                  bus_Input_destination.placeholder =
                    bus_destination.input.placeholder;
                }
                if (document.querySelector("#empty-fields").value !== "true") {
                  const bus_city_destination = document.querySelector(
                    "#busSearch .destination-route .auto-fit"
                  );
                  if (
                    bus_city_destination &&
                    bus_destination.cityName &&
                    bus_destination.cityName !== ""
                  ) {
                    bus_city_destination.textContent = bus_destination.cityName;
                  }
                  if (
                    bus_Input_destination &&
                    bus_destination.input &&
                    bus_destination.input.value &&
                    bus_destination.input.value !== ""
                  ) {
                    bus_Input_destination.value = bus_destination.input.value;
                  }
                  const bus_locationId_destination = document.querySelector(
                    "#busSearch .destination-route .locationId.to"
                  );
                  if (
                    bus_locationId_destination &&
                    bus_destination.locationId &&
                    bus_destination.locationId !== ""
                  ) {
                    bus_locationId_destination.value =
                      bus_destination.locationId;
                  }
                }
              }
              const bus_dates = data.bus.dates;
              if (bus_dates) {
                const bus_labeldate_departure = document.querySelector(
                  "#busSearch .departure-date label > .label-text"
                );
                if (
                  bus_labeldate_departure &&
                  bus_dates.departure_datelabel &&
                  bus_dates.departure_datelabel !== ""
                ) {
                  bus_labeldate_departure.textContent =
                    bus_dates.departure_datelabel;
                }

                const bus_placeholderdate_departure = document.querySelector(
                  "#busSearch .departure-date input.Basis_Date"
                );
                if (
                  bus_placeholderdate_departure &&
                  bus_dates.departure_dateplaceholder &&
                  bus_dates.departure_dateplaceholder !== ""
                ) {
                  bus_placeholderdate_departure.placeholder =
                    bus_dates.departure_dateplaceholder;
                }

                const bus_labeldate_destination = document.querySelector(
                  "#busSearch .return-date label > .label-text"
                );
                if (
                  bus_labeldate_destination &&
                  bus_dates.destination_datelabel &&
                  bus_dates.destination_datelabel !== ""
                ) {
                  bus_labeldate_destination.textContent =
                    bus_dates.destination_datelabel;
                }

                const bus_placeholderdate_destination = document.querySelector(
                  "#busSearch .return-date input.Basis_Date"
                );
                if (
                  bus_placeholderdate_destination &&
                  bus_dates.departure_dateplaceholder &&
                  bus_dates.departure_dateplaceholder !== ""
                ) {
                  bus_placeholderdate_destination.placeholder =
                    bus_dates.departure_dateplaceholder;
                }
              }
              const bus_search = data.bus.search;
              if (bus_search) {
                const fligh_text_search = document.querySelector(
                  "#busSearch .reserve-search .search-bus > span"
                );
                if (
                  fligh_text_search &&
                  bus_search.buttonText &&
                  bus_search.buttonText !== ""
                ) {
                  fligh_text_search.textContent = bus_search.buttonText;
                }
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error("JSON:", error);
      });

    function reorderMulticityFields(data) {
      if (data) {
        const container = document.querySelector(".multiroute-fields");
        if (container) {
          const topElement = data.flight["multiroute_fields"]["order_elements"];
          const subFlightclass =
            data.flight["multiroute_fields"]["order_flightclasspassengers"];
          const subAddRemove =
            data.flight["multiroute_fields"]["order_addremove"];
          if (topElement && topElement !== "") {
            const topLevelOrder =
              data.flight["multiroute_fields"]["order_elements"].split(",");
            const topLevelMap = {};
            container.querySelectorAll("[data-key]").forEach((el) => {
              const key = el.getAttribute("data-key");
              topLevelMap[key] = el;
            });
            topLevelOrder.forEach((key) => {
              const el = topLevelMap[key];
              if (el) {
                container.appendChild(el);
              }
            });
          }
          if (subFlightclass && subFlightclass !== "") {
            const subOrder_Flightclass =
              data.flight["multiroute_fields"][
                "order_flightclasspassengers"
              ].split(",");
            const flightContainer = container.querySelector(
              '[data-key="Flightclass-Passenger"]'
            );
            if (flightContainer && subOrder_Flightclass.length > 0) {
              const map = {};
              flightContainer.querySelectorAll("[data-key]").forEach((el) => {
                const key = el.getAttribute("data-key");
                map[key] = el;
              });
              subOrder_Flightclass.forEach((key) => {
                if (map[key]) {
                  flightContainer.appendChild(map[key]);
                }
              });
            }
          }
          if (subAddRemove && subAddRemove !== "") {
            const subOrder_AddRemove =
              data.flight["multiroute_fields"]["order_addremove"].split(",");
            const addRemoveContainer = container.querySelector(
              '[data-key="Add-Remove"] div'
            );
            if (addRemoveContainer && subOrder_AddRemove.length > 0) {
              const map = {};
              addRemoveContainer
                .querySelectorAll("[data-key]")
                .forEach((el) => {
                  const key = el.getAttribute("data-key");
                  map[key] = el;
                });

              subOrder_AddRemove.forEach((key) => {
                if (map[key]) {
                  addRemoveContainer.appendChild(map[key]);
                }
              });
            }
          }
        }
      }
    }

    function resetMulticityOrder() {
      const container = document.querySelector("#flightSearch");
      const basisDateBox = container?.querySelector(
        "#flightSearch .Basis_Date_Box"
      );
      if (!container || !basisDateBox) return;
      const defaultTopLevel = ["Flightclass-Passenger", "reserve-search"];
      const defaultFlightOrder = ["flightclass-field", "passengers-field"];
      const elementsMap = {};
      container.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        elementsMap[key] = el;
      });
      let lastInserted = basisDateBox;
      defaultTopLevel.forEach((key) => {
        const el = elementsMap[key];
        if (el) {
          if (key === "Flightclass-Passenger") {
            const innerMap = {};
            el.querySelectorAll("[data-key]").forEach((child) => {
              const innerKey = child.getAttribute("data-key");
              innerMap[innerKey] = child;
            });
            defaultFlightOrder.forEach((innerKey) => {
              if (innerMap[innerKey]) el.appendChild(innerMap[innerKey]);
            });
          }
          lastInserted.insertAdjacentElement("afterend", el);
          lastInserted = el;
        }
      });
    }
    // Dynamic Data End
  }
}
