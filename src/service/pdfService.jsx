import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import uploadFile from "./fileService.jsx";

export async function generatePDF(formData, workExperiences) {
    const doc = new jsPDF();
    let currentPage = 1;
    const maxPages = 2;
    let y = 30;

    const checkPageBreak = (requiredSpace) => {
        if (y + requiredSpace > 280 && currentPage < maxPages) {
            doc.addPage();
            currentPage++;
            y = 30;
            return true;
        }
        return false;
    };

    if (formData.photo && currentPage === 1) {
        try {
            const imageData = await toBase64(formData.photo);
            doc.addImage(imageData, "JPEG", 150, 10, 40, 50);
        } catch (error) {
            console.error("Error processing photo:", error);
        }
    }

    if (currentPage === 1) {
        doc.setFont("Times", "bold");
        doc.setFontSize(14);
        doc.text("MA'LUMOTNOMA", 105, 20, null, null, "center");
    }

    const personalInfo = [
        formData.familya && formData.ism && formData.sharif && {
            label: "Familiyasi, ismi, sharifi:", 
            value: `${formData.familya} ${formData.ism} ${formData.sharif}`
        },
        formData.joriyIshJoyi && {
            label: "Joriy ish joyi:", 
            value: formData.joriyIshJoyi
        },
        formData.joriyLavozimToLiq && {
            label: "Lavozimi:", 
            value: formData.joriyLavozimToLiq
        },
        formData.joriyLavozimSanasi && {
            label: "Ish boshlagan sanasi:", 
            value: formData.joriyLavozimSanasi
        },
        formData.tugilganSana && {
            label: "Tug'ilgan sanasi:", 
            value: formData.tugilganSana
        },
        formData.tugilganJoyi && {
            label: "Tug'ilgan joyi:", 
            value: formData.tugilganJoyi
        },
        formData.hozirgiYashashJoyi && {
            label: "Hozirgi yashash joyi:", 
            value: formData.hozirgiYashashJoyi
        },
        formData.millati && {
            label: "Millati:", 
            value: formData.millati
        },
        formData.malumoti && {
            label: "Ma'lumoti:", 
            value: formData.malumoti
        },
        formData.telefon && {
            label: "Telefon:", 
            value: formData.telefon
        }
    ].filter(Boolean);

    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    personalInfo.forEach(info => {
        checkPageBreak(8);
        doc.text(info.label, 15, y);
        doc.text(info.value, 80, y);
        y += 8;
    });

    if (formData.tamomlagan?.length > 0) {
        checkPageBreak(15);
        doc.setFont("Times", "bold");
        doc.text("Ta'lim:", 15, y); 
        y += 6;
        doc.setFont("Times", "normal");
        
        formData.tamomlagan.forEach((edu) => {
            if (edu.institution) {
                checkPageBreak(8);
                const currentlyStudying = edu.currentlyStudying ? "Hozirgi kunda o'qiyapti" : "";
                const eduText = `${edu.institution}${edu.startDate || edu.endDate ? ` (${edu.startDate || ''} - ${edu.endDate || ''})` : ''}${currentlyStudying ? `, ${currentlyStudying}` : ''}${edu.specialization ? `, ${edu.specialization}` : ''}`;
                doc.text(`• ${eduText}`, 20, y);
                y += 6;
            }
        });
    }

    const professionalSections = [
        formData.mutaxassisligi && {
            title: "Mutaxassisligi:", 
            content: formData.mutaxassisligi
        },
        formData.ilmiyDarajasi?.length > 0 && {
            title: "Ilmiy darajasi:", 
            content: formData.ilmiyDarajasi
        },
        formData.ilmiyUnvoni?.length > 0 && {
            title: "Ilmiy unvoni:", 
            content: formData.ilmiyUnvoni
        },
        formData.chetTillari?.length > 0 && {
            title: "Chet tillari:", 
            content: formData.chetTillari.map(lang => `${lang.language} - ${lang.level}`)
        },
        formData.mukofotlari?.length > 0 && {
            title: "Mukofotlar:", 
            content: formData.mukofotlari
        }
    ].filter(Boolean);
    
    const sectionSpacing = 5;
    const lineHeight = 7;
    
    professionalSections.forEach(section => {
        checkPageBreak(sectionSpacing + lineHeight);
        
        doc.setFont("Times", "bold");
        doc.text(section.title, 15, y);
        y += lineHeight;
        
        doc.setFont("Times", "normal");
        
        const contentArray = Array.isArray(section.content) ? section.content : [section.content];
        
        contentArray.forEach(item => {
            if (item) {
                checkPageBreak(lineHeight);
                doc.text(`• ${item}`, 20, y);
                y += lineHeight;
            }
        });
        
        y += sectionSpacing;
    });

    const hasWorkExperiences = (formData.joriyIshJoyi && formData.joriyLavozimToLiq) ||
                              (workExperiences && workExperiences.length > 0);
    
    if (hasWorkExperiences) {
        checkPageBreak(15);
        doc.setFont("Times", "bold");
        doc.text("MEHNAT FAOLIYATI:", 15, y); 
        y += 6;
        doc.setFont("Times", "normal");

        if (formData.joriyIshJoyi && formData.joriyLavozimToLiq) {
            const period = formData.joriyLavozimTugashSanasi === 'now' 
                ? `${formData.joriyLavozimSanasi || ''} - Hozirgacha` 
                : `${formData.joriyLavozimSanasi || ''} - ${formData.joriyLavozimTugashSanasi || ''}`;
            
            doc.text(`• ${period}: ${formData.joriyLavozimToLiq}${formData.joriyIshJoyi ? ` (${formData.joriyIshJoyi})` : ''}`, 20, y);
            y += 6;
        }

        if (workExperiences?.length > 0) {
            workExperiences.forEach(exp => {
                if (exp.position) {
                    checkPageBreak(8);
                    const period = exp.endYear === 'now'
                        ? `${exp.startYear || ''} - Hozirgacha`
                        : `${exp.startYear || ''} - ${exp.endYear || ''}`;
                    const companyInfo = exp.company ? ` (${exp.company})` : '';
                    doc.text(`• ${period}: ${exp.position}${companyInfo}`, 20, y);
                    y += 6;
                }
            });
        }
    }

    if (formData.qarindoshlar?.length > 0) {
        checkPageBreak(40);
        const relatives = formData.qarindoshlar.map(rel => [
            rel.qarindoshligi || '',
            rel.fish || '',
            rel.tugilganYiliVaJoyi || '',
            rel.ishJoyiVaLavozimi || '',
            rel.turarJoyi || '',
            rel.vafotEtgan ? "Ha" : "Yo'q"
        ]);

        autoTable(doc, {
            startY: y,
            head: [["Qarindoshligi", "F.I.SH", "Tug'ilgan yili va joyi", "Ish joyi va lavozimi", "Turar joyi", "Vafot etgan"]],
            body: relatives,
            styles: { font: "times", fontSize: 10 },
            headStyles: { fillColor: [41, 128, 185] },
            didDrawPage: (data) => { y = data.cursor.y + 10; }
        });
    }

    const additionalSections = [
        formData.kuchliTaraflari?.length > 0 && {
            title: "Kuchli tomonlari:", 
            content: formData.kuchliTaraflari
        },
        formData.kuchsizTaraflari?.length > 0 && {
            title: "Kuchsiz tomonlari:", 
            content: formData.kuchsizTaraflari
        },
        formData.professionalQobiliyatlari?.length > 0 && {
            title: "Professional qobiliyatlari:", 
            content: formData.professionalQobiliyatlari
        },
        formData.shaxsiyFazilatlari?.length > 0 && {
            title: "Shaxsiy fazilatlari:", 
            content: formData.shaxsiyFazilatlari
        },
        formData.qiziqishlari && {
            title: "Qiziqishlari:", 
            content: [formData.qiziqishlari]
        },
        formData.qoshimchaMalumot && {
            title: "Qo'shimcha ma'lumot:", 
            content: [formData.qoshimchaMalumot]
        }
    ].filter(Boolean);

    additionalSections.forEach(section => {
        checkPageBreak(15);
        doc.setFont("Times", "bold");
        doc.text(section.title, 15, y); 
        y += 6;
        doc.setFont("Times", "normal");

        const contentArray = Array.isArray(section.content) ? section.content : [section.content];
        
        contentArray.forEach(item => {
            if (item) {
                const lines = doc.splitTextToSize(item, 170);
                lines.forEach(line => {
                    checkPageBreak(8);
                    doc.text(`• ${line}`, 20, y);
                    y += 6;
                });
            }
        });
    });

    const pdfBlob = doc.output('blob');
    const file = new File([pdfBlob], "resume360.pdf", { type: "application/pdf" });

    let formDataForBackend = { ...formData };
    formDataForBackend.photo = null;
    formDataForBackend.chetTillari = formData.chetTillari?.map(t => `${t.language}:${t.level}`) || [];

    const result = await uploadFile(file, JSON.stringify(formDataForBackend));

    if (result.success) {
        doc.save("resume360.pdf");
        return true;
    } else {
        alert(`Xatolik yuz berdi, qaytadan urinib ko'ring, rasm hajmi 10MB dan oshmaslik kerak!`);
        return false;
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}