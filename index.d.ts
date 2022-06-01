import { Keyable, CookieOptions } from "./classes";
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
export declare namespace str {
    function filterStrings(str: string, filtered: string[]): string;
    function filterStringE(str: string, include: string[]): string;
    function stripRegex(input: string, regex?: RegExp): string;
    function containsSpecials(input: string, regex?: RegExp): boolean;
    function occurrenceArray(letter: string, word: string): number[];
    function occurrences(letter: string, word: string): number;
}
export declare namespace elem {
    function shakeElement(element: HTMLElement, time: number, coefficient: number): void;
}
export declare namespace cmon {
    function remove(key: string, cpath?: string): string;
    function assignment(key: string, val: string, options?: CookieOptions): string;
    function read(cstr: string, key: string): string;
    function parse(cstr: string): Keyable<string>;
}
