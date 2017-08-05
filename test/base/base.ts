import "reflect-metadata"
import {assert} from "chai"
import {Game} from "../../src/Game"
import {Utils} from "../../src/Utils"
import {StartFen, Figure, Color} from "../../src/Shared"

describe("Base position", () => {

    let c = Utils.parseCoordinate

    it("init fen get", () => {
        let game = new Game()
        assert.equal(game.getFen(), StartFen)
    })

    it("illegal coordinates", () => {
        assert.throws(() => c("a0"))
        assert.throws(() => c("a11"))
        assert.throws(() => c("z1"))
    })

    it("cant move first by black", () => {
        let game = new Game()
        assert.isFalse(game.canMove(c("h9"), c("h5")))
    })
    
    it("semimoves", () => {
        let game = new Game()
        game.move(c("d1"), c("d3"))        
        assert.equal(game.getFen(), "rnbcqksbnr/pppppppppp/10/10/10/10/10/3C6/PPPPPPPPPP/RNB1QKSBNR b KQkq - - 1 1")
    })
    
    it("bad fen", () => {
        let game = new Game()
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP w KQkq - - 0 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/9Pp/10/10/10/PPPPPPPPPP/RNBCQKSBNR w KQkq - - 0 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNZ w KQkq - - 0 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPP/RNBCQKSBNR w KQkq - - 0 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR a KQkq - - 0 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR w KQkq - - a 1"))
        assert.throw(() => game.setFen("rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR w KQkq - - 0 b"))
    })
    
    it("find figure", () => {
        let game = new Game()
        let coords = game.position.findFigures(Figure.King, Color.White)
        assert.equal(coords.length, 1)
        assert.equal(coords[0].row, 1)
        assert.equal(coords[0].col, "f")
    })
})

