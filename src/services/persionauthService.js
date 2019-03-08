import config from '@/assets/configs/config'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/zjzx-auth/persionauth';

export default {
	/**
	 * 个人认证
	 * @param  {[type]} token  [令牌]
	 * @param  {[type]} userid [用户id]
	 * @param  {[type]} 
	 * record {
				realname:'',
				idcard:'',
				industry:'',
				cardimageup:'',
				cardimagedn:''
			}
	 * @return {[type]}        [description]
	 */
	submitAuth(token,userid,record){
		let params = {
			token,
			userid,
			record
		};
		let resMap = commonUtil.ajaxAsync(controller+'/submitAuth',params);
		return resMap;
	}
}
