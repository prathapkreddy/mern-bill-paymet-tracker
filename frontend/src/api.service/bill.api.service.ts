import api from './axios.init.ts';
import { billRequestData } from '../types.and.enums/api.types.ts';

export const useBillApi = () => {

    const getBills = async () => {
        try {
            return await api.get('/api/bills');
        } catch (e) {
            console.error(e);
        }
    };

    const addNewBill = async (data: billRequestData) => {
        try {
            return await api.post('/api/bills', data);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteBill = async (id: string) => {
        try {
            return await api.delete(`/api/bills/${id}`);
        } catch (e) {
            console.error(e);
        }
    };

    const updateBill = async (id: string, data: billRequestData) => {
        try {
            return await api.put(`/api/bills/${id}`, data);
        } catch (e) {
            console.error(e);
        }
    };


    return {
        getBills,
        addNewBill,
        deleteBill,
        updateBill,
    };
};