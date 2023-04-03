const arrPersonnel = [];

function getValueForm(arr) {
    const userName = document.querySelector("#tknv").value;
    const fullName = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const datepicker = document.querySelector("#datepicker").value;
    const wage = document.querySelector("#luongCB").value;
    const position = document.querySelector("#chucvu").value;
    const timeWork = document.querySelector("#gioLam").value;
    arr.push({
        userName,
        fullName,
        email,
        datepicker,
        wage,
        position,
        timeWork,
    });
    console.log(arr);
}

const addPersonnelBtn = document.querySelector("#btnThemNV");

addPersonnelBtn.addEventListener("click", () => {
    getValueForm(arrPersonnel);
});
