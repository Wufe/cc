import { defaultGamut, gamutA, gamutB, gamutC } from "./gamuts";

/**
 * Philips Hue - Legacy lookup table.
 * @param model The modelId of the lamp (e.g. LST001)
 */
export function getColorGamutFromModel(modelId: string) {
    if (['LST001', 'LLC005', 'LLC006', 'LLC007', 'LLC010', 'LLC011', 'LLC012', 'LLC013', 'LLC014'].indexOf(modelId) > -1)
        return gamutA;
    else if (['LCT001', 'LCT007', 'LCT002', 'LCT003', 'LLM001'].indexOf(modelId) > -1)
        return gamutB;
    else if (['LCT010', 'LCT011', 'LCT012', 'LCT014', 'LCT015', 'LCT016', 'LLC020', 'LST002'].indexOf(modelId) > -1)
        return gamutC;
    else
        return defaultGamut;
}