// Set a cookie with language information
function setLanguageCookie() {
    setCookie('language', document.getElementById('language').value, 30);
}

// Function to get a language cookie
function getLanguage() {
    return getCookie('language');
}


// Handle language selection
document.addEventListener('DOMContentLoaded', function() {
    generateLanguageOptions();
    let language = 'pt-pt';
    if (getCookie('userInfo')) {
        //window.location.href = './simulator.html'; // Adjust the URL as needed
        language = JSON.parse(getCookie('userInfo')).language;
        changeLanguage(language);
    } else if (getCookie('language')) {
        language = getCookie('language');
        changeLanguage(language);
    } else {
        changeLanguage(language); // Initialize with default language
    }
    //set select language value
    document.getElementById('language').value = language;
});

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