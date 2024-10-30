import k from "../kaplayCtx";

const gameover = (citySfx, currentScore) => {

    citySfx.paused = true;
    let bestScore = k.getData("best-score");

    const ranksGrades = ["F", "E", "D", "C", "B", "A", "S"];
    const ranksValues = [50, 80, 100, 200, 300, 400, 500];

    let currentGrade = "F";
    let bestRank = "F";

    for (let i = 0; i < ranksValues.length; i++) {
        if(currentScore > ranksValues[i])
            currentGrade = ranksGrades[i]

        if(bestScore > ranksValues[i])
            bestRank = ranksGrades[i]
       
    }

    k.add([
        k.text("GAME OVER", { font: "mania", size: 100 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),
    ]);

    k.add([
        k.text(`BEST SCORE : ${bestScore}`, { font: "mania", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 200),
    ]);

    k.add([
        k.text(`CURRENT SCORE : ${currentScore}`, { font: "mania", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 200),
    ]);

    const bestRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y + 50)
    ])

    bestRankBox.add([
        k.text(bestRank, { font: "mania", size: 200 }),
        k.anchor("center"),
    ])

    const bestCurrentBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y + 50)
    ])

    bestCurrentBox.add([
        k.text(currentGrade, { font: "mania", size: 200 }),
        k.anchor("center"),
    ])

    k.wait(1, () => {
        k.add([k.text("Press Space/Click/Touch to Play", {
            font: "mania",
            size: 64
        }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 350) 
        ])
        k.onButtonPress("jump", () => k.go("game"));
    })
}

export default gameover;