// global variable
const isMobile = document.querySelector('[data-mob]')?.dataset?.mob === "true";
let langid;


let FlightChunckStatus = false;
let FlightChunckbool = false;

// function useFlightChunck(enabled = true) {
//   FlightChunckStatus = !!enabled;
// }

if (document.querySelector(".search-box-container").classList.contains("en")) {
   langid = 2;
} else if (
   document.querySelector(".search-box-container").classList.contains("ar")
) {
   langid = 3;
} else {
   langid = 1;
}
//<!----------------START JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->
const JalaliDate = {
   g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
   j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],

   // الگوی سال‌های کبیسه جلالی (چرخه 33 ساله)
   isLeapJalali(year) {
      const mod = Number(year) % 33;
      return [1, 5, 9, 13, 17, 22, 26, 30].includes(mod);
   },

   // تبدیل جلالی → میلادی؛ خروجی: "YYYY-MM-DD"
   JalaliToGregorian(j_y, j_m, j_d) {
      let jy = parseInt(j_y, 10);
      let jm = parseInt(j_m, 10) - 1; // 0-based
      let jd = parseInt(j_d, 10) - 1; // 0-based

      jy -= 979;
      let j_day_no =
         365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);

      // مجموع روزهای ماه‌های گذشته + روز جاری
      for (let i = 0; i < jm; i++) j_day_no += this.j_days_in_month[i];
      j_day_no += jd;

      // جابجایی به مبنای میلادی
      let g_day_no = j_day_no + 79;

      let gy = 1600 + Math.floor(g_day_no / 146097) * 400;
      g_day_no %= 146097;

      let leap = true;
      if (g_day_no >= 36525) {
         g_day_no--;
         gy += Math.floor(g_day_no / 36524) * 100;
         g_day_no %= 36524;

         if (g_day_no >= 365) g_day_no++;
         else leap = false;
      }

      gy += Math.floor(g_day_no / 1461) * 4;
      g_day_no %= 1461;

      if (g_day_no >= 366) {
         leap = false;
         g_day_no--;
         gy += Math.floor(g_day_no / 365);
         g_day_no %= 365;
      }

      const monthLengths = this.g_days_in_month.slice();
      if (leap) monthLengths[1] = 29;

      let gm = 0;
      while (g_day_no >= monthLengths[gm]) {
         g_day_no -= monthLengths[gm];
         gm++;
      }
      const gd = g_day_no + 1;

      const mm = String(gm + 1).padStart(2, "0");
      const dd = String(gd).padStart(2, "0");

      return `${gy}-${mm}-${dd}`;
   },

   // اعتبارسنجی اختیاری تاریخ جلالی "YYYY-MM-DD"
   isPersianDate(dateStr) {
      const m = /^\d{4}-\d{2}-\d{2}$/.exec(dateStr);
      if (!m) return false;

      const [y, mth, d] = dateStr.split("-").map(Number);
      if (y < 1 || mth < 1 || mth > 12) return false;

      let maxDays = this.j_days_in_month[mth - 1];
      if (mth === 12 && this.isLeapJalali(y)) maxDays = 30;

      return d >= 1 && d <= maxDays;
   },
};
/**
 * تبدیل تاریخ جلالی به میلادی
 * @param {string} date "YYYY-MM-DD" (با اعداد فارسی/عربی هم اوکی است)
 * @returns {string} "YYYY-MM-DD" میلادی یا "" اگر نامعتبر
 */
function convert_jalali_toGregorian(date) {
   if (!date) return "";
   const normalized = normalizeJalaliInput(date);

   const [jy, jm, jd] = normalized.split("-");
   // اگر خواستی نامعتبرها خالی برگردند، خط زیر را باز کن:
   // if (!JalaliDate.isPersianDate(`${jy}-${jm}-${jd}`)) return "";

   return JalaliDate.JalaliToGregorian(jy, jm, jd);
}

