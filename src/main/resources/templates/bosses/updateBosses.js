const bossListHtmlElement = document.getElementById("boss-list-div");

fetch("http://localhost:8080/bosses")
    .then(response => response.json())
    .then (bosses => {
        console.log(bosses);
        bosses.map(addBossToList)
    });

function addBossToList(boss){
    console.log(boss)
    const bossTableRow = document.createElement("tr");
    bossTableRow.id = "boss-tablerow-element-" + boss.id;
    bossListHtmlElement.appendChild(bossTableRow);
    constructBossRow(bossTableRow, boss);
}

function constructBossRow(bossTableRow, boss){
    bossTableRow.innerHTML = `
        <tr>
            <td>
                <p>${boss.name}</p>
            </td>
            <td>
                <button id="update-boss-button-${boss.id}">😊</button>
            </td>
            <td>
                <button onclick="deleteBoss(${boss.id})">❌</button>
            </td>
        </tr>
    `
    console.log(document.getElementById("update-boss-button-" + boss.id))
    document.getElementById("update-boss-button-" + boss.id).addEventListener("click", () => editBoss(boss));
}

function editBoss(boss){
    const bossTableRowToUpdate = document.getElementById("boss-tablerow-element-" + boss.id);
    bossTableRowToUpdate.innerHTML = `
        <tr>
            <td>
                <input id="update-boss-${boss.id}" value="${boss.name}">
            </td>
             <td>
                <button onclick="updateBossInBackend(${boss.id})">✔</button>
            </td>
           
            <td>
                <button onclick="deleteBoss(${boss.id})">❌</button>
            </td>
        </tr>
    `
}

function updateBossInBackend(id){
    const bossTableRowToUpdate = document.getElementById("boss-tablerow-element-" + id);
    const bossToUpdate = {
        id: id,
        name: document.getElementById("update-boss-" + id).value
    }

    fetch("http://localhost:8080/bosses/" + id, {
        method:"PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(bossToUpdate)
    }).then(response => {
        if (response.status === 200){
            constructBossRow(bossTableRowToUpdate, bossToUpdate);
        }
    });
}

function deleteBoss(id){
    fetch("http://localhost:8080/bosses/" + id, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("boss-tablerow-element-" + id).remove();
        } else {
            console.log(response.status);
        }
    })
}
