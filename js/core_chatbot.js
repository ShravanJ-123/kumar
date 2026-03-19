(function () {
  const API_URL = "chat_core.php";
  const AGENT_NAME = "Pooja Agarwal";
  const AGENT_AVATAR = "images/priya.gif";

  let expectingPhone = false;

  const body = document.body;
  if (!body) return;

  const chatScreen = document.createElement("div");
  chatScreen.className = "chat-screen";
  chatScreen.innerHTML = [
    '<div class="chat-header">',
    '  <div class="chat-header-title">',
    `    <span class="chat-header-avatar" style="background-image:url('${AGENT_AVATAR}')" aria-hidden="true"></span>`,
    '    <span class="chat-header-meta">',
    `      <strong class="chat-header-name">${AGENT_NAME}</strong>`,
    '      <span class="chat-header-role">Online</span>',
    "    </span>",
    '    <button type="button" class="chat-header-close" id="core-chat-close" aria-label="Close chat">',
    '      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    "    </button>",
    "  </div>",
    "</div>",
    '<div class="chat-body" id="core-chat-body"></div>',
    '<div class="chat-input" id="core-chat-input">',
    '  <div class="chat-text-row">',
    '    <input type="text" class="user-input" id="core-user-input" placeholder="Write a reply..">',
    '    <div class="input-action-icon"><a class="user-input-submit-button" id="core-send-text" role="button" aria-label="Send message"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a></div>',
    "  </div>",
    '  <div class="chat-phone-row hide" id="core-phone-row">',
    '    <select class="chat-country" id="core-country-code">',
    '      <option value="+91" selected>+91</option>',
    '      <option value="+1">+1</option>',
    '      <option value="+44">+44</option>',
    '      <option value="+971">+971</option>',
    "    </select>",
    '    <input type="tel" class="chat-phone-input" id="core-phone-input" placeholder="Enter Your Mobile Number...">',
    '    <a class="chat-phone-send" id="core-send-phone" role="button" aria-label="Send mobile number"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a>',
    "  </div>",
    '  <div class="chat-inline-error hide" id="core-chat-error">This field is required</div>',
    "</div>",
  ].join("");

  body.appendChild(chatScreen);

  const launcher = document.querySelector(".chat-bot-icon");
  if (launcher) {
    launcher.innerHTML = '<div class="shk"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square animate"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>';
  }

  const chatBody = document.getElementById("core-chat-body");
  const textInput = document.getElementById("core-user-input");
  const sendTextBtn = document.getElementById("core-send-text");
  const closeBtn = document.getElementById("core-chat-close");
  const textRow = chatScreen.querySelector(".chat-text-row");
  const phoneRow = document.getElementById("core-phone-row");
  const phoneInput = document.getElementById("core-phone-input");
  const phoneSendBtn = document.getElementById("core-send-phone");
  const countryCodeInput = document.getElementById("core-country-code");
  const errorLine = document.getElementById("core-chat-error");

  function nowLabel() {
    const d = new Date();
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, "0");
    const suffix = hh >= 12 ? "PM" : "AM";
    const hour12 = hh % 12 || 12;
    return `${hour12}:${mm} ${suffix}`;
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendAgentMessage(text) {
    const nameLabel = document.createElement("div");
    nameLabel.className = "chat-agent-label";
    nameLabel.textContent = AGENT_NAME;

    const wrap = document.createElement("div");
    wrap.className = "chat-agent-line";
    wrap.innerHTML = `<span class="chat-agent-pic" style="background-image:url('${AGENT_AVATAR}')"></span><div class="chat-bubble you">${escapeHtml(text)}</div>`;

    chatBody.appendChild(nameLabel);
    chatBody.appendChild(wrap);
    scrollToBottom();
  }

  function appendUserMessage(text) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble me";
    bubble.textContent = text;
    chatBody.appendChild(bubble);
    scrollToBottom();
  }

  function showQuickReplies(items) {
    if (!Array.isArray(items) || items.length === 0) return;

    const row = document.createElement("div");
    row.className = "chat-quick-replies";

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-default main-menu-btn";
      btn.innerHTML = `<span>${escapeHtml(item)}</span>`;
      btn.addEventListener("click", () => {
        appendUserMessage(item);
        row.remove();
        sendToBackend({ action: "message", message: item });
      });
      row.appendChild(btn);
    });

    chatBody.appendChild(row);
    scrollToBottom();
  }

  function setInputMode(expect) {
    expectingPhone = expect === "phone";

    if (expectingPhone) {
      textRow.classList.add("hide");
      phoneRow.classList.remove("hide");
      phoneInput.focus();
    } else {
      phoneRow.classList.add("hide");
      textRow.classList.remove("hide");
      textInput.focus();
    }
  }

  function showValidationError(message) {
    errorLine.textContent = message || "This field is required";
    errorLine.classList.remove("hide");
  }

  function clearValidationError() {
    errorLine.classList.add("hide");
  }

  async function sendToBackend(payload) {
    clearValidationError();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        showValidationError(data.error || "Something went wrong");
        return;
      }

      if (Array.isArray(data.messages)) {
        data.messages.forEach((msg) => appendAgentMessage(msg.text || ""));
      }

      setInputMode(data.expect || null);
      showQuickReplies(data.quickReplies || []);

      if (data.error) {
        showValidationError(data.error);
      }
    } catch (error) {
      appendAgentMessage("I am unable to connect right now. Please try again in a moment.");
      showValidationError("Unable to connect. Please try again.");
    }
  }

  function notifyChatClosed() {
    const payload = JSON.stringify({ action: "close" });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(API_URL, blob);
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }

  function submitText() {
    const value = (textInput.value || "").trim();
    if (!value) {
      showValidationError("This field is required");
      return;
    }

    appendUserMessage(value);
    textInput.value = "";
    sendToBackend({ action: "message", message: value });
  }

  function submitPhone() {
    const phone = (phoneInput.value || "").trim();
    const countryCode = countryCodeInput.value || "+91";

    if (!phone) {
      showValidationError("This field is required");
      return;
    }

    appendUserMessage(phone);
    phoneInput.value = "";
    sendToBackend({ action: "phone", phone, countryCode });
  }

  sendTextBtn.addEventListener("click", submitText);
  textInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitText();
    }
  });

  phoneSendBtn.addEventListener("click", submitPhone);
  phoneInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitPhone();
    }
  });

  function toggleChat(forceOpen) {
    if (!chatScreen) return;

    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !chatScreen.classList.contains("show-chat");

    chatScreen.classList.toggle("show-chat", shouldOpen);
    if (launcher) {
      const svgs = launcher.querySelectorAll("svg");
      svgs.forEach((svg) => svg.classList.toggle("animate"));
    }

    if (shouldOpen) {
      clearValidationError();
      if (expectingPhone) {
        phoneInput.focus();
      } else {
        textInput.focus();
      }
      const pop = document.querySelector(".chat-pop-sm");
      if (pop) pop.style.display = "none";
    } else {
      notifyChatClosed();
    }
  }

  if (launcher) {
    launcher.addEventListener("click", () => toggleChat());
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleChat(false));
  }

  document.querySelectorAll(".openchat, #chat-square-small").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      toggleChat(true);
    });
  });

  const popup = document.querySelector(".chat-pop-sm");
  const popupClose = document.getElementById("chat-pop-sm-close");
  if (popupClose && popup) {
    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  setTimeout(() => {
    if (popup && !chatScreen.classList.contains("show-chat")) {
      popup.style.display = "block";
    }
  }, 4000);

  window.addEventListener("beforeunload", () => {
    notifyChatClosed();
  });

  const timeTag = document.createElement("div");
  timeTag.className = "chat-start";
  timeTag.textContent = `TODAY ${nowLabel()}`;
  chatBody.appendChild(timeTag);

  sendToBackend({ action: "start" });
})();
