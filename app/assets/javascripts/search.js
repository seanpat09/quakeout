var map
var geocoder
$(function() {
  var geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 0,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($("#map_canvas").get(0), mapOptions);
});

function center(lat,lng) {
  var newCenter = new google.maps.LatLng(lat,lng);
  map.setCenter(newCenter);
};

function markMap(lat,lng){
  alert('hello');
};

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.fitBounds(results[0].geometry.viewport);
      var ne = results[0].geometry.viewport.getNorthEast();
      var sw = results[0].geometry.viewport.getSouthWest();

      var earthquake_request = 'http://api.geonames.org/earthquakesJSON?north=' + ne.lat() + '&south=' + sw.lat() + '&east=' + ne.lng() + '&west=' + sw.lng() + '&username=demo';

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      $.getJSON(earthquake_request, function(data) {
        var earthquakes = data.earthquakes;
        for(i=0; i < earthquakes.length; i++){
          marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(earthquakes[i].lat, earthquakes[i].lng)
          });
        var details =  '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335 km (208 mi) '+
    'south west of the nearest large town, Alice Springs; 450 km '+
    '(280 mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';
          google.maps.event.addListener(marker, 'click', (function(marker, i){
            return function () {
              infowindow.setContent(details);
              infowindow.open(map,marker);
            }
          })(marker, i));
        };         
      });

      
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
