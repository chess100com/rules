import "reflect-metadata"
import {assert} from "chai"
import {Game} from "../../src/Game"
import {Utils} from "../../src/Utils"

describe("King moves", () => {
    
    let c = Utils.parseCoordinate
    
    it("base moves", () => {
        
        let game = new Game()
        game.setFen("k9/10/10/10/9Q/10/10/10/10/9K w - - - 0 0")        
        assert.isTrue(game.canMove(c("j1"), c("j2")), "j1j2")
        assert.isTrue(game.canMove(c("j1"), c("i1")), "j1i1")
        assert.isTrue(game.canMove(c("j1"), c("i2")), "j1i2")
        assert.isFalse(game.canMove(c("j1"), c("a1")), "j1a1")
        
        game.setFen("k9/10/10/10/9Q/10/10/8p1/7PK1/10 w - - - 0 0")        
        assert.isTrue(game.canMove(c("i2"), c("i3")), "i2i3")
        assert.isFalse(game.canMove(c("i2"), c("h2")), "i2h2")        
        
    })
    
})
