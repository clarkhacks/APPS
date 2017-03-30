
(function() {
  'use strict';

  angular
    .module('myApp', ["firebase"])
    .run(function () {
    var config = {
  apiKey: "AIzaSyC-xd22YcVwTVjDyq95FU9snzxUUl1tA6Y",
  authDomain: "clarkhacks-db.firebaseapp.com",
  databaseURL: "https://clarkhacks-db.firebaseio.com",
  storageBucket: "clarkhacks-db.appspot.com",
  messagingSenderId: "97763678515"
    };
    firebase.initializeApp(config);
    })
    .controller('imagesController', imagesController)
    .directive('customOnChange', customOnChange)

  function imagesController ($firebaseArray) {
    var vm = this;
    var hash = window.location.hash.substring(1);
    if(window.location.hash) {
      var ref = firebase.database().ref("/filehost/images/any-image/"+hash);
      $("#pageTitle").html(hash).css('textTransform', 'capitalize');
      document.title = hash;
    }else {
  var ref = firebase.database().ref("/filehost/images/any-image/public");
};
    var storageService = firebase.storage();

    var list = $firebaseArray(ref);
    vm.images = list;
    vm.deleteImg = deleteImg;
    vm.downloadImg = downloadImg;

    vm.image = function(event){
      event.preventDefault();
        var file = event.target.files[0];
      uploadImage(file);
      };

    function uploadImage(file) {
      var random = parseInt(Math.random() * 1000000);
      var refStorage = storageService.ref('uploads').child(random.toString()).child(file.name);
      var uploadTask = refStorage.put(file);

      uploadTask.on('state_changed', null, function(error){
        console.log('upload error', error);
      }, function() {
        var imageData = {
          url: uploadTask.snapshot.downloadURL,
          bytes: uploadTask.snapshot.totalBytes,
          name: uploadTask.h.name,
          path: uploadTask.h.fullPath,
          date: uploadTask.h.timeCreated
        }

        list.$add(imageData).then(function(ref) {
Materialize.toast('Image Uploaded!', 500);
        });
      }
    );
    }

    function downloadImg(id) {
      var image = list.$getRecord(id);
      window.open(image.url, 'Download');
    }

    function deleteImg(id) {
      var image = list.$getRecord(id);

      swal({
        title: "Are you sure?",
        text: "Do you want to remove this image?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      },
      function(){
        var imgRef = storageService.ref(image.path);

        imgRef.delete().then(function() {
          list.$remove(image).then(function(ref) {
Materialize.toast('Image Deleted!', 3000);
          });
        }).catch(function(error) {
          console.log('an error occurred!', error);
        });
      });

    }
  }
  function customOnChange() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  }

})();
var fullUrl = window.location.href;
var qUrl = fullUrl.substr(fullUrl.indexOf("?=") + 2);
if (qUrl === "ref_Admin") {
 document.getElementById("option-btns").innerHTML = "<a href=\"{{image.url}}\" class=\"btn blue col s6\" download><i class=\"fa fa-download\"><\/i><\/a><a class=\"btn red col s6\" ng-click=\"vm.deleteImg(image.$id)\"><i class=\"fa fa-trash-o\"><\/i><\/a>";
};
