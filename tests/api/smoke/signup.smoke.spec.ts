import {test, expect} from '@playwright/test';

test ('POST api/users registers a new user and login successfully', async ({ request }) => {
    const username = `smoke_${Date.now()}`
    const email = `smoke_${Date.now()}@test.local`
    const password = 'Test123'

    await request.post('api/users', {
        data: { user: { email, password, username}}
    })

    const login = await request.post('api/users/login', {
        data: { user: { email, password}}
    })

    expect(login.ok()).toBeTruthy();
});