// Dom7
var $$ = Dom7;
var getEl = function (elem){
 return document.getElementById(elem);
}
// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'com.clarkhacks.safteyApp', // App bundle ID
  name: 'SafteyApp', // App name
  theme: 'auto', // Automatic theme detection
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var tipsView = app.views.create('#view-tips', {
  url: '/tips/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  app.loginScreen.close('#my-login-screen');
});

/* event listener */
$$(document).on('page:init', function (e, page) {
  console.log(page.name);
  var map = new GMaps({el: '#map', lat: -12.043333, lng: -77.028333});
  GMaps.geolocate({
    success: function (position) {
      map.setCenter(position.coords.latitude, position.coords.longitude);
    },
    error: function (error) {
      alert('Geolocation failed: ' +
          error.message);
    },
    not_supported: function () {
      alert("Your browser does not support geolocation");
    },
    always: function () {
      alert("Done!");
    }
  });
  if (page.name == 'settings') {
    getEl('userName').addEventListener('keyup', setUserData);
    getEl('userDOB').addEventListener('change', setUserData);
    getEl('userGender').addEventListener('change', setUserData);
    getEl('userDOB').addEventListener('change', setUserData);
    getEl('userPhone').addEventListener('change', setUserData);
    getUserData();
    // Format the phone number as the user types it
    getEl('userPhone').addEventListener('keyup', function (evt) {
      var userPhone = getEl('userPhone');
      var charCode = evt.which ?
        evt.which :
        evt.keyCode;
      userPhone.value = phoneFormat(userPhone.value);
    });

    // We need to manually format the phone number on page load
    getEl('userPhone').value = phoneFormat(getEl('userPhone').value);

    // A function to determine if the pressed key is an integer
    function numberPressed(evt) {
      var charCode = evt.which ?
        evt.which :
        evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 36 || charCode > 40)) {
        return false;
      }
      return true;
    }

    // A function to format text to look like a phone number
    function phoneFormat(input) {
      // Strip all characters from the input except digits
      input = input.replace(/\D/g, '');

      // Trim the remaining input to ten characters, to preserve phone number format
      input = input.substring(0, 10);

      // Based upon the length of the string, we add formatting as necessary
      var size = input.length;
      if (size == 0) {
        input = input;
      } else if (size < 4) {
        input = '(' +
          input;
      } else if (size < 7) {
        input = '(' +
          input.substring(0, 3) +
          ') ' +
          input.substring(3, 6);
      } else {
        input = '(' +
          input.substring(0, 3) +
          ') ' +
          input.substring(3, 6) +
          ' - ' +
          input.substring(6, 10);
      }
      return input;
    }
  }
});

function setUserData() {
  console.log('set');
  store.set('userData', {
    DOB: $$('#userDOB').val(),
    name: $$('#userName').val(),
    email: $$('#userEmail').val(),
    gender: $$('#userGender').val(),
    phone: $$('#userPhone').val()
  });
}

function getUserData() {
  $$('#userDOB').val(store.get('userData').DOB);
  $$('#userName').val(store.get('userData').name);
  $$('#userEmail').val(store.get('userData').email);
  $$('#userGender').val(store.get('userData').gender);
  $$('#userPhone').val(store.get('userData').phone);
}