var authUtil = {};

/**
 * 
 * @param {Object} type
 * 
 * 授权登录
 */
var auths={};

/**
 * 初始化
 */
authUtil.init = function(){
	plus.oauth.getServices(function(services){
		for(var i in services){
			var service=services[i];
			auths[service.id]=service;
			// console.log(service.id);
		}
			
	},function(e){
		console.log("获取登录认证失败："+e.message);
	});
}


/**
 * 授权登录 微信登录
 */
authUtil.loginByWx = function(call){
	
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['weixin'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			// console.log("登录认证成功：");
			// console.log(JSON.stringify(auth.authResult));
			// {"openid":"oRrdQt6Rx5HoGnbKAgG_Wpl0zK44","scope":"snsapi_userinfo","refresh_token":"15_7154LP5HATQGV6dpH6oHLUxicB2hFNwXXMOPYhQgdzZRTjjHakfhejh9n5hQRX8KMGW7RfMfCwdP8aXaQm12f6YvIODe7LE2ZTKs8PMvoyY","code":"033DTL4d1x8dwt0xFw3d1s6B4d1DTL4N","unionid":"oU5YytwqdJBWqmL6dNXsjsYAS_MM","access_token":"15_6EC6T6cX3m0cAJA-FO2OJLvmwdfHoayP9KnOFi5p3mBTGsaauxe5sr5i3i_koQhKkpGRBJqQ8TIKmvlgFpLVG0mVb-lZxuqcJAOHjpDTRSI","expires_in":7200}
			
			// console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				// console.log("获取用户信息成功：");
				// console.log(JSON.stringify(auth.userInfo));
				// {"openid":"oRrdQt6Rx5HoGnbKAgG_Wpl0zK44","city":"Chizhou","country":"China","nickname":"董春林","privilege":[],"language":"zh_CN","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/KRO0TRAmL5XvPXia9icPstUkNKMlHSYOdhiahX5UBbNuibOhZGcxZcsRxmQtAAqFX2nLL5cwyc4fkLVJnKibiaN1qzJg/132","unionid":"oU5YytwqdJBWqmL6dNXsjsYAS_MM","sex":1,"province":"Anhui"}
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var wx_user = {};
			
				if(userInfo.sex == 1){
					wx_user.sex = "男";
				}else if(userInfo.sex == 2){
					wx_user.sex = "女";
				}
				
				
				wx_user.wx_openid = userInfo.openid;
				wx_user.wx_nikname = userInfo.nickname;
				wx_user.wx_image = userInfo.headimgurl;
				wx_user.wx_unionid = userInfo.unionid;
				resMap.status = "success";
				result.wx_user = wx_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				// console.log("获取用户信息失败：");
				// console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			// console.log("登录认证失败：");
			// console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
	
	
}

/**
 * QQ 授权登录
 * @param {Object} call
 */
authUtil.loginByQQ = function(call){
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['qq'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			// console.log("登录认证成功：");
			// console.log(JSON.stringify(auth.authResult));
			// {"scope":"snsapi_userinfo","expires_in":7776000,"access_token":"129D8F3FEA728C2607E3D2FB104B0A72","openid":"F6DC81D7DEA4AA7AC94A2C6E57F96C09"}
			
			// console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				// console.log("获取用户信息成功：");
				// console.log(JSON.stringify(auth.userInfo));
				// {"figureurl":"http://qzapp.qlogo.cn/qzapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/30","province":"安徽","openid":"F6DC81D7DEA4AA7AC94A2C6E57F96C09","figureurl_qq_1":"http://thirdqq.qlogo.cn/qqapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/40","nickname":"被博士","yellow_vip_level":"0","constellation":"","city":"池州","year":"1968","figureurl_1":"http://qzapp.qlogo.cn/qzapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/50","figureurl_2":"http://qzapp.qlogo.cn/qzapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/100","gender":"男","level":"0","is_yellow_year_vip":"0","headimgurl":"http://qzapp.qlogo.cn/qzapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/30","is_lost":0,"ret":0,"vip":"0","figureurl_qq_2":"http://thirdqq.qlogo.cn/qqapp/1104455702/F6DC81D7DEA4AA7AC94A2C6E57F96C09/100","msg":"","is_yellow_vip":"0"}
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var qq_user = {};
				qq_user.qq_openid = auth.authResult.openid;
				qq_user.qq_nikname = userInfo.nickname;
				qq_user.qq_image = userInfo.headimgurl;
				qq_user.sex = userInfo.gender;
				resMap.status = "success";
				result.qq_user = qq_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				// console.log("获取用户信息失败：");
				// console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			// console.log("登录认证失败：");
			// console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
}


authUtil.loginByXl = function(call){
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['sinaweibo'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			// console.log("登录认证成功：");
			// console.log(JSON.stringify(auth.authResult));
			// {"uid":"6311798622","expires_in":2627705,"access_token":"2.00aJfJtGnpUszDa832cf3ba9PYTnoB"}			
			// console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				// console.log("获取用户信息成功：");
				// console.log(JSON.stringify(auth.userInfo));
				// {"id":6311798622,"bi_followers_count":0,"urank":1,"profile_image_url":"http://tvax3.sinaimg.cn/default/images/default_avatar_male_50.gif","class":1,"like":false,"province":"100","video_status_count":0,"verified":false,"url":"","statuses_count":0,"geo_enabled":true,"follow_me":false,"description":"","headimgurl":"http://tvax3.sinaimg.cn/default/images/default_avatar_male_50.gif","followers_count":1,"location":"其他","mbrank":0,"avatar_large":"http://tvax3.sinaimg.cn/default/images/default_avatar_male_180.gif","star":0,"verified_trade":"","profile_url":"u/6311798622","weihao":"","online_status":0,"screen_name":"用户6311798622","verified_source_url":"","pagefriends_count":0,"name":"用户6311798622","verified_reason":"","friends_count":2,"insecurity":{"sexual_content":false},"vclub_member":0,"mbtype":0,"block_app":0,"story_read_state":-1,"avatar_hd":"http://tvax3.sinaimg.cn/default/images/default_avatar_male_180.gif","credit_score":80,"remark":"","created_at":"Mon Jul 10 13:10:46 +0800 2017","block_word":0,"allow_all_act_msg":false,"domain":"","like_me":false,"allow_all_comment":true,"nickname":"用户6311798622","verified_reason_url":"","gender":"m","favourites_count":0,"idstr":"6311798622","verified_type":-1,"city":"1000","verified_source":"","user_ability":0,"lang":"zh-cn","ptype":0,"following":false}
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var xl_user = {};
				
				if(userInfo.gender == 'm'){
					xl_user.sex = "男";
				}else if(userInfo.gender == 'f'){
					xl_user.sex = "女";
				}
				
				
				xl_user.xl_openid = auth.authResult.openid;
				xl_user.xl_nikname = userInfo.nickname;
				xl_user.xl_image = userInfo.headimgurl;
				resMap.status = "success";
				result.xl_user = xl_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				// console.log("获取用户信息失败：");
				// console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			// console.log("登录认证失败：");
			// console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
}


export default authUtil