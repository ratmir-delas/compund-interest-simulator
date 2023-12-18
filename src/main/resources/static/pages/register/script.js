function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// generate language options
function generateLanguageOptions() {
    const selectElement = document.getElementById("language");
    if (!selectElement) {
        console.error("Select element not found");
        return;
    }
    if (!languageData) {
        console.error("languageData is not defined");
        return;
    }
    for (const langCode in languageData) {
        if (languageData.hasOwnProperty(langCode)) {
            const langInfo = languageData[langCode];
            const option = document.createElement("option");
            option.value = langCode;
            option.textContent = `${langInfo.name} (${langCode.toUpperCase()})`;
            option.dataset.flag = langInfo.flag;
            selectElement.appendChild(option);
        }
    }
}


// Handle language selection
function changeLanguage(lang) {
    document.querySelectorAll("[data-lang-key]").forEach(elem => {
        const key = elem.getAttribute("data-lang-key");
        elem.textContent = translations[lang][key] || "Key not found";
    });

    // Display the country flag alongside the language name
    const selectedOption = document.querySelector(`#language option[value="${lang}"]`);
    const flagCode = selectedOption.dataset.flag;
    const flagImg = document.createElement("img");
    flagImg.src = `./../src/img/flags/4x3/${flagCode}.svg`;

    const languageName = selectedOption.textContent;
    selectedOption.textContent = '';
    selectedOption.appendChild(flagImg);
    selectedOption.appendChild(document.createTextNode(languageName));
}


// Initialize with default language
document.addEventListener('DOMContentLoaded', function() {
    generateLanguageOptions();
    changeLanguage('pt'); // Initialize with default language
});


// Handle form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        language: document.getElementById('language').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:6969/api/v1/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(data => {
            console.log('Success:', data);
            //alert('User registered successfully!');

            // Set a cookie with user information
            setCookie('userInfo', JSON.stringify(formData), 30); // Keeps the user logged in for set days

            // Redirect to index page on successful registration
            window.location.href = './simulator.html'; // Adjust the URL as needed
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //alert('Error registering user: ' + error.message);
            // Handle errors here
        });
});
