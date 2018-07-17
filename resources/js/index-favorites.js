var oneFaveId;
var globalUserId;
$(document).ready(function () {
  // Initialize Firebase

  // firebase.initializeApp(config);
  // var provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('profile'); provider.addScope('email');

  
    $(".box1,.box2").hide();

    $(".slide-toggle1").click(function () {
        $(".box1").animate({
            width: "toggle"
        });

    });
    $(".slide-toggle2").click(function () {

        $(".box2").animate({
            width: "toggle"
        });
    });



  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;


      globalUserId = user.uid;

      $(".user-name").text(displayName + "'s Favorite Concerts");
      const fb_db = firebase.database().ref()
      fb_db.child(globalUserId).on("child_added", function (childSnapshot) {
        //  console.log(childSnapshot.val().city);
        //  console.log(childSnapshot.val().event);
        //  console.log(childSnapshot.val().name);
        //  console.log(childSnapshot.val().time);
        //  console.log(childSnapshot.val().ticket);
        console.log(childSnapshot.val().id)
        //  oneFaveId = childSnapshot.val().id;
        //  console.log(oneFaveId);
        // append to our table of favorites, inside tbody, with a new row of the data

        $("#data-favorites").append(
          '<div class="oneFave">' +
          "<i class='fas fa-times remove' data-id=" + childSnapshot.val().id + "></i><h3>" + childSnapshot.val().name + "</h3>" +
          "<div class='time'>" + childSnapshot.val().time + "</div>" +
          "<div class='venue'>" + childSnapshot.val().venue + "</div>" +
          "<div class='city'>" + childSnapshot.val().city + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</div>" +
          "<a target='_blank' href='" + childSnapshot.val().ticket + "'><i id='ticket-fav' class='fas fa-ticket-alt'></>" + "</a><hr></div>"
        );
      })

      $(document).on('click', '.remove', function () {

        oneFaveId = $(this).data("id");
        deleteRecord(oneFaveId);
        $(this).parent().remove();
        console.log("this item was removed");

      });
      // append to our table of favorites, inside tbody, with a new row of the data

      function deleteRecord(key) {
        var refDB = firebase.database().ref(globalUserId + "/" + oneFaveId);

        refDB.remove()
          .then(function () {
            console.log("Remove succeeded.")
          })
          .catch(function (error) {
            console.log("Remove failed: " + error.message)
          });
      }


      //database.ref().on("child_added", function (childSnapshot) {
    } else {
      $(".user-name").text("Sign In To Access Favorites");

      // ...
    }
  });

  function displayResults() {

  }

  


});