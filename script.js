function addTeacher() {
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;
    const fee = document.getElementById("teacherFee").value;

    if (name === "" || subject === "" || fee === "") {
        alert("সব তথ্য পূরণ করুন!");
        return;
    }

    alert(`${name} সফলভাবে যোগ হয়েছে!`);

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";
    document.getElementById("teacherFee").value = "";
}
