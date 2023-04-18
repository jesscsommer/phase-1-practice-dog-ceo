console.log('%c HI', 'color: firebrick')

fetch('https://dog.ceo/api/breeds/image/random/4')
.then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw (response.statusText)
    }
}).then(data => {
    data.message.forEach((msg) => {
        const newImg = document.createElement('img')
        newImg.src = msg
        newImg.className = 'dog'
        document.querySelector('#dog-image-container').append(newImg)
    })
})
.catch(error => alert(error))

fetch('https://dog.ceo/api/breeds/list/all')
.then(response => {
    if (response.ok){
        return response.json()
    } else {
        throw (response.statusText)
    }
}).then(data => {
    const arrayOfBreeds = Object.keys(data.message)
    arrayOfBreeds.forEach((breed) => {
        const newBreed = document.createElement('li')
        newBreed.innerText = breed 
        newBreed.id = breed
        newBreed.addEventListener('click', handleClick)
        document.querySelector('#dog-breeds').append(newBreed)
    })
})
.catch(error => alert(error))

const handleClick = (e) => {e.target.classList.toggle('pink-text')}

// when dropdown's value is changed (change event listener) 
// filter the array of breeds into results vs. no results
// find all the lis with ids that match a breed that should be visible --> remove any invisibility class 
// find all the lis with ids that match a breed that shouldn't be visible --> add invisibility class

const handleChange = (e) => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
        if (response.ok){
            return response.json()
        } else {
            throw (response.statusText)
        }
    })
    .then(data => {
        const arrayOfBreeds = Object.keys(data.message)
        const arrayMatch = arrayOfBreeds.filter(breed => breed[0] === e.target.value)
        const arrayNoMatch = arrayOfBreeds.filter(breed => breed[0] !== e.target.value)
        arrayMatch.forEach((breed) => {
            document.querySelector(`#${breed}`).classList.remove('invisible')
        })
        arrayNoMatch.forEach((breed) => {
            document.querySelector(`#${breed}`).className = 'invisible'
        })
    })
}

document.querySelector('#breed-dropdown').addEventListener('change', handleChange)
