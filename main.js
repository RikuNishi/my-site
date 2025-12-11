document.addEventListener("DOMContentLoaded", () => {
  const typeTarget = document.querySelector(".typewriter");
  if (!typeTarget) return;

  const text = typeTarget.dataset.text || typeTarget.textContent?.trim() || "";
  typeTarget.textContent = "";

  let index = 0;
  const baseDelay = 90;

  const type = () => {
    if (index >= text.length) {
      typeTarget.classList.add("typing-complete");
      return;
    }

    typeTarget.textContent += text[index];
    index += 1;
    const char = text[index - 1];
    const delay = "、。,.!?".includes(char) ? baseDelay * 3 : baseDelay;
    setTimeout(type, delay);
  };

  type();
});
