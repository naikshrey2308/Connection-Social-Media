function validate(id, regex, corrector_id, corrector_msg, is_compulsory) {
    const field = document.getElementById(id);
    const corrector = document.getElementById(corrector_id);

    if(field.value.toString().match(regex)) {
        field.classList.add("valid-input");
        field.classList.remove("invalid-input");
        corrector.style.color = "green";
        corrector.innerHTML = "";
    }
    else {
        field.classList.add("invalid-input");
        field.classList.remove("valid-input");
        corrector.style.color = "red";
        if(is_compulsory && field.value.length == 0)
            corrector.innerHTML = "&cross; This field cannot be empty!";
        else
            corrector.innerHTML = corrector_msg;
    }
}

export default validate;