function form_search_isSubmited(element, event, isFlightChunck) {

   FlightChunckbool = isFlightChunck;

   let isValid = true;
   element
      .querySelectorAll("input[name=fdate],input[name=tdate]")
      .forEach((e) => {
         if (e.value == "" && !e.disabled) {
            event.preventDefault();
            e.closest(".reserve-field").style.border = "1px solid #f42e36";
            isValid = false;
         }
      });
   if (element.querySelector("input[name=Hotel-Date]")) {
      if (element.querySelector("input[name=Hotel-Date]").value == 1) {
         element
            .querySelectorAll("input[name=checkin],input[name=checkout]")
            .forEach((e) => {
               if (e.value == "" && !e.disabled) {
                  event.preventDefault();
                  e.closest(".reserve-field").style.border = "1px solid #f42e36";
                  isValid = false;
               }
            });
      }
   }
   if (element.querySelector(".tour-search-text")) {
      element.querySelectorAll(".tour-search-text").forEach((e) => {
         if (e.value == "") {
            event.preventDefault();
            e.closest(".reserve-field").style.border = "1px solid #f42e36";
            isValid = false;
         }
      });
   }
   if (element.getAttribute("data-form") == "cip") {
      var ad = parseInt(element.querySelector(".adultcount").value),
         inf = 0,
         valueAdded = 1,
         ch = 0,
         sum = 0;
      element
         .querySelector(".section-select-age")
         .querySelectorAll("select")
         .forEach((e) => {
            var age = parseInt(e.value);
            ch += valueAdded;
            if (age < 3) {
               inf += valueAdded;
            }
         });
      sum = parseInt(ad + ch);
      if (inf > ad || sum > 10) {
         isValid = false;
         event.preventDefault();
      }
   }
   if (element.getAttribute("data-form") == "multi") {
      if (
         document.querySelector(".search-box-container").classList.contains("en")
      ) {
         var destination_nth_txt = [
            "First destination",
            "Second destination",
            "Third destination",
            "Fourth destination",
         ];
      } else if (
         document.querySelector(".search-box-container").classList.contains("ar")
      ) {
         var destination_nth_txt = [
            "الوجهة الأولى",
            "الوجهة الثانية",
            "الوجهة الثالثة",
            "الوجهة الرابعة",
         ];
      } else {
         var destination_nth_txt = [
            "مقصد اول",
            "مقصد دوم",
            "مقصد سوم",
            "مقصد چهارم",
         ];
      }
      const routeContents = element.getElementsByClassName("route-content");
      for (let e = 0; e < routeContents.length; e++) {
         const routeContent = routeContents[e];
         routeContent
            .querySelector(".departure-route .locationId")
            .setAttribute("name", `_root.route__${e}.fromcity`);
         routeContent
            .querySelector(".destination-route .locationId")
            .setAttribute("name", `_root.route__${e}.tocity`);
         routeContent
            .querySelector(".start_date")
            .setAttribute("name", `_root.route__${e}.departuredate`);
         routeContent
            .querySelector(".departure")
            .setAttribute("name", `_root.route__${e}.fromcityName`);
         routeContent
            .querySelector(".destination")
            .setAttribute("name", `_root.route__${e}.tocityName`);
         routeContent
            .querySelector(".multi-route-tlt")
            .insertAdjacentHTML(
               "beforeend",
               `<input type="hidden" value="${destination_nth_txt[e]}" name="_root.route__${e}.index"/>`
            );
      }
   }
   if (
      element.getAttribute("data-form") == "hotel" ||
      element.getAttribute("data-form") == "flighthotel" ||
      element.getAttribute("data-form") == "tour"
   ) {
      let childcountandage = element.querySelector(".childcountandage").value;
      if (childcountandage == "0,") {
         element.querySelector(".childcountandage").value = 0;
      }
      element.querySelectorAll(".contentRoom").forEach((e) => {
         let childCount = e.querySelector(".childcount").value,
            childAge = "";
         e.querySelectorAll(".createChildDropdown").forEach((ie) => {
            childAge += "," + ie.querySelector("select").value;
         });
         e.querySelector(".childcountandage").value = childCount + childAge;
      });
   }
   if (element.getAttribute("data-form") == "insurance") {
      element.querySelectorAll(".passenger-bithdate").forEach((e) => {
         if (e.value == "") {
            if (element.querySelector(".passengerbox")) {
               element.querySelector(".passengerbox").classList.remove("hidden");
            }
            event.preventDefault();
            e.closest(".createPassengerDropdown")
               .querySelectorAll("input")
               .forEach((input) => {
                  input.classList.add("complete-birthdate");
               });
            isValid = false;
         } else {
            e.closest(".createPassengerDropdown")
               .querySelectorAll("input")
               .forEach((input) => {
                  input.classList.remove("complete-birthdate");
               });
         }
      });
   }
   if (element.getAttribute("data-form") == "train") {
      var ad = parseInt(element.querySelector(".adultcount").value),
         inf = 0,
         valueAdded = 1,
         ch = 0,
         sum = 0;
      element
         .querySelector(".section-select-age")
         .querySelectorAll("select")
         .forEach((e) => {
            var age = parseInt(e.value);
            ch += valueAdded;
            if (age < 3) {
               inf += valueAdded;
            }
         });
      sum = parseInt(ad + ch);
      if (inf > ad || sum > 10) {
         isValid = false;
         event.preventDefault();
      }
   }
   if (isValid) {
      let georgiaDate = "";
      let georgiaDate_splited = "";

      if (element.querySelector("input[name=fdate]")) {
         if (element.querySelector("input[name=fdate]").value) {
            georgiaDate = element.querySelector("input[name=fdate]").value;

            georgiaDate_splited = georgiaDate.split("-");
         }
      }

      if (
         parseInt(georgiaDate_splited[0]) > 1300 &&
         parseInt(georgiaDate_splited[0]) < 1500
      ) {
         georgiaDate = convert_jalali_toGregorian(georgiaDate);
      }
      var searchLang = "fa";
      if (
         document.querySelector(".search-box-container").classList.contains("en")
      ) {
         var searchLang = "en";
      } else if (
         document.querySelector(".search-box-container").classList.contains("ar")
      ) {
         var searchLang = "ar";
      }
      if (element.getAttribute("data-form") == "flight") {
         // helper: normalize truthy flags like true / "true" / 1 / "1" to a boolean true
         const isTrue = v => v === true || v === 'true' || v === 1 || v === '1';

         let flightaction;
         let chunkuse;
         if (isTrue(isFlightChunck)) {
            const isB2B = isTrue(element.dataset.b2b); // data-b2b="true|false"
            const isMob = isTrue(element.dataset.mob); // data-mob="true|false"
            // if not B2B -> /flight/search
            // if B2B and mob=true -> /flight/search
            // else (B2B and mob!=true) -> /flight/search/B2B
            flightaction = (!isB2B || isMob) ? '/flight/search' : '/flight/search/B2B';
            chunkuse = true;
         } else {
            // not a flight chunk: use form's action (fallback to /flight/search)
            flightaction = element.getAttribute('action');
            chunkuse = false;

         }

         //add new
         let ageString = "";
         const childCount =
            parseInt(element.querySelector(".childcount").value, 10) || 0;
         const infantCount =
            parseInt(element.querySelector(".infantcount").value, 10) || 0;
         const childAge = 3;
         const infantAge = 1;
         let sumCount = [];
         sumCount.push(...Array.from({ length: childCount }, () => childAge));
         sumCount.push(...Array.from({ length: infantCount }, () => infantAge));
         ageString = sumCount.join(",");
         if (ageString !== "") {
            const selectAgeValue = element.querySelector(".select-age-value");
            selectAgeValue.value = ageString;
         }
         /////
         var flight = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`,
               },
               date: {
                  start: `${element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").value}`,
               },
               flightClass: `${element.querySelector(".FlightClass-value").value}`,
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",") > 0
                     ? element.querySelector(".childcount").value.slice(0, -1)
                     : element.querySelector(".childcount").value
                     }`,
                  infant: `${element.querySelector(".infantcount").value.indexOf(",") > 0
                     ? element.querySelector(".infantcount").value.slice(0, -1)
                     : element.querySelector(".infantcount").value
                     }`,
                  ages: `${element.querySelector(".select-age-value").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent").value}`,
               georgiaDate: georgiaDate,
               action: flightaction,
               chunkuse: chunkuse,
               method: `${element.getAttribute("method")}`,
               flightType: `${element.getAttribute("data-flightType")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(flight, "flight");
      } else if (element.getAttribute("data-form") == "multi") {

         const isTrue = v => v === true || v === 'true' || v === 1 || v === '1';

         let flightaction;
         let chunkuse;
         let chunkstatus = document.getElementById("multi").getAttribute("chunk");




         if (isTrue(chunkstatus)) {
            const isB2B = isTrue(element.dataset.b2b); // data-b2b="true|false"
            const isMob = isTrue(element.dataset.mob); // data-mob="true|false"
            // if not B2B -> /flight/search
            // if B2B and mob=true -> /flight/search
            // else (B2B and mob!=true) -> /flight/search/B2B
            flightaction = (!isB2B || isMob) ? '/flight/search' : '/flight/search/B2B';
            chunkuse = true;
         } else {
            // not a flight chunk: use form's action (fallback to /flight/search)
            flightaction = element.getAttribute('action');
            chunkuse = false;

         }





         const routeContents = element.getElementsByClassName("route-content");
         const routes = [];
         for (let i = 0; i < routeContents.length; i++) {
            const content = routeContents[i];
            routes.push({
               departure: {
                  name: content.querySelector(".departure").value,
                  id: content.querySelector(".from").value,
               },
               destination: {
                  name: content.querySelector(".destination").value,
                  id: content.querySelector(".to").value,
               },
               date: {
                  start: content.querySelector(".start_date").value,
               },
               index: {
                  text: content.querySelector(".multi-route-tlt").innerText,
               },
            });
            georgiaDate = routeContents[0].querySelector(".start_date").value;


            georgiaDate_splited = georgiaDate.split("-");
            if (
               parseInt(georgiaDate_splited[0]) > 1300 &&
               parseInt(georgiaDate_splited[0]) < 1500
            ) {
               georgiaDate = convert_jalali_toGregorian(georgiaDate);
            }
         }
         //add new
         if (element.querySelector(".select-age-value").value !== 0) {
            let ageString = "";
            const childCount =
               parseInt(element.querySelector(".childcount").value, 10) || 0;
            const infantCount =
               parseInt(element.querySelector(".infantcount").value, 10) || 0;
            const childAge = 3;
            const infantAge = 1;
            let sumCount = [];
            sumCount.push(...Array.from({ length: childCount }, () => childAge));
            sumCount.push(...Array.from({ length: infantCount }, () => infantAge));
            ageString = sumCount.join(",");
            if (ageString !== "") {
               const selectAgeValue = element.querySelector(".select-age-value");
               selectAgeValue.value = ageString;
            }
         }
         /////
         var multi = {
            value: {
               routes: routes,
               flightClass: `${element.querySelector(".FlightClass-value").value}`,
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",") > 0
                     ? element.querySelector(".childcount").value.slice(0, -1)
                     : element.querySelector(".childcount").value
                     }`,
                  infant: `${element.querySelector(".infantcount").value.indexOf(",") > 0
                     ? element.querySelector(".infantcount").value.slice(0, -1)
                     : element.querySelector(".infantcount").value
                     }`,
                  ages: `${element.querySelector(".select-age-value").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent").value}`,
               georgiaDate: georgiaDate,
               action: flightaction,
               chunkuse: chunkuse,
               method: `${element.getAttribute("method")}`,
               flightType: `${element.getAttribute("data-flightType")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(multi, "multi");
      } else if (element.getAttribute("data-form") == "hotel") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach((e) => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj);
         });
         const hotel = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               date: {
                  start: `${element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").value}`,
               },
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         // add nationality if input exists
         const nationalityInput = element.querySelector(
            'input[name="nationality"]'
         );
         if (nationalityInput) {
            const closestReserve = nationalityInput.closest(".reserve-field");
            const departureValue = closestReserve
               ? closestReserve.querySelector(".departure")?.value || ""
               : "";
            hotel.value.nationality = {
               id: nationalityInput.value,
               name: departureValue,
            };
         }
         // add hotelname if input exists
         const hotelnameInput = element.querySelector('input[name="hotelid"]');
         const closestReserve = hotelnameInput ? hotelnameInput.closest(".reserve-field") : null;
         const departureValue = closestReserve ? closestReserve.querySelector(".departure")?.value || "" : "";

         if (hotelnameInput && (hotelnameInput.value || departureValue)) {
            hotel.value.hotelname = {
               id: hotelnameInput.value,
               name: departureValue
            };

         }
         set_searchHistory(hotel, "hotel");
      } else if (element.getAttribute("data-form") == "flighthotel") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach((e) => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj);
         });
         const flighthotel = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
                  end: `${element
                     .querySelector(".end_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".end_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".end_date").value
                     }`,
               },
               flightClass: `${element.querySelector(".FlightClass-value").value}`,
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(flighthotel, "flighthotel");
      } else if (element.getAttribute("data-form") == "tour") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach((e) => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj);
         });
         const getVal = (name) =>
            element.querySelector(`input[name="${name}"]`)?.value?.trim() ?? "";
         const tour = {
            value: {
               departure: {
                  name: getVal("tour-search-text"),
                  id: getVal("tourname"),
                  ...(element.querySelector('input[name="fromtour-search-text"]')
                     ? {
                        fromName: getVal("fromtour-search-text"),
                        fromId: getVal("fromtourcity"),
                     }
                     : {}),
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
                  end: `${element
                     .querySelector(".end_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".end_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".end_date").value
                     }`,
               },
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(tour, "tour");
      } else if (element.getAttribute("data-form") == "insurance") {
         let passenger_birthday = "";
         element.querySelectorAll(".createPassengerDropdown").forEach((e) => {
            passenger_birthday =
               passenger_birthday +
               '"' +
               e.querySelector(".passenger-bithdate").value +
               '"' +
               ",";
         });
         element.querySelector(".birthday").value = passenger_birthday;
         var val_1 = element.querySelector(".birthday").value;
         var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
         element.querySelector(".birthday").value = val_2;
         const insurance = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
                  end: `${element
                     .querySelector(".end_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".end_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".end_date").value
                     }`,
               },
               passengers: `${element.querySelector(".birthday").value}`,
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(insurance, "insurance");
      } else if (element.getAttribute("data-form") == "cip") {
         let select_age = "";
         element
            .querySelector(".section-select-age")
            .querySelectorAll("select")
            .forEach((e) => {
               select_age += e.value + ",";
            });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2;
         } else {
            element.querySelector(".select-age-value").value = 0;
         }
         const cip = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
               },
               traveltype: `${element.querySelector(".traveltype-value").value}`,
               flighttype: `${element.querySelector(".flighttype-value").value}`,
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",") > 0
                     ? element.querySelector(".childcount").value.slice(0, -1)
                     : element.querySelector(".childcount").value
                     }`,
                  ages: `${element.querySelector(".select-age-value").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(cip, "cip");
      } else if (element.getAttribute("data-form") == "visa") {
         const visa = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(visa, "visa");
      } else if (element.getAttribute("data-form") == "service") {
         //add new
         let ageString = "";
         const childCount =
            parseInt(element.querySelector(".childcount").value, 10) || 0;
         const infantCount =
            parseInt(element.querySelector(".infantcount").value, 10) || 0;
         const childAge = 3;
         const infantAge = 1;
         let sumCount = [];
         sumCount.push(...Array.from({ length: childCount }, () => childAge));
         sumCount.push(...Array.from({ length: infantCount }, () => infantAge));
         ageString = sumCount.join(",");
         if (ageString !== "") {
            const selectAgeValue = element.querySelector(".select-age-value");
            selectAgeValue.value = ageString;
         }
         /////
         const service = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
               },
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",") > 0
                     ? element.querySelector(".childcount").value.slice(0, -1)
                     : element.querySelector(".childcount").value
                     }`,
                  infant: `${element.querySelector(".infantcount").value.indexOf(",") > 0
                     ? element.querySelector(".infantcount").value.slice(0, -1)
                     : element.querySelector(".infantcount").value
                     }`,
                  ages: `${element.querySelector(".select-age-value").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(service, "service");
      } else if (element.getAttribute("data-form") == "train") {
         let select_age = "";
         element
            .querySelector(".section-select-age")
            .querySelectorAll("select")
            .forEach((e) => {
               select_age += e.value + ",";
            });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2;
         } else {
            element.querySelector(".select-age-value").value = 0;
         }
         const train = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
                  end: `${element
                     .querySelector(".end_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".end_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".end_date").value
                     }`,
               },
               CompartmentType: `${element.querySelector(".Compartment-value").value
                  }`,
               PrivateCompartment: `${element.querySelector(".PrivateCompartment").value
                  }`,
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",") > 0
                     ? element.querySelector(".childcount").value.slice(0, -1)
                     : element.querySelector(".childcount").value
                     }`,
                  ages: `${element.querySelector(".select-age-value").value}`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               trainType: `${element.getAttribute("data-trainType")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(train, "train");
      } else if (element.getAttribute("data-form") == "bus") {
         const bus = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`,
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`,
               },
               date: {
                  start: `${element
                     .querySelector(".start_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".start_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".start_date").value
                     }`,
                  end: `${element
                     .querySelector(".end_date")
                     .closest("div")
                     .querySelector(".date-value")
                     ? element
                        .querySelector(".end_date")
                        .closest("div")
                        .querySelector(".date-value").value
                     : element.querySelector(".end_date").value
                     }`,
               },
               persiancurrent: `${element.querySelector(".persiancurrent")
                  ? element.querySelector(".persiancurrent").value
                  : element.querySelector(".currentdate").value
                  }`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               busType: `${element.getAttribute("data-busType")}`,
               dataform: `${element.getAttribute("data-form")}`,
               SchemaId: `${element.getAttribute("data-schema")}`,
               searchLang: `${searchLang}`,
            },
            time: new Date().getTime(),
            // expire: new Date(georgiaDate).getTime(),
            expire: endOfDayLocalFromYMD(georgiaDate),
         };
         set_searchHistory(bus, "bus");
      }
      // new code for flight chunck api
      if (isFlightChunck === "true" || isFlightChunck === true) {
         event.preventDefault();
         const formType = element.getAttribute("data-form");

         if (["multi", "flight"].includes(formType)) {
            const schemaId = (() => {
               const mapping = {
                  oneway: 291,
                  backtoback: 290,
                  multi: 292,
               };

               const activeItem = document.querySelector(
                  "ul.flighttype-items-ul li.active-r-btn"
               );
               return activeItem ? mapping[activeItem.id] : null;
            })();

            // Create an array for the trip details, starting with the initial leg
            let TripGroup = [];
            if (schemaId == 291) {
               TripGroup = [
                  {
                     Origin: element.querySelector(".from").value,
                     Destination: element.querySelector(".to").value,
                     OriginName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     DestinationName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     DepartureDate:
                        element.querySelector(".start_date").dataset.gregorian
                     ,
                  },
               ];
            } else if (schemaId == 290) {
               TripGroup = [
                  {
                     Origin: element.querySelector(".from").value,
                     Destination: element.querySelector(".to").value,
                     OriginName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     DestinationName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     DepartureDate:
                        element.querySelector(".start_date").dataset.gregorian
                     ,
                  },
                  {
                     Origin: element.querySelector(".to").value,
                     Destination: element.querySelector(".from").value,
                     OriginName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     DestinationName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     DepartureDate:
                        element.querySelector(".end_date").dataset.gregorian
                     ,
                  },
               ];
            } else {
               const routeContainer = element.querySelectorAll(".route-content");
               routeContainer.forEach((route, index) => {
                  // Correct the loop condition and start from 0
                  TripGroup.push({
                     Origin: route.querySelector(".from").value,
                     Destination: route.querySelector(".to").value,
                     OriginName: extractCityName(
                        route.querySelector(".departure").value
                     ),
                     DestinationName: extractCityName(
                        route.querySelector(".destination").value
                     ),
                     DepartureDate:
                        route.querySelector(".start_date").dataset.gregorian
                     ,
                  });
               });
            }

            // Create the search request body with the trip details
            sessionStorage.removeItem("sessionSearch");
            const flightSearch = {

               TripGroup: TripGroup,
               CabinClass: `${element.querySelector(".FlightClass-value").value}`,
               Adults: `${element.querySelector(".adultcount").value}`,
               Children: `${element.querySelector(".childcount").value}`,
               Infants: `${element.querySelector(".infantcount").value}`,
               rkey: getSearchCookie("rkey") || "",
               dmnid: document.querySelector(".search-nav").dataset.dmnid,
               SchemaId: schemaId,
               Type: "flight",
               share: document.querySelector(".share")
                  ? document.querySelector(".share").value
                  : "",
               lid: getLidFromScriptUrl(),
            };
            const urlParams = new URLSearchParams(window.location.search);
            const mobile = urlParams.get('mobile');
            const nationalCode = urlParams.get('nationalCode');
            if (mobile && nationalCode) {
               flightSearch.extraParams = {
                  mobile: mobile,
                  nationalCode: nationalCode,
                  engine: 3,
               };
            }
            sessionStorage.setItem("sessionSearch", JSON.stringify(flightSearch));
            // helper: normalize truthy flags like true / "true" / 1 / "1" to boolean true
            const isTrue = v => v === true || v === 'true' || v === 1 || v === '1';

            const isB2B = isTrue(element.dataset.b2b); // data-b2b="true|false"
            const isMob = isTrue(element.dataset.mob); // data-mob="true|false"

            // if not B2B -> /flight/search
            // if B2B and mob=true -> /flight/search
            // else (B2B and mob!=true) -> /flight/search/B2B
            const target = (!isB2B || isMob) ? '/flight/search' : '/flight/search/B2B';

            window.location.href = target;

         } else if (["bus"].includes(formType)) {
            const schemaId = (() => {
               const mapping = {
                  "oneway-bus": 391,
                  "backtoback-bus": 390,
               };

               const activeItem = document.querySelector(
                  "ul.bustype-items-ul li.active-r-btn"
               );
               return activeItem ? mapping[activeItem.id] : null;
            })();
            let tripGroup = [];
            if (schemaId == 391) {
               tripGroup = [
                  {
                     origin: element.querySelector(".from").value,
                     destination: element.querySelector(".to").value,
                     originName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     destinationName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     departureDate:
                        element.querySelector(".start_date").dataset.gregorian
                     ,
                  },
               ];
            } else {
               tripGroup = [
                  {
                     Origin: element.querySelector(".from").value,
                     Destination: element.querySelector(".to").value,
                     OriginName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     DestinationName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     DepartureDate:
                        element.querySelector(".start_date").dataset.gregorian
                     ,
                  },
                  {
                     Origin: element.querySelector(".to").value,
                     Destination: element.querySelector(".from").value,
                     OriginName: extractCityName(
                        element.querySelector(".destination").value
                     ),
                     DestinationName: extractCityName(
                        element.querySelector(".departure").value
                     ),
                     DepartureDate:
                        element.querySelector(".end_date").dataset.gregorian
                     ,
                  },
               ];
            }
            // Create the search request body with the trip details
            const busSearch = {
               tripGroup: tripGroup,
               rkey: getSearchCookie("rkey") || "",
               dmnid: document.querySelector(".search-nav").dataset.dmnid,
               Type: "bus",
               SchemaId: schemaId,
               lid: "1",
            };
            sessionStorage.setItem("sessionSearch", JSON.stringify(busSearch));
            window.location.href = "/bus/search";
         }
      }
   }
}
function bus_search_isSubmited(element, event, isFlightChunck) {
   // new code for flight chunck api
   if (isFlightChunck === "true" || isFlightChunck === true) {
      event.preventDefault();
      const schemaId = (() => {
         const mapping = {
            oneway: 391,
            backtoback: 390,
         };

         const activeItem = document.querySelector(
            "ul.bustype-items-ul li.active-r-btn"
         );
         return activeItem ? mapping[activeItem.id] : null;
      })();
      let tripGroup = [];
      if (schemaId == 391) {
         tripGroup = [
            {
               origin: element.querySelector(".from").value,
               destination: element.querySelector(".to").value,
               originName: extractCityName(
                  element.querySelector(".departure").value
               ),
               destinationName: extractCityName(
                  element.querySelector(".destination").value
               ),
               departureDate:
                  element.querySelector(".start_date").dataset.gregorian
               ,
            },
         ];
      } else {
         tripGroup = [
            {
               Origin: element.querySelector(".from").value,
               Destination: element.querySelector(".to").value,
               OriginName: extractCityName(
                  element.querySelector(".departure").value
               ),
               DestinationName: extractCityName(
                  element.querySelector(".destination").value
               ),
               DepartureDate:
                  element.querySelector(".start_date").dataset.gregorian
               ,
            },
            {
               Origin: element.querySelector(".to").value,
               Destination: element.querySelector(".from").value,
               OriginName: extractCityName(
                  element.querySelector(".destination").value
               ),
               DestinationName: extractCityName(
                  element.querySelector(".departure").value
               ),
               DepartureDate:
                  element.querySelector(".end_date").dataset.gregorian
               ,
            },
         ];
      }
      // Create the search request body with the trip details
      const busSearch = {
         tripGroup: tripGroup,
         rkey: getSearchCookie("rkey") || "",
         dmnid: document.querySelector(".search-nav").dataset.dmnid,
         Type: "bus",
         SchemaId: schemaId,
         lid: "1",
      };
      sessionStorage.setItem("sessionSearch", JSON.stringify(busSearch));
      window.location.href = "/bus/search";
   }
}
// new code for flight chunck api
// Retrieves the value of a specific cookie by name
function getSearchCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(";").shift();
   return null;
}
// new code for flight chunck api
// Extracts the Persian city name from a string, if present
function extractCityName(modelData = "") {
   if (typeof modelData !== "string") return "";

   const text = modelData
      .replace(/[–—−]/g, "-")
      .replace(/\(.*?\)/g, "")
      .replace(/\s+/g, " ")
      .trim();

   const bannedRe = /(?:\ball\s+airports?\b|\bairports?\b|\binternational\b|\bintl\.?\b|\bterminals?\b|فرودگاه|همه(?:\s*ی)?(?:\s*فرودگاه ها)?)/iu;

   const placeTokenRe = /^[\p{L}\s'.-]+$/u;

   const tokens = text.split(/\s*-\s*/).map(t => t.trim()).filter(Boolean);

   const eligible = tokens.filter(t => placeTokenRe.test(t) && !bannedRe.test(t));

   if (eligible.length) return eligible[eligible.length - 1];

   const m = text.match(/([\p{L}\s'.-]+)(?:-|$)/u);
   if (m && !bannedRe.test(m[1])) return m[1].trim();

   return modelData.trim();
}



const toEnglishDigits = (str) =>
   String(str).replace(
      /[\u06F0-\u06F9\u0660-\u0669]/g,
      (d) =>
         "0123456789"[
         "۰۱۲۳۴۵۶۷۸۹".indexOf(d) > -1
            ? "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
            : "٠١٢٣٤٥٦٧٨٩".indexOf(d)
         ] ?? d
   );

const _faParts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
   year: "numeric",
   month: "numeric",
   day: "numeric",
});
const _ymdFromDateInPersian = (d) => {
   const parts = _faParts.formatToParts(d);
   const y = +toEnglishDigits(parts.find((p) => p.type === "year").value);
   const m = +toEnglishDigits(parts.find((p) => p.type === "month").value);
   const da = +toEnglishDigits(parts.find((p) => p.type === "day").value);
   return { y, m, d: da };
};
const _cmpYmd = (a, b) => a.y - b.y || a.m - b.m || a.d - b.d;

const jalaliYmdToGregorianDate = (jy, jm, jd) => {
   const DAY = 86400000;
   let low = Date.UTC(jy + 621, 0, 1) - 10 * DAY;
   let high = Date.UTC(jy + 622, 11, 31) + 10 * DAY;
   const target = { y: jy, m: jm, d: jd };
   while (low <= high) {
      const mid = Math.floor((low + high) / 2 / DAY) * DAY;
      const d = new Date(mid);
      const cur = _ymdFromDateInPersian(d);
      const cmp = _cmpYmd(cur, target);
      if (cmp === 0) return d;
      if (cmp < 0) low = mid + DAY;
      else high = mid - DAY;
   }
   return null;
};
const convertDateIfPersian = (value) => {
   if (value == null || value === "") return "";

   if (typeof value === "number" || /^\d+$/.test(toEnglishDigits(value))) {
      const n = Number(toEnglishDigits(value));
      const d = new Date(n < 1e12 ? n * 1000 : n);
      if (isNaN(d)) return "";
      const y = d.getUTCFullYear();
      const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
      const da = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${mo}-${da}`;
   }

   let s = toEnglishDigits(String(value)).trim();

   // YYYY-MM-DD
   const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
   if (m) {
      const y = +m[1],
         mo = +m[2],
         da = +m[3];
      if (y < 1700) {
         const g = jalaliYmdToGregorianDate(y, mo, da);
         if (!g) return s;
         const yy = g.getUTCFullYear();
         const mm = String(g.getUTCMonth() + 1).padStart(2, "0");
         const dd = String(g.getUTCDate()).padStart(2, "0");
         return `${yy}-${mm}-${dd}`;
      }
      return s;
   }

   if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
      const d = new Date(/[zZ]|[+\-]\d{2}:\d{2}$/.test(s) ? s : s + "Z");
      if (isNaN(d)) return "";
      const y = d.getUTCFullYear();
      const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
      const da = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${mo}-${da}`;
   }

   return s;
};
// new code for flight chunck api
// Get Lid From URL
function getLidFromScriptUrl() {
   const scripts = document.querySelectorAll("script[src]");
   for (let script of scripts) {
      const src = script.getAttribute("src");
      if (src.includes("search-history-scripts-fa-ver")) {
         const url = new URL(src, window.location.origin);
         const lidParam = url.searchParams.get("lid");
         return lidParam || "1";
      }
   }
   return "1";
}


function set_searchHistory(json, type) {
   if (!isToday(new Date(`${json.value.georgiaDate}`))) {
      const getArrayHistory = localStorage.getItem(`searchHistory_${type}`);
      if (getArrayHistory) {
         const jsonArrayHistory = JSON.parse(getArrayHistory);
         if (jsonArrayHistory.length == 6) {
            jsonArrayHistory.shift();
         }
         jsonArrayHistory.unshift(json);
         const newJsonArrayHistory = jsonArrayHistory.reduce((acc, curr) => {
            if (
               !acc.find(
                  (obj) => JSON.stringify(obj.value) === JSON.stringify(curr.value)
               )
            ) {
               acc.push(curr);
            }
            return acc;
         }, []);
         localStorage.setItem(
            `searchHistory_${type}`,
            JSON.stringify(newJsonArrayHistory)
         );
      } else {
         const arrayHistory = new Array();
         arrayHistory.unshift(json);
         localStorage.setItem(
            `searchHistory_${type}`,
            JSON.stringify(arrayHistory)
         );
      }
   }
}

const reserveButtons = document.querySelectorAll(".reserve-btn");

reserveButtons.forEach((button) => {
   if (button.classList.contains("active-module")) {
      var dataId = button.getAttribute("data-id");
      var type = dataId.split("-")[1];

      // let FlightChunckk = FlightChunckbool;
      check_searchHistory(type);
   }
});

function get_searchHistory(type, lang) {
   var date = new Date();
   const getArrayHistory = localStorage.getItem(`searchHistory_${type}`);
   if (getArrayHistory) {
      var jsonArrayHistory = JSON.parse(getArrayHistory);
      for (const element of jsonArrayHistory) {
         if (date.getTime() >= element.expire) {
            //test
            jsonArrayHistory = jsonArrayHistory.filter(item => item.time !== element.time);
         }
      }
      localStorage.setItem(
         `searchHistory_${type}`,
         JSON.stringify(jsonArrayHistory)
      );
      show_searchHistory(type, lang);
   }
}


// function endOfDayLocalFromYMD(ymd) {
//   if (!ymd) return 0;
//   const parts = toEnglishDigits(String(ymd)).split("-");
//   const y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
//   if (!y || !m || !d) return 0;
//   return new Date(y, m - 1, d, 23, 59, 59, 999).getTime();
// }
// function endOfTodayTs() {
//   const now = new Date();
//   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();
// }


function endOfDayLocalFromYMD(ymd) {
   if (!ymd) return 0;
   const parts = toEnglishDigits(String(ymd)).split("-");
   const y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
   if (!y || !m || !d) return 0;

   const ts = new Date(y, m - 1, d + 1, 0, 0, 0, 0).getTime();
   return Number.isFinite(ts) ? ts : 0;
}





function show_searchHistory(type, lang) {


   // ——— Helperها (محلی، تا تداخلی با بقیه فایل نداشته باشند) ———
   function cleanText(s) {
      return String(s || "")
         .replace(/\s*\([^)]*\)\s*/g, "") // حذف پرانتزها و محتوایشان
         .replace(/\s+/g, " ")
         .trim();
   }

   function hasPersian(s) {
      return /[\u0600-\u06FF]/.test(s || "");
   }
   // عمومی: اول فارسی، وگرنه آخرین بخش؛ بدون پرانتز؛ با پشتیبانی از "A - B - C"
   function getCityNameFromTextlocation(text) {
      const raw = cleanText(text);
      if (raw.includes("-")) {
         const parts = raw.split("-").map(cleanText).filter(Boolean);
         if (!parts.length) return "";
         const fa = parts.find(hasPersian);
         return fa || parts[parts.length - 1];
      }
      return raw;
   }

   function getCityFromDashFormat(text) {
      const raw = cleanText(String(text || "")).replace(/[–—‐-‒]/g, "-");
      const parts = raw
         .split("-")
         .map((s) => s.trim())
         .filter(Boolean);
      if (parts.length === 0) return "";
      const second = parts[1] || "";
      const isAllAirports =
         second === "همه فرودگاه ها" || second === "همه فرودگاه‌ها";
      if (isAllAirports && parts[0]) return parts[0];
      return second || parts[parts.length - 1] || parts[0];
   }

   const showArrayHistory = localStorage.getItem(`searchHistory_${type}`);
   if (!showArrayHistory) return;

   const jsonArrayHistory = JSON.parse(showArrayHistory);
   if (!Array.isArray(jsonArrayHistory) || jsonArrayHistory.length === 0) return;

   let output = "";
   let counter = 0;

   for (const element of jsonArrayHistory) {
      // تعیین تاریخ و ماه‌ها
      let splited_start;
      if (element.value.dataform == "multi") {
         splited_start = (element.value.routes?.[0]?.date?.start || "").split("-");
      } else if (element.value.dataform == "visa") {
         splited_start = 0;
      } else {
         splited_start = (element.value.date?.start || "").split("-");
      }
      const splited_year = splited_start?.[0];
      let months = "";
      if (2020 < splited_year && splited_year < 2050) {
         months = {
            "01": "January",
            1: "January",
            "02": "February",
            2: "February",
            "03": "March",
            3: "March",
            "04": "April",
            4: "April",
            "05": "May",
            5: "May",
            "06": "June",
            6: "June",
            "07": "July",
            7: "July",
            "08": "August",
            8: "August",
            "09": "September",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
         };
      } else if (1300 < splited_year && splited_year < 1500) {
         months = {
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
            12: "اسفند",
         };
      }

      const searchLang = element.value.searchLang || "fa";
      if (lang != searchLang) continue;

      counter += 1;

      // Extractor انتخاب‌شده بر اساس type
      const extractCity = (txt) =>
         type === "flight" || type === "flighthotel" || type === "cip"
            ? getCityFromDashFormat(txt)
            : getCityNameFromTextlocation(txt);

      let departure_name = "";
      let destination_name = "";

      // مولتی‌سیتی
      if (element.value.flightType == 3 && Array.isArray(element.value.routes)) {
         let output_multi = "";
         const routes = element.value.routes;
         for (let e = 0; e < routes.length; e++) {
            const route = routes[e] || {};
            const fromName = extractCity(route?.departure?.name || "");
            const toName = extractCity(route?.destination?.name || "");
            const splited_start_date = (route?.date?.start || "").split("-");

            output_multi += `
          <input type="hidden" value="${route?.index?.text || ""
               }" name="_root.route__${e}.index">
          <input type="hidden" value="${route?.departure?.name || ""
               }" name="_root.route__${e}.fromcityName">
          <input type="hidden" value="${route?.departure?.id || ""
               }"   name="_root.route__${e}.fromcity">
          <input type="hidden" value="${route?.destination?.name || ""
               }" name="_root.route__${e}.tocityName">
          <input type="hidden" value="${route?.destination?.id || ""
               }"   name="_root.route__${e}.tocity">
          <input type="hidden" value="${route?.date?.start || ""
               }" name="_root.route__${e}.departuredate">
          <div class="routes-container">
            <span class="departure-text">${fromName}</span>
            ${lang == "fa"
                  ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`
               }
            <span class="destination-text">${toName}</span>
            <div class="date">
              <span class="day">${splited_start_date[2] || ""}</span>
              <span class="month">${months[splited_start_date[1]] || ""}</span>
            </div>
          </div>`;
         }

         // درج فرم مولتی
         const lid = lang == "en" ? 2 : lang == "ar" ? 3 : 1;

         //          const methodTypeMulti = FlightChunckStatus ? "post" : element.value.method;
         // const onsubmitAttrMulti = FlightChunckStatus
         //   ? ` onsubmit="historyCardChunkSubmit(this,event,true)"`
         //   : "";




         const shouldChunkmulti = !!(FlightChunckStatus || element?.value?.chunkuse); // per-item + وضعیت فعلی
         const methodTypeMulti = 'post';
         const currentFlightForm = document.querySelector('.form-search[data-form="multi"]');
         const b2bFlag = (currentFlightForm?.dataset?.b2b ?? 'false');                 // مثل فرم اصلی
         const mobFlag = (currentFlightForm?.dataset?.mob ?? (isMobile ? 'true' : 'false'));
         const onsubmitAttrMulti = shouldChunkmulti
            ? ` onsubmit="historyCardChunkSubmit(this,event)"  data-b2b="${b2bFlag}" data-mob="${mobFlag}" `
            : "";
         const onsubmitActionMulti = shouldChunkmulti
            ? `flight/search`
            : `${element.value.action}`;



         output += `<form method="${methodTypeMulti}" action="${onsubmitActionMulti}" ${onsubmitAttrMulti} rel='nofollow'>
        <input value="${lid}" type="hidden" name="lid"/>
        <input value="${element.value.persiancurrent || ""
            }" type="hidden" name="persiancurrent"/>
        <input value="${element.value.flightClass || ""
            }" type="hidden" name="flightClass"/>
        <input value="${element.value?.passengers?.adult || 1
            }" type="hidden" name="adult"/>
        <input value="${parseInt(element.value?.passengers?.child || 0) +
               parseInt(element.value?.passengers?.infant || 0) ==
               0
               ? parseInt(element.value?.passengers?.child || 0) +
               parseInt(element.value?.passengers?.infant || 0)
               : parseInt(element.value?.passengers?.child || 0) +
               parseInt(element.value?.passengers?.infant || 0) +
               ","
            }" type="hidden" name="child"/>
        <input value="${element.value?.passengers?.ages || ""
            }" type="hidden" name="select-age"/>
        ${output_multi}
        <div class="passenger"><span class="space count">${parseInt(element.value?.passengers?.adult || 0) +
            parseInt(element.value?.passengers?.child || 0)
            }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span>
            <span class="space">${element.value.flightClass || ""}</span>
            
            
            </div>
        <button type="submit"></button>
      </form>`;
      } else {
         // یک‌مسیره‌ها و سایر ماژول‌ها
         departure_name = extractCity(element?.value?.departure?.name || "");
         destination_name = element?.value?.destination
            ? extractCity(element.value.destination.name || "")
            : "";


         // ---- جایگزینِ بلوک تولید date_output از همینی که داری ----
         function _gregorianPartsFromAny(input) {
            // همیشه خروجی میلادی "YYYY-MM-DD"
            const g = convertDateIfPersian(input || ""); // اگر شمسی باشد به میلادی برمی‌گرداند، اگر میلادی باشد دست‌نخورده
            const m = toEnglishDigits(String(g)).match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (!m) return null;
            return { y: +m[1], m: +m[2], d: +m[3] };
         }

         function _jalaliPartsFromAny(input) {
            const s = toEnglishDigits(String(input || "").trim());
            // اگر خودِ ورودی شمسی بود (سال کوچکتر از 1700)، همان را بخوان
            const m1 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (m1 && +m1[1] < 1700) return { y: +m1[1], m: +m1[2], d: +m1[3] };

            // وگرنه ابتدا میلادی کن، سپس با Intl به شمسی تبدیل کن
            const gp = _gregorianPartsFromAny(s);
            if (!gp) return null;
            const dt = new Date(Date.UTC(gp.y, gp.m - 1, gp.d));
            const { y, m, d } = _ymdFromDateInPersian(dt); // از فایل خودت
            return { y, m, d };
         }

         function _formatMonthName(mm, isJalali) {
            const en = {
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
            const fa = {
               1: "فروردین",
               2: "اردیبهشت",
               3: "خرداد",
               4: "تیر",
               5: "مرداد",
               6: "شهریور",
               7: "مهر",
               8: "آبان",
               9: "آذر",
               10: "دی",
               11: "بهمن",
               12: "اسفند",
            };
            return (isJalali ? fa : en)[mm] || "";
         }

         function _getDisplayParts(dateStr, langid) {
            if (!dateStr) return null;
            const isFa = langid === 1;
            const parts = isFa
               ? _jalaliPartsFromAny(dateStr)
               : _gregorianPartsFromAny(dateStr);
            if (!parts) return null;
            return {
               day: String(parts.d).padStart(2, "0"),
               monthText: _formatMonthName(parts.m, isFa),
            };
         }

         // --- استفاده در همان جای قبلی:
         let date_output = "";
         if (element?.value?.date) {
            const start = _getDisplayParts(element.value.date.start, langid);
            const end = _getDisplayParts(element.value.date.end, langid);

            if (start) {
               if (end) {
                  date_output = `
        <div class="date">
          <div class="departure-date">
            <span class="day">${start.day}</span>
            <span class="month">${start.monthText}</span>
          </div>
          <div class="space">-</div>
          <div class="destination-date">
            <span class="day">${end.day}</span>
            <span class="month">${end.monthText}</span>
          </div>
        </div>`;
               } else {
                  date_output = `
        <div class="date">
          <div class="departure-date">
            <span class="day">${start.day}</span>
            <span class="month">${start.monthText}</span>
          </div>
          <div></div>
        </div>`;
               }
            }
         }

         // مسافر/اتاق برای هتل/فلایت+هتل/سرویس و...
         let passenger_room = "";
         let passenger_room_count = 0;
         if (element.value.passengers && Array.isArray(element.value.passengers)) {
            let index = 1;
            for (const room of element.value.passengers) {
               passenger_room += `<input value="${room.adult}" type="hidden" name="_root.rooms__${index}.adultcount"/><input value="${room.ages}" type="hidden" name="_root.rooms__${index}.childcountandage">`;
               passenger_room_count +=
                  parseInt(room.adult || 0) + parseInt(room.child || 0);
               index++;
            }
         }

         // lid بر اساس زبان
         const lid = lang == "en" ? 2 : lang == "ar" ? 3 : 1;

         function renderHistoryArrow(lang, isRoundTrip) {
            // اگر رفت‌وبرگشت بود، دو فلش رفت و برگشت نشون بده
            if (isRoundTrip) {
               return `
