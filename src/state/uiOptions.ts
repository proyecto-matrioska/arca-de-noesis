import { SchemaIdentifier } from '../schemas/schema'

export type SchemaOptionIdentifier =
  | 'diagramAutoupdate'
  | 'factorizations'
  | 'showAnnotations'
  | 'showDualityIndex'
  | 'elementDescriptions'
  | 'intensionFormContext'
  | 'arrangement'
  | 'showRectangularFactorizations'

export type SchemaOption = {
  type: string
  name: string
  value: any
  longDescription: string
  options?: Array<{ value: string; name: string }>
  depends?: { element: string; value: string }
}

export type SchemaOptions = Record<
  SchemaIdentifier,
  { [key in SchemaOptionIdentifier]?: SchemaOption }
>

export const generalSchemaOptions: Record<string, SchemaOption> = {
  diagramAutoupdate: {
    type: 'bool',
    name: 'SchemaOptions.AutoRefresh',
    value: true,
    longDescription: 'SchemaOptions.AutoRefreshLngDesc',
  },
  showAnnotations: {
    type: 'bool',
    name: 'SchemaOptions.ShowAnnotations',
    value: false,
    longDescription: 'SchemaOptions.ShowAnnotationsLngDesc',
  },
  factorizations: {
    type: 'select',
    name: 'SchemaOptions.Factorizations',
    value: 'ninguna',
    options: [
      { value: 'ninguna', name: 'none' },
      { value: 'rectangular-1', name: 'rectangular 1' },
      { value: 'rectangular-2', name: 'rectangular 2' },
      { value: 'rectangular-3', name: 'rectangular 3' },
      { value: 'rectangular-4', name: 'rectangular 4' },
      { value: 'rectangular-5', name: 'rectangular 5' },
      { value: 'rectangular-6', name: 'rectangular 6' },
      { value: 'rectangular-7', name: 'rectangular 7' },
      { value: 'rectangular-8', name: 'rectangular 8' },
      { value: 'rectangular-9', name: 'rectangular 9' },
      { value: 'rectangular-10', name: 'rectangular 10' },
      { value: 'trapecial-1', name: 'trapecial 1' },
      { value: 'trapecial-2', name: 'trapecial 2' },
      { value: 'trapecial-3', name: 'trapecial 3' },
      { value: 'trapecial-4', name: 'trapecial 4' },
      { value: 'trapecial-5', name: 'trapecial 5' },
      { value: 'trapecial-6', name: 'trapecial 6' },
      { value: 'trapecial-7', name: 'trapecial 7' },
      { value: 'trapecial-8', name: 'trapecial 8' },
      { value: 'trapecial-9', name: 'trapecial 9' },
      { value: 'trapecial-10', name: 'trapecial 10' },
    ],
    longDescription: 'Factorizaciones rectangulares y trapeciales',
  },
}

