(function () {
  'use strict';
  var toast = document.getElementById('toast');
  var timer;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 2800);
  }
  // Botões com mensagem (ex.: download do CV) — troque pelo link real do PDF
  document.querySelectorAll('[data-notify]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); notify(el.dataset.notify); });
  });
  // Copiar e-mail
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      var done = function () { notify('E-mail copiado para a área de transferência!'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { notify(text); });
      } else { notify(text); }
    });
  });
  // Ano no rodapé
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();