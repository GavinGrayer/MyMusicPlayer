<template>
  <el-row :gutter="24">
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <i @click="premusic" class="iconfont mxshangyishou"></i>
        <!-- 播放、暂停按钮 -->
        <i
          @click="play()"
          :class="{'iconfont mxbofang':!audio.status,
        'iconfont mxzanting':audio.status}"
        ></i>
        <i class="iconfont mxxiayishou"></i>
        <audio
          id="audio"
          ref="currentmusic"
          src="../../../static/天后.mp3"
          @loadedmetadata="onLoadedmetadata"
          @timeupdate="onTimeupdate"
        ></audio>
      </div>
    </el-col>

    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div class="current">
          <span class="currenttime">{{audio.currentTime}}</span>
        </div>
        <div class="current">
          <el-slider @change="onChangeCurrentTime" class="currenttimeslider" v-model="value1"></el-slider>
        </div>
        <div class="current">
          <span class="currenttime">{{audio.maxTime}}</span>
        </div>
      </div>
    </el-col>

    <el-col :span="4">
      <div class="grid-content bg-purple">
        <div class="current">
          <span class="iconfont mxyinliang"></span>
        </div>
        <div class="current">
          <el-slider @change="onChangeCurrentVolumn" class="currentvolumn" v-model="value2"></el-slider>
        </div>
      </div>
    </el-col>

    <el-col :span="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>


<script>
var url = require('url')
var ipcRenderer = require('electron').ipcRenderer
//var Event = new Vue();
export default {
  data() {
    return {
      value1: 0,
      value2: 50,
      audio: {
        maxTime: "00:00",
        minTime: "00:00",
        currentTime: "00:00",
        status: false
      },
      loc:''
    };
  },
  mounted(){
    ipcRenderer.on('auto_play1', (event,data) => {
      console.log("auto_play1::"+data)
      this.loc = data
      this.audio.status = false
      this.play()
    })
  },
  methods: {
    formatTooltip(val) {
      //console.log(val)
      return val / 100;
    },
    premusic() {},
    //播放/暂停按钮点击
    play() {
      var audio = this.$refs.currentmusic;
/*       var getloc = require('electron').remote.getGlobal('sharedObject').loc
      this.loc = decodeURI(getloc) */
      console.log('this.loc:'+this.loc)
      if(this.loc!=''){
        audio.src=this.loc
      }
      if (this.audio.status == false) {
        //false暂停
        audio.play();
      } else {
        //播放
        audio.pause();
      }
      this.audio.status = !this.audio.status;
    },
    /* 
    loadedmetadata事件为音频/视频文件加载完数据后触发
    duration 获取音频的时长，单位为s
    */
    onLoadedmetadata(res) {
      this.audio.maxTime = transTime(parseInt(res.target.duration));
      //console.log('onLoadedmetadata::'+this.audio.maxTime)
    },

    /* 
      更新当前已播放的时间
    */
    onTimeupdate(res) {
      this.audio.currentTime = transTime(res.target.currentTime);
      //console.log(this.audio.currentTime)
      this.value1 = (res.target.currentTime / res.target.duration) * 100;
    },

    /* 
      拖动进度条，播放指定时间
    */
    onChangeCurrentTime(val) {
      //console.log('onChangeCurrentTime ....'+val)
      //console.log(transSec(this.audio.maxTime))
      this.$refs.currentmusic.currentTime =
        (transSec(this.audio.maxTime) * val) / 100;
    },

    /* 
      更改当前音量
    */
    onChangeCurrentVolumn(val) {
      this.$refs.currentmusic.volume = val / 100;
    }
  }
};

//转换音频时长显示
function transTime(time) {
  var duration = parseInt(time);
  var minute = parseInt(duration / 60);
  var sec = (duration % 60) + "";
  var isM0 = ":";
  if (minute == 0) {
    minute = "00";
  } else if (minute < 10) {
    minute = "0" + minute;
  }
  if (sec.length == 1) {
    sec = "0" + sec;
  }
  return minute + isM0 + sec;
}
//分秒转秒
function transSec(time) {
  var s = "";
  var min = time.split(":")[0];
  var sec = time.split(":")[1];

  s = Number(min * 60) + Number(sec);

  return s;
}
</script>


<style>
.mxshangyishou,
.mxbofang,
.mxxiayishou,
.mxbofang1,
.mxzanting {
  color: red;
  height: 30px;
  width: 30px;
  margin-left: 12px;
  fill: currentColor;
  display: inline-block;
}

.el-slider__bar {
  background-color: red !important;
}
.el-slider__button {
  width: 10px !important;
  height: 10px !important;
  border-color: red !important;
}

.mxyinliang {
  color: black;
  height: 30px;
  width: 30px;
  display: inline-block;
}

.current {
  float: left;
  height: 50px !important;
}

.currenttime {
  margin-left: 20px;
  color: black;
  display: inline-block;
}
.currenttimeslider {
  margin-top: 5px;
  margin-left: 25px;
  width: 340px;
  display: inline-block;
}

.currentvolumn {
  margin-top: 5px;
  width: 100px;
  display: inline-block;
}

footer .el-row {
  height: 50px !important;
  width: 1024px;
  line-height: 50px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  margin-top: 0px !important;
}
footer .el-row:last-child {
  margin-bottom: 0;
}
footer .el-col {
  border-radius: 4px;
  margin-left: 0px;
  text-align: left;
}
footer .bg-purple-dark {
}

footer .grid-content.bg-purple {
  margin: 0 auto;
  margin-left: 10px;
}

.block {
  margin-top: 5px;
  margin-left: 25px;
}

footer .bg-purple {
  margin-left: 50px;
  height: 45px;
  line-height: 50px;
}

/* footer .grid-content {
  border-radius: 4px;
  min-height: 36px;
} */
</style>