export const schemaOptions: SchemaOptions = {
  dualidades: {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'SchemaOptions.IntensionFormContext',
      value: false,
      longDescription: 'SchemaOptions.IntensionFormContextLngDesc',
    },
  },
  cuadros: {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
    arrangement: {
      type: 'select',
      name: 'SchemaOptions.Arrangement',
      value: 'lista',
      options: [
        { value: 'lista', name: 'SchemaOptions.ListArrangementOption' },
        { value: 'triadas', name: 'SchemaOptions.TriadsArrangementOption' },
        { value: 'tetradas', name: 'SchemaOptions.TetradsArrangementOption' },
        { value: 'cascade', name: 'SchemaOptions.CascadeArrangementOption' },
      ],
      longDescription: 'SchemaOptions.ArrangementLngDesc',
    },
    showRectangularFactorizations: {
      type: 'select',
      name: 'SchemaOptions.DrawRectangularFactorizations',
      value: 'ninguna',
      options: [
        { value: 'ninguna', name: 'ninguna' },
        { value: 'rectangular-1', name: 'rectangular 1' },
        { value: 'rectangular-2', name: 'rectangular 2' },
        { value: 'rectangular-3', name: 'rectangular 3' },
        { value: 'rectangular-4', name: 'rectangular 4' },
        { value: 'rectangular-5', name: 'rectangular 5' },
        { value: 'rectangular-6', name: 'rectangular 6' },
        { value: 'rectangular-7', name: 'rectangular 7' },
        { value: 'rectangular-8', name: 'rectangular 8' },
        { value: 'rectangular-9', name: 'rectangular 9' },
        { value: 'rectangular-10', name: 'rectangular 10' },
        { value: 'trapecial-1', name: 'trapecial 1' },
        { value: 'trapecial-2', name: 'trapecial 2' },
        { value: 'trapecial-3', name: 'trapecial 3' },
        { value: 'trapecial-4', name: 'trapecial 4' },
        { value: 'trapecial-5', name: 'trapecial 5' },
        { value: 'trapecial-6', name: 'trapecial 6' },
        { value: 'trapecial-7', name: 'trapecial 7' },
        { value: 'trapecial-8', name: 'trapecial 8' },
        { value: 'trapecial-9', name: 'trapecial 9' },
        { value: 'trapecial-10', name: 'trapecial 10' },
      ],
      longDescription:
        'Mostrar posibles factorizaciones rectangulares y trapeciales como anotación',
      depends: {
        element: 'arrangement',
        value: 'tetradas',
      },
    },
  },
  'cuadros-complejos': {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
    arrangement: {
      type: 'select',
      name: 'SchemaOptions.Arrangement',
      value: 'lista',
      options: [
        { value: 'lista', name: 'SchemaOptions.ListArrangementOption' },
        { value: 'triadas', name: 'SchemaOptions.TriadsArrangementOption' },
        { value: 'tetradas', name: 'SchemaOptions.TetradsArrangementOption' },
      ],
      longDescription: 'SchemaOptions.ArrangementLngDesc',
    },
    showRectangularFactorizations: {
      type: 'select',
      name: 'SchemaOptions.DrawRectangularFactorizations',
      value: 'ninguna',
      options: [
        { value: 'ninguna', name: 'ninguna' },
        { value: 'rectangular-1', name: 'rectangular 1' },
        { value: 'rectangular-2', name: 'rectangular 2' },
        { value: 'rectangular-3', name: 'rectangular 3' },
        { value: 'rectangular-4', name: 'rectangular 4' },
        { value: 'rectangular-5', name: 'rectangular 5' },
        { value: 'rectangular-6', name: 'rectangular 6' },
        { value: 'rectangular-7', name: 'rectangular 7' },
        { value: 'rectangular-8', name: 'rectangular 8' },
        { value: 'rectangular-9', name: 'rectangular 9' },
        { value: 'rectangular-10', name: 'rectangular 10' },
        { value: 'trapecial-1', name: 'trapecial 1' },
        { value: 'trapecial-2', name: 'trapecial 2' },
        { value: 'trapecial-3', name: 'trapecial 3' },
        { value: 'trapecial-4', name: 'trapecial 4' },
        { value: 'trapecial-5', name: 'trapecial 5' },
        { value: 'trapecial-6', name: 'trapecial 6' },
        { value: 'trapecial-7', name: 'trapecial 7' },
        { value: 'trapecial-8', name: 'trapecial 8' },
        { value: 'trapecial-9', name: 'trapecial 9' },
        { value: 'trapecial-10', name: 'trapecial 10' },
      ],
      longDescription:
        'Mostrar posibles factorizaciones rectangulares y trapeciales como anotación',
      depends: {
        element: 'arrangement',
        value: 'tetradas',
      },
    },
  },
  octagonos: {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    arrangement: {
      type: 'select',
      name: 'SchemaOptions.Arrangement',
      value: 'lista',
      options: [
        { value: 'lista', name: 'SchemaOptions.ListArrangementOption' },
        { value: 'triadas', name: 'SchemaOptions.TriadsArrangementOption' },
        { value: 'tetradas', name: 'SchemaOptions.TetradsArrangementOption' },
      ],
      longDescription: 'SchemaOptions.ArrangementLngDesc',
    },
  },
  'octagonos-empiricos': {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    arrangement: {
      type: 'select',
      name: 'SchemaOptions.Arrangement',
      value: 'lista',
      options: [
        { value: 'lista', name: 'SchemaOptions.ListArrangementOption' },
        { value: 'triadas', name: 'SchemaOptions.TriadsArrangementOption' },
        { value: 'tetradas', name: 'SchemaOptions.TetradsArrangementOption' },
      ],
      longDescription: 'SchemaOptions.ArrangementLngDesc',
    },
  },
  triadas: {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'SchemaOptions.IntensionFormContext',
      value: false,
      longDescription: 'SchemaOptions.IntensionFormContextLngDesc',
    },
  },
  'triadas-empiricas': {
    showDualityIndex: {
      type: 'bool',
      name: 'SchemaOptions.ShowDualityIndexes',
      value: false,
      longDescription: 'SchemaOptions.ShowDualityIndexesLngDesc',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'Intensión, forma, contexto',
      value: false,
      longDescription:
        'Anotaciones Intensión,Extensión, Contexto, Forma, Contenido',
    },
  },
  dialectica: {
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
  },
  'dialectica-empirica': {
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
  },
  procesual: {
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
  },
  'capas-discursivas': {
    elementDescriptions: {
      type: 'bool',
      name: 'SchemaOptions.ShowMainElementDescriptions',
      value: false,
      longDescription: 'SchemaOptions.ShowMainElementDescriptionsLngDesc',
    },
  },
  matrioskas: {},
}
