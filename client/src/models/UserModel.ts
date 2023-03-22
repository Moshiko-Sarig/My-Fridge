export class UserModel {
    constructor(
        public email: string,
        public password: string,
        public user_id: string,
        public first_name: string,
        public last_name: string,
        public intentional_use: boolean, // 0 for private use, 1 for commercial use
        public company_name: string, // only filled out for commercial use, otherwise N/A
        public phone_number: string
    ) { }
}