<svg class="arrow-history-icon" fill="#000000" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 477.426 477.426" xml:space="preserve">
<g>
	<polygon points="86.213,143.435 476.213,143.435 476.213,113.435 86.213,113.435 86.213,41.892 0,128.387 86.213,214.319 	"/>
	<polygon points="477.426,349.202 391.654,263.43 391.424,334.364 1.213,334.364 1.213,364.364 391.326,364.364 391.095,435.533 	
		"/>
</g>
</svg>`;
            }

            // یک‌طرفه: همان تک‌فلش قبلی بر اساس زبان/چیدمان
            return lang === "fa"
               ? `<svg xmlns="http://www.w3.org/2000/svg" class="arrow-history-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="oneway-rtl" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>`
               : `<svg xmlns="http://www.w3.org/2000/svg" class="arrow-history-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="oneway-ltr" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`;
         }

         // فرم‌ها بر اساس type
         if (type == "flight") {
            const isRoundTrip = !!(
               element?.value?.date?.end && String(element.value.date.end).trim()
            );



            //                   let methodType = FlightChunckStatus ? "post" : element.value.method;

            // const onsubmitAttr = FlightChunckStatus
            //   ? ` onsubmit="form_search_isSubmited(this,event,true)"`
            //   : "";


            const shouldChunk = !!(FlightChunckStatus || element?.value?.chunkuse); // per-item + وضعیت فعلی
            const methodType = shouldChunk ? "post" : (element.value.method || "get");
            const currentFlightForm = document.querySelector('.form-search[data-form="flight"]');
            const b2bFlag = (currentFlightForm?.dataset?.b2b ?? 'false');                 // مثل فرم اصلی
            const mobFlag = (currentFlightForm?.dataset?.mob ?? (isMobile ? 'true' : 'false'));
            const onsubmitAttr = shouldChunk
               ? ` onsubmit="historyCardChunkSubmit(this,event)" data-b2b="${b2bFlag}" data-mob="${mobFlag}"`
               : "";


            //   output += `<form method="${methodType}" action="${element.value.action}"${onsubmitAttr} rel='nofollow'>
            output += `<form method="${methodType}" action="${element.value.action}" ${onsubmitAttr} rel="nofollow">

          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from"/>
          <input value="${element.value?.destination?.id || ""
               }" type="hidden" name="to"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value="${element.value?.flightClass || ""
               }" type="hidden" name="flightClass"/>
          <input value="${element.value?.passengers?.adult || 1
               }" type="hidden" name="adult"/>
          <input value="${parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0) ==
                  0
                  ? parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0)
                  : parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0) +
                  ","
               }" type="hidden" name="child"/>
          <input value="${element.value?.passengers?.ages || ""
               }" type="hidden" name="select-age"/>
          <div class="routes-container">
            <span class="departure-text">${departure_name}</span>
                ${renderHistoryArrow(lang, isRoundTrip)}
            <span class="destination-text">${destination_name}</span>
          </div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${parseInt(element.value?.passengers?.adult || 0) +
               parseInt(element.value?.passengers?.child || 0) +
               parseInt(element.value?.passengers?.infant || 0)
               }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
                           <span class="space">${element.value.flightClass || ""}</span>

          </div>
          <button type="submit"></button>
        </form>`;









         } else if (type == "hotel") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="cityid"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="coHotel"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          ${passenger_room}
          <div class="routes-container"><span class="departure-text">${departure_name}</span></div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${passenger_room_count}</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>

          </div>
          ${element.value?.hotelname
                  ? `<input type="hidden" name="hotelid" value="${element.value.hotelname.id}">`
                  : ""
               }
          ${element.value?.nationality
                  ? `<input type="hidden" name="nationality" value="${element.value.nationality.id}">`
                  : ""
               }

               
          <button type="submit"></button>
        </form>`;
         } else if (type == "flighthotel") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from"/>
          <input value="${element.value?.destination?.id || ""
               }" type="hidden" name="to"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value="${element.value?.flightClass || ""
               }" type="hidden" name="flightClass"/>
          ${passenger_room}
          <div class="routes-container">
            <span class="departure-text">${departure_name}</span>
            ${lang == "fa"
                  ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`
               }
            <span class="destination-text">${destination_name}</span>
          </div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${passenger_room_count}</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>

                                          <span class="space">${element.value.flightClass || ""}</span>


          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "tour") {
            const fromName = element.value?.departure?.fromName || "";
            const recheck_departure_name = fromName
               ? `${fromName} - ${departure_name}`
               : departure_name;
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="tourname"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="tour-search-text"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
                 <input value="${element.value?.departure?.fromName || ""
               }" type="hidden" name="fromtour-search-text"/>
                 <input value="${element.value?.departure?.fromId || ""
               }" type="hidden" name="fromtourcity"/>
          ${passenger_room}
          <div class="routes-container"><span class="departure-text">
          ${recheck_departure_name}
          </span></div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${passenger_room_count}</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "insurance") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="countryid"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="insurancecountry"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value='${element.value?.passengers || ""
               }' name="birthday" type="hidden"/>
          <input value='${(element.value?.passengers || "").split(",").filter(Boolean).length
               }' name="passengercount" type="hidden"/>
          <div class="routes-container"><span class="departure-text">${departure_name}</span></div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${(element.value?.passengers || "").split(",").filter(Boolean)
                  .length
               }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "cip") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value="${element.value?.traveltype || ""
               }" type="hidden" name="traveltype"/>
          <input value="${element.value?.flighttype || ""
               }" type="hidden" name="flighttype"/>
          <input value="${element.value?.passengers?.adult || 1
               }" type="hidden" name="adult"/>
          <input value="${(element.value?.passengers?.child || 0) == 0
                  ? element.value?.passengers?.child || 0
                  : (element.value?.passengers?.child || 0) + ","
               }" type="hidden" name="child"/>
          <input value="${element.value?.passengers?.ages || ""
               }" type="hidden" name="select-age"/>
          <div class="routes-container"><span class="departure-text">${departure_name}</span></div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${parseInt(element.value?.passengers?.adult || 0) +
               parseInt(element.value?.passengers?.child || 0)
               }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "visa") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <div class="routes-container"><span class="departure-text">${departure_name}</span></div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "service") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="cityid"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="coHotel"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value="${element.value?.traveltype || ""
               }" type="hidden" name="traveltype"/>
          <input value="${element.value?.flighttype || ""
               }" type="hidden" name="flighttype"/>
          <input value="${element.value?.passengers?.adult || 1
               }" type="hidden" name="adult"/>
          <input value="${parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0) ==
                  0
                  ? parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0)
                  : parseInt(element.value?.passengers?.child || 0) +
                  parseInt(element.value?.passengers?.infant || 0) +
                  ","
               }" type="hidden" name="child"/>
          <input value="${element.value?.passengers?.ages || ""
               }" type="hidden" name="select-age"/>
          <div class="routes-container"><span class="departure-text">${departure_name}</span></div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${parseInt(element.value?.passengers?.adult || 0) +
               parseInt(element.value?.passengers?.child || 0) +
               parseInt(element.value?.passengers?.infant || 0)
               }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "train") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="departure"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from"/>
          <input value="${element.value?.destination?.name || ""
               }" type="hidden" name="destination"/>
          <input value="${element.value?.destination?.id || ""
               }" type="hidden" name="to"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <input value="${element.value?.CompartmentType || ""
               }" type="hidden" name="CompartmentType"/>
          <input value="${element.value?.PrivateCompartment || ""
               }" type="hidden" name="PrivateCompartment"/>
          <input value="${element.value?.passengers?.adult || 1
               }" type="hidden" name="adult"/>
          <input value="${(element.value?.passengers?.child || 0) == 0
                  ? element.value?.passengers?.child || 0
                  : (element.value?.passengers?.child || 0) + ","
               }" type="hidden" name="child"/>
          <input value="${element.value?.passengers?.ages || ""
               }" type="hidden" name="select-age"/>
          <div class="routes-container">
            <span class="departure-text">${departure_name}</span>
            ${lang == "fa"
                  ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`
               }
            <span class="destination-text">${destination_name}</span>
          </div>
          ${date_output}
          <div class="passenger">
            <span class="space count">${parseInt(element.value?.passengers?.adult || 0) +
               parseInt(element.value?.passengers?.child || 0)
               }</span>
            <span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"
               }</span>
          </div>
          <button type="submit"></button>
        </form>`;
         } else if (type == "bus") {
            output += `<form method="${element.value.method}" action="${element.value.action
               }" onsubmit="bus_search_isSubmited(this,event,true)" rel='nofollow'>
          <input value="${lid}" type="hidden" name="lid"/>
          <input value="${element.value?.departure?.id || ""
               }" type="hidden" name="from" class="from"/>
          <input value="${element.value?.departure?.name || ""
               }" type="hidden" name="departure" class="departure"/>
          <input value="${element.value?.destination?.name || ""
               }" type="hidden" name="destination" class="destination"/>
          <input value="${element.value?.destination?.id || ""
               }" type="hidden" name="to" class="to"/>
          <input value="${element.value?.date?.start || ""
               }" type="hidden" name="fdate" class="start_date"/>
          <input value="${element.value?.date?.end || ""
               }" type="hidden" name="tdate" class="end_date"/>
          <input value="${element.value?.SchemaId || ""
               }" type="hidden" name="SchemaId"/>
          <input value="${element.value?.persiancurrent || ""
               }" type="hidden" name="persiancurrent"/>
          <div class="routes-container">
            <span class="departure-text">${departure_name}</span>
            ${lang == "fa"
                  ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`
               }
            <span class="destination-text">${destination_name}</span>
          </div>
          ${date_output}
          <button type="submit"></button>
        </form>`;
         }
      }
   }

   if (counter > 0 && !document.querySelector(`.${type}-searchHistory`)) {
      document.querySelector(".search-box-container").insertAdjacentHTML(
         "afterend",
         `<div class="searchHistory-content ${lang === "en" ? "en-lang" : lang === "ar" ? "ar-lang" : "fa-lang"
         } ${type}-searchHistory">
        <div class="title">
          <span class="sub-title">
            <svg aria-label="HistoryIcon" width="24" height="24" viewBox="0 0 24 24" fill="#29263d" style="width: 1.5rem; height: 1.5rem;vertical-align: middle;">
              <path d="M12.8 11.65L15.675 14.475C15.825 14.625 15.9 14.8042 15.9 15.0125C15.9 15.2208 15.825 15.4 15.675 15.55C15.525 15.7 15.35 15.775 15.15 15.775C14.95 15.775 14.775 15.7 14.625 15.55L11.525 12.5C11.4416 12.4167 11.3833 12.3292 11.35 12.2375C11.3166 12.1458 11.3 12.05 11.3 11.95V7.675C11.3 7.45833 11.3708 7.27917 11.5125 7.1375C11.6541 6.99583 11.8333 6.925 12.05 6.925C12.2666 6.925 12.4458 6.99583 12.5875 7.1375C12.7291 7.27917 12.8 7.45833 12.8 7.675V11.65ZM11.925 21C9.59165 21 7.61248 20.25 5.98748 18.75C4.36248 17.25 3.39165 15.375 3.07498 13.125C3.04165 12.8917 3.08748 12.6917 3.21248 12.525C3.33748 12.3583 3.51665 12.2667 3.74998 12.25C3.94998 12.2333 4.12498 12.2958 4.27498 12.4375C4.42498 12.5792 4.51665 12.75 4.54998 12.95C4.83331 14.8167 5.64998 16.375 6.99998 17.625C8.34998 18.875 9.59165 19.5 11.925 19.5C13.175 19.5 14.35 19.1667 15.45 18.7C16.55 18.2333 17.5125 17.5958 18.3375 16.7875C19.1625 15.9792 19.8125 15.2333 20.2875 14.55C20.7625 13.8667 21 13.15 21 12.4C21 10.25 20.3 8.45 18.9 7C17.5 5.55 15.7833 4.7 13.75 4.45C13.5166 4.41667 13.3166 4.4625 13.15 4.5875C12.9833 4.7125 12.8916 4.89167 12.875 5.125C12.8583 5.325 12.9208 5.5 13.0625 5.65C13.2041 5.8 13.375 5.875 13.575 5.875C13.775 5.875 13.95 5.8 14.1 5.65C14.25 5.5 14.325 5.32083 14.325 5.1V3.2C15.1916 4.21667 16.2208 5.01667 17.4125 5.6C18.6041 6.18333 19.8666 6.475 21.2 6.475C22.45 6.475 23.625 6.24167 24.725 5.775C25.825 5.30833 26.7875 4.67083 27.6125 3.8625C28.4375 3.05417 29.0875 2.30833 29.5625 1.625C30.0375 0.941667 30.275 0.225 30.275 -0.525"></path>
            </svg>
            ${lang === "en"
            ? "Recent searches"
            : lang === "ar"
               ? "عمليات البحث الأخيرة"
               : "جستجوهای اخیر"
         }<span class="space">(${counter})</span>
          </span>
          <span class="remove-link" onclick="remove_searchHistory('${type}')">
            ${lang === "en"
            ? "Clear searches"
            : lang === "ar"
               ? "مسح عمليات البحث"
               : "پاک کردن"
         }
          </span>
        </div>
        <div class="output-content">${output}</div>
      </div>`
      );
      update_searchHistory(type, lang);
   }
}

function update_searchHistory(type, lang) {
   const showArrayHistory = localStorage.getItem(`searchHistory_${type}`);
   if (showArrayHistory) {
      const jsonArrayHistory = JSON.parse(showArrayHistory);
      if (jsonArrayHistory.length > 0) {
         for (let i = 0; i < jsonArrayHistory.length; i++) {
            if (jsonArrayHistory[i].value.dataform == "multi") {
               var splited_start =
                  jsonArrayHistory[i].value.routes[0].date.start.split("-");
            } else if (jsonArrayHistory[i].value.dataform == "visa") {
               var splited_start = 0;
            } else {
               var splited_start = jsonArrayHistory[i].value.date.start.split("-");
            }
            let splited_year = splited_start[0];
            let months = "";
            if (1300 < splited_year && splited_year < 1500) {
               months = {
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
                  12: "اسفند",
               };
            } else if (2020 < splited_year && splited_year < 2050) {
               months = {
                  "01": "January",
                  1: "January",
                  "02": "February",
                  2: "February",
                  "03": "March",
                  3: "March",
                  "04": "April",
                  4: "April",
                  "05": "May",
                  5: "May",
                  "06": "June",
                  6: "June",
                  "07": "July",
                  7: "July",
                  "08": "August",
                  8: "August",
                  "09": "September",
                  9: "September",
                  10: "October",
                  11: "November",
                  12: "December",
               };
            }
            //here
            if (jsonArrayHistory[i].value.searchLang === lang) {
               document.querySelectorAll(".form-search").forEach((e) => {
                  if (e.getAttribute("data-form") == type) {
                     e.setAttribute("action", jsonArrayHistory[i].value.action);
                     e.setAttribute("method", jsonArrayHistory[i].value.method);
                     if (e.querySelector(".start_date")) {
                        e.querySelector(".start_date").insertAdjacentHTML(
                           "afterend",
                           `<span class="unvisible hidden">${jsonArrayHistory[i].value.georgiaDate}</span>`
                        );
                        e.querySelector(".start_date").setAttribute("data-gregorian", jsonArrayHistory[i].value.georgiaDate);
                     }
                     if (e.querySelector(".end_date")) {

                        e.querySelector(".end_date").setAttribute("data-gregorian", convert_jalali_toGregorian(jsonArrayHistory[i].value.date.end));
                     }

                     e.querySelector(".persiancurrent").value =
                        jsonArrayHistory[i].value.persiancurrent;

                     if (jsonArrayHistory[i].value.flightType == 3) {
                        const route_len = jsonArrayHistory[i].value.routes.length;
                        if (
                           document
                              .querySelector(".searchHistory-content")
                              .classList.contains("multi-searchHistory")
                        ) {
                           if (route_len > 2) {
                              var add = document.querySelector(".add-routs");
                              for (let t = 0; t < route_len - 2; t++) {
                                 addMulticityRoute(add);
                              }
                           }
                        }
                        const routeContainer =
                           document.querySelector(".route-container");
                        const routeContents =
                           routeContainer.querySelectorAll(".route-content");
                        for (let y = 0; y < routeContents.length; y++) {
                           const departure =
                              routeContents[y].querySelector(".departure");
                           const destination =
                              routeContents[y].querySelector(".destination");

                           const dep_autofit = routeContents[y]
                              .querySelector(".departure-route")
                              .querySelector(".auto-fit");
                           const des_autofit = routeContents[y]
                              .querySelector(".destination-route")
                              .querySelector(".auto-fit");
                           if (departure) {
                              departure.value =
                                 jsonArrayHistory[i].value.routes[y].departure.name;
                              routeContents[y].querySelector(".from").value =
                                 jsonArrayHistory[i].value.routes[y].departure.id;
                           }
                           if (dep_autofit) {
                              dep_autofit.innerText =
                                 jsonArrayHistory[i].value.routes[y].departure.name.split(
                                    "-"
                                 )[0];
                           }
                           if (destination) {
                              destination.value =
                                 jsonArrayHistory[i].value.routes[y].destination.name;
                              routeContents[y].querySelector(".to").value =
                                 jsonArrayHistory[i].value.routes[y].destination.id;
                           }
                           if (des_autofit) {
                              des_autofit.innerText =
                                 jsonArrayHistory[i].value.routes[
                                    y
                                 ].destination.name.split("-")[0];
                           }
                           if (
                              routeContents[y].querySelector(
                                 ".departure-date .selected-day"
                              )
                           ) {
                              const splited_start_date =
                                 jsonArrayHistory[i].value.routes[y].date.start.split("-");
                              routeContents[y].querySelector(
                                 ".departure-date .selected-day"
                              ).innerText = splited_start_date[2];
                              routeContents[y].querySelector(
                                 ".departure-date .selected-month"
                              ).innerText = months[splited_start_date[1]];
                           }
                           routeContents[y].querySelector(".start_date").value =
                              jsonArrayHistory[i].value.routes[y].date.start;
                        }
                     }

                     else if (jsonArrayHistory[i].value.flightType == 2) {
                        document
                           .getElementById("oneway")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("multi")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("backtoback")
                           .classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("backtoback")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("backtoback")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document.getElementById("backtoback").click();
                        }
                        e.querySelector(".end_date").classList.add("nextCalOpening");
                        e.querySelector(".end_date").removeAttribute("disabled");
                        if (e.querySelector(".end_date").closest(".reserve-field")) {
                           e.querySelector(".end_date")
                              .closest(".reserve-field")
                              .classList.remove("no-activedate");
                        }
                        if (window.innerWidth <= 750) {
                           if (e.classList.contains("en")) {
                              e.setAttribute("action", "/M_Roundtrip_Search_En.bc");
                           } else if (e.classList.contains("fa")) {
                              e.setAttribute("action", "/M_Roundtrip_Search.bc");
                           } else if (e.classList.contains("ar")) {
                              e.setAttribute("action", "/M_Roundtrip_Search_ar.bc");
                           }
                        }
                     }

                     else if (jsonArrayHistory[i].value.flightType == 1) {
                        document
                           .getElementById("backtoback")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("multi")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document.getElementById("oneway").classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("oneway")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("oneway")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document.getElementById("oneway").click();
                        }
                     }

                     else if (jsonArrayHistory[i].value.trainType == 2) {
                        document
                           .getElementById("oneway-train")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("backtoback-train")
                           .classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("backtoback-train")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("backtoback-train")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document
                              .getElementById("backtoback-train")
                              .querySelector("input[type=radio]").checked = true;
                           document.getElementById("backtoback-train").click();
                        }
                        e.querySelector(".end_date").classList.add("nextCalOpening");
                        e.querySelector(".end_date").removeAttribute("disabled");
                        if (e.querySelector(".end_date").closest(".reserve-field")) {
                           e.querySelector(".end_date")
                              .closest(".reserve-field")
                              .classList.remove("no-activedate");
                        }
                        if (window.innerWidth <= 750) {
                           if (e.classList.contains("en")) {
                              e.setAttribute("action", "/M_Train_Roundtrip_Search_En.bc");
                           } else if (e.classList.contains("fa")) {
                              e.setAttribute("action", "/M_Train_Roundtrip_Search.bc");
                           } else if (e.classList.contains("ar")) {
                              e.setAttribute("action", "/M_Train_Roundtrip_Search_ar.bc");
                           }
                        }
                     }
                     else if (jsonArrayHistory[i].value.trainType == 1) {
                        document
                           .getElementById("backtoback-train")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("oneway-train")
                           .classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("oneway-train")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("oneway-train")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document
                              .getElementById("oneway-train")
                              .querySelector("input[type=radio]").checked = true;
                           document.getElementById("oneway-train").click();
                        }
                     }
                     else if (jsonArrayHistory[i].value.busType == 2) {
                        document
                           .getElementById("oneway-bus")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("backtoback-bus")
                           .classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("backtoback-bus")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("backtoback-bus")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document
                              .getElementById("backtoback-bus")
                              .querySelector("input[type=radio]").checked = true;
                           document.getElementById("backtoback-bus").click();
                        }
                        e.querySelector(".end_date").classList.add("nextCalOpening");
                        e.querySelector(".end_date").removeAttribute("disabled");
                        if (e.querySelector(".end_date").closest(".reserve-field")) {
                           e.querySelector(".end_date")
                              .closest(".reserve-field")
                              .classList.remove("no-activedate");
                        }
                     }
                     else if (jsonArrayHistory[i].value.busType == 1) {
                        document
                           .getElementById("backtoback-bus")
                           .classList.remove("active-r-btn", "book-active__module__flight__type");
                        document
                           .getElementById("oneway-bus")
                           .classList.add("active-r-btn", "book-active__module__flight__type");
                        if (
                           document
                              .getElementById("oneway-bus")
                              .querySelector("input[type=radio]") &&
                           document
                              .getElementById("oneway-bus")
                              .getAttribute("data-change") !== "1"
                        ) {
                           document
                              .getElementById("oneway-bus")
                              .querySelector("input[type=radio]").checked = true;
                           document.getElementById("oneway-bus").click();
                        }
                     }

                     else if (jsonArrayHistory[i].value.flightType != 2 && jsonArrayHistory[i].value.flightType != 3 && jsonArrayHistory[i].value.flightType != 1) {
                        // set nationality input if exists
                        const nationalityInput = e.querySelector(
                           'input[name="nationality"]'
                        );
                        if (nationalityInput && jsonArrayHistory[i].value.nationality) {
                           nationalityInput.value =
                              jsonArrayHistory[i].value.nationality.id;
                           const closestReserve =
                              nationalityInput.closest(".reserve-field");
                           const departureValue =
                              closestReserve.querySelector(".departure");
                           departureValue.value =
                              jsonArrayHistory[i].value.nationality.name;
                        }

                        // set hotelname input if exists
                        if (jsonArrayHistory[i].value.hotelname) {
                           const closestReserve = e.querySelector(
                              ".check-destination-hotel"
                           );
                           let hotelNameContainer = e.querySelector(
                              ".hotel-name-container"
                           );
                           if (!hotelNameContainer) {
                              const hotelNameHTML = `
                                   <div class="reserve-field w-1/3 h-20 departure-route relative max-xl:w-full max-xl:mb-4 hotel-name-container">
                                       <div onclick="empty_value(this,'hotel-name')" class="click-content border-type-1 cursor-pointer h-full rounded-type-1 px-2">
                                           <label class="label-routes label-departure-hotel float-right w-full cursor-pointer relative" for="departure2">
                                               <svg width="15" height="19" class="align-middle">
                                                   <use xlink:href="images/sprite-icons.svg#engine-departurehotel-icon"></use>
                                               </svg>
                                               <span class="label-text text-sm">Hotel</span>
                                               <svg class="down-icon float-left align-middle mt-2 absolute right-0 top-0 h-2 hidden" width="15" height="8">
                                                   <use xlink:href="images/sprite-icons.svg#engine-down-icon"></use>
                                               </svg>
                                           </label>
                                           <p class="auto-fit clear-both text-base text-textColor cursor-pointer"></p>
                                           <input id="departure2" type="text" class="departure text-value line-clamp--1 text-textColor w-full cursor-pointer relative bg-inherit text-sm max-xl:text-base" aria-label="departure" autocomplete="off" value="${jsonArrayHistory[i].value.hotelname
                                    .name
                                 }" name="" placeholder="Hotel?" />
                                       </div>
                                       <input value="${jsonArrayHistory[i].value.hotelname.id
                                 }" class="locationId from" type="hidden" name="hotelid" aria-label="locationId" />
                                       <div class="searchList hidden-box hidden py-3.5 px-4 border-type-1 rounded-type-1 w-60 min-w-full float-left text-sm absolute z-20 clear-both top-full right-0 bg-white text-left leading-6 max-xl:w-full">
                                          ${window.innerWidth < 1024
                                    ? `
              <div class="close-searchList w-5 h-5 leading-5 mb-4 clear-both text-center text-textColor cursor-pointer text-sm float-right hover:text-red-600" onclick="close_searchList(this)">
                <svg width="15" height="15" class="align-middle">
                  <use xlink:href="images/sprite-icons-mobile.svg#engine-close-icon"></use>
                </svg>
              </div>
            `
                                    : ""
                                 }  
                                       <div class="flex relative mb-2 float-right w-full clear-both">
                                               <div class="h-9 leading-9">
                                                   <svg width="15" height="19" class="align-middle">
                                                       <use xlink:href="images/sprite-icons.svg#engine-location-icon"></use>
                                                   </svg>
                                               </div>
                                               <input type="text" aria-label="reserve-location" placeholder="Destination" oninput="autoCompleteEngineSearch(this)" data-type="3" class="reserve-location form-search-input h-9 leading-9 pr-3 bg-transparent text-left max-xl:text-base" autocomplete="off" value="" />
                                           </div>
                                           <span class="mini-loading absolute hidden top-6 left-4" aria-label="spinner">
                                               <svg class="spinner-label-icon align-middle" width="15" height="19">
                                                   <use xlink:href="images/sprite-icons.svg#engine-spinner-icon"></use>
                                               </svg>
                                           </span>
                                           <div class="locationResult"></div>
                                           <div class="load-location-options"></div>
                                       </div>
                                   </div>
                               `;

                              closestReserve.insertAdjacentHTML(
                                 "afterend",
                                 hotelNameHTML
                              );
                           }
                        }

                        e.querySelector(".departure").value =
                           jsonArrayHistory[i].value.departure.name;
                        e.querySelector(".from").value =
                           jsonArrayHistory[i].value.departure.id;
                        e.querySelector(".destination")
                           ? (e.querySelector(".destination").value =
                              jsonArrayHistory[i].value.destination.name)
                           : "";
                        e.querySelector(".to")
                           ? (e.querySelector(".to").value =
                              jsonArrayHistory[i].value.destination.id)
                           : "";
                        if (e.querySelector(".departure-route .auto-fit")) {
                           if (
                              jsonArrayHistory[i].value.departure.name.indexOf("-") > -1
                           ) {
                              const splited_element =
                                 jsonArrayHistory[i].value.departure.name.split("-");
                              e.querySelector(".departure-route .auto-fit").innerText =
                                 splited_element[1];
                           } else {
                              const splited_element =
                                 jsonArrayHistory[i].value.departure.name.split("(");
                              e.querySelector(".departure-route .auto-fit").innerText =
                                 splited_element[i];
                           }
                        }
                        if (e.querySelector(".destination-route .auto-fit")) {
                           if (
                              jsonArrayHistory[i].value.destination.name.indexOf("-") > -1
                           ) {
                              const splited_element =
                                 jsonArrayHistory[i].value.destination.name.split("-");
                              e.querySelector(".destination-route .auto-fit").innerText =
                                 splited_element[1];
                           } else {
                              const splited_element =
                                 jsonArrayHistory[i].value.destination.name.split("(");
                              e.querySelector(".destination-route .auto-fit").innerText =
                                 splited_element[i];
                           }
                        }
                        if (e.querySelector(".departure-date .selected-day")) {
                           const splited_start_date =
                              jsonArrayHistory[i].value.date.start.split("-");
                           e.querySelector(".departure-date .selected-day").innerText =
                              splited_start_date[2];
                           e.querySelector(".departure-date .selected-month").innerText =
                              months[splited_start_date[1]];
                        }
                        if (e.querySelector(".return-date .selected-day")) {
                           const splited_end_date =
                              jsonArrayHistory[i].value.date.end.split("-");
                           if (splited_end_date[1]) {
                              e.querySelector(".return-date .selected-day").innerText =
                                 splited_end_date[2];
                              e.querySelector(".return-date .selected-month").innerText =
                                 months[splited_end_date[1]];
                           }
                        }
                        if (e.querySelector(".start_date")) {
                           e.querySelector(".start_date").value =
                              jsonArrayHistory[i].value.date.start;
                        }
                        if (e.querySelector(".end_date")) {
                           e.querySelector(".end_date").value =
                              jsonArrayHistory[i].value.date.end;
                        }
                        // set tour departure if exists
                        const fromtourcityInput = e.querySelector(
                           'input[name="fromtourcity"]'
                        );
                        const tournameInput = e.querySelector(
                           'input[name="tourname"]'
                        );
                        if (fromtourcityInput && jsonArrayHistory[i].value.departure.fromId) {
                           fromtourcityInput.value =
                              jsonArrayHistory[i].value.departure.fromId;
                           tournameInput.value =
                              jsonArrayHistory[i].value.departure.id;
                           const closestReserveFromTourCity =
                              fromtourcityInput.closest(".reserve-field");
                           const closestReserveTourName =
                              tournameInput.closest(".reserve-field");
                           const departureValueCity =
                              closestReserveFromTourCity.querySelector(".departure");
                           departureValueCity.value =
                              jsonArrayHistory[i].value.departure.fromName;

                           const departureValueTour =
                              closestReserveTourName.querySelector(".departure");
                           departureValueTour.value =
                              jsonArrayHistory[i].value.departure.name;
                        }
                     }






                     if (e.querySelector(".FlightClass-value")) {
                        e.setAttribute(
                           "data-flightType",
                           jsonArrayHistory[i].value.flightType
                        );
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        e.querySelector(".FlightClass-value").value =
                           jsonArrayHistory[i].value.flightClass;
                        e.querySelectorAll(".FlightClass li").forEach((ie) => {
                           if (
                              ie.getAttribute("data-value") ==
                              jsonArrayHistory[i].value.flightClass
                           ) {
                              ie
                                 .closest("form")
                                 .querySelector(".FlightClass-value").value =
                                 ie.getAttribute("data-value");
                              var spans = ie
                                 .querySelector("label")
                                 .querySelectorAll("span");
                              spans.forEach(function (span) {
                                 if (window.getComputedStyle(span).display !== "none") {
                                    ie
                                       .closest(".reserve-field")
                                       .querySelector(".FlightClass-text").textContent =
                                       span.textContent;
                                 }
                              });
                           }
                        });
                        if (e.querySelector("input[name=child]")) {
                           if (e.querySelector(".adult-count")) {
                              e
                                 .querySelector(".adult-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.adult;
                           }
                           if (e.querySelector(".child-count")) {
                              e
                                 .querySelector(".child-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.child;
                           }
                           if (e.querySelector(".infant-count")) {
                              e
                                 .querySelector(".infant-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.infant;
                           }
                           if (jsonArrayHistory[i].value.passengers.child > 0) {
                              if (e.querySelector(".child-count")) {
                                 if (
                                    e
                                       .querySelector(".child-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".child-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           if (jsonArrayHistory[i].value.passengers.infant > 0) {
                              if (e.querySelector(".infant-count")) {
                                 if (
                                    e
                                       .querySelector(".infant-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".infant-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           e.querySelector(".adultcount").value =
                              jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value =
                              jsonArrayHistory[i].value.passengers.child;
                           e.querySelector(".infantcount").value =
                              jsonArrayHistory[i].value.passengers.infant;
                           e.querySelector("input[name=child]").value =
                              jsonArrayHistory[i].value.passengers.child == 0
                                 ? jsonArrayHistory[i].value.passengers.child
                                 : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value =
                              jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age =
                                 jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`;
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`;
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`;
                                 }
                                 index++;
                              }
                           }
                        }
                     }
                     // cip
                     if (e.querySelector(".traveltype-value")) {
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        e.querySelector(".traveltype-value").value =
                           jsonArrayHistory[i].value.traveltype;
                        e.querySelectorAll(".traveltype li").forEach((ie) => {
                           if (
                              ie.getAttribute("data-value") ==
                              jsonArrayHistory[i].value.traveltype
                           ) {
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".traveltype-value").value =
                                 ie.getAttribute("data-value");
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".traveltype-text").textContent =
                                 ie.querySelector("label").textContent;
                           }
                        });
                        e.querySelector(".flighttype-value").value =
                           jsonArrayHistory[i].value.flighttype;
                        e.querySelectorAll(".flighttype li").forEach((ie) => {
                           if (
                              ie.getAttribute("data-value") ==
                              jsonArrayHistory[i].value.flighttype
                           ) {
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".flighttype-value").value =
                                 ie.getAttribute("data-value");
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".flighttype-text").textContent =
                                 ie.querySelector("label").textContent;
                           }
                        });
                        if (e.querySelector("input[name=child]")) {
                           if (e.querySelector(".adult-count")) {
                              e
                                 .querySelector(".adult-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.adult;
                           }
                           if (e.querySelector(".child-count")) {
                              e
                                 .querySelector(".child-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.child;
                           }
                           if (jsonArrayHistory[i].value.passengers.child > 0) {
                              if (e.querySelector(".child-count")) {
                                 if (
                                    e
                                       .querySelector(".child-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".child-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           e.querySelector(".adultcount").value =
                              jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value =
                              jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value =
                              jsonArrayHistory[i].value.passengers.child == 0
                                 ? jsonArrayHistory[i].value.passengers.child
                                 : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value =
                              jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age =
                                 jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`;
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`;
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`;
                                 }
                                 index++;
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach((ie) => {
                                 ie.querySelector("select")
                                    .querySelectorAll("option")
                                    .forEach((iee) => {
                                       if (
                                          iee.value ==
                                          ie
                                             .querySelector("select")
                                             .getAttribute("data-value")
                                       ) {
                                          iee.setAttribute("selected", true);
                                       }
                                    });
                              });
                           }
                        }
                     }
                     // service
                     if (e.getAttribute("data-form") == "service") {
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        if (e.querySelector("input[name=child]")) {
                           if (e.querySelector(".adult-count")) {
                              e
                                 .querySelector(".adult-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.adult;
                           }
                           if (e.querySelector(".child-count")) {
                              e
                                 .querySelector(".child-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.child;
                           }
                           if (e.querySelector(".infant-count")) {
                              e
                                 .querySelector(".infant-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.infant;
                           }
                           if (jsonArrayHistory[i].value.passengers.child > 0) {
                              if (e.querySelector(".child-count")) {
                                 if (
                                    e
                                       .querySelector(".child-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".child-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           if (jsonArrayHistory[i].value.passengers.infant > 0) {
                              if (e.querySelector(".infant-count")) {
                                 if (
                                    e
                                       .querySelector(".infant-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".infant-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           e.querySelector(".adultcount").value =
                              jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value =
                              jsonArrayHistory[i].value.passengers.child;
                           e.querySelector(".infantcount").value =
                              jsonArrayHistory[i].value.passengers.infant;
                           e.querySelector("input[name=child]").value =
                              jsonArrayHistory[i].value.passengers.child == 0
                                 ? jsonArrayHistory[i].value.passengers.child
                                 : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value =
                              jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age =
                                 jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`;
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`;
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`;
                                 }
                                 index++;
                              }
                           }
                        }
                     }
                     //  train
                     if (e.querySelector(".Compartment-value")) {
                        e.setAttribute(
                           "data-trainType",
                           jsonArrayHistory[i].value.trainType
                        );
                        e.querySelector(".Compartment-value").value =
                           jsonArrayHistory[i].value.CompartmentType;
                        e.querySelector(".PrivateCompartment").value =
                           jsonArrayHistory[i].value.PrivateCompartment;
                        e.querySelectorAll(".Compartment li").forEach((ie) => {
                           if (
                              ie.getAttribute("data-value") ==
                              jsonArrayHistory[i].value.CompartmentType
                           ) {
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".Compartment-value").value =
                                 ie.getAttribute("data-value");
                              ie
                                 .closest(".reserve-field")
                                 .querySelector(".Compartment-text").textContent =
                                 ie.querySelector("label").textContent;
                           }
                        });
                        if (jsonArrayHistory[i].value.PrivateCompartment == 1) {
                           document
                              .querySelector(".PrivateCompartment")
                              .setAttribute("checked", true);
                        }
                        if (e.querySelector("input[name=child]")) {
                           if (e.querySelector(".adult-count")) {
                              e
                                 .querySelector(".adult-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.adult;
                           }
                           if (e.querySelector(".child-count")) {
                              e
                                 .querySelector(".child-count")
                                 .querySelector(".count").innerText =
                                 jsonArrayHistory[i].value.passengers.child;
                           }
                           if (jsonArrayHistory[i].value.passengers.child > 0) {
                              if (e.querySelector(".child-count")) {
                                 if (
                                    e
                                       .querySelector(".child-count")
                                       .classList.contains("hidden")
                                 ) {
                                    e.querySelector(".child-count").classList.remove(
                                       "hidden"
                                    );
                                 }
                              }
                           }
                           e.querySelector(".adultcount").value =
                              jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value =
                              jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value =
                              jsonArrayHistory[i].value.passengers.child == 0
                                 ? jsonArrayHistory[i].value.passengers.child
                                 : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value =
                              jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age =
                                 jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`;
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`;
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`;
                                 }
                                 index++;
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach((ie) => {
                                 ie.querySelector("select")
                                    .querySelectorAll("option")
                                    .forEach((iee) => {
                                       if (
                                          iee.value ==
                                          ie
                                             .querySelector("select")
                                             .getAttribute("data-value")
                                       ) {
                                          iee.setAttribute("selected", true);
                                       }
                                    });
                              });
                           }
                        }
                     }
                     // bus
                     if (e.getAttribute("data-form") == "bus") {
                        e.setAttribute(
                           "data-busType",
                           jsonArrayHistory[i].value.busType
                        );
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                     }
                     //   hotel
                     if (e.querySelector(".childcountandage")) {
                        if (e.querySelector(".roomcount")) {
                           e.querySelector(".roomcount").value =
                              jsonArrayHistory[i].value.passengers.length;
                        }
                        if (e.querySelector(".room-count")) {
                           e
                              .querySelector(".room-count")
                              .querySelector(".count").innerText =
                              jsonArrayHistory[i].value.passengers.length;
                        }
                        const html_sample = e.querySelector(".contentRoom");
                        let room_index = 1;
                        let passenger_sum_adult = 0;
                        let passenger_sum_child = 0;
                        e.querySelector(".Rooms").innerHTML = "";
                        for (const element of jsonArrayHistory[i].value.passengers) {
                           passenger_sum_adult += parseInt(element.adult);
                           passenger_sum_child += parseInt(element.child);
                           const clone = html_sample.cloneNode(true);
                           if (lang == "en") {
                              if (clone.querySelector(".numberOfRoom")) {
                                 clone.querySelector(
                                    ".numberOfRoom"
                                 ).innerHTML = `Room<span class="ml-1">${room_index}</span>`;
                              }
                           } else if (lang == "fa") {
                              if (clone.querySelector(".numberOfRoom")) {
                                 clone.querySelector(
                                    ".numberOfRoom"
                                 ).innerHTML = `اتاق<span class="mr-1">${room_index}</span>`;
                              }
                           } else if (lang == "ar") {
                              if (clone.querySelector(".numberOfRoom")) {
                                 clone.querySelector(
                                    ".numberOfRoom"
                                 ).innerHTML = `الغرفة<span class="mr-1">${room_index}</span>`;
                              }
                           }
                           clone.querySelector(".adultcount").value = element.adult;
                           clone.querySelector(".childcount").value = element.child;
                           clone.querySelector(".childcountandage").value = element.ages;
                           clone
                              .querySelector(".adultcount")
                              .setAttribute(
                                 "name",
                                 `_root.rooms__${room_index}.adultcount`
                              );
                           clone
                              .querySelector(".childcountandage")
                              .setAttribute(
                                 "name",
                                 `_root.rooms__${room_index}.childcountandage`
                              );
                           if (element.ages != 0) {
                              let splited_age = element.ages.split(",");
                              splited_age = splited_age.slice(1);
                              let output = "";
                              let index = 1;
                              for (const age of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-left clear-both"><label for="childDropdown-${index}" class="float-left text-sm leading-8 text-textColor">Age ${index}</label><select data-value="${age}" id="select-age${index}" class="select-age float-right w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`;
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label for="childDropdown-${index}" class="float-right text-sm leading-8 text-textColor">سن کودک ${index}</label><select data-value="${age}" id="select-age${index}" class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`;
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label for="childDropdown-${index}" class="float-right text-sm leading-8 text-textColor">عمر الطفل ${index}</label><select data-value="${age}" id="select-age${index}" class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2"><option value="1">تصل إلى 1 سنة</option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`;
                                 }
                                 index++;
                              }
                              clone.querySelector(".section-select-age").innerHTML =
                                 output;
                              clone
                                 .querySelectorAll(".createChildDropdown")
                                 .forEach((ie) => {
                                    ie.querySelector("select")
                                       .querySelectorAll("option")
                                       .forEach((iee) => {
                                          if (
                                             iee.value ==
                                             ie
                                                .querySelector("select")
                                                .getAttribute("data-value")
                                          ) {
                                             iee.setAttribute("selected", true);
                                          }
                                       });
                                 });
                           }
                           e.querySelector(".Rooms").appendChild(clone);
                           room_index++;
                        }
                        if (e.querySelector(".adult-count")) {
                           e
                              .querySelector(".adult-count")
                              .querySelector(".count").innerText = passenger_sum_adult;
                        }
                        if (e.querySelector(".child-count")) {
                           e
                              .querySelector(".child-count")
                              .querySelector(".count").innerText = passenger_sum_child;
                        }
                     }
                     //   insurance
                     if (e.querySelector(".birthday")) {
                        var toggle_calendar = false;
                        let splited_birthday =
                           jsonArrayHistory[i].value.passengers.split(",");
                        e.querySelector(".passengercount").value =
                           splited_birthday.length;
                        if (e.querySelector(".passenger-count")) {
                           e
                              .querySelector(".passenger-count")
                              .querySelector(".count").innerText =
                              splited_birthday.length;
                        }
                        let output = "";
                        let index = 1;
                        for (const element of splited_birthday) {
                           const birth_date = element.replace(/\"/g, "").split("-");
                           const birth_date_day = birth_date[2];
                           const birth_date_month = birth_date[1];
                           const birth_date_year = birth_date[0];
                           if (1900 < birth_date_year && birth_date_year < 2050) {
                              months = {
                                 "01": "January",
                                 1: "January",
                                 "02": "February",
                                 2: "February",
                                 "03": "March",
                                 3: "March",
                                 "04": "April",
                                 4: "April",
                                 "05": "May",
                                 5: "May",
                                 "06": "June",
                                 6: "June",
                                 "07": "July",
                                 7: "July",
                                 "08": "August",
                                 8: "August",
                                 "09": "September",
                                 9: "September",
                                 10: "October",
                                 11: "November",
                                 12: "December",
                              };
                           } else if (1300 < birth_date_year && birth_date_year < 1500) {
                              toggle_calendar = true;
                              months = {
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
                                 12: "اسفند",
                              };
                           }
                           if (lang == "en") {
                              output += `<div class="createPassengerDropdown"><label class="float-right text-sm leading-8 text-textColor">Birthdate ${index}</label><input type="hidden" class="passenger-bithdate" value="${element.replace(
                                 /\"/g,
                                 ""
                              )}"><div class="birthdate-dates clear-both flex gap-2"><div class="birthdate-day relative"><input type="text" maxlength="2" class="birthdate-day-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_day}" placeholder="day"/></div><div class="birthdate-month relative"><input type="text" maxlength="" class="birthdate-month-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${months[birth_date_month]
                                 }" placeholder="month"/></div><div class="birthdate-year relative"><input type="text" maxlength="4" class="birthdate-year-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_year}" placeholder="year"/></div></div></div>`;
                           } else if (lang == "fa") {
                              output += `<div class="createPassengerDropdown"><label class="float-right text-sm leading-8 text-textColor">تاریخ تولد مسافر ${index}</label><input type="hidden" class="passenger-bithdate" value="${element.replace(
                                 /\"/g,
                                 ""
                              )}"><div class="birthdate-dates clear-both flex gap-2"><div class="birthdate-day relative"><input type="text" maxlength="2" class="birthdate-day-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_day}"" placeholder="روز"/></div><div class="birthdate-month relative"><input type="text" maxlength="" class="birthdate-month-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${months[birth_date_month]
                                 }" placeholder="ماه"/></div><div class="birthdate-year relative"><input type="text" maxlength="4" class="birthdate-year-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_year}" placeholder="سال"/></div></div></div>`;
                           } else if (lang == "ar") {
                              output += `<div class="createPassengerDropdown"><label class="float-right text-sm leading-8 text-textColor">تاريخ ميلاد الراكب ${index}</label><input type="hidden" class="passenger-bithdate" value="${element.replace(
                                 /\"/g,
                                 ""
                              )}"><div class="birthdate-dates clear-both flex gap-2"><div class="birthdate-day relative"><input type="text" maxlength="2" class="birthdate-day-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_day}"" placeholder="یوم"/></div><div class="birthdate-month relative"><input type="text" maxlength="" class="birthdate-month-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${months[birth_date_month]
                                 }" placeholder="شهر"/></div><div class="birthdate-year relative"><input type="text" maxlength="4" class="birthdate-year-value w-full rounded-type-1 bg-bgColor-100 h-8 leading-8 px-2 cursor-pointer hover:bg-bgColor-200" value="${birth_date_year}" placeholder="سنة"/></div></div></div>`;
                           }
                           index++;
                        }
                        e.querySelector(".section-passenger-birthday").innerHTML =
                           output;
                        document
                           .querySelectorAll(".birthdate-day-value")
                           .forEach((day) => {
                              day.addEventListener("click", reinitializeDropdowns);
                           });
                        document
                           .querySelectorAll(".birthdate-month-value")
                           .forEach((month) => {
                              month.addEventListener("click", reinitializeDropdowns);
                           });
                        document
                           .querySelectorAll(".birthdate-year-value")
                           .forEach((year) => {
                              year.addEventListener("click", reinitializeDropdowns);
                           });
                        if (toggle_calendar == true) {
                           document
                              .querySelector(".toggle-calendar")
                              .setAttribute("data-active", 1);
                           document.querySelector(".toggle-calendar").click();
                        }
                     }
                  }
               });
               break;
            }
         }
      }
   }
}

