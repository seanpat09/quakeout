var map
var geocoder
var infowindow
$(function() {
  var geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
  infowindow = new google.maps.InfoWindow();
});

$(function() {
  var lastyear = new Date();
  lastyear.setMonth(lastyear.getMonth() - 12);
  var list_request = 'http://api.geonames.org/earthquakesJSON?minMagnitude=7&north=90&south=-90&east=180&west=-180&maxRows=500&username=quakeout'
  $.getJSON(list_request, function(data) {
    var earthquakes = data.earthquakes
    var html = "<ol>";
    var n = 0;
    for(i=0; i < earthquakes.length; i++){
      var date = new Date(earthquakes[i].datetime);
      if ( date > lastyear){
        html = html + '<li>' +
            '<p><b>Magnitude:</b> ' + earthquakes[i].magnitude + '</p>' + 
            '<p><b>Date and Time (YYYY-MM-DD): </b>' + earthquakes[i].datetime + '</p>' +
            '<p><b>Location (lat,lng):</b> (' + earthquakes[i].lat + ',' + earthquakes[i].lng +')</p>' +
            '<p><b>Depth:</b> ' + earthquakes[i].depth + '</p></li>';
        n++;
        if (n >= 10){
          break
        }
      } 
    };
    html = html + '</ol>';
    $('#list .list_results').html(html);
  });
});
function center(lat,lng) {
  var newCenter = new google.maps.LatLng(lat,lng);
  map.setCenter(newCenter);
};

function markMap(lat,lng){
  alert('hello');
};

function makePopup(marker, details){
  return function () {
    infowindow.close();
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(details);
    infowindow.open(map,marker);
  };
};

function placeMarkers(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.fitBounds(results[0].geometry.viewport);
      var ne = results[0].geometry.viewport.getNorthEast();
      var sw = results[0].geometry.viewport.getSouthWest();

      var geonames_request = 'http://api.geonames.org/earthquakesJSON?north=' + ne.lat() + '&south=' + sw.lat() + '&east=' + ne.lng() + '&west=' + sw.lng() + '&username=quakeout';

      var marker, i;

      $.getJSON(geonames_request, function(data) {
        var earthquakes = data.earthquakes;
        for(i=0; i < earthquakes.length; i++){
          marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(earthquakes[i].lat, earthquakes[i].lng)
          });

          var details =  '<div id="content">'+
             '<div id="siteNotice">'+
            '</div>'+
            '<h2 id="firstHeading" class="firstHeading">Earthquake Details</h2>'+
            '<div id="bodyContent">'+
            '<p><b>Date and Time (YYYY-MM-DD): </b>' + earthquakes[i].datetime + '</p>' +
            '<p><b>Location (lat,lng):</b> (' + earthquakes[i].lat + ',' + earthquakes[i].lng +')</p>' +
            '<p><b>Magnitude:</b> ' + earthquakes[i].magnitude + '</p>' + 
            '<p><b>Depth:</b> ' + earthquakes[i].depth + '</p>' +
            '<p>Information courtesy of GeoNames JSON Webservices: <a href="http://www.geonames.org/export/JSON-webservices.html">'+
            'http://www.geonames.org/export/JSON-webservices.html</a>.</p>'+
 
            '</div>'+
            '</div>';
          google.maps.event.addListener(marker, 'click', makePopup(marker,details));
        };         
      });

      
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
