<script lang="ts" setup>
  import type { User } from '@/types'

  const props = defineProps<{
    data: User
  }>()

  const { uid, uname, ctime, hismsg } = toRefs(props.data)

  const formatTime = useDateFormat(unref(ctime) * 1000, 'YYYY-MM-DD HH:mm:ss')
  const memberUrl = computed(() => {
    return 'https://space.bilibili.com/' + unref(uid)
  })
</script>

<template>
  <div class="container_card">
    <div class="container_card_info">
      <div class="uname">
        <a :href="memberUrl" target="_blank">{{ uname }}</a
        >已被神罚
      </div>
      <div class="time">{{ formatTime }}</div>
    </div>
    <div class="bulletChat" v-for="(item, index) in hismsg" :key="index">
      {{ item }}
    </div>
  </div>
</template>
