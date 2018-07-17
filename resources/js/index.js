// for last fm Shared secret	50430e261d47ee60d575c432c912c0e5
//band in town id 9ac9ab26c18a220660a4a733194e08fc
//create an array to store all city matches, if array has results, display them, if no results display sign no match
$(document).ready(function () {
   
    var artistTerm;
    var cityTerm;
    var citySelected = false;


    // ______________________________ LAST FM DATA API CALL _____________________________________________
    function getLastFm() {
        artistTerm = $("#artist-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20');
        url = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + replacedSearchTerm + "&api_key=a63e099b17dfc041516f78ab8c3e3d5c&format=json"


        $.getJSON(url, function (response) {
            $(".description").empty();

            $(".artist-name").empty();

            console.log(url);
            console.log(response);

            console.log(response.artist.bio.summary)
            artistBio = $("<p>").html(response.artist.bio.summary);
            artistName = $("<p>").text(response.artist.name);
            $(".artist-name").append(artistName);
            $(".description").append(artistBio);

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

            // console.log(data);

            // If Array is Empty
            if (!Array.isArray(data) || !data.length) {
                // displayResults(data.error);
                // console.log("There are no results!");

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

                matchCityArray.push(array[i]);
            } else {
                noMatchCityArr.push(array[i]);
            }
        }


        // If Array is Empty
        if (!Array.isArray(matchCityArray) || !matchCityArray.length) {

            $(".searchresult").append('<p id="no-match">' + toTitleCase(artistTerm) + " has no upcoming concerts in " + cityTerm + '</p>');
            // displayResults(noMatchCityArr);
        }
        // Run function to print results to page
        else {
            displayResults(matchCityArray);
        }
    }






    // Function only used to display results to page
    function displayResults(array) {

        // Loop through array and append data to page
        for (let i = 0; i < array.length; i++) {
            var oneResult = $("<div class ='oneResult' data-lat='' data-lng='' data-link=''>");

            //console.log(artistTerm);
            var artistName = toTitleCase(artistTerm);
            var convertDateTime = moment(array[i].datetime).format("dddd, MMMM Do YYYY" + "</br>" + " h:mm a");

            // console.log(convertDateTime)

            var eventInfo = $("<div>").addClass("floatLeft").html("<h3>" + (toTitleCase(artistTerm)) + "</h3>" + "<p>" + array[i].venue.name + "<br>" + array[i].venue.city + ", " + array[i].venue.region + "</p>");
            var eventLocation = $("<div>").addClass("floatRight").html("<p>" + convertDateTime + "</p>" + "<div class='result-buttons'>");


            var lat = array[i].venue.latitude;
            var lng = array[i].venue.longitude;
            var ticketLink = array[i].offers[0].url;
            //STORING CONCERT DATA AS AN ATTRIBUTE

            oneResult.attr("data-lat", lat);
            oneResult.attr("data-lng", lng);
            oneResult.attr("data-link", ticketLink);
            oneResult.attr("data-name", artistName);
            oneResult.attr("data-venue", array[i].venue.name);
            oneResult.attr("data-city", array[i].venue.city);
            oneResult.attr("data-event", array[i].description);
            oneResult.attr("data-time", convertDateTime);

            //div to store data
            //Josie Did This code
            // eventDateTime = moment(eventDateTime).format("MMM Do, YYYY hh:mm");
            // eventDateTime = $("<p>" + eventDateTime + "</p>")
            // $("<div id='concertinfo'></div>").data(lat,lng,ticketLink)
            // console.log("#concertinfo");


            // var oneResult = $("<div>");
            // oneResult.addClass("oneResult");
            //console.log(cityMatchArr[b].description);
            oneResult.append(eventInfo, eventLocation);
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


    // ADDING CONCERT TO .oneresult DETAILS UPON CLICKING SEARCH RESULT





    function showConcert(newLat = 39.7392, newLng = -104.9903) {

        var map = new GMaps({
            div: '#map',
            lat: newLat,
            lng: newLng,
        });
        map.addMarker({
            lat: newLat,
            lng: newLng,

        });
        bandsInTownArtist();

    }

    // $(".oneResult").on("click", function () {

    $(document).on('click', '.oneResult', function () {
        var newLat = $(this).data("lat");
        var newLng = $(this).data("lng");
        var newTicket = $(this).data("link");

        var heart = $("<i>").addClass("fas fa-heart");
        var ticket = $("<i>").addClass("fas fa-ticket-alt");

        $(".result-buttons").empty();
        var faveBtn = $("<div class ='add-fave-btn' data-name='' data-venue='' data-time='' data-event='' data-city='' data-ticket='' data-id=''>")
        var ticketBtn = $("<a target='_blank' href=" + newTicket + ">" + ticket + "</a>");
        ticketBtn.html(ticket);
        faveBtn.html(heart);



        // faveBtn.addClass("add-fave-btn");
        faveBtn.attr("data-ticket", $(this).attr("data-link"));
        faveBtn.attr("data-name", $(this).attr("data-name"));
        faveBtn.attr("data-venue", $(this).attr("data-venue"));
        faveBtn.attr("data-time", $(this).attr("data-time"));
        faveBtn.attr("data-event", $(this).attr("data-event"));
        faveBtn.attr("data-city", $(this).attr("data-city"));

        $(".result-buttons").append(faveBtn);
        $(".result-buttons").append(ticketBtn);


        showConcert(newLat, newLng, newTicket);

        $(document).on('click', '.oneResult', function () {
            var newLat = $(this).data("lat");
            var newLng = $(this).data("lng");
            var newTicket = $(this).data("link");


            showConcert(newLat, newLng, newTicket);

        });
    });
    //testcomment

    const fb_db = firebase.database().ref()

    $(document).on('click', '.add-fave-btn', function () {
        name = $(this).data("name");
        venue = $(this).data("venue");
        time = $(this).data("time");
        event = $(this).data("event");
        city = $(this).data("city");
        ticket = $(this).data("ticket");
        var myRef = fb_db.child(globalUserId).push();
        var oneFaveId = myRef.getKey();
       $(this).attr("data-id", oneFaveId);

        // var oneFaveId = myRef.child("posts").push().getKey();;

        data = {
            "name": name,
            "venue": venue,
            "time": time,
            "event": event,
            "city": city,
            "ticket": ticket,
            "id": oneFaveId
        };
        //debugger
        fb_db.child(globalUserId).child(oneFaveId).set(data);
        console.log(oneFaveId);
    });



    //_____________BAND IN TOWN ARTIST SEARCH

    function bandsInTownArtist() {
        artistTerm = $("#artist-input").val().trim();
        // searchVenue = $("#city-input").val().trim();
        var replacedSearchTerm = artistTerm.replace(' ', '%20') || artistTerm.replace('/', '%252F') || artistTerm.replace('?', '%253F') && artistTerm.replace('*', ' %252A') || artistTerm.replace('"', ' %27C');



        url = "https://rest.bandsintown.com/artists/" + replacedSearchTerm + "?app_id=9ac9ab26c18a220660a4a733194e08fc";


        $.getJSON(url, function (data) {
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
        getLastFm();
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





});