var DOMAIN = 'http://localhost:3000'

function postMessage (serializedForm) {
  $.post(
    DOMAIN + '/messages',
    serializedForm,
    // {body: messageBody},
    function () {
      console.info('Message was sent ✈️')
    }
  )
}

function getMessages () {

  // We make a AJAX request to the messages#index
  // the function we pass to $.get will receive the data
  // from our server (in this case, messages from the database)
  $.get(DOMAIN + '/messages',
  function (messages) {
    // We generate the html of messages as a bunch of list items
    // for an unordered list
    var messagesBlob = messages
    .map(function (message) {
        return createMessage(message)
      })
    .join("")
    /* outputs:
    <li>Message #1</li><li>Message #2</li><li>Message #3</li>
    */

    // using jQuery we put the html we created above inside the unordered
    // list
    $('#messages').html(messagesBlob);
  })
}

// Takes a message object with a body property and puts that body
// inside a list item (i.e. <li>), returns it
function createMessage (message) {
  return "<li><span>" + message.id + "</span>" + message.body +
  "<i data-id=" + message.id + ">X</i></li>";
}

$(document).ready(function() {
  setInterval(getMessages, 1000);

  $('ul#messages').on('click', 'i', function (event) {
    var messageId =  $(this).attr('data-id');
    $.ajax({
      url: DOMAIN + '/messages/' + messageId,
      method: 'delete'
    })
  })

  $('form').on('submit', function (event) {
    event.preventDefault();
    var $messageBody = $(this).find('[name=body]');

    // .serialize() is a jQuery method that can be used on
    // form nodes to put all of the values from the form's children
    // input fields into a string.
    // This string is very similar to a query
    // param string (i.e. ?name=bob&body=whatisthat)
    // This string can be used as the data property of an ajax request
    postMessage($(this).serialize());
    // Clear the contents of the textarea after submitting
    $messageBody.val('');
  })
});
