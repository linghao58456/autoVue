*@Author: hao.ling
*@Date: 2020/11/19 14:59
*@Annotation: 验证码

<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"/>
  </div>
</template>

<script>
export default {
  name: "verificationCode",
  props: {
    // 验证码
    identifyCode: {
      type: String,
      default: "1234"
    },
    // 字体最小值
    fontSizeMin: {
      type: Number,
      default: 35
    },
    // 字体最大值
    fontSizeMax: {
      type: Number,
      default: 35
    },
    // 背景色最小值
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    // 背景色最大值
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    // 颜色最小值
    colorMin: {
      type: Number,
      default: 50
    },
    // 颜色最大值
    colorMax: {
      type: Number,
      default: 160
    },
    // 行颜色最小值
    lineColorMin: {
      type: Number,
      default: 100
    },
    // 行颜色最大值
    lineColorMax: {
      type: Number,
      default: 200
    },
    // 点颜色最小值
    dotColorMin: {
      type: Number,
      default: 0
    },
    // 点颜色最大值
    dotColorMax: {
      type: Number,
      default: 255
    },
    // 宽度
    contentWidth: {
      type: Number,
      default: 120
    },
    // 高度
    contentHeight: {
      type: Number,
      default: 40
    }
  },
  methods: {
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成随机颜色
    randomColor(min, maX) {
      let r = this.randomNum(min, maX)
      let g = this.randomNum(min, maX)
      let b = this.randomNum(min, maX)
      return "rgb(" + r + "," + g + "," + b + ")"
    },
    // 透明度
    transparent() {
      return "rgb(255,255,255)"
    },
    // 绘制图片
    drawPic() {
      let canvas = document.getElementById("s-canvas")
      let ctx = canvas.getContext("2d")
      ctx.textBaseline = "bottom"
      ctx.fillStyle = this.transparent()
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
    },
    // 绘制文字
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei"
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      const deg = this.randomNum(-10, 10)
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    // 绘制行
    drawLine(ctx) {
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },
    // 绘制点
    drawDot(ctx) {
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  },
  watch: {
    identifyCode() {
      this.drawPic()
    }
  },
  mounted() {
    this.drawPic()
  }
}
</script>

<style scoped>

</style>