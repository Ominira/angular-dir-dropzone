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
