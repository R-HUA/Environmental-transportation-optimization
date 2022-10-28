var newMap; //Declare newMap as global variable
var markerList = [];
var infowindow;
var geocoder;
var marker;
var ishard = true;
var directionsService;
var directionsDisplay;
let destination = ""
let go = document.getElementById('confirm');
// get width
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;//
//Get html
let htmlDom = document.getElementsByTagName('html')[0];
//htmlDom.style.fontSize = htmlWidth / 20 + 'px';   //font-size
console.log(htmlWidth,htmlDom.style.fontSize);

//Function to save route into database
function confirmRoute(dis,em){
    // when confirm was clicked
    go.addEventListener('click',function(){
        let distance = document.getElementById('distance');
        distance.value = dis
        let emission = document.getElementById('emission');
        emission.value = em
        let dest = document.getElementById('destination');
        dest.value = destination
        // submit the form
        let form_submit = document.getElementById('form-submit');
        console.log(form_submit)
        form_submit.submit()
    })
}


// Initialize the map
function initMap () {
    // Generate new Map and center is Monash University clayton campus
    newMap = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(-37.91379608011779, 145.1317297820128),
        mapTypeId: "terrain",
    });
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    //Initial the map
    const script = document.createElement("script");
    document.getElementsByTagName("head")[0].appendChild(script);
    search()
}

//Function to display the route
function displayRoute(origin, destination, service, display) {
    service
        .route({
            origin: origin,
            destination: destination,
            waypoints: [],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true,
        })
        .then((result) => {
            display.setDirections(result);
        })
        .catch((e) => {
            alert("Could not display directions due to: " + e);
        });
}

//Function to compute total distance from returned route
function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
}

//Get the date
function getDate() {
    var myDate = new Date();
    document.write(myDate.toLocaleString())
}

//Display all the restaurant
function displayFood() {

    clearMarker() // Clear all the marker
    //Sample maker
    let markers = [{lat: -37.88483144704108, lng: 145.12724461160104}, {
        lat: -37.91434900845777,
        lng: 145.13409224823155
    }, {lat: -37.92402319553542, lng: 145.11968197784918}]

    for (let i = 0; i < markers.length; i++) {
        let newMarker = new google.maps.Marker({
            position: markers[i],
            title: "Food!"
        });

        markerList.push(newMarker)

    }
    console.log("Display Food")

    showMarker()
}

//Display all the gas station
function displayGas() {

    clearMarker()
    let markers = [{lat: -37.91205365540069, lng: 145.10909302862353}, {
        lat: -37.91455847727796,
        lng: 145.10583069413184
    }, {lat: -37.91659172742469, lng: 145.14033495175457}]

    for (let i = 0; i < markers.length; i++) {
        let newMarker = new google.maps.Marker({
            position: markers[i],
            title: "Gas!"
        });
        markerList.push(newMarker)
    }

    console.log("Display Gas")

    showMarker()

}

//Show all the marker in the marker list
function showMarker() {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(newMap)
    }
}

//Clear the marker
function clearMarker() {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null)
    }
    markerList = []
    // Clear past routes
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
}

//Set the current position
function setMapCenter(pos) {
    var crd = pos.coords;
    newMap.setCenter(new google.maps.LatLng(crd.latitude, crd.longitude));
    console.log('current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//Using Google Map direct API to find the toute
function findRoute(request) {

    // Clear past routes
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }

    //Clear sidebar
    document.getElementById("directPanel").innerHTML = "";

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: document.getElementById("directPanel"),
    });

    directionsDisplay.setMap(newMap);

    //request the routes
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            //console.log(result.routes[0].legs[0].steps);
            console.log(result);
            let routes = [];
            let details = result.routes[0].legs[0].steps;

            for (let i = 0; i < result.routes.length; i++) {
                routes[i] = result.routes[i].legs[0].steps;
            }

            result.routes = [result.routes[findLeastEmissions(routes)]]
            //Get the total distance
            let totaldistance = 0 + result.routes[0].legs[0].distance.value;

            console.log(totaldistance, result);
            confirmRoute(totaldistance*1,totaldistance*1);
            directionsDisplay.setDirections(result);
        } else {
            console.log(status);
        }
    });
}

