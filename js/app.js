var locations = [
    {
    name: "Windhill Pancake Parlor",
    street: "West Elm St",
    lat: 42.3443318,
    lng: -88.2626109
    },
    {
    name: "Twisted Burger",
    street: "West Elm St",
    lat: 42.3463353,
    lng: -88.2816521
    },
    {
    name: "Green Street Cafe",
    street: "North Green St",
    lat: 42.3448488,
    lng: -88.2670283
    },
    {
    name: "Olive Garden",
    street: "3451 Shoppers Dr",
    lat: 42.367184,
    lng: -88.2670474
    },
    {
    name: "Brunch Cafe",
    street: "414 South Route 31",
    lat: 42.3229107,
    lng: -88.273147
    },
    {
    name: "Happy Jack's Submarine",
    street: "4911 West Elm St",
    lat: 42.3487341,
    lng: -88.2936913
    },
    {
    name: "Vickie's Place",
    street: "1211 N River Rd",
    lat: 42.3450892,
    lng: -88.2599154
    },
    {
    name: "Tacos El Norte",
    street: "4318 West Elm St",
    lat: 42.3479943,
    lng: -88.2812933
    },
    {
    name: "Applebee's",
    street: "1700 N Richmond Rd",
    lat: 42.350895,
    lng: -88.266807
    },
    {
    name: "Chili's Grill & Bar",
    street: "2409 N Richmond Rd",
    lat: 42.3609832,
    lng: -88.2681989
    },
    {
    name: "The Village Squire",
    street: "West Elm St",
    lat: 42.3480982,
    lng: -88.2866883
    }
];

var Model = {
    markers: ko.observableArray()
};

function viewModel() {

    var self = this;
    var map, mapOptions, marker;
    self.query = ko.observable('');

    function initialize() {
        var myLatlng = new google.maps.LatLng(42.3455736, -88.2689808);
        mapOptions = {
            center: myLatlng,
            zoom: 13
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        for (var x = 0; x < locations.length; x++) {
            var locPosition = new google.maps.LatLng(locations[x].lat, locations[x].lng);
            var marker = new google.maps.Marker({
                position: locPosition,
                title: locations[x].name,
                animation: google.maps.Animation.DROP,
                map: map
            });
            google.maps.event.addListener(marker, 'click', toggleBounce);
            marker.setMap(map);
            Model.markers.push(marker);
        }//end for locations.length loop
    }//end initialize

    function toggleBounce() {
            console.log("hi");
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }//wns togglewBounce function

    google.maps.event.addDomListener(window, 'load', initialize);

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
