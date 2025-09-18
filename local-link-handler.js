// 本地链接处理器 - 将外部URL映射到本地HTML文件
(function() {
    // URL到本地HTML文件的映射关系
    const urlMap = {
        // 主导航菜单映射
        'http://www.gtjazytz.com/content/zhengyu/index.html': 'html_pages/国泰君安证裕投资-首页.html',
        'http://www.gtjazytz.com/content/zhengyu/about.html': 'html_pages/公司简介.html',
        'http://www.gtjazytz.com/content/zhengyu/bussiness.html': 'html_pages/业务简介.html',
        'http://www.gtjazytz.com/content/zhengyu/case.html': 'html_pages/投资案例.html',
        'http://www.gtjazytz.com/content/zhengyu/notice.html': 'html_pages/公司动态.html',
        'http://www.gtjazytz.com/content/zhengyu/contact.html': 'html_pages/联系我们.html',
        'http://www.gtjazytz.com/content/zhengyu/info-open.html': 'html_pages/企业基本信息.html',
        
        // 关于我们子页面映射
        'http://www.gtjazytz.com/content/zhengyu/about/company.html': 'html_pages/公司简介.html',
        'http://www.gtjazytz.com/content/zhengyu/about/holder.html': 'html_pages/股东背景.html',
        'http://www.gtjazytz.com/content/zhengyu/about/management.html': 'html_pages/董监高.html',
        'http://www.gtjazytz.com/content/zhengyu/about/structure.html': 'html_pages/组织架构.html',
        'http://www.gtjazytz.com/content/zhengyu/about/scope.html': 'html_pages/经营范围.html',
        'http://www.gtjazytz.com/content/zhengyu/about/system.html': 'html_pages/制度建设.html',
        
        // 公司业务子页面映射
        'http://www.gtjazytz.com/content/zhengyu/bussiness/intro.html': 'html_pages/业务简介.html',
        'http://www.gtjazytz.com/content/zhengyu/bussiness/strategy.html': 'html_pages/经营理念.html',
        'http://www.gtjazytz.com/content/zhengyu/bussiness/idea.html': 'html_pages/投资理念.html',
        'http://www.gtjazytz.com/content/zhengyu/bussiness/scope.html': 'html_pages/投资领域.html',
        
        // 信息公示子页面映射
        'http://www.gtjazytz.com/content/zhengyu/info-open/basic-info.html': 'html_pages/企业基本信息.html',
        'http://www.gtjazytz.com/content/zhengyu/info-open/hr-info.html': 'html_pages/人力资源.html',
        'http://www.gtjazytz.com/content/zhengyu/info-open/culture-info.html': 'html_pages/企业文化.html',
        'http://www.gtjazytz.com/content/zhengyu/info-open/esg-info.html': 'html_pages/社会责任.html',
        'http://www.gtjazytz.com/content/zhengyu/info-open/ir-info.html': 'html_pages/投资者关系.html',
        
        // 投资案例相关映射
        'http://www.gtjazytz.com/content/zhengyu/case/case.html': 'html_pages/投资案例.html',
        
        // 联系我们相关映射
        'http://www.gtjazytz.com/content/zhengyu/contact/contactus.html': 'html_pages/联系我们.html'
    };
    
    // 辅助函数：获取URL的基础部分（去除查询参数和锚点）
    function getBaseUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            return urlObj.origin + urlObj.pathname;
        } catch (e) {
            return url.split('?')[0].split('#')[0];
        }
    }
    
    // 辅助函数：查找最匹配的URL
    function findMatchingUrl(url) {
        const baseUrl = getBaseUrl(url);
        
        // 精确匹配
        if (urlMap[baseUrl]) {
            return urlMap[baseUrl];
        }
        
        // 模糊匹配（查找包含关系）
        for (const [key, value] of Object.entries(urlMap)) {
            if (baseUrl.includes(key)) {
                return value;
            }
        }
        
        // 根据URL路径推测最可能的HTML文件
        if (url.includes('about')) return '公司简介.html';
        if (url.includes('bussiness')) return '业务简介.html';
        if (url.includes('case')) return '投资案例.html';
        if (url.includes('notice')) return '公司动态.html';
        if (url.includes('contact')) return '联系我们.html';
        if (url.includes('info-open')) return '企业基本信息.html';
        
        return null;
    }
    
    // 处理页面上所有链接
    function processLinks() {
        document.querySelectorAll('a[href]').forEach(link => {
            const originalHref = link.getAttribute('href');
            
            // 跳过javascript链接、锚点链接和已经是本地链接的链接
            if (!originalHref || 
                originalHref.startsWith('javascript:') || 
                originalHref.startsWith('#') || 
                originalHref.startsWith('./') || 
                originalHref.startsWith('/') ||
                originalHref.includes(window.location.hostname)) {
                return;
            }
            
            // 查找匹配的本地HTML文件
            const localFile = findMatchingUrl(originalHref);
            if (localFile) {
                // 存储原始链接以便需要时参考
                link.setAttribute('data-original-href', originalHref);
                
                // 更新链接为本地HTML文件
                link.setAttribute('href', localFile);
                
                // 确保target属性为_self或不设置，以确保在当前标签页打开
                if (link.getAttribute('target') === '_blank') {
                    link.setAttribute('target', '_self');
                }
            }
        });
    }
    
    // 监听页面加载完成事件
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processLinks);
    } else {
        processLinks();
    }
    
    // 监听动态内容加载（如果页面有动态内容）
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // 元素节点
                        const links = node.querySelectorAll('a[href]');
                        if (links.length) {
                            processLinks();
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();