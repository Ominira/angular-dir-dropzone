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
