jQuery(document).ready(function () {
    "use strict";

    function e() {
        "relative" == $(".header-right").css("position") ? ($("body").addClass("hidden-left"), $(".headerwrapper, .mainwrapper").removeClass("collapsed")) : $("body").removeClass("hidden-left"), $(window).width() <= 360 ? 0 == $(".leftpanel .form-search").length && $(".form-search").insertAfter($(".profile-left")) : 0 == $(".header-right .form-search").length && $(".form-search").insertBefore($(".btn-group-notification"))
    }
    jQuery(".tooltips").tooltip({
        container: "body"
    }), jQuery(".popovers").popover(), jQuery(".panel-heading").hover(function () {
        jQuery(this).find(".panel-btns").fadeIn("fast")
    }, function () {
        jQuery(this).find(".panel-btns").fadeOut("fast")
    }), jQuery(".panel .panel-close").click(function () {
        return jQuery(this).closest(".panel").fadeOut(200), !1
    }), jQuery(".panel .panel-minimize").click(function () {
        var e = jQuery(this),
            a = e.closest(".panel");
        return jQuery(this).hasClass("maximize") ? (a.find(".panel-body, .panel-footer").slideDown(200), e.removeClass("maximize"), e.find("i").removeClass("fa-plus").addClass("fa-minus"), jQuery(this).attr("data-original-title", "Minimize Panel").tooltip()) : (a.find(".panel-body, .panel-footer").slideUp(200), e.addClass("maximize"), e.find("i").removeClass("fa-minus").addClass("fa-plus"), jQuery(this).attr("data-original-title", "Maximize Panel").tooltip()), !1
    }), jQuery(".leftpanel .nav .parent > a").click(function () {
        if (!jQuery(this).parents(".collapsed").length) {
            jQuery(".leftpanel .nav .parent-focus").each(function () {
                jQuery(this).find(".children").slideUp("fast"), jQuery(this).removeClass("parent-focus")
            });
            var e = jQuery(this).parent().find(".children");
            e.is(":visible") ? (e.slideUp("fast"), e.parent().removeClass("parent-focus")) : (e.slideDown("fast"), e.parent().hasClass("active") || e.parent().addClass("parent-focus"))
        }
        return !1
    }), jQuery(".menu-collapse").click(function () {
        return $("body").hasClass("hidden-left") ? $("body").hasClass("show-left") ? $("body").removeClass("show-left") : $("body").addClass("show-left") : $(".headerwrapper").hasClass("collapsed") ? $(".headerwrapper, .mainwrapper").removeClass("collapsed") : ($(".headerwrapper, .mainwrapper").addClass("collapsed"), $(".children").hide()), !1
    }), jQuery(".leftpanel .nav li").hover(function () {
        $(this).addClass("nav-hover")
    }, function () {
        $(this).removeClass("nav-hover")
    }), jQuery(window).resize(function () {
        e()
    }), e(),
        function () {
            "relative" == $(".logo").css("position") ? $(".headerwrapper, .mainwrapper").addClass("collapsed") : $(".headerwrapper, .mainwrapper").removeClass("collapsed")
        }()
});

function searchForEditAndDeleteButtons() {
    var e = jQuery(".div_rwpbe").html(),
        t = jQuery(".div_rwpbd").html();
    (null != e && "" != e && void 0 != e || null != t && "" != t && void 0 != t) && jQuery(".k-grid.k-widget a").each(function () {
        var r = jQuery(this),
            n = (r[0].innerText, r[0].innerHTML),
            a = r[0].className;
        "active" == e && n.indexOf("fa-edit") >= 0 && a.indexOf("btn btn-primary btn-xs") >= 0 && jQuery(r).remove(), "active" == t && n.indexOf("fa-trash-o") >= 0 && a.indexOf("btn btn-danger btn-xs") >= 0 && jQuery(r).remove()
    })
}

function isNumber(e) {
    e = e ? e : window.event;
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57))
}

