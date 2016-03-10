var apiKey_forecast="/c85793a790b8bfb1e334c7c126839718/";
var queryString_forecast="https://api.forecast.io/forecast";
var apiKey_googleGeocode = "AIzaSyDq73ibmNV8HFrapwLzhiFhwLsi63uZ-jM	";
var queryString_googleGeocode="https://maps.googleapis.com/maps/api/geocode/json?";
var cityString="address=";
queryString_forecast += apiKey_forecast;

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


function searchCity(){
  //eventually gonna get this working
  var city = $("#location_in").val();
  cityString+=city;
  queryString_googleGeocode=queryString_googleGeocode+cityString+"&key="+apiKey_googleGeocode;
  $.ajax({
    url: queryString_googleGeocode,
    dataType: "json",
    success:function(data){
      console.log(data);
      alert("success");
    }
  });
}

function getWeatherIcon(icon){
  if(icon in weather_map){
    return weather_map[icon];
  }
  else return icon in weather_map || (weather_map.icon="wi-day-sleet-storm");
}

function getWeather(lat, long){//should be a way to consolidate local and non local weather into a single function
  console.log(lat);
  console.log(long);
  queryString_forecast = queryString_forecast+lat+","+long;
  $.ajax({
    url:queryString_forecast,
    dataType:"jsonp",
    success:function(data){
      console.log(data);
      var temp = data.currently.temperature;
      var status = data.currently.summary;
      var weather_icon=getWeatherIcon(data.currently.icon);
      $("#weather_div").html("The current temperature is: "+temp+"<br/>"+
        "The current weather is: "+status+"<br/>"+
        "<i class='wi "+weather_icon+"'></i>");
    }
  });
}

function getSearchWeather(){

}
$(document).ready(function(){
  //main body
  function getCurrLocation(){
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
  getCurrLocation();
});
