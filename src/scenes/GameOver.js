import Phaser from 'phaser'

import { TitleScreen } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'

export default class GameOver extends Phaser.Scene {
    /** 
    *   @param {{ leftScore: number, rightScore: number }} data
    */
    create(data) {
        let titleText = 'Game Over'
        if(data.leftScore > data.rightScore) {
            titleText = 'You win!'
        } 
        this.add.text(400, 200, titleText, {
            fontFamily: PressStart2P,
            fontSize: 38
        }).setOrigin(0.5, 0.5)

        this.add.text(400, 400, 'Press space to continue', {
            fontFamily: PressStart2P,
            fontSize: 20
        }).setOrigin(0.5, 0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(TitleScreen)
        })
        
    }
}