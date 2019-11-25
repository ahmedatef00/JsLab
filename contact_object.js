function validate_email(email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

function validate_phone(phone) {
    var password = String(phone);
    var pattern = new RegExp("^\\d{11}");
    return pattern.test(password);
}

function convert_name(name) {
    var split_name = name.split(" ");
    var size = split_name.length;
    return size > 1 ? split_name[0][0].toUpperCase() + "." + jsUcfirst(split_name[size - 1]) : jsUcfirst(name);
}

function validate_name(name) {
    var pattern = new RegExp("^[a-z A-Z .'-]+$");
    return pattern.test(name);
}

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

id = 0;
var Contact = function(name, email, phone) {
    id++;
    this.properties = {
        Id: id
    };
    this.setProperty("Name", name);
    this.setProperty("Email", email);
    this.setProperty("Phone", phone);
};

Contact.prototype.setProperty = function(key, value) {
    var isValid = false;
    switch (key) {
        case "Name":
            isValid = validate_name(value);
            value = convert_name(value);
            break;
        case "Email":
            isValid = validate_email(value);
            break;
        case "Phone":
            isValid = validate_phone(value);
            break;
        default:
            isValid = true;
            break;
    }
    this.properties[key] = (isValid || this.properties[key] || "") && value;
    return isValid;
};

Contact.prototype.getProperty = function(key) {
    return this.properties[key];
};

var contactList = function(name) {
    this.name = name;
    this.contact_array = [];
};

contactList.prototype.addContact = function(a_contact) {
    return (a_contact instanceof Contact) && this.contact_array.push(a_contact);
};

contactList.prototype.findIndex = function(key, value) {
    var contact_count = this.contact_array.length;
    for (var i = 0; i < contact_count; i++) {
        if (this.contact_array[i].getProperty(key) == value) {
            return i;
        }
    }
    return -1;
};

contactList.prototype.removeContact = function(id) {
    var index = this.findIndex("Id", id);
    if (index > -1) {
        return this.contact_array.splice(index, 1);
    }
    return false;
};

contactList.prototype.editContact = function(id, updateObj) {
    var index = this.findIndex("Id", id);
    if (index > -1) {
        for (var key in updateObj) {
            this.contact_array[index].setProperty(key, updateObj[key]);
        }
    }
    return false;
};

contactList.prototype.getContact = function(id) {
    var index = this.findIndex("Id", id);
    if (index > -1) {
        return this.contact_array[index];
    }
    return false;
};

contactList.prototype.getAllContacts = function() {
    return this.contact_array;
};

var input = document.getElementsByClassName("text bar");
var submit_button = document.getElementById("submit");
var table_body = document.getElementsByTagName("tbody");
var id_row = {};
var row_id = {};
var first_empty_row = 0;
var myList = new contactList("my list");
var isEdit = false;
var edited_id = "";

submit_button.addEventListener('click', function(e) {
    e.preventDefault();
    if (name.value === '' || email.value === '' || phone.value === '') {
        alert('Please fill in all fields');
    } else if (isEdit) {
        submit(myList, edited_id);
    } else {
        submit(myList);
    }
});

var add_row = function(contact, row_number) {
    var row = document.createElement("tr");
    row.setAttribute("id", row_number);
    var properties = [contact.getProperty("Name"), contact.getProperty("Email"), contact.getProperty("Phone"), ""];
    var edit, del;
    for (var i = 0; i < 4; i++) {
        var cell = document.createElement("td");
        if (i < 3) {
            cell.textContent = properties[i];
        } else {
            edit = document.createElement("i");
            edit.setAttribute("class", "material-icons button edit");
            edit.textContent = "edit";
            cell.appendChild(edit);
            del = document.createElement("i");
            del.setAttribute("class", "material-icons button delete");
            del.textContent = "delete";
            cell.appendChild(del);
        }
        row.appendChild(cell);
    }
    document.getElementById("contact_table_body").appendChild(row);
    return [edit, del, row];
};

var edit_button = function(id, a_list) {
    var contact = a_list.getContact(id);
    var properties = [contact.getProperty("Name"), contact.getProperty("Email"), contact.getProperty("Phone"), ""];
    for (var i = 0; i < 3; i++) {
        input[i].value = properties[i];
    }
    isEdit = true;
    edited_id = id;
};

var del_button = function(id, a_list) {
    var row = id_row[id];
    var contact = a_list.removeContact(id);
    document.getElementById(row).outerHTML = "";
    delete id_row[id];
    delete row_id[row];
    alert('Contact Removed');
};

var submit = function(a_list, contact_id) {
    // var isValid = validateInput();
    var property = {
        Name: input[0].value,
        Email: input[1].value,
        Phone: input[2].value
    };
    if (contact_id) {
        a_list.editContact(contact_id, property);
        var row = id_row[contact_id];
        var table_row = document.getElementById(row).children;
        for (var i = 0; i < 3; i++) {
            table_row[i].textContent = input[i].value;
        }
        isEdit = false;
        edited_id = "";
        submit_button.textContent = "Submit";
    } else {
        var a_contact = new Contact(property.Name, property.Email, property.Phone);
        var id = a_contact.getProperty("Id");
        id_row[id] = first_empty_row;
        row_id[first_empty_row] = id;
        a_list.addContact(a_contact);
        var buttons = add_row(a_contact, first_empty_row);
        buttons[0].addEventListener('click', function(e) {
            e.preventDefault();
            submit_button.textContent = "Submit Edit";
            edit_button(id, a_list);
        });
        buttons[1].addEventListener('click', function(e) {
            e.preventDefault();
            del_button(id, a_list);
        });
        first_empty_row++;
        input[0].value = input[1].value = input[2].value = "";
    }
};