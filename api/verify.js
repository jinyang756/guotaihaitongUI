// Vercel Serverless Function for verification

/**
 * 验证企业码的API端点
 * 通过这种方式，我们不在前端代码中暴露验证密码
 */

export default async function handler(req, res) {
  try {
    // 设置CORS headers，允许前端调用
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // 只接受POST请求进行验证
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: '只支持POST请求'
      });
    }

    // 解析请求体
    let requestBody = {};
    try {
      // 适配Vercel和本地开发环境
      requestBody = req.body || {};
    } catch (error) {
      console.error('解析请求体失败:', error);
      return res.status(400).json({
        success: false,
        message: '请求格式错误'
      });
    }

    const { code } = requestBody;

    // 验证输入
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        message: '请提供有效的企业码'
      });
    }

    // 企业码验证逻辑
    const validCode = '8265';
    const isVerified = code === validCode;

    // 返回验证结果
    if (isVerified) {
      return res.status(200).json({
        success: true,
        message: '验证成功'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '企业码错误，请重新输入'
      });
    }
  } catch (error) {
    console.error('验证过程出错:', error);
    return res.status(500).json({
      success: false,
      message: '验证过程中出现错误，请稍后再试',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}