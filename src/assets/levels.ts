export interface Level {
  name: string
  setupFileName: string
}

const gameLevels: Array<Level> = [
  {
    name: 'Where Do I Go?',
    setupFileName: 'level001.json'
  },
  {
    name: 'Now What Is This?',
    setupFileName: 'level002.json'
  },
  {
    name: 'Out Of Reach',
    setupFileName: 'level003.json'
  },
  {
    name: 'Still Out Of Reach',
    setupFileName: 'level004.json'
  },
  {
    name: 'Volcano',
    setupFileName: 'level005.json'
  },
  {
    name: 'Off Limits',
    setupFileName: 'level006.json'
  },
  {
    name: 'Grass Yard',
    setupFileName: 'level007.json'
  },
  {
    name: 'Turns',
    setupFileName: 'level102.json'
  },
  {
    name: 'Pillar Yard',
    setupFileName: 'level104.json'
  },
  {
    name: 'Novice Locksmith',
    setupFileName: 'level107.json'
  },
  {
    name: 'Submerged Ruins',
    setupFileName: 'level1a.json'
  },
  {
    name: 'Sunken Temple',
    setupFileName: 'level1b.json'
  },
  {
    name: 'Warm River',
    setupFileName: 'level202.json'
  },
  {
    name: 'Tiny Pond',
    setupFileName: 'level208.json'
  },
  {
    name: 'Catch The Thief!',
    setupFileName: 'level209.json'
  },
  {
    name: 'Evaporating River',
    setupFileName: 'level212.json'
  },
  {
    name: 'Fragility',
    setupFileName: 'level301.json'
  }
]

export default gameLevels