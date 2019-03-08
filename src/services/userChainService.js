import config from '@/assets/configs/config'
// import axios from 'axios'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-user/userchain';
const service ={}

// 添加用户链
service.addUserChain = function(code,userid){
	let params = {
		code,//:"邀请码",
		userid,//:"注册用户id"
	}
	let resMap = commonUtil.ajaxAsync(controller+'/addUserChain',params);

	return resMap;
}

export default service
