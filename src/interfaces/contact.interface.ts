export interface ContactAddress {
  colony: string;
  municipality: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface Contact {
  name: string;
  identification: string;
  email: string;
  address?: ContactAddress;
}
