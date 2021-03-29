//function stopRKey(evt) {
//    var evt = (evt) ? evt : ((event) ? event : null);
//    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
//    //if ((evt.keyCode == 13) && (node.type == "text")) { return false; }

//    if (evt.keyCode == 13) evt.keyCode = 9;
//}

//document.onkeypress = stopRKey;

function searchForEditAndDeleteButtons() {

    var be = jQuery(".div_rwpbe").html();
    var bd = jQuery(".div_rwpbd").html();

    if ((be == null || be == "" || be == undefined) && (bd == null || bd == "" || bd == undefined)) {
        return;
    }

    jQuery(".k-grid.k-widget a").each(function () {
        //do something with the element here.

        var elem = jQuery(this);

        var innerText = elem[0].innerText;
        var innerHTML = elem[0].innerHTML;
        var className = elem[0].className;

        if (be == "active" && innerHTML.indexOf("fa-edit") >= 0 && className.indexOf("btn btn-primary btn-xs") >= 0) {
            jQuery(elem).remove();
        }

        if (bd == "active" && innerHTML.indexOf("fa-trash-o") >= 0 && className.indexOf("btn btn-danger btn-xs") >= 0) {
            jQuery(elem).remove();
        }

    });

}



function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function changePageSize() {
    var x = $("#showPages").val();
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.pageSize(parseInt(x));
    grid.dataSource.read();
    grid.refresh();
}

function destroyParsley() {
    var validator = $("#tempForm").parsley();
    validator.reset();
}

function imgError(image) {
    image.onerror = "";
    image.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    return true;
}


function valueIsEmail(value) {
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(value);
}


function stripQuotes(data) {

    if (data == null || data == "" || data == undefined) return "";

    data = data.replace("\"", "");
    data = data.replace("\"", "");

    return data;
}

