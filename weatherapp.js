const container = document.querySelector('.container');
const search = document.querySelector('.search-box-button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '4caab872feb0dd17f3fb923806507eeb';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
    fetch(`https://mi-linux.wlv.ac.uk/~2501776/my-api.php`)
  
    fetch(`https://mi-linux.wlv.ac.uk/~2501776/my-api.php?q=${city}`)

        

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    
    .then (response => response.json())
    .then (json => {
        if (json.cod === '404'){
            alert('Your Location Can Not Found');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case'Clear':
               image.src ='sun.png';
               break;
            case 'Rain':
                image.src ='sr.png';
                break;
            case 'Snow':
                image.src = 'ss.png';
                break;
            case 'Clouds':
                image.src ='cloud.png';
                break;
            case 'Mist':
                image.src ='sm.png';
                break;
            default:
                image.src ='cloud.png';
            
         }

         temperature.innerHTML=`${Math.round(json.main.temp)}<span>°C</span>`;
         description.innerHTML=`${json.weather[0].description}`;
         humidity.innerHTML =`${json.main.humidity}%`;
         wind.innerHTML =`${Math.round(json.wind.speed)} km/h`;
         
         
         document.getElementById("myWeather").innerHTML = response.weather_description;
         document.getElementById("myTemperature").innerHTML = response.weather_temperature;


         // Check browser cache first, use if there and less than 10 seconds old
    if(localStorage.when != null
    && parseInt(localStorage.when) + 10000 > Date.now()) {
 
       let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
       document.getElementById("myWeather").innerHTML = localStorage.myWeather;
       document.getElementById("myTemperature").innerHTML = localStorage.myTemperature;
       document.getElementById("myLastUpdated").innerHTML = freshness;
     
 // No local cache, access network
    } else {
     
     // Fetch weather data from API for given city
     fetch('https://mi-linux.wlv.ac.uk/~2501776/my-api.php?city=Wolverhampton')
         
       // Convert response string to json object
       .then(response => response.json())
       .then(response => {
             
         // Copy one element of response to our HTML paragraph
         document.getElementById("myWeather").innerHTML = response.weather_description;
         document.getElementById("myTemperature").innerHTML = response.weather_temperature;
         document.getElementById("myLastUpdated").innerHTML = response.weather_when;
         
         // Save new data to browser, with new timestamp
         localStorage.myWeather = response.weather_description;
         localStorage.myTemperature = response.weather_temperature + '°';
         localStorage.when = Date.now(); // milliseconds since January 1 1970
         
       })
       .catch(err => {
         
         // Display errors in console
         console.log(err);
         
            if(localStorage.when != null) {
          
              // Get data from browser cache
              let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
              document.getElementById("myParagraph").innerHTML = localStorage.myParagraph;
              document.getElementById("myTemperature").innerHTML = localStorage.myTemperature;
              document.getElementById("myLastUpdated").innerHTML = freshness;
          
            } else {
              // Display errors in console
              console.log(err);
            }
          
       
        });
     }	
 






     });
    


});
