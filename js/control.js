const arrPersonnel = [];

// NEW ĐỐI TƯỢNG
function Personnel(
    _id,
    _userName,
    _fullName,
    _email,
    _datepicker,
    _wage,
    _position,
    _timeWork,
    _password
) {
    this.id = _id || new Date().getTime();
    this.userName = _userName;
    this.fullName = _fullName;
    this.email = _email;
    this.datepicker = _datepicker;
    this.wage = _wage;
    this.position = _position;
    this.timeWork = _timeWork;
    this.password = _password;
}
Personnel.prototype.sort = function () {
    if (this.timeWork >= 192) return "xuất sắc";
    if (this.timeWork >= 176) return "giỏi";
    if (this.timeWork >= 160) return "khá";
    if (this.timeWork < 160) return "trung bình";
};
Personnel.prototype.totalWage = function () {
    if (this.position.index === 1) return +this.wage * 3;
    if (this.position.index === 2) return +this.wage * 2;
    if (this.position.index === 3) return +this.wage * 1;
};

// XÓA 1 ITEM
function remove(id, arr) {
    const index = arr.findIndex((el) => {
        return el.id === id;
    });
    arr.splice(index, 1);
    return arr;
}

// RESET THÔNG BÁO VALIDATION
function resetValidation(arrSelector) {
    arrSelector.forEach((element) => {
        showMessage(element, "");
    });
}

// EDIT
function edit(id, arr) {
    const index = arr.findIndex((el) => {
        return el.id === id;
    });

    // RESET THÔNG BÁO VALIDATION
    resetValidation([
        "#tbTKNV",
        "#tbTen",
        "#tbEmail",
        "#tbMatKhau",
        "#tbNgay",
        "#tbLuongCB",
        "#tbChucVu",
        "#tbGiolam",
    ]);

    // FILL FORM
    document.querySelector("#tknv").value = arr[index].userName;
    document.querySelector("#name").value = arr[index].fullName;
    document.querySelector("#email").value = arr[index].email;
    document.querySelector("#datepicker").value = arr[index].datepicker;
    document.querySelector("#luongCB").value = formatCurrency(arr[index].wage);
    document.querySelector("#chucvu").value = arr[index].position.value;
    document.querySelector("#gioLam").value = arr[index].timeWork;
    document.querySelector("#password").value = arr[index].password;
}

// THÊM 1 ITEM
function add(value, arr) {
    //new personel
    const personnel = new Personnel(
        value.id || false,
        value.userName,
        value.fullName,
        value.email,
        value.datepicker,
        value.wage,
        value.position,
        value.timeWork,
        value.password
    );
    arr.push(personnel);
    return arr;
}

// LẤY GIÁ TRỊ TỪ FORM
function getValueForm() {
    const userName = document.querySelector("#tknv").value.trim();
    const fullName = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const datepicker = document.querySelector("#datepicker").value;
    const wage = +document.querySelector("#luongCB").value.trim().replaceAll(",", "");
    const positionValue = document.querySelector("#chucvu").value.trim();
    const positionSelected = document.querySelector("#chucvu").selectedIndex;
    const timeWork = document.querySelector("#gioLam").value.trim();
    const password = document.querySelector("#password").value.trim();
    return {
        userName,
        fullName,
        email,
        datepicker,
        wage,
        position: {
            value: positionValue,
            index: positionSelected,
        },
        timeWork,
        password,
    };
}

// RENDER
function render(resultEl, arr) {
    let result = "";
    arr.forEach((e) => {
        result += `<tr data-id="${e.id}">
        <td>${e.userName}</td>
        <td>${e.fullName}</td>
        <td>${e.email}</td>
        <td>${e.datepicker}</td>
        <td>${e.position.value}</td>
        <td>${formatCurrency(e.totalWage())}</td>
        <td>${e.sort()}</td>
        <td style=" display: flex; gap: 5px;">
            <button type="button" class="btn btn-success btn-edit" data-toggle="modal" data-target="#myModal">
            Sửa
            </button>
            <button id="" type="button" class="btn btn-danger btn-delete">
            Xóa
            </button>
        </td>
        <tr>`;
    });
    resultEl.innerHTML = result;
}

// SAVE VÀO LOCAL
function saveLocalStorage(value) {
    localStorage.setItem("DATA_PERSONNEL", JSON.stringify(value));
}

// GET GIÁ TRỊ Ở LOCAL
function getLocalStorage(value) {
    const valueJson = localStorage.getItem(value);
    if (valueJson === "undefined") return;
    const valueArray = JSON.parse(valueJson);
    return valueArray;
}

// UPDATE
function update(value, arr) {
    const index = arr.findIndex((el) => {
        return el.userName === value.userName;
    });

    //thay đổi thông tin
    arr[index].datepicker = value.datepicker;
    arr[index].email = value.email;
    arr[index].fullName = value.fullName;
    arr[index].password = value.password;
    arr[index].position = value.position;
    arr[index].timeWork = value.timeWork;
    arr[index].userName = value.userName;
    arr[index].wage = value.wage;
}

// KHỞI TẠO
function init() {
    // GET GIÁ TRỊ Ở LOCAL
    const valueArray = getLocalStorage("DATA_PERSONNEL");
    if (!valueArray) return;

    //add personel to array arrPersonnel
    valueArray.forEach((e) => {
        add(e, arrPersonnel);
    });

    //render
    render(listPersonnelEl, arrPersonnel);
}

// FORMAT CURRENCY
function formatCurrency(num, locale = navigator.language) {
    return new Intl.NumberFormat(locale).format(num);
}
