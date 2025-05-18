import { Schema } from '../schema'

export const translateElements = (x: number, y: number, elements: Schema) =>
  elements.map(e => {
    const r = { ...e }
    if (r.x !== undefined) r.x = r.x + x
    if (r.y !== undefined) r.y = r.y + y
    return r
  })
