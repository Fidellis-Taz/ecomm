const API_URL =
  document.domain === "localhost" ? "http://localhost:4000" : "your url";
// const API_URL = "https://www.chitwashop.com";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/seller/login`,
  GetUserDetails: `${API_URL}/api/auth/seller/profile-details`,
  GetProfileUpdate: `${API_URL}/api/auth/seller/profile-update`,

  GetUserRegsiter: `${API_URL}/api/auth/register`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,

  //Dashboard
  GetDashProductList: `${API_URL}/api/seller/dasbhoard/list`,

  //Vendor api
  CreateSellerShopList: `${API_URL}/api/vendor/shop-create`,
  GetAllShopList: `${API_URL}/api/vendor/shop-detail`,
  GetDeleteShopList: `${API_URL}/api/vendor/shop-delete`,

  //category api
  CreateCategoryList: `${API_URL}/api/category/create`,
  GetAllCategoryList: `${API_URL}/api/category/admin/main-list`,
  GetUpdateCategoryList: `${API_URL}/api/category/main-list/update`,
  GetSuggestions: `${API_URL}/api/category/search/allcombine`,
  //Sub category api
  CreateSubCategoryList: `${API_URL}/api/category/create-sub`,
  GEtAllSubCategoryList: `${API_URL}/api/category/sub-list`,
  GetUpdateSubCategoryList: `${API_URL}/api/category/sub-list/update`,
  GetSubDeleteById: `${API_URL}/api/category/sub-list/delete`,

  //Child category api
  GetAllSubCategory: `${API_URL}/api/category/getAllSubCategory?categoryId=`,
  CreateChildCategory: `${API_URL}/api/category/create-sub-child`,
  GetAllChildCategoryList: `${API_URL}/api/category/list`,
  GetChildDeleteById: `${API_URL}/api/category/child/deleteById`,
  GetAllSubChildCategory: `${API_URL}/api/category/getAllSubChildCategory?subcategoryId=`,

  //product api
  AddSellerProductList: `${API_URL}/api/seller/product/create`,
  GetAllBrandList: `${API_URL}/api/seller/brand/list`,
  GetAllColorList: `${API_URL}/api/product/color/list`,
  GetAllProductList: `${API_URL}/api/seller/product/list`,
  UpdateSellerProductList: `${API_URL}/api/seller/product/update`,
  GetProductById: `${API_URL}/api/seller/product/list-by-id`,
  GetSingeImageUpload: `${API_URL}/api/seller/image/single-upload`,
  GetThumbnailDelete: `${API_URL}/api/seller/image/delete`,
  GetMultipleImageUpload: `${API_URL}/api/product/upload/varient-img`,
  GetMultipleImageDelete: `${API_URL}/api/product/aws/delete/photo`,
  GetDeleteProduct: `${API_URL}/api/product/varients-delete`,
  GetSellerProductList: `${API_URL}/api/seller/product/getAllList`,

  //Coupon
  GetCreateCoupon: `${API_URL}/api/seller/coupon/create`,
  GetCouponList: `${API_URL}/api/seller/coupon/list`,
  GetDeleteCoupon: `${API_URL}/api/seller/coupon`,

  //parlour api
  GetCreateSalonCategory: `${API_URL}/api/salon/category-create`,
  GetAllSalonList: `${API_URL}/api/salon/category-list`,
  GetSalonUpdate: `${API_URL}/api/salon/category-update`,
  GetServiceCreate: `${API_URL}/api/salon/service-create`,
  GetServiceList: `${API_URL}/api/salon/service-list`,
  GetServiceByGender: `${API_URL}/api/salon/service-by-gender`,
  GetServiceUpdate: `${API_URL}/api/salon/service-update`,
  GetServiceListByGender: `${API_URL}/api/salon/filter/category-gender`,
  DeleteCategoryList: `${API_URL}/api/salon/category-delete`,
  GetServiceDeleteFromSalon: `${API_URL}/api/salon/service-delete`,
  CreateSalonDetails: `${API_URL}/api/salon/create-parlour`,
  UpdateSalonDetails: `${API_URL}/api/salon/update-parlour`,
  GetAllSalonOwner: `${API_URL}/api/salon/list-by-id`,
  GetParlourStatus: `${API_URL}/api/salon/parlour-status-update`,
  GetParlourOrderList: `${API_URL}/api/salon/seller/order`,

  //area api
  CreateCityList: `${API_URL}/api/location/city/create`,
  GetCityList: `${API_URL}/api/location/city/list`,
  GetCityDeleteById: `${API_URL}/api/location/city/delete`,
  GetCityUpdate: `${API_URL}/api/location/city/update`,
  GetAllAreaByLocation: `${API_URL}/api/location/area/getAllAreaList?locationId=`,
};
export { API_URL, Apis };
