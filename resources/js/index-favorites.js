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
      $(".user-name").text(displayName + "'s favorite concerts");
      const fb_db = firebase.database().ref()
      fb_db.child(globalUserId).on("child_added", function (childSnapshot) {
        //  console.log(childSnapshot.val().city);
        //  console.log(childSnapshot.val().event);
        //  console.log(childSnapshot.val().name);
        //  console.log(childSnapshot.val().time);
         console.log(childSnapshot.val().ticket);
        // append to our table of favorites, inside tbody, with a new row of the data
        $("#table-data").append(
          "<tr><td>" + childSnapshot.val().name + "</td>" +
          "<td>" + childSnapshot.val().time + "</td>" +
          "<td>" + childSnapshot.val().venue + "</td>" +
          "<td>" + childSnapshot.val().city + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td>" + 
          "<td><a target='_blank' href=" + childSnapshot.val().ticket +"<button> get ticket </button>" + "</a></td></tr>"
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