import api from './axios.init.ts';
import { creditCardRequestData } from '../types.and.enums/api.types.ts';

export const useCreditCardApi = () => {
    const getCreditCards = async () => {
        try {
            return await api.get('/api/credit-cards');
        } catch (e) {
            console.error(e);
        }
    };

    const addNewCreditCard = async (data: creditCardRequestData) => {
        try {
            return await api.post('/api/credit-cards/add', data);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteCreditCard = async (id: string) => {
        try {
            return await api.delete(`/api/credit-cards/${id}`);
        } catch (e) {
            console.error(e);
        }
    };

    const updateCreditCard = async (id: string, data: creditCardRequestData) => {
        try {
            return await api.put(`/api/credit-cards/${id}`, data);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        getCreditCards,
        addNewCreditCard,
        deleteCreditCard,
        updateCreditCard,
    };
};
