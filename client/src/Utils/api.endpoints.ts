const api_endpoints = {
    // user endpoints
    LOGIN: "http://localhost:4000/api/v1/login",
    REGISTER: "http://localhost:4000/api/v1/register",
    // item category endpoints
    GET_CATEGORIES: "http://localhost:4000/api/v1/categories",
    ADD_CATEGORY: "http://localhost:4000/api/v1/categories/add/new/category",
    EDIT_CATEGORY: "http://localhost:4000/api/v1/categories/edit/category",
    DELETE_CATEGORY: "http://localhost:4000/api/v1/categories/delete/:category_id",
    // item endpoints
    GET_ITEMS: "http://localhost:4000/api/v1/items",
    GET_ITEM: "http://localhost:4000/api/v1/items/get/item/by/item/id",
    GET_LATEST_ITEM: "http://localhost:4000/api/v1/items/get/the/latest/item",
    GET_USER_ITEMS: "http://localhost:4000/api/v1/items/:id",
    ADD_ITEM: "http://localhost:4000/api/v1/items/add/new/item",
    EDIT_ITEM: "http://localhost:4000/api/v1/items/edit/item",
    DELETE_ITEM: "http://localhost:4000/api/v1/items/delete/:item_id"
};

export default api_endpoints;