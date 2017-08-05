import {ColumnNames, CoordinateInterface, Figure, FigureNames, Color} from "./Shared"

export class Utils {


    static getColumnIndex(column: string) {
        let index = ColumnNames.indexOf(column)
        if (index === -1) {
            throw new Error("Bad column")
        }
        return index + 1
    }

    static getColumnName(index: number) {
        if (index < 1 || index > 10) {
            throw new Error("Bad column index")
        }
        return ColumnNames[index - 1]
    }

    static dCol(col: string, dx: number): string | null {
        let colIndex = Utils.getColumnIndex(col)
        colIndex += dx
        if (colIndex < 1 || colIndex > 10) {
            return null
        }
        return Utils.getColumnName(colIndex)
    }

    static dCoord(c: CoordinateInterface, dx: number, dy: number): CoordinateInterface | null {
        let colIndex = Utils.getColumnIndex(c.col) + dx
        let row = c.row + dy
        if (colIndex < 1 || colIndex > 10 || row < 1 || row > 10) {
            return null
        }
        return {
            col: Utils.getColumnName(colIndex),
            row: row
        }
    }

    static parseCoordinate(coordinate: string): CoordinateInterface {
        if (coordinate.length < 2 || coordinate.length > 3) {
            throw new Error("Bad coordinate: " + coordinate)
        }
        let colName = coordinate.substr(0, 1)
        let rowIndex = parseInt(coordinate.substring(1))
        if (isNaN(rowIndex) || rowIndex < 1 || rowIndex > 10 || ColumnNames.indexOf(colName) === -1) {
            throw new Error("Bad coordinate: " + coordinate)
        }
        return {
            row: rowIndex,
            col: colName
        }
    }

    static validateCoordinate(coordinate: CoordinateInterface) {
        let rowIndex = coordinate.row
        let colName = coordinate.col
        if (isNaN(rowIndex) || rowIndex < 1 || rowIndex > 10 || ColumnNames.indexOf(colName) === -1) {
            throw new Error("Bad coordinate: " + coordinate)
        }
    }

    static getFigureChar(figure: Figure, color: Color): string {
        for (let figureChar in FigureNames) {
            if (FigureNames[figureChar] === figure) {
                if (color === Color.White) {
                    return figureChar
                }
                return figureChar.toLowerCase()
            }
        }
        throw new Error("Bad figure " + figure)
    }
    
    static sameCoords(c1: CoordinateInterface, c2: CoordinateInterface) {
        return c1.row === c2.row && c1.col === c2.col
    }

}
