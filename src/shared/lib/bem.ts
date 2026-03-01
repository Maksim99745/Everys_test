type Styles = Record<string, string>;

export function bem(styles: Styles, block: string) {
  return (element?: string, modifier?: string) => {
    const baseKey = element ? `${block}__${element}` : block;
    const base = styles[baseKey];
    if (!modifier) return base ?? '';
    const mod = styles[`${baseKey}--${modifier}`];
    return [base, mod].filter(Boolean).join(' ');
  };
}
