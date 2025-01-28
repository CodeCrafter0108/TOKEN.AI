export interface SortSelectorProps {
    text: string;
    id?: string;
    value?: SortType;
    disabled?: boolean;
    onChange?: (value: SortType) => void;
}

export enum SortType {
    NONE,
    ASC,
    DESC,
}
