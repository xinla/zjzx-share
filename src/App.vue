<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	created(){
    //html font-size 
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, subRecalc, false);
    document.addEventListener('DOMContentLoaded', subRecalc, false);
    function subRecalc(){
    	var docEl=document.documentElement,
	    clientWidth = Math.min( window.innerWidth , docEl.clientWidth );
      if (clientWidth <= 375) {
  	    docEl.style.fontSize = ( clientWidth / 750 * 100)+"px";       
      }
    }
  }
}
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 750px;
  margin: 0 auto;
}
  /*video paly UI设置*/
  .vjs-custom-skin > .video-js .vjs-big-play-button{
    width: 1rem;
    height: 1rem !important;
    font-size: .6rem !important;
    border-radius: 50%;
    /*margin: 0 !important;*/
    transform: translate(-50%,-50%);
    line-height: 1rem !important;
    border: 2px solid #eee;
  }
  /*去除音量按钮*/
  .video-js .vjs-volume-panel{
    display: none !important;
  }
</style>
