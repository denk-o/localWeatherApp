var apiKey_forecast="/c85793a790b8bfb1e334c7c126839718/";
var queryString_forecast="https://api.forecast.io/forecast";
var apiKey_googleGeocode = "AIzaSyDq73ibmNV8HFrapwLzhiFhwLsi63uZ-jM	";
var queryString_googleGeocode="https://maps.googleapis.com/maps/api/geocode/json?";
var cityString="address=";
var weatherString = queryString_forecast+apiKey_forecast
var googleString = queryString_googleGeocode;




var weather_map={
  "clear-day":"wi-day-sunny",
  "clear-night":"wi-night-clear",
  "rain":"wi-rain",
  "snow":"wi-snow",
  "sleet":"wi-sleet",
  "wind":"wi-windy",
  "fog":"wi-fog",
  "cloudy":"wi-cloudy",
  "partly-cloudy-day":"wi-day-cloudy",
  "partly-cloudy-night":"wi-night-cloudy"
};

function getWeatherIcon(icon){
  if(icon in weather_map){
    return weather_map[icon];
  }
  else return icon in weather_map || (weather_map.icon="wi-day-sleet-storm");
}

function getWeather(lat, long){//should be a way to consolidate local and non local weather into a single function
  console.log(lat);
  console.log(long);
  var a_weatherString=weatherString+lat+","+long;
  $.ajax({
    url:a_weatherString,
    dataType:"jsonp",
    success:function(data){
      console.log(data);
      var temp = data.currently.temperature;
      var status = data.currently.summary;
      var weather_icon=getWeatherIcon(data.currently.icon);
      $("#weather_div").html("The current temperature is: "+temp+"<br/>"+
        "The current weather is: "+status+
        " <i class='wi "+weather_icon+"'></i>");
    }
  });
}
function getCurrLocation(){
  $("#city_div").html("Local");
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(savePosition);
  }else{
    alert("Geolocation not supported");
  }
}
function savePosition(position){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getWeather(lat, long);
}

function searchCity(){
  //eventually gonna get this working
  var city = $("#location_in").val();
  cityString+=city;
  var a_queryString_googleGeocode=queryString_googleGeocode+cityString+"&key="+apiKey_googleGeocode;
  $.ajax({
    url: a_queryString_googleGeocode,
    dataType: "json",
    success:function(data){
      if(data.status=="OK"){
        console.log(data);
        var location = data.results[0].formatted_address;
        var city_lat = data.results[0].geometry.location.lat;
        var city_long= data.results[0].geometry.location.lng;
        $("#city_div").html(location);
        console.log(city_lat);
        console.log(city_long);
        getWeather(city_lat,city_long);
      }
      if(data.status=="ZERO_RESULTS"){
        alert("No results found");
      }
    }
  });
}
$(document).ready(function(){
  //main body
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  getCurrLocation();
});
