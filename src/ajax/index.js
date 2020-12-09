export {
  getSignBg,
  getCode,
  registerUser,
  loginUser,
  wxLogin
}
from './sign.js';
export {
  bindPhone,
  getBindCode
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
  findComByName
}
from './company.js';
export {
  findHotJob,
  findJobByName,
  findJobUptime,
  findJobByThree
}
from './job';
export {
  findByTalentNew,
  findByThree,
  findByName,
  findHotTalent
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
  findHotTalents
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
