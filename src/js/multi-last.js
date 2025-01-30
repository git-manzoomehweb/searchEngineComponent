function Basis_Calendar(x, today) {
    document.querySelectorAll('.basis_min_price').forEach(e => {
        e.innerHTML = "";
    })
    var calendar_type = $(x).attr("data-lang")
    var self = $(".en-calendar");
    if (calendar_type == 'fa') {
        self = $(".fa-calendar");
    }
    if ($(x).closest("form").attr("id") == 'multi-flight-form') {
        if ($(x).closest(".route-content").attr("data-index") > 1) {
            var calendarId = $(x).closest(".route-content").prev(".route-content").find(".start_date").attr("data-cache").split("_")[0];
            self.find(".day").each(function () {
                if (!$(this).hasClass("empty_day")) {
                    if ($(this).attr("data-information").split("_")[0] < calendarId) {
                        $(this).removeAttr("onclick")
                        $(this).addClass("disable_day")
                    } else {
                        $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
                        $(this).removeClass("disable_day")
                    }

                }
            })
        } else {
            self.find(".day").each(function () {
                if (!$(this).hasClass("empty_day")) {
                    $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
                    $(this).removeClass("disable_day")


                }
            })
        }
    }
    var day, year, month;
    if (calendar_type == 'fa') {
        day = parseInt(today.split("/")[1])
        year = parseInt(today.split("/")[2])
        month = parseInt(today.split("/")[0])
    } else {
        day = parseInt(today.split("/")[1]) < 10 ? "0" + parseInt(today.split("/")[1]) : parseInt(today.split("/")[1])
        year = parseInt(today.split("/")[2]) < 10 ? "0" + parseInt(today.split("/")[2]) : parseInt(today.split("/")[2])
        month = parseInt(today.split("/")[0]) < 10 ? "0" + parseInt(today.split("/")[0]) : parseInt(today.split("/")[0])
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
        var today = persiandate(year, month, day)
    } else {
        var today = year + "-" + month + "-" + day
    }
    // cache information ---------------------------------------------------------------------------------------
    var cache_year = "0"
    var cache_month = "0"

    if ($(x).hasClass("start_date")) {
        var isDisabled = $(x).closest(".Basis_Date_Box").find(".end_date").is(':disabled');
        // if (!isDisabled) {
        if (!$(x).closest(".Basis_Date_Box").find(".end_date").hasClass("end_date_filled")) {
            $(x).closest(".Basis_Date_Box").find(".end_date").val("")
            // $(x).closest(".Basis_Date_Box").find(".end_date").next().html("")
            $(x).closest(".Basis_Date_Box").find(".end_date").next().find(".selected-day").text('');
            $(x).closest(".Basis_Date_Box").find(".end_date").next().find(".selected-month").text('');
            $(x).closest(".Basis_Date_Box").find(".end_date").next().find(".day-of-week").text('');
        }
        // }
        cache_start_date = $(x).attr("data-cache")
        cache_start_data_type = $(x).attr("data-type")
        cache_end_date = $(x).closest(".Basis_Date_Box").find(".end_date").attr("data-cache")

        if (cache_start_date != "0") {
            if (calendar_type == 'fa') {
                cache_year = cache_start_date.split("_")[4].split("-")[0]
                cache_month = cache_start_date.split("_")[4].split("-")[1]
            } else {
                cache_year = cache_start_date.split("_")[3].split("-")[0]
                cache_month = cache_start_date.split("_")[3].split("-")[1]
            }

        }

        cache_start_day = parseInt(cache_start_date.split("_")[0])
        cache_end_day = parseInt(cache_end_date.split("_")[0])


    }

    if ($(x).hasClass("end_date")) {
        cache_start_date = $(x).closest(".Basis_Date_Box").find(".start_date").attr("data-cache")
        cache_end_date = $(x).attr("data-cache")
        if (calendar_type == 'fa') {
            if (cache_end_date != "0") {
                cache_year = cache_end_date.split("_")[4].split("-")[0]
                cache_month = cache_end_date.split("_")[4].split("-")[1]
            } else if (cache_start_date != "0") {
                cache_year = cache_start_date.split("_")[4].split("-")[0]
                cache_month = cache_start_date.split("_")[4].split("-")[1]
            }
        } else {
            if (cache_end_date != "0") {
                cache_year = cache_end_date.split("_")[3].split("-")[0]
                cache_month = cache_end_date.split("_")[3].split("-")[1]
            } else if (cache_start_date != "0") {
                cache_year = cache_start_date.split("_")[3].split("-")[0]
                cache_month = cache_start_date.split("_")[3].split("-")[1]
            }
        }


        cache_start_day = parseInt(cache_start_date.split("_")[0])
        cache_end_day = parseInt(cache_end_date.split("_")[0])


    }

    // reset calendar ------------------------------------------------------------------------------------------
    $(x).val("")
    if ($(x).closest(".Basis_Date_Box").hasClass("format-changed")) {
        $(x).closest("div").find(".date-value").val('')
    }

    // $(x).next().html("")
    $(x).closest('.date-container').find(".selected-day").text('');
    $(x).closest('.date-container').find(".selected-month").text('');
    $(x).closest('.date-container').find(".day-of-week").text('');

    $(x).attr("data-cache", "0")
    $(x).attr("data-active", "1")
    $(x).closest("div").find(".floating-label").removeClass('floating-label-active')
    $(x).removeClass('input-valid')
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    $(x).closest(".column-date").find(".filter-date").attr("data-value", "")
    /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
    self.find(".date-info-departure").val("")
    self.find(".date-info-destination").val("")
    // self.find(".module-calendar-type").text($(x).attr("data-module"))
    self.find(".current_year").each(function () {
        $(this).removeClass("current_year")
    })
    self.find(".current_month").each(function () {
        $(this).removeClass("current_month")
    })
    if ($(window).width() >= 1201) {
        self.find(".next_current_month").each(function () {
            $(this).removeClass("next_current_month")
        })
    }

    self.find(".day").each(function () {
        $(this).removeClass("selected_date")
        $(this).removeClass("days_available")
    })

    //  find all years ------------------------------------------------------------------------------------------
    current_year = 0
    current_month = 0
    // next_current_year = 0
    next_current_month = 0


    first_year = parseInt(today.split("-")[0])
    first_month = parseInt(today.split("-")[1])



    last_year = parseInt(self.find(".year").last().attr("data-year"))
    last_month = parseInt(self.find(".year").last().find(".month").last().attr("data-month"))


    // year
    self.find(".year").each(function (year_index) {
        this_year = $(this).attr("data-year")
        if (cache_year == "0") {
            if ($(this).attr("data-year") == today.split("-")[0]) {
                $(this).addClass("current_year")
                current_year = parseInt(today.split("-")[0])
            }
        } else {
            if ($(this).attr("data-year") == cache_year) {
                $(this).addClass("current_year")
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
                    if ($(window).width() >= 1201) {
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
                    if ($(window).width() >= 1201) {
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
                                let index_i = 1;
                                if (calendar_type == 'fa') {
                                    index_i = 0;
                                }
                                for (var i = index_i; i < this_weekday; i++) {
                                    create_empty_day += "<td class='day empty_day'><div class='basis_s_day'></div><div class='basis_m_day'></div></td>"
                                }

                                $(this).before(create_empty_day)
                            }
                        }
                    })
                    // Transfer week of month to right place

                    $(this).before(create_empty_week)
                }
                // Transfer days of sixth week to first week and remove empty_day class from them
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
                            var data_information_current = $(this).attr("data-information").split("_")[3]
                            if (calendar_type == 'fa') {
                                $(".persiancurrent").each(function () {
                                    $(this).val(data_information_current)
                                })
                            } else {
                                $(".currentdate").each(function () {
                                    $(this).val(data_information_current)
                                })
                            }

                            $(".gregoriancurrent").val($(this).attr("data-information").split("_")[3])
                        }

                        if (!month_numbers_exists[$(this).attr("data-information").split("_")[3].split("-")[1]]) {
                            month_numbers.push($(this).attr("data-information").split("_")[3].split("-")[1])
                            month_numbers_exists[$(this).attr("data-information").split("_")[3].split("-")[1]] = true
                        }
                    };

                    // set disable day
                })
            })

            // create of td with class empty_day for last days of month
            create_empty_last_day = ""
            day_count = $(this).find(".week").last().find(".day").length

            for (var i = 0; i < 7 - day_count; i++) {
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
    self.find(".year").each(function (year_index) {
        // year
        if (first_year == last_year) {
            // month
            $(this).find(".month").each(function (month_index) {
                if ($(this).attr("data-month") == first_month) {
                    $(this).find(".month_change").find(".section_prev_month").css("color", "#e3e3e3")
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)

                    // day

                    $(this).find(".day").each(function (day_index) {
                        if (!$(this).hasClass("empty_day")) {
                            if ($(this).attr("data-information").split("_")[0] < current_day_id) {
                                $(this).removeAttr("onclick")
                                $(this).addClass("expire_day")
                            }

                        }
                    })

                } else if ($(this).attr("data-month") == last_month) {
                    $(this).find(".month_change").find(".section_next_month").css("color", "#e3e3e3")
                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                } else {
                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)
                }
            })
        } else {
            if ($(this).attr("data-year") == first_year) {
                // month
                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == first_month) {
                        $(this).find(".month_change").find(".section_prev_month").css("color", "#e3e3e3")
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)

                        // day

                        $(this).find(".day").each(function (day_index) {
                            if (!$(this).hasClass("empty_day")) {
                                if ($(this).attr("data-information").split("_")[0] < current_day_id) {
                                    $(this).removeAttr("onclick")
                                    $(this).addClass("expire_day")
                                }
                            }
                        })

                    } else {
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)
                    }
                })
            }
            if ($(this).attr("data-year") == last_year) {
                // month
                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == last_month) {
                        $(this).find(".month_change").find(".section_next_month").css("color", "#e3e3e3")
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                    } else {
                        $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                        $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)
                    }
                })
            }
            if ($(this).attr("data-year") != first_year && $(this).attr("data-year") != last_year) {
                // month
                $(this).find(".month").each(function (month_index) {

                    $(this).find(".month_change").find(".section_prev_month").attr("onclick", `Basis_month_change(this,0,"${calendar_type}")`)
                    $(this).find(".month_change").find(".section_next_month").attr("onclick", `Basis_month_change(this,1,"${calendar_type}")`)
                })
            }
        }
    })

    // set calendar position -----------------------------------------------------------------------------------
    var position = $(x).closest(".Basis_Date_Box").offset()
    if ($(x).closest("form").attr("id") == 'multi-flight-form') {
        if ($(x).closest(".route-content").hasClass("set_Date_Box")) {
            position = $(x).closest(".route-content").offset()
        }

    }
    self.css("top", position.top + $(x).outerHeight(true) + 3)
    // self.css("top", position.top + $(x).outerHeight(true) + $(x).height())
    // self.css("top", position.top + $(x).height())
    if ($(x).closest("html").attr('lang') === 'fa') {
        if($(document).width() > 1280 ) {
            if ($(x).closest("form").attr("id") !== 'multi-flight-form'){
                $(".Basis_Calendar_Box").css("right", $(window).width() - position.left - $(x).closest('.Basis_Date_Box').outerWidth(true) - 10)
                $(".Basis_Calendar_Box").css("left","unset")
            }else {
                self.css("left", position.left)
            }
        }else {
            self.css("left", position.left)
        }
    }  else {
        self.css("left", position.left)
    }
    if (calendar_type == 'fa') {
        $(".fa-calendar").addClass("Selected_Basis_Calendar_Box");
        $(".en-calendar").removeClass("Selected_Basis_Calendar_Box");
        $(".fa-calendar").fadeIn("slow")
        $(".en-calendar").fadeOut("slow")
    } else {
        $(".fa-calendar").removeClass("Selected_Basis_Calendar_Box");
        $(".en-calendar").addClass("Selected_Basis_Calendar_Box");
        $(".en-calendar").fadeIn("slow");
        $(".fa-calendar").fadeOut("slow")
    }


}


