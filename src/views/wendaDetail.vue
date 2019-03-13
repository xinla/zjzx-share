<template>
    <div>
        <div class="answer-detail">
            <div class="answer-wrap">
                <div class="answer-header">
                    <h1 class="question-title">{{qtitle}}</h1>
                    <div class="answer-count">
                        <span>共{{answerCount}}条回答 &gt;</span>
                    </div>
                </div>
                <div class="answer-info clearfix">
                    <div class="answer-user fl">
                        <img :src="$Tool.headerImgFilter(answerUser.imageurl)">
                        <span>{{answerUser.username}}</span>
                    </div>
                    <div class="answer-focus fr">关注</div>
                </div>
                <div class="answer-content">
                    <p class="content-text">
                        {{answer.content}}
                    </p>
                    <div class="content-img">
                        <div class="item" v-for="item in answerFile" :key="item.id">
                            <img :src="fileRoot + item.url">
                        </div>
                    </div>
                    <span class="content-time">创建时间 {{publishtime}}</span>
                </div>
                <div class="love-tip">
                    <p class="red">爱心提示：</p>
                    <p>人人都要看直击真相App：直击真实事件，用事实说话，如实报道真相，揭秘各种套路、陷阱、诈骗、揭秘各种有毒有害的食品和假冒伪劣产品，免费发布寻人寻亲信息，利用网络科技技术帮助被拐卖的妇女儿童和失散人群，早日回家团圆！</p>
                    <p>希望您能通过直击真相平台了解到有关方面的知识和技能，懂得如何更好的保护自己和家人，并积极地把平台推荐和分享给您的亲朋好友，让他们尽早地远离欺骗和伤害！</p>
                    <p class="red">直击真相App：多一个人看到，就少一个人受骗！</p>
                </div>
                <div class="download">
                    <a href="http://wx.zjzx.xyz:8381/download.html">下载App揭秘世间真相</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/assets/configs/config'
    import userService from '@/services/userService'
    import interService from '@/services/interlocutionService'
    import articleService from '@/services/articleService'
    import articleFileService from '@/services/article_fileService'
    export default {
        name: "wendaDetail",
        data(){
            return{
                qid:null,   //问题id
                aid:null,   //回答id
                qtitle:"",  //问题标题
                answer:{},  //回答对象
                fileRoot:config.fileRoot+'/',   //文件路径
                answerUser: {},      //回答人头像-名称
                answerCount: 0,     //回答数
                publishtime: "",     //回答时间
                answerFile:[],      ////回答内容中图片数组
            }
        },
        methods:{
            init(){
                // 无aid则返回
                if(!this.aid) {
                    Toast({
                        message: "获取出错,请重试！",
                        position: "top",
                        duration: 2000
                    });
                    return;
                }

                // 获取问题标题
                let questionData = interService.getQuestionById(this.qid);
                if(questionData && questionData.status == "success"){
                    this.qtitle = questionData.record.title;
                }

                // 获取问题回答数量
                interService.getAnswerCount(this.qid, (data) =>{
                    if(data && data.status == "success"){
                        this.answerCount = this.$Tool.numConvertText(data.count);
                    }
                });
                // 获取回答详情
                let answerData = articleService.getArticleById(this.aid);
                if(answerData && answerData.status == "success"){
                    this.answer = answerData.record;
                }
                // 获取回答图片
                let answerSrcData = articleFileService.getFileByArticle(this.aid);
                if(answerSrcData && answerSrcData.status == "success"){
                    this.answerFile = answerSrcData.result.filelist;
                }
                // 获取回答人信息
                let answerInfo = userService.getUserById(this.answer.author);
                if(answerInfo && answerInfo.status == "success"){
                    this.answerUser = answerInfo.result.user;
                }
                // 获取发布回答时间
                this.publishtime = this.$Tool.publishTimeFormat(this.answer.publishtime);
            },
            handleDownload(){
                let ua = navigator.userAgent.toLowerCase();
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if(isWeixinBrowser){
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        window.location.href = "https://itunes.apple.com/cn/app/%E7%9B%B4%E5%87%BB%E7%9C%9F%E7%9B%B8/id1450056517?mt=8";
                    }else if (/(Android)/i.test(navigator.userAgent)){
                        window.location.href = "https://wap.pp.cn/app_z5q5zyZIcxe/";
                    }
                }
                function isWeixinBrowser() {
                    return (/micromessenger/.test(ua)) ? true : false;
                }
            }
        },

        mounted(){
            this.qid = this.$route.query.qid;
            this.aid = this.$route.query.aid;
            this.init();
        }
    }
</script>

<style lang="less" scoped>
    .answer-detail{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        overflow-y: auto;
        padding: 0 .3rem;
        .answer-wrap{
            .answer-header{
                padding-top: .2rem;
                color: #222;
                .question-title{
                    font-size: .4rem;
                    line-height: .58rem;
                    letter-spacing: .02rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:3;
                }
                .answer-count{
                    line-height: .8rem;
                }
            }
            .answer-info{
                padding: .2rem 0;
                line-height: 1rem;
                .answer-user{
                    display: flex;
                    font-size: .3rem;
                    img{
                        display: block;
                        width: 1rem;
                        height: 1rem;
                        margin-right: .23rem;
                        border-radius: 50%;
                    }
                }
                .answer-focus{
                    width: 1.3rem;
                    height: .65rem;
                    line-height: .65rem;
                    text-align: center;
                    border-radius: .1rem;
                    margin-top: .2rem;
                    letter-spacing: .04rem;
                    background-color: #f85959;
                    color: #fff;
                }
            }
            .answer-content{
                padding-bottom: .3rem;
                background-color: #fff;
                .content-text{
                    line-height: .56rem;
                    font-size: .34rem;
                }
                .content-img{
                    margin: .3rem 0;
                    .item{
                        display: inline-block;
                        width: 49%;
                        height: 2.5rem;
                        margin-bottom: .12rem;
                        margin-right: 2%;
                        &:nth-child(2n){
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
                .content-time{
                    line-height: .5rem;
                    font-size: .32rem;
                    color: #999;
                }

            }
            .love-tip{
                line-height: .6rem;
                text-indent: 2em;
                color:#f36767;
                .red{
                    color:#f00;
                    font-weight: 600;
                }
            }
            .download{
                width: 90%;
                line-height: .7rem;
                position: relative;
                left: 5%;
                top: .3rem;
                font-size: .3rem;
                letter-spacing: .02rem;
                border-radius: .3rem;
                text-align: center;
                background-color: @mainColor;
                color: #fff;
            }
        }
    }

</style>