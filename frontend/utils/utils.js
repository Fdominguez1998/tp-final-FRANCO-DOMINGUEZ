const token = localStorage.getItem("token");

function showNotice(message, type = "danger") {
  const container = document.getElementById("notifications");
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show shadow-sm`;
  notification.role = "alert";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  container.appendChild(notification);
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

async function apiRequest(method, endpoint, data = null) {
  const options = {
    method,
    headers: { Authorization: "Bearer " + token },
  };
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  return fetch(endpoint, options);
}

async function getErrorMessage(response, fallback = "Error al guardar") {
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    return fallback;
  }

  if (data && Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((error) => error.msg).join("<br>");
  }

  if (data && typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallback;
}

function checkAuth(redirectIfNoToken = true) {
  if (!token && redirectIfNoToken) {
    window.location.href = "../index.html";
  }
  return token;
}

function setupLogout(buttonId = "logoutBtn", redirectUrl = "../index.html") {
  const logoutBtn = document.getElementById(buttonId);
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = redirectUrl;
    });
  }
}

function getFieldLabel(field, form) {
  const label = field.getAttribute("aria-label");
  if (label) return label.replace(/\s*\*$/, "").trim();

  if (field.id) {
    const labelEl = form.querySelector(`label[for="${field.id}"]`);
    if (labelEl) return labelEl.textContent.replace(/\s*\*$/, "").trim();
  }

  if (field.placeholder) {
    return field.placeholder.replace(/\s*\*$/, "").trim();
  }

  if (field.name) return field.name;

  return "Campo";
}

function getFormValidationMessages(form) {
  const invalidFields = Array.from(form.querySelectorAll(":invalid"));
  if (invalidFields.length === 0) return [];

  return invalidFields.map((field) => {
    const label = getFieldLabel(field, form);
    const message = field.validationMessage || "Dato inválido";
    return `${label}: ${message}`;
  });
}

function validateFormAndNotify(form) {
  if (form.checkValidity()) return true;

  const messages = getFormValidationMessages(form);
  showNotice(messages.join("<br>"));
  return false;
}
