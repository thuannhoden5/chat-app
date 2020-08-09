const view = {}
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'welcomeScreen':
      document.getElementById('app')
        .innerHTML = components.welcomeScreen
      break;
    case 'loginScreen':
      // in ra man login
      document.getElementById('app').innerHTML = components.loginScreen
      document.getElementById('redirect-to-register')
        .addEventListener('click', () => {
          view.setActiveScreen('registerScreen')
        })
      const loginForm = document.getElementById('login-form')
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        loginForm.email.value = loginForm.email.value.trim()
        const data = {
          email: loginForm.email.value,
          password: loginForm.password.value
        }
        controller.login(data)
      })
      break;
    case 'registerScreen':
      document.getElementById('app')
        .innerHTML = components.registerScreen
      const registerForm = document.getElementById('register-form')
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value
        }
        console.log(data)
        controller.register(data)
      })
      document.getElementById('redirect-to-login')
        .addEventListener('click', () => {
          view.setActiveScreen('loginScreen')
        })
      break;

    case 'chatScreen':
      document.getElementById('app')
        .innerHTML = components.chatScreen
      const sendMessageForm =
        document.getElementById('send-message-form')
      sendMessageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (sendMessageForm.message.value.trim() === '') {
          return
        }
        const message = {
          content: sendMessageForm.message.value,
          owner: model.currentUser.email,
          createdAt: (new Date()).toISOString()
        }

        model.addMessage(message)

        sendMessageForm.message.value = ''
      })
      model.loadConversations();
      model.listenConversationsChange()
  }
}
model.listenConversationsChange = () => {
  let isFirstRun = true
  firebase.firestore()
    .collection(model.collectionName)
    .where('users', 'array-contains', model.currentUser.email)
    .onSnapshot((res) => {
      if (isFirstRun) {
        isFirstRun = false;
        return
      }
      const docChanges = res.docChanges()
      console.log(res.docChanges())
      for (oneChange of docChanges) {
        console.log(oneChange)
        const type = oneChange.type
        if (type === 'modified') {
          const docData = getDataFromDoc(oneChange.doc)

          //update lai model.conversation
          for (let index = 0; index < model.conversations.length; index++) {
            if (model.conversations[index].id === docData.id) {
              model.conversations[index] = docData
            }
          }
          // update currentConversation
          if (docData.id === model.currentConversation.id) {
            model.currentConversation = docData
            const lastMessage = docData.messages[docData.messages.length - 1]
            view.addMessage(lastMessage)
          }
        }
      }
    })
}
// model tuong tac voi database, hien thi bat su kien la view
view.addMessage = (message) => {
  const messageWrapper = document.createElement('div')
  messageWrapper.classList.add('message-container')
  if (message.owner === model.currentUser.email) {

    messageWrapper.classList.add('mine')
    messageWrapper.innerHTML = `
        <div class="content">
          ${message.content}
        </div>
      `
  } else {

    messageWrapper.classList.add('their')

    messageWrapper.innerHTML = `
      <div class="owner">
        ${message.owner}
      </div>
      <div class="content">
        ${message.content}
      </div>
      `
  }
  document.querySelector('.list-messages')
    .appendChild(messageWrapper)
}
view.showCurrentConversation = () => {
  // doi ten cuoc tro chuyen
  document
    .getElementsByClassName('conversation-header')[0]
    .innerText = model.currentConversation.title
  // in cac tin nhan len man hinh
  for (message of model.currentConversation.messages) {
    view.addMessage(message)
  }
  view.scrollToEndElement();
}
view.scrollToEndElement = () => {
  const element = document.querySelector('.list-messages')
  element.scrollTop = element.scrollHeight
}
