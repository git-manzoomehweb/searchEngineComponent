function form_search_isSubmited(element, event) {
   let isValid = true;
   element.querySelectorAll("input[name=fdate],input[name=tdate]").forEach(e => {
      if (e.value == "" && !e.disabled) {
         event.preventDefault();
         e.style.border = "1px solid #f42e36"
         isValid = false
      }
   });
   if (element.querySelector("input[name=Hotel-Date]")) {
      if (element.querySelector("input[name=Hotel-Date]").value == 1) {
         element.querySelectorAll("input[name=checkin],input[name=checkout]").forEach(e => {
            if (e.value == "" && !e.disabled) {
               event.preventDefault();
               e.style.border = "1px solid #f42e36"
               isValid = false
            }
         })
      }
   }
   if (element.getAttribute("data-form") == "flight" || element.getAttribute("data-form") == "cip" || element.getAttribute("data-form") == "service") {
      var ad = parseInt(element.querySelector(".adultcount").value),
         inf = 0,
         valueAdded = 1,
         ch = 0,
         sum = 0;
      element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
         var age = parseInt(e.value);
         ch += valueAdded;
         if (age < 3) {
            inf += valueAdded
         }
      });
      sum = parseInt(ad + ch);
      if (inf > ad || sum > 10) {
         isValid = false;
         event.preventDefault();
      }
   }
   if (element.getAttribute("data-form") == "multi") {
      var ad = parseInt(element.querySelector(".adultcount").value),
         inf = 0,
         valueAdded = 1,
         ch = 0,
         sum = 0;
      element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
         var age = parseInt(e.value);
         ch += valueAdded;
         if (age < 3) {
            inf += valueAdded
         }
      });
      sum = parseInt(ad + ch);
      if (inf > ad || sum > 10) {
         isValid = false;
         event.preventDefault();
      }

       const routeContents = element.getElementsByClassName("route-content");
       for (let e = 0; e < routeContents.length; e++) {
         const routeContent = routeContents[e];
         routeContent.querySelector(".departure-route .locationId").setAttribute("name", `_root.route__${e}.fromcity`);
         routeContent.querySelector(".destination-route .locationId").setAttribute("name", `_root.route__${e}.tocity`);
         routeContent.querySelector(".start_date").setAttribute("name", `_root.route__${e}.departuredate`);
         routeContent.querySelector(".departure").setAttribute("name", `_root.route__${e}.fromcityName`);
         routeContent.querySelector(".destination").setAttribute("name", `_root.route__${e}.tocityName`);
         routeContent.querySelector(".multi-route-tlt")
           .insertAdjacentHTML(
             "beforeend",
             `<input type="hidden" value="${destination_nth_txt[e]}" name="_root.route__${e}.index"/>`
           );
       }
   }
   if (element.getAttribute("data-form") == "hotel" || element.getAttribute("data-form") == "flighthotel" || element.getAttribute("data-form") == "tour") {
      let childcountandage = element.querySelector(".childcountandage").value;
      if (childcountandage == "0,") {
         element.querySelector(".childcountandage").value = 0
      }
      element.querySelectorAll(".contentRoom").forEach(e => {
         let childCount = e.querySelector(".childcount").value,
            childAge = "";
         e.querySelectorAll(".createChildDropdown").forEach(ie => {
            childAge += "," + ie.querySelector("select").value
         });
         e.querySelector(".childcountandage").value = childCount + childAge
      })
   }
   if (element.getAttribute("data-form") == "insurance") {
      element.querySelectorAll(".datepicker").forEach(e => {
         if (e.value == "") {
            if (element.querySelector(".CountPassenger")) {
               element.querySelector(".CountPassenger").classList.remove("unvisible");
               element.querySelector(".CountPassenger").classList.remove("hidden")
            }
            event.preventDefault();
            e.style.border = "1px solid #f42e36";
            isValid = false
         }
      })
   }
   if (element.getAttribute("data-form") == "train") {
      var ad = parseInt(element.querySelector(".adult").value),
         inf = 0,
         valueAdded = 1,
         ch = 0,
         sum = 0;
      element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
         var age = parseInt(e.value);
         ch += valueAdded;
         if (age < 3) {
            inf += valueAdded
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
      if (element.querySelector("input[name=fdate]")){
         if (element.querySelector("input[name=fdate]").value) {
            georgiaDate = element.querySelector("input[name=fdate]").value;
            georgiaDate_splited = georgiaDate.split("-");
         }
      }
      if (parseInt(georgiaDate_splited[0]) > 1300 && parseInt(georgiaDate_splited[0]) < 1500) {
         georgiaDate = convert_jalali_toGregorian(georgiaDate)
      }
      var searchLang = "fa";
      if (document.querySelector(".search-box-container").classList.contains("en")) {
         var searchLang = "en";
      } else if (document.querySelector(".search-box-container").classList.contains("ar")) {
         var searchLang = "ar";
      }
      if (element.getAttribute("data-form") == "flight") {
         let select_age = "";
         element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
            select_age += e.value + ","
         });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2
         } else {
            element.querySelector(".select-age-value").value = 0
         }
          var flight = {
             value: {
                departure: {
                   name: `${element.querySelector(".departure").value}`,
                   id: `${element.querySelector(".from").value}`
                },
                destination: {
                   name: `${element.querySelector(".destination").value}`,
                   id: `${element.querySelector(".to").value}`
                },
                date: {
                   start: `${element.querySelector(".start_date").value}`,
                   end: `${element.querySelector(".end_date").value}`
                },
                flightClass: `${element.querySelector(".FlightClass-value").value}`,
                passengers: {
                   adult: `${element.querySelector(".adultcount").value}`,
                   child: `${element.querySelector(".childcount").value.indexOf(",")>0?element.querySelector(".childcount").value.slice(0,-1):element.querySelector(".childcount").value}`,
                   ages: `${element.querySelector(".select-age-value").value}`
                },
                persiancurrent: `${element.querySelector(".persiancurrent").value}`,
                georgiaDate: georgiaDate,
                action: `${element.getAttribute("action")}`,
                method: `${element.getAttribute("method")}`,
                flightType: `${element.getAttribute("data-flightType")}`,
                dataform: `${element.getAttribute("data-form")}`,
                searchLang: `${searchLang}`
             },
             time: new Date().getTime(),
             expire: new Date(georgiaDate).getTime()
          };
          set_searchHistory(flight, "flight") 
      } else if (element.getAttribute("data-form") == "multi") {
         let select_age = "";
         element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
            select_age += e.value + ","
         });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2
         } else {
            element.querySelector(".select-age-value").value = 0
         }
          const routeContents = element.getElementsByClassName("route-content");
          const routes = [];
          for (let i = 0; i < routeContents.length; i++) {
              const content = routeContents[i];
              routes.push({
                      departure: {
                          name: content.querySelector(".departure").value,
                          id: content.querySelector(".from").value
                      },
                      destination: {
                          name: content.querySelector(".destination").value,
                          id: content.querySelector(".to").value
                      },
                      date: {
                          start: content.querySelector(".start_date").value
                      },
                      index: {
                         text: content.querySelector(".multi-route-tlt").innerText
                     }
              });
              georgiaDate = routeContents[0].querySelector(".start_date").value
              georgiaDate_splited = georgiaDate.split("-");
              if (parseInt(georgiaDate_splited[0]) > 1300 && parseInt(georgiaDate_splited[0]) < 1500) {
                georgiaDate = convert_jalali_toGregorian(georgiaDate)
             }
          }
          var multi = {
             value: {
                routes: routes,
                flightClass: `${element.querySelector(".FlightClass-value").value}`,
                passengers: {
                   adult: `${element.querySelector(".adultcount").value}`,
                   child: `${element.querySelector(".childcount").value.indexOf(",")>0?element.querySelector(".childcount").value.slice(0,-1):element.querySelector(".childcount").value}`,
                   ages: `${element.querySelector(".select-age-value").value}`
                },
                persiancurrent: `${element.querySelector(".persiancurrent").value}`,
                georgiaDate: georgiaDate,
                action: `${element.getAttribute("action")}`,
                method: `${element.getAttribute("method")}`,
                flightType: `${element.getAttribute("data-flightType")}`,
                dataform: `${element.getAttribute("data-form")}`,
                searchLang: `${searchLang}`
             },
             time: new Date().getTime(),
             expire: new Date(georgiaDate).getTime()
          };
          set_searchHistory(multi, "multi")
      } else if (element.getAttribute("data-form") == "hotel") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach(e => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj)
         });
         const hotel = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").value}`
               },
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(hotel, "hotel")
      } else if (element.getAttribute("data-form") == "flighthotel") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach(e => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj)
         });
         const flighthotel = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").closest("div").querySelector(".date-value")?element.querySelector(".end_date").closest("div").querySelector(".date-value").value:element.querySelector(".end_date").value}`
               },
               flightClass: `${element.querySelector(".FlightClass-value").value}`,
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(flighthotel, "flighthotel")
      } else if (element.getAttribute("data-form") == "tour") {
         const room = new Array();
         element.querySelectorAll(".contentRoom").forEach(e => {
            let obj = new Object();
            obj["adult"] = e.querySelector(".adultcount").value;
            obj["child"] = e.querySelector(".childcount").value;
            obj["ages"] = e.querySelector(".childcountandage").value;
            room.push(obj)
         });
         const tour = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").closest("div").querySelector(".date-value")?element.querySelector(".end_date").closest("div").querySelector(".date-value").value:element.querySelector(".end_date").value}`
               },
               passengers: room,
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(tour, "tour")
      } else if (element.getAttribute("data-form") == "insurance") {
         let passenger_birthday = "";
         element.querySelectorAll(".BirthdatePassenger").forEach((e) => {
            passenger_birthday = passenger_birthday + '"' + e.querySelector(".datepicker").value + '"' + ","
         });
         element.querySelector(".birthday").value = passenger_birthday;
         var val_1 = element.querySelector(".birthday").value;
         var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
         element.querySelector(".birthday").value = val_2;
         const insurance = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").closest("div").querySelector(".date-value")?element.querySelector(".end_date").closest("div").querySelector(".date-value").value:element.querySelector(".end_date").value}`
               },
               passengers: `${element.querySelector(".birthday").value}`,
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(insurance, "insurance")
      }  else if (element.getAttribute("data-form") == "cip") {
         let select_age = "";
         element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
            select_age += e.value + ","
         });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2
         } else {
            element.querySelector(".select-age-value").value = 0
         }
         const cip = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`
               },
               traveltype: `${element.querySelector(".traveltype-value").value}`,
               flighttype: `${element.querySelector(".flighttype-value").value}`,
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",")>0?element.querySelector(".childcount").value.slice(0,-1):element.querySelector(".childcount").value}`,
                  ages: `${element.querySelector(".select-age-value").value}`
               },
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(cip, "cip")
      } else if (element.getAttribute("data-form") == "visa") {
         const visa = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(visa, "visa")
      } else if (element.getAttribute("data-form") == "service") {
         let select_age = "";
         element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
            select_age += e.value + ","
         });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2
         } else {
            element.querySelector(".select-age-value").value = 0
         }
         const service = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`
               },
               passengers: {
                  adult: `${element.querySelector(".adultcount").value}`,
                  child: `${element.querySelector(".childcount").value.indexOf(",")>0?element.querySelector(".childcount").value.slice(0,-1):element.querySelector(".childcount").value}`,
                  ages: `${element.querySelector(".select-age-value").value}`
               },
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               dataform: `${element.getAttribute("data-form")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(service, "service")
      } else if (element.getAttribute("data-form") == "train") {
         let select_age = "";
         element.querySelector(".section-select-age").querySelectorAll("select").forEach(e => {
            select_age += e.value + ","
         });
         if (select_age !== "") {
            element.querySelector(".select-age-value").value = select_age;
            var val_1 = element.querySelector(".select-age-value").value;
            var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
            element.querySelector(".select-age-value").value = val_2
         } else {
            element.querySelector(".select-age-value").value = 0
         }
         const train = {
            value: {
               departure: {
                  name: `${element.querySelector(".departure").value}`,
                  id: `${element.querySelector(".from").value}`
               },
               destination: {
                  name: `${element.querySelector(".destination").value}`,
                  id: `${element.querySelector(".to").value}`
               },
               date: {
                  start: `${element.querySelector(".start_date").closest("div").querySelector(".date-value")?element.querySelector(".start_date").closest("div").querySelector(".date-value").value:element.querySelector(".start_date").value}`,
                  end: `${element.querySelector(".end_date").closest("div").querySelector(".date-value")?element.querySelector(".end_date").closest("div").querySelector(".date-value").value:element.querySelector(".end_date").value}`
               },
               CompartmentType: `${element.querySelector(".CompartmentType").value}`,
               PrivateCompartment: `${element.querySelector(".PrivateCompartment").value}`,
               passengers: {
                  adult: `${element.querySelector(".adult-count").value}`,
                  child: `${element.querySelector(".child-count").value.indexOf(",")>0?element.querySelector(".child-count").value.slice(0,-1):element.querySelector(".child-count").value}`,
                  ages: `${element.querySelector(".select-age-value").value}`
               },
               persiancurrent: `${element.querySelector(".persiancurrent")?element.querySelector(".persiancurrent").value:element.querySelector(".currentdate").value}`,
               georgiaDate: georgiaDate,
               action: `${element.getAttribute("action")}`,
               method: `${element.getAttribute("method")}`,
               trainType: `${element.getAttribute("data-trainType")}`,
               searchLang: `${searchLang}`
            },
            time: new Date().getTime(),
            expire: new Date(georgiaDate).getTime()
         };
         set_searchHistory(train, "train")
      }
   }
 }
 
