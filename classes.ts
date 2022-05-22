"use strict";

export interface Keyable<T> {
	[key: string]: T;
}

export interface CookieOptions {
	secure?:		true;
	strict?:	true;
	xorigin?:	"Secure" | "Lax" | "None";
	expiry?:	string;
	path?:		string;
}