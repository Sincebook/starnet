export {
  getSignBg,
  getCode,
  registerUser,
  loginUser,
  wxLogin,
  wbLogin,
  getMyinfo
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
  findByOneType
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
  findByThree,
  findByName,
  findHotTalent,
  getUserBg,
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
  report
}
from './personalCenter';
export {
  findHotJobs,
  findHotTalents,
  findHotCompanys,
  getbanner
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
  offerUser
}
from './corporateCenter.js';
