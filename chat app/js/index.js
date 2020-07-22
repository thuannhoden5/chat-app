 //bat su kien. khi window load xong thi no goij su kien init
const init =()=>{
    console.log('Window loaded');
    view.setActiveScreen('registerScreen')
}
window.onload = init 
function redirect_to_register() {
    document.getElementById('redirect_to_register').style.color = "red";
    view.setActiveScreen('registerScreen')
}
function redirect_to_login() {
    document.getElementById('redirect_to_login').style.color = "red";
    view.setActiveScreen('loginScreen')
}