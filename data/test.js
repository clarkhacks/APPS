
$.getJSON('//ipinfo.io/json', function(data) {
    var ipInfo = (JSON.stringify(data, null, 2));
    ipInfoParse = JSON.parse(ipInfo);;
    userIp = ipInfoParse.ip;
    userHost = ipInfoParse.hostname;
    userCity = ipInfoParse.city;
    userRegion = ipInfoParse.region;
    userCountry = ipInfoParse.country;
    userOrg = ipInfoParse.org;
    userPost = ipInfoParse.postal;
    $("#ip").append(userIp);
    $("#hostname").append(userHost);
    $("#city").append(userCity);
    $("#region").append(userRegion);
    $("#country").append(userCountry);
    $("#org").append(userOrg);
    $("#post").append(userPost);

// Battery Status

navigator.getBattery().then(function(battery) {
    function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener('chargingchange', function() {
        updateChargeInfo();
    });

    function updateChargeInfo() {
        batStat = ("Battery charging? " +
            (battery.charging ? "Yes" : "No"));
        document.getElementById('batteryStat').innerHTML = batStat;
    }

    battery.addEventListener('levelchange', function() {
        updateLevelInfo();
    });

    function updateLevelInfo() {
        batLevel = ("Battery level: " +
            battery.level * 100 + "%");
        document.getElementById('batteryLev').innerHTML = batLevel;
    }

});
// device data

var module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataos: [{
            name: 'Windows Phone',
            value: 'Windows Phone',
            version: 'OS'
        },
        {
            name: 'Windows',
            value: 'Win',
            version: 'NT'
        },
        {
            name: 'iPhone',
            value: 'iPhone',
            version: 'OS'
        },
        {
            name: 'iPad',
            value: 'iPad',
            version: 'OS'
        },
        {
            name: 'Kindle',
            value: 'Silk',
            version: 'Silk'
        },
        {
            name: 'Android',
            value: 'Android',
            version: 'Android'
        },
        {
            name: 'PlayBook',
            value: 'PlayBook',
            version: 'OS'
        },
        {
            name: 'BlackBerry',
            value: 'BlackBerry',
            version: '/'
        },
        {
            name: 'Macintosh',
            value: 'Mac',
            version: 'OS X'
        },
        {
            name: 'Linux',
            value: 'Linux',
            version: 'rv'
        },
        {
            name: 'Palm',
            value: 'Palm',
            version: 'PalmOS'
        }
    ],
    databrowser: [{
            name: 'Chrome',
            value: 'Chrome',
            version: 'Chrome'
        },
        {
            name: 'Firefox',
            value: 'Firefox',
            version: 'Firefox'
        },
        {
            name: 'Safari',
            value: 'Safari',
            version: 'Version'
        },
        {
            name: 'Internet Explorer',
            value: 'MSIE',
            version: 'MSIE'
        },
        {
            name: 'Opera',
            value: 'Opera',
            version: 'Opera'
        },
        {
            name: 'BlackBerry',
            value: 'CLDC',
            version: 'CLDC'
        },
        {
            name: 'Mozilla',
            value: 'Mozilla',
            version: 'Mozilla'
        }
    ],
    init: function() {
        var agent = this.header.join(' '),
            os = this.matchItem(agent, this.dataos),
            browser = this.matchItem(agent, this.databrowser);

        return {
            os: os,
            browser: browser
        };
    },
    matchItem: function(string, data) {
        var i = 0,
            j = 0,
            html = '',
            regex,
            regexv,
            match,
            matches,
            version;

        for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, 'i');
            match = regex.test(string);
            if (match) {
                regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                matches = string.match(regexv);
                version = '';
                if (matches) {
                    if (matches[1]) {
                        matches = matches[1];
                    }
                }
                if (matches) {
                    matches = matches.split(/[._]+/);
                    for (j = 0; j < matches.length; j += 1) {
                        if (j === 0) {
                            version += matches[j] + '.';
                        } else {
                            version += matches[j];
                        }
                    }
                } else {
                    version = '0';
                }
                return {
                    name: data[i].name,
                    version: parseFloat(version)
                };
            }
        }
        return {
            name: 'unknown',
            version: 0
        };
    }
};
var e = module.init(),
    debug = '';

debug += 'os.name: ' + e.os.name + '<br/><br/>';
debug += 'os.version: ' + e.os.version + '<br/><br/>';
debug += 'browser.name: ' + e.browser.name + '<br/><br/>';
debug += 'browser.version: ' + e.browser.version + '<br/><br/>';
debug += 'navigator.userAgent: ' + navigator.userAgent + '<br/><br/>';
debug += 'navigator.appVersion: ' + navigator.appVersion + '<br/><br/>';
debug += 'navigator.platform: ' + navigator.platform + '<br/><br/>';
debug += 'navigator.vendor: ' + navigator.vendor + '<br/><br/>';
document.getElementById('log').innerHTML = debug;

// date

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = mm+'/'+dd+'/'+yyyy;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-xd22YcVwTVjDyq95FU9snzxUUl1tA6Y",
  authDomain: "clarkhacks-db.firebaseapp.com",
  databaseURL: "https://clarkhacks-db.firebaseio.com",
  storageBucket: "clarkhacks-db.appspot.com",
  messagingSenderId: "97763678515"
};
firebase.initializeApp(config);
var database = firebase.database();
var userRef = database.ref("view-data/");
var result = userRef.push({
"Date": today,
"IP": window.userIp,
"Host Name": window.userHost,
"City": window.userCity,
"Region": window.userRegion,
"Country": window.userCountry,
"Org": window.userOrg,
"Zip Code": window.userPost
// "Battery Charging": window.batStat,
// "Battery Percent": window.batLevel,
// "Devie Info": window.debug
})
});
