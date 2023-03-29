const request = require('supertest');
const server = require('../../app.js');
const db = require('../../src/database/db');

afterAll(async () => {
    await server.close();
    await db.close();
});

describe('Item Endpoints', () => {
    const testUserId = 1;

    it('should get items by user ID', async () => {
        const response = await request(server).get(`/api/v1/items/${testUserId}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should add a new item', async () => {
        const newItem = {
            category_name: 'TestCategory',
            item_name: 'TestItem',
            quantity: 1,
            expiration_date: '2024-01-01',
            user_id: testUserId
        };

        const response = await request(server)
            .post('/api/v1/items/add/new/item')
            .send(newItem);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.category_name).toBe(newItem.category_name);
        expect(response.body.item_name).toBe(newItem.item_name);
        expect(response.body.quantity).toBe(newItem.quantity);
        expect(response.body.expiration_date).toBe(newItem.expiration_date);
    });

    it('should edit an item', async () => {
        const itemToEdit = {
            item_id: 1, // Replace with an actual item ID in your database
            category_name: 'UpdatedCategory',
            item_name: 'UpdatedItem',
            quantity: 2,
            expiration_date: '2024-01-02',
            user_id: testUserId
        };

        const response = await request(server)
            .put('/api/v1/items/edit/item')
            .send(itemToEdit);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.category_name).toBe(itemToEdit.category_name);
        expect(response.body.item_name).toBe(itemToEdit.item_name);
        expect(response.body.quantity).toBe(itemToEdit.quantity);
        expect(response.body.expiration_date).toBe(itemToEdit.expiration_date);
    });

    it('should delete an item', async () => {
        const itemToDelete = 1; // Replace with an actual item ID in your database

        const response = await request(server).
            delete(`/api/v1/items/delete/${itemToDelete}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.affectedRows).toBe(1);
    });
});
