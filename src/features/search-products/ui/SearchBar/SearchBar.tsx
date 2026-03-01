import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  defaultTake: number;
  isLoading: boolean;
  onSubmit: (search: string, take: number) => void;
}

export const SearchBar = ({ defaultTake, isLoading, onSubmit }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [take, setTake] = useState(defaultTake);

  return (
    <form
      className={styles.root}
      onSubmit={(event) => {
        event.preventDefault();
        const normalizedTake = Number.isFinite(take) ? Math.min(100, Math.max(1, take)) : defaultTake;
        onSubmit(search, normalizedTake);
      }}
    >
      <div className={styles.searchField}>
        <Input
          label="Поиск"
          type="text"
          placeholder="Введите строку поиска"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className={styles.qtyField}>
        <Input
          label="Кол-во"
          type="number"
          min={1}
          max={100}
          value={take}
          onChange={(event) => setTake(Number(event.target.value))}
        />
      </div>
      <div className={styles.buttonWrap}>
        <Button type="submit" disabled={isLoading}>
          Поиск
        </Button>
      </div>
    </form>
  );
};
