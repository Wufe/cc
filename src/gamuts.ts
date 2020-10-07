import { ColorGamut } from "./types";

export const gamutA: ColorGamut = { r: { x: .704, y: .296 }, g: { x: .2151, y: .7106 }, b: { x: .138, y: .08 } };
export const gamutB: ColorGamut = { r: { x: .675, y: .322 }, g: { x: .4091, y: .518 }, b: { x: .167, y: .04 } };
export const gamutC: ColorGamut = { r: { x: .692, y: .308 }, g: { x: .17, y: .7 }, b: { x: .153, y: .048 } };
export const defaultGamut: ColorGamut = { r: { x: 1, y: 0 }, g: { x: 0, y: 1 }, b: { x: 0, y: 0 } };