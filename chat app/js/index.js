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
  firestoreFunction();
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user) {
      if (user.emailVerified) {
        model.currentUser = {
          displayName: user.displayName,
          email: user.email
        }
        view.setActiveScreen('chatScreen')
      } else {
        view.setActiveScreen('loginScreen')
        alert('Please verify your email')
      }
    } else {
      view.setActiveScreen('loginScreen')
    }
  });

}
window.onload = init;

firestoreFunction = async () => {
  //get one document
  const documentId = 'VGA5Veqg8LCQoFRcX3V5'
  const response = await firebase.firestore()
    .collection('users')
    .doc(documentId).get()
  const user = getDataFromDoc(response)
  console.log(user)
  //get many document
  const response2 = await firebase.firestore()
    .collection('users').where('phoneNumber', 'array-contains', '0397').get()
  //console.log(response2)
  const listUser = getDataFromDocs(response2.docs)
  console.log(listUser)
  //console.log(getDataFromDoc(response2.docs[1]))
  //add document
  const userToAdd = {
    name: 'Nho',
    age: 23,
    email: 'thuannhoden5@gmail.com'
  }
  //firebase.firestore().collection('users').add(userToAdd)
  //update document
  documentIdUpdate = 'ppASWFseEONYRvekr8aS'
  const dataToUpdate = {
    name: 'phát 2k',
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('0397')
  }
  firebase.firestore()
    .collection('users').doc(documentIdUpdate)
    .update(dataToUpdate)
  //delete document
  const docToDelete = 'rjidEjSPCzVuh7wE8ouE'
  firebase.firestore()
    .collection('users').doc(docToDelete).delete()

}

getDataFromDoc = (doc) => {
  const data = doc.data()
  data.id = doc.id;
  return data
}
getDataFromDocs = (docs) => {
  return docs.map(item => getDataFromDoc(item))
  //for (let index = 0 ; index< docs.length; index++){
  //  const element = getDataFromDoc(docs[index])
  //  console.log(element)
  //  listData.push(element)
  //}

  //return listData;
}

