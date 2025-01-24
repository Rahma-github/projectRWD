const question = document.getElementById('question');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
var checkbox = document.getElementById("check");

const error_message_questions = document.getElementById("err_msg_qus");
const error_message_subject= document.getElementById("err_msg_subj");
const error_message_message = document.getElementById("err_msg_msgs");
const error_message_checkbox = document.getElementById("err_msg_checkbox");


function OnSubmitted(event){
    event.preventDefault(); 
    var erorflag=false;
    var quest=question.value;
    var sub=subject.value;
    var msg=message.value;
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
    console.log(quest);
    console.log(sub);
    console.log(msg);
    if (!erorflag) {
        var data = {
            user_questions: quest,  
            user_subjects: sub,
            user_messages: msg,
        };
        window.location.href=""
        localStorage.setItem('user_contact_data', JSON.stringify(data));
    }
}

