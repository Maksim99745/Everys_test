import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsPage } from './ProductsPage';

describe('ProductsPage smoke', () => {
  it('searches by query and renders filtered result', async () => {
    render(<ProductsPage />);

    const searchInput = await screen.findByPlaceholderText('Введите строку поиска');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'lorem');
    await userEvent.click(screen.getByRole('button', { name: 'Поиск' }));

    await waitFor(async () => {
      const matches = await screen.findAllByText('Lorem title');
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('changes page with next and previous buttons', async () => {
    render(<ProductsPage />);

    const firstPageMatches = await screen.findAllByText('Lorem title');
    expect(firstPageMatches.length).toBeGreaterThan(0);
    await userEvent.click(screen.getByRole('button', { name: 'Следующая' }));

    await waitFor(() => {
      expect(screen.getAllByText('Second page').length).toBeGreaterThan(0);
    });

    await userEvent.click(screen.getByRole('button', { name: 'Предыдущая' }));

    await waitFor(() => {
      expect(screen.getAllByText('Lorem title').length).toBeGreaterThan(0);
    });
  });
});
