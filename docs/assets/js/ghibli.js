/* ============================================================
   🌿 吉卜力双主题动画 — 深度优化版
   亮模式：落叶、花瓣、羽毛、云朵
   暗模式：萤火虫、星光、月光粒子
   ============================================================ */

(function () {
  'use strict';

  // ---- 粒子池 ----
  const dayParticles = [
    { emoji: '🍃', weight: 3, size: [14, 22] },
    { emoji: '🌸', weight: 2, size: [12, 18] },
    { emoji: '🌾', weight: 1, size: [10, 16] },
    { emoji: '🪶', weight: 1, size: [12, 20] },
    { emoji: '🍀', weight: 1, size: [12, 18] },
    { emoji: '🌱', weight: 1, size: [10, 16] },
    { emoji: '🕊️', weight: 0.5, size: [16, 24] },
    { emoji: '☁️', weight: 0.5, size: [20, 30] }
  ];

  const nightParticles = [
    { emoji: '✨', weight: 3, size: [8, 14] },
    { emoji: '💫', weight: 2, size: [10, 16] },
    { emoji: '🌟', weight: 1, size: [10, 18] },
    { emoji: '🪔', weight: 1, size: [10, 16] },
    { emoji: '🔥', weight: 0.5, size: [8, 14] },
    { emoji: '⭐', weight: 2, size: [8, 14] }
  ];

  const MAX_PARTICLES = 18;
  let currentTheme = 'day';
  let particleInterval = null;

  function detectTheme() {
    return document.documentElement.getAttribute('data-md-color-scheme') === 'slate' ? 'night' : 'day';
  }

  function weightedRandom(pool) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of pool) {
      random -= item.weight;
      if (random <= 0) return item;
    }
    return pool[0];
  }

  function getParticles() {
    return currentTheme === 'night' ? nightParticles : dayParticles;
  }

  function createParticle() {
    const pool = getParticles();
    const selected = weightedRandom(pool);
    const el = document.createElement('div');
    el.className = 'ghibli-particle';
    el.textContent = selected.emoji;

    const sizeRange = selected.size;
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];

    el.style.left = (Math.random() * 92 + 4) + '%';
    el.style.top = '108%';
    el.style.fontSize = size + 'px';

    if (currentTheme === 'night') {
      el.style.animationDuration = (Math.random() * 8 + 10) + 's';
      el.style.animationDelay = (Math.random() * 4) + 's';
      // 萤火虫随机闪烁
      el.style.animationName = Math.random() > 0.5 ? 'floatFirefly' : 'floatFireflyAlt';
    } else {
      el.style.animationDuration = (Math.random() * 10 + 14) + 's';
      el.style.animationDelay = (Math.random() * 6) + 's';
      // 轻微的摇摆变化
      el.style.setProperty('--sway', (Math.random() * 30 - 15) + 'px');
    }

    // 随机透明度
    el.style.opacity = (Math.random() * 0.3 + 0.4).toString();

    document.body.appendChild(el);

    el.addEventListener('animationend', function () {
      el.remove();
    });
  }

  // 初始化粒子
  function initParticles() {
    currentTheme = detectTheme();
    document.querySelectorAll('.ghibli-particle').forEach(function (el) { el.remove(); });

    const initialCount = currentTheme === 'night' ? 10 : 8;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(createParticle, i * 300);
    }
  }

  function startParticleLoop() {
    if (particleInterval) clearInterval(particleInterval);
    particleInterval = setInterval(function () {
      const now = detectTheme();
      if (now !== currentTheme) {
        currentTheme = now;
        document.querySelectorAll('.ghibli-particle').forEach(function (el) { el.remove(); });
        // 主题切换时添加一批新粒子
        for (let i = 0; i < 5; i++) {
          setTimeout(createParticle, i * 200);
        }
      }
      if (document.querySelectorAll('.ghibli-particle').length < MAX_PARTICLES) {
        createParticle();
      }
    }, currentTheme === 'night' ? 1500 : 2000);
  }

  initParticles();
  startParticleLoop();

  // ---- 主题切换平滑过渡 ----
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'data-md-color-scheme') {
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(function () {
          document.documentElement.classList.remove('theme-transitioning');
        }, 600);

        // 重新启动粒子循环
        setTimeout(function () {
          startParticleLoop();
        }, 100);
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // ---- 加载动画 — 植物发芽式入场 ----
  function animateIn() {
    // 卡片元素
    const cards = document.querySelectorAll('.ghibli-card, .md-typeset table, .md-typeset pre, .md-typeset blockquote');
    cards.forEach(function (card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px) scale(0.98)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 100 + index * 80);
    });

    // 标题
    const headings = document.querySelectorAll('.md-typeset h1, .md-typeset h2');
    headings.forEach(function (h, i) {
      h.style.opacity = '0';
      h.style.transform = 'translateX(-15px)';
      h.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(function () {
        h.style.opacity = '1';
        h.style.transform = 'translateX(0)';
      }, 200 + i * 70);
    });

    // 技能条动画
    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach(function (fill, i) {
      const width = fill.getAttribute('data-width') || fill.style.width || '80%';
      fill.style.width = '0%';
      setTimeout(function () {
        fill.style.width = width;
      }, 600 + i * 120);
    });

    // 列表项渐入
    const listItems = document.querySelectorAll('.md-typeset li');
    listItems.forEach(function (li, i) {
      li.style.opacity = '0';
      li.style.transform = 'translateX(-8px)';
      li.style.transition = 'all 0.4s ease';
      setTimeout(function () {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
      }, 400 + i * 30);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateIn);
  } else {
    animateIn();
  }

  // 主题切换时重新动画
  const themeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'data-md-color-scheme') {
        setTimeout(animateIn, 150);
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // ---- 返回顶部按钮 ----
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', '返回顶部');
  backToTop.title = '回到顶部';
  backToTop.textContent = '☁️';
  document.body.appendChild(backToTop);

  function updateBackToTopIcon() {
    backToTop.textContent = detectTheme() === 'night' ? '🌙' : '☁️';
  }
  updateBackToTopIcon();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let scrollTimeout;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
    updateBackToTopIcon();

    // 滚动时的视差效果（仅桌面端）
    if (window.innerWidth > 768) {
      clearTimeout(scrollTimeout);
      requestAnimationFrame(function () {
        const scrolled = window.scrollY;
        const particles = document.querySelectorAll('.ghibli-particle');
        particles.forEach(function (p, i) {
          const speed = 0.02 + (i % 3) * 0.01;
          p.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
      });
    }
  }, { passive: true });

  // ---- 鼠标跟随光晕效果（仅暗色模式）----
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;pointer-events:none;z-index:0;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,224,138,0.08) 0%,transparent 70%);transform:translate(-50%,-50%);transition:opacity 0.5s ease;opacity:0;';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (detectTheme() === 'night') {
        glow.style.opacity = '1';
      } else {
        glow.style.opacity = '0';
      }
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ---- 卡片悬停光效 ----
  document.addEventListener('mouseover', function (e) {
    const card = e.target.closest('.ghibli-card');
    if (card && window.innerWidth > 768) {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
    }
  });

})();
