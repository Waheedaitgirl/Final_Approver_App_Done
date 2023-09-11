import request from './request';

// post requests with data
export function approverLogin(data){
    return request({
        url: 'candidatemobilelogin',
        method: 'post',
        data,
    });
}

 


export function getTimeSheetExpensesListByApprooverID(approver_id, approver_type, account_id){
    return request({
        url:`approver?approver_id=${approver_id}&approver_type=${approver_type}&account_id=${account_id}`,
        method:"GET"
    })
}

export function getUnApprovedTimeSheetExpensesListByApprooverID(approver_id, approver_type, account_id,module_status_id){ 
    return request({
        url:`approver?approver_id=${approver_id}&approver_type=${approver_type}&account_id=${account_id}&modules_status_id=${module_status_id}&status=unapproved`,
        method:"GET"
    })
}

export function timeSheetDetailsById(timesheet_id,account_id){
    return request({
        url: `timesheet?account_id=${account_id}&time_sheet_id=${timesheet_id}&type=timesheet_details`,
        method: 'get',
    });
}

export function getExpensesDetails(account_id,expense_id){
    return request({
        url: `expenses?account_id=${account_id}&expense_id=${expense_id}&type=expenses_details`,
        method: 'get'
    });
}


export function AcceptOrRejectTimeSheetOrExpenses(account_id,approver_id,approver_type,expense_id, modules_status_id ){
    return request({
        url:`approver?account_id=${account_id}&status=approve_reject&approver_id=${approver_id}&approver_type=${approver_type}&expense_id=${expense_id}&modules_status_id=${modules_status_id}`,
        method:"get"
    })
}

export function getStatusList(id){
    return request({
        url: `approver?account_id=${id}&status=status_list`,
        method: 'get',
    });
}

export function getAllLeavesList(approver_id,account_id,approver_type,user_type,placement_approver_module_id, placement_approver_module_pk_id){
    
    console.log( `approver?approver_id=${approver_id}&status=all_leaves&account_id=${account_id}&approver_type=${approver_type}&user_type=${user_type}&placement_approver_module_id=${placement_approver_module_id}&placement_approver_module_pk_id=${placement_approver_module_pk_id}`);
    
    return request({
        url: `approver?approver_id=${approver_id}&status=all_leaves&account_id=${account_id}&approver_type=${approver_type}&user_type=${user_type}&placement_approver_module_id=${placement_approver_module_id}&placement_approver_module_pk_id=${placement_approver_module_pk_id}`,
        method: 'get',
    });
}

export function getUnapprovedLeavesList(approver_id,account_id,approver_type,user_type,placement_approver_module_id, placement_approver_module_pk_id){
     console.log(`approver?approver_id=${approver_id}&status=all_unapproved_leaves&account_id=${account_id}&approver_type=${approver_type}&user_type=${user_type}&placement_approver_module_id=${placement_approver_module_id}&placement_approver_module_pk_id=${placement_approver_module_pk_id}`);
    return request({
        url: `approver?approver_id=${approver_id}&status=all_unapproved_leaves&account_id=${account_id}&approver_type=${approver_type}&user_type=${user_type}&placement_approver_module_id=${placement_approver_module_id}&placement_approver_module_pk_id=${placement_approver_module_pk_id}`,
        method: 'get',
    });
}

export function AcceptorRejectLeaves(candidate_id,account_id,status,leaves_id){
    // console.log(`leaves?candidate_id=${candidate_id}&type=accept_reject&account_id=${account_id}&status=${status}&leaves_id=${leaves_id}`);
    return request({
        url: `leaves?candidate_id=${candidate_id}&type=accept_reject&account_id=${account_id}&status=${status}&leaves_id=${leaves_id}`,
        method: 'get',
    });
}