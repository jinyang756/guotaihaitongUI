// 仅允许 POST 请求验证企业码

export default function handler(req, res) {
  // 限制请求方法
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '仅支持 POST 请求' });
  }

  // 从请求体获取企业码
  const { companyCode } = req.body;

  // 后端存储合法企业码（此处替换为你的实际有效码）
  const validCodes = ['8265']; // 可添加多个有效码，如 ['8265', '1234', '5678']
   
  // 验证逻辑
  const isValid = validCodes.includes(companyCode?.trim());

  if (isValid) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ 
      success: false, 
      message: '企业码错误，请重新输入' 
    });
  }
}