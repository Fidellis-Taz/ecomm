import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';
import apiError from '../../../../common/apiError';

const getCreateNewVendor = async (data) => {
    try {
        let result = await api.post(Apis.CreateNewVendor,data);
        console.log(result)
        if (result.data.success === 'false') {
            NotificationManager.error(result.data.message);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

export default {
    getCreateNewVendor,
};