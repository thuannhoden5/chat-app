const init = () => {
  //Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyChEB_n0303_h-jH_2cH0sLjPPHDe5f2n4",
    authDomain: "chat-app-ab3af.firebaseapp.com",
    databaseURL: "https://chat-app-ab3af.firebaseio.com",
    projectId: "chat-app-ab3af",
    storageBucket: "chat-app-ab3af.appspot.com",
    messagingSenderId: "1069467686094",
    appId: "1:1069467686094:web:02675c001109b3be032c9f"
  };
  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app().name)
  view.setActiveScreen('loginScreen')

    firebase.auth().onAuthStateChanged( function ( user )  {
    if (user) {
       view.setActiveScreen='chatScreen'
      }
    }); 
}
window.onload = init;
