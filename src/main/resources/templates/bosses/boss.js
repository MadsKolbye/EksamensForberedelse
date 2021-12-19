const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const id = URLParams.get("Id")
console.log(id)
fetch("http://localhost:8080/bosses/"+id)
    .then(response => response.json())
    .then(boss => {
        console.log(boss)
        document.getElementById("p-name").innerText = boss.name;
        document.getElementById("p-health").innerText = boss.health;
        document.getElementById("p-ability").innerText = boss.ability;
    })


function constructBossTableRow(bossTableRow, boss){
    bossTableRow.innerHTML= `
        <td>
            <p class="row-boss-name">${escapeHTML(boss.name)}</p>
        </td>
        <td>
            <p class="row-boss-health">${escapeHTML(boss.health)}</p>
        </td>
        <td>
            <p class="row-boss-ability">${escapeHTML(boss.ability)}</p>
        </td>
        <td>
            <button id="update-button-${boss.id}">✔</button>
        </td>
    `;

    document.getElementById(`update-button-${boss.id}`).addEventListener("click", () => updateBoss(boss))
}
