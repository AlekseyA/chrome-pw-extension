console.log('contentjs loaded', $);
let emailField;
let pwField;

const _LOGIN = 'username'
const _PASSWORD = 'password'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    findUserField()
    findPasswordField()
    checkElements()
})

function checkElements() {
    if (pwField && !emailField) {
        loginOrGoToNextStep()
    } else if (emailField) {
        loginOrGoToNextStep()
    }
}

// find email/username field
function findUserField() {
    if ($('input[type="email"]').length && $('input[name="identifier"]').length) {
        emailField = $('input[type="email"]')
    } else if ($('input[name="email"]').length) {
        emailField = $('input[name="email"]')
    } else if ($('input[name="username"]').length) {
        emailField = $('input[name="username"]')
    }

    if (emailField) emailField.val(_LOGIN)
}

function findPasswordField() {
     if ($('input[type="password"]').length) {
        pwField = $('input[type="password"]');
     }
    if (pwField) pwField.val(_PASSWORD)
}

function loginOrGoToNextStep() {
    let element;

    if ($("[id$='Next']").length) {
        element = $("[id$='Next']")
    } else if ($('button:contains("Sign in")').length) {
        element = $('button:contains("Sign in")')
    } else if ($("[id$='next'] span").length) {
        element = $("[id$='next'] span");
    } else if ($("span:contains('Next')").length) {
        element = $("span:contains('Next')")
    }

    if (element) element.trigger('click')
    
    chrome.runtime.sendMessage({ url: window.location.href }, (response) =>{
        console.log(response);
    });
}