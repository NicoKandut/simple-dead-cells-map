const LEVELS = [{"name":"Prisoners' Quarters","depth":0,"exits":[{"name":"Promenade of the Condemned"},{"name":"Toxic Sewers","condition":{"type":"rune","rune":"Vine Rune"}}],"scrolls":2},{"name":"Promenade of the Condemned","depth":1,"exits":[{"name":"Prison Depths","condition":{"type":"rune","rune":"Spider Rune"}},{"name":"Ossuary","condition":{"type":"rune","rune":"Teleportation Rune"}},{"name":"Ramparts"}],"scrolls":3},{"name":"Prison Depths","depth":2,"exits":[{"name":"Ossuary"}],"scrolls":1},{"name":"Toxic Sewers","depth":1,"exits":[{"name":"Ramparts"},{"name":"Ancient Sewers","condition":{"type":"rune","rune":"Beliers Rune"}}],"scrolls":3},{"name":"Ramparts","depth":3,"exits":[{"name":"Black Bridge"},{"name":"Insufferable Crypt","condition":{"type":"cells","amount":3}}],"scrolls":4},{"name":"Ossuary","depth":3,"exits":[{"name":"Black Bridge"}],"scrolls":4},{"name":"Ancient Sewers","depth":3,"exits":[{"name":"Insufferable Crypt"}],"scrolls":4},{"name":"Black Bridge","depth":4,"exits":[{"name":"Stilt Village"},{"name":"Slumbering Sanctuary","condition":{"type":"rune","rune":"Spider Rune"}}]},{"name":"Insufferable Crypt","depth":4,"exits":[{"name":"Slumbering Sanctuary"},{"name":"Graveyard","condition":{"type":"rune","rune":"Spider Rune"}}]},{"name":"Stilt Village","depth":5,"exits":[{"name":"Clock Tower"},{"name":"Forgotten Sepulcher","condition":{"type":"rune","rune":"Teleportation Rune"}}],"scrolls":4},{"name":"Slumbering Sanctuary","depth":5,"exits":[{"name":"Forgotten Sepulcher"},{"name":"Clock Tower"}],"scrolls":4},{"name":"Graveyard","depth":5,"exits":[{"name":"Forgotten Sepulcher"}],"scrolls":5},{"name":"Forgotten Sepulcher","depth":6,"exits":[{"name":"Clock Room"}],"scrolls":5},{"name":"Clock Tower","depth":6,"exits":[{"name":"Clock Room"}],"scrolls":5},{"name":"Clock Room","depth":7,"exits":[{"name":"High Peak Castle"}]},{"name":"High Peak Castle","depth":8,"exits":[{"name":"Throne Room"}],"scrolls":3},{"name":"Throne Room","depth":9,"exits":[{"name":"Pier"}]},{"name":"Pier","depth":10}];

document.addEventListener("DOMContentLoaded", () => {
    let table = $('<table>').addClass("map-grid");
    let row = $('<tr>').addClass("map-row");

    let maxDepth = LEVELS.reduce((max, lvl) => lvl.depth > max ? lvl.depth : max, -1);

    for (let i = 0; i <= maxDepth; i++) {
        let column = $("<td>").addClass('column');
        let depthLevels = LEVELS.filter((lvl) => lvl.depth === i);

        for (let lvl of depthLevels) {
            let entry = $("<div>").attr("id", "lvl-" + normalize(lvl.name)).addClass("level");
            let title = $("<h5>").text(lvl.name);
            let scrolls = $("<span>").addClass("scrolls").text(lvl.scrolls);

            entry.append(title);
            entry.append(scrolls);
            column.append(entry);
        }
        row.append(column);
    }
    table.append(row);
    $("#map-container").append(table);

    for (let lvl of LEVELS) {
        if (lvl.exits) {
            for (let exit of lvl.exits) {
                let from = normalize(lvl.name);
                let to = normalize(exit.name);
                console.log(from + " -> " + to);
            }
        }
    }
});

function normalize(name) {
    return name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
}