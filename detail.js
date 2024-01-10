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

})