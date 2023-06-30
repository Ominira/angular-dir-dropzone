# angular-dir-dropzone
AngularJS (v1.x.x) directive for DropZone.js

As of this latest commit, dropzone version used was v3.7.1

### To Use:

inject ```ngDirDropZone``` into your Angular Module dependency declaration

write html template directive as such

```html
<div id="" class="" data-drop-box data-upload-url=""></div>
```

### Here you go Brian :). Thank You. It's gonna be alright :)

###### for you again Brian :)

the below was curled from the ```login.html``` with a page embedded ```js``` declared ```<script type="module">```
```js
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initializeAnalytics(app);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
const querySnapshot = await getDocs(collection(db, "users"));
//console.log("Scope: ",angular.element(".login").scope());
querySnapshot.forEach((doc) => {
    angular.element(".login").scope().login.userData.push(doc.data());
  //console.log(`${doc.id} => `, doc.data());
});
```
To understand the above, ref the ```angular.element("").scope()```

in the login view template, had this
```html
<div class="container text-center login"></div>
```
excerpt from the ```app.js``` $routeProvider
```js
.when('/login', {
    templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        isLogin: true
    })
```
excerpt from the login controller
```js
angular.module('ejournalApp')
  .controller('LoginCtrl', function ($log, $scope, eJournalAppService, $rootScope) {
    this.userData = [];
})
```
Excerpt from the ```eJournalAppService```, depicting the ```setWithExpiry``` and ```getWithExpiry``` (Mutator & Accessor) from the ```localStorage```
```js
angular.module('ejournalApp')
  .factory('eJournalAppService', function ($mdToast, $log) {
    // Service logic
    // ...
    function setWithExpiry(key, value, ttl) {
      const now = new Date();

      // `item` is an object which contains the original value
      // as well as the time when it's supposed to expire
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      localStorage.setItem(key, JSON.stringify(item));
    }

    function getWithExpiry(key) {
      const itemStr = localStorage.getItem(key);
      // if the item doesn't exist, return null
      if (!itemStr) {
        return null;
      }
      const item = JSON.parse(itemStr);
      const now = new Date();
      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    }

    const localStorageKeys = {
      ACCOUNT_DETAILS: 'account',
    };
    
    // Public API here
    return {
      AccountSession: function (userData) {
        setWithExpiry(localStorageKeys.ACCOUNT_DETAILS, userData, 30 * 60 * 1000);
      },
      getAccountSession: function () {
        return getWithExpiry(localStorageKeys.ACCOUNT_DETAILS);
      },
      deleteAccountSession: function () {
        localStorage.removeItem(localStorageKeys.ACCOUNT_DETAILS);
      }
    };
  });

```

#### For Brian, the Login Samplee
login.html
```html
<div class="container text-center login">
    <h1>Transactions eJournal</h1>
    
    <div class="card border w-50 mx-auto bg-dark border-warning">
        <div class="card-header text-center text-white h3">
            Login
        </div>
        <div class="card-body bg-dark text-start">
            <md-content layout-padding>
                <div>
                    <md-input-container class="md-block" flex-gt-sm>
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" ng-model="login.username" required data-ng-keypress="login.initDoLogin($event)">
                    </md-input-container>

                    <md-input-container class="md-block" flex-gt-sm>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" ng-model="login.password" required data-ng-keypress="login.initDoLogin($event)">
                    </md-input-container>
                </div>
                <div class="text-center">
                    <md-button class="py-1 px-4 md-raised md-primary md-hue-2 text-white btn btn-lg w-50 rounded-pill" data-ng-click="login.doLogin()">
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" data-ng-if="loginLoading"></span>
                        Submit
                    </md-button>
                </div>
            </md-content>
        </div>
    </div>
</div>
<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
    import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
    //import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // import { initializeApp } from "/bower_components/firebase/firebase-app.js";
    // import { getFirestore } from "/bower_components/firebase/firebase-firestore.js";
    //import { initializeAnalytics, getAnalytics } from "/bower_components/firebase/firebase-analytics.js";
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    //initializeAnalytics(app);
    const db = getFirestore(app);
    //const analytics = getAnalytics(app);
    const querySnapshot = await getDocs(collection(db, "users"));
    //console.log("Scope: ",angular.element(".login").scope());
    querySnapshot.forEach((doc) => {
        angular.element(".login").scope().login.userData.push(doc.data());
      //console.log(`${doc.id} => `, doc.data());
    });
</script>
```
login.js
```js
'use strict';

/**
 * @ngdoc function
 * @name ejournalApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ejournalApp
 */
angular.module('ejournalApp')
  .controller('LoginCtrl', function ($log, $scope, eJournalAppService, $rootScope) {
    this.userData = [];

    // $scope.$watch('login.userData', function (newValue, oldValue) {
    //   $log.log('User Data: ', newValue);
    //   $log.log('Old User Data: ', oldValue);
    // }, true);

    this.doLogin = function () {
      if (_.isEmpty(this.userData)) {
        eJournalAppService.showSimpleToast('Unable to connect to Database');
        return;
      }

      if (!_.isEmpty(this.userData)) {
        if (_.isEmpty(this.username)) {
          eJournalAppService.showSimpleToast('Username is Required');
          return;
        }
        if (_.isEmpty(this.password)) {
          eJournalAppService.showSimpleToast('Password is Required');
          return;
        }
        $scope.loginLoading = true;

        let userFound = this.userData.some(el => el.username === this.username);
        if (!userFound) {
          eJournalAppService.showSimpleToast('Username not found. Contact Administrator');
          $scope.loginLoading = false;
          return;
        }

        let passwordFound = this.userData.some(el => el.username === this.username && el.password === this.password);
        if (!passwordFound) {
          eJournalAppService.showSimpleToast('Password incorrect. Try again');
          $scope.loginLoading = false;
          return;
        }

        let user = _.find(this.userData, el => el.username === this.username && el.password === this.password);

        eJournalAppService.setAccountSession(user);
        $rootScope.account = eJournalAppService.getAccountSession();

        $rootScope.goTo('/');
      }
    };

    this.initDoLogin = function (keyEvent) {
      //$log.log('KeyEvent: ', keyEvent);
      if (keyEvent.keyCode === 13) {
        this.doLogin();
      }
    };

  });
```
