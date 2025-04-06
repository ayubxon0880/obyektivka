import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import uploadFile from "./fileService.jsx";

export async function generatePDF(formData) {
    const doc = new jsPDF();

    // Add photo if exists
    if (formData.photo) {
        try {
            const imageData = await toBase64(formData.photo);
            doc.addImage(imageData, "JPEG", 150, 10, 40, 50);
        } catch (error) {
            console.error("Error processing photo:", error);
        }
    }

    // Title
    doc.setFont("Times", "bold");
    doc.setFontSize(14);
    doc.text("MA'LUMOTNOMA", 105, 20, null, null, "center");

    // Personal Information
    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    let y = 70;

    const line = (label, value) => {
        doc.text(`${label}`, 15, y);
        doc.text(`${value || ""}`, 80, y);
        y += 8;
    };

    // Basic Info
    line("Familiyasi, ismi, sharifi:", `${formData.familya} ${formData.ism} ${formData.sharif}`);
    line("Ish boshlagan vaqti:", formData.joriyLavozimSanasi);
    line("Ish joyi:", formData.joriyLavozimToLiq);
    line("Tug'ilgan sanasi:", formData.tugilganSana);
    line("Tug'ilgan joyi:", formData.tugilganJoyi);
    line("Millati:", formData.millati);
    line("Ma'lumoti:", formData.malumoti);

    // Education
    y += 2;
    doc.setFont("Times", "bold");
    doc.text("Ta'lim:", 15, y); y += 6;
    doc.setFont("Times", "normal");
    formData.tamomlagan.forEach((edu) => {
        if (edu) {
            doc.text(`• ${edu}`, 20, y);
            y += 6;
        }
    });

    // Specialization
    y += 2;
    doc.setFont("Times", "bold");
    doc.text("Mutaxassisligi:", 15, y); y += 6;
    doc.setFont("Times", "normal");
    doc.text(`• ${formData.mutaxassisligi || "Kiritilmagan"}`, 20, y);
    y += 6;

    // Academic Degrees
    if (formData.ilmiyDarajasi.length > 0) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Ilmiy darajasi:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        formData.ilmiyDarajasi.forEach((deg) => {
            if (deg) {
                doc.text(`• ${deg}`, 20, y);
                y += 6;
            }
        });
    }

    // Academic Titles
    if (formData.ilmiyUnvoni.length > 0) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Ilmiy unvoni:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        formData.ilmiyUnvoni.forEach((title) => {
            if (title) {
                doc.text(`• ${title}`, 20, y);
                y += 6;
            }
        });
    }

    // Languages
    if (formData.chetTillari.length > 0) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Chet tillari:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        formData.chetTillari.forEach((lang) => {
            if (lang) {
                doc.text(`• ${lang}`, 20, y);
                y += 6;
            }
        });
    }

    // Awards
    if (formData.mukofotlari.length > 0) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Mukofotlar:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        formData.mukofotlari.forEach((award) => {
            if (award) {
                doc.text(`• ${award}`, 20, y);
                y += 6;
            }
        });
    }

    // Party Membership
    if (formData.partiyaviyligi) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Partiyaviyligi:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        doc.text(`• ${formData.partiyaviyligi}`, 20, y);
        y += 6;
    }

    // Deputy Status
    if (formData.xalqDeputatimi) {
        y += 2;
        doc.setFont("Times", "bold");
        doc.text("Xalq deputatligi:", 15, y); y += 6;
        doc.setFont("Times", "normal");
        doc.text(`• ${formData.xalqDeputatimi}`, 20, y);
        y += 6;
    }

    // Work Experience
    y += 6;
    doc.setFont("Times", "bold");
    doc.text("MEHNAT FAOLIYATI:", 15, y); y += 6;
    doc.setFont("Times", "normal");

    if (formData.mehnatFaoliyati && formData.mehnatFaoliyati.length > 0) {
        formData.mehnatFaoliyati.forEach((exp) => {
            const period = exp.endYear === 'now'
                ? `${exp.startYear} - Hozirgacha`
                : `${exp.startYear} - ${exp.endYear}`;
            doc.text(`• ${period}: ${exp.position || ""}`, 20, y);
            y += 6;
        });
    } else {
        doc.text("• Kiritilmagan", 20, y);
        y += 6;
    }

    // Family Members
    y += 8;
    doc.setFont("Times", "bold");
    doc.text("YAQIN QARINDOSHLARI:", 15, y); y += 4;

    const relatives = formData.qarindoshlar.map((rel) => [
        rel.qarindoshligi,
        rel.fish,
        rel.tugilganYiliVaJoyi,
        rel.ishJoyiVaLavozimi,
        rel.turarJoyi,
        rel.vafotEtgan ? "Ha" : "Yo'q"
    ]);

    autoTable(doc, {
        startY: y + 4,
        head: [["Qarindoshligi", "F.I.SH", "Tug'ilgan yili va joyi", "Ish joyi va lavozimi", "Turar joyi", "Vafot etgan"]],
        body: relatives,
        styles: { font: "times", fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
        columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 40 },
            2: { cellWidth: 35 },
            3: { cellWidth: 40 },
            4: { cellWidth: 35 },
            5: { cellWidth: 15 }
        }
    });

    // Save and upload PDF
    const pdfBlob = doc.output('blob');
    const file = new File([pdfBlob], "obyektivka.pdf", { type: "application/pdf" });

    let formDataForBackend = formData;
    formDataForBackend.photo = null;
    const result = await uploadFile(file, JSON.stringify(formDataForBackend));

    if (result.success) {
        doc.save("obyektivka.pdf");
        return true;
    } else {
        alert(`Xatolik yuz berdi , qaytadan urinib ko'ring, rasm hajmi 10MB dan oshmaslik kerak !`);
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