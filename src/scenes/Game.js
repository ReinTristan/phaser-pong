import Phaser from "phaser"
import WebFontFile from "./WebFontFile"
import { GameBackground } from '../consts/SceneKeys'
import * as Colors from '../consts/Colors'

class Game extends Phaser.Scene{

    init() {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)
        this.leftScore = 0
        this.rightScore = 0

    }
    preload() {
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    } 
    create() {
        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground)
        this.physics.world.setBounds(-100, 0, 1000, 600)

        this.ball = this.add.circle(400, 300, 10, Colors.white, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setCircle(10)
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1)


        this.leftPaddle = this.add.rectangle(50, 300, 30, 100, Colors.white, 1)
        this.rightPaddle = this.add.rectangle(750, 300, 30, 100, Colors.white, 1)


        this.physics.add.existing(this.leftPaddle, true)
        this.physics.add.existing(this.rightPaddle, true)

        this.physics.add.collider(this.leftPaddle, this.ball)
        this.physics.add.collider(this.rightPaddle, this.ball)

        const scoreStyle = {
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        }
        this.leftScoreLabel = this.add.text(300, 125, '0', scoreStyle).setOrigin(0.5, 0.5)
        this.rightScoreLabel = this.add.text(500, 125, '0', scoreStyle).setOrigin(0.5, 0.5)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.time.delayedCall(1500, () => {
            this.resetBall()

        })

    }
    update() {

        this.playerMov()
        this.updateAI()
        this.checkScore()
        
    }
    playerMov() {
        const paddleBody = this.leftPaddle.body
        if(this.cursors.up.isDown) {
            this.leftPaddle.y -= 10
            paddleBody.updateFromGameObject()
        } else if(this.cursors.down.isDown) {
            this.leftPaddle.y += 10
            paddleBody.updateFromGameObject()

        }
    }
    updateAI() {
        
        const diff = this.ball.y - this.rightPaddle.y

        if(Math.abs(diff) < 10) return
        const aiSpeed = 3

        if(diff < 0) {

            this.paddleRightVelocity.y = -aiSpeed

            if(this.paddleRightVelocity.y < -10) 
                this.paddleRightVelocity.y = -10
            
            
        } else if(diff > 0) {

            this.paddleRightVelocity.y = aiSpeed
            if(this.paddleRightVelocity.y > 10) 
                this.paddleRightVelocity.y = 10
            

        } 

        this.rightPaddle.y += this.paddleRightVelocity.y
        this.rightPaddle.body.updateFromGameObject()
    }
    checkScore() {
        if(this.ball.x < -30) {
            this.resetBall()
            this.incrementRightScore()

        } else if(this.ball.x > 830) {
            this.resetBall()
            this.incrementLeftScore()

        }
    }
    incrementLeftScore() {
        this.leftScore++
        this.leftScoreLabel.text = this.leftScore
    }
    incrementRightScore() {
        this.rightScore++
        this.rightScoreLabel.text = this.rightScore
    }
    resetBall() {
        this.ball.setPosition(400, 300)
        let angle = Phaser.Math.Between(0, 360)
        if(angle % 90 === 0) angle + 20
        const vec = this.physics.velocityFromAngle(angle, 200)
        this.ball.body.setVelocity(vec.x, vec.y)
    }
}
export default Game