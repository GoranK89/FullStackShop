const loginForm = document.querySelector(".login-form");
const emailField = loginForm.querySelector("#email");
const passwordField = loginForm.querySelector("#password");
const messageDiv = document.querySelector("#login-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();

      // empty the form
      emailField.value = "";
      passwordField.value = "";
      // display success message
      messageDiv.textContent = "Loging in...";
      // redirect to store page after 2 seconds
      setTimeout(() => {
        window.location.href = "/store";
      }, 2000);
    } else {
      console.error("Error:", response.status);
      messageDiv.textContent = "Error logging in. Please try again";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
