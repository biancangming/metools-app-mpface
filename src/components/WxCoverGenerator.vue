<template>
  <div class="w-full flex flex-col gap-2">
    <!-- 顶部：文案设置 -->
    <n-card size="small" class="w-full" title="文案设置">
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <!-- 左侧：主标题和副标题 -->
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-3 items-center">
              <div class="text-xs text-gray-500">主标题</div>
              <div class="col-span-2 space-y-2">
                <n-input 
                  v-model:value="formData.title" 
                  placeholder="例如：本周精选 | AI 工具评测"
                  size="small"
                />
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">字号</div>
                  <n-slider 
                    v-model:value="formData.titleSize" 
                    :min="96" 
                    :max="136" 
                    :step="2" 
                    size="small"
                  />
                </div>
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">颜色</div>
                  <n-color-picker 
                    v-model:value="formData.titleColor" 
                    :actions="['clear']"
                    size="small"
                  />
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-3 items-center">
              <div class="text-xs text-gray-500">副标题</div>
              <div class="col-span-2 space-y-2">
                <n-input 
                  v-model:value="formData.subtitle" 
                  placeholder="副标题（可选）"
                  size="small"
                />
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">字号</div>
                  <n-slider 
                    v-model:value="formData.subtitleSize" 
                    :min="18" 
                    :max="96" 
                    :step="1" 
                    size="small"
                  />
                </div>
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">颜色</div>
                  <n-color-picker 
                    v-model:value="formData.subtitleColor" 
                    :actions="['clear']"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧：署名和颜色 -->
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-3 items-center">
              <div class="text-xs text-gray-500">署名/来源</div>
              <div class="col-span-2 space-y-2">
                <n-input 
                  v-model:value="formData.author" 
                  placeholder="署名/来源（可选）"
                  size="small"
                />
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">字号</div>
                  <n-slider 
                    v-model:value="formData.authorSize" 
                    :min="12" 
                    :max="32" 
                    :step="1" 
                    size="small"
                  />
                </div>
                <div class="flex gap-2 items-center">
                  <div class="text-xs text-gray-500 w-8">颜色</div>
                  <n-color-picker 
                    v-model:value="formData.authorColor" 
                    :actions="['clear']"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 底部：预览面板 -->
    <n-card size="small" class="w-full" title="实时预览">
      <div class="w-full">
        <!-- 画布容器：保证在暗色主题下也可见边框 -->
        <div class="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
          <div class="w-full flex justify-center">
            <!-- 固定预览宽度 470px（2.35:1）-->
            <div class="relative">
              <canvas ref="canvasRef" class="rounded-md shadow-sm" />
              <div class="absolute inset-0 pointer-events-none">
                <!-- 辅助线：边距安全区 -->
                <div :style="guideStyleStr" class="border-2 border-dashed border-emerald-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 底部：背景与输出设置 -->
    <n-card size="small" class="w-full" title="背景与输出设置">
      <div class="flex flex-col gap-2">
        <div class="space-y-2">
          <div class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">风格模板</div>
            <div class="col-span-3">
              <n-select v-model:value="templateType" :options="templateOptions" size="small" />
            </div>
          </div>

          <!-- 渐变或色块模板下提供背景模式（预设/自定义）的切换，默认预设模式 -->
          <div v-if="templateType === 'gradient' || templateType === 'block' || templateType === 'white-card'" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">背景模式</div>
            <div class="col-span-3">
              <n-radio-group v-model:value="backgroundMode" size="small">
                <n-radio value="preset">预设模式</n-radio>
                <n-radio value="custom">自定义模式</n-radio>
              </n-radio-group>
            </div>
          </div>

          <!-- 自定义颜色仅在非图片模式且（非渐变或渐变的自定义模式）显示 -->
          <div v-if="templateType !== 'image-overlay' && (templateType !== 'gradient' || backgroundMode === 'custom') && (templateType !== 'white-card' || backgroundMode === 'custom')" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">渐变颜色 1</div>
            <div class="col-span-3">
              <n-color-picker v-model:value="bgColor1" :modes="['hex']" :show-alpha="false" size="small" />
            </div>
          </div>
          <div v-if="templateType !== 'image-overlay' && (templateType !== 'gradient' || backgroundMode === 'custom') && (templateType !== 'white-card' || backgroundMode === 'custom')" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">渐变颜色 2</div>
            <div class="col-span-3">
              <n-color-picker v-model:value="bgColor2" :modes="['hex']" :show-alpha="false" size="small" />
            </div>
          </div>

          <div v-if="templateType === 'block'" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">强调色</div>
            <div class="col-span-3">
              <n-color-picker v-model:value="accentColor" size="small" />
            </div>
          </div>

          <!-- 白色卡片模板的卡片颜色设置 -->
          <div v-if="templateType === 'white-card'" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">卡片颜色</div>
            <div class="col-span-3">
              <n-color-picker v-model:value="accentColor" size="small" />
            </div>
          </div>
          <div v-if="templateType === 'image-overlay'" class="grid grid-cols-4 gap-3 items-center">
            <div class="text-xs text-gray-500">背景图片</div>
            <div class="col-span-3">
              <input type="file" accept="image/*" @change="onImageChange" class="text-xs" />
              <div class="mt-2 flex items-center gap-2">
                <span class="text-xs text-gray-500">蒙版强度</span>
                <n-slider v-model:value="overlayAlpha" :min="0" :max="0.8" :step="0.02" size="small" />
              </div>
            </div>
          </div>

          <!-- 预设背景仅在渐变 + 预设模式下显示，且不会影响自定义颜色选择器的值 -->
          <div v-if="(templateType === 'gradient' || templateType === 'white-card') && backgroundMode === 'preset'">
            <div class="mb-1 text-xs text-gray-500">预设背景</div>
            <div class="overflow-x-auto">
              <div class="flex gap-3 py-1">
                <button
                  v-for="(p, idx) in gradientPresets"
                  :key="idx"
                  type="button"
                  class="flex flex-col items-center shrink-0"
                  @click="applyPreset(idx)"
                >
                  <div
                    class="w-10 h-10 rounded-full border border-neutral-300"
                    :class="idx === selectedPresetIndex ? 'ring-2 ring-emerald-500' : ''"
                    :style="{ background: p.style }"
                  ></div>
                  <div class="mt-1 text-[10px] text-gray-600 w-20 truncate text-center">{{ p.title }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-2 items-center justify-center">
          <n-button type="primary" @click="exportPNG">
            导出 PNG
          </n-button>
          <span class="text-xs text-gray-400">(导出后会自动删除辅助线)</span>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
// 移除显式导入，使用 unplugin-auto-import 自动引入 Vue API
import gradientPresetsRaw from './all'
interface GradientPreset { title: string; style: string }
const gradientPresets = gradientPresetsRaw as GradientPreset[]
const selectedPresetIndex = ref<number>(0)
const backgroundMode = ref<'preset' | 'custom'>('preset')

// 文案状态 - 使用formData统一管理
const formData = reactive({
  title: '一周观点 | AI工具精选',
  subtitle: '深度评测 · 趋势观察 · 实用技巧',
  author: '一个橙子pro',
  titleSize: 96,
  subtitleSize: 36,
  authorSize: 22,
  titleColor: '#111111',
  subtitleColor: '#111111',
  authorColor: '#111111'
})

// 为了兼容现有代码，创建计算属性
const title = computed({
  get: () => formData.title,
  set: (value) => { formData.title = value }
})
const subtitle = computed({
  get: () => formData.subtitle,
  set: (value) => { formData.subtitle = value }
})
const author = computed({
  get: () => formData.author,
  set: (value) => { formData.author = value }
})
const titleSize = computed({
  get: () => formData.titleSize,
  set: (value) => { formData.titleSize = value }
})
const subtitleSize = computed({
  get: () => formData.subtitleSize,
  set: (value) => { formData.subtitleSize = value }
})
const authorSize = computed({
  get: () => formData.authorSize,
  set: (value) => { formData.authorSize = value }
})
const titleColor = computed({
  get: () => formData.titleColor,
  set: (value) => { formData.titleColor = value }
})
const subtitleColor = computed({
  get: () => formData.subtitleColor,
  set: (value) => { formData.subtitleColor = value }
})
const authorColor = computed({
  get: () => formData.authorColor,
  set: (value) => { formData.authorColor = value }
})
// 保持向后兼容
const textColor = computed({
  get: () => formData.titleColor,
  set: (value) => { formData.titleColor = value }
})

// 背景样式与模板
const templateType = ref<'gradient' | 'block' | 'image-overlay' | 'white-card'>('gradient')
const templateOptions = [
  { label: '简约渐变（推荐）', value: 'gradient' },
  { label: '左侧强调色块', value: 'block' },
  { label: '图片背景+暗色蒙版', value: 'image-overlay' },
  { label: '白色圆角卡片', value: 'white-card' },
]
const bgColor1 = ref('#06beb6')
const bgColor2 = ref('#48b1bf')
const accentColor = ref('#ffffff')
const overlayAlpha = ref(0.25)

// 将 CSS 渐变字符串解析为 CanvasGradient（保留所有颜色停靠点与方向）
function splitGradientArgs(s: string): string[] {
  const args: string[] = []
  let curr = ''
  let depth = 0
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === ',' && depth === 0) {
      args.push(curr.trim())
      curr = ''
    } else {
      if (ch === '(') depth++
      else if (ch === ')') depth--
      curr += ch
    }
  }
  if (curr.trim()) args.push(curr.trim())
  return args
}

