import api from './axios.init.ts';
import { paymentRequestData } from '../types.and.enums/api.types.ts';

export const UsePaymentApi = () => {
    const getPayments = () => {
        try {
            return api.get('/api/payments');
        } catch (e) {
            console.error(e);
        }
    };

    const addNewPayment = (data: paymentRequestData) => {
        try {
            return api.post('/api/payments/add', data);
        } catch (e) {
            console.error(e);
        }
    };

    const deletePayment = (id: string) => {
        try {
            return api.delete(`/api/payments/${id}`);
        } catch (e) {
            console.error(e);
        }
    };

    const updatePayment = (id: string, data: paymentRequestData) => {
        try {
            return api.put(`/api/payments/${id}`, data);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        getPayments,
        addNewPayment,
        deletePayment,
        updatePayment,
    };
};
