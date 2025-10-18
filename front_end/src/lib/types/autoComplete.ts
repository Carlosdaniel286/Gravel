export type AutoCompleteProps<Item> = {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item;
    filterOptions?: (options: Item[] | string[], value: string) => string[] | void;
    class?: string;
    mask?: string[] | string | RegExp;
    onClear?:() => void;
    value?: string | (Item | string)[];
    title?:string;
    placeholder?:string;
    height?:string|number;
    multiple?:boolean;
  }