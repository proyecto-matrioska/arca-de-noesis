import metafisicaData from './Metafísica de la información.json'
import metafisicaDataEN from './Metaphysics of Information.json'
import intencionalidadData from './Intensionalidad.json'
import intencionalidadDataEN from './Intentionality.json'
import rosalindKraussData from './Rosalind Krauss.json'
import rosalindKraussDataEN from './Rosalind Krauss EN.json'
import { DialecticsDataEntry } from '../schemas/schema'

export interface Example {
  filename: string
  data: DialecticsDataEntry[]
}

export interface Examples {
  [key: string]: Example
}

const examples: Examples = {
  metafisica: {
    filename: 'Metafísica de la información.noesis',
    data: metafisicaData as DialecticsDataEntry[],
  },
  metafisicaEN: {
    filename: 'Metaphysics of Information.noesis',
    data: metafisicaDataEN as DialecticsDataEntry[],
  },
  intensionalidad: {
    filename: 'Intensionalidad.noesis',
    data: intencionalidadData as DialecticsDataEntry[],
  },
  intensionalidadEN: {
    filename: 'Intentionality.noesis',
    data: intencionalidadDataEN as DialecticsDataEntry[],
  },
  rosalindKrauss: {
    filename: 'Rosalind Krauss.noesis',
    data: rosalindKraussData as DialecticsDataEntry[],
  },
  rosalindKraussEN: {
    filename: 'Rosalind Krauss.noesis',
    data: rosalindKraussDataEN as DialecticsDataEntry[],
  },
}

export default examples
