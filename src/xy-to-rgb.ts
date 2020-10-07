import { defaultGamut } from "./gamuts";
import { Color, ColorGamut, Point } from "./types";
import { checkPointInLampsReach, getClosestPointToPoint } from "./utils";

export function xyToRgb(xy: Point, colorGamut: ColorGamut = defaultGamut) {
    const inReachOfLamps = checkPointInLampsReach(xy, colorGamut);

    if (!inReachOfLamps) {
        const xyPoint = getClosestPointToPoint(xy, colorGamut);
        xy.x = xyPoint.x;
        xy.y = xyPoint.y;
    }

    const x = xy.x;
    const y = xy.y;
    const z = 1 - x - y;

    const Y = 1;
    const X = (Y / y) * x;
    const Z = (Y / y) * z;

    // let r = X * 3.2406 - Y * 1.5372 - Z * 0.4986;
    // let g = -X * 0.9689 + Y * 1.8758 + Z * 0.0415;
    // let b = X * 0.0557 - Y * 0.2040 + Z * 1.0570;

    // https://github.com/benknight/hue-python-rgb-converter/blob/5d417b381d3e346a4ce5d2effd4ad2bfe768d171/rgbxy/__init__.py#L198
    let r = X * 1.656492 - Y * .354851 - Z * .255038;
    let g = -X * .707196 + Y * 1.655397 + Z * .036152;
    let b = X * .051713 - Y * .121364 + Z * 1.011530;

    if (r > b && r > g && r > 1) {
        g = g / r;
        b = b / r;
        r = 1;
    } else if (g > b && g > r && g > 1) {
        r = r / g;
        b = b / g;
        g = 1;
    } else if (b > r && b > g && b > 1) {
        r = r / b;
        g = g / b;
        b = 1;
    }

    r = r <= 0.0031308 ? 12.92 * r : (1 + 0.055) * Math.pow(r, (1 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1 + 0.055) * Math.pow(g, (1 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1 + 0.055) * Math.pow(b, (1 / 2.4)) - 0.055;

    if (r > b && r > g) {
        if (r > 1) {
            g = g / r;
            b = b / r;
            r = 1;
        }
    } else if (g > b && g > r) {
        if (g > 1) {
            r = r / g;
            b = b / g;
            g = 1;
        }
    } else if (b > r && b > g) {
        if (b > 1) {
            r = r / b;
            g = g / b;
            b = 1;
        }
    }

    r = Math.max(0, Math.min(Math.floor(r * 255)));
    g = Math.max(0, Math.min(Math.floor(g * 255)));
    b = Math.max(0, Math.min(255, Math.floor(b * 255)));

    const color: Color = { r, g, b };

    return color;
}

export default xyToRgb;