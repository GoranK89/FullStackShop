const form = document.querySelector("form");
const emailField = form.querySelector("#email");
const passwordField = form.querySelector("#password");
const messageDiv = document.querySelector("#registration-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/register", {
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
      messageDiv.textContent = `${result.message} - Redirecting to login page...`;
      // redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      console.error("Error:", response.status);
      messageDiv.textContent = "Error registering user. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
