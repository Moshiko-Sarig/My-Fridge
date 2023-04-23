export default class UserModel {
    constructor(
        public email: string,
        public password: string,
        public user_id: string,
        public first_name: string,
        public last_name: string,
        public phone_number: string,
        public is_admin: boolean,
        public email_verified:boolean,
    ) { }
}