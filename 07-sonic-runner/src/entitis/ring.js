import k from "../kaplayCtx";

export const makeRing = (pos) => {
    const ring = k.add([
        k.sprite("ring", {anim: "spin"}),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "ring"
    ])
    return ring;
}