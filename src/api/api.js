import axios from 'axios';


//顾老师
//let base = 'http://192.168.1.6:9001/';
//杰诺
//let base = 'http://192.168.1.12:8080/manager/';
//测试库
 let base = 'http://test3.liandianyi.com:8090/';

  //let base = 'http://localhost:8080/manager/';


export const requestLogin = params => { return axios.get(`${base}init/login.action`, {params:params});};

//用户
export const getUserList = params => { return axios.get(`${base}admin/index.json`, { params: params }); };
export const editUser = params => { return axios.get(`${base}admin/systemUserEdit.json`, { params: params }); };

//角色
export const getRolesList = params => { return axios.get(`${base}admin/roleListByPage.json`, { params: params }); };
export const getAddRoles = params => { return axios.get(`${base}admin/roleAdd.json`, { params: params }); };
export const editRoles = params => { return axios.get(`${base}admin/roleEdit.json`, { params: params }); };
//用户角色
export const getRoleUser = params => { return axios.get(`${base}admin/userTree.json`, { params: params }); };
export const getRoleTree = params => { return axios.get(`${base}admin/roleTree.json`, { params: params }); };
export const getUserRoleList = params => { return axios.get(`${base}admin/UserAndRole.json`, { params: params }); };


export const getUserAuthor = params => { return axios.get(`${base}admin/updateUserAndRoles.json`, { params: params }); };

//角色权限
export const getRoleAuthor = params => { return axios.get(`${base}admin/rolePerTree.json`, { params: params }); };
export const getAuthorTree = params => { return axios.get(`${base}admin/permissionTree.json`, { params: params }); };
export const getRolePermission = params => { return axios.get(`${base}admin/RoleAndPermission.json`, { params: params }); };

export const getRoleAuthorTree = params => { return axios.get(`${base}admin/updateRoleAndPermissions.json`, { params: params }); };

//系统管理
export const getSystemManage = params => { return axios.get(`${base}admin/systemUserAdd.json`, { params: params }); };
export const getSystemRole = params => { return axios.get(`${base}admin/roleNameList.json`, { params: params }); };
//四级联动
export const getProvinceList = params => { return axios.get(`${base}admin/provinceList.json`, { params: params }); };


//权限
export const getPermissionList = params => { return axios.get(`${base}admin/permissionListByPage.json`, { params: params }); };
export const getAddPermission = params => { return axios.get(`${base}admin/tsysPermissionAdd.json`, { params: params }); };
export const editPermission = params => { return axios.get(`${base}admin/tsysPermissionEdit.json`, { params: params }); };


//省市区getAddProvince
export const getCityList = params => { return axios.get(`${base}admin/sysCityListByPage.json`, { params: params }); };
export const getAddProvince = params => { return axios.get(`${base}admin/sysProvinceAdd.json`, { params: params }); };
export const getAddCity = params => { return axios.get(`${base}admin/sysCityAdd.json`, { params: params }); };
export const getAddArea = params => { return axios.get(`${base}admin/sysAreaAdd.json`, { params: params }); };
export const getAddStreet = params => { return axios.get(`${base}admin/sysStreetAdd.json`, { params: params }); };

//根据省份Id获取城市列表

export const getCityNameList = params => { return axios.get(`${base}admin/cityListByProvinceId.json`, { params: params }); };
export const getAreaList = params => { return axios.get(`${base}admin/areaListByCityId.json`, { params: params }); };
export const editRoadList = params => { return axios.get(`${base}admin/townListByAreaId.json`, { params: params }); };
export const editAreaList = params => { return axios.get(`${base}admin/sysCityEdit.json`, { params: params }); };



export const loginOut = params => { return axios.get(`${base}init/logout.json`, { params: params }); };
export const resetPsd = params => { return axios.get(`${base}admin/resetPassword.json`, { params: params }); };

export const getVersion = params => { return axios.get(`${base}admin/txkjVersionAdd.json`, { params: params }); };

//充值
export const getRechargeSearchList = params => { return axios.get(`${base}admin/txkjAccountFeeListByPage.json`, { params: params }); };
export const getRechargeList = params => { return axios.get(`${base}admin/txkjAccountFeeListByPage.json`, { params: params }); };
export const getNoRechargeList = params => { return axios.get(`${base}admin/noRechargeListByPage.json`, { params: params }); };
export const editRecharge = params => { return axios.get(`${base}admin/txkjAccountFeeEdit.json`, { params: params }); };



//合作商
export const getPartnerList = params => { return axios.get(`${base}admin/partnerHdListByPage.json`, { params: params }); };
export const getApplyList = params => { return axios.get(`${base}admin/partnerSupplierListByPage.json`, { params: params }); };
export const getUseStatus = params => { return axios.get(`${base}admin/partnerVerify.json`, { params: params }); };
export const getUseRefStatus = params => { return axios.get(`${base}admin/partnerVerify.json`, { params: params }); };
//合作商管理添加
export const addGetIndustry = params => { return axios.get(`${base}admin/industryNameList.json`, { params: params }); };
//省
export const addProvincesName = params => { return axios.get(`${base}admin/provinceList.json`, { params: params }); };
//form提交
export const getAddPartner = params => { return axios.get(`${base}admin/partnerAdd.json`, { params: params }); };
export const editPartner = params => { return axios.get(`${base}admin/partnerHdEdit.json`, { params: params }); };
export const getAgreeMassage = params => { return axios.get(`${base}admin/partnerVerifyDetails.json`, { params: params }); };
export const getRefMassage = params => { return axios.get(`${base}admin/partnerVerifyDetails.json`, { params: params }); };


//渠道商管理
export const getIndustry = params => { return axios.get(`${base}admin/industryNameList.json`, { params: params }); };
export const getLevel = params => { return axios.get(`${base}admin/accountLevelList.json`, { params: params }); };
export const getAccountList = params => { return axios.get(`${base}admin/txkjSupplierListByPage.json`, { params: params }); };
export const addSuppliers = params => { return axios.get(`${base}admin/txkjSupplierAdd.json`, { params: params }); };
export const editSuppliers = params => { return axios.get(`${base}admin/txkjSupplierEdit.json`, { params: params }); };

//渠道商管理2.账户级别维护
export const getLevelMat= params => { return axios.get(`${base}admin/sysSupplierAccountLevelListByPage.json`, { params: params }); };
export const addLevelMat = params => { return axios.get(`${base}admin/sysSupplierAccountLevelAdd.json`, { params: params }); };
export const editLevelMat = params => { return axios.get(`${base}admin/sysSupplierAccountLevelEdit.json`, { params: params }); };

//渠道商管理3.分类维护
export const getCategoryMat= params => { return axios.get(`${base}admin/sysIndustryListByPage.json`, { params: params }); };
export const addCategoryMat = params => { return axios.get(`${base}admin/industryCategoryAdd.json`, { params: params }); };
export const editCategoryMat = params => { return axios.get(`${base}admin/industryEdit.json`, { params: params }); };

