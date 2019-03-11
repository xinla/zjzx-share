import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-article/interlocution';
const service ={}

const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');
// 发布问题（讨论）
service.publishQuestion = function(record,images) {

	let params = {
		userid,
		title:record.title,//:"标题",
		description:record.content,//:"描述"
		images,//:"图片地址集合"  格式：url，url2,..........
		classify:record.classify//:"文章分类"
	};

	let res = commonUtil.ajaxAsync(controller+'/publishQuestion',params);
	return res;
}
// 问题列表
service.getQuestionPage = function(page,size,classify,userid){
	let params = {
		page,//:"当前页",
		size,//:"分页大小"
		classify,
		userid,//:"用户id"
	};
	let resMap = commonUtil.ajaxAsync(controller+'/getQuestionPage',params);
	return resMap;
};

// 获取问题详情
service.getQuestionById = function(itemid){
	let params = {
		itemid:parseInt(itemid),
	};

	let res = commonUtil.ajaxAsync(controller+'/getQuestionById',params);

	return res;
};

// 获取回答
service.getAnswers = function (page,size,parentid) {
	let params = {page, size, parentid};
	let resData = commonUtil.ajaxAsync(controller+'/getAnswers',params);
	return resData;
};

// 删除问答
service.deleteQuestion = function(id){
	let params = {
		userid,
		token,
		"ids[]":[id]
	};
	let resDelete = commonUtil.ajaxAsync(controller+'/deleteQuestion',params);

	return resDelete;
};

//获取回答数量
service.getAnswerCount = function(wdid, call) {
	let params ={wdid};
	commonUtil.ajax(controller+'/getAnswerCount',params,call);
};

// 获取用户发布问题数量
service.getUserQuestionCount = function (userid, call) {
	let params = {userid};
	commonUtil.ajax(controller+'/getUserQuestionCount',params,call);
};
export default service
