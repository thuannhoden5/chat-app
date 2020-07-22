const view ={};
view.setActiveScreen = (screenName) => {
    switch (screenName) {
    case 'welcomeScreen':
        document.getElementById('app')
        .innerHTML=components.welcomeScreen
    break;
    case 'loginScreen':
        document.getElementById('app')
        .innerHTML=components.loginScreen;
        const loginForm= document.getElementById('login_form')
        loginForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            const data ={
                email: loginForm.email.value,
                password: loginForm.password.value,
            }
            console.log(data)
            controller.login(data)
        })
        
    break;
    case 'registerScreen':
        document.getElementById('app')
        .innerHTML=components.registerScreen;
        const registerForm= document.getElementById('register_form')
        registerForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            const data ={
                firstname: registerForm.first_name.value,
                lastname: registerForm.last_name.value,
                email: registerForm.email.value,
                password: registerForm.password.value,
                confirm_password: registerForm.confirm_password.value
            }
            console.log(data)
            controller.register(data)
        })
        break;
    }
}