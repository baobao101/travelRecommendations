const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', search);
const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', clear);

async function search() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const result = document.getElementById('result');
    result.innerHTML = '';
    await fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let destinationC = data.countries.find(item => item.name.toLowerCase() === input);
            let destinationT = data.temples.find(item => item.name.toLowerCase() === input || item.name.split(",")[0].toLowerCase() === input.split(",")[0].toLowerCase());
            let destinationB = data.beaches.find(item => item.name.toLowerCase() === input || item.name.split(",")[0].toLowerCase() === input.split(",")[0].toLowerCase());
            let dest_anyC = input === 'country' || input === 'countries';
            let dest_anyB = input === 'beach' || input === 'beaches';
            let dest_anyT = input === 'temple' || input === 'temples';
            if (destinationC || destinationT || destinationB) {
                if (destinationC) {
                    console.log('c');
                    for (country of data.countries) {
                        if (country.name.toLowerCase() === input) {
                            for (each of country.cities) {
                                console.log(each.name.toLowerCase());
                                result.innerHTML +=
                                    `<img src="${each.imageUrl}"/>
                                    <h1>${each.name}</h1>
                                    <p>${each.description}</p>
                                    
                                    `
                            }
                        }
                    }
                }
                else if (destinationT) {
                    console.log('T');
                    for (temple of data.temples) {
                        if (temple.name.toLowerCase() === input) {
                            console.log(temple.name.toLowerCase());
                            result.innerHTML +=
                                `<img src="${temple.imageUrl}"/>
                                <h1>${temple.name}</h1>
                                <p>${temple.description}</p>
                                
                                `
                        } else if (temple.name.split(",")[0].toLowerCase() === input.split(",")[0].toLowerCase()) {
                            console.log(temple.name.toLowerCase());
                            result.innerHTML +=
                                `<img src="${temple.imageUrl}"/>
                                <h1>${temple.name}</h1>
                                <p>${temple.description}</p>
                                
                                `
                        }
                    }
                }
                else {
                    console.log('B');
                    for (beach of data.beaches) {
                        if (beach.name.toLowerCase() === input) {
                            console.log(beach.name.toLowerCase());
                            result.innerHTML +=
                                `
                                <img src="${beach.imageUrl}"/>
                                <h1>${beach.name}</h1>
                                <p>${beach.description}</p>
                                
                                `
                        } else if (beach.name.split(",")[0].toLowerCase() === input.split(",")[0].toLowerCase()) {
                            console.log(beach.name.toLowerCase());
                            result.innerHTML +=
                                `<img src="${beach.imageUrl}"/>
                                <h1>${beach.name}</h1>
                                <p>${beach.description}</p>
                                
                                `
                        }
                    }
                }
            } else if (dest_anyC) {
                for (country of data.countries) {
                    console.log(country.name.toLowerCase());
                    for (each of country.cities) {
                        console.log(each.name.toLowerCase());
                        result.innerHTML +=
                            `<img src="${each.imageUrl}"/> 
                                    <h1>${each.name}</h1>
                                    <p>${each.description}</p>
                                                           
                        `
                    }
                }
            }
            else if (dest_anyB) {
                for (beach of data.beaches) {
                    console.log(beach.name.toLowerCase());
                    result.innerHTML +=
                        ` <img src="${beach.imageUrl}"/>  
                                <h1>${beach.name}</h1>
                                <p>${beach.description}</p>
                                                     
                        `
                }
            } else if (dest_anyT) {
                for (temple of data.temples) {
                    console.log(temple.name.toLowerCase());
                    result.innerHTML +=
                        ` <img src="${temple.imageUrl}"/> 
                                <h1>${temple.name}</h1>
                                <p>${temple.description}</p>
                                                      
                        `
                }
            }
            else {
                console.log('no info');
                result.innerHTML = `<h1>No recommendation.</h1>`
            }
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = 'An error occurred while fetching data.';
        });
}

function clear() {
    document.getElementById('result').innerHTML = `
        <h1>EXPLORE THIS BUSY WORLD WITH BUSYBIRD!</h1>
        <p>Travel around the world. See the best sceneries, visit the most interesting museums, meet experienced guides,
        hang out with other fun tourists, and take great photos! We'll take care of the boring stuff - hotels, flights,
        meals, transportation, scheduling. You just enjoy your vacation!</p>    
    `
    document.getElementById('searchBar').value = '';
    console.log('cleared');
}

