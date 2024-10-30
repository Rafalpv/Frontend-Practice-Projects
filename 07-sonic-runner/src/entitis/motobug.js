import k from '../kaplayCtx';

export const makeMotoBug = (pos) => {
    const motoBug = k.add([
        k.sprite("motobug", {anim : "run"}),
        k.scale(4),
        k.area({shape: new k.Rect(k.vec2(-5,0),35,35)}),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "enemy",
    ]);

    return motoBug;
}