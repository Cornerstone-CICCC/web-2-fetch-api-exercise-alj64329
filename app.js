// YOUR JS CODE HERE
async function getData(url){
    try{
    const response = await fetch(url)
    const data = await response.json()
    return data
    }catch(err){
        console.log(err)
    }
}

function writeData(arr){
    const container = document.querySelector('.container')
    const btn = document.querySelector('.btn-update')

    const update_date = new Date(arr.current.time)
    const temp = arr.current.temperature_2m

    container.innerHTML = `
    <h2>Today's Weather</h2>
    <h3 class="temperature ${temp>20? 'hot': temp<10?'cool':''}">
    ${temp} <span class="temp-unit">${arr.current_units.temperature_2m}<span>
    </h3>
    <h3 class="wind-speed">Wind Speed: ${arr.current.wind_speed_10m} ${arr.current_units.wind_speed_10m}</h3>
    <h3 class="location">${arr.timezone}</h3>
    <h3 class="updated-date">Last updated: ${update_date.toLocaleString()}</h3>
    `

    // Night mode if is_day is 0
    if(arr.current.is_day===0){
        document.querySelector("body").style.backgroundColor ="black"
        container.style.color ="white"
        container.querySelector('span').style.color = "white"
        btn.classList.add("night")
    }

}

function updateDate(arr){
    const container = document.querySelector('.container')
    container.innerHTML= 'Loading...'

    writeData(arr)
}

document.addEventListener('DOMContentLoaded', async function (){
    const data = await getData("https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1")
    writeData(data)
})

document.querySelector('.btn-update').addEventListener('click', async function(){
    const data = await getData("https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1")
    updateDate(data)
})

