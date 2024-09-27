import "./style.css";

const form = document.getElementById("register-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());

  console.log("Form Data:", entries);
  fetch("http://localhost:4321/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(entries),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/pages/login";
        return response.json();
      }
      return null;
    })
    .catch((error) => {
      console.error(error);
      alert("Error al Registrarse. Por favor, intenta de nuevo.");
    });
});
