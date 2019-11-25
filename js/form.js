function validate_name(Id) {
    var content = document.getElementById(Id).value;
    var pattern = new RegExp("^[a-z0-9_-]{8,15}$");
    return pattern.test(content);
}

function validate_email(Id) {
    var content = document.getElementById(Id).value;
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(content);
}

function validate_password(Id) {
    var content = document.getElementById(Id).value;
    var pattern = new RegExp("^.{8,}");
    return pattern.test(content);
}

function validate_gender(class_name) {
    var elements = document.getElementsByClassName(class_name);
    var elements_count = elements.length;
    for (var i = 0; i < elements_count; i++) {
        if (elements[i].checked) {
            return true;
        }
    }
    return false;
}

function validate_sports(class_name) {
    var elements = document.getElementsByClassName(class_name);
    var elements_count = elements.length;
    var count = 0;
    for (var i = 0; i < elements_count; i++) {
        count += elements[i].checked;
        if (count > 1) {
            return true;
        }
    }
    return false;
}

function validate_country(Id) {
    return document.getElementById(Id).value > 0;
}

function submit_action(event) {
    event.preventDefault();
    var message = "";

    if (!validate_name("element_1")) {
        message += "<li>Name is required.</li>\n";
    }

    if (!validate_email("element_2")) {
        message += "<li>Email is not valid.</li>\n";
    }

    if (!validate_password("element_3")) {
        message += "<li>Password must be 8 chars at least.</li>\n";
    }

    if (!validate_gender("element radio")) {
        message += "<li>Please select your gender.</li>\n";
    }

    if (!validate_sports("element checkbox")) {
        message += "<li>Please select at least two sports.</li>\n";
    }

    if (!validate_country("element_6")) {
        message += "<li>Please select your country.</li>";
    }
    document.getElementById("error-messages").innerHTML = message;
    if (message) {
        document.getElementsByClassName("errors")[0].style.display = '';
    } else {
        document.getElementsByClassName("errors")[0].style.display = 'none';
    }
}

document.getElementById("saveForm").addEventListener("click", submit_action);