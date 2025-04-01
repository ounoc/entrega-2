let subtitulo = document.createElement("h2")
subtitulo.textContent = "Ingresa el ID o nombre de un Pokémon"
let pokeid = document.createElement("input")
pokeid.id = "pokemoninput"
pokeid.placeholder = "Pokémon"
let boton = document.createElement("button")
boton.textContent = "Buscar Pokémon"
let botonhistorial = document.createElement("button")
botonhistorial.textContent = "Mostrar Historial"
let botonborrarhistorial = document.createElement("button")
botonborrarhistorial.textContent = "Borrar Historial"
let resultado = document.createElement("div")
let fallo = document.createElement("h2")
let historial = JSON.parse(localStorage.getItem("historial")) || []
async function buscarPokemon(pokemon) {
    let nombrePokemon = pokemon.toLowerCase().trim()
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon)
        if (!response.ok) throw new Error("No encontrado")
        let data = await response.json()
        let pokegen, region, gen = data.id
        if (gen <= 151) { pokegen = 1; region = "Kanto" }
        else if (gen <= 251) { pokegen = 2; region = "Johto" }
        else if (gen <= 386) { pokegen = 3; region = "Hoenn" }
        else if (gen <= 493) { pokegen = 4; region = "Sinnoh" }
        else if (gen <= 649) { pokegen = 5; region = "Teselia" }
        else if (gen <= 721) { pokegen = 6; region = "Kalos" }
        else if (gen <= 809) { pokegen = 7; region = "Alola" }
        else if (gen <= 905) { pokegen = 8; region = "Galar" }
        else { pokegen = 9; region = "Paldea" }
        let speciesResponse = await fetch(data.species.url)
        let speciesData = await speciesResponse.json()
        let flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === "es")?.flavor_text || "Descripción no disponible"
        let tipos = data.types.map(t => t.type.name).join(", ")
        resultado.innerHTML = `
            <div class="pokemon-card">
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h3>Tipo: ${tipos}</h3>
                <h3>ID: ${data.id}</h3>
                <h3>Generación: ${pokegen}</h3>
                <h3>Región: ${region}</h3>
                <p>Descripción: ${flavorText}</p>
            </div>
        `
        if (!historial.some(p => p.nombre === data.name)) {
            historial.push({ nombre: data.name, sprite: data.sprites.front_default })
            localStorage.setItem("historial", JSON.stringify(historial))
        }
        pokeid.value = "" 
    } catch (error) {
        resultado.innerHTML = "<p style='color:red;'>Pokémon no encontrado</p>"
    }
}
boton.onclick = () => buscarPokemon(pokeid.value)
botonhistorial.onclick = () => {
    if (historial.length === 0) {
        resultado.innerHTML = "<p>No hay historial</p>"
        return
    }
    resultado.innerHTML = "<h2>Historial de búsquedas</h2><div class='historial-list'></div>"
    let historialList = document.querySelector(".historial-list")
    historial.forEach((pokemon, index) => {
        let item = document.createElement("div")
        item.classList.add("historial-item")
        item.setAttribute("data-index", index)
        item.innerHTML = `
            <img src="${pokemon.sprite}" alt="${pokemon.nombre}">
            <p>${pokemon.nombre.toUpperCase()}</p>
        `
        item.addEventListener("click", () => buscarPokemon(pokemon.nombre))
        historialList.appendChild(item)
    })
}
botonborrarhistorial.onclick = () => {
    Swal.fire({
        title: '¿Quieres borrar el historial?',
        icon: 'question',
        confirmButtonText: 'Sí',
        showDenyButton: true,
        denyButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            historial = []
            localStorage.removeItem("historial")
            resultado.innerHTML = ""
            Swal.fire({
                title: "Borrado!",
                text: "Tu historial ha sido borrado con éxito.",
                icon: "success"
            })
        }
    })
}
document.body.append(subtitulo, pokeid, boton, botonhistorial, botonborrarhistorial, resultado, fallo)