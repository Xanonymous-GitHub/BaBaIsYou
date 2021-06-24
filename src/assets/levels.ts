export interface Level {
  name: string
  setupFileName: string
  backgroundMusic: string
}

const gameLevels: Array<Level> = [
  {
    name: 'Where Do I Go?',
    setupFileName: 'level001.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Now What Is This?',
    setupFileName: 'level002.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Out Of Reach',
    setupFileName: 'level003.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Still Out Of Reach',
    setupFileName: 'level004.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Volcano',
    setupFileName: 'level005.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Off Limits',
    setupFileName: 'level006.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Grass Yard',
    setupFileName: 'level007.json',
    backgroundMusic: 'bg_music_0.mp3'
  },
  {
    name: 'Turns',
    setupFileName: 'level102.json',
    backgroundMusic: 'bg_music_1.mp3'
  },
  {
    name: 'Pillar Yard',
    setupFileName: 'level104.json',
    backgroundMusic: 'bg_music_1.mp3'
  },
  {
    name: 'Novice Locksmith',
    setupFileName: 'level107.json',
    backgroundMusic: 'bg_music_1.mp3'
  },
  {
    name: 'Submerged Ruins',
    setupFileName: 'level1a.json',
    backgroundMusic: 'bg_music_1.mp3'
  },
  {
    name: 'Sunken Temple',
    setupFileName: 'level1b.json',
    backgroundMusic: 'bg_music_1.mp3'
  },
  {
    name: 'Warm River',
    setupFileName: 'level202.json',
    backgroundMusic: 'bg_music_2.mp3'
  },
  {
    name: 'Tiny Pond',
    setupFileName: 'level208.json',
    backgroundMusic: 'bg_music_2.mp3'
  },
  {
    name: 'Catch The Thief!',
    setupFileName: 'level209.json',
    backgroundMusic: 'bg_music_2.mp3'
  },
  {
    name: 'Evaporating River',
    setupFileName: 'level212.json',
    backgroundMusic: 'bg_music_2.mp3'
  },
  {
    name: 'Fragility',
    setupFileName: 'level301.json',
    backgroundMusic: 'bg_music_3.mp3'
  }
]

export default gameLevels