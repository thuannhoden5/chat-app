const controller = {};
controller.register=(data)=>{
    if(data.firstname===''){
        document
        .getElementById('first_name_error')
        .innerText='Please input first name'
    } else {
        document
        
        .getElementById('first_name_error')
        .innerText=''
    }
    if(data.lastname===''){
        document
        .getElementById('last_name_error')
        .innerText='Please input last name'
    } else {
        document
        .getElementById('last_name_error')
        .innerText=''
    }
    if(data.email===''){
        document
        .getElementById('email_error')
        .innerText='Please input email'
    } else {
        document.getElementById('email_error')
        .innerText=''
    }if(data.password===''){
        document
        .getElementById('password_error')
        .innerText='Please input password'
    } else {
        document.getElementById('password_error')
        .innerText=''
    }
    if(data.confirm_password===''){
        document
        .getElementById('confirm_password_error')
        .innerText='Please input confirm password'
    } else {
        document.getElementById('confirm_password_error')
        .innerText=''
    }
}
controller.login=(data)=>{
    if(data.email===''){
        document
        .getElementById('email_error')
        .innerText='Please input email'
    } else {
        document
        .getElementById('email_error')
        .innerText=''
    }if(data.password===''){
        document
        .getElementById('password_error')
        .innerText='Please input password'
    } else {
        document.getElementById('password_error')
        .innerText=''
    }
}