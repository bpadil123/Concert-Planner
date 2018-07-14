$(document).ready(function () {
    // Initialize Firebase
   
    // firebase.initializeApp(config);
    // var provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('profile'); provider.addScope('email');


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var globalUserId = user.uid;
           console.log(displayName);
          $(".user-name").text(displayName + "'s favorite concerts");
          const fb_db = firebase.database().ref()
          fb_db.child(globalUserId).on("child_added", function (childSnapshot){
             console.log(childSnapshot.val().city);
             console.log(childSnapshot.val().event);
             console.log(childSnapshot.val().name);
             console.log(childSnapshot.val().time);
             console.log(childSnapshot.val().venue);
          })
          //database.ref().on("child_added", function (childSnapshot) {
        } else {
          $(".user-name").text("sign in to have access to favorites");
          // ...
        }
      });
      

});
