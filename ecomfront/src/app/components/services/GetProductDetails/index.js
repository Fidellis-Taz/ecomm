import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';
import apiError from '../../../../common/apiError';

const getProductById = async (data) => {
    try {
        let result = await api.post(Apis.GetProductById, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getProductByCateogry = async (slug) => {
    try {
        let data = { slug: slug };
        let result = await api.post(Apis.GetProductByCateogry, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllProductList = async (data) => {
    try {
        let result = await api.post(Apis.GetAllProductList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllPersonalCare = async (data) => {
    try {
        let result = await api.get(Apis.GetAllPersonalCare);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllHomeKitchen = async (data) => {
    try {
        let result = await api.get(Apis.GetAllHomeKitchen);
        if (result.data.success) {
            NotificationManager.error(result.data.message);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getProductByFilter = async (txt) => {
    try {
        let result = await api.get(Apis.GetProductByFilter + txt);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getCategoryListByFilter = async (data) => {
    try {
        let result = await api.post(Apis.GetCategoryListByFilter, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getProductBySubcategory = async (data) => {
    try {
        let result = await api.post(Apis.GetProductBySubcategory, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getFilterbyChildCategory = async (data) => {
    try {
        let result = await api.post(Apis.GetFilterbyChildCategory, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getAllRelatableProductList = async (id) => {
    let data = { id: id }
    try {
        let result = await api.post(Apis.GetAllRelatableProductList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getAllBannerList = async () => {
    try {
        let result = await api.get(Apis.GetAllBannerList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllCovidOffer = async () => {
    try {
        let result = await api.get(Apis.GetAllCovidOffer);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllfiltershortby = async (data) => {
    try {
        let result = await api.post(Apis.GetAllfiltershortby, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getNewArrivalProudct = async () => {
    try {
        let result = await api.get(Apis.GetNewArrivalProudct);
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
    getProductById,
    getAllProductList,
    getProductByFilter,
    getAllBannerList,
    getCategoryListByFilter,
    getProductBySubcategory,
    getProductByCateogry,
    getAllPersonalCare,
    getAllHomeKitchen,
    getAllRelatableProductList,
    getAllCovidOffer,
    getAllfiltershortby,
    getFilterbyChildCategory,
    getNewArrivalProudct
};