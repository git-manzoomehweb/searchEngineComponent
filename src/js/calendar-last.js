function Basis_Calendar(x, today, calendar_type) {
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    if ($(x).attr("data-type") == 'tour-list') {
        $(".main-container").addClass("tour-list-content")
    } else {
        $(".main-container").removeClass("tour-list-content")
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
  
    if ($(x).hasClass("start_date")) {
        $(x).attr("data-cache", "0")
        
        $(x).closest(".Basis_Date_Box").find(".selected-day-dep").empty();
        $(x).closest(".Basis_Date_Box").find(".selected-month-dep").empty();

        var isDisabled = $(x).closest(".Basis_Date_Box").find(".end_date").is(':disabled');
        if (!isDisabled) {
            if (!$(x).closest(".Basis_Date_Box").find(".end_date").hasClass("end_date_filled")) {
                $(x).closest(".Basis_Date_Box").find(".end_date").val("");
                $(x).closest(".Basis_Date_Box").find(".end_date").next().html("");
                $(x).closest(".Basis_Date_Box").find(".selected-day-des").empty();
                $(x).closest(".Basis_Date_Box").find(".selected-month-des").empty();
            }
        }
        cache_start_date = $(x).attr("data-cache")
        cache_start_data_type = $(x).attr("data-type")
        cache_end_date = $(x).closest(".Basis_Date_Box").find(".end_date").attr("data-cache")
        if (cache_start_date != "0") {
            cache_year = cache_start_date.split("_")[4].split("-")[0]
            cache_month = cache_start_date.split("_")[4].split("-")[1]
        }
        cache_start_day = parseInt(cache_start_date.split("_")[0])
        cache_end_day = parseInt(cache_end_date.split("_")[0])
    }
  
    if ($(x).hasClass("end_date")) {
        cache_start_date = $(x).closest(".Basis_Date_Box").find(".start_date").attr("data-cache")
        cache_end_date = $(x).attr("data-cache")
  
        if (cache_end_date != "0") {
            cache_year = cache_end_date.split("_")[4].split("-")[0]
            cache_month = cache_end_date.split("_")[4].split("-")[1]
        } else if (cache_start_date != "0") {
            cache_year = cache_start_date.split("_")[4].split("-")[0]
            cache_month = cache_start_date.split("_")[4].split("-")[1]
        }
  
        cache_start_day = parseInt(cache_start_date.split("_")[0])
        cache_end_day = parseInt(cache_end_date.split("_")[0])
    }
  
    // reset calendar ------------------------------------------------------------------------------------------
    $(x).val("")
    if($(x).closest(".Basis_Date_Box").hasClass("format-changed")){
        $(x).closest("div").find(".date-value").val('')
    }
    $(x).next().html("")
    $(x).attr("data-cache", "0")
    $(x).attr("data-active", "1")
    $(x).closest("div").find(".floating-label").removeClass('floating-label-active')
    $(x).removeClass('input-valid')
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    $(x).closest(".column-date").find(".filter-date").attr("data-value", "")
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    $(".Basis_Calendar_Box").find(".current_year").each(function () {
        $(this).removeClass("current_year")
    })
    $(".Basis_Calendar_Box").find(".current_month").each(function () {
        $(this).removeClass("current_month")
    })
    if ($(window).width() > 851) {
        // $(".Basis_Calendar_Box").find(".next_current_year").each(function () {
        //     $(this).removeClass("next_current_year")
        // })
        $(".Basis_Calendar_Box").find(".next_current_month").each(function () {
            $(this).removeClass("next_current_month")
        })
    }
  
    $(".Basis_Calendar_Box").find(".day").each(function () {
        $(this).removeClass("selected_date")
    })
    $(".Basis_Calendar_Box").find(".day").each(function () {
        $(this).removeClass("days_available")
    })
    //  find all years ------------------------------------------------------------------------------------------
    current_year = 0
    current_month = 0
    // next_current_year = 0
    next_current_month = 0
  
    if (calendar_type == 0) {
        first_year = parseInt($(".Basis_Calendar_Box").find(".year").first().attr("data-year"))
        first_month = parseInt($(".Basis_Calendar_Box").find(".year").first().find(".month").first().attr("data-month"))
    } else if (calendar_type == 1) {
        first_year = parseInt(today.split("-")[0])
        first_month = parseInt(today.split("-")[1])
  
    }
  
    last_year = parseInt($(".Basis_Calendar_Box").find(".year").last().attr("data-year"))
    last_month = parseInt($(".Basis_Calendar_Box").find(".year").last().find(".month").last().attr("data-month"))
  
  
    // year
    $(".Basis_Calendar_Box").find(".year").each(function (year_index) {
        this_year = $(this).attr("data-year")
  
        if (cache_year == "0") {
            if ($(this).attr("data-year") == today.split("-")[0]) {
                $(this).addClass("current_year")
                if ($(window).width() > 851) {
                    // $(this).next().addClass("next_current_year")
                }
  
                current_year = parseInt(today.split("-")[0])
            }
        } else {
            if ($(this).attr("data-year") == cache_year) {
                $(this).addClass("current_year")
                if ($(window).width() > 851) {
                    // $(this).next().addClass("next_current_year")
                }
  
                current_year = parseInt(cache_year)
            }
        }
  
        // month
        $(this).find(".month").each(function (month_index) {
            month_text = "" // This variable is for name of month --> sample : "February / March"
            month_numbers = [] // A list of month numbers --> sample : ["01" , "12"]
            month_numbers_exists = {} // An object to remove duplicate months
  
            create_empty_week = ""
            week_count = $(this).find(".week").length
  
            this_month = $(this).attr("data-month") < 10 ? "0" + $(this).attr("data-month") : $(this).attr("data-month")
            if (cache_month == "0") {
                if (this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                    $(this).addClass("current_month")
                    if ($(window).width() > 851) {
                        if (!$(".main-container").hasClass("tour-list-content")) {
                            if ($(this).next().length == 0) {
  
                                $(this).closest(".year").next().find(".month").first().addClass("next_current_month")
                            } else {
                                $(this).next().addClass("next_current_month")
                            }
                        }
                    }
  
                }
  
  
            } else {
                if (this_month == cache_month && this_year == cache_year) {
                    $(this).addClass("current_month")
                    if ($(window).width() > 851) {
                        if (!$(".main-container").hasClass("tour-list-content")) {
                            if ($(this).next().length == 0) {
  
                                $(this).closest(".year").next().find(".month").first().addClass("next_current_month")
                            } else {
                                $(this).next().addClass("next_current_month")
                            }
                        }
                    }
  
                }
  
  
            }
  
            // week
            $(this).find(".week").each(function (week_index) {
  
  
                if (week_index == 0) {
  
                    $(this).find(".day").each(function (day_index) // Transfer first day of month to right place
                        {
  
                            if (!$(this).hasClass("empty_day") && !$(this).hasClass("Special_day")) {
                                if (day_index == 0) {
                                    create_empty_day = ""
                                    this_weekday = $(this).attr("data-information").split("_")[2]
  
                                    for (var i = 0; i < this_weekday; i++) {
                                        create_empty_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>"
                                    }
  
                                    $(this).before(create_empty_day)
                                }
                            }
                        })
                    // Transfer week of month to right place
                    // for (var i = 0; i < 5 - week_count; i++) 
                    // {
  
                    //     create_empty_week += "<tr class='week ssss'><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td><td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td></tr>"
                    // }
  
                    $(this).before(create_empty_week)
                }
                // Transfer days of sixth week to first week and remove empty_day class from them
                // if (week_index == 5) {
  
  
                //     $(this).find(".day").each(function (day_index) {
                //         if (!$(this).hasClass("empty_day") && !$(this).hasClass("Special_day")) {
                //             this_value = $(this).html()
                //             this_weekday = $(this).attr("data-information").split("_")[2]
  
                //             data_day = $(this).attr("data-day")
                //             data_active = $(this).attr("data-active")
                //             data_information = $(this).attr("data-information")
                //             onclick = "Basis_Select_day(this);openNextCal(this)"
  
                //             if (this_weekday == 7)
                //                 this_weekday = this_weekday - 7
  
                //             $(this).closest(".month").find(".week").first().find(".day").each(function (first_week_day) {
  
                //                 if (this_weekday == first_week_day) {
                //                     $(this).html(this_value)
                //                     $(this).removeClass("empty_day")
                //                     $(this).addClass("Special_day")
                //                     $(this).attr("data-information", data_information)
                //                     $(this).attr("data-day", data_day)
                //                     $(this).attr("data-active", data_active)
                //                     $(this).attr("onclick", "Basis_Select_day(this);openNextCal(this)")
                //                     $(this).closest(".month").find(".week").last().remove()
                //                 }
                //             })
                //         }
                //     })
  
                // }
  
                // day
                $(this).find(".day").each(function (day_index) {
                    if (!$(this).hasClass("empty_day") && !$(this).hasClass("Special_day")) {
                        // delete duplicate day and set current_day class 
                        this_day = $(this).attr("data-day") < 10 ? "0" + $(this).attr("data-day") : $(this).attr("data-day")
  
  
                        if (this_day == today.split("-")[2] && this_month == today.split("-")[1] && this_year == today.split("-")[0]) {
                            if ($(this).attr("data-information").split("_")[1] == 0)
                                $(this).remove()
  
                            $(this).addClass("current_day")
                            current_day_id = $(this).attr("data-information").split("_")[0]
                            var data_information_current = $(this).attr("data-information").split("_")[4]
                            $(".persiancurrent").each(function () {
                                $(this).val(data_information_current)
                            })
                            $(".gregoriancurrent").val($(this).attr("data-information").split("_")[3])
                        }
  
                        if (!month_numbers_exists[$(this).attr("data-information").split("_")[3].split("-")[1]]) {
                            month_numbers.push($(this).attr("data-information").split("_")[3].split("-")[1])
                            month_numbers_exists[$(this).attr("data-information").split("_")[3].split("-")[1]] = true
                        }
                    };
  
                    // set disable day
                    if (!$(this).hasClass("empty_day")) {
                        this_date_id = parseInt($(this).attr("data-information").split("_")[0])
                        if ($(x).hasClass("start_date")) {
                            if ($(x).attr("data-type") == '0-6') {
                                if ($(x).closest("form").find(".checkin").val() != '') {
                                    var data_cache_checkin = $(x).closest("form").find(".checkin").attr("data-cache").split("_")[0]
                                    var data_cache_checkout = $(x).closest("form").find(".checkout").attr("data-cache").split("_")[0]
                                    if (data_cache_checkin != '0' || data_cache_checkout != '0') {
                                        if (this_date_id > data_cache_checkout || this_date_id < data_cache_checkin) {
                                            $(this).removeAttr("onclick")
                                            $(this).addClass("disable_day")
                                        }
                                    }
  
                                } else {
                                    $(this).attr("onclick", "Basis_Select_day(this);openNextCal(this)")
                                    $(this).removeClass("disable_day")
                                }
                            } else if ($(x).attr("data-type") == '1-6') {
                                if ($(x).closest("form").find(".checkin").val() == '') {
                                    var data_cache_star_flight = $(x).closest("form").find(".start_date_flight").attr("data-cache").split("_")[0]
                                    var data_cache_date_flight = $(x).closest("form").find(".end_date_flight").attr("data-cache").split("_")[0]
                                    if (data_cache_star_flight != '0' || data_cache_date_flight != '0') {
                                        if (parseInt(this_date_id) > parseInt(data_cache_date_flight) || parseInt(this_date_id) < parseInt(data_cache_star_flight)) {
                                            $(this).removeAttr("onclick")
                                            $(this).addClass("disable_day")
                                        }
                                    }
  
                                }
                            } else {
                                if (cache_end_day != 0 && this_date_id > cache_end_day) {
                                    // $(this).removeAttr("onclick")
                                    //$(this).addClass("disable_day")
                                } else {
                                    if (cache_start_data_type !== "tour-list") {
                                        $(this).attr("onclick", "Basis_Select_day(this);openNextCal(this)")
                                        $(this).removeClass("disable_day")
                                    } else if (cache_start_data_type == "tour-list") {
                                        $(this).attr("onclick", "Basis_Select_day(this)")
                                        $(this).removeClass("disable_day")
                                    }
                                }
                            }
  
                        };
  
                        if ($(x).hasClass("end_date")) {
                            if ($(x).attr("data-type") == '0-6') {
                                if ($(x).closest("form").find(".checkin").val() != '') {
                                    var data_cache_checkin = $(x).closest("form").find(".checkin").attr("data-cache").split("_")[0]
                                    var data_cache_checkout = $(x).closest("form").find(".checkout").attr("data-cache").split("_")[0]
                                    if (data_cache_checkin != '0' || data_cache_checkout != '0') {
                                        if (this_date_id > data_cache_checkout || this_date_id < data_cache_checkin) {
                                            $(this).removeAttr("onclick")
                                            $(this).addClass("disable_day")
                                        }
                                    }
  
                                } else {
                                    $(this).attr("onclick", "Basis_Select_day(this);openNextCal(this)")
                                    $(this).removeClass("disable_day")
                                }
                            } else if ($(x).attr("data-type") == '1-6') {
                                if ($(x).closest("form").find(".checkin").val() == '') {
                                    var data_cache_star_flight = $(x).closest("form").find(".start_date_flight").attr("data-cache").split("_")[0]
                                    var data_cache_date_flight = $(x).closest("form").find(".end_date_flight").attr("data-cache").split("_")[0]
                                    if (data_cache_star_flight != '0' || data_cache_date_flight != '0') {
                                        if (parseInt(this_date_id) > parseInt(data_cache_date_flight) || parseInt(this_date_id) < parseInt(data_cache_star_flight)) {
                                            $(this).removeAttr("onclick")
                                            $(this).addClass("disable_day")
                                        }
                                    }
  
                                }
  
                            } else {
                                if (cache_start_day != 0 && this_date_id < cache_start_day) {
                                    $(this).removeAttr("onclick")
                                    $(this).addClass("disable_day")
  
                                } else {
                                    if ($(x).hasClass("end_date_filled")) {
                                        $(this).attr("onclick", "Basis_Select_day(this)")
                                    } else {
                                        if (cache_start_data_type !== "tour-list") {
                                            $(this).attr("onclick", "Basis_Select_day(this);openNextCal(this)")
                                            $(this).removeClass("disable_day")
                                        } else if (cache_start_data_type == "tour-list") {
                                            $(this).attr("onclick", "Basis_Select_day(this)")
                                            $(this).removeClass("disable_day")
                                        }
                                    }
  
  
                                }
                            }
  
  
  
                        };
  
                        if (cache_start_day != 0 && cache_start_day == this_date_id) {
                            $(this).addClass("selected_date")
                        }
                        if (cache_end_day != 0 && cache_end_day == this_date_id) {
                            $(this).addClass("selected_date")
                        }
  
                        if (cache_start_day != 0 && cache_end_day != 0 && this_date_id >= cache_start_day && this_date_id <= cache_end_day)
                            $(this).addClass("selected_day")
                        else
                            $(this).removeClass("selected_day")
                    };
                })
            })
  
            // create of td with class empty_day for last days of month
            create_empty_last_day = ""
            day_count = $(this).find(".week").last().find(".day").length
            console.log("first ="+day_count)
  
            for (var i = 0; i < 7 - day_count; i++) {
                console.log("day_count ="+day_count)
                create_empty_last_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>"
            }
  
            $(this).find(".week").last().find(".day").last().after(create_empty_last_day)
  
            // set month text Using month_numbers array 
            month_numbers.sort()
  
            if (month_numbers[0] == "01" && month_numbers[1] == "12")
                month_text = month_dict[month_numbers[1]] + " / " + month_dict[month_numbers[0]]
            else
                month_text = month_dict[month_numbers[0]] + " / " + month_dict[month_numbers[1]]
  
            $(this).find(".month_detail div").last().text(month_text)
        })
    })
  
    // set month_change onclick --------------------------------------------------------------------------------
    $(".Basis_Calendar_Box").find(".year").each(function (year_index) {
        // year
        if (first_year == last_year) {
            // month
            $(this).find(".month").each(function (month_index) {
                if ($(this).attr("data-month") == first_month) {
                    $(this).find(".month_change").find(".section_prev_month").css("color", "#e3e3e3")
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
  
                    // day
                    if (calendar_type == 1) {
                        $(this).find(".day").each(function (day_index) {
                            if (!$(this).hasClass("empty_day")) {
                                if ($(this).attr("data-information").split("_")[0] < current_day_id) {
                                    $(this).removeAttr("onclick")
                                    $(this).addClass("disable_day")
                                }
  
                            }
                        })
                    }
                } else if ($(this).attr("data-month") == last_month) {
                    $(this).find(".month_change").find(".section_next_month").css("color", "#e3e3e3")
                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                } else {
                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
                }
            })
        } else {
            if ($(this).attr("data-year") == first_year) {
                // month
                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == first_month) {
                        $(this).find(".month_change").find(".section_prev_month").css("color", "#e3e3e3")
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
  
                        // day
                        if (calendar_type == 1) {
                            $(this).find(".day").each(function (day_index) {
                                if (!$(this).hasClass("empty_day")) {
                                    if ($(this).attr("data-information").split("_")[0] < current_day_id) {
                                        $(this).removeAttr("onclick")
                                        $(this).addClass("disable_day")
                                    }
                                }
                            })
                        }
                    } else {
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
                    }
                })
            }
            if ($(this).attr("data-year") == last_year) {
                // month
                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == last_month) {
                        $(this).find(".month_change").find(".section_next_month").css("color", "#e3e3e3")
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                    } else {
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
                    }
                })
            }
            if ($(this).attr("data-year") != first_year && $(this).attr("data-year") != last_year) {
                // month
                $(this).find(".month").each(function (month_index) {
  
                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", "Basis_month_change(this,0)")
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", "Basis_month_change(this,1)")
                })
            }
        }
    })
  
    // set calendar position -----------------------------------------------------------------------------------
    if($(document).width() > 1280 ) {
        if ($(x).hasClass('end_date')) {
            $(".end_date").closest("div").addClass("cal_flag_position")
            $(".start_date").closest("div").removeClass("cal_flag_position") 
        }else {
            var closestForm = $(x).closest("form");
            if (closestForm.attr("action")){
                if (closestForm.attr("action").includes("Multicity")) {
                    $(x).closest("div").addClass("cal_flag_position") 
                }else {
                    $(".start_date").closest("div").addClass("cal_flag_position") 
                    $(".end_date").closest("div").removeClass("cal_flag_position") 
                }
            }
     
            
        }
        var position = $(x).closest('.Basis_Date_Box').offset();
        $(".Basis_Calendar_Box").css("right", $(window).width() - position.left - $(x).closest('.Basis_Date_Box').outerWidth(true) - 10)
    }else {
        var position = $(x).offset()
        $(".Basis_Calendar_Box").css("right", $(window).width() - position.left - $(x).outerWidth(true) - 10)
    }
    $(".Basis_Calendar_Box").css("top", position.top + $(x).outerHeight(true) + 3)
    $(".Basis_Calendar_Box").fadeIn()
  
  
    if ($(x).hasClass("end_date")) {
  
        if (cache_start_date != 0) {
            $('.day').each(function () {
                if (!$(this).hasClass("empty_day") && !$(this).hasClass("disable_day")) {
                    $(this).addClass('days_available')
                }
            })
            $('.days_available').on('mouseover mouseout', function (ev) {
                let days_all = $('.days_available');
                days_all.css("background-color", "");
                ev.type == "mouseover" && days_all.slice(0, days_all.index(this)).css("background-color", "rgba(255, 117, 85, 0.2)");
            })
        }
  
    } else {
  
        if (cache_end_date != 0) {
            $('.day').each(function () {
                if (!$(this).hasClass("empty_day") && !$(this).hasClass("disable_day")) {
                    $(this).addClass('days_available')
                }
            })
            $('.days_available').on('mouseover mouseout', function (ev) {
                let days_all = $('.days_available');
                days_all.css("background-color", "");
                ev.type == "mouseover" && days_all.slice(0, days_all.index(this)).css("background-color", "rgba(255, 117, 85, 0.2)");
            })
  
        }
    }
  }
  
  function Basis_Select_day(x) {
    $(".Basis_Date").each(function () {
        if ($(this).attr("data-active") == "1") {
            if ($(this).hasClass("start_date")) {
                $(".type_date").text('تاریخ رفت :')
            } else if ($(this).hasClass("end_date")) {
                $(".type_date").text('تاریخ برگشت :')
            }
            if ($(this).hasClass("start_date_fh")) {
                $(".hotel-checkin").text($(x).attr("data-information").split("_")[4])
            } else if ($(this).hasClass("end_date_fh")) {
                $(".hotel-checkout").text($(x).attr("data-information").split("_")[4])
            }
            
            $(this).attr("data-active", "0")
            if($(this).closest(".Basis_Date_Box").hasClass("format-changed")){
                let splited_value = $(x).attr("data-information").split("_")[4].split("-");
                $(this).val(splited_value[2] + ' ' +$(x).closest(".month").find(".month_name").text())
                $(this).closest("div").find(".date-value").val($(x).attr("data-information").split("_")[4])
            }else{
                $(this).val($(x).attr("data-information").split("_")[4])
            }
           
            $(this).attr("data-cache", $(x).attr("data-information"))
            $(this).after("<span class='gregorian_date'>" + $(x).attr("data-information").split("_")[3] + "</span>");
            var left_input = ($(this).offset().left)
            var left_input_parent = ($(this).parent().offset().left)
            var left_gregorian_date = (left_input - left_input_parent) + 5
            $(this).next().css("left", left_gregorian_date + "px")
            var height = $(this).closest("div").innerHeight()
            $(this).next().css("line-height", height + "px")
            $(this).closest("div").find(".mstring_date").val($(x).attr("data-information").split("_")[3])
            $(this).closest("div").find(".selected-day").text($(x).attr("data-day"))
            $(this).closest("div").find(".selected-month").text($(x).closest(".month").find(".show_month_selected").val())
            $(".month_of_date").text($(x).closest(".month").find(".show_month_selected").val())
            $(".day_of_date").text($(x).attr("data-day"))
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            $(this).closest(".column-date").find(".filter-date").attr("data-value", $(x).attr("data-information").split("_")[4])
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            $(this).closest("div").find(".floating-label").addClass('floating-label-active')
            $(this).addClass('input-valid')
            $(".Basis_Calendar_Box").hide();
            calculate_date_diffrent(this);
  
          
  
        }
    })
    $(".start_date").closest("div").removeClass("cal_flag_position") 
    $(".end_date").closest("div").removeClass("cal_flag_position") 
  }
  
  function calculate_date_diffrent(element){
    var fdate = $(element).closest("form").find(".mstring_date.mstring_fdate").val();
    var tdate = $(element).closest("form").find(".mstring_date.mstring_tdate").val();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // const year = day * 365;
    const fdate_convert = new Date(fdate);
    const tdate_convert = new Date(tdate);
    const fdate_time = fdate_convert.getTime();
    const tdate_time = tdate_convert.getTime();
    if(fdate_time < tdate_time){
        var diffrence =  ((tdate_time - fdate_time) / day);
        $(element).closest("form").find("#night-count").text(diffrence + "شب");
    }
  }
  
  function Basis_month_change(x, change) {
    current_year = parseInt($(x).closest(".year").attr("data-year"))
    current_month = parseInt($(x).closest(".month").attr("data-month"))
    if ($(window).width() > 851) {
        if (!$(".main-container").hasClass("tour-list-content")) {
            if (change == 0) // Go to the month before
            {
                if (current_month == 1) {
                    current_year -= 1
                    current_month += 11
                } else {
                    current_month -= 1
                }
                $(x).closest(".month").removeClass("current_month")
                $(x).closest(".month").next().removeClass("next_current_month")
                if (current_month == 12) {
  
                    // $(x).closest(".year").find(".month").first().removeClass("next_current_month")
                    //  $(x).closest(".year").next().find(".month").first().removeClass("next_current_month")
                } else {
  
  
                }
  
            } else if (change == 1) // Go to the month after
            {
                if (current_month == 12) {
                    current_year += 1
                    current_month -= 11
                } else {
                    current_month += 1
                }
                $(x).closest(".month").removeClass("next_current_month")
                $(x).closest(".month").prev().removeClass("current_month")
  
  
            }
  
            //$(x).closest(".year").removeClass("next_current_year")
            $(x).closest(".year").removeClass("current_year")
            $(".Basis_Calendar_Box").find(".year").each(function (year_index) {
                if ($(this).attr("data-year") == current_year) {
                    $(this).addClass("current_year")
                    //  $(this).next().addClass("next_current_year")
                    $(this).find(".month").each(function (month_index) {
                        if ($(this).attr("data-month") == current_month) {
                            $(this).addClass("current_month")
  
                            // if(change == 1) {
                            if ($(this).next().length == 0) {
                                $(this).closest(".year").next().find(".month").first().addClass("next_current_month")
                            } else {
                                $(this).next().addClass("next_current_month")
                            }
                            // }else{
                            if (change == 0 && current_month == 11) {
                                $(this).closest(".year").next().find(".month").first().removeClass("next_current_month")
                            }
                            // if($(this).next().length == 0){
                            //     console.log('ssssssss2')
                            //     $(this).closest(".year").next().find(".month").first().next().removeClass("next_current_month")
  
                            // }else{
                            //     $(this).next().addClass("next_current_month")
                            // } 
                            // }
  
  
                        }
  
                    })
                }
            })
        } else {
            if (change == 0) // Go to the month before
            {
                if (current_month == 1) {
                    current_year -= 1
                    current_month += 11
                } else
                    current_month -= 1
            } else if (change == 1) // Go to the month after
            {
                if (current_month == 12) {
                    current_year += 1
                    current_month -= 11
                } else
                    current_month += 1
            }
  
            $(x).closest(".year").removeClass("current_year")
            $(x).closest(".month").removeClass("current_month")
  
            $(".Basis_Calendar_Box").find(".year").each(function (year_index) {
                if ($(this).attr("data-year") == current_year) {
                    $(this).addClass("current_year")
  
                    $(this).find(".month").each(function (month_index) {
                        if ($(this).attr("data-month") == current_month)
                            $(this).addClass("current_month")
                    })
                }
            })
        }
    } else {
        if (change == 0) // Go to the month before
        {
            if (current_month == 1) {
                current_year -= 1
                current_month += 11
            } else
                current_month -= 1
        } else if (change == 1) // Go to the month after
        {
            if (current_month == 12) {
                current_year += 1
                current_month -= 11
            } else
                current_month += 1
        }
  
        $(x).closest(".year").removeClass("current_year")
        $(x).closest(".month").removeClass("current_month")
  
        $(".Basis_Calendar_Box").find(".year").each(function (year_index) {
            if ($(this).attr("data-year") == current_year) {
                $(this).addClass("current_year")
  
                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == current_month)
                        $(this).addClass("current_month")
                })
            }
        })
    }
  
  }
  
  function Basis_year_change(x) {
    alert(x)
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
  
  $(document).mouseup(function (e) {
    var container = $(".Basis_Calendar_Box");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".Basis_Calendar_Box").hide();
        $(".start_date").closest("div").removeClass("cal_flag_position") 
        $(".end_date").closest("div").removeClass("cal_flag_position") 
        $(".Basis_Date").each(function () {
            if ($(this).attr("data-active") == "1")
                $(this).attr("data-active", "0")
        })
    }
  });