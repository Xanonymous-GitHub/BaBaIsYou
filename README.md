# BaBa Is You
<img src="https://i.imgur.com/44OJbB0.gif">

## Links
- [Official Wiki](https://babaiswiki.fandom.com)
- [Course Gitlab](https://css-gitlab.csie.ntut.edu.tw/109000000/oopl2020s)
- [PixiJS](https://www.pixijs.com)
- [SpriteSheet Tool](https://www.leshylabs.com/apps/sstool/)

## Project operations
In this project, we use vite 2 and pnpm to build and manage dependencies.

before start, please install pnpm in your device by this command: `npm i -g yarn`

and go to project root, run `yarn install`

- run project in dev mode: `yarn dev`
- build project for production: `yarn build`
- host project after build: `yarn serve`

## Settings
1. Basic Game Stage
    - Game Map
        - put in different file
    - Characters
    - Words
        - every effect is a class/interface
2. Full Game
    - Main screen
    - Level selection
3. Self Features
    - Multiplayer
    - Self design characters
    - Ranking

## Steps
1. 2/28 ~ 3/15
    - Read PixiJS tutorial
    - Create basic game stage
    - Baba that can control with keys
2. 3/15 ~ 4/15
    - Create objects & words on map
3. 4/15 ~ 5/7
    - Create levels & maps
    - Level selection & main screen
4. 5/7 ~ 5/21
    - Accounts
        - Firebase
    - Ranking & score
        - Finish time
        - Steps
5. 5/21 ~ 5/31 (Optional)
    - Store
    - Modelling
6. 6/1 ~ 
    - Testing
   
## core structure

- top class: `Thing`
   - `Noun`
   - `Character`
   - `Operator`
   - `Property`
   - `Collectible` (too few)
