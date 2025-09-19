// Vercel Serverless Function for verification

/**
 * 验证企业码的API端点
 * 通过这种方式，我们不在前端代码中暴露验证密码
 */
module.exports = async (req, res) => {
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

  try {
    // 解析请求体
    const { code } = req.body || {};

    // 验证输入
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        message: '请提供有效的企业码'
      });
    }

    // 这里可以实现更复杂的验证逻辑
    // 注意：在生产环境中，应该使用环境变量存储验证密码，或者从数据库中读取
    const validCode = '8265'; // 注意：在生产环境中应使用更安全的验证方法
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
      message: '验证过程中出现错误，请稍后再试'
    });
  }
}