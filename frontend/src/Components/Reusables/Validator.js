function validate(id, regex, corrector_id, corrector_msg, is_compulsory) {
    const field = document.getElementById(id);
    const corrector = document.getElementById(corrector_id);

    if(field.value.toString().match(regex)) {
        field.style.borderColor = "green";
        corrector.style.color = "green";
        corrector.innerHTML = "";
    }
    else {
        field.style.borderColor = "red";
        corrector.style.color = "red";
        if(is_compulsory && field.value.length == 0)
            corrector.innerHTML = "&cross; This field cannot be empty!";
        else
            corrector.innerHTML = corrector_msg;
    }
}

export default validate;