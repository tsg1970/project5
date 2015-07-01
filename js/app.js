$(function() {
var locations = [
        {
        name: "Windhill Pancake Parlor",
        street: "Elm St",
        },
        {
        name: "Twisted Burger",
        street: "Elm St",
        },
        {
        name: "Green Street Cafe",
        street: "Elm St",
        },
        {
        name: "Olive Garden",
        street: "Richmond Rd",
        },
        {
        name: "Brunch Cafe",
        street: "Route 31",
        },
        {
        name: "Happy Jacks",
        street: "Elm St",
        },
        {
        name: "Vickie's Place",
        street: "Elm St",
        },
        {
        name: "Tacos El Norte",
        street: "Elm St",
        },
        {
        name: "Applebee's",
        street: "Elm St",
        },
        {
        name: "Chili's",
        street: "Elm St",
        },
        {
        name: "The Village Squire",
        street: "Elm St",
        }
    ];

var viewModel = {
    query: ko.observable(''),
};

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 15,
    center: {lat: 42.3455736, lng: -88.2689808}
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

viewModel.locations = ko.computed(function() {
    var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(locations, function(location) {
            return location.name.toLowerCase().indexOf(search)>= 0;
        });
    }, viewModel);
ko.applyBindings(viewModel);

});

/* Google API key AIzaSyDvmjCwHnPim1zh9TcVtOGh6EoH7lomzpA*/