function Basis_Select_day(x, calendar_type) {
    var self = $(".en-calendar");
    if (calendar_type == 'fa') {
        self = $(".fa-calendar");
    }

    $(".Basis_Date").each(function () {
        if ($(this).attr("data-active") == "1") {

            if (calendar_type == 'fa') {
                if ($(this).hasClass("start_date_fh")) {
                    $(".hotel-checkin").text($(x).attr("data-information").split("_")[3])
                } else if ($(this).hasClass("end_date_fh")) {
                    $(".hotel-checkout").text($(x).attr("data-information").split("_")[3])
                }

            } else {
                if ($(this).hasClass("start_date_fh")) {
                    $(".hotel-checkin").text($(x).attr("data-information").split("_")[4])
                } else if ($(this).hasClass("end_date_fh")) {
                    $(".hotel-checkout").text($(x).attr("data-information").split("_")[4])
                }
            }


            if ($(this).closest(".Basis_Date_Box").hasClass("format-changed")) {
                let splited_value = $(x).attr("data-information").split("_")[4].split("-");
                $(this).val(splited_value[2] + ' ' + $(x).closest(".month").find(".month_name").text())
                $(this).closest("div").find(".date-value").val($(x).attr("data-information").split("_")[4])
            } else {
                if (calendar_type == 'fa') {
                    if ($(this).hasClass("start_date")) {
                        $(x).closest(".Basis_Calendar_Box").find(".date-info-departure").val($(x).attr("data-information").split("_")[4])
                    } else if ($(this).hasClass("end_date")) {
                        $(x).closest(".Basis_Calendar_Box").find(".date-info-destination").val($(x).attr("data-information").split("_")[4])
                    }
                    $(this).val($(x).attr("data-information").split("_")[4])
                } else {
                    if ($(this).hasClass("start_date")) {
                        $(x).closest(".Basis_Calendar_Box").find(".date-info-departure").val($(x).attr("data-information").split("_")[3])
                    } else if ($(this).hasClass("end_date")) {
                        $(x).closest(".Basis_Calendar_Box").find(".date-info-destination").val($(x).attr("data-information").split("_")[3])
                    }
                    $(this).val($(x).attr("data-information").split("_")[3])
                }

            }

            $(this).attr("data-cache", $(x).attr("data-information"))

            $(this).closest("div").find(".mstring_date").val($(x).attr("data-information").split("_")[3])
            $(this).closest("div").find(".selected-day").text($(x).attr("data-day"))
            $(this).closest("div").find(".selected-month").text($(x).closest(".month").find(".show_month_selected").val())
            $(".month_of_date").text($(x).closest(".month").find(".show_month_selected").val())
            $(".day_of_date").text($(x).attr("data-day"))
            var day_week = $(x).attr("data-information").split("_")[2];

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
                $(this).closest('.date-container').find(".day-of-week").text(weekdayFa); /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            } else {
                $(this).closest('.date-container').find(".day-of-week").text(weekdayEn); /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            }

            $(this).closest(".column-date").find(".filter-date").attr("data-value", $(x).attr("data-information").split("_")[4])
            /*-----------------START JS FOR TOUR LIST JSON TO STYLE CALENDAR---------------------*/
            $(this).closest("div").find(".floating-label").addClass('floating-label-active')
            $(this).addClass('input-valid')

            calculate_date_diffrent(this);
            if ($(".nights-calc")[0] || $("#night-count")[0]) {
                var startDay = new Date($(".start_date").val());
                var endDay = new Date($(".end_date").val());
                var millisBetween = startDay.getTime() - endDay.getTime();
                var days = Math.round(Math.abs(millisBetween / (1000 * 3600 * 24)));
                $("#night-count").text(days + " Night");
                $(".nights-calc div span").text(days);
            }



            $(this).attr("data-active", "0")
            if ($(this).hasClass("start_date")) {
                if (!$(this).closest(".Basis_Date_Box").find(".end_date").is(':disabled')) {
                    $(this).closest(".Basis_Date_Box").find(".end_date").attr("data-active", "1")
                } else {
                    $(this).attr("data-active", "1")
                }
                self.find(".day").each(function () {
                    $(this).removeClass("selected_date")
                    $(this).removeClass("days_available")
                    $(this).removeClass("disable_day")
                    if (!$(this).hasClass("empty_day") && !$(this).hasClass("expire_day")) {
                        $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
                    }
                })
                $(x).addClass("selected_date");

            } else {
                $(this).closest(".Basis_Date_Box").find(".start_date").attr("data-active", "1")
                $(x).addClass("selected_date");

            }


            if ($(this).hasClass("start_date")) {
                let check_date = $(x).attr("data-information").split("_")[0]
                $(x).closest(".Basis_Calendar_Box").find('.day').each(function () {
                    if (!$(this).hasClass("empty_day")) {
                        this_date_id = parseInt($(this).attr("data-information").split("_")[0])


                        if (this_date_id < check_date) {
                            $(this).removeAttr("onclick")
                            $(this).addClass("disable_day")
                        } else {
                            $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
                            $(this).removeClass("disable_day")

                        }


                    };
                })



            } else {
                let check_date = $(x).attr("data-information").split("_")[0]
                $(x).closest(".Basis_Calendar_Box").find('.day').each(function () {
                    if (!$(this).hasClass("empty_day") && !$(this).hasClass("disable_day")) {
                        this_date_id = parseInt($(this).attr("data-information").split("_")[0])


                        if (this_date_id < check_date) {
                            $(this).addClass('days_available')
                        } else {
                            $(this).removeClass('days_available')
                        }


                    };
                })

            }



            return false;

        }

    })
}
function calculate_date_diffrent(element) {
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
    if (fdate_time < tdate_time) {
        var diffrence = ((tdate_time - fdate_time) / day);
        $(element).closest("form").find("#night-count").text(diffrence + "شب");
    }
}
function Basis_month_change(x, change, calendar_type) {
    var self = $(".en-calendar");
    if (calendar_type == 'fa') {
        self = $(".fa-calendar");
    }
    current_year = parseInt($(x).closest(".year").attr("data-year"))
    current_month = parseInt($(x).closest(".month").attr("data-month"))
    if ($(window).width() >= 1201) {
        if (!$(".main-container").hasClass("tour-list-content")) {
            if (change == 0) // Go to the month before
            {
                console.log("ok1="+current_month)
                if (current_month == 1) {
                    current_year -= 1
                    current_month += 11
                } else {
                    current_month -= 1
                }
                console.log("ok1-2="+current_month)
                $(x).closest(".month").removeClass("current_month")
                $(x).closest(".month").next().removeClass("next_current_month")

            } else if (change == 1) // Go to the month after
            {
                console.log("ok2="+current_month)
                if (current_month == 12) {
                    current_year += 1
                    current_month -= 11
                } else {
                    current_month += 1
                }
                $(x).closest(".month").removeClass("next_current_month")
                $(x).closest(".month").prev().removeClass("current_month")


            }

            $(x).closest(".year").removeClass("current_year")
            self.find(".year").each(function (year_index) {
                if ($(this).attr("data-year") == current_year) {
                    $(this).addClass("current_year")
                    $(this).find(".month").each(function (month_index) {
                        if ($(this).attr("data-month") == current_month) {
                            $(this).addClass("current_month")
                            if ($(this).next().length == 0) {
                                $(this).closest(".year").next().find(".month").first().addClass("next_current_month")
                            } else {
                                $(this).next().addClass("next_current_month")
                            }

                            if (change == 0 && current_month == 11) {
                                $(this).closest(".year").next().find(".month").first().removeClass("next_current_month")
                            }


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

            self.find(".year").each(function (year_index) {
                if ($(this).attr("data-year") == current_year) {
                    $(this).addClass("current_year")

                    $(this).find(".month").each(function (month_index) {
                        if ($(this).attr("data-month") == current_month){
                            $(this).addClass("current_month")
                        }
                            
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

        self.find(".year").each(function (year_index) {
            if ($(this).attr("data-year") == current_year) {
                $(this).addClass("current_year")

                $(this).find(".month").each(function (month_index) {
                    if ($(this).attr("data-month") == current_month){
                        $(this).addClass("current_month")
                    }
                        
                })
            }
        })
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
    let active_module = $(".active-module").attr("data-id");
    let active_form = document.getElementById(active_module)?.querySelector(".form-search");
    if (active_module === 'item-Flight') {
        active_form = document.getElementById("flight-form");
        if (!$('#' + active_module).find("#multi-flight-form").is(":hidden")) {
            active_form = document.getElementById("flight-form");
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
                Basis_Select_day($(element).closest(".Basis_Calendar_Box").find(".current_day"), calendar_type);
                $(element).closest(".Basis_Calendar_Box").find(".date-info-destination").val('');
            }
        }
    }
}

function applyDate() {
    var container = $(".Selected_Basis_Calendar_Box");
    container.fadeOut();
    container.removeClass("Selected_Basis_Calendar_Box")

    $(".Basis_Date").each(function () {
        $(this).attr("data-active", "0")
    })
}

function emptySelectedDate(element, calendar_type, type) {
    $(element).closest(".calendar-date-info").find(".date-info-departure").val('')
    $(element).closest(".calendar-date-info").find(".date-info-destination").val('')
    let activeBtn = $('.search-nav ul > .active-module').attr('data-id');

    var self = $(".en-calendar");
    if (calendar_type == 'fa') {
        self = $(".fa-calendar");
    }
    if (type == 'dep') {
        self.find(".day").each(function () {
            $(this).removeClass("selected_date")
            $(this).removeClass("days_available")
            $(this).removeClass("disable_day")
            if (!$(this).hasClass("empty_day") && !$(this).hasClass("expire_day")) {
                $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
            }


        })
        if (activeBtn == 'item-Flight') {
            let active_form = 'multi-flight-form';
            if ($('#' + activeBtn).find("#multi-flight-form").is(":hidden")) {
                active_form = 'flight-form';
            }
            $('#' + activeBtn).find(`#${active_form}`).find(".Basis_Date_Box").each(function () {
                $(this).find(".start_date").attr("data-active", "1")
                $(this).find(".end_date").attr("data-active", "0")

            })
        } else {
            $('#' + activeBtn).find(".Basis_Date_Box").each(function () {
                $(this).find(".start_date").attr("data-active", "1")
                $(this).find(".end_date").attr("data-active", "0")

            })
        }
        $('#' + activeBtn).find('.start_date').val('');
        $('#' + activeBtn).find('.start_date').closest(".date-container").find(".day-of-week").empty()
        $('#' + activeBtn).find('.end_date').val('');
        $('#' + activeBtn).find('.start_date').closest(".date-container").find(".day-of-week").empty()
    } else {
        self.find(".day").each(function () {
            $(this).removeClass("days_available")
        })
        let count = 0;
        self.find(".selected_date").each(function () {
            count++;
            if (count == 2) {
                $(this).removeClass("selected_date")
            }
        })

        if (activeBtn == 'item-Flight') {
            let active_form = 'multi-flight-form'
            if ($('#' + activeBtn).find("#multi-flight-form").is(":hidden")) {
                active_form = 'flight-form';
            }
            $('#' + activeBtn).find(`#${active_form}`).find(".Basis_Date_Box").each(function () {
                $(this).find(".start_date").attr("data-active", "0")
                $(this).find(".end_date").attr("data-active", "1")

            })
        } else {
            $('#' + activeBtn).find(".Basis_Date_Box").each(function () {
                $(this).find(".start_date").attr("data-active", "0")
                $(this).find(".end_date").attr("data-active", "1")

            })
        }
        $('#' + activeBtn).find('.end_date').val('');
        $('#' + activeBtn).find('.start_date').closest(".date-container").find(".day-of-week").empty()
    }

}
function changeCalendar(element, calendar_type) {
    $(".Basis_Date").each(function () {
        $(this).attr("data-lang", `${calendar_type}`)
    })
    let activeBtn = $('.search-nav ul > .active-module').attr('data-id');
    $('#' + activeBtn).find("form").each(function () {
        if (!$(this).hasClass("unvisible")) {
            if ($(this).attr("id") == 'multi-flight-form') {
                $(this).find('.start_date').each(function () {
                    if ($(this).attr("data-active") == 1) {
                        $(this).val('');
                        $(this).closest(".date-container").find(".day-of-week").empty()
                    }
                })

            }else if ($(this).attr("id") == 'flightHotelSearch'){
                $(this).find('.Basis_Date').each(function () {
                    if ($(this).attr("data-active") == 1) {
                        $(this).val('');
                        $(this).closest(".date-container").find(".day-of-week").empty()
                    }
                })
            }else {
                $(this).find('.start_date').val('');
                $(this).find('.start_date').closest(".date-container").find(".day-of-week").empty()
                $(this).find('.end_date').val('');
                $(this).find('.end_date').closest(".date-container").find(".day-of-week").empty()
            }


        }
    })

    var self = $(".en-calendar");
    if (calendar_type == 'fa') {
        self = $(".fa-calendar");
    }
    self.find(".day").each(function () {
        $(this).removeClass("selected_date")
        $(this).removeClass("days_available")
        $(this).removeClass("disable_day")
        if (!$(this).hasClass("empty_day") && !$(this).hasClass("expire_day")) {
            $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
        }
    })
    $('#' + activeBtn).find("form").each(function () {
        if (!$(this).hasClass("unvisible")) {
            if ($(this).attr("id") == 'multi-flight-form') {
                $(this).find('.start_date').each(function () {
                    if ($(this).attr("data-active") == 1) {
                        $(this).click()
                    }
                })

            }else if($(this).attr("id") == 'flightHotelSearch'){
                $(this).find('.Basis_Date').each(function () {
                    if ($(this).attr("data-active") == 1) {
                        $(this).click()
                    }
                })
            } else {
                $(this).find('.start_date').click()
            }

        }
    })

    $(".calendar-date-info").each(function () {
        $(this).find(".fa-times").attr("onclick", `emptySelectedDate(this,'${calendar_type}','${$(this).find(".fa-times").attr("data-type")}')`)
    })

}

$(document).mouseup(function (e) {
    var container = $(".Selected_Basis_Calendar_Box");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".Basis_Calendar_Box").each(function () {
            var calendar_type = $(this).attr("data-lang")
            var self = $(".en-calendar");
            if (calendar_type == 'fa') {
                self = $(".fa-calendar");
            }
            $(this).find(".day").each(function () {
                $(this).removeClass("selected_date")
                $(this).removeClass("days_available")
                $(this).removeClass("disable_day")
                if (!$(this).hasClass("empty_day") && !$(this).hasClass("expire_day")) {
                    $(this).attr("onclick", `Basis_Select_day(this,"${calendar_type}")`)
                }
            })
        })
        container.fadeOut();
        container.removeClass("Selected_Basis_Calendar_Box")
        $(".Basis_Date").each(function () {
            $(this).attr("data-active", "0")
        })
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
            if (!result || result.length === 0) {
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



