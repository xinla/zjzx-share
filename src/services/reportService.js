import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-system/report';
const service ={}

const token = localStorage.getItem('token');
const userid =  localStorage.getItem('id');

service.doReport = function(record){
	var params = {
		token,//:"令牌",
		userid,//:"用户id",
		record:JSON.stringify(record),
		// record:{
		// 	itemid:"对象id",
		// 	reportuserid:"被举报人id",
		// 	reportreasion:"举报原因"，
		// 	reporttime:"举报时间" ,
		// 	type:"类型"  1.文章举报  
		// }
	};

	var resDoReport = commonUtil.ajaxAsync(controller+'/doReport',params);

	return resDoReport;
}

export default service;