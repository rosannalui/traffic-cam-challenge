// http://data.seattle.gov/resource/65fc-btcc.json
"use strict";

$(document).ready(function() {
   var mapArea = document.getElementById('map');
   var center = {
      lat: 47.6,
      lng: -122.3
   };

   var map = new google.maps.Map(mapArea, {
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

            google.maps.event.addListener(marker, 'click', function onMarkerClick() {
               map.panTo(this.getPosition());
               var image = '<p Hello: >' + location.cameralabel + '</p>' + '<img src= ' + location.imageurl.url + '>';
               infoWindow.setContent(image);
               infoWindow.open(map, this);
               infoWindow.close(); 
            });
            $('#search').bind('search find',function() {
               var search=this.value.toLowerCase(); 
               if(data.cameralabel.toLowerCase().indexOf(search)==-1) {
                  marker.setMap(null); 
               } else {
                  marker.setMap(map); 
               }
            })

         });
      })
      
      .fail(function(error) {
         console.log("error");
      	})
      
      .always(function() {
    	})
});