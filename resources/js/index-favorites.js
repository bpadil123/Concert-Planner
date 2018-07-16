$(document).ready(function () {
  // Initialize Firebase

  // firebase.initializeApp(config);
  // var provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('profile'); provider.addScope('email');


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;

      var globalUserId = user.uid;
      console.log(displayName);
      $(".user-name").text(displayName + "'s Favorite Concerts");
      const fb_db = firebase.database().ref()
      fb_db.child(globalUserId).on("child_added", function (childSnapshot) {
        //  console.log(childSnapshot.val().city);
        //  console.log(childSnapshot.val().event);
        //  console.log(childSnapshot.val().name);
        //  console.log(childSnapshot.val().time);
         console.log(childSnapshot.val().ticket);
        // append to our table of favorites, inside tbody, with a new row of the data
        $("#data-favorites").append(
          "<i id='remove' class='fas fa-times'></i><h3>" + childSnapshot.val().name + "</h3>" +
          "<div class='time'>" + childSnapshot.val().time + "</div>" +
          "<div class='venue'>" + childSnapshot.val().venue + "</div>" +
          "<div class='city'>" + childSnapshot.val().city + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</div>" + 
          "<a target='_blank' href='" + childSnapshot.val().ticket +"'><i id='ticket-fav' class='fas fa-ticket-alt'></>" + "</a><hr>"
        );
      })



      // append to our table of favorites, inside tbody, with a new row of the data
      // debugger


      //database.ref().on("child_added", function (childSnapshot) {
    } else {
      $(".user-name").text("Sign In To Access Favorites");

      // ...
    }
  });


});