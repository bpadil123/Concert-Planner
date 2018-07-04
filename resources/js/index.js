// API key	a63e099b17dfc041516f78ab8c3e3d5c
// Shared secret	50430e261d47ee60d575c432c912c0e5

var lstFmKey = "a63e099b17dfc041516f78ab8c3e3d5c";


var searchTerm;




function getLastFm() {
    searchTerm = $("#search-input").val().trim();
    url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + searchTerm + "&api_key=a63e099b17dfc041516f78ab8c3e3d5c&format=json"


    $.getJSON(url, function (data) {
        console.log(url);
        console.log(data);
        console.log(data.artist.bio.content);

    })
}



$("#search-btn").on("click", function () {
    
    getLastFm();
})