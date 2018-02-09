import {DivisionResult} from "./divisionResult";

export class MathHelpers {

    /**
     * Can't trust floating point not to give silly results like 12/3=4.0000000000001.
     *
     * @param {number} dividend The numerator.
     * @param {number} divisor  The denominator.
     * @return {DivisionResult} The result of the division.
     */
    public static wholeDivide(dividend: number, divisor: number): DivisionResult {
        let accumulator: number;

        let quotient: number = 0;
        let remainder: number = 0;
        let sign: number = 1;

        if (dividend < 0) sign *= -1;
        if (divisor < 0) sign *= -1;

        dividend = Math.abs(dividend);
        divisor = Math.abs(divisor);

        accumulator = dividend;

        if (!divisor) throw new RangeError("Divide by zero.");


        while (accumulator > 0) {
            quotient++;
            accumulator -= divisor;
        }

        if (accumulator < 0) {
            accumulator += divisor;
            remainder = accumulator;
        }

        quotient *= sign;

        return new DivisionResult(quotient, remainder, divisor);
    }


    public static gcd(a: number, b: number): number {
        if (!b) return a;
        return this.gcd(b, a % b);
    }

    public static lcm(a: number, b: number): number {
        let dr = this.wholeDivide(a * b, this.gcd(a, b));
        if (dr.remainder) {
            throw new Error("Unexpected remainder.");
        }

        return this.wholeDivide(a * b, this.gcd(a, b)).quotient;
    }


}