import { defaultGamut } from "./gamuts";
import { Color, ColorGamut, Point } from "./types";
import { checkPointInLampsReach, getClosestPointToPoint } from "./utils";

export function rgbToXy(color: Color, colorGamut: ColorGamut = defaultGamut) {
    let { r, g, b } = color;

    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    r = red > .04045 ? Math.pow(((red + .055) / (1 + .055)), 2.4) : (red / 12.92);
    g = green > .04045 ? Math.pow(((green + .055) / (1 + .055)), 2.4) : (green / 12.92);
    b = blue > .04045 ? Math.pow(((blue + .055) / (1 + .055)), 2.4) : (blue / 12.92);

    const X = r * .0664511 + g * .154324 + b * .162028;
    const Y = r * .283881 + g * .668433 + b * .047685;
    const Z = r * .000088 + g * .072310 + b * .986039;

    const cx = X / (X + Y + Z);
    const cy = Y / (X + Y + Z);

    let xy: Point = { x: cx, y: cy };

    const inReach = checkPointInLampsReach(xy, colorGamut);

    if (!inReach)
        xy = getClosestPointToPoint(xy, colorGamut);

    return xy;
}

export default rgbToXy;