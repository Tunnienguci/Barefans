/** @format */

import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor() {}

	register(user: any) {
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		users.push(user);
		localStorage.setItem("", JSON.stringify(users));
	}
}
