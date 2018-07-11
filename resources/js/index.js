

// for last fm Shared secret	50430e261d47ee60d575c432c912c0e5
//band in town id 9ac9ab26c18a220660a4a733194e08fc
  
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
    
    
    var lstFmKey = "a63e099b17dfc041516f78ab8c3e3d5c";
    
     
    
    var artistTerm;
    var cityTerm;
    var startGlobal;
    var endGlobal;
    
    // ______________________________ LAST FM DATA API CALL _____________________________________________
    function getLastFm() {
        artistTerm = $("#artist-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20');
        url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + replacedSearchTerm + "&api_key=a63e099b17dfc041516f78ab8c3e3d5c&format=json"
    
    
        $.getJSON(url, function (data) {
            console.log(url);
            console.log(data);
            console.log(data.artist.bio.content);
            console.log(data.artist.image[2]);
    
        })
    }
    
    
    $("#search-btn").on("click", function () {
        event.preventDefault();
        getLastFm();
    })
    
    //_____________BAND IN TOWN
    
    
    function bandsInTown() {
        artistTerm = $("#artist-input").val().trim();
        // searchVenue = $("#city-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20');
        // searchStartDate = $("#dates-input").val().trim();
        // searchEndDate = $("#end-input").val().trim();
    
    
        // var artist = searchArtist.replace(' ', '%20');
        // var event = searchVenue.replace(' ', '%20');
    
    
    
        // url = "https://rest.bandsintown.com/artists/sage%20francis/events?app_id=9ac9ab26c18a220660a4a733194e08fc&date=2018-01-01%2C2018-12-31";
    
        url = "https://rest.bandsintown.com/artists/"+ replacedSearchTerm + "/events?app_id=9ac9ab26c18a220660a4a733194e08fc";
    
    
        $.getJSON(url, function (data) {
            console.log(data);
            console.log(url);
            // console.log(url);
            // console.log(data);
            // console.log(data.artist.bio.content);
            // console.log(data.artist.image[2]);
    
        })
    }
    
    
    
    $("#search-btn").on("click", function () {
        event.preventDefault();
        console.log("search was pressed");
        bandsInTown();
    })
    
    // ______________________________ GOOGLE LOCATION AUTOCOMPLETE _____________________________________________
    
    // var input = document.getElementById('city-input');
    // // show only cities
    // var options = {
    //     types: ['(cities)'],
    // };
    
    // var autocompleteData = new google.maps.places.Autocomplete(input, options);
    
    
    // $("#search-btn").on("click", function () {
    //     event.preventDefault();
    //     console.log($("#city-input").val());
    // })
    
    // //_________________________ CALENDAR POP UP FOR INPUT _____________________________
    // $('input[name="dates-input"]').daterangepicker();
    
    
    // $(function () {
    //     $('input[name="calendar-pop-up"]').daterangepicker({
    //         opens: 'left',
    //         autoApply: true,
    
    //     }, function (start, end) {
    //         console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    //         startGlobal = start.format('YYYY-MM-DD');
    //         endGlobal = end.format('YYYY-MM-DD')
    //     });
    // });
    
    
    // $("#search-btn").on("click", function () {
    //     event.preventDefault();
    //     console.log(startGlobal);
    //     console.log(endGlobal);
    // })
    
    //_________ GOOGLE SIGN IN_____________________________________//
    
    var provider = new firebase.auth.GoogleAuthProvider();
     provider.addScope('profile');
     provider.addScope('email');
    
     $(document).on('click', '.signIn', function() {
       firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // $('.content').show();
        loggedIn();
        window.location = 'https://bpadil123.github.io/Concert-Planner/search.html'
       
       });
       $(this).removeClass('signIn')
         .addClass('signOut')
         .html('Sign Out Of Google');
     });
    
     $(document).on('click', '.signOut', function () {
       firebase.auth().signOut().then(function() {
        //  $('.content').hide();
       }, function(error) {
         // An error happened.
       });
       $(this).removeClass('signOut')
         .addClass('signIn')
        //  .html('Sign In With Google');
     });
    
    
    
    });
    
     
    