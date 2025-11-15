// ナビゲーションのアクティブリンク制御
(function () {
  // body の data-page 属性から現在のページを取得
  var currentPage = document.body.dataset.page;
  var navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(function (link) {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });

  // スマホ向けハンバーガーメニューの開閉処理
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
  }
})();

// フォトギャラリーモーダル処理
(function () {
  var overlay = document.querySelector('.modal-overlay');
  if (!overlay) return; // HOME 以外では処理しない

  var overlayImage = overlay.querySelector('.modal-image');
  var overlayCaption = overlay.querySelector('.modal-caption');
  var closeButton = overlay.querySelector('.modal-close');

  var openModal = function (imgEl) {
    overlayImage.src = imgEl.dataset.full || imgEl.src;
    overlayImage.alt = imgEl.alt || '';
    overlayCaption.textContent = imgEl.dataset.caption || imgEl.alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  var closeModal = function () {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-modal-image]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      openModal(thumb);
    });
  });

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
})();

// メンバー紹介のポジション絞り込み
(function () {
  var filterSelect = document.querySelector('[data-member-filter]');
  var memberCards = document.querySelectorAll('[data-position]');
  if (!filterSelect || memberCards.length === 0) return;

  var updateVisibility = function () {
    var selected = filterSelect.value;
    memberCards.forEach(function (card) {
      var position = card.dataset.position;
      var shouldShow = selected === 'all' || selected === position;
      card.style.display = shouldShow ? '' : 'none';
    });
  };

  filterSelect.addEventListener('change', updateVisibility);
  updateVisibility();
})();

// お問い合わせフォームの簡易バリデーション
(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInput = form.querySelector('input[name="name"]');
    var emailInput = form.querySelector('input[name="email"]');
    var messageInput = form.querySelector('textarea[name="message"]');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('お名前とメールアドレスは必須です。');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      alert('メールアドレスの形式を確認してください。');
      return;
    }

    // 送信完了メッセージとフォームのリセット
    alert('送信ありがとうございました（このフォームはデモです）。');
    form.reset();
  });
})();
