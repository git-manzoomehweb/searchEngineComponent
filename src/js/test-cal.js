console.log("ok1")
function Basis_Calendar(x, today) {
    console.log("ok2")
    document.querySelectorAll('.basis_min_price').forEach(e => {
        e.innerHTML = "";
    });
    var calendar_type = x.getAttribute("data-lang");
    var self = document.querySelector(".en-calendar");
    if (calendar_type == 'fa') {
        self = document.querySelector(".fa-calendar");
    }    
    if (x.closest("form")?.classList.contains("multicity-flight-form")) {
        const routeContent = x.closest(".route-content");
        if (routeContent && routeContent.getAttribute("data-index") > 1) {
                var previousRouteContent = routeContent.previousElementSibling;
                var calendarId = previousRouteContent.querySelector(".start_date").getAttribute("data-cache").split("_")[0];
                self.querySelectorAll(".day").forEach(day => {
                    if (!day.classList.contains("empty_day")) {
                        const dayInfo = day.getAttribute("data-information").split("_")[0];
                        if (dayInfo < calendarId) {
                            day.removeAttribute("onclick");
                            day.classList.add("disable_day");
                        } else {
                            day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
                            day.classList.remove("disable_day");
                        }
                    }
                });
        } else {
            self.querySelectorAll(".day").forEach(day => {
                if (!day.classList.contains("empty_day")) {
                    day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
                    day.classList.remove("disable_day");
                }
            });
        }
    }
    var day, year, month;
    if (calendar_type == 'fa') {
        day = parseInt(today.split("/")[1])
        year = parseInt(today.split("/")[2])
        month = parseInt(today.split("/")[0])
    } else {
        day = parseInt(today.split("/")[1]) < 10 ? "0" + parseInt(today.split("/")[1]) : parseInt(today.split("/")[1]);
        year = parseInt(today.split("/")[2]) < 10 ? "0" + parseInt(today.split("/")[2]) : parseInt(today.split("/")[2]);
        month = parseInt(today.split("/")[0]) < 10 ? "0" + parseInt(today.split("/")[0]) : parseInt(today.split("/")[0]);
    }
    month_dict = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    var current_day_id = 0

    var today;
    if (calendar_type == 'fa') {
        today = persiandate(year, month, day) // Assuming persiandate function is defined elsewhere
    } else {
        today = `${year}-${month}-${day}`;
    }
    // cache information ---------------------------------------------------------------------------------------
    var cache_year = "0";
    var cache_month = "0";
    if (x.classList.contains("start_date")) {
        var endDateElement = x.closest(".Basis_Date_Box").querySelector(".end_date");
        endDateElement.value = "";
        var nextElement = endDateElement.nextElementSibling;
        nextElement.querySelector(".selected-day").textContent = '';
        nextElement.querySelector(".selected-month").textContent = '';
        nextElement.querySelector(".day-of-week").textContent = '';

        var cache_start_date = x.getAttribute("data-cache");
        var cache_start_data_type = x.getAttribute("data-type");
        var cache_end_date = x.closest(".Basis_Date_Box").querySelector(".end_date").getAttribute("data-cache");

        if (cache_start_date != "0") {
            if (calendar_type == 'fa') {
                cache_year = cache_start_date.split("_")[4].split("-")[0];
                cache_month = cache_start_date.split("_")[4].split("-")[1];
            } else {
                cache_year = cache_start_date.split("_")[3].split("-")[0];
                cache_month = cache_start_date.split("_")[3].split("-")[1];
            }
        }
        cache_start_day = parseInt(cache_start_date.split("_")[0]);
        cache_end_day = parseInt(cache_end_date.split("_")[0]);
    }
    if (x.classList.contains("end_date")) {
        var cache_start_date = x.closest(".Basis_Date_Box").querySelector(".start_date").getAttribute("data-cache");
        var cache_end_date = x.getAttribute("data-cache");
        if (calendar_type == 'fa') {
            if (cache_end_date != "0") {
                cache_year = cache_end_date.split("_")[4].split("-")[0];
                cache_month = cache_end_date.split("_")[4].split("-")[1];
            } else if (cache_start_date != "0") {
                cache_year = cache_start_date.split("_")[4].split("-")[0];
                cache_month = cache_start_date.split("_")[4].split("-")[1];
            }
        } else {
            if (cache_end_date != "0") {
                cache_year = cache_end_date.split("_")[3].split("-")[0];
                cache_month = cache_end_date.split("_")[3].split("-")[1];
            } else if (cache_start_date != "0") {
                cache_year = cache_start_date.split("_")[3].split("-")[0];
                cache_month = cache_start_date.split("_")[3].split("-")[1];
            }
        }
        cache_start_day = parseInt(cache_start_date.split("_")[0]);
        cache_end_day = parseInt(cache_end_date.split("_")[0]);
    }
    // reset calendar ------------------------------------------------------------------------------------------
    x.value = "";
    if (x.closest(".Basis_Date_Box").classList.contains("format-changed")) {
        var parentDiv = x.closest("div");
        parentDiv.querySelector(".date-value").value = '';
    }
    x.closest('.date-container').querySelector(".selected-day").textContent = '';
    x.closest('.date-container').querySelector(".selected-month").textContent = '';
    x.closest('.date-container').querySelector(".day-of-week").textContent = '';

    x.setAttribute("data-cache", "0");
    x.setAttribute("data-active", "1");
    var floatingLabel = x.closest("div").querySelector(".floating-label");
    if (floatingLabel) {
        floatingLabel.classList.remove('floating-label-active');
    }
    x.classList.remove('input-valid');
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    var filterDate = x.closest(".column-date").querySelector(".filter-date");
    if (filterDate) {
        filterDate.setAttribute("data-value", "");
    }
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    self.querySelector(".date-info-departure").value = "";
    self.querySelector(".date-info-destination").value = "";
    self.querySelectorAll(".current_year").forEach(function (element) {
        element.classList.remove("current_year");
    });
    self.querySelectorAll(".current_month").forEach(function (element) {
        element.classList.remove("current_month");
    });
    if (window.innerWidth >= 1201) {
        self.querySelectorAll(".next_current_month").forEach(function (element) {
            element.classList.remove("next_current_month");
        });
    }
    self.querySelectorAll(".day").forEach(function (element) {
        element.classList.remove("selected_date");
        element.classList.remove("days_available");
    });
    //  find all years ------------------------------------------------------------------------------------------
    current_year = 0;
    current_month = 0;
    next_current_month = 0;
    first_year = parseInt(today.split("-")[0]);
    first_month = parseInt(today.split("-")[1]);
    var lastYearElement = self.querySelector(".year:last-child");
    var last_year = parseInt(lastYearElement.getAttribute("data-year"));
    var lastMonthElement = lastYearElement.querySelector(".month:last-child");
    var last_month = parseInt(lastMonthElement.getAttribute("data-month"));
    // year
    self.querySelectorAll(".year").forEach(function (yearElement) {
        var this_year = yearElement.getAttribute("data-year");
        if (cache_year == "0") {
            if (this_year == today.split("-")[0]) {
                yearElement.classList.add("current_year");
                current_year = parseInt(today.split("-")[0])
            }
        } else {
            if (this_year == cache_year) {
                yearElement.classList.add("current_year");
                current_year = parseInt(cache_year); 
            }
        }

        // month
        yearElement.querySelectorAll(".month").forEach(function (monthElement) {
            var month_text = ""; // This variable is for name of month --> sample : "February / March"
            var month_numbers = []; // A list of month numbers --> sample : ["01" , "12"]
            var month_numbers_exists = {}; // An object to remove duplicate months
            var create_empty_week = "";
            var this_month = parseInt(monthElement.getAttribute("data-month")) < 10 ? "0" + monthElement.getAttribute("data-month") : monthElement.getAttribute("data-month");
            if (cache_month == "0") {
                if (this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                    monthElement.classList.add("current_month");
                    if (window.innerWidth >= 1201) {
                        if (!document.querySelector(".main-container").classList.contains("tour-list-content")) {
                            if (!monthElement.nextElementSibling) {
                                const nextYear = monthElement.closest(".year")?.nextElementSibling;
                                const firstMonth = nextYear?.querySelector(".month");
                                if (firstMonth) {
                                    firstMonth.classList.add("next_current_month");
                                }
                            } else {
                                monthElement.nextElementSibling.classList.add("next_current_month");
                            }
                        }
                    }
                }
            } else {
                if (this_month == cache_month && this_year == cache_year) {
                    monthElement.classList.add("current_month");
                    if (window.innerWidth >= 1201) {
                        if (!document.querySelector(".main-container").classList.contains("tour-list-content")) {
                            if (!monthElement.nextElementSibling) {
                                const nextMonth = monthElement.closest(".year")
                                ?.nextElementSibling
                                ?.querySelectorAll(".month")[0];
                            if (nextMonth) {
                                nextMonth.classList.add("next_current_month");
                            }
                            } else {
                                monthElement.nextElementSibling.classList.add("next_current_month");
                            }
                        }
                    }
                }
            }
            // week
            monthElement.querySelectorAll(".week").forEach(function (weekElement, week_index) {
                if (week_index == 0) {
                    weekElement.querySelectorAll(".day").forEach(function (dayElement, day_index) { // Transfer first day of month to right place
                        if (!dayElement.classList.contains("empty_day") && !dayElement.classList.contains("Special_day")) {
                            if (day_index == 0) {
                                var create_empty_day = "";
                                var this_weekday = dayElement.getAttribute("data-information").split("_")[2];
                                let index_i = 1;
                                if (calendar_type == 'fa') {
                                    index_i = 0;
                                }
                                for (var i = index_i; i < this_weekday; i++) {
                                    create_empty_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>";
                                }
                                dayElement.insertAdjacentHTML('beforebegin', create_empty_day);
                            }
                        }
                    })
                    // Transfer week of month to right place
                    weekElement.insertAdjacentHTML('beforebegin', create_empty_week);
                }
                // Transfer days of sixth week to first week and remove empty_day class from them
                // day
                weekElement.querySelectorAll(".day").forEach(function (dayElement) {
                    if (!dayElement.classList.contains("empty_day") && !dayElement.classList.contains("Special_day")) {
                        // delete duplicate day and set current_day class 
                        let this_day = this.getAttribute("data-day");
                        this_day = parseInt(this_day, 10) < 10 ? "0" + this_day : this_day;
                        if (this_day == today.split("-")[2] && this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                            if (dayElement.getAttribute("data-information").split("_")[1] == "0") {
                                dayElement.remove();
                            }
                            dayElement.classList.add("current_day");
                            current_day_id = dayElement.getAttribute("data-information").split("_")[0];
                            var data_information_current = dayElement.getAttribute("data-information").split("_")[3];
                            if (calendar_type == 'fa') {
                                document.querySelectorAll(".persiancurrent").forEach(function (input) {
                                    input.value = data_information_current;
                                })
                            } else {
                                document.querySelectorAll(".currentdate").forEach(function (input) {
                                    input.value = data_information_current;
                                })
                            }
                            const dataInformation = this.getAttribute("data-information").split("_")[3];
                            document.querySelector(".gregoriancurrent").value = dataInformation;
                        }
                        if (!month_numbers_exists[dayElement.getAttribute("data-information").split("_")[3].split("-")[1]]) {
                            month_numbers.push(dayElement.getAttribute("data-information").split("_")[3].split("-")[1]);
                            month_numbers_exists[dayElement.getAttribute("data-information").split("_")[3].split("-")[1]] = true;
                        }
                    };
                    // set disable day
                });
            });

            // create of td with class empty_day for last days of month
            var create_empty_last_day = "";
            var day_count = monthElement.querySelectorAll(".week:last-child .day").length;
            for (var i = 0; i < 7 - day_count; i++) {
                create_empty_last_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>";
            }
            monthElement.querySelector(".week:last-child .day:last-child").insertAdjacentHTML('afterend', create_empty_last_day);
            // set month text Using month_numbers array 
            month_numbers.sort();
            if (month_numbers[0] == "01" && month_numbers[1] == "12") {
                month_text = month_dict[month_numbers[1]] + " / " + month_dict[month_numbers[0]];
            } else {
                month_text = month_dict[month_numbers[0]] + " / " + month_dict[month_numbers[1]];
            }
            monthElement.querySelector(".month_detail div:last-child").textContent = month_text;
        });
    });
    // set month_change onclick --------------------------------------------------------------------------------
    document.querySelectorAll('.year').forEach(function(yearElement) {
        // year
        if (first_year == last_year) {
            // month
            yearElement.querySelectorAll('.month').forEach(function(monthElement) {
                if (monthElement.getAttribute("data-month") == first_month) {
                    monthElement.querySelector(".month_change").querySelector(".section_prev_month").style.color = "#e3e3e3";
                    monthElement.querySelector(".month_change").querySelector(".section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                    // day
                    monthElement.querySelectorAll(".day").forEach((day, dayIndex) => {
                        if (!day.classList.contains("empty_day")) {
                            if (day.getAttribute("data-information").split("_")[0] < current_day_id) {
                                day.removeAttribute("onclick");
                                day.classList.add("expire_day");
                            }
                        }
                    });
                } else if (monthElement.getAttribute("data-month") == last_month) {
                    monthElement.querySelector(".month_change .section_next_month").style.color = "#e3e3e3";
                    monthElement.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                } else {
                    monthElement.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                    monthElement.querySelector(".month_change .section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                }
            });
        } else {
            if (yearElement.getAttribute("data-year") == first_year) {
                // month
                yearElement.querySelectorAll(".month").forEach((month, monthIndex) => {
                    if (month.getAttribute("data-month") == first_month) {
                        month.querySelector(".month_change .section_prev_month").style.color = "#e3e3e3";
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                        // day
                        month.querySelectorAll(".day").forEach((day, dayIndex) => {
                            if (!day.classList.contains("empty_day")) {
                                if (day.getAttribute("data-information").split("_")[0] < current_day_id) {
                                    day.removeAttribute("onclick");
                                    day.classList.add("expire_day");
                                }
                            }
                        });
                    } else {
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                    }
                })
            }
            if (yearElement.getAttribute("data-year") == last_year) {
                // month
                yearElement.querySelectorAll(".month").forEach((month, monthIndex) => {
                    if (month.getAttribute("data-month") == last_month) {
                        month.querySelector(".month_change .section_next_month").style.color = "#e3e3e3";
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                    } else {
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                    }
                });
            }
            if (yearElement.getAttribute("data-year") !== first_year && yearElement.getAttribute("data-year") !== last_year) {
                // month
                yearElement.querySelectorAll(".month").forEach((month, monthIndex) => {
                    month.querySelector(".month_change .section_prev_month").setAttribute("onclick", `Basis_month_change(this,0,"${calendar_type}")`);
                    month.querySelector(".month_change .section_next_month").setAttribute("onclick", `Basis_month_change(this,1,"${calendar_type}")`);
                });
            }
        }
    });

    // set calendar position -----------------------------------------------------------------------------------
    var position = x.closest(".Basis_Date_Box").getBoundingClientRect();
    if(x.closest("form").classList.contains("multicity-flight-form")){
        if (x.closest(".route-content").classList.contains("set_Date_Box")) {
            position = x.closest(".route-content").getBoundingClientRect();
        }
    }
    self.style.top = (position.top + x.offsetHeight + 3) + "px";
    if (document.documentElement.lang == 'fa') {
        if (document.documentElement.clientWidth > 1280) {
            if (x.closest("form").classList.contains("multicity-flight-form")) {
                const calendarBox = document.querySelector(".Basis_Calendar_Box");
                calendarBox.style.right = (window.innerWidth - position.left - x.closest('.Basis_Date_Box').offsetWidth - 10) + "px";
                calendarBox.style.left = "unset";
            }else {
                self.style.left = position.left + "px";
            }
        }else {
            self.style.left = position.left + "px";
        }
    }  else {
        self.style.left = position.left + "px"; 
    }
    if (calendar_type == 'fa') {
        const faCalendar = document.querySelector(".fa-calendar");
        const enCalendar = document.querySelector(".en-calendar");
        faCalendar.classList.add("Selected_Basis_Calendar_Box");
        enCalendar.classList.remove("Selected_Basis_Calendar_Box");
        faCalendar.style.display = "block";
        enCalendar.style.display = "none";
    } else {
        const faCalendar = document.querySelector(".fa-calendar");
        const enCalendar = document.querySelector(".en-calendar");
        faCalendar.classList.remove("Selected_Basis_Calendar_Box");
        enCalendar.classList.add("Selected_Basis_Calendar_Box");
        enCalendar.style.display = "block"; // Equivalent of fadeIn("slow")
        faCalendar.style.display = "none"; // Equivalent of fadeOut("slow")
    }
}


function Basis_Select_day(x, calendar_type) {
    var self = document.querySelector(".en-calendar");
    if (calendar_type == 'fa') {
        self = document.querySelector(".fa-calendar");
    }
    document.querySelectorAll(".Basis_Date").forEach(function (dateElement) {
        if (dateElement.getAttribute("data-active") == "1") {
            if (calendar_type == 'fa') {
                if (dateElement.classList.contains("start_date_fh")) {
                    document.querySelector(".hotel-checkin").textContent = x.getAttribute("data-information").split("_")[3];
                } else if (dateElement.classList.contains("end_date_fh")) {
                    document.querySelector(".hotel-checkout").textContent = x.getAttribute("data-information").split("_")[3];
                }
            } else {
                if (dateElement.classList.contains("start_date_fh")) {
                    document.querySelector(".hotel-checkin").textContent = x.getAttribute("data-information").split("_")[4];
                } else if (dateElement.classList.contains("end_date_fh")) {
                    document.querySelector(".hotel-checkout").textContent = x.getAttribute("data-information").split("_")[4];
                }
            }
            if (dateElement.closest(".Basis_Date_Box").classList.contains("format-changed")) {
                let splited_value = x.getAttribute("data-information").split("_")[4].split("-");
                dateElement.value = splited_value[2] + ' ' + x.closest(".month").querySelector(".month_name").textContent;
                dateElement.closest("div").querySelector(".date-value").value = x.getAttribute("data-information").split("_")[4];
            } else {
                if (calendar_type == 'fa') {
                    if (dateElement.classList.contains("start_date")) {
                        x.closest(".Basis_Calendar_Box").querySelector(".date-info-departure").value = x.getAttribute("data-information").split("_")[4];
                    } else if (dateElement.classList.contains("end_date")) {
                        x.closest(".Basis_Calendar_Box").querySelector(".date-info-destination").value = x.getAttribute("data-information").split("_")[4];
                    }
                    dateElement.value = x.getAttribute("data-information").split("_")[4];
                } else {
                    if (dateElement.classList.contains("start_date")) {
                        x.closest(".Basis_Calendar_Box").querySelector(".date-info-departure").value = x.getAttribute("data-information").split("_")[3];
                    } else if (this.classList.contains("end_date")) {
                        x.closest(".Basis_Calendar_Box").querySelector(".date-info-destination").value = x.getAttribute("data-information").split("_")[3];
                    }
                    dateElement.value = x.getAttribute("data-information").split("_")[3];
                }
            }
            dateElement.setAttribute("data-cache", x.getAttribute("data-information"));
            let mstringDate = dateElement.closest("div").querySelector(".mstring_date");
            mstringDate.value = x.getAttribute("data-information").split("_")[3];
            let selectedDay = dateElement.closest("div").querySelector(".selected-day");
            selectedDay.textContent = x.getAttribute("data-day");
            let selectedMonth = dateElement.closest("div").querySelector(".selected-month");
            selectedMonth.textContent = x.closest(".month").querySelector(".show_month_selected").value;
            document.querySelector(".month_of_date").textContent = x.closest(".month").querySelector(".show_month_selected").value;
            document.querySelector(".day_of_date").textContent = x.getAttribute("data-day");
            var day_week = x.getAttribute("data-information").split("_")[2];

            switch (day_week) {
                case "1":
                    weekdayEn = "Monday";
                    weekdayFa = "یکشنبه";
                    break;
                case "2":
                    weekdayEn = "Tuesday";
                    weekdayFa = "دوشنبه";
                    break;
                case "3":
                    weekdayEn = "Wednesday";
                    weekdayFa = "سه شنبه";
                    break;
                case "4":
                    weekdayEn = "Thursday";
                    weekdayFa = "چهارشبنه";
                    break;
                case "5":
                    weekdayEn = "Friday";
                    weekdayFa = "پنجشنبه";
                    break;
                case "6":
                    weekdayEn = "Saturday";
                    weekdayFa = "جمعه";
                    break;
                case "7":
                    weekdayEn = "Sunday";
                    weekdayFa = "شنبه";
            }

            if (calendar_type == 'fa') {
                dateElement.closest('.date-container').querySelector(".day-of-week").textContent = weekdayFa; /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            } else {
                dateElement.closest('.date-container').querySelector(".day-of-week").textContent = weekdayEn; /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            }
            let filterDate = dateElement.closest(".column-date").querySelector(".filter-date");
            filterDate.setAttribute("data-value", x.getAttribute("data-information").split("_")[4]);
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            dateElement.closest("div").querySelector(".floating-label").classList.add('floating-label-active');
            dateElement.classList.add('input-valid');

            calculate_date_diffrent(dateElement);
            if (document.querySelector(".nights-calc") || document.getElementById("night-count")) {
                var startDay = new Date(document.querySelector(".start_date").value);
                var endDay = new Date(document.querySelector(".end_date").value);
                var millisBetween = startDay.getTime() - endDay.getTime();
                var days = Math.round(Math.abs(millisBetween / (1000 * 3600 * 24)));
                document.getElementById("night-count").textContent = days + " Night";
                document.querySelector(".nights-calc div span").textContent = days;
            }
            dateElement.setAttribute("data-active", "0");
            if (dateElement.classList.contains("start_date")) {
                if (!dateElement.closest(".Basis_Date_Box").querySelector(".end_date").disabled) {
                    dateElement.closest(".Basis_Date_Box").querySelector(".end_date").setAttribute("data-active", "1");
                } else {
                    dateElement.setAttribute("data-active", "1");
                }
                self.querySelectorAll(".day").forEach(function(day) {
                    day.classList.remove("selected_date", "days_available", "disable_day");
                    if (!day.classList.contains("empty_day") && !day.classList.contains("expire_day")) {
                        day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
                    }
                });
                x.classList.add("selected_date");
            } else {
                dateElement.closest(".Basis_Date_Box").querySelector(".start_date").setAttribute("data-active", "1");
                x.classList.add("selected_date");
            }
            if (dateElement.classList.contains("start_date")) {
                let check_date = x.getAttribute("data-information").split("_")[0];
                x.closest(".Basis_Calendar_Box").querySelectorAll('.day').forEach(function(day) {
                    if (!day.classList.contains("empty_day")) {
                        this_date_id = parseInt(day.getAttribute("data-information").split("_")[0]);
                        if (this_date_id < check_date) {
                            day.removeAttribute("onclick");
                            day.classList.add("disable_day");
                        } else {
                            day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
                            day.classList.remove("disable_day");
                        }
                    };
                })



            } else {
                let check_date = x.getAttribute("data-information").split("_")[0];
                x.closest(".Basis_Calendar_Box").querySelectorAll('.day').forEach(function(day) {
                    if (!day.classList.contains("empty_day") && !day.classList.contains("disable_day")) {
                        this_date_id = parseInt(day.getAttribute("data-information").split("_")[0]);
                        if (this_date_id < check_date) {
                            day.classList.add('days_available');
                        } else {
                            day.classList.remove('days_available');
                        }
                    };
                });
            }
            return false;
        }
    });
}
function calculate_date_diffrent(element) {
    var fdate = element.closest("form").querySelector(".mstring_date.mstring_fdate").value;
    var tdate = element.closest("form").querySelector(".mstring_date.mstring_tdate").value;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const fdate_convert = new Date(fdate);
    const tdate_convert = new Date(tdate);
    const fdate_time = fdate_convert.getTime();
    const tdate_time = tdate_convert.getTime();
    if (fdate_time < tdate_time) {
        var difference = (tdate_time - fdate_time) / day;
        element.closest("form").querySelector("#night-count").textContent = difference + " شب";
    }
}
function Basis_month_change(x, change, calendar_type) {
    var self = document.querySelector(".en-calendar");
    if (calendar_type == 'fa') {
        self = document.querySelector(".fa-calendar");
    }    
    current_year = parseInt(x.closest(".year").getAttribute("data-year"));
    current_month = parseInt(x.closest(".month").getAttribute("data-month"));
    if (window.innerWidth >= 1201) {
        if (!document.querySelector(".main-container").classList.contains("tour-list-content")) {
            if (change == 0) // Go to the month before
            {
                if (current_month == 1) {
                    current_year -= 1;
                    current_month += 11;
                } else {
                    current_month -= 1;
                }
                x.closest(".month").classList.remove("current_month");
                let nextMonthElement = x.closest(".month").nextElementSibling;
                if (nextMonthElement) {
                    nextMonthElement.classList.remove("next_current_month");
                }
            } else if (change == 1) // Go to the month after
            {
                if (current_month == 12) {
                    current_year += 1;
                    current_month -= 11;
                } else {
                    current_month += 1;
                }
                x.closest(".month").classList.remove("next_current_month");
                let prevMonthElement = x.closest(".month").previousElementSibling;
                if (prevMonthElement) {
                    prevMonthElement.classList.remove("current_month");
                }
            }
            let yearElement = x.closest(".year");
            if (yearElement) {
                yearElement.classList.remove("current_year");
            }
            self.querySelectorAll(".year").forEach(function (yearElement, yearIndex) {
                if (yearElement.getAttribute("data-year") == current_year) {
                    yearElement.classList.add("current_year");
                    yearElement.querySelectorAll(".month").forEach(function (month, monthIndex) {
                        if (month.getAttribute("data-month") == current_month) {
                            month.classList.add("current_month");
                            const nextMonth = month.nextElementSibling;
                            const closestYear = month.closest(".year");
                            const nextYearFirstMonth = closestYear?.nextElementSibling?.querySelector(".month");
                            if (!nextMonth) {
                                if (nextYearFirstMonth) {
                                    nextYearFirstMonth.classList.add("next_current_month");
                                }
                            } else {
                                month.classList.add("next_current_month");
                            }
                            if (change == 0 && current_month == 11) {
                                if (nextYearFirstMonth) {
                                    nextYearFirstMonth.classList.remove("next_current_month");
                                }
                            }
                        }
                    })
                }
            })
        } else {
            if (change == 0) // Go to the month before
            {
                if (current_month == 1) {
                    current_year -= 1;
                    current_month += 11;
                } else
                    current_month -= 1;
            } else if (change == 1) // Go to the month after
            {
                if (current_month == 12) {
                    current_year += 1;
                    current_month -= 11;
                } else
                    current_month += 1;
            }
            x.closest(".year")?.classList.remove("current_year");
            x.closest(".month")?.classList.remove("current_month");
            self.querySelectorAll(".year").forEach(function (year, yearIndex) {
                if (year.getAttribute("data-year") == current_year) {
                    year.classList.add("current_year");
                    year.querySelectorAll(".month").forEach(function (month, monthIndex) {
                        if (month.getAttribute("data-month") == current_month) {
                            month.classList.add("current_month");
                        }
                    })
                }
            })
        }
    } else {
        if (change == 0) // Go to the month before
        {
            if (current_month == 1) {
                current_year -= 1;
                current_month += 11;
            } else
                current_month -= 1;
        } else if (change == 1) // Go to the month after
        {
            if (current_month == 12) {
                current_year += 1;
                current_month -= 11;
            } else
                current_month += 1;
        }
        x.closest(".year")?.classList.remove("current_year");
        x.closest(".month")?.classList.remove("current_month");
        self.querySelectorAll(".year").forEach(function (year, yearIndex) {
            if (year.getAttribute("data-year") == current_year) {
                year.classList.add("current_year");
                year.querySelectorAll(".month").forEach(function (month, monthIndex) {
                    if (month.getAttribute("data-month") == current_month) {
                        month.classList.add("current_month");
                    }
                });
            }
        });
    }
}
function persiandate(year, month, day) {
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    if (year > 1600) {
        persian_year = 979;
        year -= 1600;
    } else {
        persian_year = 0;
        year -= 621;
    }
    new_year = (month > 2) ? (year + 1) : year;
    days = (365 * year) + (parseInt((new_year + 3) / 4)) - (parseInt((new_year + 99) / 100)) + (parseInt((new_year + 399) / 400)) - 80 + day + g_d_m[month - 1];
    persian_year += 33 * (parseInt(days / 12053));
    days %= 12053;
    persian_year += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        persian_year += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    persian_month = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    persian_day = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    if (persian_month < 10)
        persian_month = "0" + persian_month
    if (persian_day < 10)
        persian_day = "0" + persian_day
    return persian_year + "-" + persian_month + "-" + persian_day
}
function goToday(element, calendar_type) {
    const active_module = document.querySelector(".active-module")?.getAttribute("data-id");
    let active_form = document.getElementById(active_module)?.querySelector(form);
    if (active_module == 'r-flight') {
        active_form = document.getElementById("formflight");
        const multiFlightForm = document.querySelector(`#${active_module} .multicity-flight-form`);
        if (multiFlightForm) {
            active_form = document.getElementById("formflight");
        }
    }
    if (active_form) {
        const inputElement = active_form.querySelector(".start_date");
        if (inputElement) {
            const onclickAttribute = inputElement.getAttribute('onclick');
            const dateMatch = onclickAttribute?.match(/'([^']+)'/);
            if (dateMatch) {
                const date = dateMatch[1];
                Basis_Calendar(inputElement, date);
                Basis_Select_day(element.closest(".Basis_Calendar_Box").querySelector(".current_day"), calendar_type);
                element.closest(".Basis_Calendar_Box").querySelector(".date-info-destination").value = "";
            }
        }
    }
}

function applyDate() {
    var container = document.querySelector(".Selected_Basis_Calendar_Box");
    if (container) {
        container.style.transition = "opacity 0.5s";
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.display = "none";
            container.classList.remove("Selected_Basis_Calendar_Box");
        }, 500);
    }
    document.querySelectorAll(".Basis_Date").forEach((element) => {
        element.setAttribute("data-active", "0");
    });
}
// bita
function emptySelectedDate(element, calendar_type, type) {
    const calendarInfo = element.closest(".calendar-date-info");
    if (calendarInfo) {
        const departure = calendarInfo.querySelector(".date-info-departure");
        const destination = calendarInfo.querySelector(".date-info-destination");
        if (departure) departure.value = '';
        if (destination) destination.value = '';
    }
    const activeBtn = document.querySelector('.search-nav ul > .active-module')?.getAttribute('data-id');
    let self = document.querySelector(".en-calendar");
    if (calendar_type == 'fa') {
        self = document.querySelector(".fa-calendar");
    }
    if (type == 'dep') {
        self.querySelectorAll(".day").forEach(day => {
            day.classList.remove("selected_date", "days_available", "disable_day");
            if (!day.classList.contains("empty_day") && !day.classList.contains("expire_day")) {
                day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
            }
        })
        if (activeBtn == 'r-flight') {
            let active_form = 'multicity-flight-form';
            const flightForm = document.querySelector(`#${activeBtn} .multicity-flight-form`);
            if (!flightForm) {
                activeForm = 'formflight';
            }
            document.querySelectorAll(`#${activeBtn} #${activeForm} .Basis_Date_Box`).forEach(box => { 
                box.querySelector(".start_date")?.setAttribute("data-active", "1");
                box.querySelector(".end_date")?.setAttribute("data-active", "0");
            });
        } else {
            document.querySelectorAll(`#${activeBtn} .Basis_Date_Box`).forEach(box => {
                box.querySelector(".start_date")?.setAttribute("data-active", "1");
                box.querySelector(".end_date")?.setAttribute("data-active", "0");
            })
        }
        document.querySelector(`#${activeBtn} .start_date`).value = '';
        document.querySelector(`#${activeBtn} .start_date`).closest(".date-container").querySelector(".day-of-week")?.textContent = '';
        document.querySelector(`#${activeBtn} .end_date`).value = '';
        document.querySelector(`#${activeBtn} .end_date`).closest(".date-container").querySelector(".day-of-week")?.textContent = '';
    } else {
        self.querySelectorAll(".day").forEach(day => {
            day.classList.remove("days_available");
        })
        let count = 0;
        self.querySelectorAll(".selected_date").forEach(selectedDate => {
            count++;
            if (count == 2) {
                selectedDate.classList.remove("selected_date");
            }
        })

        if (activeBtn == 'r-flight') {
            let active_form = 'multicity-flight-form'
            const flightForm = document.querySelector(`#${activeBtn} .multicity-flight-form`);
            if (!flightForm) {
                active_form = 'formflight';
            }
            document.querySelectorAll(`#${activeBtn} #${activeForm} .Basis_Date_Box`).forEach(box => {
                box.querySelector(".start_date")?.setAttribute("data-active", "0");
                box.querySelector(".end_date")?.setAttribute("data-active", "1");
            });
        } else {
            document.querySelectorAll(`#${activeBtn} .Basis_Date_Box`).forEach(box => {
                box.querySelector(".start_date")?.setAttribute("data-active", "0");
                box.querySelector(".end_date")?.setAttribute("data-active", "1");
            })
        }
       document.querySelector(`#${activeBtn} .end_date`).value = '';
       document.querySelector(`#${activeBtn} .start_date`).closest(".date-container").querySelector(".day-of-week")?.textContent = '';
    }
}
function changeCalendar(element, calendar_type) {
    document.querySelectorAll(".Basis_Date").forEach(el => {
        el.setAttribute("data-lang", calendar_type);
    });
    const activeBtn = document.querySelector('.search-nav ul > .active-module')?.getAttribute('data-id');
    document.querySelector(`#${activeBtn} form`).forEach(form => {
        if (!form.classList.contains("unvisible")) {
            if (form.classList.contains("multicity-flight-form")) {
                form.querySelectorAll('.start_date').forEach(startDate => {
                    if (startDate.getAttribute("data-active") == "1") {
                        startDate.value = '';
                        const dayOfWeek = startDate.closest(".date-container")?.querySelector(".day-of-week");
                        if (dayOfWeek) dayOfWeek.textContent = '';
                    }
                })
            } else if (form.id == 'flightHotelSearch') {
                form.querySelectorAll('.Basis_Date').forEach(dateElement => {
                    if (dateElement.getAttribute("data-active") == "1") {
                        dateElement.value = '';
                        const dayOfWeek = dateElement.closest(".date-container")?.querySelector(".day-of-week");
                        if (dayOfWeek) dayOfWeek.textContent = '';
                    }
                })
            }else {
                form.querySelector('.start_date').value = '';
                form.querySelector('.start_date').closest(".date-container").querySelector(".day-of-week")?.textContent = '';
                form.querySelector('.end_date').value = '';
                form.querySelector('.end_date').closest(".date-container").querySelector(".day-of-week")?.textContent = '';
            }
        }
    });
    var self = document.querySelector(".en-calendar");
    if (calendar_type == 'fa') {
        self = document.querySelector(".fa-calendar");
    }
    self.querySelectorAll(".day").forEach(day => {
        day.classList.remove("selected_date", "days_available", "disable_day");
        if (!day.classList.contains("empty_day") && !day.classList.contains("expire_day")) {
            day.setAttribute("onclick", `Basis_Select_day(this,"${calendar_type}")`);
        }
    })
    document.getElementById(activeBtn)?.querySelectorAll("form").forEach(form => {
        if (!form.classList.contains("unvisible")) {
            if (form.classList.contains("multicity-flight-form")) {
                form.querySelectorAll('.start_date').forEach(startDate => {
                    if (startDate.getAttribute("data-active") == "1") {
                        startDate.click();
                    }
                })
            } else if (form.id == 'flightHotelSearch') {
                form.querySelectorAll('.Basis_Date').forEach(dateElement => {
                    if (dateElement.getAttribute("data-active") == "1") {
                        dateElement.click();
                    }
                })
            } else {
                const startDate = form.querySelector('.start_date');
                if (startDate) startDate.click();
            }
        }
    })
    document.querySelectorAll(".calendar-date-info").forEach(info => {
        const closeIcon = info.querySelector(".fa-times");
        if (closeIcon) {
            const dataType = closeIcon.getAttribute("data-type");
            closeIcon.setAttribute("onclick", `emptySelectedDate(this,'${calendar_type}','${dataType}')`);
        }
    })
}

