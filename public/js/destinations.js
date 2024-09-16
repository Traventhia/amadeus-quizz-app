function getJsonData() {
    return fetch('public/destinations.json')
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error("Something went wrong", err))
}

async function filterSearch(query) {
    let dataJSON = await getJsonData();

    // Filtro para buscar destinos que coincidan con el término de búsqueda
    const dataFiltered = Array.from(dataJSON).filter(data => data.name.toLowerCase().includes(query.toLowerCase()));

    // Si no hay coincidencias, puedes mostrar un mensaje
    if (dataFiltered.length === 0) {
        document.getElementById('results').innerHTML = "<p>No se encontraron destinos</p>";
    } else {
        await printDataDestinations(dataFiltered);
    }
}

function printDataDestinations(data) {
    const mainContainer = document.getElementById("results");

    // Limpiar el contenedor antes de agregar nuevos resultados
    mainContainer.innerHTML = "";

    data.forEach(element => {
        const divContainer = document.createElement("div");
        divContainer.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card__header");
        divContainer.appendChild(cardHeader);

        const img = document.createElement("img");
        img.src = element.img;
        img.alt = element.name;
        cardHeader.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card__body");
        divContainer.appendChild(cardBody);

        const title = document.createElement("strong");
        title.classList.add("card__title");
        title.textContent = element.name;
        cardBody.appendChild(title);

        const description = document.createElement("p");
        description.classList.add("card__description");
        description.textContent = element.description;
        cardBody.appendChild(description);

        const button = document.createElement("button");
        button.classList.add("btn__primary");
        button.textContent = "Ver más";
        cardBody.appendChild(button);

        mainContainer.appendChild(divContainer);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("search");

    const updateSearch = () => filterSearch(search.value);

    updateSearch();
    search.addEventListener("input", updateSearch);
});

