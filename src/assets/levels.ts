export interface Level {
  name: string
  setupFileName: string
}

const gameLevels: Array<Level> = [
  {
    name: '0-1',
    setupFileName: 'level001.json'
  },
  {
    name: '0-2',
    setupFileName: 'level002.json'
  },
  {
    name: '0-3',
    setupFileName: 'level003.json'
  },
  {
    name: '0-4',
    setupFileName: 'level004.json'
  },
  {
    name: '0-5',
    setupFileName: 'level005.json'
  },
  {
    name: '0-6',
    setupFileName: 'level006.json'
  },
  {
    name: '0-7',
    setupFileName: 'level007.json'
  },
  {
    name: '1-2',
    setupFileName: 'level102.json'
  },
  {
    name: '1-4',
    setupFileName: 'level104.json'
  },
  {
    name: '1-7',
    setupFileName: 'level107.json'
  },
  {
    name: '2-2',
    setupFileName: 'level202.json'
  },
  {
    name: '2-8',
    setupFileName: 'level208.json'
  },
  {
    name: '2-12',
    setupFileName: 'level212.json'
  }
]

export default gameLevels