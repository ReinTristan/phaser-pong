import { Scene, Math as PhaserMath } from 'phaser'
import { GameBackground, GameOver } from '../consts/SceneKeys'
import * as Colors from '../consts/Colors'
import { PressStart2P } from '../consts/Fonts'
import * as AudioKeys from '../consts/AudioKeys'

const GameState = {
	running: 'running',
	PlayerWon: 'player-won',
	AiWon: 'ai-Won',
}
class Game extends Scene {
	init() {
		this.gameState = GameState.running
		this.paddleRightVelocity = new PhaserMath.Vector2(0, 0)
		this.leftScore = 0
		this.rightScore = 0
		this.pause = false
	}
	preload() {}
	create() {
		this.scene.run(GameBackground)
		this.scene.sendToBack(GameBackground)
		this.physics.world.setBounds(-100, 0, 1000, 600)

		this.ball = this.add.circle(400, 300, 10, Colors.white, 1)
		this.physics.add.existing(this.ball)
		this.ball.body.setCircle(10)
		this.ball.body.setBounce(1, 1)
		this.ball.body.setMaxVelocity(400)

		this.ball.body.setCollideWorldBounds(true, 1, 1)
		this.ball.body.onWorldBounds = true

		this.leftPaddle = this.add.rectangle(50, 300, 30, 100, Colors.white, 1)
		this.rightPaddle = this.add.rectangle(750, 300, 30, 100, Colors.white, 1)

		this.physics.add.existing(this.leftPaddle, true)
		this.physics.add.existing(this.rightPaddle, true)

		this.physics.add.collider(
			this.leftPaddle,
			this.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		)
		this.physics.add.collider(
			this.rightPaddle,
			this.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		)

		this.physics.world.on(
			'worldbounds',
			this.handleBallWorldBoundsCollision,
			this
		)
		const scoreStyle = {
			fontSize: 48,
			fontFamily: PressStart2P,
		}
		this.leftScoreLabel = this.add
			.text(300, 125, '0', scoreStyle)
			.setOrigin(0.5, 0.5)
		this.rightScoreLabel = this.add
			.text(500, 125, '0', scoreStyle)
			.setOrigin(0.5, 0.5)

		this.cursors = this.input.keyboard.createCursorKeys()

		this.time.delayedCall(1500, () => {
			this.resetBall()
		})
	}
	update() {
		if (this.pause || this.gameState !== GameState.running) return
		this.playerMov()
		this.updateAI()
		this.checkScore()
	}
	handlePaddleBallCollision(paddle, ball) {
		this.sound.play(AudioKeys.PongBeeb)
		const vel = this.ball.body.velocity
		vel.x *= 1.5
		vel.y *= 1.5

		this.ball.body.setVelocity(vel.x, vel.y)
	}
	handleBallWorldBoundsCollision(body, up, down, left, right) {
		if (left || right) return

		this.sound.play(AudioKeys.PongPlop)
	}
	playerMov() {
		const paddleBody = this.leftPaddle.body
		if (this.cursors.up.isDown) {
			this.leftPaddle.y -= 10
			paddleBody.updateFromGameObject()
		} else if (this.cursors.down.isDown) {
			this.leftPaddle.y += 10
			paddleBody.updateFromGameObject()
		}
	}
	updateAI() {
		const diff = this.ball.y - this.rightPaddle.y
		if (Math.abs(diff) < 10) return
		const aiSpeed = 3

		if (diff < 0) {
			this.paddleRightVelocity.y = -aiSpeed

			if (this.paddleRightVelocity.y < -10) this.paddleRightVelocity.y = -10
		} else if (diff > 0) {
			this.paddleRightVelocity.y = aiSpeed
			if (this.paddleRightVelocity.y > 10) this.paddleRightVelocity.y = 10
		}

		this.rightPaddle.y += this.paddleRightVelocity.y
		this.rightPaddle.body.updateFromGameObject()
	}
	checkScore() {
		const ballX = this.ball.x
		const leftBounds = -30
		const rightBounds = 830
		if (ballX >= leftBounds && rightBounds >= ballX) return
		if (ballX < -leftBounds) {
			this.incrementRightScore()
		} else if (ballX > rightBounds) {
			this.incrementLeftScore()
		}

		const maxScore = 7
		if (this.leftScore >= maxScore) {
			this.gameState = GameState.PlayerWon
		} else if (this.rightScore >= maxScore) {
			this.gameState = GameState.AiWon
		}
		if (this.gameState === GameState.running) {
			this.resetBall()
		} else {
			this.ball.active = false
			this.physics.world.remove(this.ball.body)

			this.scene.stop(GameBackground)

			this.scene.start(GameOver, {
				leftScore: this.leftScore,
				rightScore: this.rightScore,
			})
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
		if (angle % 90 === 0) angle + 20
		const vec = this.physics.velocityFromAngle(angle, 200)
		this.ball.body.setVelocity(vec.x, vec.y)
	}
}
export default Game
