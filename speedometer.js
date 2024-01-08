const speedElement = document.querySelector('#speed')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')


startBtn.addEventListener('click', ()=> {

    function handSuccess(position){
        console.log(position)
        speedElement.innerText = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) :0
    }

    function handError(error){
        console.log(error.msg)
    }

    const options = {enableHighAccuracy: true}
    navigator.geolocation.watchPosition(handSuccess, handError, options)

    startBtn.classList.add('d-none')
    stopBtn.classList.remove('d-none')
})

stopBtn.addEventListener('click', ()=> {

    stopBtn.classList.add('d-none')
    startBtn.classList.remove('d-none')
})