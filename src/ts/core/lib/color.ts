/**
 * Represents a color.
 */
export class Color {

    private _r: number;
    get r(): number {
        return this._r;
    }

    set r(value: number) {

        this._r = Color.clampComponent(value);
    }

    private _g: number;
    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = Color.clampComponent(value);
    }


    private _b: number;
    get b(): number {
        return this._b;
    }

    set b(value: number) {
        this._b = Color.clampComponent(value);
    }

    private _a: number;
    get a(): number {
        return this._a;
    }

    set a(value: number) {
        this._a = Color.clampComponent(value, true);
    }

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Formats the color as a CSS rgba color property.
     *
     * @returns {string} The formatted CSS color property representing this color.
     */
    public toString(): string {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    }


    /**
     * Validates a color component (e.g. the individual value of R, G, B, or A) and clamps it to [0,255]. If the value
     * is outside of this range, clamp to the closest value. If the value is null, assume 0. When dealing with the alpha
     * value, clamps to [0,1] and assumes 1 for null values.
     *
     * @param   {number}  component The value to clamp.
     * @param   {boolean} isAlpha   Whether this is the alpha value.
     * @returns {number}            The clamped value.
     */
    private static clampComponent(component: number, isAlpha?: boolean): number {
        if (component == null) {
            return isAlpha ? 1 : 0;
        }

        if (component < 0) {
            return 0;
        }

        if (isAlpha && component > 1) {
            return 1;
        }

        if (component > 255) {
            return 255;
        }

        if (!isAlpha) {
            component = Math.round(component);
        }

        return component;
    }


    /**
     * Generates a Color at random.
     *
     * @returns {Color} A randomly generated color.
     */
    public static generateRandom() : Color {
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }
}
