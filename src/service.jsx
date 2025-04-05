import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import uploadFile from "./service/fileService.jsx";

export async function generateObyektivka(formData) {
  const doc = new jsPDF();

  if (formData.photo) {
    const imageData = await toBase64(formData.photo);
    doc.addImage(imageData, "JPEG", 150, 10, 40, 50); // o'ng yuqoriga
  }

  doc.setFont("Times", "bold");
  doc.setFontSize(14);
  doc.text("MA'LUMOTNOMA", 105, 20, null, null, "center");

  doc.setFont("Times", "normal");
  doc.setFontSize(12);
  let y = 70;

  const line = (label, value) => {
    doc.text(`${label}`, 15, y);
    doc.text(`${value || ""}`, 80, y);
    y += 8;
  };

  line("Familiyasi, ismi, sharifi:", `${formData.lastName} ${formData.firstName} ${formData.middleName}`);
  line("Ish boshlagan vaqti:", formData.currentJobDate);
  line("Ish joyi:", formData.currentJobFull);
  line("Tug'ilgan sanasi:", formData.birthDate);
  line("Tug'ilgan joyi:", formData.birthPlace);
  line("Millati:", formData.nationality);

  // Ta'lim
  doc.setFont("Times", "bold");
  doc.text("Ta'lim:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.educations.forEach((edu) => {
    doc.text(`• ${edu.year} y. - ${edu.institution} (${edu.degree})`, 20, y);
    y += 6;
  });

  // Ilmiy daraja
  y += 2;
  doc.setFont("Times", "bold");
  doc.text("Ilmiy darajasi:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.academicDegrees.forEach((deg) => {
    doc.text(`• ${deg.year} y. - ${deg.degree} (${deg.field})`, 20, y);
    y += 6;
  });

  // Ilmiy unvon
  y += 2;
  doc.setFont("Times", "bold");
  doc.text("Ilmiy unvoni:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.academicTitles.forEach((title) => {
    doc.text(`• ${title.year} y. - ${title.title}`, 20, y);
    y += 6;
  });

  // Chet tillari
  y += 2;
  doc.setFont("Times", "bold");
  doc.text("Chet tillari:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.foreignLanguages.forEach((lang) => {
    doc.text(`• ${lang.language} (${lang.level})`, 20, y);
    y += 6;
  });

  // Mukofotlar
  y += 2;
  doc.setFont("Times", "bold");
  doc.text("Mukofotlar:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.awards.forEach((award) => {
    doc.text(`• ${award.year} y. - ${award.award}`, 20, y);
    y += 6;
  });

  // Mehnat faoliyati
  y += 6;
  doc.setFont("Times", "bold");
  doc.text("MEHNAT FAOLIYATI:", 15, y); y += 6;
  doc.setFont("Times", "normal");
  formData.workExperiences.forEach((exp) => {
    doc.text(
      `• ${exp.startDate} - ${exp.endDate}: ${exp.position}, ${exp.organization}`,
      20,
      y
    );
    y += 6;
  });

  // Yaqin qarindoshlar jadvali
  y += 8;
  doc.setFont("Times", "bold");
  doc.text("YAQIN QARINDOSHLARI:", 15, y); y += 4;

  const relatives = formData.familyRelations.map((rel) => [
    rel.relationType,
    rel.fullName,
    rel.birthYear,
    rel.birthPlace,
    rel.workplace,
    rel.address,
  ]);

  autoTable(doc, {
    startY: y + 4,
    head: [["Aloqasi", "F.I.SH", "Tug‘ilgan yili", "Tug‘ilgan joyi", "Ish joyi", "Yashash manzili"]],
    body: relatives,
    styles: { font: "times", fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  const pdfBlob = doc.output('blob'); // Convert PDF to Blob
  const file = new File([pdfBlob], "obyektivka.pdf", { type: "application/pdf" });

  const result = await uploadFile(file,JSON.stringify({
    "firstName": formData.firstName,
    "lastName": formData.lastName,
    "birthDate": formData.birthDate,
    "currentJobDate": formData.currentJobDate,
    "currentJobFull": formData.currentJobFull,
    "nationality": formData.nationality
  }));

  if (result.success) {
    alert('File uploaded successfully!');
  } else {
    alert('File upload failed: ' + result.message);
  }

  doc.save("obyektivka.pdf");
}

// Helper: File to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
