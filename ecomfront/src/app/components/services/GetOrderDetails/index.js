import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';
import { getCookie } from '../../../../function';
import apiError from '../../../../common/apiError';

const getOrderCreateByUser = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderCreateByUser, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getOrderByUser = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderByUser, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getOrderDetailsById = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderDetailsById, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getCancelOrder = async (data) => {
    try {
        let result = await api.post(Apis.OrderCancelByProduct, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
export default {
    getOrderCreateByUser,
    getOrderByUser,
    getCancelOrder,
    getOrderDetailsById
};