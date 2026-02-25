import { UserService } from "../services/user.service.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await UserService.login({ email, password });

    if (result.success) {
      alert("Login successful");
      location.href = "/dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
});