import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import uploadFile from "./fileService.jsx";

export async function generatePDF(formData, workExperiences) {
    const doc = new jsPDF();
    let currentPage = 1;
    const maxPages = 2;
    let y = 30;

    // Function to check and add new page
    const checkPageBreak = (requiredSpace) => {
        if (y + requiredSpace > 280 && currentPage < maxPages) {
            doc.addPage();
            currentPage++;
            y = 30;
            return true;
        }
        return false;
    };

    // Add photo if exists (only on first page)
    if (formData.photo && currentPage === 1) {
        try {
            const imageData = await toBase64(formData.photo);
            doc.addImage(imageData, "JPEG", 150, 10, 40, 50);
        } catch (error) {
            console.error("Error processing photo:", error);
        }
    }

    // Title (first page only)
    if (currentPage === 1) {
        doc.setFont("Times", "bold");
        doc.setFontSize(14);
        doc.text("MA'LUMOTNOMA", 105, 20, null, null, "center");
    }

    // Personal Information
    const personalInfo = [
        { label: "Familiyasi, ismi, sharifi:", value: `${formData.familya} ${formData.ism} ${formData.sharif}` },
        { label: "Ish boshlagan vaqti:", value: formData.joriyLavozimSanasi },
        { label: "Ish joyi:", value: formData.joriyLavozimToLiq },
        { label: "Tug'ilgan sanasi:", value: formData.tugilganSana },
        { label: "Tug'ilgan joyi:", value: formData.tugilganJoyi },
        { label: "Millati:", value: formData.millati },
        { label: "Ma'lumoti:", value: formData.malumoti },
        { label: "Telefon:", value: formData.telefon || "yo'q" }
    ];

    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    personalInfo.forEach(info => {
        checkPageBreak(8);
        doc.text(info.label, 15, y);
        doc.text(info.value, 80, y);
        y += 8;
    });

    // Education
    checkPageBreak(15);
    doc.setFont("Times", "bold");
    doc.text("Ta'lim:", 15, y); y += 6;
    doc.setFont("Times", "normal");
    formData.tamomlagan.forEach((edu) => {
        checkPageBreak(8);
        const eduText = `${edu.institution} (${edu.startDate} - ${edu.endDate}), ${edu.specialization}`;
        doc.text(`• ${eduText}`, 20, y);
        y += 6;
    });

    // Professional Information
    const professionalSections = [
        { title: "Mutaxassisligi:", content: [formData.mutaxassisligi || "Kiritilmagan"] },
        { title: "Ilmiy darajasi:", content: formData.ilmiyDarajasi },
        { title: "Ilmiy unvoni:", content: formData.ilmiyUnvoni },
        { title: "Chet tillari:", content: formData.chetTillari.map(lang => `${lang.language} - ${lang.level}`) },
        { title: "Mukofotlar:", content: formData.mukofotlari }
    ];

    professionalSections.forEach(section => {
        if (section.content && section.content.length > 0) {
            checkPageBreak(15);
            doc.setFont("Times", "bold");
            doc.text(section.title, 15, y); y += 6;
            doc.setFont("Times", "normal");
            section.content.forEach(item => {
                checkPageBreak(8);
                doc.text(`• ${item}`, 20, y);
                y += 6;
            });
        }
    });

    // Work Experience
    checkPageBreak(15);
    doc.setFont("Times", "bold");
    doc.text("MEHNAT FAOLIYATI:", 15, y); y += 6;
    doc.setFont("Times", "normal");

    if (workExperiences.length > 0) {
        workExperiences.forEach(exp => {
            checkPageBreak(8);
            const period = exp.endYear === 'now'
                ? `${exp.startYear} - Hozirgacha`
                : `${exp.startYear} - ${exp.endYear}`;
            doc.text(`• ${period}: ${exp.position}`, 20, y);
            y += 6;
        });
    } else {
        doc.text("• Kiritilmagan", 20, y);
        y += 6;
    }

    // Family Members Table
    checkPageBreak(40);
    const relatives = formData.qarindoshlar.map(rel => [
        rel.qarindoshligi,
        rel.fish,
        rel.tugilganYiliVaJoyi,
        rel.ishJoyiVaLavozimi,
        rel.turarJoyi,
        rel.vafotEtgan ? "Ha" : "Yo'q"
    ]);

    autoTable(doc, {
        startY: y,
        head: [["Qarindoshligi", "F.I.SH", "Tug'ilgan yili va joyi", "Ish joyi va lavozimi", "Turar joyi", "Vafot etgan"]],
        body: relatives,
        styles: { font: "times", fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
        // didDrawPage: () => { y = doc.lastAutoTable.finalY + 10; }
    });

    if (currentPage < maxPages) {
        doc.addPage();
        currentPage++;
        y = 30;
    }

    const additionalSections = [
        { title: "Kuchli tomonlari:", content: formData.kuchliTaraflari },
        { title: "Kuchsiz tomonlari:", content: formData.kuchsizTaraflari },
        { title: "Professional qobiliyatlari:", content: formData.professionalQobiliyatlari },
        { title: "Shaxsiy fazilatlari:", content: formData.shaxsiyFazilatlari },
        { title: "Qiziqishlari:", content: [formData.qiziqishlari] },
        { title: "Qo'shimcha ma'lumot:", content: [formData.qoshimchaMalumot] }
    ];

    additionalSections.forEach(section => {
        checkPageBreak(15);
        doc.setFont("Times", "bold");
        doc.text(section.title, 15, y); y += 6;
        doc.setFont("Times", "normal");

        section.content.forEach(item => {
            const lines = doc.splitTextToSize(item, 170);
            lines.forEach(line => {
                checkPageBreak(8);
                doc.text(`• ${line}`, 20, y);
                y += 6;
            });
        });
    });

    const pdfBlob = doc.output('blob');
    const file = new File([pdfBlob], "obyektivka.pdf", { type: "application/pdf" });

    let formDataForBackend = { ...formData };
    formDataForBackend.photo = null;
    formDataForBackend.chetTillari = formData.chetTillari.map(t => `${t.language}:${t.level}`);

    const result = await uploadFile(file, JSON.stringify(formDataForBackend));

    if (result.success) {
        doc.save("obyektivka.pdf");
        return true;
    } else {
        alert(`Xatolik yuz berdi, qaytadan urinib ko'ring, rasm hajmi 10MB dan oshmaslik kerak!`);
        return false;
    }
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