import Phaser from "phaser"

import TitleScreen from "./scenes/TitleScreen"
import Game from "./scenes/Game"
import GameBackground from "./scenes/GameBackground"

import * as sceneKeys from "./consts/SceneKeys"


const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  //backgroundColor: '#616161',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }

  }
}

const game = new Phaser.Game(config)
game.scene.add(sceneKeys.TitleScreen, TitleScreen)
game.scene.add(sceneKeys.Game, Game)
game.scene.add(sceneKeys.GameBackground, GameBackground)

game.scene.start('title')
// game.scene.start(sceneKeys.Game)
