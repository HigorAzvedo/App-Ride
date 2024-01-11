const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener('DOMContentLoaded', async () => {

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const dataElement = document.createElement('div')
    dataElement.className = "flex-fill d-flex flex-column"


    const cityDiv = document.createElement('div')
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
    dataElement.appendChild(cityDiv)
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km`
    dataElement.appendChild(maxSpeedDiv)
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement('div')
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`
    dataElement.appendChild(distanceDiv)

    const durationDiv = document.createElement('div')
    durationDiv.innerText = `Duration: ${getDuration(ride)}`
    dataElement.appendChild(durationDiv)


    const dateDiv = document.createElement('div')
    dateDiv.innerText = getStartDate(ride)
    dataElement.appendChild(dateDiv)
    dateDiv.className = "text-secondary mt-2"

    document.querySelector("#data").appendChild(dataElement)

    const deleteButton = document.querySelector('#deleteBtn')
    deleteButton.addEventListener('click', ()=> {

        deleteRide(rideID)
        window.location.href = './'
    })

    // site para mudar o mapa:  https://leaflet-extras.github.io/leaflet-providers/preview/
    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        // attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    const postionsArray = ride.data.map((position => {
        return [position.latitude, position.longitude]
    }))
    
    const polyLine = L.polyLine(postionsArray, { color: "#F00"})
    polyLine.addTo(map)

    map.fitBounds(polyLine.getBounds())

})