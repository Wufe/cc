# CC

Color convert from xy to rgb and viceversa

***

## Install

`yarn install @wufe/cc`

***

## Usage

### **xyToRgb**

xyToRgb(xyColor, [gamut]);

- xyColor: object containing two properties: x and y **required**
- gamut: object containing three properties (r,g,b) each being an xyColor **optional**

> If gamut is not provided the default one is used  
> `{ r: { x: 1, y: 0 }, g: { x: 0, y: 1 }, b: { x: 0, y: 0 } }`


### **rgbToXy**

rgbToXy(rgbColor, [gamut])

- rgbColor: object containing three properties: r, g and b **required**
- gamut: object containing three properties (r,g,b) each being an xyColor **optional**

> If gamut is not provided the default one is used  
> `{ r: { x: 1, y: 0 }, g: { x: 0, y: 1 }, b: { x: 0, y: 0 } }`

***

## Example

```ts
import { xyToRgb } from '@wufe/cc';

const color = { x: 0.2827, y: 0.3303 };

const gamut = {
    r: { x: 0.6915, y: 0.3083 },
    g: { x: 0.17, y: 0.7 },
    b: { x: 0.1532, y: 0.0475 },
};

const rgb = xyToRgb(color, gamut);

console.log(rgb); // {r: 216, g: 253, b: 254}
```

***

## About color gamut

It can be defined as the subset of colors which can be represented in a given circumstance.  

For example, using Philips' Hue REST APIs, each light provides a field called "colorgamut" (behind /capabilities/control/colorgamut), an array which represents the color gamut for the given light bulb.

For this particular example, you can use the api `getColorGamutFromArray` to convert the array given by the rest API, to the object required by this library.

*E.g.*

```ts
import { getColorGamutFromArray } from '@wufe/cc';

const colorGamut = [[0.6915, 0.3083], [0.17, 0.7], [0.1532, 0.0475]];

console.log(getColorGamutFromArray(colorGamut));

// {
//     "r": {
//         "x": 0.6915,
//             "y": 0.3083
//     },
//     "g": {
//         "x": 0.17,
//             "y": 0.7
//     },
//     "b": {
//         "x": 0.1532,
//             "y": 0.0475
//     }
// }
```