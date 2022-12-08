import axios from 'axios';
import PhoneDescr from '../types/PhoneDescription';
import { Phone } from '../types/Phone';

const BASE_URL = 'https://team-404-mate.netlify.app/.netlify/functions/server/phones'

export const getPhones = async () => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
}

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL+'/'+id)
    .then((response) => response.data);
};

export const getAllPhones = async() => {
  return await axios.get<Phone[]>(BASE_URL)
      .then((response) => response.data);
};

export const getSelectedPhones = async(query: string) => {
  return await axios.get<Phone[]>(BASE_URL+`?query=${query}`)
    .then((response) => response.data);
};

export const getArrangedPhones = async(orderType: string) => {
  return await axios.get<Phone[]>(BASE_URL+`?orderType=${orderType}`)
    .then((response) => response.data);
};