function convertDateTimeIntoString(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December");


    var d = date;

    var dt = new Date(d);

    dt = m_names[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    return dt;
}


function hideDiv() {

    jQuery(".overlayDiv").css({ "display": "none" });

    jQuery(".overlayCrossButton").css({ "display": "none" });

    jQuery(".blackout").removeClass("showdiv");
    jQuery(".blackout").addClass("donotshowdiv");
    jQuery(".blackout").css("display", "none");
}

/* for kendo grid serial number display */
function getSerialNumber(dataSource) {
    record = (dataSource.page() - 1) * dataSource.pageSize();
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function startTime() {


    var today = new Date();

    var d = new Date();

    var day = d.getDate();
    var month = getMonthName(d.getMonth());
    var year = d.getFullYear();

    var weekday = getWeekdayName(d.getDay());

    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    m = checkTime(m);

    var suffix = "AM";
    if (h >= 12) {
        suffix = "PM";
        h = h - 12;
    }

    //var x = month + " " + day + ", " + year + ", " + + h+":"+m + " " + suffix;
    var x = weekday + ", " + month + " " + day + ", " + h + ":" + m + ":" + s + " " + suffix;

    //var h=today.getHours();
    //var m=today.getMinutes();
    //m = checkTime(m);
    //document.getElementById('datewidgetcontent').innerHTML = x;
    //var t = setTimeout(function () { startTime() }, 100);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function getMonthName(month) {
    if (month == 0) return "January";
    else if (month == 1) return "February";
    else if (month == 2) return "March";
    else if (month == 3) return "April";
    else if (month == 4) return "May";
    else if (month == 5) return "June";
    else if (month == 6) return "July";
    else if (month == 7) return "August";
    else if (month == 8) return "September";
    else if (month == 9) return "October";
    else if (month == 10) return "November";
    else if (month == 11) return "December";
}

function getWeekdayName(day) {
    if (day == 0) return "Sunday";
    else if (day == 1) return "Monday";
    else if (day == 2) return "Tuesday";
    else if (day == 3) return "Wednesday";
    else if (day == 4) return "Thursday";
    else if (day == 5) return "Friday";
    else if (day == 6) return "Saturday";
}

function getAllWeekdays() {
    return [{ day: 0, name: "Sunday" }, { day: 1, name: "Monday" }, { day: 2, name: "Tuesday" },
        { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" },
        { day: 6, name: "Saturday" }];
}


function printSelectedPortion(elem) {

    var printContent = document.getElementById(elem);
    var windowUrl = 'about:blank';
    var windowName = 'Print';
    var printWindow = window.open(windowUrl, windowName, 'left=5,top=5,width=1200,height=660');

    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

}

//=====================
function getParameterByName(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
//=======================



function controlIsEmpty(value) {
    if (!value || value == "" || value == null || value == 'select' || value == '--select--') {
        return true;
    }
    else {
        return false;
    }
}

function controlContainsDate(value) {

    //var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;

    /*
    var dateReg = /^\d{2}([.\/-])\d{2}\1\d{4}$/;
    
    if (value.match(dateReg)) return true;

    else return false;
    */

    if (value == null || value.trim == "") return false;

    if (value.length == 10 && value[2] == '/' && value[5] == '/') {

        var values = value.split('/');

        if (parseInt(values[0]) > 0 && parseInt(values[0]) < 100) {

            if (parseInt(values[1]) > 0 && parseInt(values[1]) < 100) {

                if (parseInt(values[2]) > 999 && parseInt(values[2]) < 3000) {
                    return true;
                }

            }

        }

    }

    return false;


}



// HH:MM AM 08:00 AM
// or HH:MMAM 08:00AM
function controlContainsTime(value) {

    var dateReg = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;

    if (value.match(dateReg)) return true;

    else return false;
}


function Time12HoursValidator(time) {

    var re = /^([1-9]{1}|[1-9]{1}[0-2]{1})([:]{1})([0-5][0-9]{1,2})[?i]([am|pm]{2})$/;

    if (time.match(re))
        return true;
    else
        return false;

}



//copy pasted from http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
//by shoeb
function formatTimeInAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatTimeStringInAMPM2(date) {

    var dateParts = date.split(':');

    var hours = dateParts[0];
    var minAmPmParts = dateParts[1];
    var minAmPm = minAmPmParts.split(' ');
    var minutes = minAmPm[0];
    var ampm = minAmPm[1];

    //ampm = hours < 12 ? 'AM' : 'PM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    if (hours < 10) hours = '0' + hours;

    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatTimeStringInAMPM(date) {

    var dateParts = date.split(':');

    var hours = dateParts[0];
    var minutes = dateParts[1];
    var ampm = dateParts[2];

    ampm = hours < 12 ? 'AM' : 'PM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    if (hours < 10) hours = '0' + hours;

    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatTimeStringInAMPMFromTime(timeString) {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + " " + ampm;
    return timeString;
}

function formatTimeStringInInDateObject(date) {

    var dateParts = date.split(':');

    var hours = dateParts[0];
    var minutes = dateParts[1];
    var ampm = dateParts[2];

    var g = new Date();

    g.setHours(hours);
    g.setMinutes(minutes);

    return g;
}


function convertDateTimeIntoString(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December");


    var d = date;

    var dt = new Date(d);

    dt = m_names[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    return dt;
}


function convertDateTimeIntoMMMYYYY(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December");


    var d = date;

    var dt = new Date(d);

    dt = m_names[dt.getMonth()] + " " + dt.getFullYear();

    return dt;
}


function convertDateTimeToDatePickerFormat(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December");


    var d = date;

    var dt = new Date(d);

    dt = dt.getDate() + "-" + m_names[dt.getMonth()] + "-" + dt.getFullYear();

    return dt;
}

function convertDateTimeToDatePickerFormatDDMMYYYY(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December");

    
    var d = date;

    var dt = new Date(d);

    var x = dt.getMonth() + 1;

    if (x < 10) x = "0" + x;

    var z = dt.getDate();

    if (z < 10) z = "0" + z;

    dt = z + "/" + x + "/" + dt.getFullYear();

    return dt;
}


function convertDateTimeToDatePickerShortFormat(date) {
    ////console.log("FUNCTION CALLED");
    //Example: 20-Jan-1995

    var m_names = new Array("Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec");


    var d = date;

    var dt = new Date(d);

    dt = dt.getDate() + "-" + m_names[dt.getMonth()] + "-" + dt.getFullYear();

    return dt;
}

function convertDateTimeToDDMMM(date) {
    ////console.log("FUNCTION CALLED");

    var m_names = new Array("January", "February", "March",
                    "April", "May", "June", "July", "August", "September",
                    "October", "November", "December");


    var d = date;

    var dt = new Date(d);

    dt = m_names[dt.getMonth()] + " " + dt.getDate();

    return dt;
}


function convertDateTimeToOnlyTime(date) {

    var d = new Date(date);

    var h = d.getHours();
    var m = d.getMinutes();
    m = checkTime(m);

    var suffix = "AM";
    if (h >= 12) {
        suffix = "PM";
        h = h - 12;
    }

    return h + ":" + m + " " + suffix;

}

function convertIntoSqlYYYYMMDD(date) {

    var date = date.split("/");
    var months = ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
    for (var j = 0; j < months.length; j++) {
        if (date[1] == months[j]) {
            date[1] = months.indexOf(months[j]) + 1;
        }
    }

    var tmpx = parseInt(date[1]);
    if (tmpx < 10) {
        date[1] = '0' + tmpx;
    }

    var formattedDate = date[2] + "-" + date[1] + "-" + date[0];

    return formattedDate;

}

function convertIntoYYYYMMDD(date) {

    var date = date.split("-");
    var months = ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
    for (var j = 0; j < months.length; j++) {
        if (date[1] == months[j]) {
            date[1] = months.indexOf(months[j]) + 1;
        }
    }

    var tmpx = parseInt(date[1]);
    if (tmpx < 10) {
        date[1] = '0' + tmpx;
    }

    var formattedDate = date[2] + "-" + date[1] + "-" + date[0];

    return formattedDate;

}


function convertDDMMYYYYIntoYYYYMMDD(date) {

    var date = date.split("/");

    var formattedDate = date[2] + "/" + date[1] + "/" + date[0];

    return formattedDate;

}


function convertIntoDDMMYYYY(date) {


    var date = date.split("-");
    var months = ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
    for (var j = 0; j < months.length; j++) {
        if (date[1] == months[j]) {
            date[1] = months.indexOf(months[j]) + 1;
        }
    }
    if (date[1] < 10) {
        date[1] = '0' + date[1];
    }
    if (date[0] < 10) {
        date[0] = '0' + date[0];
    }
    var formattedDate = date[0] + "/" + date[1] + "/" + date[2];

    return formattedDate;

}


function convertDateIntoDDMMYYYY(date) {


    if (date.indexOf('T') < 0 && date.indexOf('-') < 0) return date;

    var date = date.split('T');


    date = date[0];

    date = date.split("-");

    var formattedDate = date[2] + "/" + date[1] + "/" + date[0];


    return formattedDate;


}


//created by suja 21/04/2015
function convertDateIntoMMDDYYYY(date) {


    if (date.indexOf('T') < 0 && date.indexOf('-') < 0) return date;

    var date = date.split('T');


    date = date[0];

    date = date.split("-");

    var formattedDate = date[1] + "/" + date[2] + "/" + date[0];


    return formattedDate;


}



function dateIsValid(date) {

    if (date == null || date == "" || date == "0001-01-01T00:00:00")
        return false;
    else return true;

}



//19-02-2015 by suja
function formatAMPMtoTimeString(date) {


    var dateparts = date.split(' ');
    var part1 = dateparts[0];
    var part2 = dateparts[1];

    var t1 = part1.split(':');
    var hr = Number(t1[0]);
    var min = t1[1];

    if (part2 == 'PM' || part2 == 'pm') {
        if (hr != 12)//updated 28-07-2015 by suja
            hr = Number(hr) + 12;
    }

    if (part2 == 'AM' || part2 == 'am') {
        if (Number(hr) == 12) hr = '0';        //updated 28-07-2015 by suja
    }

    if (Number(hr) < 10) hr = '0' + hr;


    var strTime = hr + ':' + min + ':' + '00';

    return strTime;
}


function formatAMPMtoDateObject(date) {


    var dateparts = date.split(' ');
    var part1 = dateparts[0];
    var part2 = dateparts[1];

    var t1 = part1.split(':');
    var hr = Number(t1[0]);
    var min = t1[1];

    if (part2 == 'PM' || part2 == 'pm') {
        if (hr != 12)//updated 28-07-2015 by suja
            hr = Number(hr) + 12;
    }

    if (part2 == 'AM' || part2 == 'am') {
        if (Number(hr) == 12) hr = '0';        //updated 28-07-2015 by suja
    }



    var s = new Date();

    s.setHours(hr);
    s.setMinutes(min);

    return s;
}


//pass a string object and the function will convert it to date and return true if first date is smaller

function firstDateIsSmaller_paramString(date1, date2) {



    //console.log("start");

    //console.log(date1);

    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);
    if (d1 == null || d2 == null) return false;

    if (d1 < d2) return true;

    else return false;

}


function firstDateIsBetweenTwoDates_paramString(date1, date2, date3) {

    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);
    var d3 = returnDateFromDDMMYYYY(date3);

    if (d1 == null || d2 == null || d3 == null) return false;

    if (d1 >= d2 && d1 <= d3) return true;

    else return false;

}
/** **************************** **/

function firstDateIsEqual_paramString(date1, date2) {



    //console.log("start");

    //console.log(date1);

    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);
    if (d1 == null || d2 == null) return false;

    if (d1.getTime() == d2.getTime()) return true;

    else return false;

}

/** **************************** **/


function firstDateIsSmaller_paramStringAndTime(date1, date2, time1, time2) {

    if (date1 == null || date1 == undefined || date2 == null || date2 == undefined || time1 == null || time1 == undefined || time2 == null || time2 == undefined) return false;

    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);


    d1.setHours(time1.getHours());
    d2.setHours(time2.getHours());

    ///////////////

    d1.setMinutes(time1.getMinutes());
    d2.setMinutes(time2.getMinutes());

    //////////////


    if (d1 == null || d2 == null) return false;

    if (d1 < d2) return true;

    else return false;

}

function firstDateIsSmaller_paramStringAndTimeString(date1, date2, time1, time2) {


    time1 = formatAMPMtoDateObject(time1);
    time2 = formatAMPMtoDateObject(time2);


    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);


    d1.setHours(time1.getHours());
    d2.setHours(time2.getHours());

    ///////////////

    d1.setMinutes(time1.getMinutes());
    d2.setMinutes(time2.getMinutes());

    //////////////


    if (d1 == null || d2 == null) return false;

    if (d1 < d2) return true;

    else return false;

}

function firstDateIsSmaller_paramDateAndTimeString(date1, date2, time1, time2) {


    time1 = formatAMPMtoDateObject(time1);
    time2 = formatAMPMtoDateObject(time2);


    var d1 = (date1);
    var d2 = (date2);


    d1.setHours(time1.getHours());
    d2.setHours(time2.getHours());

    ///////////////

    d1.setMinutes(time1.getMinutes());
    d2.setMinutes(time2.getMinutes());

    //////////////


    if (d1 == null || d2 == null) return false;

    if (d1 < d2) return true;

    else return false;

}




//pass a string object and the function will convert it to date and return true if first date is smaller
function firstDateIsSmallerEqual_paramString(date1, date2) {

    var d1 = returnDateFromDDMMYYYY(date1);

    var d2 = returnDateFromDDMMYYYY(date2);

    if (d1 == null || d2 == null) return false;

    if (d1 <= d2) return true;
    else return false;

}

/// // return mm/dd/yyyy from dd/mm/yyyy
/////////////////////////////////////////
// this function is specially useful when submitting date picker fields to Web API
// because the date picker fields are in dd/mm/yyyy but web api accepts mm/dd/yyyy
function returnDateFromDDMMYYYY(string) {

    string = string.split("/");

    var d = new Date(string[2], parseInt(string[1]) - 1, string[0]);

    return d;

}

function IsNumeric(e) {

    var specialKeys = new Array();
    specialKeys.push(8); //Backspace


    var keyCode = e.which ? e.which : e.keyCode
    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
    //document.getElementById(str).style.display = ret ? "none" : "inline";
    return ret;
}


function IsDecimal(e) {

    var specialKeys = new Array();
    specialKeys.push(8); //Backspace

    var keyCode = e.which ? e.which : e.keyCode
    var ret = ((keyCode >= 48 && keyCode <= 57) || keyCode == 46 || specialKeys.indexOf(keyCode) != -1);

    return ret;
}


function combineDateObjectWithTimeString(date1, time1) {


    time1 = formatAMPMtoDateObject(time1);


    var d1 = new Date(date1);


    d1.setHours(time1.getHours());
    d1.setMinutes(time1.getMinutes());

    return d1;

}

var bindGridForExcel = function (gridId) {

    //return;
    //alert(2);

    jQuery('body').on('click', ".k-header.k-grid-toolbar .k-grid-excel", function (e) {
        //alert(4);fo
        e.preventDefault();
        var grid = $("#" + gridId).data("kendoGrid");
        grid.saveAsExcel();

        return false;
    });

}


jQuery(document).ready(function () {
    startTime();

    jQuery('body').on('keypress', 'input, select', function (e) {
        var self = jQuery(this)
          , form = self.parents('form:eq(0)')
          , focusable
          , next
        ;

        if (e.keyCode == 13) {

            var idOfElement = self.attr('id');

            if (idOfElement != null && idOfElement != "" && idOfElement != undefined) {
                if (idOfElement.indexOf("globalsearch") >= 0) return false;
                if (idOfElement.indexOf("globalSearch") >= 0) return false;
            }

            focusable = form.find('input,a,select,button,textarea').filter(':visible');
            next = focusable.eq(focusable.index(this) + 1);
            if (next.length) {
                next.focus();
            } else {
                form.submit();
            }
            return false;
        }
    });
});




//19-0/-205 by suja

function getCurrentDateDDMMYYYY() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;

    return today;

}


function dateDifferenceCount(date1, date2) {

    var d1 = returnDateFromDDMMYYYY(date1);
    var d2 = returnDateFromDDMMYYYY(date2);
    var timeDiff = Math.abs(d2.getTime() - d1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
}

function dropdownContainsProperValue(value) {
    if (value == "Please Select" || value == "Please select" || value == 0 || value == "0" || value == null || value == "") {
        return false;
    }
    else {
        return true;
    }
}



function isValidDate(value) {

    if (value != null && value != undefined && value != "") {
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;


        re.test(value);


        if (re.test(value))
            return true;
        else
            return false;
    }
    else {
        return false;
    }
}

function convertDDMMYYYYtoMMDDYYYY(value) {

    if (value == "" || value == null || value == undefined) return "";

    var date = value;

    var datearray = date.split("/");

    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];

    return newdate;

}

// 27/10/2016 by saiful

function numberWithCommas(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function ConvertToWords(s) {

    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];


    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            }
            else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        }
        else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }


        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    //if (x != s.length) {
    //    var y = s.length;
    //    str += 'point ';
    //    for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    //}
    return str.replace(/\s+/g, ' ');
}

