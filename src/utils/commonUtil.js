import $ from 'jquery'
const util ={}

util.ajaxAsync = function(url,params){
	let res = {};
	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: params,
		async:false,
		success:function(data){
			res = data;
		}
	})
	
	return res;

}
util.ajax = function(url,params,call){
	$.post(url,params,function(data){
		if (call) {
			call(data);		
		}
	},"json");

}
export default util


