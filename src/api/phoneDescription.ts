import axios from 'axios';
import { Phone } from '../types/Phone';
import { PhoneDescr } from '../utils/types/PhoneDescription';

const BASE_URL = 'https://productcatalogapi-production.up.railway.app/phones/'

export const getPhones = async () => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
}

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL+id)
    .then((response) => response.data);
};

export const getAllPhones = async() => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
};
