interface Address {
  id: string,
  no?: number;
  street?: string;
  town: string;
  division?: string;
  district: string;
  contact: string;
  type: 'home' | 'work-place' | 'other-location';
}

const addressData: Address[] = [
  {
    id: 'AD0001',
    no: 91,
    town: 'Arasadikkulam',
    division: 'Cheddikulam',
    district: 'Vavuniya',
    contact: '77 1234 567',
    type: 'home',
  },
  {
    id: 'AD0002',
    no: 57,
    street: '2nd Cross Street',
    town: 'Vavuniya',
    district: 'Vavuniya',
    contact: '77 1234 567',
    type: 'work-place',
  },
  {
    id: 'AD0003',
    town: 'Nochchimottai',
    division: 'Omanthai',
    contact: '77 1234 567',
    district: 'Vavuniya',
    type: 'other-location',
  },
  {
    id: 'AD0004',
    town: 'Pampaimadu',
    division: 'Vavuniya',
    district: 'Vavuniya',
    contact: '77 1234 567',
    type: 'other-location',
  },
];

export default addressData;
