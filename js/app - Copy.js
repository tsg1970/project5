//$(function() {
    var locations = [
        {
        name: "Windhill Pancake Parlor",
        street: "West Elm St",
        latlng: "42.3443318,-88.2626109",
        },
        {
        name: "Twisted Burger",
        street: "West Elm St",
        latlng: "42.3463353,-88.2816521",
        },
        {
        name: "Green Street Cafe",
        street: "North Green St",
        latlng: "42.3448488,-88.2670283",
        },
        {
        name: "Olive Garden",
        street: "3451 Shoppers Dr",
        latlng: "42.367184,-88.2670474",
        },
        {
        name: "Brunch Cafe",
        street: "414 South Route 31",
        latlng: "42.3229107,-88.273147",
        },
        {
        name: "Happy Jack's Submarine",
        street: "4911 West Elm St",
        latlng: "42.3487341,-88.2936913",
        },
        {
        name: "Vickie's Place",
        street: "1211 N River Rd",
        latlng: "42.3450892,-88.2599154",
        },
        {
        name: "Tacos El Norte",
        street: "4318 West Elm St",
        latlng: "42.3479943,-88.2812933",
        },
        {
        name: "Applebee's",
        street: "1700 N Richmond Rd",
        latlng: "42.350895,-88.266807",
        },
        {
        name: "Chili's Grill & Bar",
        street: "2409 N Richmond Rd",
        latlng: "42.3609832,-88.2681989",
        },
        {
        name: "The Village Squire",
        street: "West Elm St",
        latlng: "42.3480982,-88.2866883",
        }
    ];

var viewModel = {
    query: ko.observable(''),
};


function initialize() {
    var myLatlng = new google.maps.LatLng(42.3455736, -88.2689808);
    var mapOptions = {
        center: myLatlng,
        zoom: 15
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)
}

google.maps.event.addDomListener(window, 'resize', initialize);
google.maps.event.addDomListener(window, 'load', initialize);

viewModel.locations = ko.computed(function() {
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(location) {
        return location.name.toLowerCase().indexOf(search)>= 0;
        });
}, viewModel);

ko.applyBindings(viewModel);
console.log(viewModel.location);

//});

document.querySelector("#nav-toggle").addEventListener("click", function() {
    document.getElementById("list").classList.toggle("noList");
})