export class Account{
	name: string;
	parent: Account;
	constructor(name?: string, parent?: Account){
		this.parent = parent;
		this.name = name || '';
	}
}