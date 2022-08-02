import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';
import apiError from '../../../../common/apiError';
const getAllCategoryList = async (slug) => {
    try {
        let result = await api.get(Apis.GetAllCategoryList + slug);
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

const getAllMainCategorlist = async () => {
    try {
        let result = await api.get(Apis.GetAllMainCategorlist);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
}

const getFilterCatBrandList = async (data) => {
    try {
        let result = await api.post(Apis.GetFilterCatBrandList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getSearchByCatList = async (data) => {
    try {
        let result = await api.post(Apis.GetSearchByCatList, data);
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
    getAllCategoryList,
    getFilterByCategory,
    getFilterCatBrandList,
    getSearchByCatList,
    getAllMainCategorlist,
};