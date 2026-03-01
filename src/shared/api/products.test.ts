import { vi } from 'vitest';
import { productsApi } from './products';
import { apiClient } from './client';

vi.mock('./client', () => ({
  apiClient: {
    http: { get: vi.fn() },
    toApiError: (e: unknown) => e,
  },
}));

describe('productsApi', () => {
  it('getProducts returns items and totalItems', async () => {
    vi.mocked(apiClient.http.get).mockResolvedValue({
      data: {
        status: 'Ok',
        result: { totalItems: 2, items: [{ code: '1', title: 'A' }, { code: '2', title: 'B' }] },
      },
    } as never);

    const data = await productsApi.getProducts({ skip: 0, count: 2 });
    expect(data).toHaveProperty('totalItems');
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
  });
});
