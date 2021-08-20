// Contains unused, reference code from the lessons.
// Will be removed at the end of the project cycle.

// DIALOG

// Function to show the dialog box and return the promise outcome
// Accept will resolve and cancel will reject
function showDialog (title, text) {
  showModal (title, text);

  let modalContainer = document.querySelector("#modal-container");

  let modal = modalContainer.querySelector(".modal");

  let confirmButton = document.createElement("button");
  confirmButton.classList.add("modal-confirm");
  confirmButton.innerText = "Confirm";

  let cancelButton = document.createElement("button");
  cancelButton.classList.add("modal-cancel");
  cancelButton.innerText = "Cancel";

  // Add our "Confirm" and "Cancel" buttons to the DOM as modal child elements
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // Set focus on confirm in case the user just wants to press enter to confirm
  confirmButton.focus();



// Return a promise that resolves when confirmed, else rejects
return new Promise((resolve, reject) => {
  cancelButton.addEventListener('click', hideModal);
  confirmButton.addEventListener('click', () => {
    // Reset the dialog's promise rejection variable
    dialogPromiseReject = null;
    hideModal();
    resolve();
  });

  // This can be used to reject from other functions
  // ???????
  dialogPromiseReject = reject;
});

}

// runs ShowDialog with a given title and text when clicking Show Dialog button
document.querySelector('#show-dialog').addEventListener('click', () => {
showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
  alert("Confirmed!");
}, () => {
  alert("Not Confirmed.");
});
});


// MODAL


// Function to add the class "is-visible" to the modal modal container element
// This class is used in CSS to remove the "display: none" attribute.
function showModal (title, text) {
  let modalContainer = document.querySelector("#modal-container");

  // Clear last modal content
  modalContainer.innerHTML = "";

  let modal = document.createElement("div");
  modal.classList.add("modal");

  // Add new content for modal
  // Close button for the modal, on click runs closeModal function
  let closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("modal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideModal);

  // Title for the modal
  let titleElement = document.createElement("h1");
  titleElement.innerText = title;

  // main content for modal
  let contentElement = document.createElement("p");
  contentElement.innerText = text;

  // actually attach created HTML to the DOM
  // modal content to modal
  // modal to its container
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  // with new content now created and attached, show the modal
  modalContainer.classList.add("is-visible");
}



document.querySelector(".pokemon-buttons").addEventListener("click", () => {
  showModal(pokemon.name, "Modal Content Test");
});
// // On clicking the Show Modal button we run the showModal function
// document.querySelector("#show-modal").addEventListener("click", () => {
//   showModal("Modal Title Test", "Modal Content Test");
// });

// Not sure why this is here yet
let dialogPromiseReject;

// Function to hide modal
function hideModal() {
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.remove("is-visible");

  if (dialogPromiseReject) {
    // What the heck is this function?
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

// Listener for window to close modal on key "ESC" if it is not hidden already
window.addEventListener("keydown", (e) => {
  let modalContainer = document.querySelector("#modal-container");
  if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    hideModal();
  }
});

let modalContainer = document.querySelector("#modal-container");
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});





// IIFE Real Time Form validation
// IIFE for form validation
(function () {
  let form = document.querySelector ("#register-form");
  let emailInput = document.querySelector ("#email");
  let passwordInput = document.querySelector ("#password");

  function validateForm () {
    let isValidEmail = validateEmail ();
    let isValidPassword = validatePassword ();
    return isValidEmail && isValidPassword;
  }

  function validateEmail () {
    let value = emailInput.value;

    // Need to show error if the e-mail field is left blank.
    if (!value) {
      showErrorMessage (emailInput, "E-mail is a required field.");
      // return false here is preventing us from continuing in this Function
      // to the end where we would clear out the error from display
      return false;
    }

    // Need to show error if the e-mail does not have "@" in it.
    if (value.indexOf("@") === -1) {
      showErrorMessage (emailInput, "You must enter a valid e-mail address.");
      return false;
    }

    // We call the error message function when all is good to clear out any
    // existing error messages that may have popped up to this point.
    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword () {
    let value = passwordInput.value;

    // Need to show error if the password field is left blank.
    if (!value) {
      showErrorMessage (passwordInput, "Password is a required field.");
      return false;
    }

    // Need to show error if the password is not at least 8 char long
    if (value.length < 8) {
      showErrorMessage (passwordInput, "The password needs to be at least 8 characters long");
      return false;
    }

    // We call the error message function when all is good to clear out any
    // existing error messages that may have popped up to this point.
    showErrorMessage (passwordInput, null);
    return true;
  }

  function showErrorMessage (input, message) {
    let container = input.parentElement;

    // Clear existing error
    let error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }

    // Add error if message isn't empty
    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

})();
