import "./style.css";

const $form = document.getElementById("login-form");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData($form);

  const entries = Object.fromEntries(formData.entries());

  fetch("http://localhost:4321/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
    credentials: "include",
  }).then((response) => {
    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Error al iniciar sesión. Por favor, intenta de nuevo.");
    }
  });
});
