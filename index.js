//javascript script


//declaring variables to calculate result
let d, y, m;
let date = new Date();

//function to reset error messages
function reset() {

    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.classList.remove("error-input");
    }
    document.querySelector("input:active")

    let labels = document.getElementsByClassName("lbl");
    for (let label of labels)
        label.classList.remove("error-lbl");

    let error_messages = document.querySelectorAll(".error-message");
    for (let error_message of error_messages)
        error_message.innerHTML = "";
}


//function to set errors
function seterr(id, message) {

    document.getElementById(id).classList.add("error-input");
    document.querySelector(".lbl[for = '" + id + "'").classList.add("error-lbl");

    id = "error_of_" + id;
    document.getElementById(id).innerHTML = message;
    return;
}

//function to validate inputs
function validate() {

    let returnval = true;

    let month = document.forms["myform"]["month"].value;
    let day = document.forms["myform"]["day"].value;
    let year = document.forms["myform"]["year"].value;

    if (year == date.getFullYear()) {
        if (month > date.getMonth() + 1) {
            seterr("month", "Date cannot be in future");
            returnval = false;
        }
        else if (month == date.getMonth() + 1) {
            if (day > date.getDate()) {
                seterr("day", "date cannot be in the future");
                returnval = false;
            }
        }
    }


    if (month === "") {
        seterr("month", "Month cannot be empty!");
        returnval = false;
    }
    else if (month < 1 || month > 12) {
        seterr("month", "invalid value of month!");
        returnval = false;
    }

    if (year === "") {
        seterr("year", "year cannot be empty!");
        returnval = false;
    }
    else if (year > date.getFullYear()) {
        seterr("year", "date cannot be in the future");
        returnval = false;
    }

    if (day === "") {
        seterr("day", "day cannot be empty!");
        returnval = false;
    }
    else if (day < 1 || day > 31) {
        seterr("day", "invalid day entered");
        returnval = false;
    }



    if (returnval == true) {
        d = day;
        y = year;
        m = month;
    }

    return returnval;
}

//function to get results
function getresults() {
    let mnth = date.getMonth() + 1;
    let dy = date.getDate();
    let yr = date.getFullYear();

    let totaldays = (yr - y) * 365 + (mnth - m) * 30 + (dy - d);
    let resultyears = Math.floor(totaldays / 365);
    let resultmonths = Math.floor((totaldays - 365 * resultyears) / 30);
    let resultdays = ((totaldays - 30 * resultmonths - 365 * resultyears));

    document.getElementById("no_of_days").innerHTML = resultdays;
    document.getElementById("no_of_years").innerHTML = resultyears;
    document.getElementById("no_of_months").innerHTML = resultmonths;


    document.getElementById("day").value = d;
    document.getElementById("month").value = m;
    document.getElementById("year").value = y;

    return;
}


//function that is called on submit
function onsub() {
    reset();

    if (validate() == true) {
        getresults();
    }

    return false;
}
