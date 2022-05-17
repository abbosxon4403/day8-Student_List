let formik = document.getElementById('form')
let firstname = document.getElementById('user_name')
let lastname = document.getElementById('user_lastname')
let group = document.getElementById('user_group')
let gender = document.getElementById('user_gender')
let listGroup = document.getElementById('tbody')
import newUserObjCreator from './UserInfoCreator.js'

formik.addEventListener('submit', function(event) {
    event.preventDefault();
    if (firstname.value.trim() == '' || lastname.value.trim() == '' || group.value.trim() == '' || gender.value.trim() == '') {

    } else {
        console.log(firstname.value, lastname.value, group.value, gender.value);
    }
})

let storage = window.localStorage;
let getFromStorage = storage.getItem("data");
let data;

if (getFromStorage) {
    data = JSON.parse(getFromStorage)
} else {
    data = []
}

let render = () => {
    let TR = document.createElement('tr')

    let nameTD = document.createElement('td')
    let surnameTD = document.createElement('td')
    let groupTD = document.createElement('td')
    let genderTD = document.createElement('td')
    let del = document.createElement('button')
    let edit = document.createElement('button')

    nameTD.textContent = firstname.value;
    TR.append(nameTD)
    surnameTD.textContent = lastname.value;
    TR.append(surnameTD)
    groupTD.textContent = group.value;
    TR.append(groupTD)
    genderTD.textContent = gender.value;
    TR.append(genderTD)

    del.className = ('btn btn-warning bg-warning mb-2 me-2')
    del.textContent = 'delete'
    TR.append(del)
    del.addEventListener("click", () => {
        TR.remove();
    })

    edit.className = ('btn btn-success bg-success')
    edit.textContent = 'edit'
    TR.append(edit)

    listGroup.append(TR)
    return TR;
}


formik.addEventListener("submit", function(event) {
    event.preventDefault();

    if (firstname.value.trim() == '' || lastname.value.trim() == '' || group.value.trim() == '' || gender.value.trim() == '') {
        alert('pls fill the list')
        return;
    }

    let newUserObject = new newUserObjCreator(
        firstname.value,
        lastname.value,
        group.value,
        gender.value
    )
    data.push(newUserObject);
    storage.setItem("data", JSON.stringify(data))
    data.push(render())

    firstname.value = ''
    lastname.value = ''
    group.value = ''

    storage.setItem("keys", JSON.stringify(data))
});