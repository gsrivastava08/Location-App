var mapApp = {
  map : null,
  myPosistion : null,
  curr_lat : null,
  curr_lng : null,
  current_markers : [],
  marker_data : []
};

mapApp.init = function(){

  mapApp.showBaseMap();
  mapApp.loadCategories();
  mapApp.bindings();
}

mapApp.bindings = function(){

  $("#locate-me").on('click', function(event) {
    event.preventDefault();
    mapApp.getPosition();
  });

  $("#main-category-list").on('click', ".serachable", function(event) {
    event.preventDefault();
    /* Act on the event */
    mapApp.resetMarkers();
    mapApp.queryPlaces($(this).data('name'));
  });

}

mapApp.loadCategories = function(){
  
  $.get('/category-list', function(data) {
    /*optional stuff to do after success */
    var template = $("#category-templ").html();
    var html = Mustache.to_html(template, data);
    $("#main-category-list").html(html);

    $("#main-category-list").slimScroll({
        height: '460px',
        color: '#008080'
    });

  });

}

mapApp.resetMarkers = function(){

  $.each(mapApp.current_markers, function(index, el) {
    el.setMap(null);
  });

  mapApp.current_markers = [];
  mapApp.marker_data = [];
}

mapApp.queryPlaces = function(type){
  var payload = {};

  payload.latitude = mapApp.curr_lat;
  payload.longitude = mapApp.curr_lng;
  
  payload.type = type;

  var strPayload = JSON.stringify(payload);
  
  strPayload = btoa(strPayload);
  
  var apiEnd = '/find/'+strPayload;
  
  $.get(apiEnd, function(json, Status) {
      /*optional stuff to do after success */

      json = JSON.parse(json);
      mapApp.marker_data = json.results;
      $.each(json.results, function (i, dt){

        var tmp_marker = new google.maps.Marker({
                          position: new google.maps.LatLng(dt.geometry.location.lat, dt.geometry.location.lng),
                          title: dt.name,
                          animation: google.maps.Animation.DROP
                        });

        mapApp.current_markers.push(tmp_marker);
        window.setTimeout(function() {
          mapApp.current_markers[i].setMap(mapApp.map);
        }, i*200);

        mapApp.current_markers[i].addListener('click', function() {
          mapApp.shoInfowindow(i, mapApp.current_markers[i]);
        });
      });
  });
   
}

mapApp.getPosition = function(){

  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mapApp.showPosition);
  }else
  {
    //TODO Display message       
      }

}

mapApp.showPosition = function(position){
  console.log(position.coords.latitude);
  var currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  mapApp.curr_lat = position.coords.latitude;
  mapApp.curr_lng = position.coords.longitude;


  mapApp.map.panTo(currentPos);
  var marker =  new google.maps.Marker({
    position: currentPos,
    title: 'Your location',
    icon : 'images/Map-Marker-Ball-Right-Azure-icon.png'
  });
  $(".serachable").removeClass('hidden');
  $("#main-category-list").show();
  if(mapApp.myPosistion){

    mapApp.myPosistion.setPosition(currentPos);

  }else{
    mapApp.myPosistion = marker;
    mapApp.myPosistion.setMap(mapApp.map);  
    mapApp.myPosistion.addListener('click', function() {
      mapApp.shoInfowindow(1, mapApp.myPosistion);
    });
  }
}

mapApp.shoInfowindow = function(id, marker){

  var template = $("#popupWindow-templ").html();
  var html = Mustache.to_html(template, mapApp.marker_data[id]);

  var infowindow = new google.maps.InfoWindow({
      content: html
    });
  infowindow.open(mapApp.map, marker);
}

mapApp.showBaseMap = function(){
  
  var mapProp = {
    center:new google.maps.LatLng(12.955466, 77.694159),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  mapApp.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


google.maps.event.addDomListener(window, 'load', mapApp.init);
