import { Scene } from 'phaser'
import * as Colors from '../consts/Colors'

export default class GameBackground extends Scene {
	create() {
		this.add
			.line(400, 300, 0, 0, 0, 600, Colors.white, 1)
			.setLineWidth(2.5, 2.5)
		this.add.arc(400, 300, 50).setStrokeStyle(5, Colors.white, 1)
	}
}
