import { buildStockFilter, mapStockItem } from './products';

describe('products api helpers', () => {
  it('buildStockFilter escapes quotes and joins fields', () => {
    const filter = buildStockFilter("O'Reilly");
    expect(filter).toContain("contains(title,'O''Reilly')");
    expect(filter).toContain('contains(description');
    expect(filter).toContain('contains(manufacturer');
  });

  it('mapStockItem maps nullable fields', () => {
    const product = mapStockItem({
      code: null,
      title: 'Title',
      manufacturer: null,
      description: null,
      price: null,
      stock: 10,
    });

    expect(product).toEqual({
      code: '',
      title: 'Title',
      manufacturer: '',
      description: '',
      price: '',
      stock: 10,
    });
  });
});
