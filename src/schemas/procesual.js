import { palette } from './palette'
import { translateElements } from './translateElements'

export const procesual = (a, b, c) => [
  {
    type: 'arrow',
    version: 11183,
    versionNonce: 1592858740,
    index: 'bSt',
    isDeleted: false,
    id: 'hNQsvZoAhOk0TXfei1PGm',
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 20,
    y: 36,
    strokeColor: '#000000',
    backgroundColor: 'transparent',
    width: 100,
    height: 2,
    seed: 820931700,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    boundElements: [],
    updated: 1726928153152,
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [100, -2],
    ],
  },
  {
    type: 'arrow',
    version: 13552,
    versionNonce: 1289217356,
    index: 'bSx',
    isDeleted: false,
    id: '2FaWPQjc87A89xBc0bpZK',
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 310,
    y: 34,
    strokeColor: '#000000',
    backgroundColor: 'transparent',
    width: 80,
    height: 2,
    seed: 1630179956,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    boundElements: [],
    updated: 1726928149985,
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [80, -2],
    ],
  },
  {
    type: 'arrow',
    version: 12738,
    versionNonce: 2141055476,
    index: 'bSv',
    isDeleted: false,
    id: 'Bvzm-TlMp3aQ3onR2infA',
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'dotted',
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 209,
    y: 0,
    strokeColor: '#495057',
    backgroundColor: 'transparent',
    width: 285.49953544066193,
    height: 102.69200196919564,
    seed: 1869406068,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    boundElements: [],
    updated: 1726928153152,
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [-46.244368195602874, -91.51252148770118],
      [-256.6649589903427, -86.35769299206686],
      [-285.49953544066193, 11.179480481494465],
    ],
  },
  {
    type: 'arrow',
    version: 12817,
    versionNonce: 836607692,
    index: 'bSy',
    isDeleted: false,
    id: 'KZLXgpvseles1tIwdW_4s',
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'dotted',
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 480,
    y: 7,
    strokeColor: '#495057',
    backgroundColor: 'transparent',
    width: 254.97223619599026,
    height: 104.44872211944104,
    seed: 815277044,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    boundElements: [],
    updated: 1726928149985,
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [-32.699477815163426, -99.39427669398287],
      [-232.1625505304255, -104.44872211944104],
      [-254.97223619599026, -1.6882998441242307],
    ],
  },
  {
    type: 'text',
    x: 55,
    y: -125,
    textAlign: 'center',
    fontSize: 20,
    text: 'estructura',
    strokeColor: palette.DARK_GRAY,
  },
  {
    type: 'text',
    x: 340,
    y: -135,
    textAlign: 'center',
    fontSize: 20,
    text: 'significa',
    strokeColor: palette.DARK_GRAY,
  },
  {
    type: 'text',
    x: 60,
    y: 45,
    textAlign: 'center',
    fontSize: 20,
    text: 'intenciona',
    strokeColor: palette.DARK_GRAY,
  },
  {
    type: 'text',
    x: 350,
    y: 45,
    textAlign: 'center',
    fontSize: 20,
    text: 'contextualiza',
    strokeColor: palette.DARK_GRAY,
  },
  {
    type: 'text',
    x: -60,
    y: 15,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: palette.BLUE,
  },
  {
    type: 'text',
    x: 220,
    y: 15,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: palette.RED,
  },
  {
    type: 'text',
    x: 480,
    y: 15,
    textAlign: 'center',
    fontSize: 28,
    text: c,
    strokeColor: palette.BLUE,
  },
]
export const procesualSequence = dualities => dualities.flatMap(([x, a], i) => {
  const y = dualities[i + 1] ? dualities[i + 1][0] : ['', '', '', '']
  const z = dualities[i + 2] ? dualities[i + 2][0] : ['', '', '', '']
  const b = dualities[i + 1] ? dualities[i + 1][1] : ['', '', '', '']
  const c = dualities[i + 2] ? dualities[i + 2][1] : ['', '', '', '']
  return translateElements(
    0,
    400 * i,
    procesual(x[0], y[3], z[0])
      .concat(translateElements(800, 0, procesual(x[1], y[2], z[1])))
      .concat(translateElements(1600, 0, procesual(x[2], y[1], z[2])))
      .concat(translateElements(2400, 0, procesual(x[3], y[0], z[3])))
      .concat(translateElements(3200, 0, procesual(a[0], b[3], c[0])))
      .concat(translateElements(4000, 0, procesual(a[1], b[2], c[1])))
      .concat(translateElements(4800, 0, procesual(a[2], b[1], c[2])))
      .concat(translateElements(5600, 0, procesual(a[3], b[0], c[3])))
  )
})
