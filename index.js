var targetDiv = document.getElementById("weather");
var options = document.getElementById("options");
$("#place").on("keypress",function(){
    $("#options").show();
    var ourRequest = new XMLHttpRequest();
    let place = $("#place").val();
    let call = 'http://api.weatherapi.com/v1/search.json?key=a614a1cfd5a346ef85b55944212109&q=' + place;
    ourRequest.open('GET',call);
    ourRequest.onload = function(){
        let result = JSON.parse(ourRequest.responseText);
        locationfunc(result);
    }
    ourRequest.send();
})
$("#submit").on("click",function(){
    $("#options").hide();
    $("#weather").text("");
    let place = $("#place").val();
    if(place === ""){
        alert("Please enter a location");
    }
    else{
        $("#place").val("");
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET','http://api.weatherapi.com/v1/current.json?key=a614a1cfd5a346ef85b55944212109&q=' + place + '&aqi=yes');
        ourRequest.onload = function(){
            if(ourRequest.status >= 200 && ourRequest.status < 400){
                let result = JSON.parse(ourRequest.responseText);
                display(result);
            }
            else{
                userError();
            }
        }
        ourRequest.onerror = function(){
            error();
        }
        ourRequest.send();
    }
})
function display(result){
    let res = '<p class="p-3">' + result.location.name + '</p><p class="p-3">' + result.location.region + 
    '</p><p class="p-3">' + result.location.country + '</p><p class="p-3">' + result.current.temp_c + '&#176;C</p>';
    targetDiv.insertAdjacentHTML('beforeend',res);
    if(result.current.temp_c <= 20){
        $("#weather").css("color","white");
        $("#weather").css("background-image","url(./SASS/darkbg.png)");
    }
    else{
        $("#weather").css("background-image","url(./SASS/pleasentbg.png)");
    }
    $("#weather").css("border","1px solid black");
    $("#weather").css("display","block");
}
function error(){
    let res = '<p>There was an error at our side please try again!</p>';
    targetDiv.insertAdjacentHTML('beforeend',res);
    $("#weather").css("border","none");
    $("#weather").css("display","block");
}
function userError(){
    let res = '<p>We cannot find this location in our database please check and try again!</p>';
    targetDiv.insertAdjacentHTML('beforeend',res);
    $("#weather").css("border","none");
    $("#weather").css("display","block");
}
function locationfunc(result){
    $("#options").text("");
    for(let i=0;i<result.length;i++){
        let place = result[i].name;
        let option = '<li><input class="option btn btn-outline-danger col-md-12 shadow-none" type="button" value="'+place+'"/></li>';
        options.insertAdjacentHTML('beforeend',option);
    }
}
$(document).on("click",".option",function(){
    $("#options").hide();
    $("#place").val($(".option").val());
})