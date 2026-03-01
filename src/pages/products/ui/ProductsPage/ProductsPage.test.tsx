import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsPage } from './ProductsPage';
import { productsApi } from '@/shared/api/products';

vi.mock('@/shared/api/products', () => ({
  DEFAULT_COUNT: 3,
  productsApi: { getProducts: vi.fn() },
}));

const mockGetProducts = vi.mocked(productsApi.getProducts);

const allItems = [
  { code: '10', title: 'Lorem title', manufacturer: 'M1', description: 'D1', price: '10P', stock: 100 },
  { code: '20', title: 'Another', manufacturer: 'M2', description: 'D2', price: '20P', stock: 50 },
  { code: '30', title: 'Third', manufacturer: 'M3', description: 'D3', price: '30P', stock: 10 },
  { code: '40', title: 'Second page', manufacturer: 'M4', description: 'D4', price: '40P', stock: 5 },
  { code: '50', title: 'Fifth', manufacturer: 'M5', description: 'D5', price: '50P', stock: 1 },
  { code: '60', title: 'Sixth', manufacturer: 'M6', description: 'D6', price: '60P', stock: 2 },
];

describe('ProductsPage smoke', () => {
  beforeEach(() => {
    mockGetProducts.mockImplementation(({ skip, count }) => {
      const items = allItems.slice(skip, skip + count);
      return Promise.resolve({ totalItems: allItems.length, items });
    });
  });

  it('searches by query and renders filtered result', async () => {
    render(<ProductsPage />);

    await screen.findByText('Lorem title');

    const searchInput = screen.getByPlaceholderText('Введите строку поиска');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'lorem');
    await userEvent.click(screen.getByRole('button', { name: 'Поиск' }));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenLastCalledWith(
        expect.objectContaining({ search: 'lorem', skip: 0 })
      );
    });
  });

  it('changes page with next and previous buttons', async () => {
    render(<ProductsPage />);

    await screen.findByText('Lorem title');
    await userEvent.click(screen.getByRole('button', { name: 'Следующая' }));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenLastCalledWith(
        expect.objectContaining({ skip: 3 })
      );
    });

    await userEvent.click(screen.getByRole('button', { name: 'Предыдущая' }));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenLastCalledWith(
        expect.objectContaining({ skip: 0 })
      );
    });
  });
});
