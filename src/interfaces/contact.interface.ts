export interface IContactAddress {
  zipCode: string;
}

export interface IContactBase {
  name: string;
  email: string;
  address: IContactAddress;
}

export interface IContact extends IContactBase {
  id: string;
}
