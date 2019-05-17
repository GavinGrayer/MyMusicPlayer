<template>
  <div id="app">
     <el-container>

      <el-header >
        <headercon></headercon>
        </el-header>


      <el-container>

        <el-aside width="230px">
          <!-- <navmenu></navmenu> -->
          <asideview></asideview>
        </el-aside>


        <el-main>
          <detail></detail>
        </el-main>
      
      
      </el-container>


      <el-footer>
        <footercon></footercon>
      </el-footer>

    </el-container>

  </div>
</template>

<script>
  import asideview from './components/Aside/'
  import headercon from './components/Header/Header.vue'
  import detail from './components/main/detail.vue'
  import footercon from './components/footer'
  export default {
    name: 'crudsystem',
    components: {
      'asideview':asideview,
      // 'navmenu': navmenu,
      'headercon': headercon,
      'detail': detail,
      'footercon': footercon,
    },
    methods: {
    }
  }
</script>

<style>
  /* CSS */
   .el-footer {
    background-color: #F6F6F8;
    color: #333;
    text-align: center;
    line-height: 50px;
    width: 1024px;
    height: 50px !important;
    padding-right: 0px !important;
    padding-left: 0px !important;
  }


  .el-header {
    background-color: #C62F2F;
    color: #333;
    text-align: center;
    line-height: 45px;
    width: 1024px;
    height: 50px !important;
    /* -webkit-app-region: drag */ /* 无边框使得header区域可以拖动 */
  }
  
  .el-aside {
    background-color: #F5F5F7;
    color: #333;
    text-align: center;
    /* line-height: 570px; */
    height:570px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    /* line-height: 570px; */
    height:570px;
    margin-left: 5px;
    padding: 0px;
  }
  /* 
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
  .el-container {
    background: #F5F5F7;
    height: 670px;
  }
</style>
