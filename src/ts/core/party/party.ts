/**
 * Represents a party involved in a receipt group.
 */
import {Color} from "../lib/color";

export class Party {
    public id: string;
    public name: string;
    public color: Color;
    public initials: string;


    constructor(id: string, name: string, color?: Color) {
        this.id = id;
        this.name = name;
        this.color = (color == null ? Color.generateRandom() : color);

        if (name != null && name.length > 0) {
            this.initials = name.charAt(0).toUpperCase();
            if (name.split(" ").length > 1)
            {
                this.initials += name.split(" ")[1].charAt(0).toUpperCase();
            }
        }
    }
}