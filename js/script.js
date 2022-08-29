const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url)
    const data = await res.json()

    displayPhones(data.data)
}

const displayPhones = async phones => {
    const phoneContainer = document.getElementById('phone-container')

    phones.forEach(phone => {
        console.log(phone)

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
                    <button class="py-2 px-5 bg-indigo-500 text-white font-semibold rounded-lg shadow-md shadow-indigo-500/40">Learn More &rarr;</button>
                </div>
            </div>
        `

        phoneContainer.appendChild(phoneDiv)
    })
}

loadPhones()


        // <div class="h-full bg-white rounded-2xl p-3 shadow-md">
        //     <a href="#" class="flex flex-col items-center md:flex-row md:max-w-xl">

        //         <div class="grid place-items-center">
        //             <img class="h-full" src="${phone.image}">
        //         </div>

        //         <div class="self-start flex flex-col justify-between p-4 leading-normal">
        //             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${phone.phone_name}</h5>
        //             <p class="mb-3 font-normal text-gray-700/50"><span>Brand: </span>${phone.brand}</p>
        //         </div>
        //     </a>
        // </div>