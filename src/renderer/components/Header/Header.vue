<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="grid-content bg-purple" @click="left_title">醉枫旧巷</div>
    </el-col>
    <el-col :span="15">
      <div class="grid-content bg-purple" id="dragrange">
      </div>
    </el-col>
    <el-col :span="4">
      <div id="btn" class="grid-content bg-purple">
        <div class="op close" @click="closebtn">
          <i class="iconfont mxicon_close"></i>
        </div>
        <div class="op max" @click="maxbtn">
          <i class="iconfont mxmaximize1" id="maxbtn"></i>
        </div>

        <div class="op min" @click="minbtn">
          <i class="iconfont mxminus" id="minbtn"></i>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  var ipcRenderer = require('electron').ipcRenderer
var isBig = true// 窗口放大还原标示
export default {
    methods: {
      left_title () {
        console.log('left_title')
      },
      headerdrag () {
        console.log('11111111111')
      },
      maxbtn () {
        if (isBig) {
          ipcRenderer.send('show-window')
        } else {
          ipcRenderer.send('orignal-window')
        }
        isBig = !isBig
      },
      minbtn () {
        ipcRenderer.send('hide-window')
      },
      closebtn () {
        ipcRenderer.send('window-all-closed')
      }
    }
  }
</script>


<style>

#dragrange {
  -webkit-app-region: drag
}

.fa {
  color: #e29595;
}
fa fa-close fa-fw fa-1x{
  font-size: 40px;
}

.op {
  float: right;
  width: 20%;
  margin-left: 10px;
}

.el-row {
  /* margin-bottom: 20px; */
  margin-top: 4px;
}
.el-row:last-child {
  /* margin-top: 4px */
}


.el-col {
  /* border-radius: 4px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /* background: #d3dce6; */
  color: #ffffff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>