<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <h3 class="text-title">后台管理系统</h3>
        <el-menu class="el-menu-wamp"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse"
                 text-color="#fff"
                 active-text-color="#fff"
                 :unique-opened="true"
                  :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="userlist">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">资讯管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">体育模块</el-menu-item>
              <el-menu-item index="2-2">焦点模块</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">视频管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">视频列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span slot="title">图片管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">图片列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left_header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right_header">
            <el-dropdown @command="handleCommand">
              <div class="pull-left image">
                <img src="../assets/images/26115.jpg" class="img-circle" alt="User Image">
                <span>{{username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="check">查看</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>copyright @2018</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {removeItem} from 'assets/js/store'
import {config} from 'api/config'
export default{
  data () {
    return {
      isCollapse: false,
      username: 'admin'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand (command) {
      if (command === 'check') {
        this.$router.push({ name: 'checkuser' })
      } else if (command === 'logout') {
        removeItem(config.userToken)
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
<style lang="less">
  .main{
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
      position: relative;
      background: #fff;
    }
    .el-header, .el-footer {
      background-color: #fff;
    }
    .el-footer{
      text-align: center;
      line-height: 60px;
    }
    .el-header{
      width: 100%;
      overflow: hidden;
      height: 60px;
      position: relative;
      .left_header{
        float: left;
        height: 60px;
        line-height: 60px;
        .el-breadcrumb{
          height: 60px;
          line-height: 60px;
        }
      }
      .right_header{
        float: right;
        height: 60px;
        line-height: 60px;
        .img-circle{
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
    .el-aside {
      background-color: #39435C;
      box-sizing: border-box;
      overflow: hidden;
      .text-title{
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
    }
    .el-main {
      background-color: #f1f2f7;
    }
    .el-menu-wamp{
      overflow: hidden;
      width: 100%;
      background-color: #39435C;
      color: #fff;
    }
    .el-menu-item-group{
      background-color: #39435C;
    }
    .el-menu-item:focus,.el-menu-item:hover{
      background-color: rgba(0,0,0,.5) !important;
    }
    .el-submenu__title:hover {
      background-color: rgba(0,0,0,.5) !important;
    }
    .el-menu-item{
      padding-left: 50px !important;
    }
  }
</style>
