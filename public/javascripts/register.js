const form = document.querySelector("form");
const emailField = form.querySelector("#email");
const passwordField = form.querySelector("#password");

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
      console.log(result);
      // empty the form
      emailField.value = "";
      passwordField.value = "";
      // redirect to login page after 1 second
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
