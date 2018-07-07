// for last fm Shared secret	50430e261d47ee60d575c432c912c0e5
//band in town id 9ac9ab26c18a220660a4a733194e08fc

var lstFmKey = "a63e099b17dfc041516f78ab8c3e3d5c";


var searchTerm;
var cityTerm;
var startDateTerm;
var endDateTerm;

// ______________________________ LAST FM DATA API CALL _____________________________________________
function getLastFm() {
    searchTerm = $("#search-input").val().trim();
    var replacedSearchTerm = searchTerm.replace(' ', '%20');
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

// ______________________________ GOOGLE LOCATION AUTOCOMPLETE _____________________________________________

var input = document.getElementById('city-input');
// show only cities
var options = {
    types: ['(cities)'],
};

var autocompleteData = new google.maps.places.Autocomplete(input, options);


$("#search-btn").on("click", function () {
    event.preventDefault();
    console.log($("#city-input").val());
})

//_________________________ CALENDAR POP UP FOR INPUT _____________________________
$('input[name="dates-input"]').daterangepicker();
var startGlobal;
var endGlobal;

$(function() {
    $('input[name="calendar-pop-up"]').daterangepicker({
      opens: 'left',
      autoApply: true,
      
    }, function(start, end) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      startGlobal = start.format('YYYY-MM-DD');
      endGlobal = end.format('YYYY-MM-DD')
    });
  });
  
  
  $("#search-btn").on("click", function () {
    event.preventDefault();
    console.log(startGlobal);
    console.log(endGlobal);
})