<!--  -->
<template>
  <div class="container">
    <div class="count">已有{{count}}人遭到神罚</div>
    <el-scrollbar height="900px">
        <div v-for="i in list" :key = 'i.uid' class="container_card ">
          <div class="container_card_info">
            <div class="uname"><a :href="i.url" target="_blank">{{i.uname}}</a> 已被房管禁言</div>
            <div class="time">{{timestampToTime(i.ctime)}}</div>
          </div>
          <div class="bulletChat" v-for="(item, n) in i.hismsg ">
            {{item}}
          </div>
        </div>
    </el-scrollbar>
  </div>
  
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { getData } from '../http/api'
  const {list, count} = toRefs(reactive<{
    list: {
      ctime: number
      uid?: number
      uname: string
      hismsg: []
      url?: string
    }[]
    count: number
  }>({
    list: [],
    count: 0
  }))
  const getValue = async () => {
    const  {data: res}  = await getData()
    res.users.forEach(item => {
      item.url = 'https://space.bilibili.com/' + item.uid
    })
    list.value = res.users
    count.value = res.count
    console.log(list.value)
  }
  getValue()
  let websocket:any
  function connect () {
    websocket = new WebSocket('ws://43.128.42.48:2800/ban/ws')
    //接收服务端消息
    websocket.onmessage = (res:{data:string}) => {
      list.value.unshift(JSON.parse(res.data))
    }
  }
  connect()
  function timestampToTime(timestamp: number) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
  }
</script>
<style scoped lang='less'>
a {text-decoration:none;color: rgb(235, 96, 96);}
a:hover{text-decoration:underline;}
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: rgb(211, 201, 201);
    align-items: center;
    flex-direction: column;
    .count {
      margin: 10px 0;
    }
    .container_card {
      margin-bottom: 10px;
      background-color: rgba(255, 255, 255, .7);
      border-radius: 10px;
      padding: 10px;
      // width: 500px;
      transition: all .7s;
      margin: 10px;
      .bulletChat {
        margin-top: 10px;
        font-size: 14px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 7px 7px 5px #888888;
      }
      .container_card_info {
        display: flex;
        justify-content: space-between;
        .uname {
        font-weight: 600;
        }
        .time {
          color: rgb(175, 185, 185);
          font-size: 12px;
        }
      }
    }
  }
  .el-scrollbar {
    height: 900px;
  }
  
</style>