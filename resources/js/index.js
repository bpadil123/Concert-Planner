var searchTerm;

function getWikipedia() {
    searchTerm = $("#search-input").val().trim();


    url = "https://www.wikipedia.org//w/api.php?action=query&format=json&list=search&srsearch=" +
        searchTerm +
        "&srnamespace=0&srlimit=10&callback=?"


    $.getJSON(url, function (data) {
        console.log(url);
        console.log(data.query.search[0].snippet);

    })
}


$("#search-btn").on("click", function () {
    getWikipedia();
})