function remove_searchHistory(type) {
   localStorage.removeItem(`searchHistory_${type}`);
   document
      .querySelectorAll(`.${type}-searchHistory`)
      .forEach((el) => el.remove());
}





function check_searchHistory(type, isFlightChunck) {

   if (typeof isFlightChunck !== 'undefined') {
      FlightChunckStatus = !!isFlightChunck;
   }


   if (type == "flight") {
      // added for test dep-des
      // fillSearchEngine(type);

      document.querySelector(".formflight").setAttribute("data-form", "flight");
   } else if (type == "multi") {

      // added for test dep-des
      // fillSearchEngine(type);

      document.querySelector(".formflight").setAttribute("data-form", "multi");
   }






   get_searchHistory(
      type,
      document.querySelector(".search-box-container").classList.contains("en")
         ? "en"
         : document.querySelector(".search-box-container").classList.contains("ar")
            ? "ar"
            : "fa"
   );
   document.querySelectorAll(".searchHistory-content").forEach((e) => {
      e.classList.add("hidden");
   });
   if (document.querySelector(`.${type}-searchHistory`)) {
      document.querySelector(`.${type}-searchHistory`).classList.remove("hidden");
   }



   if (type === "flight" || type === "multi") {
      fillSearchEngine(type);  // مستقیم صدا می‌زنیم
   }


}


