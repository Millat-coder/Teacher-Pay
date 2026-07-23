// =========================
// Teacher Pay V3 - Part 1
// =========================

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let editIndex = -1;

function saveData() {
    localStorage.setItem("teachers", JSON.stringify(teachers));
}

function updateDashboard() {

    document.getElementById("teacherCount").innerText = teachers.length;

    let paid = 0;
    let due = 0;
    let total = 0;

    teachers.forEach(t => {

        total += Number(t.fee);

        if (t.paid) {
            paid++;
        } else {
            due++;
        }

    });

    document.getElementById("paidCount").innerText = paid;
    document.getElementById("dueCount").innerText = due;
    document.getElementById("totalMoney").innerText = "৳" + total;

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

<p><b>💰 Fee:</b> ৳${teacher.fee}</p>

<p><b>💳 Type:</b> ${teacher.paymentType}</p>

<p><b>📅 Date:</b> ${teacher.paymentDate}</p>

<p><b>📝 Note:</b> ${teacher.note || "-"}</p>

<p><b>Status:</b> ${teacher.paid ? "✅ Paid" : "❌ Due"}</p>
<p><b>🟢 Present:</b> ${teacher.present}</p>

<p><b>🔴 Absent:</b> ${teacher.absent}</p>

<button onclick="markPresent(${index})">
🟢 Present
</button>

<button onclick="markAbsent(${index})">
🔴 Absent
</button>

<button onclick="togglePaid(${index})">
${teacher.paid ? "Mark Due" : "Mark Paid"}
</button>

<button onclick="openEdit(${index})">
✏ Edit
</button>

<button onclick="deleteTeacher(${index})">
🗑 Delete
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

        alert("সব তথ্য পূরণ করুন");

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
        paid: false,
present: 0,
absent: 0

    });

    saveData();

    function markPresent(index){

teachers[index].present++;

saveData();

renderTeachers();

}

function markAbsent(index){

teachers[index].absent++;

saveData();

renderTeachers();

}
    renderTeachers();

    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("fee").value = "";
    document.getElementById("paymentDate").value = "";
    document.getElementById("note").value = "";

}

function deleteTeacher(index){

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

    const text=document.getElementById("search").value.toLowerCase();

    const filtered=teachers.filter(t=>

        t.name.toLowerCase().includes(text) ||

        t.subject.toLowerCase().includes(text)

    );

    renderTeachers(filtered);

}
function openEdit(index){

    editIndex = index;

    document.getElementById("editModal").style.display = "block";

    document.getElementById("editName").value = teachers[index].name;
    document.getElementById("editSubject").value = teachers[index].subject;
    document.getElementById("editPhone").value = teachers[index].phone;
    document.getElementById("editPaymentType").value = teachers[index].paymentType;
    document.getElementById("editFee").value = teachers[index].fee;
    document.getElementById("editPaymentDate").value = teachers[index].paymentDate;
    document.getElementById("editNote").value = teachers[index].note;

}

function closeEdit(){

    document.getElementById("editModal").style.display = "none";

}

function saveEdit(){

    teachers[editIndex].name = document.getElementById("editName").value;
    teachers[editIndex].subject = document.getElementById("editSubject").value;
    teachers[editIndex].phone = document.getElementById("editPhone").value;
    teachers[editIndex].paymentType = document.getElementById("editPaymentType").value;
    teachers[editIndex].fee = document.getElementById("editFee").value;
    teachers[editIndex].paymentDate = document.getElementById("editPaymentDate").value;
    teachers[editIndex].note = document.getElementById("editNote").value;

    saveData();

    renderTeachers();

    closeEdit();

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

    let y = 35;

    teachers.forEach((t,i)=>{

        doc.text(`${i+1}. ${t.name}`,10,y); y+=8;
        doc.text(`Subject : ${t.subject}`,15,y); y+=8;
        doc.text(`Phone : ${t.phone}`,15,y); y+=8;
        doc.text(`Payment : ${t.paymentType}`,15,y); y+=8;
        doc.text(`Fee : ${t.fee}`,15,y); y+=8;
        doc.text(`Date : ${t.paymentDate}`,15,y); y+=8;
        doc.text(`Status : ${t.paid ? "Paid":"Due"}`,15,y); y+=12;

        if(y>260){

            doc.addPage();

            y=20;

        }

    });

    doc.save("TeacherPay_Report.pdf");

}

renderTeachers();
