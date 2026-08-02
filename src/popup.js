// 保存対象のキー一覧（HTMLのinput idと一致させる）
const FIELD_KEYS = [
  'applicant-id',
  'applicant-password',
  'applicant-phone',
  'applicant-phone-confirm',
  'companion-id',
  'companion-id-phone',
  'companion-phone',
  'companion-phone-confirm',
  'companion-name',
];

// 【1】ポップアップを開いた時に、保存済みのデータを表示する
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(FIELD_KEYS, (data) => {
    FIELD_KEYS.forEach((key) => {
      const el = document.getElementById(key);
      if (el && data[key]) {
        el.value = data[key];
      }
    });
  });
});

// 【2】「保存する」ボタン（id="save"）の処理
document.getElementById('save').addEventListener('click', () => {
  const dataToSave = {};
  FIELD_KEYS.forEach((key) => {
    const el = document.getElementById(key);
    if (el) {
      dataToSave[key] = el.value;
    }
  });

  chrome.storage.local.set(dataToSave, () => {
    const status = document.getElementById('status');
    status.textContent = '保存しました！';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});

// 【3】「フォームに入力する」ボタン（class="fill-btn"）の処理
document.querySelectorAll('.fill-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { action: "DO_AUTOFILL" });
    }
  });
});