function changePageSize() {
    var e = $("#showPages").val(),
        t = $("#grid").data("kendoGrid");
    t.dataSource.pageSize(parseInt(e)), t.dataSource.read(), t.refresh()
}

function destroyParsley() {
    $("#tempForm").parsley().reset()
}

function imgError(e) {
    return e.onerror = "", e.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", !0
}

function valueIsEmail(e) {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(e)
}

function stripQuotes(e) {
    return null == e || "" == e || void 0 == e ? "" : (e = e.replace('"', ""), e = e.replace('"', ""))
}

function convertDateTimeIntoString(e) {
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        r = e,
        n = new Date(r);
    return n = t[n.getMonth()] + " " + n.getDate() + ", " + n.getFullYear()
}

function hideDiv() {
    jQuery(".overlayDiv").css({
        display: "none"
    }), jQuery(".overlayCrossButton").css({
        display: "none"
    }), jQuery(".blackout").removeClass("showdiv"), jQuery(".blackout").addClass("donotshowdiv"), jQuery(".blackout").css("display", "none")
}

function getSerialNumber(e) {
    record = (e.page() - 1) * e.pageSize()
}

function getParameterByName(e) {
    var t = window.location.href;
    e = e.replace(/[\[\]]/g, "\\$&");
    var r = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
        n = r.exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
}

function startTime() {
    var e = (new Date, new Date),
        t = (e.getDate(), getMonthName(e.getMonth()), e.getFullYear(), getWeekdayName(e.getDay()), e.getHours()),
        r = e.getMinutes();
    e.getSeconds();
    r = checkTime(r);
    "PM", t >= 12 && (t -= 12)
}

function checkTime(e) {
    return e < 10 && (e = "0" + e), e
}

function getMonthName(e) {
    return 0 == e ? "January" : 1 == e ? "February" : 2 == e ? "March" : 3 == e ? "April" : 4 == e ? "May" : 5 == e ? "June" : 6 == e ? "July" : 7 == e ? "August" : 8 == e ? "September" : 9 == e ? "October" : 10 == e ? "November" : 11 == e ? "December" : void 0
}

function getWeekdayName(e) {
    return 0 == e ? "Sunday" : 1 == e ? "Monday" : 2 == e ? "Tuesday" : 3 == e ? "Wednesday" : 4 == e ? "Thursday" : 5 == e ? "Friday" : 6 == e ? "Saturday" : void 0
}

function printSelectedPortion(e) {
    var t = document.getElementById(e),
        r = window.open("about:blank", "Print", "left=5,top=5,width=1200,height=660");
    r.document.write(t.innerHTML), r.document.close(), r.focus(), r.print(), r.close()
}

