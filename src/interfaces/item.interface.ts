export interface IItemBase {
  name: string;
  description: string;
  price: number;
}

export interface IItem extends IItemBase {
  id: string;
}
