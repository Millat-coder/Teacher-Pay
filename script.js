let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

function saveData() {
  localStorage.setItem("teachers", JSON.stringify(teachers));
}

function updateDashboard() {
  document.getElementById("teacherCount").textContent = teachers.length;

  let total = 0;
  teachers.forEach(t => total += Number(t.fee));

  document.getElementById("totalDue").textContent = "৳" + total;
}

function renderTeachers(list = teachers) {
  const teacherList = document.getElementById("teacherList");
  teacherList.innerHTML = "";

  list.forEach((teacher, index) => {
    teacherList.innerHTML += `
      <div class="teacher">
        <h3>${teacher.name}</h3>

        <p><b>Subject:</b> ${teacher.subject}</p>

        <p><b>Payment:</b> ${teacher.paymentType}</p>

        <p><b>Fee:</b> ৳${teacher.fee}</p>

        <button onclick="togglePaid(${index})">
          ${teacher.paid ? "✅ Paid" : "💰 Mark Paid"}
        </button>

        <button onclick="deleteTeacher(${index})">
          Delete
        </button>

      </div>
    `;
  });

  updateDashboard();
}

function addTeacher() {

  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const paymentType = document.getElementById("paymentType").value;
  const fee = document.getElementById("fee").value;

  if (!name || !subject || !fee) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  teachers.push({
    name,
    subject,
    paymentType,
    fee,
    paid: false
  });

  saveData();
  renderTeachers();

  document.getElementById("name").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("fee").value = "";
}

function deleteTeacher(index) {

  if (confirm("এই Teacher-কে Delete করবেন?")) {

    teachers.splice(index, 1);

    saveData();

    renderTeachers();

  }

}

function togglePaid(index){

  teachers[index].paid = !teachers[index].paid;

  saveData();

  renderTeachers();

}

function searchTeacher(){

  const text = document.getElementById("search").value.toLowerCase();

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(text) ||
    t.subject.toLowerCase().includes(text)
  );

  renderTeachers(filtered);

}

function clearAll(){

  if(confirm("সব Teacher Delete করবেন?")){

    teachers=[];

    saveData();

    renderTeachers();

  }

}

async function downloadPDF(){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text("Teacher Pay Report",20,20);

  let y=35;

  teachers.forEach((t,i)=>{

    doc.text(
      `${i+1}. ${t.name} | ${t.subject} | ${t.paymentType} | ৳${t.fee} | ${t.paid ? "Paid":"Unpaid"}`,
      10,
      y
    );

    y+=10;

  });

  doc.save("TeacherPayReport.pdf");

}

renderTeachers();
