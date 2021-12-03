// URL for checking gender of name 
const URL = 'https://api.genderize.io/';

// Handle requests 
const Request = (name) => {
    fetch(URL + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        document.getElementById('modal').style.opacity = 0;
        document.getElementById('gender').innerHTML = response.gender;
        document.getElementById('probability').innerHTML = response.probability;
        response.gender === 'male' ? 
        document.getElementById('male').checked = true : 
        response.gender === 'female' ? document.getElementById('female').checked = true : '';

        const names = getNamesObject();
        if (names.hasOwnProperty(name)) {
            document.getElementById('saved').innerHTML = names[name];
        } else {
            document.getElementById('saved').innerHTML = 'Empty!';
        }
    })
    .catch(error => {
        showMessage(
            `<p class="modal-message" style="padding: 0; margin: 0; color: red">${error}</p>`,
                2000);
    });
}

// Showing input message 
function showMessage(message, duration) {
    const modal = document.getElementById('modal');
    modal.style.opacity = 1;
    modal.innerHTML = message;
    setTimeout(() => {
        modal.style.opacity = 0;
    }, duration);
}

// Getter for Getting names 
function getNamesObject() {
    return localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : {};
}

// Setter for storing names 
function setNamesObject(names) {
    localStorage.setItem('names', JSON.stringify(names));
}

// Handle form submission
function Submit(e) {
    e.preventDefault();
    const modal = document.getElementById('modal');
    const name = document.getElementById('name').value;
    modal.style.opacity = 1;
    modal.innerHTML = `<p class="modal-message" style="padding: 0; margin: 0;">FETCHING...</p>`;
    name ? Request(name) : undefined;
}

// Handle save result
function Save(e) {
    const name = document.getElementById('name').value;
    if (name !== '') {
        const names = getNamesObject();
        if (document.getElementById('male').checked) {
            names[name] = 'male';
            showMessage(
                `<p class="modal-message" style="padding: 0; margin: 0">Updated local storage</p>`,
                    2000);
            document.getElementById('saved').innerHTML = 'male';
        } else if (document.getElementById('female').checked) {
            names[name] = 'female';
            showMessage(
                `<p class="modal-message" style="padding: 0; margin: 0">Updated local storage</p>`,
                    2000);
            document.getElementById('saved').innerHTML = 'female';
        }
        setNamesObject(names);
    }
}

// Delete name
function Clear(e) {
    const name = document.getElementById('name').value;
    const names = getNamesObject();
    if (name !== '' && names.hasOwnProperty(name)) {
        delete names[name];
        setNamesObject(names);
        document.getElementById('saved').innerHTML = 'Empty!';
        showMessage(
            `<p class="modal-message" style="padding: 0; margin: 0">Deleted ${name} from local storage`,
                2000);
    }
}