function parseStops(tokens: string[]): { offset: number; color: string }[] {
  const stops: { offset: number; color: string }[] = []
  
  for (const tk of tokens) {
    // 直接解析颜色和位置，无需提取
    const colorMatch = tk.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-zA-Z]+)/)
    if (!colorMatch) continue
    
    const color = colorMatch[0]
    
    // 解析位置
    let offset: number | null = null
    
    // 匹配百分比格式
    const percentMatch = tk.match(/(-?\d+\.?\d*)\s*%/)
    if (percentMatch) {
      const p = parseFloat(percentMatch[1])
      offset = Math.max(0, Math.min(100, isNaN(p) ? 0 : p)) / 100
    }
    
    // 匹配小数格式 (0-1)
    const decimalMatch = tk.match(/(-?\d+\.?\d*)\s*(?![%]|px|em|rem)/)
    if (!offset && decimalMatch) {
      const d = parseFloat(decimalMatch[1])
      if (d >= 0 && d <= 1) {
        offset = d
      }
    }
    
    stops.push({ offset: offset ?? NaN, color })
  }
  
  // 智能分配缺失的位置
  const n = stops.length
  if (stops.some(s => Number.isNaN(s.offset))) {
    if (n === 1) {
      stops[0].offset = 0
    } else {
      for (let i = 0; i < n; i++) {
        if (Number.isNaN(stops[i].offset)) {
          stops[i].offset = i / (n - 1)
        }
      }
    }
  }
  
  stops.sort((a, b) => a.offset - b.offset)
  return stops
}

