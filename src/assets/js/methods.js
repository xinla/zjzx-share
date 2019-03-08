import config from '@/assets/configs/config'
const tool = {
  //前往某一个页面
  goPage(p) {
    if(!p.name && !p.path){p.name="home";p.query = p.query || {}};
    if(p.replace) {
      GoTruth.$router.replace({ name: p.name, query: p.query} )
    } else {
      GoTruth.$router.push({ name: p.name, query: p.query })
    }
  },
  //返回上个页面
  goBack(n) {
    if(n && typeof n === 'number'){
      GoTruth.$router.go(n)
    }else{
      GoTruth.$router.back();
    }
  },
  //手机号识别并返回
  isPhoneNumber(num) {
    if (!num) { return false };
    let str = num.toString();
    let val = str.replace(/[^0-9]/ig, "");
    if (val.length !== 11) { return false };
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/;
    if (!myreg.test(val)) { return false } else { return val }
  },
  //输入区内容合法验证
  checkInput(val){
    if (!val) {return false;}
    val = String(val);
    var reg = /[(script|href|on|iframe|frameset)]/gi;
    return !reg.test(val); //合法返回true
  },
  // 非法字符替换
  replaceNo(val){
    var reg = /[(script|href|on|iframe|frameset)]/gi;
    return String(val).replace(reg,""); //返回替换后合法的字串
  },
  /**
  * 发布时间格式化
  * @dateString:"2018-1-6 15:25:42"
  */
  publishTimeFormat(dateString){
    if (typeof dateString !== "string") {return;}
    let pubDate = new Date(dateString.replace(/-/g,'/')),
        curDate = new Date(),
        pubMillis = +pubDate,
        pubYear = pubDate.getFullYear(),
        curMillis = +curDate,
        curYear = curDate.getFullYear(),
        difference = curMillis - pubMillis;
    if (difference < 4.32e+7) { //12小时内
      if (difference < 3.6e+6) { //60分钟内
        if (difference < 60000) { //60秒内
          dateString = "刚刚";
        } else {
          dateString = Math.floor(difference/60000) + "分钟前";          
        }
      } else {
        dateString = Math.floor(difference/3600000) + "小时前";
      }
    }else if (pubYear == curYear) {
      dateString = dateString.substr(5);
    }
    return dateString;
  },
  //图片格式判断
  checkPic(str){
    if ( typeof str !== "string" ) {return;}
    let reg = /\.(jpg|png|jpeg|gif)$/i;
    return reg.test(str);
  },
  //视频格式判断
  checkVideo(str){
    if ( typeof str !== "string" ) {return;}
    let reg = /\.(mp4)$/i;
    return reg.test(str);
  },
  /**提取图片
  * @str 图文内容
  * @num 图片最大数量
  */
  extractImg(str,num = 3){
    if ( typeof str !== "string" ) {return;}
    let reg = /<img[^(img)]*src=[\'\"]?([^\'\"]*)[\'\"]?/gi,
        arr = str.match(reg),
        srcList = [];
    if (arr && arr.length) {
      if (arr.length > num) {arr.length = num;}
      arr.forEach((item,index)=>{
        srcList.push(item.replace(/<img.*src=[\'\"]|[\'\"]/ig,""));
      })
    }
    return srcList;     
  },
  /**
   * 头像URL过滤处理
   * @param  {[string]} url [description]
   * @return {[string]}     [处理后的URL]
   */
  headerImgFilter(url){
    let reg = /^http/i;
    if (!reg.test(url)) {
      url = url ? config.fileRoot + '/' + url : require('../images/user_head.jpg');
    }
    return url;
  },
  // 未登录提示 
  loginPrompt(back){
    GoTruth.$vux.confirm.show({
      content:"您还没登录哦！",
      onConfirm () {
        GoTruth.$Tool.goPage({name:'login',query:{title:'用户登录'}});
      },
      onCancel () {
        if (back) {
          GoTruth.$Tool.goBack();
        }
      }
    })
  },
  /**
   * 大数字转换为K/W简写
   * @param  Number num [description]
   * @return String/Number    [description]
   */
  numConvertText(num){
    if (typeof num !== "number") {return;}
    if (num >= 1000) {
      if (num >= 10000) {
        return (num/10000).toFixed(1) + 'k';
      }
      return (num/1000).toFixed(1) + 'w';
    }
    return num;
  }
}

export default {
  install(Vue) {
    Vue.prototype.$Tool = tool;
  }
}