function convert_jalali_toGregorian(element) {
   var date = element;
   date_splited = date.split("-"),
      gregorian_date = JalaliDate.jalaliToGregorian(date_splited[0], date_splited[1], date_splited[2]);
   date_converted = gregorian_date[0] + "-" + gregorian_date[1] + "-" + gregorian_date[2];
   return date_converted;
};
 
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
            if (!acc.find((obj) => JSON.stringify(obj.value) === JSON.stringify(curr.value))) {
               acc.push(curr);
            }
            return acc;
         }, []);
         localStorage.setItem(`searchHistory_${type}`, JSON.stringify(newJsonArrayHistory));
      } else {
         const arrayHistory = new Array();
         arrayHistory.unshift(json);
         localStorage.setItem(`searchHistory_${type}`, JSON.stringify(arrayHistory));
      }
   }
 }

const reserveButtons = document.querySelectorAll(".reserve-btn");
reserveButtons.forEach((button) => {
    if (button.classList.contains("active-module")) {
      var dataId = button.getAttribute("data-id");
      var type = dataId.split("-")[1]; 
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
            // jsonArrayHistory = jsonArrayHistory.filter(item => item.time !== element.time);
         }
      }
       localStorage.setItem(`searchHistory_${type}`, JSON.stringify(jsonArrayHistory));
       show_searchHistory(type, lang);
   }
 }
 
 function show_searchHistory(type, lang) {
   let months = "";
   if ("fa" == lang) {
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
         12: "اسفند"
      }
   } else {
      months = {
         "01": "January",
         "1": "January",
         "02": "February",
         "2": "February",
         "03": "March",
         "3": "March",
         "04": "April",
         "4": "April",
         "05": "May",
         "5": "May",
         "06": "June",
         "6": "June",
         "07": "July",
         "7": "July",
         "08": "August",
         "8": "August",
         "09": "September",
         "9": "September",
         10: "October",
         11: "November",
         12: "December"
      }
   }
   const showArrayHistory = localStorage.getItem(`searchHistory_${type}`);
   if (showArrayHistory) {
      const jsonArrayHistory = JSON.parse(showArrayHistory);
      if (jsonArrayHistory.length > 0) {
         let output = "";
         let counter = 0;
         for (const element of jsonArrayHistory) {
            let searchLang = element.value.searchLang;
            if (lang == searchLang) {
               counter += 1;
               let departure_name,
                  destination_name = "";
                  if(element.value.flightType == 3){
                   var output_multi = "";
                   const routes = element.value.routes;
                   for (let e = 0; e < routes.length; e++) {
                      const route = routes[e];
                      const splited_start_date = route.date.start.split("-");
                      output_multi += `<input type="hidden" value="${route.index.text}" name="_root.route__${e}.index">
                      <input type="hidden" value="${route.departure.name}" name="_root.route__${e}.fromcityName">
                      <input type="hidden" value="${route.departure.id}" name="_root.route__${e}.fromcity">
                      <input type="hidden" value="${route.destination.name}" name="_root.route__${e}.tocityName">
                      <input type="hidden" value="${route.destination.id}" name="_root.route__${e}.tocity">
                      <input type="hidden" value="${route.date.start}" name="_root.route__${e}.departuredate">
                      <div><span>${route.departure.name}</span>
                      ${lang=="fa"?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`}
                      <span>${route.destination.name}</span>
                      <div class="date"><span>${splited_start_date[2]}</span><span>${months[splited_start_date[1]]}</span></div>
                      </div>`;
                   }
                  }else {
                   if (element.value.departure.name.indexOf("-") > -1) {
                      const splited_element = element.value.departure.name.split("-");
                      if (lang == "fa") {
                         departure_name = splited_element[1]
                      } else {
                         departure_name = splited_element[0]
                      }
                   } else {
                      const splited_element = element.value.departure.name.split("(");
                      departure_name = splited_element[0]
                   }
                   if (element.value.destination) {
                      if (element.value.destination.name.indexOf("-") > -1) {
                         const splited_element = element.value.destination.name.split("-");
                         if (lang == "fa") {
                            destination_name = splited_element[1]
                         } else {
                            destination_name = splited_element[0]
                         }
                      } else {
                         const splited_element = element.value.destination.name.split("(");
                         destination_name = splited_element[0]
                      }
                   }
                   if(element.value.date){
                     if(element.value.date.start){
                        var splited_start_date = element.value.date.start.split("-");
                      }
                      if(element.value.date.end){
                        var splited_end_date = element.value.date.end.split("-");
                        var date_output = `<div class="date"><div><span>${splited_start_date[2]}</span><span>${months[splited_start_date[1]]}</span></div>${splited_end_date[2]?`<div class="space">-</div><div><span>${splited_end_date[2]}</span><span>${months[splited_end_date[1]]}</span></div>`:""}</div>`;
                      } else if(!element.value.date.end){
                        var date_output = `<div class="date"><div><span>${splited_start_date[2]}</span><span>${months[splited_start_date[1]]}</span></div><div></div></div>`;
                      }
                      
                   }
                  }
               
               let passenger_room = "";
               let passenger_room_count = 0;
               if (element.value.passengers){
                  if (element.value.passengers.length !== undefined) {
                     let index = 1;
                     for (const room of element.value.passengers) {
                        passenger_room += `<input value="${room.adult}" type="hidden" name="_root.rooms__${index}.adultcount"/><input value="${room.ages}" type="hidden" name="_root.rooms__${index}.childcountandage">`;
                        passenger_room_count += parseInt(room.adult) + parseInt(room.child);
                        index++;
                     }
                  }
               }
               if (type == "flight") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="from"/><input value="${element.value.destination.id}" type="hidden" name="to"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.flightClass}" type="hidden" name="flightClass"/><input value="${element.value.passengers.adult}" type="hidden" name="adult"/><input value="${element.value.passengers.child==0?element.value.passengers.child:element.value.passengers.child+","}" type="hidden" name="child"/><input value="${element.value.passengers.ages}" type="hidden" name="select-age"/><div><span>${departure_name}</span>${lang=="fa"?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`}<span>${destination_name}</span></div>${date_output}<div class="passenger"><span class="space">${parseInt(element.value.passengers.adult)+parseInt(element.value.passengers.child)}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "multi") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.flightClass}" type="hidden" name="flightClass"/><input value="${element.value.passengers.adult}" type="hidden" name="adult"/><input value="${element.value.passengers.child==0?element.value.passengers.child:element.value.passengers.child+","}" type="hidden" name="child"/><input value="${element.value.passengers.ages}" type="hidden" name="select-age"/>${output_multi}<div class="passenger"><span class="space">${parseInt(element.value.passengers.adult)+parseInt(element.value.passengers.child)}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               }else if (type == "hotel") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="cityid"/><input value="${element.value.departure.name}" type="hidden" name="coHotel"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/>${passenger_room}<div><span>${departure_name}</span></div>${date_output}<div class="passenger"><span class="space">${passenger_room_count}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "flighthotel") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="from"/><input value="${element.value.destination.id}" type="hidden" name="to"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.flightClass}" type="hidden" name="flightClass"/>${passenger_room}<div><span>${departure_name}</span>${lang=="fa"?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`}<span>${destination_name}</span></div>${date_output}<div class="passenger"><span class="space">${passenger_room_count}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "tour") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="tourname"/><input value="${element.value.departure.name}" type="hidden" name="tour-search-text"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/>${passenger_room}<div><span>${departure_name}</span></div>${date_output}<div class="passenger"><span class="space">${passenger_room_count}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "insurance") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="countryid"/><input value="${element.value.departure.name}" type="hidden" name="insurancecountry"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value='${element.value.passengers}' name="birthday" type="hidden"/><input value='${element.value.passengers.split(",").length}' name="passengercount" type="hidden"/><div><span>${departure_name}</span></div>${date_output}<div class="passenger"><span class="space">${element.value.passengers.split(",").length}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "cip") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="from"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.traveltype}" type="hidden" name="traveltype"/><input value="${element.value.flighttype}" type="hidden" name="flighttype"/><input value="${element.value.passengers.adult}" type="hidden" name="adult"/><input value="${element.value.passengers.child==0?element.value.passengers.child:element.value.passengers.child+","}" type="hidden" name="child"/><input value="${element.value.passengers.ages}" type="hidden" name="select-age"/><div><span>${departure_name}</span></div>${date_output}<div class="passenger"><span class="space">${parseInt(element.value.passengers.adult)+parseInt(element.value.passengers.child)}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "visa") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="from"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><div><span>${departure_name}</span></div><button type="submit"></button></form>`;
               } else if (type == "service") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.id}" type="hidden" name="cityid"/><input value="${element.value.departure.name}" type="hidden" name="coHotel"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.traveltype}" type="hidden" name="traveltype"/><input value="${element.value.flighttype}" type="hidden" name="flighttype"/><input value="${element.value.passengers.adult}" type="hidden" name="adult"/><input value="${element.value.passengers.child==0?element.value.passengers.child:element.value.passengers.child+","}" type="hidden" name="child"/><input value="${element.value.passengers.ages}" type="hidden" name="select-age"/><div><span>${departure_name}</span></div>${date_output}<div class="passenger"><span class="space">${parseInt(element.value.passengers.adult)+parseInt(element.value.passengers.child)}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               } else if (type == "train") {
                  output += `<form method="${element.value.method}" action="${element.value.action}" rel='nofollow'><input value="${element.value.departure.name}" type="hidden" name="departure"/><input value="${element.value.departure.id}" type="hidden" name="from"/><input value="${element.value.destination.name}" type="hidden" name="destination"/><input value="${element.value.destination.id}" type="hidden" name="to"/><input value="${element.value.date.start}" type="hidden" name="fdate"/><input value="${element.value.date.end}" type="hidden" name="tdate"/><input value="${element.value.persiancurrent}" type="hidden" name="persiancurrent"/><input value="${element.value.CompartmentType}" type="hidden" name="CompartmentType"/><input value="${element.value.PrivateCompartment}" type="hidden" name="PrivateCompartment"/><input value="${element.value.passengers.adult}" type="hidden" name="adult"/><input value="${element.value.passengers.child==0?element.value.passengers.child:element.value.passengers.child+","}" type="hidden" name="child"/><input value="${element.value.passengers.ages}" type="hidden" name="select-age"/><div><span>${departure_name}</span>${lang=="fa"?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="arrow-history-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`}<span>${destination_name}</span></div>${date_output}<div class="passenger"><span class="space">${parseInt(element.value.passengers.adult)+parseInt(element.value.passengers.child)}</span><span class="space">${lang === "fa" ? "مسافر" : lang === "ar" ? "ركاب" : "passengers"}</span></div><button type="submit"></button></form>`;
               }
            }
         }
         if (counter > 0) {
            document.querySelector(".search-box-container").insertAdjacentHTML(
               "afterend",
               `<div class="searchHistory-content ${lang === "en" ? "en-lang" : lang === "ar" ? "ar-lang" : "fa-lang"} ${type}-searchHistory"><div class="title"><span class="sub-title"><svg aria-label="HistoryIcon" width="24" height="24" viewBox="0 0 24 24" fill="#29263d" style="width: 1.5rem; height: 1.5rem;vertical-align: middle;"><path d="M12.8 11.65L15.675 14.475C15.825 14.625 15.9 14.8042 15.9 15.0125C15.9 15.2208 15.825 15.4 15.675 15.55C15.525 15.7 15.35 15.775 15.15 15.775C14.95 15.775 14.775 15.7 14.625 15.55L11.525 12.5C11.4416 12.4167 11.3833 12.3292 11.35 12.2375C11.3166 12.1458 11.3 12.05 11.3 11.95V7.675C11.3 7.45833 11.3708 7.27917 11.5125 7.1375C11.6541 6.99583 11.8333 6.925 12.05 6.925C12.2666 6.925 12.4458 6.99583 12.5875 7.1375C12.7291 7.27917 12.8 7.45833 12.8 7.675V11.65ZM11.925 21C9.59165 21 7.61248 20.25 5.98748 18.75C4.36248 17.25 3.39165 15.375 3.07498 13.125C3.04165 12.8917 3.08748 12.6917 3.21248 12.525C3.33748 12.3583 3.51665 12.2667 3.74998 12.25C3.94998 12.2333 4.12498 12.2958 4.27498 12.4375C4.42498 12.5792 4.51665 12.75 4.54998 12.95C4.83331 14.8167 5.64998 16.375 6.99998 17.625C8.34998 18.875 9.99165 19.5 11.925 19.5C14.0416 19.5 15.8333 18.7583 17.3 17.275C18.7666 15.7917 19.5 13.9917 19.5 11.875C19.5 9.80833 18.7583 8.0625 17.275 6.6375C15.7916 5.2125 14.0083 4.5 11.925 4.5C10.7916 4.5 9.72915 4.75833 8.73748 5.275C7.74581 5.79167 6.88331 6.475 6.14998 7.325H8.02498C8.24165 7.325 8.42081 7.39583 8.56248 7.5375C8.70415 7.67917 8.77498 7.85833 8.77498 8.075C8.77498 8.29167 8.70415 8.47083 8.56248 8.6125C8.42081 8.75417 8.24165 8.825 8.02498 8.825H4.29998C4.08331 8.825 3.90415 8.75417 3.76248 8.6125C3.62081 8.47083 3.54998 8.29167 3.54998 8.075V4.375C3.54998 4.15833 3.62081 3.97917 3.76248 3.8375C3.90415 3.69583 4.08331 3.625 4.29998 3.625C4.51665 3.625 4.69581 3.69583 4.83748 3.8375C4.97915 3.97917 5.04998 4.15833 5.04998 4.375V6.275C5.91665 5.25833 6.94581 4.45833 8.13748 3.875C9.32915 3.29167 10.5916 3 11.925 3C13.175 3 14.35 3.23333 15.45 3.7C16.55 4.16667 17.5125 4.80417 18.3375 5.6125C19.1625 6.42083 19.8125 7.36667 20.2875 8.45C20.7625 9.53333 21 10.7 21 11.95C21 13.2 20.7625 14.375 20.2875 15.475C19.8125 16.575 19.1625 17.5333 18.3375 18.35C17.5125 19.1667 16.55 19.8125 15.45 20.2875C14.35 20.7625 13.175 21 11.925 21Z"></path></svg>
          ${lang === "en" ? "Recent searches" : lang === "ar" ? "عمليات البحث الأخيرة" : "جستجوهای اخیر"}<span class="space">(${counter
          })</span></span><span class="remove-link" onclick="remove_searchHistory('${type}')">${lang === "en" ? "Clear searches" : lang === "ar" ? "مسح عمليات البحث" : lang === "fa" ?  "پاک کردن" : ""}</span></div><div class="output-content">${output}</div></div>`);
            update_searchHistory(type, lang);
         }
      }
   }
 }
 
 function update_searchHistory(type, lang) {
   let months = "";
   if (lang == "fa") {
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
         12: "اسفند"
      }
   } else {
      months = {
         "01": "January",
         "02": "February",
         "03": "March",
         "04": "April",
         "05": "May",
         "06": "June",
         "07": "July",
         "08": "August",
         "09": "September",
         10: "October",
         11: "November",
         12: "December"
      }
   }
   const showArrayHistory = localStorage.getItem(`searchHistory_${type}`);
   if (showArrayHistory) {
      const jsonArrayHistory = JSON.parse(showArrayHistory);
      if (jsonArrayHistory.length > 0) {
         for (let i = 0; i < jsonArrayHistory.length; i++) {
            if (jsonArrayHistory[i].value.searchLang === lang) {
               document.querySelectorAll(".form-search").forEach((e) => {
                  if (e.getAttribute("data-form") == type) {
                     e.setAttribute("action", jsonArrayHistory[i].value.action);
                     e.setAttribute("method", jsonArrayHistory[i].value.method);
                     if(e.querySelector(".start_date")){
                        e.querySelector(".start_date").insertAdjacentHTML("afterend", `<span class="unvisible hidden">${jsonArrayHistory[i].value.georgiaDate}</span>`);
                     }
                     if (jsonArrayHistory[i].value.flightType == 2) {
                        document.getElementById("oneway").classList.remove("active-r-btn");
                        document.getElementById("multi").classList.remove("active-r-btn");
                        document.getElementById("backtoback").classList.add("active-r-btn");
                        if (document.getElementById("backtoback").querySelector("input[type=radio]")) {
                           document.getElementById("backtoback").querySelector("input[type=radio]").checked = true;
                        }
                        e.querySelector(".end_date").classList.add("nextCalOpening");
                        e.querySelector(".end_date").removeAttribute("disabled");
                        if (e.querySelector(".end_date").closest(".reserve-field")) {
                           e.querySelector(".end_date").closest(".reserve-field").classList.remove("no-activedate");
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
                    
                     if (jsonArrayHistory[i].value.trainType == 2) {
                        document.getElementById("oneway").classList.remove("active-r-btn");
                        document.getElementById("backtoback").classList.add("active-r-btn");
                        if (document.getElementById("backtoback").querySelector("input[type=radio]")) {
                           document.getElementById("backtoback").querySelector("input[type=radio]").checked = true;
                        }
                        e.querySelector(".end_date").classList.add("nextCalOpening");
                        e.querySelector(".end_date").removeAttribute("disabled");
                        if (e.querySelector(".end_date").closest(".reserve-field")) {
                           e.querySelector(".end_date").closest(".reserve-field").classList.remove("no-activedate");
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
                     e.querySelector(".persiancurrent").value = jsonArrayHistory[i].value.persiancurrent;
                    
                   if(jsonArrayHistory[i].value.flightType == 3){
                      const route_len = jsonArrayHistory[i].value.routes.length;
                      if(document.querySelector(".searchHistory-content").classList.contains("multi-searchHistory")){
                        if(route_len > 2){
                           var add = document.querySelector(".add-routs");
                           for (let t = 0; t < route_len-2; t++) {
                              addMulticityRoute(add);
                           }
                        }
                      }
                      const routeContainer = document.querySelector('.route-container');
                      const routeContents = routeContainer.querySelectorAll('.route-content');
                      for (let y = 0; y < routeContents.length; y++) {
                        const departure = routeContents[y].querySelector('.departure');
                        const destination = routeContents[y].querySelector('.destination');
                     
                        const dep_autofit = routeContents[y].querySelector('.departure-route').querySelector(".auto-fit");
                        const des_autofit = routeContents[y].querySelector('.destination-route').querySelector(".auto-fit");
                        if (departure) {
                           departure.value = jsonArrayHistory[i].value.routes[y].departure.name;
                           routeContents[y].querySelector('.from').value = jsonArrayHistory[i].value.routes[y].departure.id;
                       }
                       if(dep_autofit) {
                        dep_autofit.innerText = jsonArrayHistory[i].value.routes[y].departure.name.split("-")[0]
                       }
                       if(destination) {
                        destination.value = jsonArrayHistory[i].value.routes[y].destination.name;
                        routeContents[y].querySelector('.to').value = jsonArrayHistory[i].value.routes[y].destination.id;
                       }
                       if(des_autofit) {
                        des_autofit.innerText = jsonArrayHistory[i].value.routes[y].destination.name.split("-")[0]
                       }
                       if (routeContents[y].querySelector(".departure-date .selected-day")) {
                        const splited_start_date = jsonArrayHistory[i].value.routes[y].date.start.split("-");
                        routeContents[y].querySelector(".departure-date .selected-day").innerText = splited_start_date[2];
                        routeContents[y].querySelector(".departure-date .selected-month").innerText = months[splited_start_date[1]]
                     }
                     routeContents[y].querySelector(".start_date").value = jsonArrayHistory[i].value.routes[y].date.start;
                     }
                   } else{
                     e.querySelector(".departure").value = jsonArrayHistory[i].value.departure.name;
                     e.querySelector(".from").value = jsonArrayHistory[i].value.departure.id;
                     e.querySelector(".destination") ? (e.querySelector(".destination").value = jsonArrayHistory[i].value.destination.name) : "";
                     e.querySelector(".to") ? (e.querySelector(".to").value = jsonArrayHistory[i].value.destination.id) : "";
                     if (e.querySelector(".departure-route .auto-fit")) {
                        if (jsonArrayHistory[i].value.departure.name.indexOf("-") > -1) {
                           const splited_element = jsonArrayHistory[i].value.departure.name.split("-");
                           e.querySelector(".departure-route .auto-fit").innerText = splited_element[1]
                        } else {
                           const splited_element = jsonArrayHistory[i].value.departure.name.split("(");
                           e.querySelector(".departure-route .auto-fit").innerText = splited_element[i]
                        }
                     }
                     if (e.querySelector(".destination-route .auto-fit")) {
                        if (jsonArrayHistory[i].value.destination.name.indexOf("-") > -1) {
                           const splited_element = jsonArrayHistory[i].value.destination.name.split("-");
                           e.querySelector(".destination-route .auto-fit").innerText = splited_element[1]
                        } else {
                           const splited_element = jsonArrayHistory[i].value.destination.name.split("(");
                           e.querySelector(".destination-route .auto-fit").innerText = splited_element[i]
                        }
                     }
                     if (e.querySelector(".departure-date .selected-day")) {
                        const splited_start_date = jsonArrayHistory[i].value.date.start.split("-");
                        e.querySelector(".departure-date .selected-day").innerText = splited_start_date[2];
                        e.querySelector(".departure-date .selected-month").innerText = months[splited_start_date[1]]
                     }
                     if (e.querySelector(".return-date .selected-day")) {
                        const splited_end_date = jsonArrayHistory[i].value.date.end.split("-");
                        if (splited_end_date[1]) {
                           e.querySelector(".return-date .selected-day").innerText = splited_end_date[2];
                           e.querySelector(".return-date .selected-month").innerText = months[splited_end_date[1]]
                        }
                     }
                     if(e.querySelector(".start_date")){
                        e.querySelector(".start_date").value = jsonArrayHistory[i].value.date.start;
                     }
                     if(e.querySelector(".end_date")) {
                        e.querySelector(".end_date").value = jsonArrayHistory[i].value.date.end;
                     }
                   }
                     if (e.querySelector(".FlightClass-value")) {
                        e.setAttribute("data-flightType", jsonArrayHistory[i].value.flightType);
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        e.querySelector(".FlightClass-value").value = jsonArrayHistory[i].value.flightClass;
                        e.querySelectorAll(".FlightClass li").forEach((ie) => {
                           if (ie.getAttribute("data-value") == jsonArrayHistory[i].value.flightClass) {
                            ie.click();
                           }
                        });
                        if (e.querySelector("input[name=child]")) {
                              if (e.querySelector(".adult-count")) {
                                 e.querySelector(".adult-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.adult;
                              }
                              if (e.querySelector(".child-count")) {
                                 e.querySelector(".child-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.child;
                              }
                              if (jsonArrayHistory[i].value.passengers.child > 0) {
                                 if (e.querySelector(".child-count")) {
                                    if (e.querySelector(".child-count").classList.contains("hidden")) {
                                       e.querySelector(".child-count").classList.remove("hidden");
                                    }
                                 }
                              }
                           e.querySelector(".adultcount").value = jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value = jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value = jsonArrayHistory[i].value.passengers.child == 0 ? jsonArrayHistory[i].value.passengers.child : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value = jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age = jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`
                                 }
                                 index++
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach(ie => {
                                 ie.querySelector("select").querySelectorAll("option").forEach(iee => {
                                    if (iee.value == ie.querySelector("select").getAttribute("data-value")) {
                                       iee.setAttribute("selected", true)
                                    }
                                 })
                              });
                           }
                        }
                     }
                     // cip
                     if (e.querySelector(".traveltype-value")) {
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        e.querySelector(".traveltype-value").value = jsonArrayHistory[i].value.traveltype;
                        e.querySelectorAll(".traveltype li").forEach((ie) => {
                           if (ie.getAttribute("data-value") == jsonArrayHistory[i].value.traveltype) {
                            ie.click();
                           }
                        });
                        e.querySelector(".flighttype-value").value = jsonArrayHistory[i].value.flighttype;
                        e.querySelectorAll(".flighttype li").forEach((ie) => {
                           if (ie.getAttribute("data-value") == jsonArrayHistory[i].value.flighttype) {
                            ie.click();
                           }
                        });
                        if (e.querySelector("input[name=child]")) {
                              if (e.querySelector(".adult-count")) {
                                 e.querySelector(".adult-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.adult;
                              }
                              if (e.querySelector(".child-count")) {
                                 e.querySelector(".child-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.child;
                              }
                              if (jsonArrayHistory[i].value.passengers.child > 0) {
                                 if (e.querySelector(".child-count")) {
                                    if (e.querySelector(".child-count").classList.contains("hidden")) {
                                       e.querySelector(".child-count").classList.remove("hidden");
                                    }
                                 }
                              }
                           e.querySelector(".adultcount").value = jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value = jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value = jsonArrayHistory[i].value.passengers.child == 0 ? jsonArrayHistory[i].value.passengers.child : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value = jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age = jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`
                                 }
                                 index++
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach(ie => {
                                 ie.querySelector("select").querySelectorAll("option").forEach(iee => {
                                    if (iee.value == ie.querySelector("select").getAttribute("data-value")) {
                                       iee.setAttribute("selected", true)
                                    }
                                 })
                              });
                           }
                        }
                     }
                     // service
                     if (e.getAttribute("data-form") == "service") {
                        e.setAttribute("data-form", jsonArrayHistory[i].value.dataform);
                        if (e.querySelector("input[name=child]")) {
                              if (e.querySelector(".adult-count")) {
                                 e.querySelector(".adult-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.adult;
                              }
                              if (e.querySelector(".child-count")) {
                                 e.querySelector(".child-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.child;
                              }
                              if (jsonArrayHistory[i].value.passengers.child > 0) {
                                 if (e.querySelector(".child-count")) {
                                    if (e.querySelector(".child-count").classList.contains("hidden")) {
                                       e.querySelector(".child-count").classList.remove("hidden");
                                    }
                                 }
                              }
                           e.querySelector(".adultcount").value = jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".childcount").value = jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value = jsonArrayHistory[i].value.passengers.child == 0 ? jsonArrayHistory[i].value.passengers.child : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value = jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age = jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">Age ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">سن کودک ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown mb-4 w-full float-right clear-both"><label class="float-right text-sm leading-8 text-textColor" for="childDropdown-${index}">عمر الطفل ${index}</label><select class="select-age float-left w-full rounded-type-1 bg-bgColor-100 h-12 leading-12 px-2" data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`
                                 }
                                 index++
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach(ie => {
                                 ie.querySelector("select").querySelectorAll("option").forEach(iee => {
                                    if (iee.value == ie.querySelector("select").getAttribute("data-value")) {
                                       iee.setAttribute("selected", true)
                                    }
                                 })
                              });
                           }
                        }
                     }
                     //  train
                     if (e.querySelector(".CompartmentType")) {
                        e.setAttribute("data-trainType", jsonArrayHistory[i].value.trainType);
                        e.querySelector(".CompartmentType").value = jsonArrayHistory[i].value.CompartmentType;
                        e.querySelector(".PrivateCompartment").value = jsonArrayHistory[i].value.PrivateCompartment;
                        e.querySelectorAll("option").forEach((ie) => {
                           if (ie.value == jsonArrayHistory[i].value.CompartmentType) {
                              ie.setAttribute("selected", true);
                           }
                        });
                        if (jsonArrayHistory[i].value.PrivateCompartment == 1) {
                           document.querySelector(".PrivateCompartment").setAttribute("checked", true)
                        }
                        if (e.querySelector("input[name=child]")) {
                           if (e.querySelector(".passenger-counts")) {
                              e.querySelector(".passenger-counts").querySelector(".count").innerText = parseInt(jsonArrayHistory[i].value.passengers.adult) + parseInt(jsonArrayHistory[i].value.passengers.child);
                           } else {
                              if (e.querySelector(".count-adult")) {
                                 e.querySelector(".count-adult").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.adult;
                              }
                              if (e.querySelector(".count-child")) {
                                 e.querySelector(".count-child").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.child;
                              }
                              if (jsonArrayHistory[i].value.passengers.child > 0) {
                                 if (e.querySelector(".count-passenger-child")) {
                                    if (e.querySelector(".count-passenger-child").classList.contains("unvisible") || e.querySelector(".count-passenger-child").classList.contains("hidden")) {
                                       e.querySelector(".count-passenger-child").classList.remove("unvisible");
                                       e.querySelector(".count-passenger-child").classList.remove("hidden");
                                    }
                                 }
                              }
                           }
                           e.querySelector(".adult-count").value = jsonArrayHistory[i].value.passengers.adult;
                           e.querySelector(".child-count").value = jsonArrayHistory[i].value.passengers.child;
                           e.querySelector("input[name=child]").value = jsonArrayHistory[i].value.passengers.child == 0 ? jsonArrayHistory[i].value.passengers.child : jsonArrayHistory[i].value.passengers.child + ",";
                           e.querySelector(".select-age-value").value = jsonArrayHistory[i].value.passengers.ages;
                           if (jsonArrayHistory[i].value.passengers.ages != 0) {
                              const splited_age = jsonArrayHistory[i].value.passengers.ages.split(",");
                              let output = "";
                              let index = 1;
                              for (const element of splited_age) {
                                 if (lang == "en") {
                                    output += `<div class="createChildDropdown"><label for="childDropdown-${index}">Age ${index}</label><select data-value="${element}"><option value="1">Up to 1</option><option value="2">1 to 2 </option><option value="3">2 to 3 </option><option value="4">3 to 4 </option><option value="5">4 to 5 </option><option value="6">5 to 6 </option><option value="7">6 to 7 </option><option value="8">7 to 8 </option><option value="9">8 to 9 </option><option value="10">9 to 10 </option><option value="11">10 to 11 </option><option value="12">11 to 12 </option></select></div>`
                                 } else if (lang == "fa") {
                                    output += `<div class="createChildDropdown"><label for="childDropdown-${index}">سن کودک ${index}</label><select data-value="${element}"><option value="1">تا 1 سال</option><option value="2">1 تا 2 </option><option value="3">2 تا 3 </option><option value="4">3 تا 4 </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>`
                                 } else if (lang == "ar") {
                                    output += `<div class="createChildDropdown"><label for="childDropdown-${index}">عمر الطفل ${index}</label><select data-value="${element}"><option value="1">تصل إلى 1 سنة/option><option value="2">1 إلى 2 </option><option value="3">2 إلى 3 </option><option value="4">3 إلى 4 </option><option value="5">4 إلى 5 </option><option value="6">5 إلى 6 </option><option value="7">6 إلى 7 </option><option value="8">7 إلى 8 </option><option value="9">8 إلى 9 </option><option value="10">9 إلى 10 </option><option value="11">10 إلى 11 </option><option value="12">11 إلى 12 </option></select></div>`
                                 }
                                 index++
                              }
                              e.querySelector(".section-select-age").innerHTML = output;
                              e.querySelectorAll(".createChildDropdown").forEach(ie => {
                                 ie.querySelector("select").querySelectorAll("option").forEach(iee => {
                                    if (iee.value == ie.querySelector("select").getAttribute("data-value")) {
                                       iee.setAttribute("selected", true)
                                    }
                                 })
                              });
                           }
                        }
                     }
                   //   hotel
                     if (e.querySelector(".childcountandage")) {
                        if (e.querySelector(".roomcount")) {
                           e.querySelector(".roomcount").value = jsonArrayHistory[i].value.passengers.length;
                        }
                        if (e.querySelector(".room-count")) {
                           e.querySelector(".room-count").querySelector(".count").innerText = jsonArrayHistory[i].value.passengers.length;
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
                              if(clone.querySelector(".numberOfRoom")){
                                 clone.querySelector(".numberOfRoom").innerText = `Room ${room_index}`;
                              }
                           } else if (lang == "fa") {
                              if(clone.querySelector(".numberOfRoom")){
                                 clone.querySelector(".numberOfRoom").innerText = `اتاق ${room_index}`;
                              }
                           } else if (lang == "ar") {
                              if(clone.querySelector(".numberOfRoom")){
                                 clone.querySelector(".numberOfRoom").innerText = `الغرفة ${room_index}`;
                              }
                           }
                           clone.querySelector(".adultcount").value = element.adult;
                           clone.querySelector(".childcount").value = element.child;
                           clone.querySelector(".childcountandage").value = element.ages;
                           clone.querySelector(".adultcount").setAttribute("name", `_root.rooms__${room_index}.adultcount`);
                           clone.querySelector(".childcountandage").setAttribute("name", `_root.rooms__${room_index}.childcountandage`);
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
                              clone.querySelector(".section-select-age").innerHTML = output;
                              clone.querySelectorAll(".createChildDropdown").forEach(ie => {
                                 ie.querySelector("select").querySelectorAll("option").forEach(iee => {
                                    if (iee.value == ie.querySelector("select").getAttribute("data-value")) {
                                       iee.setAttribute("selected", true);
                                    }
                                 });
                              });
                           }
                           e.querySelector(".Rooms").appendChild(clone);
                           room_index++;
                        }
                           if (e.querySelector(".adult-count")) {
                              e.querySelector(".adult-count").querySelector(".count").innerText = passenger_sum_adult;
                           }
                           if (e.querySelector(".child-count")) {
                              e.querySelector(".child-count").querySelector(".count").innerText = passenger_sum_child;
                           }
                     }
                   //   insurance
                     if (e.querySelector(".birthday")) {
                        let splited_birthday = jsonArrayHistory[i].value.passengers.split(",");
                        e.querySelector(".passengercount").value = splited_birthday.length;
                        if (e.querySelector(".passenger-counts")) {
                           e.querySelector(".passenger-counts").querySelector(".count").innerText = splited_birthday.length;
                        } else {
                           if (e.querySelector(".count-adult")) {
                              e.querySelector(".count-adult").querySelector(".count").innerText = splited_birthday.length;
                           }
                        }
                        let output = "";
                        let index = 1;
                        for (const element of splited_birthday) {
                           if (lang == "en") {
                              output += `<div class="BirthdatePassenger"><label class="label">Birthdate ${index}</label><input class="datepicker BithdatePassenger" value='${element.replace(/\"/g,"")}' placeholder="" type="text" autocomplete="off" readonly required=""><div class="clr"></div></div>`;
                           } else if (lang == "fa") {
                              output += `<div class="BirthdatePassenger"><label class="label">تاریخ تولد مسافر ${index}</label><input class="datepicker BithdatePassenger" value='${element.replace(/\"/g,"")}' placeholder="تاریخ میلادی" type="text" autocomplete="off" readonly required=""><div class="clr"></div></div>`;
                           } else if (lang == "ar") {
                              output += `<div class="BirthdatePassenger"><label class="label">تاريخ ميلاد الراكب ${index}</label><input class="datepicker BithdatePassenger" value='${element.replace(/\"/g,"")}' placeholder="تاريخ ميلادي" type="text" autocomplete="off" readonly required=""><div class="clr"></div></div>`;
                           }
                           index++;
                        }
                        e.querySelector(".Wrapper-BirthdatePassenger").innerHTML = output;
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
   document.querySelector(`.${type}-searchHistory`).remove();
 }
 
 function check_searchHistory(type) {
   if(type == "flight"){
      document.querySelector(".formflight").setAttribute("data-form", "flight");
   }else if(type == "multi") {
      document.querySelector(".formflight").setAttribute("data-form", "multi");
   }
   get_searchHistory(type,
      document.querySelector(".search-box-container").classList.contains("en") ? "en" :
      document.querySelector(".search-box-container").classList.contains("ar") ? "ar" : "fa");
   document.querySelectorAll(".searchHistory-content").forEach((e) => {
      e.classList.add("hidden");
   });
   if (document.querySelector(`.${type}-searchHistory`)) {
      document.querySelector(`.${type}-searchHistory`).classList.remove("hidden");
   }
 }
 const isToday = (dateToCheck) => {
   const today = new Date();
   const isSameDate = dateToCheck.getFullYear() === today.getFullYear() && dateToCheck.getMonth() === today.getMonth() && dateToCheck.getDate() === today.getDate();
   return isSameDate;
 };
 //<!----------------START JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->
 // if (!JalaliDate.jalaliToGregorian) {
 JalaliDate = {
   g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
   j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
 };
 JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
   j_y = parseInt(j_y);
   j_m = parseInt(j_m);
   j_d = parseInt(j_d);
   var jy = j_y - 979;
   var jm = j_m - 1;
   var jd = j_d - 1;
   var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
   for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];
   j_day_no += jd;
   var g_day_no = j_day_no + 79;
   var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
   g_day_no = g_day_no % 146097;
   var leap = true;
   if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
      g_day_no--;
      gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
      g_day_no = g_day_no % 36524;
      if (g_day_no >= 365) g_day_no++;
      else leap = false;
   }
   gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
   g_day_no %= 1461;
   if (g_day_no >= 366) {
      leap = false;
      g_day_no--;
      gy += parseInt(g_day_no / 365);
      g_day_no = g_day_no % 365;
   }
   for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
      g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
   var gm = i + 1;
   var gd = g_day_no + 1;
   gm = gm < 10 ? "0" + gm : gm;
   gd = gd < 10 ? "0" + gd : gd;
   return [gy, gm, gd];
 };
 // }
 //<!----------------END JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->
 