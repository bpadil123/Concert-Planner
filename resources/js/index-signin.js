var config = {
    apiKey: "AIzaSyD68rbaMHr4XzUKdGfHbgjT6u1JMygEilw",
    authDomain: "harmonize-dd029.firebaseapp.com",
    databaseURL: "https://harmonize-dd029.firebaseio.com",
    projectId: "harmonize-dd029",
    storageBucket: "harmonize-dd029.appspot.com",
    messagingSenderId: "419798913580"
};
firebase.initializeApp(config);
console.warn('Loading index signin:', firebase.auth().currentUser)


var globalUserId;
$(document).ready(function () {



    //_________ GOOGLE SIGN IN

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    $(document).on('click', '.signIn', function () {
       

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                loggedIn();
                // var user = result.user;

                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                globalUserId = uid;
                console.warn('Logged in as', globalUserId)
                // ...
            } else {
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token.
                    // var token = result.credential.accessToken;
                    // The signed-in user info.
        
                   // debugger;
                    $('.content').show();
                    // loggedIn();
                });
            }
        });

        $(this).removeClass('signIn')
            .addClass('signOut')
            .html('Sign Out Of Google');
    });

    $(document).on('click', '.signOut', function () {
        firebase.auth().signOut().then(function () {
            $('.content').hide();
        }, function (error) {
            // An error happened.
        });
        $(this).removeClass('signOut')
            .addClass('signIn')
            .html('Sign In With Google');
    });

    function loggedIn() {
        window.location = 'Concert-Planner/search.html'
    }

    //MAPS//
    // Initialize and add the map
    // function initMap() {
    //     // The location of Uluru
    //     var uluru = {lat: -25.344, lng: 131.036};
    //     // The map, centered at Uluru
    //     var map = new google.maps.Map(
    //         document.getElementById('map'), {zoom: 4, center: uluru});
    //     // The marker, positioned at Uluru
    //     var marker = new google.maps.Marker({position: uluru, map: map});
    //   }
    //   <!--Load the API from the specified URL
    //     * The async attribute allows the browser to render the page while the API loads
    //     * The key parameter will contain your own API key (which is not needed for this tutorial)
    //     * The callback parameter executes the initMap() function
    //     -->
    // function myMap() {
    //     var mapProp = {
    //         center: new google.maps.LatLng(51.508742, -0.120850),
    //         zoom: 5,
    //     };
    //     var map = new google.maps.Map(document.getElementById("map"), mapProp);
    // }

    // Initialize Firebase

    // var provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('profile'); provider.addScope('email');


    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //       var displayName = user.displayName;
    //       var email = user.email;
    //       var emailVerified = user.emailVerified;
    //       var photoURL = user.photoURL;
    //       var isAnonymous = user.isAnonymous;
    //       var uid = user.uid;
    //       var providerData = user.providerData;
    //       console.log(displayName);
    //     } else {
    //       // User is signed out.
    //       // ...
    //     }
    //   });


});