function buildCanvasGradientFromStyle(ctx: CanvasRenderingContext2D, w: number, h: number, style: string): CanvasGradient | null {
  try {
    const s = style.trim()
    const openIdx = s.indexOf('(')
    const closeIdx = s.lastIndexOf(')')
    if (openIdx < 0 || closeIdx < 0) return null
    const inner = s.slice(openIdx + 1, closeIdx)
    const args = splitGradientArgs(inner)
    
    if (s.startsWith('linear-gradient')) {
      const first = args[0]?.trim()
      let angleDeg = 180 // CSS 默认是 to bottom
      let startIndex = 0
      
      // 处理方向关键字
      const dirMatch = first?.match(/^to\s+(top|right|bottom|left|top\s+right|top\s+left|bottom\s+right|bottom\s+left)$/i)
      const degMatch = first?.match(/(-?\d+\.?\d*)\s*deg/i)
      
      if (dirMatch) {
        startIndex = 1
        const direction = dirMatch[1].toLowerCase()
        switch (direction) {
          case 'right': angleDeg = 90; break
          case 'left': angleDeg = 270; break
          case 'top': angleDeg = 0; break
          case 'bottom': angleDeg = 180; break
          case 'top right': angleDeg = 45; break
          case 'top left': angleDeg = 315; break
          case 'bottom right': angleDeg = 135; break
          case 'bottom left': angleDeg = 225; break
        }
      } else if (degMatch) {
        startIndex = 1
        angleDeg = parseFloat(degMatch[1])
      }
      
      const stops = parseStops(args.slice(startIndex))
      if (!stops.length) return null
      
      // 计算渐变线的起点和终点
      const cx = w / 2, cy = h / 2
      const d = Math.sqrt(w * w + h * h) / 2
      const rad = (angleDeg - 90) * Math.PI / 180
      const vx = Math.cos(rad), vy = Math.sin(rad)
      const x0 = cx - vx * d, y0 = cy - vy * d
      const x1 = cx + vx * d, y1 = cy + vy * d
      
      const grad = ctx.createLinearGradient(x0, y0, x1, y1)
      for (const st of stops) {
        grad.addColorStop(Math.max(0, Math.min(1, st.offset)), st.color)
      }
      return grad
      
    } else if (s.startsWith('radial-gradient')) {
      const first = args[0]?.trim() || ''
      let cx = w / 2, cy = h / 2
      let r = Math.sqrt(w * w + h * h) / 2
      
      // 处理径向渐变的位置和大小
      const positionMatch = first.match(/at\s+([^,]+)/i)
      const sizeMatch = first.match(/(\d+)\s*px/i)
      
      if (positionMatch) {
        const pos = positionMatch[1].trim()
        if (pos.includes('center')) {
          // 保持默认中心位置
        } else if (pos.includes('%')) {
          const coords = pos.split(/\s+/)
          if (coords.length >= 2) {
            cx = (parseFloat(coords[0]) / 100) * w
            cy = (parseFloat(coords[1]) / 100) * h
          }
        }
      }
      
      if (sizeMatch) {
        r = parseFloat(sizeMatch[1])
      }
      
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      const stops = parseStops(args.slice(1))
      if (!stops.length) return null
      
      for (const st of stops) {
        grad.addColorStop(Math.max(0, Math.min(1, st.offset)), st.color)
      }
      return grad
    }
    return null
  } catch (error) {
    console.warn('渐变解析失败:', error, style)
    return null
  }
}
function applyPreset(idx: number) {
  const preset = gradientPresets[idx]
  // 预设模式下直接使用CSS渐变字符串，无需提取颜色
  selectedPresetIndex.value = idx
  // 保持当前的模板类型，不强制重置为gradient
  // templateType.value = 'gradient'  // 删除这行，保持当前模板类型
  backgroundMode.value = 'preset'
}
// 初始化为第一个预设
selectedPresetIndex.value = 0
backgroundMode.value = 'preset'

