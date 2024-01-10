const rideListElement = document.querySelector('#rideList')
const allRide = getAllRides()


allRide.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement('li')
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center shadow-sm gap-3"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener('click', () =>{
        window.location.href = `./detail.html?id=${ride.id}`
    }) 
    

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const mapElement = document.createElement('div')
    mapElement.style = "width:100px; height:100px;"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

    const dataElement = document.createElement('div')
    dataElement.className = "flex-fill d-flex flex-column"
    

    const cityDiv = document.createElement('div')
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
    dataElement.appendChild(cityDiv)
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText =`Max speed: ${getMaxSpeed(ride.data)} Km` 
    dataElement.appendChild(maxSpeedDiv)
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement('div')
    distanceDiv.innerText =`Distance: ${getDistance(ride.data)} Km`
    dataElement.appendChild(distanceDiv)

    const durationDiv = document.createElement('div')
    durationDiv.innerText =`Duration: ${getDuration(ride)}` 
    dataElement.appendChild(durationDiv)
    

    const dateDiv = document.createElement('div')
    dateDiv.innerText = getStartDate(ride)
    dataElement.appendChild(dateDiv)
    dateDiv.className = "text-secondary mt-2"

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

})

