import axios from 'axios';
import PhoneDescr from '../types/PhoneDescription';
import { Good } from '../types/Good';

const BASE_URL_PHONES = 'https://team-404-mate.netlify.app/.netlify/functions/server/phones';
const BASE_URL_TABLETS = 'https://team-404-mate.netlify.app/.netlify/functions/server/tablets';

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL_PHONES+'/'+id)
    .then((response) => response.data);
};

export const getAllPhones = async() => {
  return await axios.get<Good[]>(BASE_URL_PHONES)
      .then((response) => response.data);
};

export const getSelectedPhones = async(query: string) => {
  return await axios.get<Good[]>(BASE_URL_PHONES+`?query=${query}`)
    .then((response) => response.data);
};

export const getArrangedPhones = async(orderType: string) => {
  return await axios.get<Good[]>(BASE_URL_PHONES+`?orderType=${orderType}`)
    .then((response) => response.data);
};

export const getPhonesQuantity = async(quantity: string) => {
  return await axios.get<number>(BASE_URL_PHONES+`?quantity=${quantity}`)
    .then((response) => response.data);
};

export const getAllTablets = async() => {
  return await axios.get<Good[]>(BASE_URL_TABLETS)
    .then((response) => response.data);
};

export const getSelectedTablets = async(query: string) => {
  return await axios.get<Good[]>(BASE_URL_TABLETS+`?query=${query}`)
    .then((response) => response.data);
};

export const getTabletQuantity = async(quantity: string) => {
  return await axios.get<number>(BASE_URL_TABLETS+`?quantity=${quantity}`)
    .then((response) => response.data);
};
