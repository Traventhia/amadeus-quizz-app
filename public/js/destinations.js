function getJsonData() {
    return fetch('public/destinations.json')
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error("Something went wrong", err))
}

async function filterSearch(query) {
    let dataJSON = await getJsonData();
    const dataFiltered = Array.from(dataJSON).filter(data => data.name.toLowerCase().includes(query.toLowerCase()));
    await printDataDestinations(dataFiltered);
    return dataFiltered;
}

function printDataDestinations(data) {
    const mainContainer = document.getElementById("results");
    mainContainer.querySelectorAll("div").length != 0 ? mainContainer.innerHTML = " " : null;
    data.forEach(element => {
        const divContainer = document.createElement("div");
        divContainer.classList.add("card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        divContainer.appendChild(cardContent);
        
        const img = document.createElement("img");
        img.src = element.img;
        cardContent.appendChild(img);
        
        const description = document.createElement("p");
        description.textContent = element.description;
        cardContent.appendChild(description);

        const title = document.createElement("strong");
        title.textContent = element.name;
        cardContent.appendChild(title);


        mainContainer.appendChild(divContainer);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("search");
    const updateSearch = () => filterSearch(search.value);
    updateSearch();
    search.addEventListener("input", updateSearch);
});
