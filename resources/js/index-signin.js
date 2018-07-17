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
                
                    // The signed-in user info.

                    // debugger;
                    $('.content').show();
        
                });
            }
        });


        $(this).removeClass('signIn')
            .addClass('signOut')
            .html('Sign Out Of Google');
    });

    $(document).on('click', '.signOut', function () {
        console.log('clicked log out')
        firebase.auth().signOut().then(function () {
            $('.content').hide();
        }, function (error) {
            // An error happened.
        });
        window.location = "https://www.google.com/accounts/Logout?continue="
        window.location = "index.html"
    });

    function loggedIn() {
        window.location = 'search.html'
    }



});