const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const comment = document.getElementById("comments");

const name_error = document.getElementById("error-name");
const email_error = document.getElementById("error-email");
const cmmt_error = document.getElementById("error-cmt");

const name_tip = document.getElementById("info-name");
const email_tip = document.getElementById("info-email");
const cmmt_tip = document.getElementById("info-cmt");

const form_errors = [];
const errors = document.getElementById("form_errors");
const form = document.querySelector("form");
             
form.addEventListener("submit", (event) => {
    errors.value = JSON.stringify(form_errors);
    let isError = 0;

    if (!fullname.validity.valid) {
        isError = 1;
        showNameError();
    }

    if (!email.validity.valid) {
        isError = 1;
        showEmailError();
    }

    if (comment.value.length < comment.minLength) {
        isError = 1;
        cmmt_error.textContent = "Error: Comment does not have enough required characters!";
        cmmt_error.style.display = "flex";
    }

    if(isError){
        event.preventDefault();
    }
})


function pushError(field, error){
    const exists = form_errors.some(err => err.field === field && err.error === error);

    if (!exists) {
        form_errors.push({ field, error });
    }
};

fullname.addEventListener("input", (event) => {
    if(fullname.validity.valid){
        name_error.textContent = "";
        name_error.style.display = "none";
        name_tip.textContent = "";
        name_tip.style.display = "none";
    } else{
        isError = 1;
        showNameError();
    }
});

email.addEventListener("input", (event) => {
    if(email.validity.valid){
        email_error.textContent="";
        email_tip.textContent = "";

        email_error.style.display = "none";
        email_tip.style.display = "none";
    } else{
        isError = 1;
        showEmailError();
    }
});

comment.addEventListener("input", (event) => {
    const cmt_ann = document.getElementById("ann-cmt");
    const total = comment.maxLength;
    const remaining = total - comment.value.length;
    cmt_ann.textContent = "";
    cmt_ann.style.fontSize = "medium";
    cmt_ann.style.backgroundColor = "transparent";
                    
    if(remaining >= 0){
        cmmt_error.textContent = "";
        cmmt_error.style.display = "none";
        cmmt_tip.textContent = "";
        cmmt_tip.style.display = "none";

        if(remaining === comment.maxLength){
            cmmt_error.textContent = "Error: Missing comment!";
            cmmt_error.style.display = "flex";
            cmmt_tip.textContent = "Tips: Length of comment must be between "+
                                comment.minLength +" and " + comment.maxLength +".";
            cmmt_tip.style.display = "flex";
        } else{
            if(comment.value.length < comment.minLength){
                cmmt_error.textContent = "Error: Comment does not have enough required characters!";
                cmmt_error.style.display = "flex";
                cmmt_tip.textContent = "Tips: Length of comment must be between "+
                                    comment.minLength +" and " + comment.maxLength +".";
                cmmt_tip.style.display = "flex";
                isError = 1;
                pushError("Comments", "Not enough required lenght");
                setTimeout(() => {
                    cmmt_error.textContent = "";
                }, 5000);
            }
            cmt_ann.style.display = "flex";
            if (remaining == 0){
                cmt_ann.textContent = "You reach the limit characters!";
                cmt_ann.style.backgroundColor = "lightpink";
            } else if (remaining < 10){
                cmt_ann.textContent = "Danger! Only " + remaining + " characters left!";
                cmt_ann.style.backgroundColor = "lightpink";
            } else if(remaining < 30){
                cmt_ann.textContent = "Warning: " + remaining + " characters left!";
                cmt_ann.style.backgroundColor = "yellow";
            } else{
                cmt_ann.textContent = remaining + " characters left!";
                cmt_ann.style.backgroundColor = "transparent";
            }
        }
    }                
});

function showNameError(){
    const fullNameValue = fullname.value.trim(); // Trim whitespace
    const pattern1 = /^[A-Za-z]+(?: [A-Za-z]+)+$/; // Ensures at least two words
    const pattern2 = /[^A-Za-z ]/; // Checks for numbers/symbols

    if (fullNameValue === "") {
        name_error.textContent = "Error: Missing Fullname!\n";
        name_error.style.display = "flex";
        pushError("fullname", "Missing value");
        setTimeout(() => {
            name_error.textContent = "";
        }, 5000);
        return;
    }

    const invalidCharsPattern = /[^A-Za-z ]/; // Checks for numbers/symbols
    const nameStructurePattern = /^[A-Za-z]+ [A-Za-z]+$/; // Ensures exactly two words

    if (invalidCharsPattern.test(fullNameValue)) { 
        name_error.textContent = "Error: Full name contains invalid characters!\n";
        name_tip.textContent =  "Tips: Full name contains only alphabets and spaces!";
        name_tip.style.display = "flex";
        name_error.style.display = "flex";
        pushError("fullname", "Consists unexpected characters");
        setTimeout(() => {
            name_error.textContent = "";
        }, 5000);
        return; 
    } 

    if (!nameStructurePattern.test(fullNameValue)) { 
        name_error.textContent = "Error: Invalid Full name!\n";
        name_tip.textContent = "Tips: Full name must have both 'Firstname' and 'Lastname'.";
        name_tip.style.display = "flex";
        name_error.style.display = "flex";
        pushError("fullname", "Not in form of \"Firstname Lastname\"");
        setTimeout(() => {
            name_error.textContent = "";
        }, 5000)
    }
};

function showEmailError(){
    if(email.validity.valueMissing){
        email_error.textContent = "Error: Missing Email!";
        pushError("email", "Missing value");
    } else if(email.validity.typeMismatch){
        email_error.textContent = "Error: Invalid values! Entered value is not an email.";
        email_tip.textContent= "Tips: Valid email format: \"id@domain\"";
        email_tip.style.display = "flex";
        pushError("email", "not in form of \"id@domain\"");
    }
    email_error.style.display = "flex";
    setTimeout(() => {
        email_error.textContent = "";
    }, 5000);
};
