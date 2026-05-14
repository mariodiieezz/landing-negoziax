(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      var id = opener.getAttribute('data-modal-open');
      if (!id) return;
      var modal = document.getElementById(id);
      if (modal) modal.classList.add('open');
      return;
    }
    var closer = e.target.closest('.modal-close');
    if (closer) {
      e.preventDefault();
      var overlay = closer.closest('.modal-overlay');
      if (overlay) overlay.classList.remove('open');
    }
  });
})();
