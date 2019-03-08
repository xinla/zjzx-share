import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-article/article_file';
const service ={}

// 根据文章id获取附件信息
service.getFileByArticle = function(articleid,call){
	let params = {
		articleid,
	}
	if (call) {
		commonUtil.ajax(controller+'/getFileByArticle',params,call);
		return;
	}
	let resArticleFile = commonUtil.ajaxAsync(controller+'/getFileByArticle',params);

	return resArticleFile;
}

export default service
