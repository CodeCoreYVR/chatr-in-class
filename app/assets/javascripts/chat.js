function Q (query) { return document.querySelector(query) }

// 👇 how to post a message with fetch
function postMessage(body) {
  const fData = new FormData();
  fData.set('body', body)

  return fetch(
    '/messages',
    {
      method: 'post',
      body: fData
    }
  )
}

// 👇 how to update a message with fetch
function updateMessage(id, body) {
  const fData = new FormData();
  fData.set('body', body)

   return fetch(
    `/messages/${id}`,
    {
      method: 'put',
      body: fData
    }
  )
}

function getMessages () {
  // fetch is a Native Browser API
  // It allows us to make web requests with JavaScript
  // that will not cause the browser to reload

  // By default, fetch will a GET request to the URL provided
  // as the first argument
  // 👇 URL: '/messages' METHOD: GET
  return fetch('/messages?order=desc').then(response => response.json())
  // Fetch is promised based and always returns a promise that resolves
  // with the response object
}

function renderMessages (messages) {
  return messages.map(m => `
    <li data-id="${m.id}">
      <strong>${m.username}</strong>
      ${m.body}
      <i class='delete-button'>X</i>
    </li>
    `).join('')
}

function refreshMessages() {
  const messageList = Q('#messages');
  return getMessages()
    .then(messages => {
      // to experiment with the messages object
      // let's make a global variable which will make accessible in the console
      // window.messages = messages;
      messageList.innerHTML = renderMessages(messages)
    })
}

function postMessageAsJson (message) {
  // to make a json request, we must specify some HTTP headers:
  // - Accept: asks the server to reply with specified data types
  // - Content-Type: tells the server that our request is of that data type
  // 👇 in that case, application/json for both
  const jsonHeaders = new Headers({
    'Accept': 'application/json, */*',
    'Content-Type': 'application/json'
  })

  return fetch('/messages', {
    method: 'post',
    headers: jsonHeaders,
    // assuming message is a plain js object, we need to serialize into
    // json before sending as the body of our ajax request
    body: JSON.stringify(message)
  })
}


document.addEventListener('DOMContentLoaded', () => {
  const messageList = Q('#messages');
  const messageForm = Q('form');

  messageForm.addEventListener('submit', event => {
    // don't submit, don't reload the page
    event.preventDefault()

    // FormData is a browser API object
    // it can be constructed with a form node to extract all of the values
    // from the form's input fields
    // or, it can be used on its own to simulate form such as for sending images
    // and files
    const fData = new FormData(event.currentTarget);

    // setting & getting params on FormData
    // fData.set('body', 'Hello, World!');
    // fData.get('body')

    // to do a post request with fetch
    // as a second argument give an object
    // that the method defined as a property
    // and property, body, that holds the data
    fetch('/messages', {
      method: 'post',
      body: fData
    }).then(refreshMessages);
  })

  messageList.addEventListener('click', event => {
    const {target} = event;

    // this pattern of listennig for events on a container node of the target
    // we intend work with is called delegation
    // it's useful when working nodes that created & deleted frequently
    // this way we only need one eventListener as opposed to one for each
    // node that's get created
    if (target.classList.contains('delete-button')) {
      event.stopPropagation();
      const messageId = target.parentElement.getAttribute('data-id');
      fetch(`/messages/${messageId}`, {method: 'delete'})
        // .then(() => refreshMessages());
        // .then will call whatever function we pass it when the promise is resolved
        .then(refreshMessages);
    }
  })

  setInterval(refreshMessages, 2000);
})
