// load phones data
const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayPhones(data.data, dataLimit)
}

// display phones
const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ``

    // showing first 12 phones
    const showAll = document.getElementById('load-more')
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12)
        showAll.classList.remove('hidden')
    } else {
        showAll.classList.add('hidden')
    }

    // display no phone fount
    const noPhone = document.getElementById('no-phone-found')
    if (phones.length == 0) {
        noPhone.classList.remove('hidden')
    } else {
        noPhone.classList.add('hidden')
    }

    phones.forEach((phone) => {
        // console.log(phone)

        const phoneDiv = document.createElement('div')
        phoneDiv.innerHTML = `
            <div class="overflow-hidden h-full bg-white rounded-xl shadow-lg p-3 flex md:flex-row flex-col">
            
                <img class="" src="${phone.image} " alt="${phone.slug} ">

                <div class="w-full pl-4 flex flex-col justify-between items-start space-y-5">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">${phone.phone_name} </h1>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        By ${phone.brand}
                        </p>
                    </div>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="self-end py-2 px-5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md shadow-indigo-500/40 hover:bg-indigo-700 transition-all duration-300 modal-button cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Learn More &rarr;</button>
                </div>
            </div>
        `

        phoneContainer.appendChild(phoneDiv)
    })

    // stop loader
    toggleLoader(false)

}

// process search
const processSearch = (dataLimit) => {
    toggleLoader(true)

    const searchField = document.getElementById('search-field')
    const searchFieldData = searchField.value

    loadPhones(searchFieldData, dataLimit)
}

// search button handler
document.getElementById('btn-search').addEventListener('click', () => {
    // start loader
    processSearch(12)
})

// search on enter key press
document.getElementById('search-field').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processSearch(12)
    }
})

// loading spinner
const toggleLoader = (isLoading) => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    } else {
        loaderSection.classList.add('hidden')
    }
}

// show all
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch()
})

// load phone details
const loadPhoneDetails = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url)
    const data = await res.json()

    displayPhoneDetails(data.data)
}

// display phone details
const displayPhoneDetails = (phone) => {
    
    // phone name
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name

    // showing image
    const phoneImage = document.getElementById('phone-image')
    phoneImage.innerHTML = `
        <img class="rounded-lg w-96 " src="${phone.image}" alt="">
    `

    // phone details
    const phoneDetails = document.getElementById('phone-specific-details')
    phoneDetails.innerHTML = `
    <p class="">Manufactured by <span class="text-indigo-700 font-bold">${phone.brand}</span></p>
    <p class="font-semibold">${phone.releaseDate ? phone.releaseDate : 'No Release Date For Now'}</p>

    <p class="pt-2"><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No info available'} </p>

    <p><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No info available'} </p>

    <p><span class="font-semibold">Storage:</span> ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No info available'} </p>
    
    <p class="pt-4"><span class="font-semibold">USB:</span> ${phone.others ? `${phone.others?.USB}` : 'No info available'}</p>
    <p><span class="font-semibold">Bluetooth:</span> ${phone.others ? `${phone.others?.Bluetooth}` : 'No info available'}</p>
    <p><span class="font-semibold">NFC:</span> ${phone.others ? `${phone.others?.NFC}` : 'No info available'}</p>
    `

}
