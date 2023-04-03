// =========================================================================

const addPersonnelBtn = document.querySelector("#btnThemNV");
const listPersonnelEl = document.querySelector("#tableDanhSach");

const addUpdateBtn = document.querySelector("#btnCapNhat");
const showFormBtn = document.querySelector("#btnThem");
const findBtnEl = document.querySelector("#btnTimNV");

// KHỞI TẠO
init();

// CLICK ADD
addPersonnelBtn.addEventListener("click", () => {
    //get data
    const value = getValueForm();

    //validation data
    const isValid = validation(value);
    if (!isValid) return;

    //add personel to array arrPersonnel
    add(value, arrPersonnel);

    //save local
    saveLocalStorage(arrPersonnel);

    //render
    render(listPersonnelEl, arrPersonnel);
});

// CLICK DELETE
listPersonnelEl.addEventListener("click", (e) => {
    const element = e.target;
    //click Xóa
    if (element.classList.contains("btn-delete")) {
        //get id
        const id = +element.closest("tr").dataset.id;

        //xóa mảng
        remove(id, arrPersonnel);

        //save local
        saveLocalStorage(arrPersonnel);

        //render lại
        render(listPersonnelEl, arrPersonnel);
    }

    //click sửa
    if (element.classList.contains("btn-edit")) {
        //get id
        const id = +element.closest("tr").dataset.id;

        //click sửa
        edit(id, arrPersonnel);

        addUpdateBtn.disabled = false;
        addPersonnelBtn.disabled = true;
        document.querySelector("#tknv").disabled = true;
    }
});

// CLICK FIND
findBtnEl.addEventListener("click", () => {
    const request = document.querySelector("#searchName").value.trim();
    document.querySelector("#searchName").value = "";

    if (request === "") {
        //render
        render(listPersonnelEl, arrPersonnel);
        return;
    }

    const result = arrPersonnel.filter((el) => {
        return el.sort() === request;
    });

    //render
    render(listPersonnelEl, result);
});

// CLICK UPDATE
addUpdateBtn.addEventListener("click", (e) => {
    //get data
    const value = getValueForm();

    //validation data
    const isValid = validation(value, false);
    if (!isValid) return;

    update(value, arrPersonnel);

    //save local
    saveLocalStorage(arrPersonnel);

    //render
    render(listPersonnelEl, arrPersonnel);
});

// CLICK SHOW FORM
showFormBtn.addEventListener("click", (e) => {
    addUpdateBtn.disabled = true;
    addPersonnelBtn.disabled = false;
    document.querySelector("#tknv").disabled = false;
});
