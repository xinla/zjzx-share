import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-article/readhistory';
const service ={}

let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');

service.addReadHistory = function(articleid,call){
	var params = {
		token,//:config.token,//:"令牌"
		userid,//:config.userid,//:"用户id",
		articleid,//:"文章id",
	};

	commonUtil.ajax(controller+'/addReadHistory',params,call);

}

service.getReadHistory = function(page,size,call){
	var params = {
		token,//:config.token,//:"令牌"
		userid,//:config.userid,//:"用户id",
		page,//:"当前页",
		size,//:"分页大小"
	};
	if (call) {
		commonUtil.ajax(controller+'/getReadHistory',params,call);	
	}

	let res = commonUtil.ajaxAsync(controller+'/getReadHistory',params);

	return res;

}

service.clearHistory = function(ids,call){
	var params = {
		token,//:config.token,//:"令牌"
		userid,//:config.userid,//:"用户id",
		'ids[]':ids,//[]:"阅读记录id数组"
	};

	var resDelete = commonUtil.ajaxAsync(controller+'/clearHistory',params);

	return resDelete;

};
service.getReadCount = function(articleid,call){
    var params = {
        articleid,
    };

    commonUtil.ajax(controller+'/getReadCount',params,call);

}

export default service

