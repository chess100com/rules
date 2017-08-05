import "reflect-metadata"
import {assert} from "chai"
import {Game} from "../../src/Game"
import {Utils} from "../../src/Utils"

describe("Prince", () => {

    let c = Utils.parseCoordinate

    it("eat king", () => {
        let game = new Game()
        game.setFen("c8k/10/10/10/10/10/10/10/9Q/9K w - - - 0 0")        
        game.move(c("j2"), c("j10"))
        assert.equal(game.getFen(), "k8Q/10/10/10/10/10/10/10/10/9K b - - - 1 0")
    })

})