//Function for the search bar
function search() {
    const geocodeCache = new Map();
    const geocoder = new google.maps.Geocoder();
    const searchInputEl = document.getElementById('site-search');
    const searchButtonEl = document.getElementById('search-button');

    var input = document.getElementById('site-search');
    var searchBox = new google.maps.places.SearchBox(input);

    const geocodeSearch = function (query) {
        if (!query) {
            return;
        }

        const handleResult = function (geocodeResult) {
            searchInputEl.value = geocodeResult.formatted_address;
            destination = geocodeResult.formatted_address
            updateSearchLocation(geocodeResult.formatted_address, geocodeResult.geometry.location);

        };

        if (geocodeCache.has(query)) {
            handleResult(geocodeCache.get(query));
            return;
        }
        const request = {address: query, bounds: newMap.getBounds()};
        geocoder.geocode(request, function (results, status) {
            if (status === 'OK') {
                if (results.length > 0) {
                    const result = results[0];
                    geocodeCache.set(query, result);
                    handleResult(result);
                }
            }
        });
    };
    //When click the submit button
    searchButtonEl.addEventListener('click', function () {
        geocodeSearch(searchInputEl.value.trim());
    });
}

//Update the search location
function updateSearchLocation(address, location) {
    searchLocation = {'address': address, 'location': location};
    searchLocationMarker = new google.maps.Marker({
        position: location,
        map: newMap,
        title: 'My location',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#3367D6',
            fillOpacity: 0.5,
            strokeOpacity: 0,
        }
    });
    markerList.push(searchLocationMarker);

    // Update map bounds to include the new location marker.
    const bounds = new google.maps.LatLngBounds();
    center = newMap.getCenter()
    if (searchLocationMarker) {
        bounds.extend(searchLocationMarker.getPosition());
    }
    bounds.extend(center);
    newMap.fitBounds(bounds);

    if (ishard){
        navigator.geolocation.getCurrentPosition(function (pos) {
            var crd = pos.coords;
            findRoute({
                //Hardcode the origin as Monash University clayton campus
                origin: {lat: -37.91379608011779, lng: 145.1317297820128},
                destination: {lat: location.lat(), lng: location.lng()},
                travelMode: 'DRIVING',
                provideRouteAlternatives: true,
                language: 'en'
            })
        }, error);
    }
    else{
        navigator.geolocation.getCurrentPosition(function(pos){var crd = pos.coords;
            findRoute({origin: { lat: crd.latitude, lng: crd.longitude }, destination: { lat: location.lat(), lng: location.lng() }, travelMode: 'DRIVING', provideRouteAlternatives: true, language: 'en'})},error);
    }

    /* ↓ Hard Code origin part
    navigator.geolocation.getCurrentPosition(function (pos) {
    var crd = pos.coords;
    findRoute({
        origin: {lat: -37.91379608011779, lng: 145.1317297820128},
        destination: {lat: location.lat(), lng: location.lng()},
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
        language: 'en'
    })
    }, error); */

    // // ↓ get current origin part
    // navigator.geolocation.getCurrentPosition(function(pos){var crd = pos.coords;
    //     findRoute({origin: { lat: crd.latitude, lng: crd.longitude }, destination: { lat: location.lat(), lng: location.lng() }, travelMode: 'DRIVING'})},error);

}

// ↓ Choose the route with the least emissions from the existing routes
function findLeastEmissions(routes) {
    let leaston = 0
    let leastEmission = -1
    for(let i=0;i<routes.length;i++){
        let emi = 0
        // data from https://www.sciencedirect.com/science/article/pii/S0048969719303067#bb0145
        for(let j=0;j<routes[i].length;j++){
            let v = routes[i][j].distance.value/routes[i][j].duration.value // ..m/s
            if (v < 5.556){
                emi += v * 1.35
            }
            if (v < 8.333 && v >= 5.556){
                emi += v * 1.18
            }
            if (v < 11.111 && v >= 8.333){
                emi += v * 1
            }
            if (v < 16.6667 && v >= 11.111){
                emi += v * 0.98
            }
            if (v >= 16.6667){
                emi += v * 0.95
            }
        }
        if (emi < leastEmission && leastEmission >= 0){
            leastEmission = emi
            leaston = i
        }
    }
    return leaston
}

