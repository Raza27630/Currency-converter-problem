export class CurrencyCalculation {
    private _target: string;
    private _base: string;
    private _rate: number;
    private _calculatedAmount = 0;
    private _lastAmount = 0;
    constructor(targetCurrency: string, baseCurrency: string, conversionRate: number) {
        this._target = targetCurrency;
        this._base = baseCurrency;
        this._rate = conversionRate;
    }
    get target() {
        return this._target;
    }
    get base() {
        return this._base;
    }
    set target(value: string) {
        this._target = value;
    }
    set base(value: string) {
        this._base = value;
    }
    set rate(value: number) {
        this._rate = value;
    }
    get rate() {
        return this._rate;
    }
    calculateAmount(amount: number): void {
        this._calculatedAmount = (amount * this._rate);
        this._lastAmount = amount;
    }
    get calculatedAmount() {
        return this._calculatedAmount;
    }
    get amount(){
        return this._lastAmount;
    }
}