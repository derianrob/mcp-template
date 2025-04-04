export interface IContactAddress {
  zipCode: string;
}

export interface IContact {
  name: string;
  email: string;
  address: IContactAddress;
}
