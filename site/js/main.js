// Address the contact form opens in the visitor's email app.
const CONTACT_EMAIL = "anaya.patil@example.com";

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = [
  { id: "name", message: "Enter your name." },
  { id: "email", message: "Enter a valid email address." },
  { id: "message", message: "Write a short message." }
];

function check(field) {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.id + "-error");
  const value = input.value.trim();
  const valid = field.id === "email" ? emailPattern.test(value) : value.length > 0;
  input.setAttribute("aria-invalid", String(!valid));
  error.textContent = valid ? "" : field.message;
  return valid;
}

fields.forEach((field) => {
  document.getElementById(field.id).addEventListener("input", () => {
    if (document.getElementById(field.id).getAttribute("aria-invalid") === "true") {
      check(field);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = fields.map(check);
  const firstInvalid = fields.find((_, i) => !results[i]);

  if (firstInvalid) {
    document.getElementById(firstInvalid.id).focus();
    status.textContent = "Fix the highlighted fields and try again.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent("Message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;

  status.textContent =
    "Your email app should open with the message ready to send. If nothing opens, write to " +
    CONTACT_EMAIL + " directly.";
});
// Project explorer: click or use arrow keys to switch projects.
const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));

function selectTab(tab, moveFocus) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  });
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab, false));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[next], true);
  });
});