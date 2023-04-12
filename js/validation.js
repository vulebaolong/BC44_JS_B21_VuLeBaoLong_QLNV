function showMessage(selector, mesage) {
    const element = document.querySelector(selector);
    element.style.display = "inline-block";
    if (mesage === "") element.style.display = "none";
    element.innerHTML = mesage;
}

function validationEmpty(value, selector) {
    if (value === "" || value === "Chọn chức vụ") {
        showMessage(selector, "Không được để trống");
        return false;
    } else {
        showMessage(selector, "");
        return true;
    }
}

function validationUserName(value, selector, message) {
    // const valueLength = value.length;
    if (value.match(/^[0-9]{4,6}$/gi)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationFullName(value, selector, message) {
    if (value.match(/[0-9]/gi)) {
        showMessage(selector, message);
        return false;
    } else {
        showMessage(selector, "");
        return true;
    }
}

function validationEmail(value, selector, message) {
    if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationPassword(value, selector, message) {
    const valueLength = value.length;
    if (valueLength >= 6 && valueLength <= 10) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}
function validationOneNum(value, selector, message) {
    if (value.match(/[0-9]/gi)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}
function validationOneUpperCase(value, selector, message) {
    if (value.match(/[A-Z]/g)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}
function validationOneSpecial(value, selector, message) {
    //([#?!@$%^&*-])
    if (value.match(/([#?!@$%^&*-])/)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationDatepicker(value, selector, message) {
    if (value.match(/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/)) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationWage(value, selector, message) {
    if (value >= 1000000 && value <= 20000000) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationPosition(value, selector, message) {
    if (value === "Sếp" || value === "Trưởng phòng" || value === "Nhân viên") {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationTimeWork(value, selector, message) {
    if (value >= 80 && value <= 200) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validationOnlyOneItem(value, arrPersonnel, selector, message) {
    const isOnly = arrPersonnel.find((e) => {
        return e.userName === value;
    });

    if (!isOnly) {
        showMessage(selector, "");
        return true;
    } else {
        showMessage(selector, message);
        return false;
    }
}

function validation(value, isOnly = true) {
    console.log(value);
    let isValid = true;

    //user name
    isValid =
        isValid &
        (validationEmpty(value.userName, "#tbTKNV") &&
            (isOnly
                ? validationOnlyOneItem(
                      value.userName,
                      arrPersonnel,
                      "#tbTKNV",
                      "Tên tài khoản đã tồn tại"
                  )
                : true) &&
            validationUserName(
                value.userName,
                "#tbTKNV",
                "Tên tài khoản từ 4 đến 6 ký tự"
            ));

    //full name
    isValid =
        isValid &
        (validationEmpty(value.fullName, "#tbTen") &&
            validationFullName(value.fullName, "#tbTen", "Họ và tên không hợp lệ"));

    //email
    isValid =
        isValid &
        (validationEmpty(value.email, "#tbEmail") &&
            validationEmail(value.email, "#tbEmail", "Email không hợp lệ"));

    //password
    isValid =
        isValid &
        (validationEmpty(value.password, "#tbMatKhau") &&
            validationPassword(
                value.password,
                "#tbMatKhau",
                "Password từ 6 đến 10 ký tự"
            ) &&
            validationOneNum(
                value.password,
                "#tbMatKhau",
                "Mật khẩu phải có ít nhất 1 ký tự là số"
            ) &&
            validationOneUpperCase(
                value.password,
                "#tbMatKhau",
                "Mật khẩu phải có ít nhất 1 ký tự in hoa"
            ) &&
            validationOneSpecial(
                value.password,
                "#tbMatKhau",
                "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
            ));

    //work day
    isValid =
        isValid &
        (validationEmpty(value.datepicker, "#tbNgay") &&
            validationDatepicker(value.datepicker, "#tbNgay", "Thời gian không hợp lệ"));

    //wage
    isValid =
        isValid &
        (validationEmpty(value.wage, "#tbLuongCB") &&
            validationWage(
                value.wage,
                "#tbLuongCB",
                "Lương phải từ 1,000,000 đến 20,000,000"
            ));

    //position
    isValid =
        isValid &
        (validationEmpty(value.position.value, "#tbChucVu") &&
            validationPosition(
                value.position.value,
                "#tbChucVu",
                "Chức vụ không hợp lệ"
            ));

    //time work
    isValid =
        isValid &
        (validationEmpty(value.timeWork, "#tbGiolam") &&
            validationTimeWork(
                value.timeWork,
                "#tbGiolam",
                "Giờ làm phải từ 80 đến 200 giờ"
            ));

    return isValid;
}
