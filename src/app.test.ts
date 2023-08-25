import request from 'supertest';
import { appHandler } from './appHandler';

describe('API Tests', () => {
  it('should get characters', async () => {
    const response = await request(appHandler).get('/api/personajes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
  }, 10000); 
});
