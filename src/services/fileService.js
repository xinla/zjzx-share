import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.fileServer+'/file';
const service ={}

 // let fileConfig = {
 //    headers:{'Content-Type':'multipart/form-data'}
 //  }; 

service.uploadHeadImage = function(params,call){
	ajaxFile(controller+'/uploadHeadImage',params,call);
}

service.uploadPic = function(params,call){
	ajaxFile(controller+'/uploadPic',params,call);
}
service.uploadVideo = function(params,call){
	ajaxFile(controller+'/uploadVideo',params,call);

	// axios.post(controller+'/uploadVideo',params,fileConfig).then(function(res){
	// 	call(res.data)
	// })
}

function ajaxFile (url,params,call) {
	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: params,
		async:true,
		processData:false,
		contentType:false,
		success:function(res){
			call(res);
		}
	})
}
export default service