// 固定比例：2.35:1（宽/高）- 自动适应高清输出
const outputWidth = computed(() => {
  // 根据屏幕分辨率自动选择最佳输出尺寸
  const screenWidth = window.screen.width
  if (screenWidth >= 2560) return 1920 // 4K屏幕
  if (screenWidth >= 1920) return 1440 // 2K屏幕
  if (screenWidth >= 1440) return 1080 // 1080p屏幕
  return 900 // 默认高清
})
const outputHeight = computed(() => Math.round(outputWidth.value / 2.35))

// 预览尺寸（固定 470px 宽）
const previewWidth = ref(760)
const previewHeight = computed(() => Math.round(previewWidth.value / 2.35))

const margin = ref(48) // 安全边距

// 画布
const canvasRef = ref<HTMLCanvasElement | null>(null)
let bgImg: HTMLImageElement | null = null

// 指南样式（安全区）使用字符串形式，避免 HTMLAttributes 类型不匹配报错
const guideStyleStr = computed(() => `position:absolute;left:${margin.value}px;right:${margin.value}px;top:${margin.value}px;bottom:${margin.value}px;`)

// 重置功能已移除

// 图片选择
function onImageChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      bgImg = img
      draw()
    }
    img.src = reader.result as string
  }
  reader.readAsDataURL(file)
}

// 优化文字渲染质量
function optimizeTextRendering(ctx: CanvasRenderingContext2D, fontSize: number, fontWeight: string = '700') {
  // 设置字体渲染优化
  ctx.font = `${fontWeight} ${fontSize}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`
  ctx.textBaseline = 'top'
  ctx.textAlign = 'center'
  
  // 启用子像素渲染（如果支持）
  if ('textRenderingOptimization' in ctx) {
    (ctx as any).textRenderingOptimization = 'optimizeQuality'
  }
  
  // 设置文字渲染质量
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
}

