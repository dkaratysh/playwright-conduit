import type { User } from '../../types/user';
import { expect } from '@playwright/test';

export function validateUserSchema (user: unknown): asserts user is User {
    expect(typeof user).toBe('object');
    expect(user).not.toBeNull();

    const u = user as Record<string, unknown>;
    
    expect(user).toHaveProperty('email');
    expect(typeof u.email).toBe('string');
    expect(user).toHaveProperty('username');
    expect(typeof u.username).toBe('string')
    expect(user).toHaveProperty('token');
    expect(typeof u.token).toBe('string')

    expect(user).toHaveProperty('bio');
    expect(u.bio === null || typeof u.bio === 'string').toBe(true);
    expect(user).toHaveProperty('image');
    expect(u.image === null || typeof u.image === 'string').toBe(true);

}