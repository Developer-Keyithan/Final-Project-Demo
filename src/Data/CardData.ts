import { ReactNode } from "react";

interface BankCard {
  [x: string]: ReactNode;
  id: string,
  bank: string;
  cardNo: string;
  expireDate: string;
  savedDate: string;
  type: 'master' | 'visa';
  default: boolean;
}

const cardData: BankCard[] = [
  {
    id: 'C0001',
    bank: 'Commercial Bank',
    cardNo: '5427 1234 5678 9123',
    expireDate: '09/27',
    savedDate: '9th of December 2024',
    type: 'master',
    default: false,
  },
  {
    id: 'C0002',
    bank: 'Bank of Ceylon',
    cardNo: '5427 9876 5432 1987',
    expireDate: '12/27',
    savedDate: '21st of December 2024',
    type: 'visa',
    default: false,
  },
  {
    id: 'C0003',
    bank: "People's Bank",
    cardNo: '5427 1472 5836 9147',
    expireDate: '01/28',
    savedDate: '1st of January 2025',
    type: 'master',
    default: true,
  },
];

export default cardData;