// 文本换行（中文/英文通用）
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (let i = 0; i < text.length; i++) {
    const testLine = line + text[i]
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line !== '') {
      lines.push(line)
      line = text[i]
    } else {
      line = testLine
    }
  }
  if (line) lines.push(line)
  return lines
}

// 绘制函数
function draw() {
  const canvas = canvasRef.value
  if (!canvas) return

  const w = outputWidth.value
  const h = outputHeight.value
  const dpr = Math.max(4, Math.floor(window.devicePixelRatio || 4)) // 进一步提高DPI到4倍
  
  // 设置canvas实际尺寸（高分辨率）
  canvas.width = w * dpr
  canvas.height = h * dpr
  
  // 设置canvas显示尺寸（CSS尺寸）
  canvas.style.width = previewWidth.value + 'px'
  canvas.style.height = previewHeight.value + 'px'
  
  // 设置CSS属性优化渲染
  canvas.style.imageRendering = 'auto'
  ;(canvas.style as any).fontSmooth = 'antialiased'
  ;(canvas.style as any).webkitFontSmoothing = 'antialiased'
  ;(canvas.style as any).mozOsxFontSmoothing = 'grayscale'

  const ctx = canvas.getContext('2d')!
  
  // 缩放绘图上下文以匹配高分辨率
  ctx.scale(dpr, dpr)
  
  // 优化渲染设置
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  
  // 设置文字渲染属性
  ctx.textBaseline = 'top'
  ctx.textAlign = 'center'
  
  // 设置字体（在绘制前设置，确保渲染质量）
  ctx.font = `700 ${titleSize.value}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`

  // 背景
  if (templateType.value === 'image-overlay' && bgImg) {
    // 图片等比覆盖
    const iw = bgImg.width
    const ih = bgImg.height
    const scale = Math.max(w / iw, h / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (w - dw) / 2
    const dy = (h - dh) / 2
    ctx.drawImage(bgImg, dx, dy, dw, dh)

    // 暗色蒙版
    ctx.fillStyle = `rgba(0,0,0,${overlayAlpha.value})`
    ctx.fillRect(0, 0, w, h)
  } else {
    // 渐变/色块背景：根据背景模式选择预设或自定义两色，不互相干扰
    let grad: CanvasGradient | null = null
    if ((templateType.value === 'gradient' || templateType.value === 'block' || templateType.value === 'white-card') && backgroundMode.value === 'preset') {
      const presetStyle = gradientPresets[selectedPresetIndex.value]?.style
      if (presetStyle) {
        grad = buildCanvasGradientFromStyle(ctx, w, h, presetStyle)
      }
    }
    if (!grad) {
      // 自定义模式或预设解析失败，使用两色线性渐变
      grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, bgColor1.value)
      grad.addColorStop(1, bgColor2.value)
    }
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    if (templateType.value === 'block') {
      // 左侧强调色块
      const blockW = Math.round(w * 0.24)
      ctx.fillStyle = accentColor.value
      ctx.fillRect(0, 0, blockW, h)
    } else if (templateType.value === 'white-card') {
      // 白色圆角卡片模板
      // 使用预设或自定义背景渐变
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      
      // 绘制白色圆角卡片
      const cardPadding = Math.round(w * 0.08) // 卡片边距
      const cardX = cardPadding
      const cardY = cardPadding
      const cardW = w - cardPadding * 2
      const cardH = h - cardPadding * 2
      const cardRadius = Math.round(w * 0.02) // 圆角半径
      
      // 绘制圆角矩形
      ctx.fillStyle = accentColor.value
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius)
      ctx.fill()
    }
  }

  // 安全边距区域
  const left = margin.value
  const right = w - margin.value
  const top = margin.value
  const maxTextWidth = right - left

  // 文本颜色（使用标题颜色作为默认）
  ctx.fillStyle = titleColor.value
  ctx.textBaseline = 'top'

  // 统一水平居中
  const isTitleEmpty = !title.value.trim()
  const isSubtitleEmpty = !subtitle.value.trim()
  const centerBoth = !isTitleEmpty && !isSubtitleEmpty
  const x = w / 2
  ctx.textAlign = 'center'

  // 标题测量 - 使用优化渲染
  optimizeTextRendering(ctx, titleSize.value, '700')
  const titleWrapWidth = Math.round(maxTextWidth * 0.9)
  const titleLines = wrapText(ctx, title.value, titleWrapWidth)
  const titleLH = Math.round(titleSize.value * 1.2)
  const titleHeight = titleLines.length * titleLH

  // 副标题测量（如存在）
  let subLines: string[] = []
  const subLH = Math.round(subtitleSize.value * 1.5)
  if (!isSubtitleEmpty) {
    optimizeTextRendering(ctx, subtitleSize.value, '500')
    const subWrapWidth = Math.round(maxTextWidth * 0.9)
    subLines = wrapText(ctx, subtitle.value, subWrapWidth)
  }

  // 计算起始 Y（垂直居中）
  const safeH = h - margin.value * 2
  let cursorY: number
  if (centerBoth) {
    const totalH = titleHeight + subLines.length * subLH
    cursorY = top + Math.round((safeH - totalH) / 2)
  } else if (isSubtitleEmpty && !isTitleEmpty) {
    cursorY = top + Math.round((safeH - titleHeight) / 2)
  } else {
    cursorY = top
  }

  // 绘制标题 - 使用优化渲染和独立颜色
  ctx.fillStyle = titleColor.value
  optimizeTextRendering(ctx, titleSize.value, '700')
  titleLines.forEach((ln) => {
    ctx.fillText(ln, x, cursorY)
    cursorY += titleLH
  })

  // 绘制副标题（如存在）
  if (!isSubtitleEmpty) {
    ctx.fillStyle = subtitleColor.value
    optimizeTextRendering(ctx, subtitleSize.value, '500')
    subLines.forEach((ln) => {
      ctx.fillText(ln, x, cursorY)
      cursorY += subLH
    })
  }

  // 署名
  if (author.value.trim()) {
    ctx.fillStyle = authorColor.value
    optimizeTextRendering(ctx, authorSize.value, '400')
    const ay = h - margin.value - authorSize.value
    ctx.fillText(author.value, w / 2, ay)
  }

  // 显示辅助线（预览用）
  ctx.strokeStyle = 'rgba(16,185,129,0.8)'
  ctx.lineWidth = 2
  ctx.setLineDash([8, 8])
  ctx.strokeRect(margin.value, margin.value, w - margin.value * 2, h - margin.value * 2)
  ctx.setLineDash([])
}

