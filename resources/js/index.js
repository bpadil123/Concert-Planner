// for last fm Shared secret	50430e261d47ee60d575c432c912c0e5
//band in town id 9ac9ab26c18a220660a4a733194e08fc
//create an array to store all city matches, if array has results, display them, if no results display sign no match

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
    var citySelected = false;
    var cityMatchArr = [];

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
        // getLastFm();
    })

    //_____________BAND IN TOWN EVENT SEARCH


    function bandsInTownEvent() {
        artistTerm = $("#artist-input").val().trim();
        // searchVenue = $("#city-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20') || artistTerm.replace('/', '%252F') || artistTerm.replace('?', '%253F') && artistTerm.replace('*', ' %252A') || artistTerm.replace('"', ' %27C');

        url = "https://rest.bandsintown.com/artists/" + replacedSearchTerm + "/events?app_id=9ac9ab26c18a220660a4a733194e08fc";


        $.getJSON(url, function (data) {
            // console.log(data);
            // console.log(url);
            var eventResults = data.response

            //loop to go through all results
            for (var i = 0; i < data.length - 1; i++) {
                var oneResult = $("<div>");
                oneResult.addClass("oneResult");
                //image of artist/event from LastFM **** 


                //name of event/artist
                // console.log(data[i].description)
                var eventName = $("<p>").text(data[i].description);

                //name of venue
                // console.log(data[i].venue.name);
                var venueName = $("<p>").text(data[i].venue.name);


                var eventDateTime = $("<p>").text(data[i].datetime);


                if (citySelected == true) {
                    if (data[i].venue.city + ", " + data[i].venue.region + ", USA" == cityTerm) {
                        console.log("it's a match");
                        // oneResult.text(data[i].venue.city + ", " + data[i].venue.region + ", USA");
                        // oneResult.append(eventName, venueName, eventDateTime);
                        // $(".searchresult").append(oneResult);
                        cityMatchArr.push(data[i]);
                        checkCity();
                    }
                } else {
                    oneResult.text(data[i].venue.city + " " + data[i].venue.region);
                    oneResult.append(eventName, venueName, eventDateTime);
                    $(".searchresult").append(oneResult);
                }
            };
        });
    };

    function toTitleCase(str) {
        if (str.length > 0) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }

    //________________if cityMatchArr has items, display them if not, display 
    // function checkCity() {
    //     if (cityMatchArr.length == 0) {
    //         console.log("array is empty nothing to display")
    //         $(".searchresult").text("City entered does not match any concerts by " + toTitleCase(artistTerm));
    //     } else if(cityMatchArr.length > 0){
    //         console.log(cityMatchArr.length);
    //         console.log("array has stuff in it")
    //         for (var b = 0; b < cityMatchArr.length; b++) {
    //             console.log(b);
    //             var oneResult = $("<div>");
    //             oneResult.addClass("oneResult");
    //             console.log(cityMatchArr[b].description);
    //             var eventName = $("<p>").text(cityMatchArr[b].description);
    //             var venueName = $("<p>").text(cityMatchArr[b].venue.name);
    //             var eventDateTime = $("<p>").text(cityMatchArr[b].datetime);
    //             oneResult.append(toTitleCase(artistTerm),eventName, venueName, eventDateTime);
    //             $(".searchresult").append(oneResult);
    //             // console.log(cityMatchArr[b].venue.name);

    //         }
    //     }
    // }

    function checkCity() {
        if (typeof cityMatchArr != "undefined" && cityMatchArr != null && cityMatchArr.length != null && cityMatchArr.length > 0) {
            // console.log(cityMatchArr.length);
            console.log("array has stuff in it")
            for (var b = 0; b < cityMatchArr.length; b++) {
                // console.log(b);
                var oneResult = $("<div>");
                oneResult.addClass("oneResult");
                //console.log(cityMatchArr[b].description);
                var eventName = $("<p>").text(cityMatchArr[b].description);
                var venueName = $("<p>").text(cityMatchArr[b].venue.name);
                var eventDateTime = $("<p>").text(cityMatchArr[b].datetime);
                oneResult.append(toTitleCase(artistTerm), eventName, venueName, eventDateTime);
                $(".searchresult").append(oneResult);
                // console.log(cityMatchArr[b].venue.name);

            }
        } else if (cityMatchArr == null) {
            console.log("array is empty nothing to display");
            var oneResult = $("<div>");
            oneResult.addClass("oneResult");
            oneResult.text("City entered does not match any concerts by " + toTitleCase(artistTerm));
            $(".searchresult").append(oneResult);
        }
    }



    //_____________BAND IN TOWN ARTIST SEARCH

    function bandsInTownArtist() {
        artistTerm = $("#artist-input").val().trim();
        // searchVenue = $("#city-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20') || artistTerm.replace('/', '%252F') || artistTerm.replace('?', '%253F') && artistTerm.replace('*', ' %252A') || artistTerm.replace('"', ' %27C');



        url = "https://rest.bandsintown.com/artists/" + replacedSearchTerm + "?app_id=9ac9ab26c18a220660a4a733194e08fc";


        $.getJSON(url, function (data) {
            // console.log(data);
            // console.log(url);
            var artistResults = data.response
            //image of artist/event from Artist URL **** 
            $(".artist-image").attr("src", data.thumb_url);

        });
    };








    //_____________SEARCH BUTTON CLICK________________

    $("#search-btn").on("click", function () {
        event.preventDefault();
        cityTerm = $("#city-input").val().trim();
        if (cityTerm != "") {
            citySelected = true;
        } else {
            citySelected = false;
            cityMatchArr = [];
        }
        // console.log("search was pressed");
        // $(".modal").hide();
        // $(".fade").hide();
        $(".searchresult").empty();
        bandsInTownArtist();
        bandsInTownEvent();
        console.log(cityMatchArr);
    })







    // ______________________________ GOOGLE LOCATION AUTOCOMPLETE _____________________________________________

    var input = document.getElementById('city-input');
    // show only cities
    var options = {
        types: ['(cities)'],
        componentRestrictions: {
            country: "us"
        }

    };

    var autocompleteData = new google.maps.places.Autocomplete(input, options);


    // $("#search-btn").on("click", function () {
    //     event.preventDefault();
    //     //console.log($("#city-input").val());
    // })

    //_________________________ CALENDAR POP UP FOR INPUT _____________________________
    $('input[name="dates-input"]').daterangepicker();


    $(function () {
        $('input[name="calendar-pop-up"]').daterangepicker({
            opens: 'left',
            autoApply: true,

        }, function (start, end) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            startGlobal = start.format('YYYY-MM-DD');
            endGlobal = end.format('YYYY-MM-DD')
        });
    });


    //_________ GOOGLE SIGN IN

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    $(document).on('click', '.signIn', function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            $('.content').show();
            loggedIn();

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



});