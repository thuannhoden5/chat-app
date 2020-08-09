const model = {}
model.currentUser = undefined
model.conversations = undefined
model.currentConversation = undefined
model.collectionName = 'conversations'

model.register = async (data) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    firebase.auth().currentUser.updateProfile({
      displayName: data.firstName + ' ' + data.lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check you email!')
    view.setActiveScreen('loginScreen')
    console.log(model.currentUser.displayName)
  } catch (err) {
    console.log(err)
    alert(err.message)
  }

  // .then((res) => {
  //   firebase.auth().currentUser.updateProfile({
  //     displayName: data.firstName + ' ' + data.lastName
  //   })
  //   firebase.auth().currentUser.sendEmailVerification()
  // }).catch((err) => {
  //   console..log(err)
  // })
}
model.login = async (dataLogin) => {
  try {
    const response = await firebase.auth()
      .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
    console.log(response)
    if (response.user.emailVerified === false) {
      alert('Please verify your email!')
    } else {
      model.currentUser = {
        displayName: response.user.displayName,
        email: response.user.email
      }
      //console.log(model.currentUser.displayName)
      view.setActiveScreen('chatScreen')
    }
  } catch (err) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
      document.getElementById('email-error').innerText = 'This e-mail address has not been registered'
    }
    if (err.code === 'auth/wrong-password') {
      document.getElementById('password-error').innerText = 'You have entered an invalid password '
    }
    console.log(err)
  }
}

model.addMessage = (message) => {
  const dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message)
  }
  firebase.firestore()
    .collection(model.collectionName).doc('jvylj2e1yBsWZCAc9hbE')
    .update(dataToUpdate)
};

model.loadConversations = async() => {
  const response = await firebase.firestore()
    .collection(model.collectionName)
    .where('users','array-contains', model.currentUser.email)
    .get()
    model.conversations = getDataFromDocs(response.docs)
    
    if(model.conversations.length > 0) {
      model.currentConversation = model.conversations[0]
      view.showCurrentConversation()
      console.log(getDataFromDocs(response.docs))
    }
}
