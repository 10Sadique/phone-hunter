// load phones data
const loadPhones = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayPhones(data.data)
}

// display phones
const displayPhones = async phones => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ``
    // showing first 21 phones
    phones = phones.slice(0, 21)

    // display no phone fount
    const noPhone = document.getElementById('no-phone-found')
    if (phones.length == 0) {
        noPhone.classList.remove('hidden')
    } else {
        noPhone.classList.add('hidden')
    }

    phones.forEach(phone => {
        // console.log(phone)

        const phoneDiv = document.createElement('div')
        phoneDiv.innerHTML = `
            <div class="overflow-hidden h-full bg-white rounded-xl shadow-lg p-3 flex md:flex-row flex-col">
            
                <img class="" src="${phone.image} " alt="${phone.slug} ">

                <div class="px-4 py-2 flex flex-col justify-between items-start">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">${phone.phone_name} </h1>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        By ${phone.brand}
                        </p>
                    </div>
                    <button class="py-2 px-5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md shadow-indigo-500/40 hover:bg-indigo-700 transition-all duration-300">Learn More &rarr;</button>
                </div>
            </div>
        `

        phoneContainer.appendChild(phoneDiv)
    })
}

// search button handler
document.getElementById('btn-search').addEventListener('click', () => {
    const searchField = document.getElementById('search-field')
    const searchFieldData = searchField.value 


    loadPhones(searchFieldData)
    searchField.value = ''
})
