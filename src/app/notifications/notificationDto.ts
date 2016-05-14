export class Notification{
	type: string;
	data: any;
	read: boolean;
	constructor(type?: string, data?: any, read?: boolean){
		this.type = type;
		this.data = data;
		this.read = read || false;
	}
}