var apiKey_forecast="/c85793a790b8bfb1e334c7c126839718/";
var queryString_forecast="https://api.forecast.io/forecast";
var apiKey_googleGeocode = "AIzaSyAPQEOpIRMn2R3W7SggIh4j1DZp50CX_x0	";
var queryString_googleGeocode="https://maps.googleapis.com/maps/api/geocode/json?";
var lat;
var long;

function searchCity(){
  alert("good");
}
function getLocalWeather(){//should be a way to consolidate local and non local weather into a single function
  queryString_forecast = queryString_forecast+lat+","+long;
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

$(document).ready(function(){
  var cityString="address=";

  queryString_forecast += apiKey_forecast;

  function getCurrLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(savePosition);
    }else{
      alert("Geolocation not supported");
    }
  }
  function savePosition(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat);
    console.log(long);
  }

  //main body
  getCurrLocation();
  getLocalWeather();
});
