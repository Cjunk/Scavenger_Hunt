/* CLIENT 
        login.js
        WRITTEN BY: JERICHO SHARMAN
        FOR: SCAVENGER HUNT
        Used to handle specifically the login FORM. including error messages
*/
export function initLoginForm() {
  const loginCancel = document.getElementById("loginCancel");
  const loginBut = document.getElementById("loginSubmit");

  function RefreshParent() {
    if (window.opener != null && !window.opener.closed) {
      window.opener.location.reload();
    }
  }
  window.onbeforeunload = RefreshParent;
  //  INITIALISE LOGIN FORM DOM ELEMENTS
  loginBut.addEventListener("click", (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById("loginForm"));
    axios
      .post("/api/session/login", {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("Password"),
      })
      .then((response) => {
        window.close();
      })
      .catch((err) => {
        __errorHandler(err);
      });
  });
  loginCancel.addEventListener("click", (e) => {
    // Cancel login.  close the window and return to the parent window
    e.preventDefault();
    window.close();
  });
  //  PRIVATE FUNCTIONS
  function __errorHandler(err) {
    __errorHandlerDisplay(err.message, err.response.data.message);

  }
}
function __errorHandlerDisplay(message, dataMessage) {
  document.getElementById("errorTextBox1").textContent = message;
  document.getElementById("errorTextBox2").textContent = dataMessage;
  document.getElementById("errorModal").style.display = "block";
}
