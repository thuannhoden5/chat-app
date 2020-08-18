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
  //   console.log(err)
  // })
}
model.login = async (dataLogin) => {
  try {
    await firebase.auth()
      .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
    // console.log(response)
    // if(response.user.emailVerified === false) {
    //   alert('Please verify your email!')
    // } else {
    //   model.currentUser = {
    //     displayName: response.user.displayName,
    //     email: response.user.email
    //   }
    //   view.setActiveScreen('chatScreen')
    // }
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}

model.addMessage = (message) => {
  const dataToUpdate = {
    messages: firebase.firestore
      .FieldValue.arrayUnion(message)
  }
  firebase.firestore()
    .collection(model.collectionName)
    .doc(model.currentConversation.id)
    .update(dataToUpdate)
}

model.loadConversations = async () => {
  const response = await firebase.firestore()
    .collection(model.collectionName)
    .where('users', 'array-contains', model.currentUser.email)
    .get()
  model.conversations = getDataFromDocs(response.docs)
  if (model.conversations.length > 0) {
    model.currentConversation = model.conversations[0]
    view.showCurrrentConversation()
  }
  view.showConversations()
}
model.listenConversationsChange = () => {
  let isFirstRun = true
  firebase.firestore()
    .collection(model.collectionName)
    .where('users', 'array-contains', model.currentUser.email)
    .onSnapshot((res) => {
      if(isFirstRun) {
        isFirstRun = false
        return
      }
      const docChanges = res.docChanges()
      for(oneChange of docChanges) {
        const type = oneChange.type
        if(type === 'modified') {
          const docData = getDataFromDoc(oneChange.doc)
          //update lai model.conversations
          for(let index = 0; index < model.conversations.length; index++) {
            if(model.conversations[index].id === docData.id) {
              model.conversations[index] = docData
            }
          }
          // update model.currentConversation
          if(docData.id === model.currentConversation.id) {
            model.currentConversation = docData
            const lastMessage =
            docData.messages[docData.messages.length - 1]
            view.addMessage(lastMessage)
            view.scrollToEndElement()
          }
        }
        if(type === 'added') {
          const docData = getDataFromDoc(oneChange.doc)
          model.conversations.push(docData)
          view.addConversation(docData)
        }
      }
    })
}
model.createConversation = (data) => {
  firebase.firestore()
  .collection(model.collectionName).add(data)
  view.setActiveScreen('chatScreen', true)
}