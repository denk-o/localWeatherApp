var apiKey_forecast="/c85793a790b8bfb1e334c7c126839718/";
var queryString_forecast="https://api.forecast.io/forecast";
var apiKey_googleGeocode = "AIzaSyAPQEOpIRMn2R3W7SggIh4j1DZp50CX_x0	";
var queryString_googleGeocode="https://maps.googleapis.com/maps/api/geocode/json?";
var coords_local = {lat:"",long:""};
var cityString="address=";
queryString_forecast += apiKey_forecast;

function searchCity(){
  alert("good");
}
function getLocalWeather(){//should be a way to consolidate local and non local weather into a single function
  console.log(coords_local.lat);
  console.log(coords_local.long);
  queryString_forecast = queryString_forecast+coords_local.lat+","+coords_local.long;
  $.ajax({
    url:queryString_forecast,
    dataType:"jsonp",
    success:function(data){
      console.log(data);
      var res = data.currently;
      $("#weather_div").html(res);
    }
  })
}

function getSearchWeather(){

}

function getCurrLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(savePosition);
  }else{
    alert("Geolocation not supported");
  }
}
function savePosition(position){
  coords_local.lat = position.coords.latitude;
  coords_local.long = position.coords.longitude;
}

$(document).ready(function(){


  //main body
  getCurrLocation();
  getLocalWeather();
});
