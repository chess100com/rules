import "reflect-metadata"
import {assert} from "chai"
import {Game} from "../../src/Game"
import {Utils} from "../../src/Utils"

describe("Castling", () => {
    
    let c = Utils.parseCoordinate

    it("Base castling", () => {

        let startFen = "1k8/10/10/10/10/10/10/10/10/R4K3R w KQ - - 0 1"
        let game = Game.fromFen(startFen)
        game.move(c("f1"), c("c1"))
        assert.equal(game.getFen(), "1k8/10/10/10/10/10/10/10/10/2KR5R b - - - 1 1")
        
        game = Game.fromFen(startFen)
        game.move(c("f1"), c("h1"))
        assert.equal(game.getFen(), "1k8/10/10/10/10/10/10/10/10/R5RK2 b - - - 1 1")        
    })   
    
    it("Can`t castling with attacked field", () => {
        let game = Game.fromFen("1kr3r3/10/10/10/10/10/10/10/10/R4K3R w KQ - - 0 1")
        assert.isFalse(game.canMove(c("f1"), c("c1")))        
        assert.isFalse(game.canMove(c("f1"), c("h1")))        
    })

})
