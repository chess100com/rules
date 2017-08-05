import "reflect-metadata"
import {assert} from "chai"
import {Utils} from "../../src/Utils"
import {Figure, Color} from "../../src/Shared"

describe("Utils", () => {
    
    it("wrong data", () => {
        
        assert.throw(() => Utils.getColumnIndex("Z"))
        assert.throw(() => Utils.getColumnName(0))
        assert.throw(() => Utils.getColumnName(11))
        assert.isNull(Utils.dCol("j", 1))
        assert.isNull(Utils.dCol("a", -1))
        assert.equal(Utils.dCol("a", 1), "b")        
        assert.throw(() => Utils.parseCoordinate("aswert"))
        assert.throw(() => Utils.parseCoordinate(""))
        assert.throw(() => Utils.validateCoordinate({row: parseInt("asd"), col: ""}))
        assert.throw(() => Utils.validateCoordinate({col: "a", row: 0}))
        assert.throw(() => Utils.validateCoordinate({col: "a", row: 11}))
        assert.throw(() => Utils.validateCoordinate({col: "z", row: 2}))
        assert.throw(() => Utils.getFigureChar(100 as Figure, Color.White))
        
    })    
})