function exportPNG() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  // 创建临时canvas，不包含辅助线
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')!
  const w = outputWidth.value
  const h = outputHeight.value
  const dpr = Math.max(4, Math.floor(window.devicePixelRatio || 4))
  
  tempCanvas.width = w * dpr
  tempCanvas.height = h * dpr
  tempCtx.scale(dpr, dpr)
  
  // 设置CSS属性优化渲染
  tempCanvas.style.imageRendering = 'auto'
  ;(tempCanvas.style as any).fontSmooth = 'antialiased'
  ;(tempCanvas.style as any).webkitFontSmoothing = 'antialiased'
  ;(tempCanvas.style as any).mozOsxFontSmoothing = 'grayscale'
  
  // 启用高质量渲染
  tempCtx.imageSmoothingEnabled = true
  tempCtx.imageSmoothingQuality = 'high'
  
  // 设置文字渲染属性
  tempCtx.textBaseline = 'top'
  tempCtx.textAlign = 'center'
  
  // 重新绘制背景（不包含辅助线）
  if (templateType.value === 'image-overlay' && bgImg) {
    const iw = bgImg.width
    const ih = bgImg.height
    const scale = Math.max(w / iw, h / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (w - dw) / 2
    const dy = (h - dh) / 2
    tempCtx.drawImage(bgImg, dx, dy, dw, dh)
    tempCtx.fillStyle = `rgba(0,0,0,${overlayAlpha.value})`
    tempCtx.fillRect(0, 0, w, h)
  } else {
    let grad: CanvasGradient | null = null
    if ((templateType.value === 'gradient' || templateType.value === 'block' || templateType.value === 'white-card') && backgroundMode.value === 'preset') {
      const presetStyle = gradientPresets[selectedPresetIndex.value]?.style
      if (presetStyle) {
        grad = buildCanvasGradientFromStyle(tempCtx, w, h, presetStyle)
      }
    }
    if (!grad) {
      grad = tempCtx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, bgColor1.value)
      grad.addColorStop(1, bgColor2.value)
    }
    tempCtx.fillStyle = grad
    tempCtx.fillRect(0, 0, w, h)

    if (templateType.value === 'block') {
      const blockW = Math.round(w * 0.24)
      tempCtx.fillStyle = accentColor.value
      tempCtx.fillRect(0, 0, blockW, h)
    } else if (templateType.value === 'white-card') {
      // 白色圆角卡片模板
      // 使用预设或自定义背景渐变
      tempCtx.fillStyle = grad
      tempCtx.fillRect(0, 0, w, h)
      
      // 绘制白色圆角卡片
      const cardPadding = Math.round(w * 0.08) // 卡片边距
      const cardX = cardPadding
      const cardY = cardPadding
      const cardW = w - cardPadding * 2
      const cardH = h - cardPadding * 2
      const cardRadius = Math.round(w * 0.02) // 圆角半径
      
      // 绘制圆角矩形
      tempCtx.fillStyle = accentColor.value
      tempCtx.beginPath()
      tempCtx.roundRect(cardX, cardY, cardW, cardH, cardRadius)
      tempCtx.fill()
    }
  }
  
  // 重新绘制文字（不包含辅助线）
  const left = margin.value
  const right = w - margin.value
  const top = margin.value
  const maxTextWidth = right - left

  tempCtx.fillStyle = titleColor.value
  tempCtx.textBaseline = 'top'

  const isTitleEmpty = !title.value.trim()
  const isSubtitleEmpty = !subtitle.value.trim()
  const centerBoth = !isTitleEmpty && !isSubtitleEmpty
  const x = w / 2
  tempCtx.textAlign = 'center'

  // 标题 - 使用优化渲染
  optimizeTextRendering(tempCtx, titleSize.value, '700')
  const titleWrapWidth = Math.round(maxTextWidth * 0.9)
  const titleLines = wrapText(tempCtx, title.value, titleWrapWidth)
  const titleLH = Math.round(titleSize.value * 1.2)
  const titleHeight = titleLines.length * titleLH

  let subLines: string[] = []
  const subLH = Math.round(subtitleSize.value * 1.5)
  if (!isSubtitleEmpty) {
    optimizeTextRendering(tempCtx, subtitleSize.value, '500')
    const subWrapWidth = Math.round(maxTextWidth * 0.9)
    subLines = wrapText(tempCtx, subtitle.value, subWrapWidth)
  }

  const safeH = h - margin.value * 2
  let cursorY: number
  if (centerBoth) {
    const totalH = titleHeight + subLines.length * subLH
    cursorY = top + Math.round((safeH - totalH) / 2)
  } else if (isSubtitleEmpty && !isTitleEmpty) {
    cursorY = top + Math.round((safeH - titleHeight) / 2)
  } else {
    cursorY = top
  }

  // 绘制标题 - 使用优化渲染和独立颜色
  tempCtx.fillStyle = titleColor.value
  optimizeTextRendering(tempCtx, titleSize.value, '700')
  titleLines.forEach((ln) => {
    tempCtx.fillText(ln, x, cursorY)
    cursorY += titleLH
  })

  // 绘制副标题
  if (!isSubtitleEmpty) {
    tempCtx.fillStyle = subtitleColor.value
    optimizeTextRendering(tempCtx, subtitleSize.value, '500')
    subLines.forEach((ln) => {
      tempCtx.fillText(ln, x, cursorY)
      cursorY += subLH
    })
  }

  // 署名
  if (author.value.trim()) {
    tempCtx.fillStyle = authorColor.value
    optimizeTextRendering(tempCtx, authorSize.value, '400')
    const ay = h - margin.value - authorSize.value
    tempCtx.fillText(author.value, w / 2, ay)
  }
  
  // 导出无辅助线的图片
  const dataURL = tempCanvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = dataURL
  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  a.download = `wx-cover-${outputWidth.value}x${outputHeight.value}-${ts}.png`
  a.click()
}

// 监听变更，自动重绘
watch([title, subtitle, author, titleSize, subtitleSize, authorSize, titleColor, subtitleColor, authorColor, templateType, bgColor1, bgColor2, accentColor, overlayAlpha, selectedPresetIndex, backgroundMode], () => {
  nextTick(draw)
}, { immediate: true })

onMounted(() => {
  draw()
})
</script>

<style scoped>
/* 预览中的安全区辅助线容器 */
</style>