function jsonToQueryString(url, json) {
    return url + '?' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

// 18 feb 2017 suja
function convertRoutineDayToShortString(dayString) {

    var routineDay = "";

    if (dayString.indexOf(',') > -1) {


        var arr = dayString.split(',');

        for (var i = 0; i < arr.length; i++) {

            if (arr[i].trim() == 'Sunday')
                routineDay += 'S';
            else if (arr[i].trim() == 'Monday')
                routineDay += 'M';
            else if (arr[i].trim() == 'Tuesday')
                routineDay += 'T';
            else if (arr[i].trim() == 'Wednesday')
                routineDay += 'W';
            else if (arr[i].trim() == 'Thursday')
                routineDay += 'R';
            else if (arr[i].trim() == 'Friday')
                routineDay += 'F';
            else if (arr[i].trim() == 'Saturday')
                routineDay += 'A';

        }
    }
    else {
        if (dayString == 'Sunday')
            routineDay += 'S';
        else if (dayString == 'Monday')
            routineDay += 'M';
        else if (dayString == 'Tuesday')
            routineDay += 'T';
        else if (dayString == 'Wednesday')
            routineDay += 'W';
        else if (dayString == 'Thursday')
            routineDay += 'R';
        else if (dayString == 'Friday')
            routineDay += 'F';
        else if (dayString == 'Saturday')
            routineDay += 'A';
    }

    return routineDay;

}


