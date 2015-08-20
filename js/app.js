var Model = {
    markers: ko.observableArray()
};

function viewModel() {
    "used strict";
    var self = this;
    var map, mapOptions, locURL, infoWindow;
    var locations;
    self.query = ko.observable('');
    var currentMarker = null;

    function initialize() {
        var myLatlng = new google.maps.LatLng(42.3455736, -88.2689808);
        mapOptions = {
            center: myLatlng,
            zoom: 13
        };
        map = new google.maps.Map(document.querySelector('.map-canvas'), mapOptions);
        infoWindow = new google.maps.InfoWindow();

        // Using Foursquare API to retrieve list of restaurants
        fsURL = "https://api.foursquare.com/v2/venues/explore?ll=42.3455736, -88.2689808&section=food&limit=15&client_id=LJOOHSBYBD4RW3ZOSTYKIE2W0QDGHEUFV5B2TTXCWDSBSKYI&client_secret=AFW5DRM0A3XHYRLNJGMM3C014RB5BCEEITM4NO3TEFVMXBTP&v=20150701";

        $.getJSON(fsURL, function(data) {
            locations = data.response.groups[0].items;

            // Loop through Foursquare results and add markers to the map. Create an infowindow for each marker.
            var len = locations.length;
            for (var x = 0; x < len; x++) {
                var locPosition = new google.maps.LatLng(locations[x].venue.location.lat, locations[x].venue.location.lng);
                //if  statement to create a blank entry if there is no URL for the restaurant listing
                if( locations[x].venue.url){
                    locURL = '<a target="_blank" href=' + locations[x].venue.url + '>' + locations[x].venue.url + '</a>';
                }
                else{
                    locURL = "";
                }//end if else statement

                // ContentString is for the infoWindow
                var contentString = "<span class='title'><b>" + locations[x].venue.name + "</b></span><br>" +
                    locations[x].venue.location.address + "<br>"+
                    locations[x].venue.location.city + ", " +locations[x].venue.location.state + " " + locations[x].venue.location.postalCode + "<br>" +
                    locURL+ "</a><p>Data by Foursquare</p>";
                var marker = new google.maps.Marker({
                    position: locPosition,
                    title: locations[x].venue.name,
                    map: map,
                    content: contentString
                });//end google.maps.Marker
                marker.setMap(map);
                Model.markers.push(marker);
                contentString = locations[x].venue.name;
                google.maps.event.addListener(marker, 'click', function(){
                    markerBounce(this);
                });//end google event loop
            }//end for locations.length loop*/
        }).error(function(e){
            console.log('json error');
        });//end json error
    }//end initialize

    //If statement to show blank page if Google Map is unavailable
    if (typeof google === 'object' && typeof google.maps === 'object') {
        google.maps.event.addDomListener(window, 'load', initialize);
    } else {
        document.querySelector('.error-message').innerHTML = "Google Maps could not be loaded";
        var myElement = document.querySelector('.error-message');
        myElement.style.backgroundColor = "#eee";
        $('.error-message').css('display','block'); //block error-message
    }

    //Filter list based on search entry
    self.filteredArray = ko.computed(function() {
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(Model.markers(), function(marker) {
             return marker.title.toLowerCase().indexOf(search) >= 0;
            });
    }, self);

    // add or remove markers by comparing to list
    self.missingLocations = ko.computed(function() {
        var differences = ko.utils.compareArrays(Model.markers(), self.filteredArray());
        ko.utils.arrayForEach(differences, function(marker) {
            if (marker.status === 'deleted') {
               marker.value.setMap(null);
            } else {
                marker.value.setMap(map);
            }
        });
    }, self);

    // When list is clicked it retrieves marker from the list
    self.getMarker = function(marker) {
        markerBounce(marker);
    };//end getMarker function

    //bounces the marker when it is either clicked or selected on the list
    function markerBounce(marker) {
        if (currentMarker) currentMarker.setAnimation(null);
        // set this marker to the currentMarker
        currentMarker = marker;
        // add a bounce to this marker
        map.panTo(marker.getPosition());
        infoWindow.setContent(marker.content);
        infoWindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }//end markerBounce

} //end viewModel function

ko.applyBindings(viewModel);

//show or unshow list when hamburger is clicked
document.querySelector(".nav").addEventListener("click", function() {
    document.getElementById("list").classList.toggle("noList");
});

var autoMessage;

window.addEventListener("offline", function(e) {
  autoMessage = setInterval(function(){ alertMessage(); }, 1000);
}, false);

window.addEventListener("online", function(e) {
    clearInterval(autoMessage);
    window.location.reload();
}, false);

function alertMessage() {
    console.log('error');
    document.querySelector('.error-message').innerHTML = 'THERE SEEMS TO BE A PROBLEM. I CANNOT CONNECT TO THE WEBSITE.';
    var myElement = document.querySelector('.error-message');
    myElement.style.backgroundColor = "#eee";
    $('.error-message').css('display','block');//block error-message
    $('.error-message').css('opacity','.5');
}