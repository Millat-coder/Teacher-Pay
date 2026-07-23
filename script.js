let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

function saveData() {
  localStorage.setItem("teachers", JSON.stringify(teachers));
}

function updateDashboard() {
  document.getElementById("teacherCount").innerText = teachers.length;

  let total = 0;
  let paid = 0;

  teachers.forEach(t => {
    total += Number(t.fee);
    if (t.paid) paid++;
  });

  document.getElementById("totalDue").innerText = "৳" + total;
  document.getElementById("paidCount").innerText = paid;
}

function renderTeachers(list = teachers) {
  const teacherList = document.getElementById("teacherList");
  teacherList.innerHTML = "";

  list.forEach((teacher, index) => {

    teacherList.innerHTML += `
      <div class="teacher">

      <h3>${teacher.name}</h3>

      <p><b>📚 Subject:</b> ${teacher.subject}</p>

      <p><b>📞 Phone:</b> ${teacher.phone}</p>

      <p><b>💳 Payment:</b> ${teacher.paymentType}</p>

      <p><b>💰 Fee:</b> ৳${teacher.fee}</p>

      <p><b>📅 Payment Date:</b> ${teacher.paymentDate}</p>

      <p><b>📝 Note:</b> ${teacher.note || "-"}</p>

      <p><b>Status:</b> ${teacher.paid ? "✅ Paid" : "❌ Unpaid"}</p>

      <button onclick="togglePaid(${index})">
      ${teacher.paid ? "Mark Unpaid" : "Mark Paid"}
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
  const phone = document.getElementById("phone").value.trim();
  const paymentType = document.getElementById("paymentType").value;
  const fee = document.getElementById("fee").value;
  const paymentDate = document.getElementById("paymentDate").value;
  const note = document.getElementById("note").value.trim();

  if (!name || !subject || !fee) {
    alert("Please fill all required fields.");
    return;
  }

  teachers.push({
    name,
    subject,
    phone,
    paymentType,
    fee,
    paymentDate,
    note,
    paid: false
  });

  saveData();
  renderTeachers();

  document.getElementById("name").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("fee").value = "";
  document.getElementById("paymentDate").value = "";
  document.getElementById("note").value = "";
}

function deleteTeacher(index) {

  if(confirm("Delete this teacher?")){

    teachers.splice(index,1);

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

  if(confirm("Delete all teachers?")){

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

    doc.text(`${i+1}. ${t.name}`,10,y);
    y+=8;

    doc.text(`Subject: ${t.subject}`,15,y);
    y+=8;

    doc.text(`Phone: ${t.phone}`,15,y);
    y+=8;

    doc.text(`Payment: ${t.paymentType}`,15,y);
    y+=8;

    doc.text(`Fee: ${t.fee}`,15,y);
    y+=8;

    doc.text(`Date: ${t.paymentDate}`,15,y);
    y+=8;

    doc.text(`Status: ${t.paid ? "Paid":"Unpaid"}`,15,y);

    y+=15;

    if(y>260){
      doc.addPage();
      y=20;
    }

  });

  doc.save("TeacherPayReport.pdf");

}

renderTeachers();
