$('#build').bind('click', function() {
  var inputText = $('#buildInput').val();
  var regMessage = /^#(\d):\s([^#.]*)/gm;
  var messages = inputText.split(regMessage);
  $('#phone').empty();
  for (var i=1; i<messages.length; i=i+3) {
    addMsg(messages[i], messages[i+1]);
  }
  return false;
})
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var isViewMode = getParameterByName('view');
if(isViewMode == "display"){
  $(".build-container").remove();
}
function addMsg(people, msg) {
  
  var side = 'right';
  var $_phone = $('#phone');
  var $_lastMessage = $('#phone .message:last');
  
  if (people == 1) side = 'right';
  if (people == 2) side = 'left';
  
  if ($_lastMessage.hasClass(side)) {
    
    $_lastMessage.append(
      $('<div>').addClass('message-text').text(msg)
    )
    
  } else {
    
    $_phone.append(
      $('<div>').addClass('message '+side).append(
        $('<div>').addClass('message-text').text(msg)
      )
    )
    
  }
  
}