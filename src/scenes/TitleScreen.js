import { Scene } from 'phaser'

import WebFontFile from './WebFontFile'
import { Game } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as AudioKeys from '../consts/AudioKeys'
export default class TitleScreen extends Scene {
	preload() {
		const fonts = new WebFontFile(this.load, 'Press Start 2P')
		this.load.addFile(fonts)

		this.load.audio(AudioKeys.PongBeeb, 'assets/pong-beep.ogg')
		this.load.audio(AudioKeys.PongPlop, 'assets/pong-plop.ogg')
	}
	create() {
		const title = this.add.text(400, 200, 'Old School Tennis', {
			fontSize: 38,
			fontFamily: PressStart2P,
		})
		title.setOrigin(0.5, 0.5)

		const subTitle = this.add.text(400, 300, 'Press Space to Start', {
			fontFamily: PressStart2P,
		})
		subTitle.setOrigin(0.5, 0.5)

		this.space = this.input.keyboard.once('keydown-SPACE', () => {
			this.sound.play(AudioKeys.PongBeeb)
			this.scene.start(Game)
		})
	}
	update() {}
}
