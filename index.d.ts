export declare namespace math {
    function factorial(n?: number): number;
}
export declare namespace qstr {
    function clearQ(): void;
    function parseQ(): Record<string, string>;
}
export declare namespace rand {
    function r_int(min: number, max: number): number;
    function r_num(min: number, max: number): number;
    function r_choice(arr: any[]): any;
}
