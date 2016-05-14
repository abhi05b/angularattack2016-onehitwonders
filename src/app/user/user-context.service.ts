import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserContextService {

	private	loggedInUser: User

	constructor() {}

	setUser(user: User){
		this.loggedInUser = user;
	}

	removeUser(){
		this.loggedInUser = null;
	}

	getUser(){
		return this.loggedInUser;
	}

}
