$(document).ready(function(){
  var apiKey="/c85793a790b8bfb1e334c7c126839718/";
  var queryString="https://api.forecast.io/forecast";
  var lat;
  var long;
  queryString += apiKey;

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

  function getWeather(){
    queryString = queryString+lat+","+long;
    $.ajax({
      url:queryString,
      dataType:"jsonp",
      success:function(data){
        console.log(data);
        var stuff = data.currently.summary;
        $("#weather_div").html(stuff);
      }
    })
  }
  //main body
  getCurrLocation();
  getWeather();
});
