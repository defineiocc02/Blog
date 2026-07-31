/* ============================================================
   🌿 吉卜力双主题脚本 — 最终稳定版
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. 粒子系统 — 低z-index，不遮挡交互
  // ==========================================
  const dayParticles = [
    { emoji: '🍃', weight: 3 },
    { emoji: '🌸', weight: 2 },
    { emoji: '🌾', weight: 1 },
    { emoji: '🪶', weight: 1 },
    { emoji: '🍀', weight: 1 },
    { emoji: '🌱', weight: 1 }
  ];
  const nightParticles = [
    { emoji: '✨', weight: 4 },
    { emoji: '💫', weight: 2 },
    { emoji: '🌟', weight: 1 },
    { emoji: '⭐', weight: 2 }
  ];

  const MAX_PARTICLES = 12;
  let currentTheme = 'day';
  let particleInterval = null;

  function detectTheme() {
    return document.documentElement.getAttribute('data-md-color-scheme') === 'slate' ? 'night' : 'day';
  }

  function getWeightedParticle(pool) {
    const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const p of pool) {
      rand -= p.weight;
      if (rand <= 0) return p.emoji;
    }
    return pool[0].emoji;
  }

  function createParticle() {
    const existing = document.querySelectorAll('.ghibli-particle');
    if (existing.length >= MAX_PARTICLES) return;

    const pool = currentTheme === 'night' ? nightParticles : dayParticles;
    const el = document.createElement('div');
    el.className = 'ghibli-particle';
    el.textContent = getWeightedParticle(pool);
    el.style.left = (Math.random() * 96 + 2) + '%';
    el.style.top = '102%';
    el.style.fontSize = (Math.random() * 18 + 14) + 'px';
    el.style.animationDuration = (Math.random() * 12 + 14) + 's';
    el.style.animationDelay = (Math.random() * 3) + 's';

    // 暗色模式萤火虫：更小、更亮、随机使用两种动画
    if (currentTheme === 'night') {
      el.style.fontSize = (Math.random() * 8 + 8) + 'px';
      el.style.animationDuration = (Math.random() * 8 + 10) + 's';
      if (Math.random() > 0.5) {
        el.style.animationName = 'floatFireflyAlt';
      }
    }

    document.body.appendChild(el);
    el.addEventListener('animationend', function () {
      el.remove();
    });
  }

  function startParticles() {
    if (particleInterval) clearInterval(particleInterval);
    // 初始生成几个
    for (let i = 0; i < 3; i++) {
      setTimeout(createParticle, i * 800);
    }
    particleInterval = setInterval(createParticle, currentTheme === 'night' ? 2500 : 3000);
  }

  // 监听主题切换
  const observer = new MutationObserver(function () {
    const newTheme = detectTheme();
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      // 清除现有粒子
      document.querySelectorAll('.ghibli-particle').forEach(p => p.remove());
      // 添加过渡类
      document.body.classList.add('theme-transitioning');
      setTimeout(() => document.body.classList.remove('theme-transitioning'), 600);
      // 重启粒子
      startParticles();
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });

  currentTheme = detectTheme();
  startParticles();

  // ==========================================
  // 2. 返回顶部按钮 — 正确z-index
  // ==========================================
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', '返回顶部');
  backToTop.textContent = currentTheme === 'night' ? '🌙' : '☁️';
  backToTop.style.display = 'none';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 更新按钮图标
  function updateBackToTopIcon() {
    backToTop.textContent = currentTheme === 'night' ? '🌙' : '☁️';
  }

  const origCreateParticle = createParticle;
  const origStart = startParticles;

  // 滚动显示/隐藏
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  }, { passive: true });

  // 主题切换时更新图标
  const origObserver = observer;
  const themeCheckInterval = setInterval(function () {
    const newTheme = detectTheme();
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      updateBackToTopIcon();
    }
  }, 500);

  // ==========================================
  // 3. 技能条滚动触发动画
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length > 0) {
    // 初始宽度为0
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || bar.style.width;
      bar.setAttribute('data-target', targetWidth);
      bar.style.width = '0%';
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-target');
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ==========================================
  // 4. 卡片入场动画
  // ==========================================
  const cards = document.querySelectorAll('.ghibli-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

  setTimeout(() => {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.style.transitionDelay = (i * 0.1) + 's';
      cardObserver.observe(card);
    });
  }, 300);

  // ==========================================
  // 5. 导航链接悬停增强
  // ==========================================
  const navLinks = document.querySelectorAll('.md-nav__link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });

  // ==========================================
  // 6. 平滑滚动到锚点
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // 7. 页面加载完成后的渐入效果
  // ==========================================
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

  console.log('🌿 吉卜力森林已苏醒 — 粒子数:', MAX_PARTICLES, '当前主题:', currentTheme);
});
