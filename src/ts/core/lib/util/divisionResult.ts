/**
 * Created by akersten on 5/12/17.
 */
import {MathHelpers} from "./MathHelpers";

export class DivisionResult {
    public quotient: number;

    public remainder: number; // Remainder should always be out of a divisor.
    public divisor: number;

    constructor(quotient: number, remainder: number, divisor: number = 1) {
        this.quotient = quotient;
        this.remainder = remainder;
        this.divisor = divisor;
    }


    public add(dr: DivisionResult): DivisionResult {
        //Round up if remainder goes over divisor

        let newDivisor = MathHelpers.lcm(dr.divisor, this.divisor);
        let newRemainder: number;

        let res = new DivisionResult(this.quotient, this.remainder, newDivisor);


        let adjOtherRemainder = dr.remainder * MathHelpers.wholeDivide(newDivisor, this.divisor).quotient;
        let adjThisRemainder = this.remainder * MathHelpers.wholeDivide(newDivisor, dr.divisor).quotient;


        res.quotient += dr.quotient;

        newRemainder = adjOtherRemainder + adjThisRemainder;
        if (newRemainder >= newDivisor) {
            newRemainder -= newDivisor;
            res.quotient += 1;
        }

        res.remainder = newRemainder;

        return res;
    }

    public subtract(amount: number): DivisionResult {
        let res = new DivisionResult(this.quotient, this.remainder);
        res.quotient -= amount;
        return res;
    }

    public divide(divisor: number): DivisionResult {
        let dividend: number = this.quotient;

        // Can't whole-divide a DivisionResult with a remainder, so use whole-number equivalents.
        if (this.remainder) {
            dividend *= this.divisor;
            dividend += this.remainder;
            divisor *= this.divisor;
        }

        return MathHelpers.wholeDivide(dividend, divisor);
    }
}