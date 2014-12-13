// http://data.seattle.gov/resource/65fc-btcc.json
"use strict";

$(document).ready(function() {
   var mapElem = document.getElementById('map');
   var center = {
      lat: 47.6,
      lng: -122.3
   };

   var map = new google.maps.Map(mapElem, {
      center: center,
      zoom: 12
   });

   //create new info winder
   var infoWindow = new google.maps.InfoWindow();
   var location;
   var markers = [];

   //gets the traffic data from seattle
   $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
      .done(function onMarkerClick(data, itemIndex) {
         location = data;
         data.forEach(function(location) {
            var marker = new google.maps.Marker({
               position: {
                  lat: Number(location.location.latitude),
                  lng: Number(location.location.longitude)
               },
               map: map
            });
            markers.push(marker);

            //shows a popup window when you click on a marker
            google.maps.event.addListener(marker, 'click', function onMarkerClick() {
               map.panTo(this.getPosition());
               var image = '<p>' + location.cameralabel + '</p>' + '<img src= ' + location.imageurl.url + '>';
               infoWindow.setContent(image);
               infoWindow.open(map, this);
            });

         });
      })
      
      .fail(function(error) {
         console.log(error);
      	})
      
      .always(function() {
    	})
});