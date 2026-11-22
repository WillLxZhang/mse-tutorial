(() => {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  const message = document.getElementById("feedback-message");
  const count = document.getElementById("feedback-count");
  const status = document.getElementById("feedback-status");
  const button = form.querySelector('button[type="submit"]');
  const accessKey = form.dataset.accessKey.trim();
  const endpoint = form.dataset.endpoint;
  const limit = message.maxLength;
  let submitting = false;

  function setStatus(text, state = "") {
    status.textContent = text;
    status.dataset.state = state;
  }

  function updateCount() {
    const remaining = limit - message.value.length;
    count.textContent = `${message.value.length}/${limit} 字`;
    message.setCustomValidity(remaining < 0 ? `留言请控制在 ${limit} 字以内。` : "");
  }

  message.addEventListener("input", () => {
    message.setCustomValidity("");
    updateCount();
    if (!submitting) setStatus("");
  });
  updateCount();

  if (!accessKey) {
    setStatus("留言功能暂未开放，请稍后再来。");
    return;
  }
  button.disabled = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;

    updateCount();
    if (!message.value.trim()) message.setCustomValidity("请填写留言内容。");
    if (!form.reportValidity()) return;

    submitting = true;
    button.disabled = true;
    button.textContent = "提交中…";
    message.readOnly = true;
    setStatus("正在提交，请稍候。");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "HUST MSE Tutorial｜网站留言",
          from_name: "HUST MSE Tutorial",
          message: message.value.trim(),
          botcheck: form.elements.botcheck.checked,
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission rejected");

      form.reset();
      updateCount();
      setStatus("留言已提交，感谢你的反馈。", "success");
    } catch (error) {
      setStatus(
        error.name === "AbortError"
          ? "提交结果暂未确认，内容已保留。请稍后重试。"
          : "提交未成功，内容已保留。请稍后重试。",
        "error",
      );
    } finally {
      clearTimeout(timeout);
      submitting = false;
      button.disabled = false;
      button.textContent = "提交";
      message.readOnly = false;
      status.focus();
    }
  });
})();
