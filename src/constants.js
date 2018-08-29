export const INJECT_CODE_SNIPPET = `
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('/injected.build.js')
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
`;

export const INJECT_EV = 'inject-script';