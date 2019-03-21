<template>
    <section class="content-wrap">
    	<a :href="downloadLink">
			<h1 class="article-title">{{ article.title }}</h1>
			<div class="publisher bfc-o clearfix">
					<img :src="$Tool.headerImgFilter(artUser.imageurl)" alt="" class="uphoto uphoto-big fl">
					<div class="article-time-name fl">
						<div class="uname">
							{{ artUser.username}}
						</div>
						<div class="ts utime">
							<time v-text="$Tool.publishTimeFormat(article.publishtime)"></time>
							<!-- <span>{{ commentNum }}评论</span> -->
						</div>
					</div>
				<button type="button" class="focus bfc-p fr">关注</button>
			</div>
		</a>
			<div class="content">
				<div class="article-content">
	            <p v-html="article.content"></p>
	          </div>
				<div class="phone-content clearfix">
					<div v-if="1 === article.type" class="phone-img fl">
						<!-- <img  :src="fileRoot + item.url" :alt="item.filename">							 -->
						<img v-for="(item,index) in ArticleFile"  :src="fileRoot + item.url" :alt="item.filename">							
					</div>
					<div v-else-if="2 === article.type">
						<video-player class="video-player vjs-custom-skin" 
							ref="videoPlayer"
						 	:playsinline="true"
						  	:options="playerOptions">	  	
						</video-player>	
					</div>
				</div>
				<!-- <a :href="article.sourceurl" class="see-text" v-if="sourceShow">查看原文</a> -->
			</div>
			<div class="loveCiew">
				<p class="red">爱心提示：</p>
				<p>
人人都要看直击真相App：直击真实事件，用事实说话，如实报道真相，揭秘各种套路、陷阱、诈骗、揭秘各种有毒有害的食品和假冒伪劣产品，免费发布寻人寻亲信息，利用网络科技技术帮助被拐卖的妇女儿童和失散人群，早日回家团圆！
				</p>
				<p>希望您能通过直击真相平台了解到有关方面的知识和技能，懂得如何更好的保护自己和家人，并积极地把平台推荐和分享给您的亲朋好友，让他们尽早地远离欺骗和伤害！</p>
				<p class="red">直击真相App：多一个人看到，就少一个人受骗！</p>
			</div>
			<div class="ac download">
				<a href="http://wx.zjzx.xyz:8381/download.html">下载App揭秘世间真相</a>
			</div>
	</section>
</template>

<script>
import config from '@/assets/configs/config'
import userService from '@/services/userService'
import versionService from '@/services/versionService'
import articleService from '@/services/articleService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
export default {
    data () {
        return {
        	id:0,
        	article:{
        		id:Number,
				title:"",
				content:"",
				author:Number,
				type:2,
				sourceurl:'',
				publishtime:"发布时间",
				publisharea:"发布地区",
        	},
        	artUser:{},
        	ArticleFile:[],
        	commentNum:0,
        	fileRoot:config.fileRoot+'/',
        	playerOptions : {
						// playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
						// autoplay: false, //如果true,浏览器准备好时开始回放。
						// muted: false, // 默认情况下将会消除任何音频。
						// loop: false, // 导致视频一结束就重新开始。
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						fluid: true, // 当true时，Video.jsplayer将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
						sources: [
							{
								type: "video/mp4",
								src: "" //url地址
							}
						],
						poster: "", //你的封面地址
						// width: document.documentElement.clientWidth,
						notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
						controlBar: {
							timeDivider: false,
							durationDisplay: false,
							remainingTimeDisplay: false,
							fullscreenToggle: true //全屏按钮
						}
					}
        }
    },
    mounted(){
    	this.id = this.$route.query.id;
    	this.init();
    },
    methods:{
    	init(){
				if (!this.id) {
					// alert('，请返回！')
					Toast({message: '获取出错，请重试',position: 'top',duration:2000});
					return;
				}
				//获取文章信息
				let resArticleDetail = articleService.getArticleById(this.id);
				if (resArticleDetail&&resArticleDetail.status == "success") {
					this.article = resArticleDetail.record;
					// if(!this.article.content){
					// 	this.iconShow = false;
					// }else{
					// 	this.iconShow = true;
					// }
				}

				//获取发布人信息
				let resUserInfo = userService.getUserById(this.article.author);
				if (resUserInfo && resUserInfo.status == "success") {
					this.artUser = resUserInfo.result.user;
				}
				// console.log(resUserInfo)
				// 文章附件 图片
				if (this.article.type != 3) {
					articleFileService.getFileByArticle(this.article.id,(data)=>{
						if (data && data.status == "success") {
							if (this.article.type == 1) {
								this.ArticleFile = data.result.filelist;
							}else if(this.article.type == 2){
								this.playerOptions.sources[0].src = this.fileRoot + data.result.filelist[0].url;
								this.playerOptions.poster = this.fileRoot + data.result.filelist[0].thumbnail;
							}
						}
					});
				}
				//获取评论数量
				/*articleCommentService.getArticleCommentCount(this.id,(data)=>{
					if (data.status == "success") {
						this.commentNum = data.result.count;
						this.commentNum = this.$Tool.numConvertText(this.commentNum);
					}
				});*/
				/*versionService.getNewVersion(data=>{
					if (data && data.status === 'success') {
						this.downloadLink = data.link;
					}
				});*/
			},
			goDowload() {
				window.location.href = 'http://wx.zjzx.xyz:8381/download.html'
			}
    }
}
</script>

