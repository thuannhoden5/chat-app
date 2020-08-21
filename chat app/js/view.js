const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
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
        if (sendMessageForm.message.value.trim() !== '') {
          const message = {
            content: sendMessageForm.message.value,
            owner: model.currentUser.email,
            createdAt: (new Date()).toISOString()
          }
          model.addMessage(message)
          sendMessageForm.message.value = ''
        }
      })
      if (!fromCreateConversation) {
        model.loadConversations()
        model.listenConversationsChange()
      } else {
        view.showConversations()
        view.showCurrrentConversation()
      }
      document.querySelector('.create-conversation .btn')
        .addEventListener('click', () => {
          view.setActiveScreen('createConversation')
        })
      const addUserForm = document.getElementById('add-user-form')
      addUserForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const user = addUserForm.email.value
        controller.addUser(user)
        addUserForm.email.value = ''
      })
      break;
    case 'createConversation':
      document.getElementById('app').innerHTML =
        components.createConversation
      document.querySelector('#back-to-chat')
        .addEventListener('click', () => {
          view.setActiveScreen('chatScreen', true)
        })
      const createConversationForm = document
        .getElementById('create-conversation-form')
      createConversationForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {
          conversationTitle: createConversationForm.conversationTitle.value,
          conversationEmail: createConversationForm.conversationEmail.value
        }
        controller.createConversation(data)
      })
      break;
  }
}
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
view.showCurrrentConversation = () => {
  document.querySelector('.list-messages').innerHTML = ''
  // doi ten cuoc tro chuyen
  document
    .getElementsByClassName('conversation-header')[0]
    .innerText = model.currentConversation.title
  // in cac tin nhan len man hinh
  for (message of model.currentConversation.messages) {
    view.addMessage(message)
  }
  view.scrollToEndElement()
  view.showListUsers(model.currentConversation.users)
}
view.showListUsers = (users) => {
  document.querySelector('.list-user').innerHTML = ''
  for (user of users) {
    view.addUser(user)
  }
}
view.addUser = (user) => {
  const userWrapper = document.createElement('div')
  userWrapper.classList.add('user')
  userWrapper.innerText = user
  document.querySelector('.list-user').appendChild(userWrapper)
}
view.scrollToEndElement = () => {
  const element = document.querySelector('.list-messages')
  element.scrollTop = element.scrollHeight
}
view.showConversations = () => {
  for (oneConversation of model.conversations) {
    view.addConversation(oneConversation)
  }
}
view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement('div')
  conversationWrapper.className = 'conversation cursor-pointer'
  conversationWrapper.id = conversation.id
  if (model.currentConversation.id === conversation.id) {
    conversationWrapper.classList.add('current')
  }
  conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} users</div>
    <div class ="notification"></div>
  `
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  console.log(mediaQuery)
  if (mediaQuery.matches) {
    const firtsCharacter = conversation.title.charAt(0).toUpperCase()
    conversationWrapper.firstElementChild.innerText = firtsCharacter
    document.querySelector('.create-conversation .btn').innerText = "+"
  }
  mediaQuery.addListener((e) => {
    if (e.matches) {
      const firtsCharacter = conversation.title.charAt(0).toUpperCase()
      conversationWrapper.firstElementChild.innerText = firtsCharacter
      document.querySelector('.create-conversation .btn').innerText = "+"
    } else {
      const firtsCharacter = conversation.title.charAt(0).toUpperCase()
      conversationWrapper.firstElementChild.innerText = conversation.title
      document.querySelector('.create-conversation .btn').innerText = "Conversation title"
    } Ï
  })
  conversationWrapper.addEventListener('click', () => {
    // thay doi giao dien, doi current
    document.querySelector('.current').classList.remove('current')
    conversationWrapper.classList.add('current')
    // thay doi model.currentConversation
    for (oneConversation of model.conversations) {
      if (oneConversation.id === conversation.id) {
        model.currentConversation = oneConversation
      }
    }
    // in cac tin nhan cua model.currentConversation len man hinh
    view.showCurrrentConversation()
  })
  document.querySelector('.list-conversations')
    .appendChild(conversationWrapper)
}

view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message
}

view.updateNumberUsers = (docId, numberUsers) => {
  const conversation = document.getElementById(docId)
  const secondChild = conversation.getElementsByTagName('div')[1]
  secondChild.innerText = numberUsers + ' users'
}