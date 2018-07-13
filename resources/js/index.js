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




    //_____________BAND IN TOWN EVENT SEARCH


    function bandsInTownEvent() {
        $(".searchresult").empty();
        artistTerm = $("#artist-input").val().trim();
        // searchVenue = $("#city-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20') || artistTerm.replace('/', '%252F') || artistTerm.replace('?', '%253F') && artistTerm.replace('*', ' %252A') || artistTerm.replace('"', ' %27C');

        url = "https://rest.bandsintown.com/artists/" + replacedSearchTerm + "/events?app_id=9ac9ab26c18a220660a4a733194e08fc";


        $.getJSON(url, function (data) {

                console.log(data);

                // If Array is Empty
                if (!Array.isArray(data) || !data.length) {

                    console.log("There are no results!");

                }
                // If Array Has Data
                else {
                    if (citySelected == true) {
                        cityLoop(data);
                    
                } else {
                    displayResults(data);
                }
            }
        })
};

function cityLoop(array) {

    const noMatchCityArr = [];
    const matchCityArray = [];
    city = cityTerm;

    // Loop through array checking for matching values
    for (let i = 0; i < array.length; i++) {

        // If object city === user input city
        if (array[i].venue.city + ", " + array[i].venue.region + ", USA" == cityTerm) {
            console.log("match");
            matchCityArray.push(array[i]);
        } else {
            noMatchCityArr.push(array[i]);
        }
    }

    // If Array is Empty
    if (!Array.isArray(matchCityArray) || !matchCityArray.length) {
        console.log("No City!");
        const resultElement = $("#results");
       $(".searchresult").append('<p id="no match">' + toTitleCase(artistTerm) + " has no upcoming concerts in " + cityTerm + '</p>');
        // displayResults(noMatchCityArr);
    }
    // Run function to print results to page
    else {
        displayResults(matchCityArray);
    }
}

// Function only used to display results to page
function displayResults(array) {
    //   console.log("checking");

    // Target element to insert data
    const resultElement = $("#results");

    // Loop through array and append data to page
    for (let i = 0; i < array.length; i++) {
        var oneResult = $("<div>");
        oneResult.addClass("oneResult");
        var eventName = $("<p>").text(array[i].description);
        var venueName = $("<p>").text(array[i].venue.name);
        var eventDateTime = $("<p>").text(array[i].datetime);

        var oneResult = $("<div>");
        oneResult.addClass("oneResult");
        //console.log(cityMatchArr[b].description);

        oneResult.append(toTitleCase(artistTerm), eventName, venueName, eventDateTime);
        $(".searchresult").append(oneResult);
    }
}



function toTitleCase(str) {
    if (str.length > 0) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
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
        // cityMatchArr = [];
    }
    console.log("city selected is " + citySelected);
    // console.log("search was pressed");
    // $(".modal").hide();
    // $(".fade").hide();
    $(".searchresult").empty();
    bandsInTownArtist();
    bandsInTownEvent();

    //checkCity();
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



var map = new GMaps({
    div: '#map',
    lat: 39.7392,
    lng: -104.9903
});


});