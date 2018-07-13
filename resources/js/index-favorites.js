$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD68rbaMHr4XzUKdGfHbgjT6u1JMygEilw",
        authDomain: "harmonize-dd029.firebaseapp.com",
        databaseURL: "https://harmonize-dd029.firebaseio.com",
        projectId: "harmonize-dd029",
        storageBucket: "harmonize-dd029.appspot.com",
        messagingSenderId: "419798913580"
    };
    firebase.initializeApp(config);
    var provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('profile'); provider.addScope('email');


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(displayName);
          $(".user-name").append("<p>" + displayName + "'s favorites</p>");
        } else {
          $(".user-name").hide()
        }
      });
      

});
