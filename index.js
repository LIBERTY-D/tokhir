const username = document.getElementById("username");
const email = document.getElementById("user_email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("user-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await fetch("http://127.0.0.1:3000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        message: message.value,
        subject: subject.value,
      }),
    });
    setTimeout(() => {
      username.value = "";
      email.value = "";
      (message.value = ""), (subject.value = "");
    }, 2000);
  } catch (err) {
    console.log(err);
  }
});
