function loadIframe(){
  var urlParams = new URLSearchParams(window.location.search);
var qUrl = urlParams.get('url');
var qRef = urlParams.get('ref');
var qString = urlParams.toString();
console.log(qUrl);
  if (qref){
    console.log(qRef);
  };
document.getElementById('qFrame').src = qUrl;
}
