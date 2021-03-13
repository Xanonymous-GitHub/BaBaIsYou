/**
 * Python script for getting file names from current dir
 * @example
 * import os
 * print([f for f in os.listdir('.') if os.path.isfile(f)])
 * */

export interface Resource {
    name: string
    url: string
}

export enum Species {
    CHARACTERS = 'characters',
    NOUNS = 'nouns',
    OPERATORS = 'operators',
    PROPERTIES = 'properties'
}

export type ResourceMap = Map<string, Array<Resource>>

const stringToResource = (filename: string, rootPath: string, species: Species): Resource => {
    return {
        name: filename.replace(/\.[^.]*$/, ''),
        url: rootPath + species + '/' + filename.trim()
    }
}

export const createResourceMap = (rootPath: string): ResourceMap => {
    const things = {
        characters: ['TOWER.gif', 'MOON.gif', 'MONITOR.gif', 'GRASS.gif', 'RING.gif', 'BLOB.gif', 'STATUE.gif', 'EAR.gif', 'SEED.gif', 'CRYSTAL.gif', 'ROCKET.gif', 'CUP.gif', 'CLOUD.gif', 'ICE.gif', 'UFO.gif', 'TREE.gif', 'ROBOT.gif', 'WATER.gif', 'DOOR.gif', 'HUSK.gif', 'DRUM.gif', 'LIZARD.gif', 'WALL.gif', 'EYE.gif', 'SPROUT.gif', 'FLOWER.gif', 'FOLIAGE.gif', 'IT.gif', 'FOOT.gif', 'CRAB.gif', 'RUBBLE.gif', 'JELLY.gif', 'HEDGE.gif', 'SHOVEL.gif', 'BAT.gif', 'CLIFF.gif', 'CASH.gif', 'BANANA.gif', 'PIPE.gif', 'BUG.gif', 'FRUIT.gif', 'STAR.gif', 'GUITAR.gif', 'SUN.gif', 'LEAF.gif', 'LINE.gif', 'BUCKET.gif', 'GEM.gif', 'LOVE.gif', 'PILLAR.gif', 'VINE.gif', 'TREES.gif', 'BOX.gif', 'FUNGUS.gif', 'SQUARE.gif', 'PUMPKIN.gif', 'JIJI.gif', 'SAX.gif', 'LAMP.gif', 'FISH.gif', 'TURNIP.gif', 'BURGER.gif', 'BELT.gif', 'PANTS.gif', 'BRICK.gif', 'FOFO.gif', 'BABA.gif', 'LAVA.gif', 'ME.gif', 'REED.gif', 'FUNGI.gif', 'FENCE.gif', 'BOAT.gif', 'PIANO.gif', 'CAKE.gif', 'FLAG.gif', 'SKULL.gif', 'TRAIN.gif', 'TILE.gif', 'BOOK.gif', 'BOLT.gif', 'PLANET.gif', 'BOG.gif', 'CART.gif', 'ROSE.gif', 'WORM.gif', 'PLANE.gif', 'GATE.gif', 'STUMP.gif', 'KEY.gif', 'FIRE.gif', 'SHELL.gif', 'ALGAE.gif', 'DOT.gif', 'FORT.gif', 'ORB.gif', 'BUBBLE.gif', 'KEKE.gif', 'HUSKS.gif', 'ROAD.gif', 'HIHAT.gif', 'NOSE.gif', 'SHIRT.gif', 'BIRD.gif', 'PIXEL.gif', 'DUST.gif', 'CIRCLE.gif', 'SPIKE.gif', 'ARROW.gif', 'TRACK.gif', 'STICK.gif', 'ROCK.gif', 'COG.gif', 'HOUSE.gif', 'LIFT.gif', 'WIND.gif', 'BEE.gif', 'GHOST.gif', 'SIGN.gif', 'LADDER.gif', 'HAND.gif', 'DRINK.gif', 'TRIANGLE.gif'],
        nouns: ['Text_FRUIT.gif', 'Text_CRYSTAL.gif', 'Text_UFO.gif', 'Text_ICE.gif', 'Text_GATE.gif', 'Text_IT.gif', 'Text_JELLY.gif', 'Text_HEDGE.gif', 'Text_FIRE.gif', 'Text_FORT.gif', 'Text_CLIFF.gif', 'Text_LADDER.gif', 'Text_CIRCLE.gif', 'Text_BOLT.gif', 'Text_MONITOR.gif', 'Text_EYE.gif', 'Text_ROSE.gif', 'Text_CART.gif', 'Text_WORM.gif', 'Text_FLAG.gif', 'Text_FOLIAGE.gif', 'Text_CAKE.gif', 'Text_TILE.gif', 'Text_TREES.gif', 'Text_BOOK.gif', 'Text_REED.gif', 'Text_LAVA.gif', 'Text_BUBBLE.gif', 'Text_BABA.gif', 'Text_PANTS.gif', 'Text_EAR.gif', 'Text_BRICK.gif', 'Text_BOAT.gif', 'Text_CUP.gif', 'Text_WIND.gif', 'Text_LIFT.gif', 'Text_GRASS.gif', 'Text_SIGN.gif', 'Text_BOX.gif', 'Text_SAX.gif', 'Text_TOWER.gif', 'Text_HAND.gif', 'Text_DUST.gif', 'Text_PLANET.gif', 'Text_ROCK.gif', 'Text_ROBOT.gif', 'Text_WATER.gif', 'Text_BAT.gif', 'Text_BUG.gif', 'Text_BIRD.gif', 'Text_CLOUD.gif', 'Text_SUN.gif', 'Text_PUMPKIN.gif', 'Text_ROAD.gif', 'Text_KEKE.gif', 'Text_GEM.gif', 'Text_NOSE.gif', 'Text_HIHAT.gif', 'Text_WALL.gif', 'Text_BOG.gif', 'Text_TURNIP.gif', 'Text_BURGER.gif', 'Text_CRAB.gif', 'Text_HUSKS.gif', 'Text_FOOT.gif', 'Text_PILLAR.gif', 'Text_KEY.gif', 'Text_SQUARE.gif', 'Text_HUSK.gif', 'Text_DOOR.gif', 'Text_TREE.gif', 'Text_FUNGUS.gif', 'Text_SHIRT.gif', 'Text_ORB.gif', 'Text_DOT.gif', 'Text_DRUM.gif', 'Text_STICK.gif', 'Text_TRACK.gif', 'Text_RING.gif', 'Text_GUITAR.gif', 'Text_BLOB.gif', 'Text_PIXEL.gif', 'Text_BUCKET.gif', 'Text_SEED.gif', 'Text_SPIKE.gif', 'Text_ARROW.gif', 'Text_GHOST.gif', 'Text_DRINK.gif', 'Text_MOON.gif', 'Text_ME.gif', 'Text_SHOVEL.gif', 'Text_BANANA.gif', 'Text_HOUSE.gif', 'Text_LAMP.gif', 'Text_FLOWER.gif', 'Text_SPROUT.gif', 'Text_FENCE.gif', 'Text_BELT.gif', 'Text_FISH.gif', 'Text_RUBBLE.gif', 'Text_FUNGI.gif', 'Text_FOFO.gif', 'Text_VINE.gif', 'Text_SKULL.gif', 'Text_TRAIN.gif', 'Text_COG.gif', 'Text_PIANO.gif', 'Text_BEE.gif', 'Text_TRIANGLE.gif', 'Text_LIZARD.gif', 'Text_JIJI.gif', 'Text_STAR.gif', 'Text_LEAF.gif', 'Text_STATUE.gif', 'Text_ROCKET.gif', 'Text_LINE.gif', 'Text_LOVE.gif', 'Text_SHELL.gif', 'Text_ALGAE.gif', 'Text_PIPE.gif', 'Text_CASH.gif', 'Text_PLANE.gif', 'Text_STUMP.gif'],
        operators: ['Text_FACING.gif', 'Text_MAKE.gif', 'Text_IS.gif', 'Text_NOT.gif', 'Text_HAS.gif', 'Text_ON.gif', 'Text_NEAR.gif', 'Text_AND.gif', 'Text_LONELY.gif'],
        properties: ['Text_LOCKEDLEFT.gif', 'Text_FALLUP.gif', 'Text_FALLLEFT.gif', 'Text_BROWN.gif', 'Text_REVERT.gif', 'Text_LIME.gif', 'Text_FALLRIGHT.gif', 'Text_STOP.gif', 'Text_WHITE.gif', 'Text_LOCKEDUP.gif', 'Text_WONDER.gif', 'Text_YELLOW.gif', 'Text_AUTO.gif', 'Text_RIGHT.gif', 'Text_PHANTOM.gif', 'Text_GREEN.gif', 'Text_LOCKEDRIGHT.gif', 'Text_RED.gif', 'Text_NUDGELEFT.gif', 'Text_HOT.gif', 'Text_MELT.gif', 'Text_BLUE.gif', 'Text_PINK.gif', 'Text_DOWN.gif', 'Text_NUDGEUP.gif', 'Text_STILL.gif', 'Text_SAFE.gif', 'Text_MOVE.gif', 'Text_YOU2.gif', 'Text_SHUT.gif', 'Text_PUSH.gif', 'Text_BEST.gif', 'Text_POWER.gif', 'Text_NUDGEDOWN.gif', 'Text_PURPLE.gif', 'Text_UP.gif', 'Text_FLOAT.gif', 'Text_GREY.gif', 'Text_NUDGERIGHT.gif', 'Text_SAD.gif', 'Text_BONUS.gif', 'Text_BLACK.gif', 'Text_DONE.gif', 'Text_SHIFT.gif', 'Text_SELECT.gif', 'Text_SWAP.gif', 'Text_YOU.gif', 'Text_LEFT.gif', 'Text_WEAK.gif', 'Text_DEFEAT.gif', 'Text_DETURN.gif', 'Text_ROSY.gif', 'Text_HIDE.gif', 'Text_SINK.gif', 'Text_BROKEN.gif', 'Text_TELE.gif', 'Text_LOCKEDDOWN.gif', 'Text_END.gif', 'Text_FALLDOWN.gif', 'Text_BACK.gif', 'Text_WORD.gif', 'Text_SILVER.gif', 'Text_MORE.gif', 'Text_CYAN.gif', 'Text_SLEEP.gif', 'Text_CHILL.gif', 'Text_WIN.gif', 'Text_ORANGE.gif', 'Text_PULL.gif', 'Text_TURN.gif', 'Text_OPEN.gif']
    }
    const resources = new Map<string, Array<Resource>>()
    resources.set(Species.CHARACTERS, things.characters.map(thingFileName => stringToResource(thingFileName, rootPath, Species.CHARACTERS)))
    resources.set(Species.NOUNS, things.nouns.map(thingFileName => stringToResource(thingFileName, rootPath, Species.NOUNS)))
    resources.set(Species.OPERATORS, things.operators.map(thingFileName => stringToResource(thingFileName, rootPath, Species.OPERATORS)))
    resources.set(Species.PROPERTIES, things.properties.map(thingFileName => stringToResource(thingFileName, rootPath, Species.PROPERTIES)))
    return resources
}