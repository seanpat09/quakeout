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
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