function getParameterByName(e) {
    return decodeURIComponent((new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}

function controlIsEmpty(e) {
    return !e || "" == e || null == e || "select" == e || "--select--" == e
}

function controlContainsDate(e) {
    if (null == e || "" == e.trim) return !1;
    if (10 == e.length && "/" == e[2] && "/" == e[5]) {
        var t = e.split("/");
        if (parseInt(t[0]) > 0 && parseInt(t[0]) < 100 && parseInt(t[1]) > 0 && parseInt(t[1]) < 100 && parseInt(t[2]) > 999 && parseInt(t[2]) < 3e3) return !0
    }
    return !1
}

function controlContainsTime(e) {
    return !!e.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/)
}

function Time12HoursValidator(e) {
    return !!e.match(/^([1-9]{1}|[1-9]{1}[0-2]{1})([:]{1})([0-5][0-9]{1,2})[?i]([am|pm]{2})$/)
}

function formatTimeInAMPM(e) {
    var t = e.getHours(),
        r = e.getMinutes(),
        n = t >= 12 ? "pm" : "am";
    return t %= 12, t = t ? t : 12, r = r < 10 ? "0" + r : r, t + ":" + r + " " + n
}

function formatTimeStringInAMPM(e) {
    var t = e.split(":"),
        r = t[0],
        n = t[1],
        a = t[2];
    return a = r < 12 ? "AM" : "PM", r %= 12, r = r ? r : 12, r < 10 && (r = "0" + r), r + ":" + n + " " + a
}

function formatTimeStringInInDateObject(e) {
    var t = e.split(":"),
        r = t[0],
        n = t[1],
        a = (t[2], new Date);
    return a.setHours(r), a.setMinutes(n), a
}

function convertDateTimeIntoString(e) {
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        r = e,
        n = new Date(r);
    return n = t[n.getMonth()] + " " + n.getDate() + ", " + n.getFullYear()
}

function convertDateTimeIntoMMMYYYY(e) {
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        r = e,
        n = new Date(r);
    return n = t[n.getMonth()] + " " + n.getFullYear()
}

function convertDateTimeToDatePickerFormat(e) {
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        r = e,
        n = new Date(r);
    return n = n.getDate() + "-" + t[n.getMonth()] + "-" + n.getFullYear()
}

function convertDateTimeToDatePickerFormatDDMMYYYY(e) {
    var t = (new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"), e),
        r = new Date(t),
        n = r.getMonth() + 1;
    n < 10 && (n = "0" + n);
    var a = r.getDate();
    return a < 10 && (a = "0" + a), r = a + "/" + n + "/" + r.getFullYear()
}

function convertDateTimeToDatePickerShortFormat(e) {
    var t = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
        r = e,
        n = new Date(r);
    return n = n.getDate() + "-" + t[n.getMonth()] + "-" + n.getFullYear()
}

function convertDateTimeToDDMMM(e) {
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        r = e,
        n = new Date(r);
    return n = t[n.getMonth()] + " " + n.getDate()
}

function convertDateTimeToOnlyTime(e) {
    var t = new Date(e),
        r = t.getHours(),
        n = t.getMinutes();
    n = checkTime(n);
    var a = "AM";
    return r >= 12 && (a = "PM", r -= 12), r + ":" + n + " " + a
}

function convertIntoSqlYYYYMMDD(e) {
    for (var e = e.split("/"), t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r = 0; r < t.length; r++) e[1] == t[r] && (e[1] = t.indexOf(t[r]) + 1);
    var n = parseInt(e[1]);
    return n < 10 && (e[1] = "0" + n), e[2] + "-" + e[1] + "-" + e[0]
}

function convertIntoYYYYMMDD(e) {
    for (var e = e.split("-"), t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r = 0; r < t.length; r++) e[1] == t[r] && (e[1] = t.indexOf(t[r]) + 1);
    var n = parseInt(e[1]);
    return n < 10 && (e[1] = "0" + n), e[2] + "-" + e[1] + "-" + e[0]
}

function convertDDMMYYYYIntoYYYYMMDD(e) {
    var e = e.split("/");
    return e[2] + "/" + e[1] + "/" + e[0]
}

function convertIntoDDMMYYYY(e) {
    for (var e = e.split("-"), t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r = 0; r < t.length; r++) e[1] == t[r] && (e[1] = t.indexOf(t[r]) + 1);
    return e[1] < 10 && (e[1] = "0" + e[1]), e[0] < 10 && (e[0] = "0" + e[0]), e[0] + "/" + e[1] + "/" + e[2]
}

function convertDateIntoDDMMYYYY(e) {
    if (e.indexOf("T") < 0 && e.indexOf("-") < 0) return e;
    var e = e.split("T");
    return e = e[0], e = e.split("-"), e[2] + "/" + e[1] + "/" + e[0]
}

function convertDateIntoMMDDYYYY(e) {
    if (e.indexOf("T") < 0 && e.indexOf("-") < 0) return e;
    var e = e.split("T");
    return e = e[0], e = e.split("-"), e[1] + "/" + e[2] + "/" + e[0]
}

function dateIsValid(e) {
    return null != e && "" != e && "0001-01-01T00:00:00" != e
}

function formatAMPMtoTimeString(e) {
    var t = e.split(" "),
        r = t[0],
        n = t[1],
        a = r.split(":"),
        u = Number(a[0]),
        o = a[1];
    return "PM" != n && "pm" != n || 12 != u && (u = Number(u) + 12), "AM" != n && "am" != n || 12 == Number(u) && (u = "0"), Number(u) < 10 && (u = "0" + u), u + ":" + o + ":00"
}

function formatAMPMtoDateObject(e) {
    var t = e.split(" "),
        r = t[0],
        n = t[1],
        a = r.split(":"),
        u = Number(a[0]),
        o = a[1];
    "PM" != n && "pm" != n || 12 != u && (u = Number(u) + 12), "AM" != n && "am" != n || 12 == Number(u) && (u = "0");
    var i = new Date;
    return i.setHours(u), i.setMinutes(o), i
}

function firstDateIsSmaller_paramString(e, t) {
    var r = returnDateFromDDMMYYYY(e),
        n = returnDateFromDDMMYYYY(t);
    return null != r && null != n && r < n
}

function firstDateIsBetweenTwoDates_paramString(e, t, r) {
    var n = returnDateFromDDMMYYYY(e),
        a = returnDateFromDDMMYYYY(t),
        u = returnDateFromDDMMYYYY(r);
    return null != n && null != a && null != u && (n >= a && n <= u)
}

function firstDateIsEqual_paramString(e, t) {
    var r = returnDateFromDDMMYYYY(e),
        n = returnDateFromDDMMYYYY(t);
    return null != r && null != n && r.getTime() == n.getTime()
}

function firstDateIsSmaller_paramStringAndTime(e, t, r, n) {
    if (null == e || void 0 == e || null == t || void 0 == t || null == r || void 0 == r || null == n || void 0 == n) return !1;
    var a = returnDateFromDDMMYYYY(e),
        u = returnDateFromDDMMYYYY(t);
    return a.setHours(r.getHours()), u.setHours(n.getHours()), a.setMinutes(r.getMinutes()), u.setMinutes(n.getMinutes()), null != a && null != u && a < u
}

function firstDateIsSmaller_paramStringAndTimeString(e, t, r, n) {
    r = formatAMPMtoDateObject(r), n = formatAMPMtoDateObject(n);
    var a = returnDateFromDDMMYYYY(e),
        u = returnDateFromDDMMYYYY(t);
    return a.setHours(r.getHours()), u.setHours(n.getHours()), a.setMinutes(r.getMinutes()), u.setMinutes(n.getMinutes()), null != a && null != u && a < u
}

function firstDateIsSmaller_paramDateAndTimeString(e, t, r, n) {
    r = formatAMPMtoDateObject(r), n = formatAMPMtoDateObject(n);
    var a = e,
        u = t;
    return a.setHours(r.getHours()), u.setHours(n.getHours()), a.setMinutes(r.getMinutes()), u.setMinutes(n.getMinutes()), null != a && null != u && a < u
}

function firstDateIsSmallerEqual_paramString(e, t) {
    var r = returnDateFromDDMMYYYY(e),
        n = returnDateFromDDMMYYYY(t);
    return null != r && null != n && r <= n
}

function returnDateFromDDMMYYYY(e) {
    return e = e.split("/"), new Date(e[2], parseInt(e[1]) - 1, e[0])
}

function IsNumeric(e) {
    var t = new Array;
    t.push(8);
    var r = e.which ? e.which : e.keyCode;
    return r >= 48 && r <= 57 || t.indexOf(r) != -1
}

function IsDecimal(e) {
    var t = new Array;
    t.push(8);
    var r = e.which ? e.which : e.keyCode;
    return r >= 48 && r <= 57 || 46 == r || t.indexOf(r) != -1
}

function combineDateObjectWithTimeString(e, t) {
    t = formatAMPMtoDateObject(t);
    var r = new Date(e);
    return r.setHours(t.getHours()), r.setMinutes(t.getMinutes()), r
}

function getCurrentDateDDMMYYYY() {
    var e = new Date,
        t = e.getDate(),
        r = e.getMonth() + 1,
        n = e.getFullYear();
    t < 10 && (t = "0" + t), r < 10 && (r = "0" + r);
    var e = t + "/" + r + "/" + n;
    return e
}

function dateDifferenceCount(e, t) {
    var r = returnDateFromDDMMYYYY(e),
        n = returnDateFromDDMMYYYY(t),
        a = Math.abs(n.getTime() - r.getTime());
    return Math.ceil(a / 864e5)
}

function dropdownContainsProperValue(e) {
    return "Please Select" != e && "Please select" != e && 0 != e && "0" != e && null != e && "" != e
}

function isValidDate(e) {
    if (null != e && void 0 != e && "" != e) {
        var t = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return t.test(e), !!t.test(e)
    }
    return !1
}

function convertDDMMYYYYtoMMDDYYYY(e) {
    if ("" == e || null == e || void 0 == e) return "";
    var t = e,
        r = t.split("/");
    return r[1] + "/" + r[0] + "/" + r[2]
}

function numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function toTitleCase(e) {
    return e.replace(/\w\S*/g, function (e) {
        return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
    })
}

function ConvertToWords(e) {
    var t = ["", "thousand", "million", "billion", "trillion"],
        r = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        n = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        a = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    if (e = e.toString(), (e = e.replace(/[\, ]/g, "")) != parseFloat(e)) return "not a number";
    var u = e.indexOf(".");
    if (u == -1 && (u = e.length), u > 15) return "too big";
    for (var o = e.split(""), i = "", l = 0, s = 0; s < u; s++)(u - s) % 3 == 2 ? "1" == o[s] ? (i += n[Number(o[s + 1])] + " ", s++ , l = 1) : 0 != o[s] && (i += a[o[s] - 2] + " ", l = 1) : 0 != o[s] && (i += r[o[s]] + " ", (u - s) % 3 == 0 && (i += "hundred "), l = 1), (u - s) % 3 == 1 && (l && (i += t[(u - s - 1) / 3] + " "), l = 0);
    return i.replace(/\s+/g, " ")
}

function jsonToQueryString(e, t) {
    return e + "?" + Object.keys(t).map(function (e) {
        return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
    }).join("&")
}

function convertRoutineDayToShortString(e) {
    var t = "";
    if (e.indexOf(",") > -1)
        for (var r = e.split(","), n = 0; n < r.length; n++) "Sunday" == r[n].trim() ? t += "S" : "Monday" == r[n].trim() ? t += "M" : "Tuesday" == r[n].trim() ? t += "T" : "Wednesday" == r[n].trim() ? t += "W" : "Thursday" == r[n].trim() ? t += "R" : "Friday" == r[n].trim() ? t += "F" : "Saturday" == r[n].trim() && (t += "A");
    else "Sunday" == e ? t += "S" : "Monday" == e ? t += "M" : "Tuesday" == e ? t += "T" : "Wednesday" == e ? t += "W" : "Thursday" == e ? t += "R" : "Friday" == e ? t += "F" : "Saturday" == e && (t += "A");
    return t
}
var bindGridForExcel = function (e) {
    jQuery("body").on("click", ".k-header.k-grid-toolbar .k-grid-excel", function (t) {
        return t.preventDefault(), $("#" + e).data("kendoGrid").saveAsExcel(), !1
    })
};
jQuery(document).ready(function () {
    startTime(), jQuery("body").on("keypress", "input, select", function (e) {
        var t, r, n = jQuery(this),
            a = n.parents("form:eq(0)");
        if (13 == e.keyCode) {
            var u = n.attr("id");
            if (null != u && "" != u && void 0 != u) {
                if (u.indexOf("globalsearch") >= 0) return !1;
                if (u.indexOf("globalSearch") >= 0) return !1
            }
            return t = a.find("input,a,select,button,textarea").filter(":visible"), r = t.eq(t.index(this) + 1), r.length ? r.focus() : a.submit(), !1
        }
    })
});