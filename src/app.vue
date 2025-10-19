<template>

  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="NaiveTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <div class="metools-app-example max-w-[960px] mx-auto">

              <div class="mt-2 max-h-[calc(100vh-260px)] overflow-auto">
                <WxCoverGenerator />
              </div>
            </div>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">


// 组件逻辑可以在这里添加
import { zhCN, dateZhCN } from "naive-ui";
import { darkTheme, lightTheme } from 'naive-ui'

import { useWebviewMsgStore } from "./stores/webviewMsg";
// 移除对 computed 和 watch 的显式导入，使用自动导入

const webviewMsgStore = useWebviewMsgStore()

const NaiveTheme = computed(() => {
  return webviewMsgStore.themeMode === 'dark' ? darkTheme : lightTheme
})

// 初始立即设置一次，以确保 Tailwind 的 dark: 变体和 NaiveUI 主题与当前模式一致
watch(() => webviewMsgStore.themeMode, (newVal: 'dark' | 'light' | 'system') => {
  if (newVal === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })
</script>