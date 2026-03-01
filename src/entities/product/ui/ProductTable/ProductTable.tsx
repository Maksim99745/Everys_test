import type { Product } from '@/shared/api/types';
import styles from './ProductTable.module.scss';

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  if (products.length === 0) {
    return <div className={styles.empty}>Нет данных для отображения</div>;
  }

  return (
    <section className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Code</th>
            <th style={{ width: '20%' }}>Title</th>
            <th style={{ width: '20%' }}>Manufacturer</th>
            <th style={{ width: '25%' }}>Description</th>
            <th style={{ width: '10%' }}>Price</th>
            <th style={{ width: '15%' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td className={styles.ellipsis}>{item.title}</td>
              <td className={styles.ellipsis}>{item.manufacturer}</td>
              <td className={styles.ellipsis}>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.mobileHeader}>Code / Title / Manufacturer / Description / Price / Stock</div>
      <div className={styles.cards}>
        {products.map((item) => (
          <article key={`${item.code}-mobile`} className={styles.card}>
            <p className={styles.titleLine}>
              {item.code} <strong>{item.title}</strong> | {item.manufacturer}
            </p>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.meta}>
              {item.price} | {item.stock}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
