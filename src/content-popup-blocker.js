// ポップアップを非表示にするCSSを注入
const style = document.createElement('style');
style.textContent = `
  #block--popup,
  #popup__bg {
    display: none !important;
  }
`;
(document.head || document.documentElement).appendChild(style);