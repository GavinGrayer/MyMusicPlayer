<template>
<el-scrollbar style="height:100%;width:760px" class="playlist-detail scroll-page">
      <div class="top">
        <div class="cover">
          <img src="../../assets/images/max.png">
        </div>
        <div class="info">
          <div class="title">追逝</div>
          <div class="author">
            <img src="../../assets/images/max.png">
            <span>MxRanger</span>
          </div>
          <div class="desc line-1">尘事如潮人如水，只叹江湖几人回</div>
          <div class="actions">
            <el-button size="mini" type="primary" icon="iconfont icon-bofangsanjiaoxing">播放全部</el-button>
<!--             <el-button size="mini" icon="iconfont icon-shoucang">收藏</el-button>
            <el-button size="mini" icon="iconfont icon-xiazai2">下载</el-button>
            <el-button size="mini" icon="iconfont icon-piliangcaozuo">批量操作</el-button>
            <el-button size="mini" icon="iconfont icon-20">分享</el-button> -->
          </div>
        </div>
      </div>


    
      <div class="tracks">
        <div class="list">
          <el-table size="small" :data="tableData">
            <el-table-column label="歌曲"  >
                <template slot-scope="scope">
                    <div class="name-row">
                        <div class="left">
                        <span prop="name">{{scope.row.name}}</span>
                        </div>
                        <div class="btns">
                        <i class="iconfont mxbofang2" @click="play(scope.$index, scope.row)"></i>
                        <i class="iconfont icon-gengduo more"></i>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column width="400" label="位置" >
                <template slot-scope="scope">
                    <span style="width: 140px;" class="line-1 hover" prop="loc">{{scope.row.loc}}</span>
                </template>
            </el-table-column>
<!--             <el-table-column width="200" label="歌手">
              <span style="width: 140px;" class="line-1 hover">{{tableData[0].author}}</span>
            </el-table-column>
            <el-table-column width="200" label="专辑">
              <span style="width: 190px;" class="line-1 hover">111</span>
            </el-table-column>
            <el-table-column width="60" label="时长">
              <span style="width: 190px;" class="line-1 hover" prop="time">{{tableData[0].time}}</span>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
</el-scrollbar>
</template>

<script>
var ipcRenderer = require('electron').ipcRenderer
//var Event = new Vue();
export default {
  data() {
    return {
        tableData:[
        ]
      /* tableData: [
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        },
        {
          time: "03:45",
          name: "王后",
          author: "陈势安"
        }
      ] */
    };
  },
  mounted:function(){
    var fs = require('fs')
    var data = []
    fs.readdir('static/musiclist/',function(err,files){//f://myelectron/electron-vue/musiclist/
        console.log(err,files)
        if(!err){
            console.log(files)
            for(var i = 0;i<files.length;i++){
                data.push({
                    "name":files[i],
                    "loc":"static/musiclist/"+files[i]
                })
            }
        }
    })
    console.log('getdata:'+data)
    this.tableData = data;
  },
  methods:{
      play(index, row){
          console.log("send_loc"+index+":"+row.loc)
          /* require('electron').remote.getGlobal('sharedObject').loc = row.loc
           */
          ipcRenderer.send('auto_play',row.loc)

      }
  }
};




</script>

<style lang="scss" scoped>
/* .el-scrollbar__wrap {
  overflow-x: hidden;
} */

.el-scrollbar__view {
    padding: 0px !important;
    width: 777px !important;
}

.main {
    height: 520px;
}

    .scroll-page {
        overflow: hidden;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }
.playlist-detail {
  background: #f0f0f0;
  flex: 1;
  .top {
    padding: 25px 30px;
    display: flex;
    .cover {
      width: 147px;
      height: 147px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 147px;
        height: 147px;
      }
    }
    .info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 22px;
        color: #000;
        font-weight: bold;
      }
      .author {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #555;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .desc {
        font-size: 13px;
        color: #555;
        line-height: 20px;
      }
      /deep/ .actions {
        button {
          min-width: 90px;
          i {
            font-size: 13px;
            margin-right: 3px;
          }
        }
      }
    }
  }
  /deep/ .tracks {
    background: #fafafa;
    padding: 0 30px;
    .list {
      .el-table {
        background: none;
        th {
          background: none;
        }
        tr {
          background: none;
        }
        tr:hover {
          .btns {
            .iconfont {
              display: block;
            }
            .iconfont:hover {
              color: #31c27c;
            }
          }
        }
      }
      .name-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          .shoucang {
            font-size: 15px;
            margin-right: 5px;
            cursor: pointer;
          }
          .shoucang:hover {
            color: #31c27c;
          }
          .tag {
            height: 20px;
            margin-left: 5px;
            margin-top: -2px;
            cursor: pointer;
          }
        }
        .btns {
          display: flex;
          align-items: center;
          .iconfont {
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
            color: #999;
            display: none;
          }
        }
      }
    }
  }
}
</style>
