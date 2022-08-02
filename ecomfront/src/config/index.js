const API_URL =
  document.domain === "localhost"
    ? "http://localhost:4000"
    : "http://localhost:4000";
const CALLBACK_URL = window.location.origin;
const Apis = {
  //Authentication api

  GetUserGoogleLogin: `${API_URL}/api/customer/google?callbackURL=${CALLBACK_URL}`,
  GetUserLogin: `${API_URL}/api/customer/rootLogin`,
  GetUserRegsiter: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId`,
  GetCustomerResetEmail: `${API_URL}/api/customer/forget-password`,
  GetCustomerResetPassword: `${API_URL}/api/customer/reset`,
  GetCustomerEmailVerify: `${API_URL}/api/customer/email-verify`,
  GetAddNewAddress: `${API_URL}/api/customer/add-new-address`,
  GetDeleteProduct: `${API_URL}/api/customer/delete-address`,

  //product api
  GetProductById: `${API_URL}/api/product/getWebProductById`,
  GetAllGroceryStaple: `${API_URL}/api/product/getAllGroceryStaple`,
  GetAllProductList: `${API_URL}/api/product/list`,
  GetProductByCateogry: `${API_URL}/api/product/getAllByCategory`,
  GetAllRelatableProductList: `${API_URL}/api/product/website/relatedProduct`,
  GetAllBannerList: `${API_URL}/api/product/banner-list`,
  GetAllfiltershortby: `${API_URL}/api/product/filtersortby`,
  GetAllCovidOffer: `${API_URL}/api/category/covid-offer/senetry-pad`,
  GetNewArrivalProudct: `${API_URL}/api/product/new-arrival`,

  // Categorywise
  GetAllPersonalCare: `${API_URL}/api/product/getAllPersonalCare`,
  GetAllHomeKitchen: `${API_URL}/api/product/getAllHomeKitchen`,
  GetAllMainCategorlist: `${API_URL}/api/category/main-list`,
  GetSearchByCatList: `${API_URL}/api/category/search-by-value`,
  //Order api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/list-by-customer`,
  GetOrderDetailsById: `${API_URL}/api/order/details-by-id`,
  OrderCancelByProduct: `${API_URL}/api/order/cancel-by-product`,

  //Filter by category
  GetAllCategoryList: `${API_URL}/api/category/cn/list?slug=`,
  GetFilterByCategory: `${API_URL}/api/category/findbysubchild`,

  //profile
  GetCustomerUpdateDetails: `${API_URL}/api/customer/update`,

  //Get location
  GetLocationListDetails: `${API_URL}/api/location/list`,
  GetAreaListDetails: `${API_URL}/api/location/area/list/getbyid?id=`,

  //Get filter by product
  GetProductByFilter: `${API_URL}/api/product/gcatalogsearch/result?search=`,
  GetCategoryListByFilter: `${API_URL}/api/category/catlogsearch/child-category`,
  GetProductBySubcategory: `${API_URL}/api/category/catlogsearch/product`,
  GetFilterbyChildCategory: `${API_URL}/api/category/subcatlog/search/product`,
  GetFilterCatBrandList: `${API_URL}/api/category/category-brand-list`,
  //vendor create list
  CreateNewVendor: `${API_URL}/api/vendor/contact-create`,

  // parlour api
  GetAllParlourList: `${API_URL}/api/salon/website/getAllSalonList`,
  GetAllServiceList: `${API_URL}/api/salon/website/getAllServiceList`,
};
export { API_URL, Apis };
