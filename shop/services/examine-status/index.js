const otDeptModal = require('../../models/ot-dept');
// '0:未审核 1:部门审核 2:项目审核 3:CTO审核',
const ExamineStatus = {
  'status0': { status: 0, to: 1, name: '未审核', reject: 11 }, // 未审核状态
  'status1': { status: 1, to: 3, name: '二级部门已审核', grade: 2, reject: 31 }, // 部门已审核 grade 二级部门
  'status11': { status: 11, to: 1, name: '二级部门拒绝', grade: 2 }, // 部门拒绝审核
  'status2': { status: 2, to: 3, name: '项目已审核' }, // 项目已审核
  'status21': { status: 21, name: '项目拒绝' }, // 项目拒绝审核
  'status3': { status: 3, to: '4', name: '一级部门已审核', grade: 1 }, // CTO审核 grade一级部门
  'status31': { status: 31, to: 3, name: '一级部门拒绝', grade: 1 }, // CTO拒绝审核
  'status4': { status: 4, name: '完成' }
};

ExamineStatus.getCurChecker = async (deptId) => {
  let dept = await otDeptModal.findOne({
    attributes: ['name', 'checker'],
    where: {
      id: deptId
    }
  }).catch(e => {
    throw e;
  });
  return dept;
};

// 根据等级查询部门审核者
ExamineStatus.getChecker = async (deptId, grade) => {
  let dept = await otDeptModal.findOne({
    attributes: ['name', 'parent', 'checker'],
    where: {
      id: deptId
    }
  }).catch(e => {
    throw e;
  });

  let parentDept = await otDeptModal.findOne({
    attributes: ['name', 'checker'],
    where: {
      id: dept.parent
    }
  }).catch(e => {
    throw e;
  });
  // 如果是一级部门审核则显示找到下一级的审核者
  if (grade === 1) {
    parentDept.dataValues.nextChecker = 'none';
    return parentDept;
  } else if (grade === 2) {
    dept.dataValues.nextChecker = parentDept.dataValues.checker;
    return dept;
  }

  return null;
};

// 改变状态
ExamineStatus.changeStatus = async (deptId, status) => {
  let statusObject = ExamineStatus['status' + status];
  if (statusObject) {
    let toStatus = ExamineStatus['status' + statusObject.to];
    if (!toStatus) {
      return null;
    }
    let checkerDept = await ExamineStatus.getChecker(deptId, toStatus.grade);
    toStatus.checker = checkerDept.dataValues.checker;
    toStatus.nextChecker = checkerDept.dataValues.nextChecker;
    return toStatus;
  }
  return null;
};

// 改变拒绝状态 isChangeOwn 是否改变初衷
ExamineStatus.rejectStatus = async (deptId, status, isChangeOwn) => {
  let statusObject = ExamineStatus['status' + status];
  if (statusObject) {
    let rejectStatus = null;
    if (isChangeOwn) {
      rejectStatus = ExamineStatus['status' + statusObject.status + '1'];
    } else {
      rejectStatus = ExamineStatus['status' + statusObject.reject];
    }

    let checkDept = await ExamineStatus.getCurChecker(deptId);
    rejectStatus.checker = checkDept.dataValues.checker;
    rejectStatus.nextChecker = '';
    return rejectStatus;
  }
  return null;
};

module.exports = ExamineStatus;
