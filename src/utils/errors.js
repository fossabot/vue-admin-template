export class ApiResponseException {
	constructor(code, message, data) {
		this.code = code;
		this.message = message;
		this.data = data;
	}

	toString() {
		return `code: ${this.code}; message: ${this.message}; data: ${JSON.stringify(this.data)}`;
	}
}
