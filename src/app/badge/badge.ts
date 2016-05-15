import { Account } from '../account/account'

export class Badge{
	constructor(public name: string, public accounts: Account[], public amount: number, public count: number, public description?: string){

	}
	
}