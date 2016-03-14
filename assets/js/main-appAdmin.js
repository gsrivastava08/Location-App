var mapApp = {
  map : null,
  myPosistion : null,
  curr_lat : null,
  curr_lng : null,
  users : [],
  current_markers : [],
  marker_data : []
};

mapApp.init = function(){

  mapApp.showBaseMap();
  mapApp.loadUsers();
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

mapApp.loadUsers = function(){
  
  $.get('/appusers', function(data) {
    /*optional stuff to do after success */
    mapApp.users = data;
    var template = $("#users-templ").html();
    var html = Mustache.to_html(template, {content:data});
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

mapApp.queryPlaces = function(id){
  var payload = {};

  $.each(mapApp.users, function (i, dt){
  	if(dt.id == id){
  		payload = dt;
  	}
  });

  var lat = payload.lastLoc.split(':')[0];
  var lng = payload.lastLoc.split(':')[1];

    var tmp_marker = new google.maps.Marker({
                      position: new google.maps.LatLng(lat, lng),
                      title: payload.displayName,
                      animation: google.maps.Animation.DROP
                    });

        mapApp.current_markers.push(tmp_marker);
        window.setTimeout(function() {
          mapApp.current_markers[0].setMap(mapApp.map);
        }, 200);

        mapApp.current_markers[0].addListener('click', function() {
          mapApp.shoInfowindow(id, mapApp.current_markers[0]);
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

  var payload = {};

  $.each(mapApp.users, function (i, dt){
  	if(dt.id == id){
  		payload = dt;
  	}
  });

  var html = Mustache.to_html(template, payload);

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
