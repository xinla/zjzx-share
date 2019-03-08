import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-system/version';
const service ={}

// 版本比较
service.compareVersion = function(historyVersion,call){
	let params = {
		historyVersion,//n:"比较的版本",
	}
	if (call) {
		commonUtil.ajax(controller+'/compareVersion',params,call);
		return;
	}
	let resMap = commonUtil.ajaxAsync(controller+'/compareVersion',params);

	return resMap;
}

export default service
