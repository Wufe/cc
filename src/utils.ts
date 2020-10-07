import { ColorGamut, Point, Color } from './types';

export function getColorGamutFromArray(array: number[][]): ColorGamut {
    const [r, g, b] = array;
    const [rx, ry] = r;
    const [gx, gy] = g;
    const [bx, by] = b;
    return { r: { x: rx, y: ry }, g: { x: gx, y: gy }, b: { x: bx, y: by } };
}

export function crossProduct(p1: Point, p2: Point) {
    return p1.x * p2.y - p1.y * p2.x;
}

export function getClosestPointToLine(a: Point, b: Point, p: Point) {
    const ap: Point = { x: p.x - a.x, y: p.y - a.y };
    const ab: Point = { x: b.x - a.x, y: b.y - a.y };
    const ab2 = ab.x * ab.x + ab.y * ab.y;
    const ap_ab = ap.x * ab.x + ap.y * ab.y;

    let t = ap_ab / ab2;

    if (t < 0) {
        t = 0;
    } else if (t > 1) {
        t = 1;
    }

    const newPoint: Point = { x: a.x + ab.x * t, y: a.y + ab.y * t };
    return newPoint;
}

export function getDistanceBetweenTwoPoints(one: Point, two: Point) {
    const dx = one.x - two.x;
    const dy = one.y - two.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist;
}

export function checkPointInLampsReach(p: Point, colorGamut: ColorGamut) {
    const { r, g, b } = colorGamut;
    const v1: Point = { x: g.x - r.x, y: g.y - r.y };
    const v2: Point = { x: b.x - r.x, y: b.y - r.y };

    const q: Point = { x: p.x - r.x, y: p.y - r.y };

    const s = crossProduct(q, v2) / crossProduct(v1, v2);
    const t = crossProduct(v1, q) / crossProduct(v1, v2);

    if ((s >= 0) && (t >= 0) && (s + t <= 1)) {
        return true;
    } else {
        return false;
    }
}

export function getClosestPointToPoint(xy: Point, colorGamut: ColorGamut) {
    const pAB: Point = getClosestPointToLine(colorGamut.r, colorGamut.g, xy);
    const pAC: Point = getClosestPointToLine(colorGamut.b, colorGamut.r, xy);
    const pBC: Point = getClosestPointToLine(colorGamut.g, colorGamut.b, xy);

    const dAB = getDistanceBetweenTwoPoints(xy, pAB);
    const dAC = getDistanceBetweenTwoPoints(xy, pAC);
    const dBC = getDistanceBetweenTwoPoints(xy, pBC);

    let lowest = dAB;
    let closestPoint: Point = pAB;

    if (dAC < lowest) {
        lowest = dAC;
        closestPoint = pAC;
    }
    if (dBC < lowest) {
        lowest = dBC;
        closestPoint = pBC;
    }

    return { x: xy.x, y: xy.y };
}

export function rgbChannelToHex(channel: number) {
    let hex = channel.toString(16);
    if (hex.length < 2)
        return `0${hex}`;
    return hex;
}

export function rgbToHex(rgb: Color) {
    return '#' +
        rgbChannelToHex(rgb.r) +
        rgbChannelToHex(rgb.g) +
        rgbChannelToHex(rgb.b);
}