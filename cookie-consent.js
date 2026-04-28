/* ================================================================
   TNT AGENCY — cookie-consent.js
   GDPR-compliant cookie consent (Google Consent Mode v2)
   ================================================================ */
console.log('Cookie consent script loaded');
console.log('Stored cookie consent:', localStorage.getItem('cookieConsent'));

(function () {
  'use strict';

  var CONSENT_KEY = 'cookieConsent';

  /* ---------------------------------------------------------------
     gtag consent update helper
     Works even if GA is not yet loaded (gtag() stub is inline)
  --------------------------------------------------------------- */
  function updateGtag(analyticsGranted, adGranted) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage:  analyticsGranted ? 'granted' : 'denied',
        ad_storage:         adGranted        ? 'granted' : 'denied',
        ad_user_data:       adGranted        ? 'granted' : 'denied',
        ad_personalization: adGranted        ? 'granted' : 'denied',
      });
    }
  }

  /* ---------------------------------------------------------------
     Storage helpers
  --------------------------------------------------------------- */
  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveConsent(analytics, ads) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        analytics: analytics,
        ads:       ads,
        ts:        Date.now()
      }));
    } catch (e) {}
  }

  /* ---------------------------------------------------------------
     Actions
  --------------------------------------------------------------- */
  function acceptAll() {
    saveConsent('granted', 'granted');
    updateGtag(true, true);
    hideBanner();
    hideModal();
  }

  function rejectAll() {
    saveConsent('denied', 'denied');
    updateGtag(false, false);
    hideBanner();
    hideModal();
  }

  function saveCustom() {
    var analyticsEl = document.getElementById('cc-analytics');
    var adsEl       = document.getElementById('cc-ads');
    var analytics   = analyticsEl && analyticsEl.checked ? 'granted' : 'denied';
    var ads         = adsEl       && adsEl.checked       ? 'granted' : 'denied';
    saveConsent(analytics, ads);
    updateGtag(analytics === 'granted', ads === 'granted');
    hideBanner();
    hideModal();
  }

  /* ---------------------------------------------------------------
     Banner
  --------------------------------------------------------------- */
  function showBanner() {
    if (document.getElementById('cookie-banner')) return;

    var el = document.createElement('div');
    el.id = 'cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');
    el.setAttribute('aria-modal', 'false');
    el.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<strong>We use cookies</strong>' +
          '<p>We use cookies to improve your experience and analyse site traffic, in accordance with our ' +
          '<a href="/cookies.html">Cookie Policy</a>. You can accept all, reject all, or customise your preferences.</p>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" id="cc-reject-banner"    class="cookie-btn cookie-btn--reject">Reject all</button>' +
          '<button type="button" id="cc-customize-banner" class="cookie-btn cookie-btn--customize">Customize</button>' +
          '<button type="button" id="cc-accept-banner"    class="cookie-btn cookie-btn--accept">Accept all</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);

    document.getElementById('cc-accept-banner').addEventListener('click', acceptAll);
    document.getElementById('cc-reject-banner').addEventListener('click', rejectAll);
    document.getElementById('cc-customize-banner').addEventListener('click', openModal);

    /* animate in on next frame */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add('cookie-banner--visible');
      });
    });
  }

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.classList.remove('cookie-banner--visible');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  /* ---------------------------------------------------------------
     Modal
  --------------------------------------------------------------- */
  function openModal() {
    if (document.getElementById('cookie-modal')) {
      document.getElementById('cookie-modal').classList.add('cookie-modal--visible');
      return;
    }

    var consent         = getConsent();
    var analyticsChecked = consent && consent.analytics === 'granted' ? ' checked' : '';
    var adsChecked       = consent && consent.ads       === 'granted' ? ' checked' : '';

    var el = document.createElement('div');
    el.id = 'cookie-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Cookie settings');
    el.innerHTML =
      '<div class="cookie-modal__overlay"></div>' +
      '<div class="cookie-modal__dialog">' +
        '<div class="cookie-modal__header">' +
          '<h2>Cookie settings</h2>' +
          '<button type="button" class="cookie-modal__close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="cookie-modal__body">' +

          '<div class="cookie-category">' +
            '<div class="cookie-category__header">' +
              '<div><strong>Necessary cookies</strong>' +
              '<p>Required for the website to function. These cannot be disabled.</p></div>' +
              '<span class="cookie-toggle cookie-toggle--always">Always on</span>' +
            '</div>' +
          '</div>' +

          '<div class="cookie-category">' +
            '<div class="cookie-category__header">' +
              '<div><strong>Analytics cookies</strong>' +
              '<p>Help us understand how visitors interact with the site (e.g. Google Analytics).</p></div>' +
              '<label class="cookie-toggle">' +
                '<input type="checkbox" id="cc-analytics"' + analyticsChecked + '>' +
                '<span class="cookie-toggle__slider"></span>' +
              '</label>' +
            '</div>' +
          '</div>' +

          '<div class="cookie-category">' +
            '<div class="cookie-category__header">' +
              '<div><strong>Marketing cookies</strong>' +
              '<p>Used for targeted advertising and measuring ad performance.</p></div>' +
              '<label class="cookie-toggle">' +
                '<input type="checkbox" id="cc-ads"' + adsChecked + '>' +
                '<span class="cookie-toggle__slider"></span>' +
              '</label>' +
            '</div>' +
          '</div>' +

        '</div>' +
        '<div class="cookie-modal__footer">' +
          '<button type="button" id="cc-modal-reject" class="cookie-btn cookie-btn--reject">Reject all</button>' +
          '<button type="button" id="cc-modal-save"   class="cookie-btn cookie-btn--save">Save preferences</button>' +
          '<button type="button" id="cc-modal-accept" class="cookie-btn cookie-btn--accept">Accept all</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);

    el.querySelector('.cookie-modal__close').addEventListener('click', hideModal);
    el.querySelector('.cookie-modal__overlay').addEventListener('click', hideModal);
    document.getElementById('cc-modal-reject').addEventListener('click', rejectAll);
    document.getElementById('cc-modal-accept').addEventListener('click', acceptAll);
    document.getElementById('cc-modal-save').addEventListener('click', saveCustom);

    /* trap Escape key */
    el._keyHandler = function (e) { if (e.key === 'Escape') hideModal(); };
    document.addEventListener('keydown', el._keyHandler);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add('cookie-modal--visible');
      });
    });
  }

  function hideModal() {
    var el = document.getElementById('cookie-modal');
    if (!el) return;
    if (el._keyHandler) document.removeEventListener('keydown', el._keyHandler);
    el.classList.remove('cookie-modal--visible');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }

  /* ---------------------------------------------------------------
     Public API
  --------------------------------------------------------------- */
  window.openCookieSettings = function () { openModal(); };

  /* ---------------------------------------------------------------
     Init — run after DOM is ready
  --------------------------------------------------------------- */
  function init() {
    var consent = getConsent();
    if (consent) {
      /* Returning visitor — apply stored consent immediately */
      updateGtag(consent.analytics === 'granted', consent.ads === 'granted');
    } else {
      /* First-time visitor — show banner */
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
