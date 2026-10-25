// Счётчик воронки: только число открытий страницы и кликов по главным кнопкам — без cookies и личных данных.
// Значения читает аналитика панели (блок «Воронка лид-магнита»).
(function () {
  var s = document.currentScript, page = s && s.getAttribute('data-page');
  if (!page || navigator.webdriver || /bot|crawl|spider|preview|headless/i.test(navigator.userAgent)) { return; }
  var NS = 'pvl-seo-diagnostic';
  function hit(key) {
    try { fetch('https://abacus.jasoncameron.dev/hit/' + NS + '/' + key, { mode: 'cors', keepalive: true }).catch(function () {}); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-count]');
    if (a) { hit(page + '-' + a.getAttribute('data-count')); }
  });
  // одно открытие на вкладку: перезагрузки не накручивают счётчик
  try {
    if (sessionStorage.getItem('v:' + page)) { return; }
    sessionStorage.setItem('v:' + page, '1');
  } catch (e) {}
  hit(page + '-view');
  if (/threads\.(net|com)/i.test(document.referrer || '') || /utm_source=threads/i.test(location.search)) { hit(page + '-view-threads'); }
})();
