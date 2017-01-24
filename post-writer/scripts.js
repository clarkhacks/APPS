var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var saveDate = year + "-" + month + "-" + day;
document.getElementById("postWriteImg").value = getSavedValue("postWriteImg"); // set the value to this input
document.getElementById("postWriteTags").value = getSavedValue("postWriteTags"); // set the value to this input
document.getElementById("postWriteDesc").value = getSavedValue("postWriteDesc"); // set the value to this input
document.getElementById("postWriteTitle").value = getSavedValue("postWriteTitle"); // set the value to this input
/* Here you can add more inputs to set value. if it's saved */

//Save the value function - save it to localStorage as (ID, VALUE)
function saveValue(e) {
  var id = e.id; // get the sender's id to save it .
  var val = e.value; // get the value.
  localStorage.setItem(id, val); // Every time user writing something, the localStorage's value will override .
}

//get the saved value function - return the value of "v" from localStorage.
function getSavedValue(v) {
  if (localStorage.getItem(v) === null) {
    return ""; // You can change this to your defualt value.
  }
  return localStorage.getItem(v);
}

new SimpleMDE({
  element: document.getElementById("postWriteBody"),
  forceSync: true,
  autosave: {
    enabled: true,
    uniqueId: "postWriteBody",
    delay: 1000,
  },
  blockStyles: {
    bold: "__",
    italic: "_"
  },
  status: false,
  hideIcons: ["side-by-side", "guide"]
});

function saveTextAsFile() {
  var postSaveTitle = document.getElementById("postWriteTitle").value;
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var metaTitle = "title:" + postSaveTitle + "\n"
  var postLayout = "layout: post\n";
  var saveDate = year + "-" + month + "-" + day;
  var saveToName = saveDate + "-" + postSaveTitle;
  var postSaveDesc = "desc: " + document.getElementById("postWriteDesc").value + "\n";
  var postSaveContent = document.getElementById("postWriteBody").value;
  var postSaveTags = "tags:\n" + "- " + document.getElementById("postWriteTags").value.replace(/,/g, "\n-") + "\n";
  var postSaveImg = "img: https://clarkhacks.com/a/img/" + document.getElementById("postWriteImg").value + "\n";
  var textToWrite = "---\n" + postLayout +  metaTitle + postSaveImg + postSaveDesc + postSaveTags + "\n ---\n" + postSaveContent;
  //  create a new Blob (html5 magic) that conatins the data from your form feild
  var textFileAsBlob = new Blob([textToWrite], {
    type: 'md/markdown'
  });
  // Specify the name of the file to be saved
  var fileNameToSaveAs = saveToName + ".md";
  fileNameToSaveAs = fileNameToSaveAs.replace(/\s+/g, "-");
  var downloadLink = document.createElement("a");
  // grab the content of the form field and place it into a variable

  downloadLink.download = fileNameToSaveAs;
  // provide text for the link. This will be hidden so you
  // can actually use anything you want.
  downloadLink.innerHTML = "My Hidden Link";

  // allow our code to work in webkit & Gecko based browsers
  // without the need for a if / else block.
  window.URL = window.URL || window.webkitURL;

  // Create the link Object.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  // when link is clicked call a function to remove it from
  // the DOM in case user wants to save a second file.
  downloadLink.onclick = destroyClickedElement;
  // make sure the link is hidden.
  downloadLink.style.display = "none";
  // add the link to the DOM
  document.body.appendChild(downloadLink);

  // click the new link
  downloadLink.click();
}

function destroyClickedElement(event) {
  // remove the link from the DOM
  document.body.removeChild(event.target);
}
document.getElementById("postWriteDate").innerHTML = "<p>" + saveDate + "</p>";
// EOF
