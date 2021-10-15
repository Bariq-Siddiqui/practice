import React, { useEffect, useState,useRef  } from "react"; 
import axios from 'axios';
import './style.css';
// const Tempapp=()=>{
//     const [weather, setweather] = useState(null)
//     const [search,setSearch]=useState("Karachi");
//     useEffect(() => {
//       axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=41e7ed6fb208d067b64d2de9d172b32c`)
//         .then(res => {
//           const newWeather = res.data;
//           console.log(newWeather);
  
//           setweather(newWeather);
//         });
  
//     }, [search]);
//     // const [isBright, setIsBright]=React.useState(false);
//     // const changeState=()=>{
//     //   setIsBright(!isBright)
//     // }
//     return (
//       <div className={ (weather?.weather[0].main =='Rain')? "rain main_div col-md-5" :(weather?.weather[0].main =='Thunderstorm')? "thunderStorm main_div col-md-5" : (weather?.weather[0].main =='Haze')?"Haze main_div col-md-5" :(weather?.weather[0].main =='Clouds')?"Clear main_div col-md-5" :(weather?.weather[0].main =='Smoke')? "Smoke main_div col-md-5": "Clear main_div col-md-5"}>
//         {/* <button onClick={changeState } className="Btn">{ isBright ? "Dark Mode" : "Bright"}</button>
        
//         { isBright ? <i class="fas fa-moon" onClick={changeState }></i> : <i class="fas fa-sun" onClick={changeState }></i>} */}
//         <h2>Weather App</h2>
//          <div>
//              <div className="inputData">
//                  <input
//                 type="search"
//                 className="inputField"
//                 onChange={(event)=>{
//                     setSearch(event.target.value)
//                 }}/>
//             </div>
//          </div>
//         {
//           (weather !== null) ?
//             <>
//               <div className=''>

//                   <h1>{weather.name}</h1>
//                   <h4>{weather?.weather[0].main}</h4>
//                   <h2>{weather?.main?.temp}°Cel</h2>
//                   <h4>{weather?.sys?.country}</h4><br/><br/>
//                   <div className="row weatherInformatin">
//                   <div className="col-6">
//                   <p className="para">Wind Speed: {weather?.wind.speed}</p>
//                   <p className="para">Max Temp: {weather?.main?.temp_max}°C</p>
//                   <p className="para">Air Pressure: {weather?.main?.pressure}mbar</p>
//                   </div>
//                   <div className="col-6">
//                   <p className="para">Feels Like: {weather?.main?.feels_like}°C</p>
//                   <p className="para">Min Temp: {weather?.main?.temp_min}°C</p>
//                   <p className="para">Humidity: {weather?.main?.humidity}</p>
//                   </div>
//                   </div>

//               </div>
//             </>
//             :
//             <h1>Loading...</h1>
//         }
//         </div>
//     );
// }

    // const [city,setCity]=useState(null);
    // const [search,setSearch]=useState("Karachi");
    // useEffect(()=>{
    //     const fetchApi= async()=>{
    //         const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=41e7ed6fb208d067b64d2de9d172b32c`;
    //         const response = await fetch(url);
    //         const resJson = await response.json();
    //         console.log(resJson)
    //         setCity(resJson.main)
    //     }
    //     fetchApi();
    // },[search])
    // return(
    //     <>
    //     <div className="box">
    //         <div className="inputData">
    //             <input
    //             type="search"
    //             className="inputField"
    //             onChange={(event)=>{
    //                 setSearch(event.target.value)
    //             }}/>
    //         </div>
    //     </div>
    //     { !city ? (
    //         <p>Not Data Found</p>
    //     ):(
    //         <div className="info">
    //             <h2 className="location">
    //             <i className="fas fa-street-view"></i>{search}
    //             </h2>
    //             <h1 className="temp">
    //                 {city.temp}°Cel
    //             </h1>
    //             <h3 className="tempmin_max">Min: {city.temp}°Cel  | Max: {city.temp}°Cel</h3>
    //         </div>
    //     )
    //     }
    //     </>
    // )


    function Tempapp() {
      const [weather, setweather] = useState(null)
      const cityName = useRef(null);
      const [location, setLocation] = useState(null)
      const [submit, setSubmit] = useState(false)
      useEffect(() => {    
        let name = "";    
        if (cityName.current.value) {
          name = `q=${cityName.current.value}`
        } else if (location) {
          if (!location) {
          } else if (location === "fail") {
            name = "q=Pakistan";
          } else if (location && location.latitude) {
            name = `lat=${location.latitude}&lon=${location.longitude}`
          }
        }
        console.log("name: ", name)
        if (name) {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
            .then(res => {
              const newWeather = res.data;
              setweather(newWeather);
            });
        }
      }, [submit, location]);
      useEffect(() => {
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              console.log("position got: ", position.coords.latitude);
              // console.log("position got: ", position.coords.longitude);
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
            }, function (error) {
              setLocation("fail")
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }
        getLocation()
      }, []);
      return (
        <div className={ (weather?.weather[0].main =='Rain')? "rain main_div col-md-5" :(weather?.weather[0].main =='Thunderstorm')? "thunderStorm main_div col-md-5" : (weather?.weather[0].main =='Haze')?"Haze main_div col-md-5" :(weather?.weather[0].main =='Clouds')?"Cloud main_div col-md-5" :(weather?.weather[0].main =='Smoke')? "Smoke main_div col-md-5": "Clear main_div col-md-5"}>
          <h2>Weather App</h2>
          <input ref={cityName} className='input' placeholder='City Name'/>
          <button onClick={() => {
            console.log("name: ", cityName.current.value)
            setSubmit(!submit)
          }} className='btn'>Submit</button>
          <br />
          {
          (weather !== null) ?
            <>
              <div className=''>

                  <h1>{weather.name}</h1>
                  <h4>{weather?.weather[0].main}</h4>
                  <h2>{weather?.main?.temp}°Cel</h2>
                  <h4>{weather?.sys?.country}</h4><br/><br/>
                  <div className="row weatherInformatin">
                  <div className="col-6">
                  <p className="para">Wind Speed: {weather?.wind.speed}</p>
                  <p className="para">Max Temp: {weather?.main?.temp_max}°C</p>
                  <p className="para">Pressure: {weather?.main?.pressure}mbar</p>
                  </div>
                  <div className="col-6">
                  <p className="para">Feels Like: {weather?.main?.feels_like}°C</p>
                  <p className="para">Min Temp: {weather?.main?.temp_min}°C</p>
                  <p className="para">Humidity: {weather?.main?.humidity}</p>
                  </div>
                  </div>

              </div>
            </>
            :
            <h1>Loading...</h1>
        }
        </div>
        
      );
    }
export default Tempapp;
