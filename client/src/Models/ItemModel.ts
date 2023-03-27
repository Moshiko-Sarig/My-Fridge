export default class ItemModel {
    constructor(
        public item_id: string,
        public category_name: string,
        public item_name: string,
        public quantity: string,
        public expiration_date: string,
        public user_id: string
    ) { }
}