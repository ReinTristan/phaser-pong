import { Game as GameInstance } from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import GameBackground from './scenes/GameBackground'
import GameOver from './scenes/GameOver'

import * as sceneKeys from './consts/SceneKeys'
/**
 * @type { HTMLCanvasElement}
 */
const parent = document.querySelector('main')

const config = {
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	parent,
}

const game = new GameInstance(config)
game.scene.add(sceneKeys.TitleScreen, TitleScreen)
game.scene.add(sceneKeys.Game, Game)
game.scene.add(sceneKeys.GameBackground, GameBackground)
game.scene.add(sceneKeys.GameOver, GameOver)
game.scene.start('title')
// game.scene.start(sceneKeys.Game)
