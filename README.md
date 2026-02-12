# Beautify Feng Shui Web

商业化户型图风水分析网站（Next.js + OpenRouter + 高德 + Stripe + Railway）。

## 功能
- 上传户型图并输入地理信息、住户人数
- 调用 OpenRouter 的视觉模型进行小区与户型分析
- Prompt 集中管理在 `packages/prompts`
- 商业化开关 `COMMERCIAL_MODE`
- Stripe 支付解锁完整报告
- 中英文切换、法律页面（Terms/Privacy/FAQ/Disclaimer）

## 本地运行
```bash
npm install
npm run dev
```

## Railway 环境变量
参考 `.env.example`。
