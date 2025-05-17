import { ExcalidrawElementSkeleton } from '@excalidraw/excalidraw/dist/types/excalidraw/data/transform'
import { SchemaOption } from '../state/uiSlice'

export type Tuple<T> = [T, T]

export type Triplet<T> = [T, T, T]

export type Quadruplet<T> = [T, T, T, T]

export type DualityData = Quadruplet<string>

export type DialecticsDataEntry = Tuple<DualityData>

export type SchemaElement = ExcalidrawElementSkeleton

export type Schema = Array<SchemaElement>

export type DialecticsSchema = (
  dualities: Array<DialecticsDataEntry>,
  schemaOptions: Record<string, SchemaOption>
) => Schema
