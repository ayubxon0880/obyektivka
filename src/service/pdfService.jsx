import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateOneColumnResumePdf = (formData) => {
    const doc = new jsPDF();
    let y = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Helper - Section title
    const addSectionTitle = (title) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(title, 10, y);
        y += 2;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(10, y, pageWidth - 10, y);
        y += 6;
    };

    // ===== HEADER =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(formData.personalInformation.fullName || "Full Name", 10, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Aloqa ma'lumotlari alohida qatorda
    if (formData.personalInformation.phoneNumber) {
        doc.text(formData.personalInformation.phoneNumber, 10, y);
        y += 5;
    }
    if (formData.personalInformation.email) {
        doc.text(formData.personalInformation.email, 10, y);
        y += 5;
    }
    if (formData.personalInformation.location) {
        doc.text(formData.personalInformation.location, 10, y);
        y += 5;
    }
    if (formData.personalInformation.linkedin) {
        doc.text(formData.personalInformation.linkedin, 10, y);
        y += 5;
    }
    if (formData.personalInformation.github) {
        doc.text(formData.personalInformation.github, 10, y);
        y += 5;
    }
    if (formData.personalInformation.portfolio) {
        doc.text(formData.personalInformation.portfolio, 10, y);
        y += 10;
    }

    // ===== SUMMARY =====
    if (formData.summary?.text) {
        addSectionTitle("Summary");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const summaryLines = doc.splitTextToSize(formData.summary.text, pageWidth - 20);
        doc.text(summaryLines, 10, y);
        y += doc.getTextDimensions(summaryLines).h + 6;
    }

    // ===== WORK EXPERIENCE =====
    if (formData.experiences?.length) {
        addSectionTitle("Work Experience");
        formData.experiences.forEach(exp => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${exp.position} — ${exp.company}`, 10, y);
            y += 5;

            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.text(`${exp.location} | ${exp.startDate} - ${exp.endDate}`, 10, y);
            y += 5;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            exp.description.forEach(line => {
                doc.text(`• ${line}`, 12, y);
                y += 4;
            });
            y += 4;
        });
    }

    // ===== PROJECTS =====
    if (formData.projects?.length) {
        addSectionTitle("Projects");
        formData.projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(proj.name, 10, y);
            y += 5;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            const projDesc = doc.splitTextToSize(proj.description, pageWidth - 20);
            doc.text(projDesc, 10, y);
            y += doc.getTextDimensions(projDesc).h + 2;

            if (proj.technologies?.length) {
                doc.text(`Tech: ${proj.technologies.join(", ")}`, 10, y);
                y += 4;
            }
            if (proj.link) {
                doc.text(`Link: ${proj.link}`, 10, y);
                y += 4;
            }
            y += 3;
        });
    }

    // ===== EDUCATION =====
    if (formData.educations?.length) {
        addSectionTitle("Education");
        formData.educations.forEach(edu => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${edu.degree} in ${edu.field}`, 10, y);
            y += 5;

            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.text(`${edu.university} — ${edu.location}`, 10, y);
            y += 5;

            doc.text(`${edu.startDate} - ${edu.endDate}`, 10, y);
            y += 8;
        });
    }

    // ===== SKILLS =====
    if (formData.skills?.length) {
        addSectionTitle("Skills");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        formData.skills.forEach(skill => {
            doc.text(`• ${skill}`, 10, y);
            y += 4;
        });
        y += 4;
    }

    // ===== LANGUAGES =====
    if (formData.languages?.length) {
        addSectionTitle("Languages");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        formData.languages.forEach(lang => {
            doc.text(`${lang.language} — ${lang.level}`, 10, y);
            y += 5;
        });
        y += 4;
    }

    // ===== CERTIFICATIONS =====
    if (formData.certifications?.length) {
        addSectionTitle("Certifications");
        autoTable(doc, {
            startY: y,
            head: [["Name", "Issuer", "Date", "Link"]],
            body: formData.certifications.map(c => [
                c.name, c.issuer, c.date, c.link
            ]),
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: "bold" }
        });
        y = doc.lastAutoTable.finalY + 6;
    }

    // ===== EXTRA SECTIONS (Awards, Activities, etc.) =====
    if (formData.awards?.length) {
        addSectionTitle("Awards & Activities");
        formData.awards.forEach(a => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.text(`• ${a}`, 10, y);
            y += 5;
        });
    }

    doc.save("Resume.pdf");
};