<style lang="less" scoped>
	.content-wrap{
	    padding: 20px 15px;
	    .article-title{
	        padding-bottom: .2rem;
			font-size: .42rem;
			line-height: .58rem;
			letter-spacing: .02rem;
			overflow: hidden;
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:3; 
	    }
	    .publisher{
			padding: .45rem 0;
			.uphoto{
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
				margin-right: .2rem;
			}
			.article-time-name{
				width: calc(100% - 2.78rem);
				margin-right: .22rem;
				.uname{
					padding-top: .25rem;
					font-size: .32rem;
				}
				.utime{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: .24rem;
					padding-top: .2rem;
					color: #999;

				}
			}
			.focus{
				width: 1.16rem;
				height: .56rem;
				line-height: .56rem;
				margin-top: .4rem;
				text-align: center;
				color: #fff;
				border-radius: .1rem;
				background-color: @mainColor;
				border: .02rem solid transparent;
			}
		}
		.content{
			padding-bottom: .45rem;
			.article-content{
				padding-bottom: .4rem;
				line-height: .5rem;
				p{
		            font-size: .34rem;
					line-height: .5rem !important;
					margin-bottom: .3rem !important;
				}
				img{
					display: inline-block;
					width: 100%;
					margin-bottom: .4rem !important;
					border-radius: .08rem;
					padding: .04rem;
					// border: .02rem solid @borderColor;
					text-align: center;
				}
			}
			.phone-content{
				padding-bottom: .4rem;
				.phone-img{
					width: 100%;
					.tel-img{
						width: 32.5%;
						height: 2.1rem;
						margin-right: .086rem;
						margin-bottom: .086rem;
						&:nth-child(3n){
							margin-right: 0;
						}
						img{
							display: block;
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
				}
			}
			.see-text{
				letter-spacing: .02rem;
				line-height: .5rem;
				color: #999;
			}

		}
	}
	.video-js .vjs-big-play-button{
		width: 2em;
		height: 2em !important;
	    font-size: 2.8em;
		border-radius: 50%;
		margin: 0 !important;
		transform: translate(-50%,-50%);
	}
	.download{
	    line-height: 30px;
	    width: 90%;
	    border-radius: 15px;
	    background: @mainColor;
	    color: #fff;
	    margin:20px auto;
	}
	.loveCiew{
		line-height: 30px;
		text-indent: 2em;
		color:#f36767;
	}
	.red{
		color:#f00;
		font-weight: 600;
	}
</style>