import metafisicaData from './Metafísica de la información.json'
import intencionalidadData from './Intensionalidad.json'
import rosalindKraussData from './Rosalind Krauss.json'
import { DialecticsDataEntry } from '../state/dialecticsSlice';

export interface Example {
  filename: string
  data: DialecticsDataEntry[];
}

export interface Examples {
  [key: string]: Example
}

const examples: Examples = {
  metafisica: {
    filename: 'Metafísica de la información.noesis',
    data: metafisicaData as DialecticsDataEntry[],
  },
  intensionalidad: {
    filename: 'Intensionalidad.noesis',
    data: intencionalidadData as DialecticsDataEntry[],
  },
  rosalindKrauss: {
    filename: 'Rosalind Krauss.noesis',
    data: rosalindKraussData as DialecticsDataEntry[],
  },
}

export default examples
