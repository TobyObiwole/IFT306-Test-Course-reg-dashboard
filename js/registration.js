const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("courseTable");

const matricPattern = /^LCU\/[A-Z]{2}\/\d{2}\/\d{5}$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value.trim();
  const matricNumber = document.getElementById("matricNumber").value.trim();
  const courseCode = document.getElementById("courseCode").value.trim();
  const courseTitle = document.getElementById("courseTitle").value.trim();

  if (!studentName || !matricNumber || !courseCode || !courseTitle) {
    alert("All fields are required");
    return;
  }

  if (!matricPattern.test(matricNumber)) {
    alert("Matric number must be in format LCU/CS/23/00001");
    return;
  }

  const course = { courseCode, courseTitle };

  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));

  displayCourses();
  form.reset();
});

function displayCourses() {
  tableBody.innerHTML = "";
  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  courses.forEach(course => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${course.courseCode}</td>
      <td>${course.courseTitle}</td>
    `;
    tableBody.appendChild(row);
  });
}

window.onload = displayCourses;