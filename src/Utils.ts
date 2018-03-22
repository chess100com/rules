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
        let x = c.x + dx
        let y = c.y + dy
        if (x < 1 || x > 10 || y < 1 || y > 10) {
            return null
        }
        return {
            x: x,
            y: y
        }
    }

    static parseCoordinate(coordinate: string): CoordinateInterface {
        if (coordinate.length < 2 || coordinate.length > 3) {
            throw new Error("Bad coordinate: " + coordinate)
        }
        let colName = coordinate.substr(0, 1)
        let rowIndex = parseInt(coordinate.substring(1))
        let colIndex = ColumnNames.indexOf(colName)
        if (isNaN(rowIndex) || rowIndex < 1 || rowIndex > 10 || colIndex === -1) {
            throw new Error("Bad coordinate: " + coordinate)
        }
        return {
            x: colIndex + 1,
            y: rowIndex
        }
    }

    static validateCoordinate(c: CoordinateInterface) {
        if (c.x < 1 || c.x > 10 || c.y < 1 || c.y > 10) {
            throw new Error("Bad coordinate")
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
        return c1.x === c2.x && c1.y === c2.y
    }

    static changeColor(color: Color): Color {
        return color === Color.Black ? Color.White : Color.Black
    }

    static coordinateToString(coordinate: CoordinateInterface): string {
        return `${ColumnNames[coordinate.x - 1]}${coordinate.y}`;
    }

}
