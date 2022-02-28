import Phaser from "phaser"

import WebFontFile from "./WebFontFile"
import { Game } from '../consts/SceneKeys'

export default class TitleScreen extends Phaser.Scene {
    preload() {
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }
    create() {
        const title = this.add.text(400, 200, 'Old School Tennis', {
            fontSize: 38,
            fontFamily: '"Press Start 2P"'
        })
        title.setOrigin(0.5, 0.5)

        const subTitle = this.add.text(400, 300, 'Press Space to Start', {
            fontFamily: '"Press Start 2P"'
        })
        subTitle.setOrigin(0.5, 0.5)
        this.space = this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(Game)
        })
    }
}