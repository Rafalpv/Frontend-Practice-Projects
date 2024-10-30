import { makeMotoBug } from "../entitis/motobug";
import { makeRing } from "../entitis/ring";
import { makeSonic } from "../entitis/sonic";
import k from "../kaplayCtx";

const game = () => {
    k.setGravity(3500);
    const citySfx = k.play("citySound", { volume: 0.2, loop: true });

    const currentScore = k.add([
        k.text("Score 0", { font: "mania", size: 80 }),
        { value: 0 }
    ])

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8), k.area()]),
        k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth * 2, 0), k.scale(2), k.opacity(0.8), k.area()])
    ];

    const platformWitdh = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWitdh * 4, 450), k.scale(4)]),
    ];

    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            k.play("destroy", { volume: 0.5 });
            k.play("hyper-ring", { volume: 0.5 })
            k.destroy(enemy);
            sonic.play("jump");
            sonic.jump();
            currentScore.value += 10;
            currentScore.text = "Score " + currentScore.value;
            return;
        }
        k.play("hurt");
        k.setData("best-score", currentScore.value > k.getData("best-score") ? currentScore.value : k.getData("best-score"));
        k.go("gameover", { citySfx }, currentScore.value);
    });

    sonic.onCollide("ring", (ring) => {
        k.play("ring", { volume: 0.5 });
        k.destroy(ring);
        currentScore.value += 1;
        currentScore.text = "Score " + currentScore.value;
    })

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 30;
    });

    const spawnMotoBug = () => {
        const motoBug = makeMotoBug(k.vec2(1950, 773));
        motoBug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motoBug.move(-(gameSpeed + 300), 0);
                return
            }
            motoBug.move(-gameSpeed, 0);
        })

        motoBug.onExitScreen(() => {
            if (motoBug.pos.x < 0)
                k.destroy(motoBug);
        })

        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug)
    }
    spawnMotoBug();

    const spawnRing = () => {
        const ring = makeRing(k.vec2(1950, k.rand(373, 720)));
        ring.onUpdate(() => {
            if (gameSpeed < 3000) {
                ring.move(-(gameSpeed + 300), 0);
                return
            }
            ring.move(-gameSpeed, 0);
        })
        ring.onExitScreen(() => {
            if (ring.pos.x < 0)
                k.destroy(ring);
        })

        const waitTime = k.rand(2, 5);
        k.wait(waitTime, spawnRing)
    }
    spawnRing();

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true }),
    ]);

    k.onUpdate(() => {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0)
            bgPieces.push(bgPieces.shift());
        }
        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWitdh * 4, 450)
            platforms.push(platforms.shift());
        }
        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWitdh * 4, 450);
    })

}

export default game;