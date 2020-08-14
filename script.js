function addNewEntry(entryText) {
  // create a new entry element
  const newEntry = document.createElement("div");
  // inject the text into the new element
  newEntry.textContent = entryText;
  // style the new element with .entry class
  newEntry.classList.add("entry");

  // append new entry to the list of entries the user sees
  document.getElementById("entry-list").appendChild(newEntry);
}

function fetchEntries() {
  fetch("http://localhost:3000/entries").then(response => {
    return response.json();
  }).then(entries => {
    entries.forEach(entry => {
      addNewEntry(entry.text)
    });
  });
}

// entry is an object like { text: "Hello World" }
function createEntry(entry) {
  return fetch("http://localhost:3000/entries", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    });
}

fetchEntries();
// exercise: .catch((error) => { /* ... */ })

const submitButton = document.getElementById("entry-submit-button");
submitButton.addEventListener("click", (event) => {
  // find out what the user typed in the text area
  const textarea = document.getElementById("new-entry-textarea");
  const entryText = textarea.value;

  const errorSpan = document.getElementsByClassName("new-entry-error")[0];
  // frontend validation
  if (entryText === "") {
    if (errorSpan) {
      errorSpan.classList.remove("new-entry-error-hidden");
    }
    return;
  }

  createEntry({ text: entryText })
    .then((entry) => {
      addNewEntry(entry.text);
    })
    .catch(error => {
      errorSpan.textContent = error.message;
      errorSpan.classList.remove("new-entry-error-hidden");
    });


  // clear the text area
  textarea.value = "";
  // clear any error message
  errorSpan && errorSpan.classList.add("new-entry-error-hidden");
});
