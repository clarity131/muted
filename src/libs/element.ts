import { ElScrollbar } from 'element-plus'

import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.use(ElScrollbar)
  }
}