document.addEventListener('mouseup', function (e) {
    const container = document.querySelector(".Selected_Basis_Calendar_Box");
    if (container && !container.contains(e.target)) {
        document.querySelectorAll(".Basis_Calendar_Box").forEach(box => {
            const calendarType = box.getAttribute("data-lang");
            let calendar = document.querySelector(".en-calendar");
            if (calendarType == 'fa') {
                calendar = document.querySelector(".fa-calendar");
            }
            box.querySelectorAll(".day").forEach(day => {
                day.classList.remove("selected_date", "days_available", "disable_day");
                if (!day.classList.contains("empty_day") && !day.classList.contains("expire_day")) {
                    day.setAttribute("onclick", `Basis_Select_day(this,"${calendarType}")`);
                }
            });
        });
        if (container.style.display !== "none") {
            container.style.display = "none";
        }
        container.classList.remove("Selected_Basis_Calendar_Box");

        document.querySelectorAll(".Basis_Date").forEach(date => {
            date.setAttribute("data-active", "0");
        });
    }
});

function fetchCalendarPrices(element) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = {
        "dmnid": document.querySelector(".search-nav").dataset.dmnid
    };

    const origin = element.closest("form").querySelector('.co-id.FCDid1');
    if (origin && origin.value !== '') {
        payload['origin'] = origin.value;
    }

    const destination = element.closest("form").querySelector('.co-id.FCDid2');
    if (destination && destination.value !== '') {
        payload['destination'] = destination.value;
    }

    const return_date = element.closest("form").querySelector('.Basis_Date.end_date.nextCalOpening');
    if (!payload.origin || !payload.destination || return_date) {
        console.log('Missing required fields');
        return;
    }

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const fetchWithTimeout = (url, options, timeout = 3000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeout)
            )
        ]);
    };

    fetchWithTimeout("https://basisfly.com/apihub/flight/calendarLookUp", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let empty = false;
            if (!result || result.length == 0) {
                empty = true;
            } else {
                const priceDivsToUpdate = [];
                result.forEach(item => {
                    document.querySelectorAll(".Basis_Calendar_Box").forEach(e => {
                        const element = e.querySelector(`td[data-information^="${item.date_id}"]`);
                        if (element) {
                            let priceDiv = element.querySelector('.basis_min_price');
                            const price = item.min_price > 9999
                                ? Math.floor(item.min_price / 10000000 * 10) / 10
                                : Math.floor(item.min_price / 10000 * 10) / 10;

                            if (priceDiv) {
                                priceDivsToUpdate.push({ div: priceDiv, price });
                            } else {
                                priceDiv = document.createElement('div');
                                priceDiv.classList.add('basis_min_price');
                                priceDiv.innerHTML = price;
                                element.appendChild(priceDiv);
                            }
                        }
                    });
                });

                priceDivsToUpdate.forEach(({ div, price }) => {
                    div.textContent = price;
                });
            }

            if (empty) {
                document.querySelectorAll('.basis_min_price').forEach(e => {
                    e.innerHTML = "";
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.querySelectorAll('.basis_min_price').forEach(e => {
                e.innerHTML = "";
            });
        });
}