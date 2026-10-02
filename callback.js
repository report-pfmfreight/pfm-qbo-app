// Shows the redirect address so it can be pasted into the terminal. Makes no network requests
// (the page's Content-Security-Policy sets connect-src 'none').
(function () {
  var params = new URLSearchParams(window.location.search);
  var show = function (id) { document.getElementById(id).hidden = false; };
  if (params.get("error")) {
    document.getElementById("error-text").textContent =
      (params.get("error_description") || params.get("error")).replace(/\+/g, " ");
    show("has-error");
    return;
  }
  if (!params.get("code") || !params.get("realmId")) {
    show("no-code");
    return;
  }
  var box = document.getElementById("full-url");
  box.value = window.location.href;
  show("has-code");
  box.focus();
  box.select();
  document.getElementById("copy").addEventListener("click", function () {
    var done = function () { document.getElementById("copied").hidden = false; };
    box.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(box.value).then(done, function () { document.execCommand("copy"); done(); });
    } else {
      document.execCommand("copy");
      done();
    }
  });
})();
