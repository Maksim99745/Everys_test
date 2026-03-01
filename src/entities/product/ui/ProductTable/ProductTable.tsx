import type { StockItemApi } from '@/shared/api/types';
import { bem } from '@/shared/lib/bem';
import styles from './ProductTable.module.scss';

const cnProductTable = bem(styles, 'product-table');

interface ProductTableProps {
  products: StockItemApi[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  if (products.length === 0) {
    return <div className={cnProductTable('empty')}>Товары не найдены</div>;
  }

  return (
    <section className={cnProductTable()}>
      <table className={cnProductTable('table')}>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>Code</th>
            <th className={cnProductTable('cell', 'ellipsis')} style={{ width: '20%' }}>Title</th>
            <th className={cnProductTable('cell', 'ellipsis')} style={{ width: '20%' }}>Manufacturer</th>
            <th className={cnProductTable('cell', 'ellipsis')} style={{ width: '32%' }}>Description</th>
            <th style={{ width: '10%' }}>Price</th>
            <th style={{ width: '10%' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.code ? `${item.code}-${index}` : `row-${index}`}>
              <td className={cnProductTable('cell', 'code')}>{item.code}</td>
              <td className={cnProductTable('cell', 'ellipsis')} title={item.title ?? ''}>
                {item.title}
              </td>
              <td className={cnProductTable('cell', 'ellipsis')} title={item.manufacturer ?? ''}>
                {item.manufacturer}
              </td>
              <td className={cnProductTable('cell', 'ellipsis')} title={item.description ?? ''}>
                {item.description}
              </td>
              <td className={cnProductTable('cell', 'price')}>{item.price}</td>
              <td className={cnProductTable('cell', 'stock')}>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={cnProductTable('mobile-header')}>
        Code / Title / Manufacturer / Description / Price / Stock
      </div>
      <div className={cnProductTable('cards')}>
        {products.map((item, index) => (
          <article key={item.code ? `${item.code}-${index}` : `card-${index}`} className={cnProductTable('card')}>
            <p className={cnProductTable('title-line')} title={`${item.title ?? ''} | ${item.manufacturer ?? ''}`}>
              {item.code} {item.title}{' '}
              <span className={cnProductTable('manufacturer')}>| {item.manufacturer}</span>
            </p>
            <p className={cnProductTable('description')} title={item.description ?? ''}>
              {item.description}
            </p>
            <p className={cnProductTable('meta')}>
              {item.price} <span className={cnProductTable('stock')}>| {item.stock}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