// ========================
// پر کردن فرم پرواز با آخرین سرچ (flight / multi)
// فراخوانی مستقیم از check_searchHistory
// ========================

function fillSearchEngine(type) {
   // type = 'flight' یا 'multi'
   const isMulti = type === 'multi';
   // const lang = document.documentElement.lang || 'fa';

   // گرفتن آخرین آیتم از استوریج
   // const store = window.__searchHistoryStore?.[type]?.[lang];


   const History = localStorage.getItem(`searchHistory_${type}`);
   const store = JSON.parse(History);



   if (!store || store.length === 0) return;

   const lastItem = store[0]; // جدیدترین
   const v = lastItem.value;

   // پیدا کردن فرم مناسب
   const formSelector = isMulti ? 'form[data-form="multi"]' : 'form[data-form="flight"]';
   const form = document.querySelector(formSelector);
   if (!form) return;

   // --- تغییر نوع پرواز اگر لازم بود ---
   const currentRadio = document.querySelector('input[name="flighttype"]:checked');
   const targetType = isMulti ? '3' : '1';
   if (currentRadio && currentRadio.value !== targetType) {
      const targetRadio = document.querySelector(`input[name="flighttype"][value="${targetType}"]`);
      if (targetRadio) {
         targetRadio.checked = true;
         targetRadio.dispatchEvent(new Event('change', { bubbles: true }));
         // کمی صبر برای رندر شدن فرم درست
         setTimeout(() => applyHistoryToForm(v, isMulti), 100);
         return;
      }
   }

   // اعمال مستقیم
   applyHistoryToForm(v, isMulti);
}

