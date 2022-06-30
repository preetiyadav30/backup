// // Initialize and add the map
 src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
// function initMap() {
//     // The location of Uluru
//     const uluru = { lat: -25.344, lng: 131.031 };
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: uluru,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//       position: uluru,
//       map: map,
//       draggable:true,
//     });
//   }
 
//     window.initMap = initMap;
//   // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//         position: new google.maps.LatLng(17.377631, 78.478603),
//     // position: uluru,
//     map: map,
//   });
//   alert("hello welcome to javascript");
  /** Positions and map statuses **/
var isLoaded = false;
/** **/
var refreshIntervalId;
var vehicles;
var map;
function setVehicleAsCenter (registration) {
    alert("Hola");
}
function loadPoints (positions) {
    console.debug('loading markers');
    var lttd;
    var lgtd;
    for (var i=0; i < positions.length; i++) {
        lttd = positions[i].latitude;
        lgtd = positions[i].longitude;
        marker = map.addMarker({
            lat: lttd,
            lng: lgtd,
        });
        markers[positions[i].registration] = marker;
    };
    map.fitZoom();
    isLoaded = true
}
function updatePoints (positions) {
    /**
    how could be the alorithm here
    */
    console.debug('updating markers');
}
function requestPoints() {
    $.ajax({
        url: "gpstracking.ajax.request_tracks",
        type: 'get',
        dataType: 'json',
        data: {
            vehicles: vehicles
        },
        success: function (positions) {
            if (isLoaded == false) {
                loadPoints (positions);
            } else {
                updatePoints (positions);
            }
        }
    });
}
$(document).ready(function() {
    /** Buttons Click Event Set **/
    $('.map-mode').click(function(){
        vehicles = '';
        $("#jstree").jstree("get_checked",null,true).find('a[rel="vehicle"]').each(function(){
            vehicles =  vehicles + $.trim(this.text) + "|";
        });
        if (vehicles == '') {
            console.debug('No vehicles to display');
            return;
        }
        option = $(this).attr('rel');
        if (option == 'show') {
            console.debug('Ordering to show');
            clearInterval(refreshIntervalId);
            requestPoints();
        }
        if (option == 'listen') {
            console.debug('Listening');
            requestPoints();
            refreshIntervalId = setInterval("requestPoints()", 10000);
        }
        if (option == 'clear') {
            console.debug('Clearing');
            clearInterval(refreshIntervalId);
            markers = new Object();
            map.removeMarkers();
            isLoaded = false;
        }
    });
    /** Map loading **/
    map = new GMaps({
        div: '#map-canvas',
        lat: -16.4237766667,
        lng: -71.54262,
    });
});
function updatePoints (positions) {
    for (var i=0; i < positions.length; i++) {
        var pos=positions[i];
        var marker=markers[pos.registration];
        if(marker){
            // this marker already exists, so reposition it
            var latlong=new google.maps.LatLng(pos.latitude, pos.longitude);
            marker.setPosition(latlong);
        }else{
            // this is a new marker so create it
            marker = map.addMarker({
                lat: pos.latitude,
                lng: pos.longitude,
            });
            markers[pos.registration] = marker;
        }
    }
}
//   var positions = [{latitude:22.7196,longitude:75.8577}]

//   function updatePoints (positions) {
//     for (var i=0; i < positions.length; i++) {
//         var pos=positions[i];
//         var marker=markers[pos.registration];
//         if(marker){
//             // this marker already exists, so reposition it
//             var latlong=new google.maps.LatLng(pos.latitude, pos.longitude);
//             marker.setPosition(latlong);
//         }else{
//             // this is a new marker so create it
//             marker = map.addMarker({
//                 lat: pos.latitude,
//                 lng: pos.longitude,
//             });
//             markers[pos.registration] = marker;
//         }
//     }
// }

// var map, marker1, marker2, myLatlng, icon;
// var boo = true;
// var planeIcon = [];
// function initMap() {
//     var infoWindow = new google.maps.InfoWindow();
//     // Create a new StyledMapType object, passing it an array of styles,
//     // and the name to be displayed on the map type control.
// setInterval(
// function () {
//     axios.get('http://localhost:8888/lsapp/public/planes/')
//         .then(function (response) {
//             var infowindow = new google.maps.InfoWindow();
//             var north = new google.maps.LatLng(90.0000, 0.0000);
//             var northPole = new google.maps.Marker({
//                 position: {lat: 90.0000, lng: 0.0000},
//                 map: map
//             });
        
//             northPole.setIcon({
//                 path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                 scaledSize: new google.maps.Size(10, 10),
//                 scale: 6
//             });

//             for (var i = 0; i < 50; i++) {
//                 //console.log(response.data["states"][i]);
//                 console.log(response.data["states"][i]);

//                 var direction = new google.maps.LatLng(response.data["states"][i][6], response.data["states"][i][5]);
//                 var heading = google.maps.geometry.spherical.computeHeading(direction, north);

//                 myLatlng = new google.maps.LatLng(response.data["states"][i][6],response.data["states"][i][5]);
//                     icon = {
//                         path: "M 356.26958,135.02702 L 356.26958,249.31026 L 296.72689,289.12758 C 298.37366,285.78981 297.94877,282.22185 297.97085,278.70356 L 297.7704,238.6142 L 268.80878,238.44964 L 269.05561,285.18318 C  ",
//                         fillColor: '#111111',
//                         fillOpacity: 1,
//                         scaledSize: new google.maps.Size(0.01, 0.01),
//                         rotation: heading + response.data["states"][i][10],
//                         scale: 0.02
//                     }

//                     if(planeIcon.length > 0) {
//                         for (var j = 0; j < planeIcon.length; j++)
//                         planeIcon[j].setPosition(myLatlng);
//                     } else {
//                         planeIcon.push(new google.maps.Marker({
//                             position: {lat: response.data["states"][i][6], lng: response.data["states"][i][5]},
//                             map: map,
//                             title: response.data["states"][i][1],
//                             icon: icon
//                         }));
//                     }
//                     console.log(planeIcon);}
//                 })
//             })
//         };
const arr= [{"id":1,"name":"Truck 1","position":{"lat":30.23554018035925,"long":-92.01935091053534}},
{"id":2,"name":"Truck 2","position":{"lat":30.164984466019252,"long":-91.97831393031169}},
{"id":3,"name":"Truck 3","position":{"lat":30.21268333491144,"long":-91.99062979629551}},
{"id":4,"name":"Truck 4","position":{"lat":30.26265532616729,"long":-91.98054925137356}},
{"id":5,"name":"Truck 5","position":{"lat":30.248690018924144,"long":-92.0012589647479}}]
