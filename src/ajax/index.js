export {
  getSignBg,
  getCode,
  registerUser,
  loginUser,
  passwordUser,
  wxLogin,
  wbLogin,
  emailLogin,
  getMyinfo,
  changePassword
}
from './sign.js';
export {
  bindPhone,
  getBindCode,
  bindWbPhone,
  getBindWbCode,
  getOutLogin
}
from './bind.js';
export {
  findHotCompany,
  findByUptime,
  findByCategory,
  findByTwo,
  getComInfoById,
  getComVideoByUserId,
  getComPhotosByUserId,
  getComGradeByUserId,
  showFunsNumsByUserId,
  sendMessageToId,
  fingComInfo,
  findComByName,
  getBackGroundImgs,
  findByOneType,
  findCompanyJob
}
from './company.js';
export {
  findHotJob,
  findJobByName,
  findJobUptime,
  findJobByThree,
  findJobByType
}
from './job';
export {
  findByTalentNew,
  findByFour,
  findByName,
  findHotTalent,
  findByVocation
}
from './talent';
export {
  userinfoById,
  noWatch,
  watchIt,
  addMsg,
  getFuns,
  getUserImg,
  getUserWork,
  getAllMomes,
  addMemos
}
from './talentDetail';

export {
  mineInfo,
  extraInfo,
  addEmail,
  celebrity,
  mineInfoDetail,
  extraInfoDetail,
  extraInfoDetail1,
  mineMessage,
  mineOpus,
  addOpus,
  deleteOpus,
  mineDeliver,
  cancelDeliver,
  replayMessage,
  deteleMessage,
  mineCollect,
  cancelCollect,
  mineFollow,
  cancelFollow,
  report,
  getWorkInfo,
  deleteWorkInfo,
  addWorkInfo,
  mineNotice,
  deleteNotice,
  isNews,
  addOpusCover
}
from './personalCenter';
export {
  findHotJobs,
  findHotTalents,
  findHotCompanys,
  getbanner,
  jobNews
}
from './home';
export {
  getJobById,
  getUserNH,
  isFun,
  getAllRoles,
  applyJob,
  isApply,
  starJob,
  isStar,
  noStarJob
}
from './jobDetail';
export {
  companyInfo,
  addGrade,
  getGrade,
  deleteGrade,
  celebrityCompany,
  companyJob,
  deleteJob,
  getJobType,
  addJob,
  addCompanyVideo,
  CompanyVideo,
  deleteCompanyVideo,
  editJob,
  getAllRole,
  addRole,
  deleteRole,
  findAllDeliver,
  viewCv,
  refuseUser,
  intentionUser,
  offerUser,
  getCompanyType,
  addCompanyCoverVideo,
  comNotice,
  deletecomNotice,
  iscomNews,
  modifyCompanyinfo,
  changePasswordBycode
}
from './corporateCenter.js';
