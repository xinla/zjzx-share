import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-area/city';
const service ={}

service.getCityByProvince = function(provinceid) {
	
	var params = {
		provinceid:provinceid
	};

	var resMap =	commonUtil.ajaxAsync(controller+'/getCityByProvince',params);
//	$.post
	///call(resMap);
	// $.post(controller+'/getUserById',params,function(data){
	// 	debugger;
	// 	call(data);
	// });

	return resMap;
}




export default service