// تابع جدا برای اعمال داده‌ها (برای استفاده در setTimeout هم)
function applyHistoryToForm(v, isMulti) {
   const form = document.querySelector(isMulti ? 'form[data-form="multi"]' : 'form[data-form="flight"]');
   if (!form) return;

   // --- کلاس کابین ---
   const classInput = form.querySelector('input.FlightClass-value');
   if (classInput && v.flightClass) classInput.value = v.flightClass;

   // --- مسافران ---
   const adultInput = form.querySelector('input.adultcount, input[name="adult"]');
   const childInput = form.querySelector('input.childcount');
   const infantInput = form.querySelector('input.infantcount');
   const ageValue = form.querySelector('input.select-age-value');

   if (adultInput && v.passengers?.adult) adultInput.value = v.passengers.adult;
   if (childInput && v.passengers?.child) childInput.value = v.passengers.child || '0';
   if (infantInput && v.passengers?.infant) infantInput.value = v.passengers.infant || '0';
   if (ageValue && v.passengers?.ages && v.passengers.ages !== '0') ageValue.value = v.passengers.ages;

   // --- تاریخ‌ها ---
   if (!isMulti && v.date?.start) {
      const fdate = form.querySelector('input[name="fdate"], input.start_date');
      if (fdate) fdate.value = v.date.start;
   }
   if (!isMulti && v.date?.end) {
      const tdate = form.querySelector('input[name="tdate"]');
      if (tdate) tdate.value = v.date.end;
   }

   // --- مبدا و مقصد ---
   if (isMulti && Array.isArray(v.routes)) {
      const containers = form.querySelectorAll('.route-content');
      v.routes.forEach((route, i) => {
         const container = containers[i];
         if (!container) return;

         // مبدا
         const depInput = container.querySelector('input.departure');
         const fromId = container.querySelector('input.from');
         const depAuto = container.querySelector('.departure-route .auto-fit');
         if (depInput && route.departure?.name) depInput.value = route.departure.name;
         if (fromId && route.departure?.id) fromId.value = route.departure.id;
         if (depAuto && route.departure?.name) depAuto.textContent = route.departure.name.split('-')[0].trim();

         // مقصد
         const destInput = container.querySelector('input.destination');
         const toId = container.querySelector('input.to');
         const destAuto = container.querySelector('.destination-route .auto-fit');
         if (destInput && route.destination?.name) destInput.value = route.destination.name;
         if (toId && route.destination?.id) toId.value = route.destination.id;
         if (destAuto && route.destination?.name) destAuto.textContent = route.destination.name.split('-')[0].trim();

         // تاریخ
         const dateInput = container.querySelector('input.start_date');
         if (dateInput && route.date?.start) dateInput.value = route.date.start;
      });
   } else {
      // oneway / roundtrip
      const depInput = form.querySelector('input.departure');
      const destInput = form.querySelector('input.destination');
      const fromId = form.querySelector('input.from');
      const toId = form.querySelector('input.to');
      const depAuto = form.querySelector('.departure-route .auto-fit');
      const destAuto = form.querySelector('.destination-route .auto-fit');

      if (depInput && v.departure?.name) depInput.value = v.departure.name;
      if (destInput && v.destination?.name) destInput.value = v.destination.name;
      if (fromId && v.departure?.id) fromId.value = v.departure.id;
      if (toId && v.destination?.id) toId.value = v.destination.id;
      if (depAuto && v.departure?.name) depAuto.textContent = v.departure.name.split('-')[0].trim();
      if (destAuto && v.destination?.name) destAuto.textContent = v.destination.name.split('-')[0].trim();

      // تاریخ رفت
      const fdate = form.querySelector('input[name="fdate"], input.start_date');
      if (fdate && v.date?.start) fdate.value = v.date.start;
   }

   // بروزرسانی لیبل مسافر
   if (typeof updatePassengerLabel === 'function') {
      setTimeout(updatePassengerLabel, 50);
   }
}

