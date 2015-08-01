var Model = {
    markers: ko.observableArray()
};

function viewModel() {

    var self = this;
    var map, mapOptions;
    var locations;
    self.query = ko.observable('');

    function initialize() {
        var myLatlng = new google.maps.LatLng(42.3455736, -88.2689808);
        mapOptions = {
            center: myLatlng,
            zoom: 13
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var infoWindow = new google.maps.InfoWindow();

        fsURL = "https://api.foursquare.com/v2/venues/explore?ll=42.3455736, -88.2689808&section=food&limit=15&client_id=LJOOHSBYBD4RW3ZOSTYKIE2W0QDGHEUFV5B2TTXCWDSBSKYI&client_secret=AFW5DRM0A3XHYRLNJGMM3C014RB5BCEEITM4NO3TEFVMXBTP&v=20150701"
        $.getJSON(fsURL, function(data) {
            locations = data.response.groups[0].items

            for (var x = 0; x < locations.length; x++) {
                var locPosition = new google.maps.LatLng(locations[x].venue.location.lat, locations[x].venue.location.lng);
                if( locations[x].venue.url){
                    var locURL = "<a href=" + locations[x].venue.url + ">" + locations[x].venue.url + "</a>"
                } 
                else{
                    var locURL = ""
                };
                var contentString = "<span class='title'><b>" + locations[x].venue.name + "</b></span><br>" + 
                        locations[x].venue.location.address + "<br>"+
                        locations[x].venue.location.city + ", " +locations[x].venue.location.state + " " + locations[x].venue.location.postalCode + "<br>" +
                        locURL+ "</a>";
                var marker = new google.maps.Marker({
                    position: locPosition,
                    title: locations[x].venue.name,
                    map: map,
                    content: contentString
                });
                marker.setMap(map);
                Model.markers.push(marker);
                var contentString = locations[x].venue.name;
                google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent(this.content);
                        infoWindow.open(map, this);
                });
            }//end for locations.length loop
        })//end json
    }//end initialize
    if (typeof google === 'object' && typeof google.maps === 'object') {
        google.maps.event.addDomListener(window, 'load', initialize);
    } else {
        document.getElementById('error-message').innerHTML = "Google Maps could not be loaded";
        var myElement = document.querySelector('#error-message');
        myElement.style.backgroundColor = "#eee";
        $('#error-message').css('display','block');
    };
    self.filteredArray = ko.computed(function() {
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(Model.markers(), function(marker) {
             return marker.title.toLowerCase().indexOf(search) >= 0;
            });
    }, self);

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
} //end viewmModel function

ko.applyBindings(viewModel);

document.querySelector("#nav-toggle").addEventListener("click", function() {
    document.getElementById("list").classList.toggle("noList");
})