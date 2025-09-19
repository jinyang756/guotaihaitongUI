// 验证逻辑
console.log('Verification script loaded');

function initVerification() {
  console.log('Initializing verification overlay');
  // 创建验证覆盖层
  const verificationOverlay = document.createElement('div');
  verificationOverlay.id = 'verification-overlay';
  verificationOverlay.className = 'fixed inset-0 bg-gradient-to-br from-primary to-dark z-50 flex items-center justify-center';
  
  // 设置验证覆盖层的HTML内容
  verificationOverlay.innerHTML = `
    <style>
      .main-container {
        width: 100%;
        max-width: 600px;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      
      .verification-card {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 15px 15px 0 0;
        padding: 40px 30px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
      }
      
      .strategy-card {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 0 0 15px 15px;
        padding: 25px 30px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        position: relative;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .verification-card::before,
      .verification-card::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, transparent, #007bff, #007bff);
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
        z-index: 0;
      }
      
      .verification-card::after {
        animation-delay: -3s;
      }
      
      @keyframes animate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .form {
        position: relative;
        z-index: 10;
      }
      
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      
      .logo h1 {
        color: #fff;
        font-size: 26px;
        margin-bottom: 5px;
      }
      
      .logo p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
      
      .strategy-slogan {
        position: relative;
        z-index: 10;
        text-align: center;
      }
      
      .strategy-slogan .english {
        color: #00b4ff;
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 10px;
        font-weight: 300;
      }
      
      .strategy-slogan .chinese {
        color: rgba(255, 255, 255, 0.9);
        font-size: 15px;
        line-height: 1.7;
      }
      
      .strategy-slogan .keywords {
        color: #40a9ff;
        font-weight: 500;
      }
      
      .input-group {
        position: relative;
        margin-bottom: 25px;
      }
      
      .input-group i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.7);
        z-index: 1;
      }
      
      .input-group input {
        width: 100%;
        padding: 15px 15px 15px 45px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        outline: none;
        border-radius: 8px;
        color: #fff;
        font-size: 16px;
        position: relative;
        z-index: 1;
      }
      
      .input-group input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      
      .btn {
        width: 100%;
        padding: 15px;
        background: #007bff;
        border: none;
        outline: none;
        border-radius: 8px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s;
        position: relative;
        z-index: 1;
      }
      
      .btn:hover {
        background: #0056b3;
        transform: translateY(-2px);
      }
      
      .btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
        transform: none;
      }
      
      .error {
        color: #ff4d4f;
        font-size: 14px;
        margin-top: 5px;
        display: none;
        animation: fadeIn 0.3s;
      }
      
      .success {
        display: none;
        text-align: center;
        color: #fff;
        margin-top: 20px;
        animation: fadeIn 0.5s;
      }
      
      .success i {
        font-size: 40px;
        margin-bottom: 10px;
        color: #52c41a;
        animation: scaleIn 0.5s;
      }
      
      .success p {
        font-size: 16px;
      }
      
      .loading {
        display: none;
        text-align: center;
        color: #fff;
        margin-top: 20px;
      }
      
      .loading i {
        font-size: 20px;
        animation: spin 1s linear infinite;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 480px) {
        .verification-card {
          padding: 30px 20px;
        }
        
        .strategy-card {
          padding: 20px 15px;
        }
        
        .logo h1 {
          font-size: 22px;
        }
        
        .strategy-slogan .english,
        .strategy-slogan .chinese {
          font-size: 13px;
        }
      }
    </style>
    <div class="main-container">
      <div class="verification-card">
        <div class="form">
          <div class="logo">
            <h1>国泰海通证裕投资</h1>
            <p>Guotai Haitong Zhengyu Investment</p>
          </div>
          
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input type="text" id="enterpriseCode" placeholder="请输入4位数字企业码">
          </div>
          <div class="error" id="errorMsg">企业码错误，请重新输入</div>
          <div class="loading" id="loading">
            <i class="fas fa-spinner"></i>
            <span>验证中...</span>
          </div>
          <button class="btn" id="verifyBtn">验证登录</button>
          <div class="success" id="success">
            <i class="fas fa-check-circle"></i>
            <p>验证成功，即将进入网站...</p>
          </div>
        </div>
      </div>
      
      <div class="strategy-card">
        <div class="strategy-slogan">
          <div class="english">
            Accelerate Building towards Top-Tier Investment Bank<br>
            with International Competitiveness and Market Leadership
          </div>
          <div class="chinese">
            以 <span class="keywords">"新战略"</span> <span class="keywords">"新文化"</span> <span class="keywords">"新架构"</span> 绘就高质量发展新蓝图，<br>
            加快打造具备国际竞争力与市场引领力的一流投资银行。
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 添加覆盖层到文档
  document.body.appendChild(verificationOverlay);
  
  // 初始化验证逻辑
  const enterpriseCodeInput = document.getElementById('enterpriseCode');
  const verifyBtn = document.getElementById('verifyBtn');
  const errorMsg = document.getElementById('errorMsg');
  const success = document.getElementById('success');
  const loading = document.getElementById('loading');
  
  // 获取当前部署的基础URL，支持本地开发和生产环境
  const getBaseUrl = () => {
    // 本地开发环境
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return window.location.origin;
    }
    // 生产环境
    return window.location.origin;
  };
  
  // 输入限制：只允许数字且最多4位
  enterpriseCodeInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
    errorMsg.style.display = 'none';
  });
  
  // 验证按钮点击事件 - 通过API调用进行验证
  verifyBtn.addEventListener('click', async function() {
    const inputCode = enterpriseCodeInput.value.trim();
    
    // 基本验证
    if (!inputCode || inputCode.length !== 4 || !/^\d+$/.test(inputCode)) {
      errorMsg.textContent = '请输入4位数字企业码';
      errorMsg.style.display = 'block';
      return;
    }
    
    // 显示加载状态
    verifyBtn.disabled = true;
    verifyBtn.textContent = '验证中...';
    loading.style.display = 'block';
    errorMsg.style.display = 'none';
    
    try {
      // 调用Vercel Serverless Function进行验证
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: inputCode })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 验证成功
        loading.style.display = 'none';
        document.querySelector('.input-group').style.display = 'none';
        verifyBtn.style.display = 'none';
        success.style.display = 'block';
        
        // 模拟延迟后显示网站内容
        setTimeout(function() {
          verificationOverlay.style.opacity = '0';
          verificationOverlay.style.transition = 'opacity 0.5s ease-out';
          setTimeout(function() {
            verificationOverlay.style.display = 'none';
            // 确保网站内容可访问
            document.querySelectorAll('.page-content').forEach(page => {
              page.style.pointerEvents = 'auto';
            });
          }, 500);
        }, 2000);
      } else {
        // 验证失败
        loading.style.display = 'none';
        errorMsg.textContent = data.message || '企业码错误，请重新输入';
        errorMsg.style.display = 'block';
        
        // 输入框抖动效果
        enterpriseCodeInput.style.animation = 'shake 0.5s';
        setTimeout(function() {
          enterpriseCodeInput.style.animation = '';
        }, 500);
      }
    } catch (error) {
      // 网络错误处理
      console.error('验证请求失败:', error);
      loading.style.display = 'none';
      errorMsg.textContent = '验证过程中出现错误，请检查网络连接后重试';
      errorMsg.style.display = 'block';
    } finally {
      // 恢复按钮状态
      verifyBtn.disabled = false;
      verifyBtn.textContent = '验证登录';
    }
  });
  
  // 支持回车键提交
  enterpriseCodeInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      verifyBtn.click();
    }
  });
  
  // 阻止网站内容被点击
  document.querySelectorAll('.page-content').forEach(page => {
    page.style.pointerEvents = 'none';
  });
}

// 页面加载完成后初始化验证
console.log('Checking document ready state:', document.readyState);
if (document.readyState === 'loading') {
  console.log('Waiting for DOMContentLoaded event');
  document.addEventListener('DOMContentLoaded', initVerification);
} else {
  console.log('Document already loaded, initializing verification');
  initVerification();
}