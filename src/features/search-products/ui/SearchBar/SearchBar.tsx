import { useState } from 'react';
import { bem } from '@/shared/lib/bem';
import { Button, Input } from '@/shared/ui';
import { DEFAULT_COUNT } from '@/shared/api/products';
import styles from './SearchBar.module.scss';

const cnSearchBar = bem(styles, 'search-bar');

function parseCount(value: string): number {
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num >= 1 && num <= 100 ? num : DEFAULT_COUNT;
}

interface SearchBarProps {
  isLoading: boolean;
  onSubmit: (search: string, count: number) => void;
}

export const SearchBar = ({ isLoading, onSubmit }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(String(DEFAULT_COUNT));

  return (
    <form
      className={cnSearchBar()}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search, parseCount(count));
      }}
    >
      <div className={cnSearchBar('search-field')}>
        <Input
          label="Поиск"
          type="text"
          placeholder="Введите строку поиска"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={cnSearchBar('qty-field')}>
        <Input
          label="Кол-во"
          type="number"
          min={1}
          max={100}
          value={count}
          compact
          onChange={(e) => setCount(e.target.value)}
        />
      </div>
      <div className={cnSearchBar('button-wrap')}>
        <Button type="submit" disabled={isLoading}>
          Поиск
        </Button>
      </div>
    </form>
  );
};
