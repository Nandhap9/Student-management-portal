document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // LOGIN
    // =========================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            if (
                username === "admin" &&
                password === "admin123" &&
                role === "admin"
            ) {

                localStorage.setItem("role", "admin");
                window.location.href = "index.html";

            } else if (
                username === "teacher" &&
                password === "teacher123" &&
                role === "teacher"
            ) {

                localStorage.setItem("role", "teacher");
                window.location.href = "teacher-dashboard.html";

            } else if (
                username === "student" &&
                password === "student123" &&
                role === "student"
            ) {

                localStorage.setItem("role", "student");
                window.location.href = "student-dashboard.html";

            } else {

                alert("Invalid Username, Password or Role");

            }

        });

    }

    // =========================
    // LOGOUT
    // =========================

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            localStorage.removeItem("role");

            window.location.href = "login.html";

        });

    }

    // =========================
    // ADD STUDENT
    // =========================

    const studentForm = document.getElementById("studentForm");

    if (studentForm) {

        const editStudentData =
            JSON.parse(localStorage.getItem("editStudent"));

        if (editStudentData) {

            document.getElementById("name").value =
                editStudentData.name;

            document.getElementById("roll").value =
                editStudentData.roll;

            document.getElementById("email").value =
                editStudentData.email;

            document.getElementById("phone").value =
                editStudentData.phone;

            document.getElementById("dept").value =
                editStudentData.dept;

            document.getElementById("address").value =
                editStudentData.address;
        }

        studentForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const student = {

                id: editStudentData
                    ? editStudentData.id
                    : Date.now(),

                name: document.getElementById("name").value,
                roll: document.getElementById("roll").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                dept: document.getElementById("dept").value,
                gender:
                    document.querySelector(
                        'input[name="gender"]:checked'
                    )?.value || "",

                address:
                    document.getElementById("address").value

            };

            let students =
                JSON.parse(localStorage.getItem("students"))
                || [];

            if (editStudentData) {

                students = students.map(s =>
                    s.id === student.id ? student : s
                );

                localStorage.removeItem("editStudent");

            } else {

                students.push(student);

            }

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Student Saved Successfully");

            window.location.href = "index.html";

        });

    }

    // =========================
    // LOAD STUDENT TABLE
    // =========================

    const tableBody =
        document.getElementById("studentTableBody");

    if (tableBody) {

        const students =
            JSON.parse(localStorage.getItem("students"))
            || [];

        tableBody.innerHTML = "";

        students.forEach(student => {

            tableBody.innerHTML += `
                <tr>
                    <td>${student.roll}</td>
                    <td>${student.name}</td>
                    <td>${student.dept}</td>
                    <td>Active</td>

                    <td>

                        <button onclick="viewStudent(${student.id})">
                            View
                        </button>

                        <button onclick="editStudent(${student.id})">
                            Edit
                        </button>

                        <button onclick="deleteStudent(${student.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;

        });

    }

    // =========================
    // SEARCH
    // =========================

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const filter =
                searchInput.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#studentTableBody tr"
                );

            rows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(filter)
                        ? ""
                        : "none";

            });

        });

    }

    // =========================
    // PROFILE PAGE
    // =========================

    const selectedStudent =
        JSON.parse(
            localStorage.getItem("selectedStudent")
        );

    if (
        selectedStudent &&
        document.getElementById("studentName")
    ) {

        document.getElementById("studentName").textContent =
            selectedStudent.name;

        document.getElementById("studentRoll").textContent =
            selectedStudent.roll;

        if (document.getElementById("studentDept"))
            document.getElementById("studentDept").textContent =
                selectedStudent.dept;

        if (document.getElementById("studentEmail"))
            document.getElementById("studentEmail").textContent =
                selectedStudent.email;

        if (document.getElementById("studentPhone"))
            document.getElementById("studentPhone").textContent =
                selectedStudent.phone;

        if (document.getElementById("studentGender"))
            document.getElementById("studentGender").textContent =
                selectedStudent.gender;

        if (document.getElementById("studentAddress"))
            document.getElementById("studentAddress").textContent =
                selectedStudent.address;

    }

    // =========================
    // EDIT BUTTON HIDE
    // =========================

    const role =
        localStorage.getItem("role");

    const editBtn =
        document.getElementById("editBtn");

    if (
        role === "student" &&
        editBtn
    ) {

        editBtn.style.display = "none";

    }

    if (editBtn) {

        editBtn.addEventListener("click", () => {

            window.location.href =
                "add-student.html";

        });

    }

    // =========================
    // DARK MODE
    // =========================

    const darkMode =
        document.getElementById("darkMode");

    const settingsForm =
        document.getElementById("settingsForm");

    if (
        localStorage.getItem("darkMode") === "enabled"
    ) {

        document.body.classList.add("dark-mode");

        if (darkMode) {

            darkMode.checked = true;

        }

    }

    if (settingsForm) {

        settingsForm.addEventListener("submit", (e) => {

            e.preventDefault();

            if (
                darkMode &&
                darkMode.checked
            ) {

                document.body.classList.add(
                    "dark-mode"
                );

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );

            } else {

                document.body.classList.remove(
                    "dark-mode"
                );

                localStorage.setItem(
                    "darkMode",
                    "disabled"
                );

            }

            alert(
                "Settings Saved Successfully"
            );

        });

    }

    // =========================
    // FEEDBACK
    // =========================

    const feedbackForm =
        document.getElementById("feedbackForm");

    if (feedbackForm) {

        feedbackForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const feedbackData = {

                name:
                    document.getElementById(
                        "studentNameInput"
                    ).value,

                rating:
                    document.getElementById(
                        "rating"
                    ).value,

                feedback:
                    document.getElementById(
                        "feedback"
                    ).value

            };

            let feedbacks =
                JSON.parse(
                    localStorage.getItem("feedbacks")
                ) || [];

            feedbacks.push(feedbackData);

            localStorage.setItem(
                "feedbacks",
                JSON.stringify(feedbacks)
            );

            alert("Feedback Submitted");

            feedbackForm.reset();

        });

    }

});


// =========================
// GLOBAL FUNCTIONS
// =========================

function viewStudent(id) {

    const students =
        JSON.parse(localStorage.getItem("students"))
        || [];

    const student =
        students.find(s => s.id === id);

    localStorage.setItem(
        "selectedStudent",
        JSON.stringify(student)
    );

    window.location.href =
        "student-profile.html";
}

function editStudent(id) {

    const students =
        JSON.parse(localStorage.getItem("students"))
        || [];

    const student =
        students.find(s => s.id === id);

    localStorage.setItem(
        "editStudent",
        JSON.stringify(student)
    );

    window.location.href =
        "add-student.html";
}

function deleteStudent(id) {

    if (!confirm("Delete this student?")) {
        return;
    }

    let students =
        JSON.parse(localStorage.getItem("students"))
        || [];

    students =
        students.filter(
            student => student.id !== id
        );

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    location.reload();
}