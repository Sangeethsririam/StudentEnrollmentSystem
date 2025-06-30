document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const tableBody = document.querySelector("#records-table tbody");

  const nameInput = document.getElementById("full-name");
  const idInput = document.getElementById("student-id");
  const emailInput = document.getElementById("email");
  const contactInput = document.getElementById("contact");

  const students = [];

  function renderTable() {
    tableBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button onclick="editStudent(${i})">Edit</button>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

    if (name === "" || id === "" || email === "" || contact === "") {
      alert("Please fill all fields.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name must contain only letters.");
      return;
    }

    if (!/^[1-9][0-9]*$/.test(id)) {
      alert("Student ID must be a positive number.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number must be 10 digits.");
      return;
    }

    // Add student
    students.push({ name, id, email, contact });

    renderTable();
    form.reset();
  });


  window.editStudent = function (index) {
    const student = students[index];

    nameInput.value = student.name;
    idInput.value = student.id;
    emailInput.value = student.email;
    contactInput.value = student.contact;

    students.splice(index, 1);
    renderTable();
  };

  window.deleteStudent = function (index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      renderTable();
    }
  };
});
