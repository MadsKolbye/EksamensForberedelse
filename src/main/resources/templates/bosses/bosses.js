const bossWrapper = document.getElementById("boss-div");
let filteredBosses;
let bosses;

fetch("http://localhost:8080/bosses")
    .then(response => response.json())
    .then(result => {
        console.log(result);
        result.map(createBossCard);
    })

function createBossCard(boss){
    const bossElement = document.createElement("div");
    bossElement.innerHTML = `
        <br>
        <br>
        <a href="./boss.html?Id=${boss.id}">
            <img class = "boss-image" src="${boss.image}" style="height: 400px">
        </a>
        <br>
        <a id="boss-name" style="font-size: 50px;">${escapeHTML(boss.name)}</a>
    `
    bossWrapper.appendChild(bossElement);
}

function createNewBoss(){

    const name = document.getElementById("create-boss-name").value;
    const health = document.getElementById("create-boss-health").value;
    const ability = document.getElementById("create-boss-health").value;
    const image = document.getElementById("create-boss-image").value;

    const newBoss = {
        name: name,
        health: health,
        ability: ability,
        image: image
    };

    fetch("http://localhost:8080/bosses", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newBoss)
    })
        .then(response => {
            if (response.status === 200) {
                createBossCard(newBoss);
            } else {
                console.log("Boss not created....", response.status)
            }
        })
        .catch(error => console.log("Network error...", error))
}
document.getElementById("create-boss-button").addEventListener("click", createNewBoss)