// هوک: وقتی نوع پرواز تغییر کرد، دوباره پر کن
// document.addEventListener('change', function (e) {
//   if (e.target.matches('input[name="flighttype"]')) {
//     const newType = e.target.value === '3' ? 'multi' : 'flight';
//     setTimeout(() => fillSearchEngine(newType), 120);
//   }
// });







const isToday = (dateToCheck) => {
   const today = new Date();
   const isSameDate =
      dateToCheck.getFullYear() === today.getFullYear() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getDate() === today.getDate();
   return isSameDate;
};


// ـــــــــــــ Helper: نرمال‌سازی ورودی ـــــــــــــ
function normalizeJalaliInput(input) {
   const faDigits = "۰۱۲۳۴۵۶۷۸۹";
   const arDigits = "٠١٢٣٤٥٦٧٨٩";
   return String(input)
      .trim()
      .replace(/[\/٫.]/g, "-") // / یا . به -
      .replace(/[۰-۹]/g, (d) => faDigits.indexOf(d)) // فارسی → 0-9
      .replace(/[٠-٩]/g, (d) => arDigits.indexOf(d)); // عربی → 0-9
}
//<!----------------END JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->




// ——— REPLACE ———
window.historyCardChunkSubmit = function (form, ev) {
   try {
      if (ev) ev.preventDefault();

      // Helpers
      const isTrue = (v) => v === true || v === "true" || v === 1 || v === "1";
      const get = (name) => form.querySelector(`[name="${name}"]`)?.value ?? "";
      const extract = (s) =>
         (typeof window.extractCityName === "function"
            ? window.extractCityName(s)
            : String(s || "")
         ).trim();

      // همیشه تاریخ‌ها را قبل از نوشتن در سشن، به میلادی تبدیل کن
      const convert = (s) => {
         try {
            // اگر convertDateIfPersian در همین فایل تعریف شده باشد، مستقیم از خودش استفاده می‌کنیم
            if (typeof convertDateIfPersian === "function") return convertDateIfPersian(s);
            if (typeof window !== "undefined" && typeof window.convertDateIfPersian === "function")
               return window.convertDateIfPersian(s);
         } catch { }
         // fallback کوچک: اعداد فارسی/عربی را انگلیسی کن و اگر شمسی بود، به میلادی تبدیل کن
         const toEn = (v) => (typeof toEnglishDigits === "function" ? toEnglishDigits(String(v || "")) : String(v || ""));
         const ss = toEn(s);
         const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ss);
         if (m && +m[1] < 1700 && typeof jalaliYmdToGregorianDate === "function") {
            const g = jalaliYmdToGregorianDate(+m[1], +m[2], +m[3]);
            if (g && !isNaN(g)) {
               const y = g.getUTCFullYear();
               const mo = String(g.getUTCMonth() + 1).padStart(2, "0");
               const da = String(g.getUTCDate()).padStart(2, "0");
               return `${y}-${mo}-${da}`;
            }
         }
         return ss;
      };

      // آیا کارت مالتی‌سیتی است؟
      const isMulti =
         !!form.querySelector('[name^="_root.route__0.fromcity"]') ||
         !!form.querySelector('[name^="_root.route__0.tocity"]');

      // ساخت TripGroup
      let TripGroup = [];
      if (isMulti) {
         // route ها را تا وقتی اینپوت وجود دارد بخوان
         for (let i = 0; ; i++) {
            const o = form.querySelector(`[name="_root.route__${i}.fromcity"]`);
            const d = form.querySelector(`[name="_root.route__${i}.tocity"]`);
            const dd = form.querySelector(`[name="_root.route__${i}.departuredate"]`);
            if (!o || !d || !dd) break;

            const oname = form.querySelector(`[name="_root.route__${i}.fromcityName"]`)?.value || "";
            const dname = form.querySelector(`[name="_root.route__${i}.tocityName"]`)?.value || "";

            TripGroup.push({
               Origin: o.value || "",
               Destination: d.value || "",
               OriginName: extract(oname),
               DestinationName: extract(dname),
               DepartureDate: convert(dd.value || ""), // ← حتماً میلادی
            });
         }
      } else {
         // oneway/roundtrip
         const fromId = get("from");
         const toId = get("to");
         const fromtxt = form.querySelector(".departure-text").innerText;
         const fromName = fromtxt || get("fromName") || get("departure") || "";
         const totxt = form.querySelector(".destination-text").innerText;
         const toName = totxt || get("toName") || get("destination") || "";
         const fdate = get("fdate");
         const tdate = get("tdate");



         if (tdate) {
            // roundtrip
            TripGroup = [
               {
                  Origin: fromId, Destination: toId,
                  OriginName: extract(fromName), DestinationName: extract(toName),
                  DepartureDate: convert(fdate),   // ← میلادی
               },
               {
                  Origin: toId, Destination: fromId,
                  OriginName: extract(toName), DestinationName: extract(fromName),
                  DepartureDate: convert(tdate),   // ← میلادی
               },
            ];
         } else {
            // oneway
            TripGroup = [
               {
                  Origin: fromId, Destination: toId,
                  OriginName: extract(fromName), DestinationName: extract(toName),
                  DepartureDate: convert(fdate),   // ← میلادی
               },
            ];
         }
      }

      // SchemaId مطابق منطق قبلی
      const schemaId = isMulti ? 292 : (get("tdate") ? 290 : 291);

      // payload نهایی
      const payload = {
         TripGroup,
         CabinClass: get("flightClass") || "",
         Adults: String(get("adult") || "1"),
         Children: String(get("child") || "0"),
         Infants: String(get("select-age") || "0"),
         rkey: (typeof getSearchCookie === "function" ? getSearchCookie("rkey") : "") || "",
         dmnid: document.querySelector(".search-nav")?.dataset?.dmnid || "",
         SchemaId: schemaId,
         Type: "flight",
         share: "",
         lid: get("lid") || "1",
         SessionId: (Math.random().toString(16).slice(2) + Date.now().toString(16)).slice(0, 24),
      };

      // ذخیره در سشن (میلادی)
      sessionStorage.setItem("sessionSearch", JSON.stringify(payload));

      // هدایت به اکشن خود کارت (بدون QueryString)
      const action =
         form.getAttribute("action") ||
         (isTrue(form.dataset.b2b) && !isTrue(form.dataset.mob) ? "/flight/search/B2B" : "/flight/search");

      window.location.href = action;
      return false;
   } catch (err) {
      console.warn("historyCardChunkSubmit failed:", err);
      return true;
   }
};

