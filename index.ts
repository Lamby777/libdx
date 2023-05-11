"use strict";

// Data structures and data types
export namespace dman {
	export function ptr(obj: object, prop: string, fn: () => any) {
		// Technically not a pointer, but often used as one.
		// Replaces an object's property with a getter of the same name
		// such that the getter method is the one provided
		Object.defineProperty(obj, prop, {
			get: fn
		});
	}
}

export namespace math {
	export function factorial(n = 1) {
		if (n < 1) throw new TypeError("Invalid Factorial!");
		let final = n;
		
		while (n > 1) {
			final *= n;
		}

		return final;
	}

	// If arrays are equal, returns true.
	export function arrayEq(arr1: any[], arr2: any[]) {
		if (arr1.length !== arr2.length) return false;

		for (let i in arr1) {
			if (!(arr1[i] === arr2[i])) {
				return false
			}
		}

		return true;
	}

	export function clamp(n: number, min: number, max: number) {
		return Math.max(min, Math.min(n, max));
	}
}

export namespace qstr {
	export function clearQ() {
		const qsurl = window.location.toString();
		if (qsurl.indexOf("?") > 0) {
			const clean_qsurl = qsurl.substring(0, qsurl.indexOf("?"));
			window.history.replaceState({}, document.title, clean_qsurl);
		}
	}
	
	export function parseQ() {
		return parseGivenQ(document.location.search);
	}
	
	function parseGivenQ(queryString: string) {
		const dict: Record<string, string> = {};
		
		if (queryString.indexOf("?") === 0) {
			queryString = queryString.substr(1);
		}
		
		const parts = queryString.split("&");
		parts.forEach((part: string) => {
			const [key, value] = part.split("=");
			dict[key] = decodeURIComponent(value).replace(/\+/g, " ");
		});
		return dict;
	}
}

export namespace rand {
	export function r_int(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	export function r_num(min: number, max: number) {
		return (Math.random() * (max - min)) + min;
	}

	export function r_choice(arr: any[]) {
		return arr[r_int(0, arr.length)];
	}
	
	export function r_str(len: number) {
		return Math.random().toString(36).substring(2,len+2).toUpperCase();
	}
}

export namespace str {
	export function filterStrings(	str: string,
									filtered: string[]) {
		let res = str;
		filtered.forEach((v) => {
			res = res.replaceAll(v, "");
		});
	
		return res;
	}
	
	export function filterStringE(	str: string,
									include: string[]) {
		const inter = Array.from(str);
		const filtered = inter.filter(ch => include.includes(ch));
		
		return filtered.join("");
	}

	export function stripSpecials(input: string,
			regex: RegExp = /[^\w]/g): string {
		
		return input.replace(regex, "");
	}
	
	export function containsSpecials(input: string,
			regex: RegExp = /[^\w]/g): boolean {
		
		return input.search(regex) !== -1;
	}

	export function occurrenceArray(letter:	string,
									word:	string) {
		return [...word].map(
			(v) => v.indexOf(letter)
		).filter(
			(v) => v !== -1
		);
	}

	export function occurrences(letter:	string,
								word:	string) {
		return word.split(letter).length - 1;
	}
}

export namespace elem {
	export function shakeElement(	element:		HTMLElement,
									time:			number,
									coefficient:	number ) {
		element.style.transition = "0.1s";
	
		const oldTransform = element.style.transform;
	
		const inter = setInterval(() => {
			const [r1, r2, r3] = [
				rand.r_int(1, 5),
				rand.r_int(1, 5),
				rand.r_int(1, 4),
			];
	
			const [p1, p2, p3] = [
				(r1 % 2) === 0 ? "" : "-",
				(r2 % 2) === 0 ? "" : "-",
				(r3 % 2) === 0 ? "" : "-",
			];
	
			const transitionX	= (parseInt(p1 + r1, 10)
								* (coefficient / 10)) + "em";
			const transitionY	= (parseInt(p2 + r2, 10)
								   * (coefficient / 10)) + "em";
			const rotate		= (parseInt(p3 + r3, 10)
								   * (coefficient / 10)) + "deg";
	
			element.style.transform =
`translate(${transitionX},${transitionY}) rotate(${rotate})`;  
		}, 70);
	
		setTimeout(() => {
			element.style.transform = oldTransform;  
			clearInterval(inter);
		}, time);
	}
}

// Cookie Parser/Editor
export namespace cmon {
	export function remove(key: string, cpath?: string) {
		return `${key}=; Max-Age=-99999999; path=${cpath ?? "/"}`;
	}
	
	export function assignment(key: string, val: string,
							options?: CookieOptions) {
		return (
			`${key}=${val}; `+
			`expires=${options?.expiry ?? "Fri, 31 Dec 9999 23:59:59 GMT"};`+
			`SameSite=${options?.xorigin ?? "Lax"};`+
			`${options?.secure ? "Secure;" : ""}`+
			`path=${options?.path ?? "/"}`
		);
	}
	
	export function read(cstr: string, key: string): string {
		return parse(cstr)[key];
	}

	export function parse(cstr: string): Record<string, string> {
		const split = cstr.split(";").map((v) => v.trim());

		let res: Record<string, string> = {}

		split.forEach((v) => {
			const kv: string[] = v.split("=");
			res[kv[0]] = kv[1];
		});
		
		return res;
	}
}

export function todo$(): any {
	throw new Error("not yet implemented");
}

export function log$<T>(thing: T): T {
	console.log(thing);
	return thing;
}

interface CookieOptions {
	secure?:	true;
	strict?:	true;
	xorigin?:	"Secure" | "Lax" | "None";
	expiry?:	string;
	path?:		string;
}
