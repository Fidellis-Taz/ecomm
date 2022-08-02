import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';
import { getCookie } from '../../../../function';
import apiError from '../../../../common/apiError';

const getLocationListDetails = async () => {
    try {
        let result = await api.get(Apis.GetLocationListDetails,{
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

const getFilterByCategory = async (data) => {
    try {
        let result = await api.post(Apis.GetFilterByCategory, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAreaListDetails = async (data) => {
    try {
        let result = await api.get(Apis.GetAreaListDetails+`/${data.slug}`);
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
    getLocationListDetails,
    getFilterByCategory,
    getAreaListDetails
};