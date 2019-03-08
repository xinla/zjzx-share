import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-area/map';
const service ={}

service.getPoiList = function(page_num,latitude,longitude,call){
	let params = {
		page_num,
		latitude,
		longitude,
	};
	commonUtil.ajax(controller+'/getPoiList',params,call);

	// axios.get(controller+'/getPoiList',{params:{
	// 	page_num:page_num,
	// 	latitude:latitude,
	// 	longitude:longitude
	// }}).then(function(res){
	// 	call(res.data);
	// })

}
service.getPoiListByKeyword = function(page_num,latitude,longitude,keywords,call){
	let params = {
		page_num,
		latitude,
		longitude,
		key:keywords
	};
	commonUtil.ajax(controller+'/getPoiList',params,call);

}
export default service

