<!--  -->
<template>
  <div class="container">
    <div class="count">
      已有{{ count }}人遭到
      <div class="punish">神罚</div>
    </div>
    <el-scrollbar height="900px">
      <HistoryItem v-for="user in users" :key="user.uid" :data="user" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import HistoryItem from '../components/historyItem.vue'

  import { IResponse } from '@/types'
  import { getData } from '../http/api'

  const { users, count } = toRefs(
    reactive<IResponse['data']>({
      users: [],
      count: 0,
    })
  )
  const getValue = async () => {
    const { data: res } = await getData()
    users.value = res.users
    count.value = res.count
  }
  getValue()
  let websocket: WebSocket
  function connect() {
    websocket = new WebSocket('ws://43.128.42.48:2800/ban/ws')
    //接收服务端消息
    websocket.onmessage = (res: { data: string }) => {
      users.value.unshift(JSON.parse(res.data))
      count.value++
    }
  }
  connect()
</script>

<style lang="less">
  a {
    text-decoration: none;
    color: rgb(235, 96, 96);

    &:hover {
      text-decoration: underline;
    }
  }
  .container {
    font-family: 'Xingkai SC';
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: black;
    align-items: center;
    flex-direction: column;
    .count {
      font-size: 50px;
      color: white;
      margin: 10px 0;
    }
    .punish {
      display: flex;
      justify-content: center;
      color: red;
      font-size: 60px;
    }
    .container_card {
      margin-bottom: 10px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      padding: 10px;
      transition: all 0.7s;
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
          display: flex;
          align-items: center;
        }
        .punish {
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
  @media screen and (max-width: 1000px) {
    .container {
      .count {
        font-size: 45px;
      }
      .container_card {
        .container_card_info {
          .uname {
            font-size: 20px;
          }
          .time {
            font-size: 15px;
          }
        }
      }
    }
  }
</style>
