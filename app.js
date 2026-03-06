// LOAD TRAFFIC DATA

fetch("/traffic-data")
.then(res => res.json())
.then(data => {

document.getElementById("vehicle").innerHTML = data.vehicles
document.getElementById("signal").innerHTML = data.signals
document.getElementById("emergency").innerHTML = data.emergency
document.getElementById("roads").innerHTML = data.roads

})


// SEARCH TRAFFIC AREA

document.querySelectorAll(".search-box button").forEach(btn=>{

btn.addEventListener("click", async function(){

let area = this.parentElement.querySelector("input").value

if(area === ""){
alert("Enter city or country")
return
}

let res = await fetch("/search",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({area:area})
})

let data = await res.json()

if(data.error){
alert("Area not found")
return
}

document.getElementById("vehicle").innerText = data.vehicles
document.getElementById("signal").innerText = data.signals
document.getElementById("emergency").innerText = data.emergency
document.getElementById("roads").innerText = data.roads

document.getElementById("trafficMap").src =
`https://maps.google.com/maps?q=${area}&t=&z=13&ie=UTF8&iwloc=&output=embed`

})

})