const question = document.getElementById('question');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
var checkbox = document.getElementById("check");
let namee = document.getElementById("namee");
const email= document.getElementById("email");
const phone = document.getElementById("phone");
const error_message_questions = document.getElementById("err_msg_qus");
const error_message_subject= document.getElementById("err_msg_subj");
const error_message_message = document.getElementById("err_msg_msgs");
const error_message_checkbox = document.getElementById("err_msg_checkbox");
const errorMessageName = document.getElementById("err_msg_name");
const errorMessageEmail = document.getElementById("err_msg_email");
const errorMessagePhone = document.getElementById("err_msg_phone");
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
function OnSubmitted(event){
    event.preventDefault(); 
    var erorflag=false;
    var quest=question.value;
    var sub=subject.value;
    var msg=message.value;
    const nameValue = namee.value;
    const emailValue = email.value;
     const phoneValue = phone.value;
    if (quest === "") { 
        error_message_questions.textContent = "Please select an item from the list";
        error_message_questions.style.color = "red";
        question.style.border = "2px solid red";
        erorflag = true;
    } else {
        error_message_questions.textContent = ""; 
        question.style.border = "";
        erorflag=false; 

    }
    if (sub === "") { 
        error_message_subject.textContent = "Please fill out this field";
        error_message_subject.style.color = "red";
        subject.style.border = "2px solid red";
        erorflag = true;
    } else {
        error_message_subject.textContent = ""; 
        subject.style.border = "";
        erorflag=false; 

    }
    if (msg === "") { 
        error_message_message.textContent = "Please fill out this field";
        error_message_message.style.color = "red";
        message.style.border = "2px solid red";
        erorflag = true;
    } else {
        error_message_message.textContent = ""; 
        message.style.border = "";
        erorflag=false; 

    }
    if (!checkbox.checked) {
        error_message_checkbox.textContent = "The Recaptcha field is required.";
        error_message_checkbox.style.color = "red";
        erorflag = true;
    } else {
        error_message_checkbox.textContent = ""; 
        erorflag = false; 
    }
    if (nameValue === "") {
        errorMessageName.textContent = "Please enter your name.";
        errorMessageName.style.color = "red";
        namee.style.border = "2px solid red";
        erorflag = true;
    } else {
        errorMessageName.textContent = "";
        namee.style.border = "";
    }

    if (emailValue === "") {
        errorMessageEmail.textContent = "Please enter your email.";
        errorMessageEmail.style.color = "red";
        email.style.border = "2px solid red";
        erorflag = true;
    } else if (!validateEmail(emailValue)) {
        errorMessageEmail.textContent = "Invalid email format.";
        errorMessageEmail.style.color = "red";
        email.style.border = "2px solid red";
        erorflag = true;
    } else {
        errorMessageEmail.textContent = "";
        emailField.style.border = "";
    }
    if (phoneValue === "") {
        errorMessagePhone.textContent = "Please enter your phone number.";
        errorMessagePhone.style.color = "red";
        phone.style.border = "2px solid red";
        erorflag = true;
    } else if (!/^\d+$/.test(phoneValue)) {
        errorMessagePhone.textContent = "Phone number should contain only numbers.";
        errorMessagePhone.style.color = "red";
        phone.style.border = "2px solid red";
        erorflag = true;
    } else {
        errorMessagePhone.textContent = "";
        phoneField.style.border = "";
    }
    console.log(quest);
    console.log(sub);
    console.log(msg);
    if (!erorflag) {
        var data = {
            user_name: nameValue,
            user_email: emailValue,
            user_phone: phoneValue,
            user_questions: quest,  
            user_subjects: sub,
            user_messages: msg,
        };
        window.location.href="../html/BecomeApartner.html"
        localStorage.setItem('user_contact_data', JSON.stringify(data));
    }
}
let menu =document.getElementById("menu");
let dropmenu=document.getElementsByClassName("dropmenu")[0];
menu.addEventListener("click",()=>{
  dropmenu.classList.toggle("d-none")
});

document.addEventListener("click", (event) => {
  if (!dropmenu.contains(event.target) && !menu.contains(event.target)) {
      dropmenu.classList.add("d-none");
  }
});

