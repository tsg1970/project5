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
        name: "Vickies Place",
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

viewModel.locations = ko.computed(function() {
    var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(locations, function(location) {
            return location.name.toLowerCase().indexOf(search)>= 0;
        });
    }, viewModel);
ko.applyBindings(viewModel);

});

/* Google API key AIzaSyDvmjCwHnPim1zh9TcVtOGh6EoH7lomzpA*  /
