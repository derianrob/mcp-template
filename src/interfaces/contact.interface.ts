export interface ContactAddress {
  zipCode: string;
}

export interface Contact {
  name: string;
  email: string;
  address: ContactAddress;
}
