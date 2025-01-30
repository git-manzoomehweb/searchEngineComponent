function Basis_Calendar(x, today, calendar_type) {
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    const element = x;
    if (element && element.getAttribute("data-type") == "tour-list") {
        document.querySelector(".main-container").classList.add("tour-list-content");
    } else {
        if(document.querySelector(".main-container")){
            document.querySelector(".main-container").classList.remove("tour-list-content");
        }
    }    
    /*-----------------END JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    var day = parseInt(today.split("/")[1])
    var year = parseInt(today.split("/")[2])
    var month = parseInt(today.split("/")[0])
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
    var today = persiandate(year, month, day) // 1398-12-20
    // cache information ---------------------------------------------------------------------------------------
    var cache_year = "0"
    var cache_month = "0"
  
    if (x.classList.contains("start_date")) {
        x.setAttribute("data-cache", "0");
        if(x.closest(".Basis_Date_Box").querySelector(".selected-day-dep")){
            x.closest(".Basis_Date_Box").querySelector(".selected-day-dep").innerHTML = "";
        }
        if(x.closest(".Basis_Date_Box").querySelector(".selected-day")){
            x.closest(".Basis_Date_Box").querySelector(".selected-day").innerHTML = "";
        }
        if(x.closest(".Basis_Date_Box").querySelector(".selected-month-dep")){
            x.closest(".Basis_Date_Box").querySelector(".selected-month-dep").innerHTML = "";
        }
        if(x.closest(".Basis_Date_Box").querySelector(".selected-month")){
            x.closest(".Basis_Date_Box").querySelector(".selected-month").innerHTML = "";
        }
        var isDisabled = x.closest(".Basis_Date_Box").querySelector(".end_date").disabled;
        if (!isDisabled) {
            x.closest(".Basis_Date_Box").querySelector(".end_date").value = "";
            x.closest(".Basis_Date_Box").querySelector(".end_date").nextElementSibling.innerHTML = "";
            if(x.closest(".Basis_Date_Box").querySelector(".selected-day-des")){
                x.closest(".Basis_Date_Box").querySelector(".selected-day-des").innerHTML = "";
            }
            if(x.closest(".Basis_Date_Box").querySelector(".selected-month-des")){
                x.closest(".Basis_Date_Box").querySelector(".selected-month-des").innerHTML = "";
            }  
        }

        var cache_start_date = x.getAttribute("data-cache");
        var cache_start_data_type = x.getAttribute("data-type");
        var cache_end_date = x.closest(".Basis_Date_Box").querySelector(".end_date").getAttribute("data-cache");
        if (cache_start_date != "0") {
            cache_year = cache_start_date.split("_")[4].split("-")[0];
            cache_month = cache_start_date.split("_")[4].split("-")[1];
        }
        cache_start_day = parseInt(cache_start_date.split("_")[0]);
        cache_end_day = parseInt(cache_end_date.split("_")[0]);
    }
    if (x.classList.contains("end_date")) {
        if(x.closest(".reserve-field").querySelector(".selected-day")){
            x.closest(".reserve-field").querySelector(".selected-day").innerHTML = "";
        }
        if(x.closest(".reserve-field").querySelector(".selected-month")){
            x.closest(".reserve-field").querySelector(".selected-month").innerHTML = "";
        }
        // Your code here
        var cache_start_date = x.closest(".Basis_Date_Box").querySelector(".start_date").getAttribute("data-cache");
        var cache_end_date = x.getAttribute("data-cache");
        if (cache_end_date != "0") {
            cache_year = cache_end_date.split("_")[4].split("-")[0];
            cache_month = cache_end_date.split("_")[4].split("-")[1];
        } else if (cache_start_date != "0") {
            cache_year = cache_start_date.split("_")[4].split("-")[0];
            cache_month = cache_start_date.split("_")[4].split("-")[1];
        }
        cache_start_day = parseInt(cache_start_date.split("_")[0]);
        cache_end_day = parseInt(cache_end_date.split("_")[0]);
    }
  
    // reset calendar ------------------------------------------------------------------------------------------
    x.value = "";
    if (x.closest(".Basis_Date_Box").classList.contains("format-changed")) {
        x.closest("div").querySelector(".date-value").value = '';
    }
    x.nextElementSibling.innerHTML = "";
    x.setAttribute("data-cache", "0");
    x.setAttribute("data-active", "1");
    if(x.closest("div").querySelector(".floating-label")){
        x.closest("div").querySelector(".floating-label").classList.remove("floating-label-active");
    }
    x.classList.remove("input-valid");
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    if(x.closest(".column-date")){
        x.closest(".column-date").querySelector(".filter-date").setAttribute("data-value", "");
    }
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    document.querySelectorAll(".Basis_Calendar_Box .current_year").forEach(function (element) {
        element.classList.remove("current_year");
    });
    document.querySelectorAll(".Basis_Calendar_Box .current_month").forEach(function (element) {
        element.classList.remove("current_month");
    });
    if (window.innerWidth > 851) {
        document.querySelectorAll(".Basis_Calendar_Box .next_current_month").forEach(function (element) {
            element.classList.remove("next_current_month");
        });
    }

    document.querySelectorAll(".Basis_Calendar_Box .day").forEach(function (element) {
        element.classList.remove("selected_date");
    });

    document.querySelectorAll(".Basis_Calendar_Box .day").forEach(function (element) {
        element.classList.remove("days_available");
    });
    //  find all years ------------------------------------------------------------------------------------------
    current_year = 0
    current_month = 0
    next_current_month = 0
    if (calendar_type == 0) {
        first_year = parseInt(document.querySelector(".Basis_Calendar_Box .year").getAttribute("data-year"));
        first_month = parseInt(document.querySelector(".Basis_Calendar_Box .year .month").getAttribute("data-month"));
    } else if (calendar_type == 1) {
        first_year = parseInt(today.split("-")[0]);
        first_month = parseInt(today.split("-")[1]);
    }
    last_year = parseInt(document.querySelectorAll(".Basis_Calendar_Box .year")[document.querySelectorAll(".Basis_Calendar_Box .year").length - 1].getAttribute("data-year"));
    last_month = parseInt(document.querySelectorAll(".Basis_Calendar_Box .year .month")[document.querySelectorAll(".Basis_Calendar_Box .year .month").length - 1].getAttribute("data-month"));
    // year
    document.querySelectorAll(".Basis_Calendar_Box .year").forEach(function(yearElement) {
        this_year = yearElement.getAttribute("data-year");
        if (cache_year == "0") {
            if (this_year == today.split("-")[0]) {
                yearElement.classList.add("current_year");
                current_year = parseInt(today.split("-")[0]);
            }
        } else {
            if (this_year == cache_year) {
                yearElement.classList.add("current_year");
                current_year = parseInt(cache_year);
            }
        }
        // month
        yearElement.querySelectorAll(".month").forEach(function(monthElement) {
            month_text = "";  // This variable is for name of month --> sample : "February / March"
            month_numbers = []; // A list of month numbers --> sample : ["01" , "12"]
            month_numbers_exists = {}; // An object to remove duplicate months
            create_empty_week = "";
            this_month = monthElement.getAttribute("data-month") < 10 ? "0" + monthElement.getAttribute("data-month") : monthElement.getAttribute("data-month");
            if (cache_month == "0") {
                if (this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                    monthElement.classList.add("current_month");
                    if (window.innerWidth > 851) {
                        if (!document.querySelector(".tour-list-content")) {
                            if (!monthElement.nextElementSibling) {
                                monthElement.closest(".year").nextElementSibling.querySelector(".month").classList.add("next_current_month");
                            } else {
                                monthElement.nextElementSibling.classList.add("next_current_month")
                            }
                        }
                    }
                }
            } else {
                if (this_month == cache_month && this_year == cache_year) {
                    monthElement.classList.add("current_month");
                    if (window.innerWidth > 851) {
                        if (!document.querySelector(".tour-list-content")) {
                            if (!monthElement.nextElementSibling) {
                                monthElement.closest(".year").nextElementSibling.querySelector(".month").classList.add("next_current_month");
                            } else {
                                monthElement.nextElementSibling.classList.add("next_current_month");
                            }
                        }
                    }
                }
            }
            // week
            monthElement.querySelectorAll(".week").forEach(function(weekElement, week_index) {
                if (week_index == 0) {
                    weekElement.querySelectorAll(".day").forEach(function(dayElement, day_index) { // Transfer first day of month to right place
                        if (!dayElement.classList.contains("empty_day") && !dayElement.classList.contains("Special_day")) {
                                if (day_index == 0) {
                                    create_empty_day = "";
                                    this_weekday = dayElement.getAttribute("data-information").split("_")[2];
                                    for (var i = 0; i < this_weekday; i++) {
                                        create_empty_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>";
                                    }
                                    dayElement.insertAdjacentHTML('beforebegin', create_empty_day);
                                }
                            }
                        });
                        weekElement.insertAdjacentHTML('beforebegin', create_empty_week);
                }
                // day
                weekElement.querySelectorAll(".day").forEach(function(dayElement) {
                    if (!dayElement.classList.contains("empty_day") && !dayElement.classList.contains("Special_day")) {
                        // delete duplicate day and set current_day class 
                        this_day = dayElement.getAttribute("data-day") < 10 ? "0" + dayElement.getAttribute("data-day") : dayElement.getAttribute("data-day");
                        if (this_day == today.split("-")[2] && this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                            if (dayElement.getAttribute("data-information").split("_")[1] == 0)
                            dayElement.remove();
                            dayElement.classList.add("current_day");
                            current_day_id = dayElement.getAttribute("data-information").split("_")[0];
                            var data_information_current = dayElement.getAttribute("data-information").split("_")[4];
                            document.querySelectorAll(".persiancurrent").forEach(function(input) {
                                input.value = data_information_current;
                            });
                            if(document.querySelector(".gregoriancurrent")) {
                                document.querySelector(".gregoriancurrent").value = dayElement.getAttribute("data-information").split("_")[3];
                            }
                        }
                        if (!month_numbers_exists[dayElement.getAttribute("data-information").split("_")[3].split("-")[1]]) {
                            month_numbers.push(dayElement.getAttribute("data-information").split("_")[3].split("-")[1]);
                            month_numbers_exists[dayElement.getAttribute("data-information").split("_")[3].split("-")[1]] = true;
                        }
                    }
                    // set disable day
                    if (!dayElement.classList.contains("empty_day")) {
                        this_date_id = parseInt(dayElement.getAttribute("data-information").split("_")[0]);
                        if (x.classList.contains("start_date")) {
                            if (x.getAttribute("data-type") == '0-6') {
                                if (x.closest("form").querySelector(".checkin").value != '') {
                                    var data_cache_checkin = x.closest("form").querySelector(".checkin").getAttribute("data-cache").split("_")[0];
                                    var data_cache_checkout = x.closest("form").querySelector(".checkout").getAttribute("data-cache").split("_")[0];
                                    if (data_cache_checkin != '0' || data_cache_checkout != '0') {
                                        if (this_date_id > data_cache_checkout || this_date_id < data_cache_checkin) {
                                            dayElement.removeAttribute("onclick");
                                            dayElement.classList.add("disable_day");
                                        }
                                    }
                                } else {
                                    dayElement.setAttribute("onclick", "Basis_Select_day(this);openNextCal(this)");
                                    dayElement.classList.remove("disable_day");
                                }
                            } else if (x.getAttribute("data-type") == '1-6') {
                                if (x.closest("form").querySelector(".checkin").value == '') {
                                    var data_cache_star_flight = x.closest("form").querySelector(".start_date_flight").getAttribute("data-cache").split("_")[0];
                                    var data_cache_date_flight = x.closest("form").querySelector(".end_date_flight").getAttribute("data-cache").split("_")[0];
                                    if (data_cache_star_flight != '0' || data_cache_date_flight != '0') {
                                        if (parseInt(this_date_id) > parseInt(data_cache_date_flight) || parseInt(this_date_id) < parseInt(data_cache_star_flight-1)) {
                                            dayElement.removeAttribute("onclick");
                                            dayElement.classList.add("disable_day");
                                        }
                                    }
                                }
                            } else {
                                if (cache_end_day != 0 && this_date_id > cache_end_day) {
                                } else {
                                    if (cache_start_data_type != "tour-list") {
                                        dayElement.setAttribute("onclick", "Basis_Select_day(this);openNextCal(this)");
                                        dayElement.classList.remove("disable_day");
                                    } else if (cache_start_data_type == "tour-list") {
                                        dayElement.setAttribute("onclick", "Basis_Select_day(this)");
                                        dayElement.classList.remove("disable_day");
                                    }
                                }
                            }
                        };
                        if (x.classList.contains("end_date")) {
                            if (x.getAttribute("data-type") == '0-6') {
                                if (x.closest("form").querySelector(".checkin").value != '') {
                                    var data_cache_checkin = x.closest("form").querySelector(".checkin").getAttribute("data-cache").split("_")[0];
                                    var data_cache_checkout = x.closest("form").querySelector(".checkout").getAttribute("data-cache").split("_")[0];
                                        if (data_cache_checkin != '0' || data_cache_checkout != '0') {
                                        if (this_date_id > data_cache_checkout || this_date_id < data_cache_checkin) {
                                            dayElement.removeAttribute("onclick");
                                            dayElement.classList.add("disable_day");
                                        }
                                    }
                                } else {
                                    dayElement.setAttribute("onclick", "Basis_Select_day(this);openNextCal(this)");
                                    dayElement.classList.remove("disable_day");
                                }
                            } else if (x.getAttribute("data-type") == '1-6') {
                                if (x.closest("form").querySelector(".checkin").value == '') {
                                    var data_cache_star_flight = x.closest("form").querySelector(".start_date_flight").getAttribute("data-cache").split("_")[0];
                                    var data_cache_date_flight = x.closest("form").querySelector(".end_date_flight").getAttribute("data-cache").split("_")[0];
                                    if (data_cache_star_flight != '0' || data_cache_date_flight != '0') {
                                        if (parseInt(this_date_id) > parseInt(data_cache_date_flight) || parseInt(this_date_id) < parseInt(data_cache_star_flight-1)) {
                                            dayElement.removeAttribute("onclick");
                                            dayElement.classList.add("disable_day");
                                        }
                                    }
                                }
                            } else {
                                if (cache_start_day != 0 && this_date_id < cache_start_day) {
                                    dayElement.removeAttribute("onclick");
                                    dayElement.classList.add("disable_day");
                                } else {
                                    if (x.classList.contains("end_date")) {
                                        dayElement.setAttribute("onclick", "Basis_Select_day(this)");
                                    } else {
                                        if (cache_start_data_type != "tour-list") {
                                            dayElement.setAttribute("onclick", "Basis_Select_day(this); openNextCal(this)");
                                            dayElement.classList.remove("disable_day");
                                        } else if (cache_start_data_type == "tour-list") {
                                            dayElement.setAttribute("onclick", "Basis_Select_day(this)");
                                            dayElement.classList.remove("disable_day");
                                        }
                                    }
                                }
                            }
                        };
                        if (cache_start_day != 0 && cache_start_day == this_date_id) {
                            dayElement.classList.add("selected_date");
                        }
                        if (cache_end_day != 0 && cache_end_day == this_date_id) {
                            dayElement.classList.add("selected_date");
                        }
                        if (cache_start_day != 0 && cache_end_day != 0 && this_date_id >= cache_start_day && this_date_id <= cache_end_day)
                            dayElement.classList.add("selected_day");
                        else
                          dayElement.classList.remove("selected_day");
                    };
                })
            })
            // create of td with class empty_day for last days of month
            create_empty_last_day = "";
            // day_count = monthElement.querySelectorAll(".week").length;
            var weeks = monthElement.querySelectorAll(".week");
            var lastWeek = weeks[weeks.length - 1];
            var day_count = lastWeek ? lastWeek.querySelectorAll(".day").length : 0;
            for (var i = 0; i < 7 - day_count; i++) {
                create_empty_last_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>";
            }
            var weekElement = monthElement.querySelectorAll(".week");
            var lastWeek = weekElement[weekElement.length - 1];
            var dayElement = lastWeek.querySelectorAll(".day");
            var lastDay = dayElement[dayElement.length - 1];
            lastDay.insertAdjacentHTML('afterend', create_empty_last_day);
            // set month text Using month_numbers array 
            month_numbers.sort();
            if (month_numbers[0] == "01" && month_numbers[1] == "12")
                month_text = month_dict[month_numbers[1]] + " / " + month_dict[month_numbers[0]];
            else
                month_text = month_dict[month_numbers[0]] + " / " + month_dict[month_numbers[1]];

            var monthDetails = monthElement.querySelectorAll(".month_detail div");
            if (monthDetails.length > 0) {
                monthDetails[monthDetails.length - 1].textContent = month_text;
            }
        })
    })
  
    // set month_change onclick --------------------------------------------------------------------------------
    document.querySelectorAll(".Basis_Calendar_Box .year").forEach(function(year, year_index) {
        // year
        if (first_year == last_year) {
            // month
            year.querySelectorAll(".month").forEach(function(month) {
                if (month.getAttribute("data-month") == first_month) {
                    if(month.querySelector(".month_change .section_prev_month")){
                        month.querySelector(".month_change .section_prev_month").style.color = "#e3e3e3";
                    }
                    if(month.querySelector(".month_change .section_next_month")) {
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");  
                    }
                    // day
                    if (calendar_type == 1) {
                        month.querySelectorAll(".day").forEach(function(day) {
                            if (!day.classList.contains("empty_day")) {
                                if (day.getAttribute("data-information").split("_")[0] < current_day_id) {
                                    day.removeAttribute("onclick");
                                    day.classList.add("disable_day");
                                }
                            }
                        });
                    }
                } else if (month.getAttribute("data-month") == last_month) {
                    if(month.querySelector(".month_change .section_next_month")){
                        month.querySelector(".month_change .section_next_month").style.color = "#e3e3e3";
                    }
                    if(month.querySelector(".month_change .section_prev_month")) {
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                    }
                } else {
                    if(month.querySelector(".month_change .section_prev_month")){
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                    }
                    if(month.querySelector(".month_change .section_next_month")) {
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");
                    }
                }
            });
        } else {
            if (year.getAttribute("data-year") == first_year) {
                // month
                year.querySelectorAll(".month").forEach(function(month) {
                    if (month.getAttribute("data-month") == first_month) {
                        if(month.querySelector(".month_change .section_prev_month")) {
                            month.querySelector(".month_change .section_prev_month").style.color = "#e3e3e3";
                        }
                        if(month.querySelector(".month_change .section_next_month")) {
                            month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");
                        }
                        // day
                        if (calendar_type == 1) {
                            month.querySelectorAll(".day").forEach(function(day) {
                                if (!day.classList.contains("empty_day")) {
                                    if (day.getAttribute("data-information").split("_")[0] < current_day_id) {
                                        day.removeAttribute("onclick");
                                        day.classList.add("disable_day");
                                    }
                                }
                            })
                        }
                    } else {
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");
                    }
                });
            }
            if (year.getAttribute("data-year") == last_year) {
                // month
                year.querySelectorAll(".month").forEach(function(month) {
                    if (month.getAttribute("data-month") == last_month) {
                        if(month.querySelector(".month_change .section_next_month")){
                            month.querySelector(".month_change .section_next_month").style.color = "#e3e3e3";
                        }
                        if(month.querySelector(".month_change .section_prev_month")){
                            month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                        }  
                    } else {
                        if(month.querySelector(".month_change .section_prev_month")){
                            month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                        }
                        if(month.querySelector(".month_change .section_next_month")) {
                            month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");
                        }
                    }
                });
            }
            if (year.getAttribute("data-year") != first_year && year.getAttribute("data-year") != last_year) {
                // month
                year.querySelectorAll(".month").forEach(function(month) {
                    if(month.querySelector(".month_change .section_prev_month")){
                        month.querySelector(".month_change .section_prev_month").setAttribute("onclick", "Basis_month_change(this, 0)");
                    }
                    if(month.querySelector(".month_change .section_next_month")) {
                        month.querySelector(".month_change .section_next_month").setAttribute("onclick", "Basis_month_change(this, 1)");
                    }
                });
            }
        }
    });
  
    // set calendar position -----------------------------------------------------------------------------------
    if (document.documentElement.clientWidth > 1280) {
        if (x.classList.contains('end_date')) {
            x.closest("div").classList.add("cal_flag_position");
            document.querySelectorAll('.start_date').forEach(function(start) {
                if(start){
                    start.closest("div").classList.remove("cal_flag_position");
                }
            });
        }else {
            var closestForm = x.closest("form");
            if (closestForm && closestForm.action) {
                if (closestForm.action.includes("Multicity")) {
                    x.closest("div").classList.add("cal_flag_position");
                }else {
                    x.closest("div").classList.add("cal_flag_position");
                    document.querySelector(".start_date").closest("div").classList.add("cal_flag_position");
                    document.querySelectorAll('.end_date').forEach(function(end) {
                        if(end){
                            end.closest("div").classList.remove("cal_flag_position");
                        }
                    });
                }
            }
        }
        var position = x.closest('.Basis_Date_Box').getBoundingClientRect();
        document.querySelector(".Basis_Calendar_Box").style.right = (window.innerWidth - position.left - x.closest('.Basis_Date_Box').offsetWidth - 10) + "px";
    }else {
        var position = x.getBoundingClientRect();
        document.querySelector(".Basis_Calendar_Box").style.right = (window.innerWidth - position.left - x.offsetWidth - 10) + "px";
    }
    document.querySelector(".Basis_Calendar_Box").style.top = (position.top + x.offsetHeight + 3) + "px";
    document.querySelector(".Basis_Calendar_Box").style.display = "block";
    if (x.classList.contains("end_date")) {
        if (cache_start_date != 0) {
            document.querySelectorAll('.day').forEach(function(day) {
                if (!day.classList.contains("empty_day") && !day.classList.contains("disable_day")) {
                    day.classList.add('days_available');
                }
            });
            document.querySelectorAll('.days_available').forEach(function(day) {
                day.addEventListener('mouseover', function(ev) {
                    let daysAll = document.querySelectorAll('.days_available');
                    daysAll.forEach(function(d) {
                        d.style.backgroundColor = "";
                    });
                    if (ev.type == "mouseover") {
                        daysAll.forEach(function(d, index) {
                            if (index < Array.from(daysAll).indexOf(day)) {
                                d.style.backgroundColor = "rgba(255, 117, 85, 0.2)";
                            }
                        });
                    }
                });
                day.addEventListener('mouseout', function(ev) {
                    let daysAll = document.querySelectorAll('.days_available');
                    daysAll.forEach(function(d) {
                        d.style.backgroundColor = "";
                    });
                });
            });
        }
  
    } else {
        if (cache_end_date != 0) {
            document.querySelectorAll('.day').forEach(function(day) {
                if (!day.classList.contains("empty_day") && !day.classList.contains("disable_day")) {
                    day.classList.add('days_available');
                }
            });
            document.querySelectorAll('.days_available').forEach(function(day) {
                day.addEventListener('mouseover', function(ev) {
                    let daysAll = document.querySelectorAll('.days_available');
                    daysAll.forEach(function(d) {
                        d.style.backgroundColor = "";
                    });
                    if (ev.type == "mouseover") {
                        daysAll.forEach(function(d, index) {
                            if (index < Array.from(daysAll).indexOf(day)) {
                                d.style.backgroundColor = "rgba(255, 117, 85, 0.2)";
                            }
                        });
                    }
                });
    
                day.addEventListener('mouseout', function(ev) {
                    let daysAll = document.querySelectorAll('.days_available');
                    daysAll.forEach(function(d) {
                        d.style.backgroundColor = "";
                    });
                });
            });
        }
    }
  }
  
  function Basis_Select_day(x) {
    document.querySelectorAll(".Basis_Date").forEach(function (el) {
        if (el.getAttribute("data-active") == "1") {
            if (el.classList.contains("start_date")) {
                document.querySelector(".type_date").textContent = 'تاریخ رفت :';
            } else if (el.classList.contains("end_date")) {
                document.querySelector(".type_date").textContent = 'تاریخ برگشت :';
            }
            if (el.classList.contains("start_date_fh")) {
                document.querySelector(".hotel-checkin").textContent = x.getAttribute("data-information").split("_")[4];
            } else if (el.classList.contains("end_date_fh")) {
                document.querySelector(".hotel-checkout").textContent = x.getAttribute("data-information").split("_")[4];
            }
            el.setAttribute("data-active", "0");
            if (el.closest(".Basis_Date_Box").classList.contains("format-changed")) {
                let splited_value = x.getAttribute("data-information").split("_")[4].split("-");
                el.value = splited_value[2] + ' ' + x.closest(".month").querySelector(".month_name").textContent;
                el.closest("div").querySelector(".date-value").value = x.getAttribute("data-information").split("_")[4];
            }else{
                el.value = x.getAttribute("data-information").split("_")[4];
            }
            el.setAttribute("data-cache", x.getAttribute("data-information"));
            const gregorianSpan = document.createElement("span");
            gregorianSpan.classList.add('gregorian_date');
            gregorianSpan.textContent = x.getAttribute("data-information").split("_")[3];
            el.after(gregorianSpan);
            const left_input = el.getBoundingClientRect().left;
            const left_input_parent = el.parentElement.getBoundingClientRect().left;
            const left_gregorian_date = (left_input - left_input_parent) + 5;
            el.nextElementSibling.style.left = left_gregorian_date + "px";
            var height = el.closest("div").offsetHeight;
            el.nextElementSibling.style.lineHeight = height + "px";
            if(el.closest("div").querySelector(".mstring_date")){
                el.closest("div").querySelector(".mstring_date").value = x.getAttribute("data-information").split("_")[3];
            }
            el.closest("div").querySelector(".selected-day").textContent = x.getAttribute("data-day");
            el.closest("div").querySelector(".selected-month").textContent = x.closest(".month").querySelector(".show_month_selected").value;
            document.querySelector(".month_of_date").textContent = x.closest(".month").querySelector(".show_month_selected").value;
            document.querySelector(".day_of_date").textContent = x.getAttribute("data-day");
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            if(el.closest(".column-date")) {
                el.closest(".column-date").querySelector(".filter-date").setAttribute("data-value", x.getAttribute("data-information").split("_")[4]);
            }
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            if(el.closest("div").querySelector(".floating-label")) {
                el.closest("div").querySelector(".floating-label").classList.add('floating-label-active');
            } 
            el.classList.add('input-valid');
            document.querySelector(".Basis_Calendar_Box").style.display = "none";
            calculate_date_diffrent(el);
        }
    });
    if(document.querySelectorAll('.start_date')){
        document.querySelectorAll('.start_date').forEach(function(start) {
            start.closest("div").classList.remove("cal_flag_position");
        });
    }

    if (document.querySelectorAll(".end_date")) {
        document.querySelectorAll('.end_date').forEach(function(end) {
            end.closest("div").classList.remove("cal_flag_position");
        });
    }
  }
  
  function calculate_date_diffrent(element) {
    if(element.closest("form").querySelector(".mstring_date.mstring_fdate")){
        var fdate = element.closest("form").querySelector(".mstring_date.mstring_fdate").value;
    }
    if(element.closest("form").querySelector(".mstring_date.mstring_tdate")){
        var tdate = element.closest("form").querySelector(".mstring_date.mstring_tdate").value;
    }

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const fdate_convert = new Date(fdate);
    const tdate_convert = new Date(tdate);
    const fdate_time = fdate_convert.getTime();
    const tdate_time = tdate_convert.getTime();
  
    if (fdate_time < tdate_time) {
      const diffrence = (tdate_time - fdate_time) / day;
      element.closest("form").querySelector("#night-count").textContent = diffrence + " شب";
    }
  }

  function Basis_month_change(x, change) {
    let current_year = parseInt(x.closest(".year").getAttribute("data-year"));
    let current_month = parseInt(x.closest(".month").getAttribute("data-month"));
    if (window.innerWidth > 851) {
        if (!document.querySelector(".tour-list-content")) {
            if (change == 0) { // Go to the month before
                if (current_month == 1) {
                    current_year -= 1;
                    current_month += 11;
                } else {
                    current_month -= 1;
                }
                x.closest(".month").classList.remove("current_month");
                x.closest(".month").nextElementSibling?.classList.remove("next_current_month");
  
            } else if (change == 1) {  // Go to the month after
                if (current_month == 12) {
                    current_year += 1;
                    current_month -= 11;
                } else {
                    current_month += 1;
                }
                x.closest(".month").classList.remove("next_current_month");
                x.closest(".month").previousElementSibling?.classList.remove("current_month");  
            }
            x.closest(".year").classList.remove("current_year");
            document.querySelectorAll(".Basis_Calendar_Box .year").forEach(year => {
                if (parseInt(year.getAttribute("data-year")) == current_year) {
                    year.classList.add("current_year");
                    year.querySelectorAll(".month").forEach(month => {
                        if (parseInt(month.getAttribute("data-month")) == current_month) {
                            month.classList.add("current_month");
                            if (!month.nextElementSibling) {
                                year.nextElementSibling?.querySelector(".month")?.classList.add("next_current_month");
                            } else {
                                month.nextElementSibling?.classList.add("next_current_month");
                            }
                            if (change == 0 && current_month == 11) {
                                year.nextElementSibling?.querySelector(".month")?.classList.remove("next_current_month");
                            }
                        }
                    })
                }
            })
        } else {
            if (change == 0) { // Go to the month before
                if (current_month == 1) {
                    current_year -= 1;
                    current_month += 11;
                } else
                    current_month -= 1;
            } else if (change == 1) {  // Go to the month after
                if (current_month == 12) {
                    current_year += 1;
                    current_month -= 11;
                } else
                    current_month += 1;
            }
            x.closest(".year").classList.remove("current_year");
            x.closest(".month").classList.remove("current_month");
            document.querySelectorAll(".Basis_Calendar_Box .year").forEach(year => {
                if (parseInt(year.getAttribute("data-year")) == current_year) {
                    year.classList.add("current_year");
                    year.querySelectorAll(".month").forEach(month => {
                        if (parseInt(month.getAttribute("data-month")) == current_month) {
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
        x.closest(".year").classList.remove("current_year");
        x.closest(".month").classList.remove("current_month");
        document.querySelectorAll(".Basis_Calendar_Box .year").forEach(year => {
            if (parseInt(year.getAttribute("data-year")) == current_year) {
                year.classList.add("current_year");
                year.querySelectorAll(".month").forEach(month => {
                    if (parseInt(month.getAttribute("data-month")) == current_month) {
                        month.classList.add("current_month");
                    }
                })
            }
        })
    }
  }
  
  function Basis_year_change(x) {
    alert(x);
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

  document.addEventListener("mouseup", function (e) {
    const container = document.querySelector(".Basis_Calendar_Box");
    if (!container.contains(e.target) && container != e.target) {
        document.querySelector(".Basis_Calendar_Box").style.display = "none";

        const startDateDiv = document.querySelector(".start_date").closest("div");
        if (startDateDiv) startDateDiv.classList.remove("cal_flag_position");

        const endDateDiv = document.querySelector(".end_date").closest("div");
        if (endDateDiv) endDateDiv.classList.remove("cal_flag_position");

        document.querySelectorAll(".Basis_Date").forEach(function (el) {
            if (el.getAttribute("data-active") == "1") {
                el.setAttribute("data-active", "0");
            }
        });
    }
  });
