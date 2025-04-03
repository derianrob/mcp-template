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
  phonePrimary: string;
  address: ContactAddress;
  thirdType: 'NATIONAL';
  regime: 'NO_REGIME';
  type: 'client';
}
