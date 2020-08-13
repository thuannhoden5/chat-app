const controller = {}
controller.register = (data) => {
  if (data.firstName.trim() === '') {
    document
      .getElementById('first-name-error')
      .innerText = 'Please input first name'
  } else {
    document.getElementById('first-name-error')
      .innerText = ''
  }
  if (data.lastName.trim() === '') {
    document
      .getElementById('last-name-error')
      .innerText = 'Please input last name'
  } else {
    document.getElementById('last-name-error')
      .innerText = ''
  }
  if (data.email.trim() === '') {
    document
      .getElementById('email-error')
      .innerText = 'Please input email'
  } else {
    document.getElementById('email-error')
      .innerText = ''
  }
  if (data.password.trim() === '') {
    document
      .getElementById('password-error')
      .innerText = 'Please input password'
  } else {
    document.getElementById('password-error')
      .innerText = ''
  }
  if (data.confirmPassword.trim() === '') {
    document
      .getElementById('confirm-password-error')
      .innerText = 'Please input confirm password'
  } else if (data.password !== data.confirmPassword) {
    document.getElementById('confirm-password-error')
      .innerText = "Password didn't match"
  } else {
    document.getElementById('confirm-password-error')
      .innerText = ''
  }
  if (data.firstName !== '' &&
    data.lastName !== '' &&
    data.email !== '' &&
    data.password !== '' &&
    data.confirmPassword !== '' &&
    data.password === data.confirmPassword
  ) {
    model.register(data)
  }
}

controller.login = (dataLogin) => {
  if (dataLogin.email === '') {
    document.getElementById('email-error')
      .innerText = 'Please input email'
  } else {
    document.getElementById('email-error')
      .innerText = ''
  }
  if (dataLogin.password === '') {
    document.getElementById('password-error')
      .innerText = 'Please input password'
  } else {
    document.getElementById('password-error')
      .innerText = ''
  }
  if (dataLogin.email !== '' &&
    dataLogin.password !== ''
  ) {
    model.login(dataLogin)
  }
}

controller.createConversation = (conservation) => {
  if (conservation.title.trim() === '') {
    view.setErrorMessage('conversation-name-error', 'Please input your title message')
  } else {
    view.setErrorMessage('conversation-name-error', '')
  }
  if (conservation.friend.trim() === '') {
    view.setErrorMessage('conversation-email-error', 'Please input your friend email')
  } else {
    view.setErrorMessage('conversation-email-error', '')
  }
  if (conservation.title !== '' && conservation.friend !== '') {
    model.createConversation({
      title: conservation.title,
      users: [conservation.friend, model.currentUser.email],
      createdAt: new Date().toLocaleString(),
      messages: []
    })
  }
}
