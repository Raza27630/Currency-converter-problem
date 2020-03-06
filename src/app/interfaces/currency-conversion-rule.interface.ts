export interface CurrencyConversionRule {
    [base: string]: {
        target: string;
        rate: number;
    }[];
}
