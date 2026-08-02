function fill(input, value) {
  if (!input || !value) return;
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

// storageのキー ⇔ ページ側セレクタ の対応表
const FIELD_MAP = {
  'applicant-id':            'input[name="ninsho_key1_1"]',
  'applicant-password':      'input[name="ninsho_key1_2"]',
  'applicant-phone':         'input[name="free_text1"]',
  'applicant-phone-confirm': 'input[name="free_text2"]',
  'companion-id':            'input[name="ninsho_key2_1"]',
  'companion-id-phone':      'input[name="ninsho_key2_2"]',
  'companion-phone':         'input[name="free_text3"]',
  'companion-phone-confirm': 'input[name="free_text4"]',
  'companion-name':          'input[name="free_text5"]',
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action !== "DO_AUTOFILL") return;

  const keys = Object.keys(FIELD_MAP);
  chrome.storage.local.get(keys, (data) => {
    keys.forEach((key) => {
      const selector = FIELD_MAP[key];
      const value = data[key];
      const targetInput = document.querySelector(selector);

      // 入力欄が存在し、かつ保存データがある場合にのみ入力する
      if (targetInput && value) {
        fill(targetInput, value);
      }

    });
  });
});