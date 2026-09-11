import { test, expect } from '@playwright/test'

test.describe('Github users API', () => {
    test('Usuário válido - deve retornar dados de um usuário existente', async ({ request }) => {
        const response = await request.get('https://api.github.com/users/octocat');

        await test.step('Validar status da resposta', async () => {
            expect(response.status()).toBe(200);
        });

        const body = await response.json();

        await test.step('Validar campos esperados do usuário', async () => {
            expect(body.login).toBe('octocat');
            expect(body.id).toEqual(expect.any(Number));
            expect(body.public_repos).toEqual(expect.any(Number));
        });
    });

    test('Usuário inexistente - deve retornar 404 para usuário inexistente', async ({ request }) => {
        const username = 'qa-nao-existe-${Date.now()}';

        const response = await request.get(`https://api.github.com/users/${username}`);

        await test.step('Validar status 404', async () => {
            expect(response.status()).toBe(404);
        });

    });
});