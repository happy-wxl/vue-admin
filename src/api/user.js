//
import { Get, Post } from "./request.js";
/**
 * 用户登陆
 * @param {*} params
 */
async function Login (params) {
  return await Post({
    url: "/user/login",
    data: params.data
  });
}
/**
 * 普通用户
 * @param {*} params
 */
async function userList (params) {
  return await Post({
    url: "/user/getList",
    data: params.data
  });
}
/**
 * 普通用户状态
 * @param {*} params
 */
async function updateStatus (params) {
  return await Post({
    url: "/user/updateStatus",
    data: params.data
  });
}
/**
 * 普通用户详情
 * @param {*} params
 */
async function getDetail (params) {
  return await Post({
    url: "/user/getDetail",
    data: params.data
  });
}
/**
 * 用户统计
 * @param {*} params
 */
async function countUsers (params) {
  return await Post({
    url: "/user/countUsers",
    data: params.data
  });
}
/**
 * 批量设置公司
 * @param {*} params
 */
async function updateCompany (params) {
  return await Post({
    url: "/user/updateCompany",
    data: params.data
  });
}
/**
 * 绑定超级推广员
 * @param {*} params
 */
async function updatePromoter (params) {
  return await Post({
    url: "/user/updatePromoter",
    data: params.data
  });
}
/**
 * 超级推广员统计
 * @param {*} params
 */
async function countPromoters (params) {
  return await Post({
    url: "/user/countPromoters",
    data: params.data
  });
}
/**
 * 活动列表统计
 * @param {*} params
 */
async function activityList (params) {
  return await Post({
    url: "/activity/getList",
    data: params.data
  });
}
/**
 * 赞助商列表
 * @param {*} params
 */
async function getSponsorList (params) {
  return await Post({
    url: "/activity/getSponsorList",
    data: params.data
  });
}
/**
 * 赞助商置顶
 * @param {*} params
 */
async function updateConfigStatus (params) {
  return await Post({
    url: "/activity/updateConfigStatus",
    data: params.data
  });
}
/**
 * 启用或者禁用赞助商
 * @param {*} params
 */
async function updateSponsorStatus (params) {
  return await Post({
    url: "/activity/updateSponsorStatus",
    data: params.data
  });
}
/**
 * 新增活动配置
 * @param {*} params
 */
async function addConfig (params) {
  return await Post({
    url: "/activity/addConfig",
    data: params.data
  });
}
/**
 * 活动详情
 * @param {*} params
 */
async function getConfigDetail (params) {
  return await Post({
    url: "/activity/getConfigDetail",
    data: params.data
  });
}
/**
 * 新增广告
 * @param {*} params
 */
async function addSponsor (params) {
  return await Post({
    url: "/activity/addSponsor",
    data: params.data
  });
}
/**
 * 修改广告
 * @param {*} params
 */
async function updateSponsor (params) {
  return await Post({
    url: "/activity/updateSponsor",
    data: params.data
  });
}
/**
 * 红包列表
 * @param {*} params
 */
async function getRedpackDetail (params) {
  return await Post({
    url: "/activity/getRedpackDetail",
    data: params.data
  });
}
/**
 * 新增红包
 * @param {*} params
 */
async function addRedpack (params) {
  return await Post({
    url: "/activity/addRedpack",
    data: params.data
  });
}
/**
 * 编辑红包
 * @param {*} params
 */
async function updateRedpack (params) {
  return await Post({
    url: "/activity/updateRedpack",
    data: params.data
  });
}
/**
 * 编辑红包
 * @param {*} params
 */
async function removeRedpack (params) {
  return await Post({
    url: "/activity/removeRedpack",
    data: params.data
  });
}
/**
 * 提现列表
 * @param {*} params
 */
async function userWithdraw (params) {
  return await Post({
    url: "/userWithdraw/getList",
    data: params.data
  });
}
/**
 * 提现详情
 * @param {*} params
 */
async function userWithdrawDetail (params) {
  return await Post({
    url: "/userWithdraw/getDetail",
    data: params.data
  });
}
/**
 * 提现审批
 * @param {*} params
 */
async function WithdrawupdateStatus (params) {
  return await Post({
    url: "/userWithdraw/updateStatus",
    data: params.data
  });
}
/**
 * 提现审批
 * @param {*} params
 */
async function stickSponsor (params) {
  return await Post({
    url: "/activity/stickSponsor",
    data: params.data
  });
}
/**
 * 消息列表
 * @param {*} params
 */
async function noticeConfig (params) {
  return await Post({
    url: "/noticeConfig/getList",
    data: params.data
  });
}
/**
 * 消息禁用启用
 * @param {*} params
 */
async function noticeConfigStatus (params) {
  return await Post({
    url: "/noticeConfig/updateStatus",
    data: params.data
  });
}
/**
 * 新增消息
 * @param {*} params
 */
async function addNotice (params) {
  return await Post({
    url: "/noticeConfig/addNotice",
    data: params.data
  });
}
/**
 * 新增消息
 * @param {*} params
 */
async function updateNotice (params) {
  return await Post({
    url: "/noticeConfig/updateNotice",
    data: params.data
  });
}
/**
 * 新增消息
 * @param {*} params
 */
async function getAll (params) {
  return await Post({
    url: "/location/getAll",
    data: params.data
  });
}
/**
 * 新增消息
 * @param {*} params
 */
async function getProList (params) {
  return await Post({
    url: "/user/getProList",
    data: params.data
  });
}
/**
 * 红包图片列表
 * @param {*} params
 */
async function getRedpack (params) {
  return await Post({
    url: "/activity/getRedpack",
    data: params.data
  });
}
/**
 * 红包图片列表
 * @param {*} params
 */
async function countRedpack (params) {
  return await Post({
    url: "/redpack/countRedpack",
    data: params.data
  });
}
/**
 * 红包管理红包列表
 * @param {*} params
 */
async function redpack (params) {
  return await Post({
    url: "/redpack/getList",
    data: params.data
  });
}
/**
 * 红包管理红包启用禁用
 * @param {*} params
 */
async function isDisable (params) {
  return await Post({
    url: "/redpack/isDisable",
    data: params.data
  });
}
/**
 * 红包管理红包详情
 * @param {*} params
 */
async function redpackDetail (params) {
  return await Post({
    url: "/redpack/getDetail",
    data: params.data
  });
}


export {
  Login,
  userList,
  updateStatus,
  getDetail,
  countUsers,
  updateCompany,
  updatePromoter,
  countPromoters,
  activityList,
  getSponsorList,
  updateConfigStatus,
  updateSponsorStatus,
  addConfig,
  getConfigDetail,
  addSponsor,
  updateSponsor,
  getRedpackDetail,
  addRedpack,
  updateRedpack,
  removeRedpack,
  userWithdraw,
  userWithdrawDetail,
  WithdrawupdateStatus,
  stickSponsor,
  noticeConfig,
  noticeConfigStatus,
  addNotice,
  updateNotice,
  getAll,
  getProList,
  getRedpack,
  countRedpack,
  redpack,
  isDisable,
  redpackDetail
};
