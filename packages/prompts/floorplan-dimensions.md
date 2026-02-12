---
name: floorplan-dimensions
model: gemini-vision-via-openrouter
purpose: 户型多维度分析
version: 1.0.0
---
从以下维度进行评分与解释：朝向采光、动线气流、入户缓冲、客厅聚气、厨卫关系、卧室私密性、人数匹配度、财位文昌位。
输出 JSON，每个维度需包含 score, summary, action_items。
