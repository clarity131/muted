<!--  -->
<template>
  <div class="container">
    <div class="count">已有{{count}}人遭到<div class="punish">神罚</div></div>
    <el-scrollbar height="900px">
        <div v-for="i in list" :key = 'i.uid' class="container_card ">
          <div class="container_card_info">
            <div class="uname"><a :href="i.url" target="_blank">{{i.uname}}</a>已被神罚</div>
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
  font-family: "Xingkai SC";
    height: 100%;
    display: flex;
    justify-content: center;
    background-color:black;
    align-items: center;
    flex-direction: column;
    .count {
      font-size: 50px;
      color: white;
      margin: 10px 0;
    }
    .punish{

      display: flex;
      justify-content: center;
      color: red;
      font-size: 60px;
    }
    .container_card {
      margin-bottom: 10px;
      background-color: rgba(255, 255, 255, .7);
      border-radius: 10px;
      padding: 10px;
      transition: all .7s;
      margin: 10px;
      .bulletChat {
        margin-top: 10px;
        font-size: 25px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 7px 7px 5px #888888;
      }
      .container_card_info {
        display: flex;
        justify-content: space-between;
        .uname {
          font-size: 30px;
        font-weight: 600;
        }
        .time {
          color: blue;
          font-size: 20px;
          display:flex;
          align-items: center;
        }
        .punish{

          display: flex;
          justify-content: center;
          color: red;
          font-size: 60px;
        }
      }
    }
  }
  .el-scrollbar {
    height: 900px;
  }
@media screen and (max-width: 1000px){
  .container{
    .count {
      font-size: 45px;
    }
    .container_card{
      .container_card_info{
        .uname{
          font-size: 20px;
        }
        .time{
          font-size: 15px;
        }
      }
    }
  }

}

</style>