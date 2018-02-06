/**
 * Created by akersten on 5/12/17.
 */

export class DivisionResult {
    public quotient: number;
    public remainder: number;

    constructor(quotient: number, remainder: number) {
        this.quotient = quotient;
        this.remainder = remainder;
    }




    public add (dr : DivisionResult, divisor: number): DivisionResult {
        //Round up if remainder goes over divisor
        let res = new DivisionResult(this.quotient, this.remainder);
        res.quotient += dr.quotient;

        let newRemainder = dr.remainder + this.remainder;
        if (newRemainder >= divisor) {
            newRemainder -= divisor;
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

    public divide(dividend : number ): DivisionResult {
        let res = new DivisionResult(0,0);

        // TODO: Divide

        return res;
    }
}