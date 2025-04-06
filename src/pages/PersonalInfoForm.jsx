import { useState } from 'react';
import {generatePDF} from "../service/pdfService.jsx";

const PersonalInfoForm = () => {
    {/*
    const [formData, setFormData] = useState({
        familya: '',
        ism: '',
        sharif: '',
        photo: null,
        joriyLavozimSanasi: '',
        joriyLavozimToLiq: '',
        tugilganSana: '',
        tugilganJoyi: '',
        millati: '',
        malumoti: 'Oliy',
        partiyaviyligi: '',
        tamomlagan: [''],
        mutaxassisligi: '',
        ilmiyDarajasi: [],
        ilmiyUnvoni: [],
        chetTillari: [],
        mukofotlari: [],
        xalqDeputatimi: '',
        mehnatFaoliyati: [],
        qarindoshlar: [
            {
                qarindoshligi: 'Otasi',
                fish: '',
                tugilganYiliVaJoyi: '',
                vafotEtgan: false,
                ishJoyiVaLavozimi: '',
                turarJoyi: ''
            }
        ]
    });
    const [workExperiences, setWorkExperiences] = useState([]);
    */}

    const [formData, setFormData] = useState({
        familya: 'Yuldashev',
        ism: 'Shohruh',
        sharif: 'Shodmonovich',
        photo: null,
        joriyLavozimSanasi: '2020 yil 15 sentabrdan',
        joriyLavozimToLiq: 'Toshkent Axborot Texnologiyalari Universiteti dasturiy injiniring kafedrasi dotsenti',
        tugilganSana: '1985-06-20',
        tugilganJoyi: 'Toshkent shahri',
        millati: 'o\'zbek',
        malumoti: 'Oliy',
        partiyaviyligi: 'O\'zbekiston Liberal Demokratik partiyasi a\'zosi',
        tamomlagan: [
            '2007 yil Toshkent Axborot Texnologiyalari Universiteti (bakalavr)',
            '2009 yil Toshkent Axborot Texnologiyalari Universiteti (magistr)'
        ],
        mutaxassisligi: 'Dasturiy injiniring',
        ilmiyDarajasi: ['Texnika fanlari nomzodi (PhD)'],
        ilmiyUnvoni: ['Dotsent'],
        chetTillari: ['Ingliz tili', 'Rus tili'],
        mukofotlari: ['O\'zbekiston Respublikasi "Shuhrat" medali'],
        xalqDeputatimi: 'Toshkent shahar Kengashi deputati',
        mehnatFaoliyati: [],
        qarindoshlar: [
            {
                qarindoshligi: 'Otasi',
                fish: 'Yuldashev Shodmon Qosimovich',
                tugilganYiliVaJoyi: '1955 yil, Toshkent shahri',
                vafotEtgan: false,
                ishJoyiVaLavozimi: 'Pensiyada (sobiq maktab direktori)',
                turarJoyi: 'Toshkent shahri, Mirzo Ulug\'bek tumani, Navoiy ko\'chasi, 25-uy'
            },
            {
                qarindoshligi: 'Onasi',
                fish: 'Yuldasheva Dilfuza Xamidovna',
                tugilganYiliVaJoyi: '1960 yil, Toshkent shahri',
                vafotEtgan: false,
                ishJoyiVaLavozimi: 'Pensiyada (sobiq shifokor)',
                turarJoyi: 'Toshkent shahri, Mirzo Ulug\'bek tumani, Navoiy ko\'chasi, 25-uy'
            }
        ]
    });

    const [workExperiences, setWorkExperiences] = useState([
        {
            startYear: '2010',
            endYear: '2015',
            position: 'TATU dasturiy injiniring kafedrasi assistenti'
        },
        {
            startYear: '2015',
            endYear: '2020',
            position: 'TATU dasturiy injiniring kafedrasi katta o\'qituvchisi'
        },
        {
            startYear: '2020',
            endYear: 'now',
            position: 'TATU dasturiy injiniring kafedrasi dotsenti'
        }
    ]);

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.familya) newErrors.familya = 'Familya kiritilishi shart';
            if (!formData.ism) newErrors.ism = 'Ism kiritilishi shart';
            if (!formData.sharif) newErrors.sharif = 'Sharif kiritilishi shart';
            if (!formData.photo) newErrors.photo = 'Rasm tanlanishi shart';
            if (!formData.tugilganSana) newErrors.tugilganSana = 'Tug\'ilgan sana kiritilishi shart';
            if (!formData.tugilganJoyi) newErrors.tugilganJoyi = 'Tug\'ilgan joyi kiritilishi shart';
            if (!formData.millati) newErrors.millati = 'Millati kiritilishi shart';
        }

        if (step === 2) {
            if (!formData.joriyLavozimSanasi) newErrors.joriyLavozimSanasi = 'Lavozim sanasi kiritilishi shart';
            if (!formData.joriyLavozimToLiq) newErrors.joriyLavozimToLiq = 'Lavozim to\'liq kiritilishi shart';
            if (workExperiences.length === 0) newErrors.workExperiences = 'Kamida bitta ish tajribasi kiritilishi shart';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            photo: e.target.files[0]
        }));
    };

    const handleTamomlaganChange = (index, value) => {
        const newTamomlagan = [...formData.tamomlagan];
        newTamomlagan[index] = value;
        setFormData(prev => ({
            ...prev,
            tamomlagan: newTamomlagan
        }));
    };

    const addTamomlaganField = () => {
        setFormData(prev => ({
            ...prev,
            tamomlagan: [...prev.tamomlagan, '']
        }));
    };

    const removeTamomlaganField = (index) => {
        const newTamomlagan = formData.tamomlagan.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            tamomlagan: newTamomlagan
        }));
    };

    const handleQarindoshChange = (index, field, value) => {
        const newQarindoshlar = [...formData.qarindoshlar];
        newQarindoshlar[index][field] = value;
        setFormData(prev => ({
            ...prev,
            qarindoshlar: newQarindoshlar
        }));
    };

    const addQarindoshField = () => {
        setFormData(prev => ({
            ...prev,
            qarindoshlar: [
                ...prev.qarindoshlar,
                {
                    qarindoshligi: 'Otasi',
                    fish: '',
                    tugilganYiliVaJoyi: '',
                    vafotEtgan: false,
                    ishJoyiVaLavozimi: '',
                    turarJoyi: ''
                }
            ]
        }));
    };

    const removeQarindoshField = (index) => {
        const newQarindoshlar = formData.qarindoshlar.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            qarindoshlar: newQarindoshlar
        }));
    };

    const handleDynamicFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addField = (fieldType) => {
        const newField = [...formData[fieldType], ''];
        handleDynamicFieldChange(fieldType, newField);
    };

    const removeField = (fieldType, index) => {
        const newFields = formData[fieldType].filter((_, i) => i !== index);
        handleDynamicFieldChange(fieldType, newFields);
    };

    const handleFieldChange = (fieldType, index, value) => {
        const newFields = [...formData[fieldType]];
        newFields[index] = value;
        handleDynamicFieldChange(fieldType, newFields);
    };

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear + 5; year >= 1925; year--) {
            years.push(year);
        }
        return years;
    };

    const years = generateYears();

    const addWorkExperience = () => {
        setWorkExperiences([
            ...workExperiences,
            {
                startYear: '2020',
                endYear: 'now',
                position: ''
            }
        ]);
    };

    const removeWorkExperience = (index) => {
        if (workExperiences.length <= 1) return;
        const newExperiences = workExperiences.filter((_, i) => i !== index);
        setWorkExperiences(newExperiences);
    };

    const handleWorkExperienceChange = (index, field, value) => {
        const newExperiences = [...workExperiences];
        newExperiences[index][field] = value;
        setWorkExperiences(newExperiences);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            mehnatFaoliyati: workExperiences
        };
        generatePDF(finalData);
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} font-medium`}>
                            {step}
                        </div>
                        <span className={`mt-2 text-sm ${currentStep >= step ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                            {step === 1 && 'Shaxsiy ma\'lumotlar'}
                            {step === 2 && 'Ish faoliyati'}
                            {step === 3 && 'Oilaviy ma\'lumotlar'}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        {/* Basic Info Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Asosiy ma'lumotlar</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Familya <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Abdullayev"
                                        className={`w-full px-3 py-2 border ${errors.familya ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="familya"
                                        value={formData.familya}
                                        onChange={handleInputChange}
                                    />
                                    {errors.familya && <p className="mt-1 text-sm text-red-600">{errors.familya}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ism <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Botir"
                                        className={`w-full px-3 py-2 border ${errors.ism ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="ism"
                                        value={formData.ism}
                                        onChange={handleInputChange}
                                    />
                                    {errors.ism && <p className="mt-1 text-sm text-red-600">{errors.ism}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sharif <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Bahodirovich"
                                        className={`w-full px-3 py-2 border ${errors.sharif ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="sharif"
                                        value={formData.sharif}
                                        onChange={handleInputChange}
                                    />
                                    {errors.sharif && <p className="mt-1 text-sm text-red-600">{errors.sharif}</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rasm (3x4) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    required
                                    accept="image/jpg, image/jpeg, image/png"
                                    className={`w-full px-3 py-2 border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                    onChange={handleFileChange}
                                />
                                {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                                <small className="text-gray-500 text-xs">.jpg, .jpeg yoki .png formatida, maksimum 1MB</small>
                            </div>
                        </div>

                        {/* Birth Info Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Tug'ilgan haqida ma'lumot</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tug'ilgan sana <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className={`w-full px-3 py-2 border ${errors.tugilganSana ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="tugilganSana"
                                        value={formData.tugilganSana}
                                        onChange={handleInputChange}
                                    />
                                    {errors.tugilganSana && <p className="mt-1 text-sm text-red-600">{errors.tugilganSana}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tug'ilgan joyi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Qashqadaryo viloyati, Nishon tumani"
                                        className={`w-full px-3 py-2 border ${errors.tugilganJoyi ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="tugilganJoyi"
                                        value={formData.tugilganJoyi}
                                        onChange={handleInputChange}
                                    />
                                    {errors.tugilganJoyi && <p className="mt-1 text-sm text-red-600">{errors.tugilganJoyi}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Millati <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="O'zbek"
                                        className={`w-full px-3 py-2 border ${errors.millati ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="millati"
                                        value={formData.millati}
                                        onChange={handleInputChange}
                                    />
                                    {errors.millati && <p className="mt-1 text-sm text-red-600">{errors.millati}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ma'lumoti <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                        name="malumoti"
                                        value={formData.malumoti}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Oliy">Oliy</option>
                                        <option value="O'rta maxsus">O'rta maxsus</option>
                                        <option value="O'rta">O'rta</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Ta'lim haqida ma'lumot</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tamomlagan o'quv muassasalari</label>
                                    {formData.tamomlagan.map((item, index) => (
                                        <div key={index} className="mb-2 flex gap-2 items-center">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="1997 yil Toshkent davlat universiteti (bakalavri)"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                    value={item}
                                                    onChange={(e) => handleTamomlaganChange(index, e.target.value)}
                                                />
                                            </div>
                                            {formData.tamomlagan.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="p-2 text-red-500 hover:text-red-700"
                                                    onClick={() => removeTamomlaganField(index)}
                                                    aria-label="Remove"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                        onClick={addTamomlaganField}
                                    >
                                        + O'quv muassasasi qo'shish
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mutaxassisligi
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Dasturiy injiniring"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                        name="mutaxassisligi"
                                        value={formData.mutaxassisligi}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Qo'shimcha ma'lumotlar</h3>
                            <div className="space-y-6">
                                {/* Languages */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biladigan chet tillari</label>
                                    {formData.chetTillari.map((item, index) => (
                                        <div key={`chet-tillari-${index}`} className="mb-2 flex gap-2 items-center">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="Ingliz tili"
                                                value={item}
                                                onChange={(e) => handleFieldChange('chetTillari', index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeField('chetTillari', index)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                        onClick={() => addField('chetTillari')}
                                    >
                                        + Chet tili qo'shish
                                    </button>
                                </div>

                                {/* Academic Degrees */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ilmiy darajalari</label>
                                    {formData.ilmiyDarajasi.map((item, index) => (
                                        <div key={`ilmiy-darajasi-${index}`} className="mb-2 flex gap-2 items-center">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="Fanlar doktori (PhD)"
                                                value={item}
                                                onChange={(e) => handleFieldChange('ilmiyDarajasi', index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeField('ilmiyDarajasi', index)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                        onClick={() => addField('ilmiyDarajasi')}
                                    >
                                        + Ilmiy daraja qo'shish
                                    </button>
                                </div>

                                {/* Academic Titles */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ilmiy unvonlari</label>
                                    {formData.ilmiyUnvoni.map((item, index) => (
                                        <div key={`ilmiy-unvoni-${index}`} className="mb-2 flex gap-2 items-center">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="Dotsent"
                                                value={item}
                                                onChange={(e) => handleFieldChange('ilmiyUnvoni', index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeField('ilmiyUnvoni', index)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                        onClick={() => addField('ilmiyUnvoni')}
                                    >
                                        + Ilmiy unvon qo'shish
                                    </button>
                                </div>

                                {/* Awards */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Davlat mukofotlari</label>
                                    {formData.mukofotlari.map((item, index) => (
                                        <div key={`mukofotlar-${index}`} className="mb-2 flex gap-2 items-center">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="O'zbekiston Respublikasi xalq o'qituvchisi"
                                                value={item}
                                                onChange={(e) => handleFieldChange('mukofotlari', index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeField('mukofotlari', index)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                        onClick={() => addField('mukofotlari')}
                                    >
                                        + Mukofot qo'shish
                                    </button>
                                </div>

                                {/* Party Membership */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Partiyaviyligi</label>
                                    <input
                                        type="text"
                                        placeholder="O'zbekiston Xalq demokratik partiyasi a'zosi"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                        name="partiyaviyligi"
                                        value={formData.partiyaviyligi}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Deputy Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Xalq deputatlari Kengashi a'zosimi?
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                        name="xalqDeputatimi"
                                        value={formData.xalqDeputatimi}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow"
                            >
                                Keyingisi →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Work Experience */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Ish faoliyati</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Joriy lavozim sanasi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="2010 yil 06 sentabrdan"
                                        className={`w-full px-3 py-2 border ${errors.joriyLavozimSanasi ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="joriyLavozimSanasi"
                                        value={formData.joriyLavozimSanasi}
                                        onChange={handleInputChange}
                                    />
                                    {errors.joriyLavozimSanasi && <p className="mt-1 text-sm text-red-600">{errors.joriyLavozimSanasi}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Joriy lavozim to'liq <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="O'zbekiston Milliy universiteti dasturiy injiniring kafedrasi mudiri"
                                        className={`w-full px-3 py-2 border ${errors.joriyLavozimToLiq ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-teal-500 focus:border-teal-500`}
                                        name="joriyLavozimToLiq"
                                        value={formData.joriyLavozimToLiq}
                                        onChange={handleInputChange}
                                    />
                                    {errors.joriyLavozimToLiq && <p className="mt-1 text-sm text-red-600">{errors.joriyLavozimToLiq}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Mehnat faoliyati tarixi</h3>
                            {errors.workExperiences && <p className="text-sm text-red-600 mb-2">{errors.workExperiences}</p>}
                            {workExperiences.map((exp, index) => (
                                <div key={`work-exp-${index}`} className="mb-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <select
                                            required
                                            className="w-24 px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-teal-500 focus:border-teal-500"
                                            value={exp.startYear}
                                            onChange={(e) => handleWorkExperienceChange(index, 'startYear', e.target.value)}
                                        >
                                            {years.map(year => (
                                                <option key={`start-${year}`} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <span className="text-sm text-gray-500">dan</span>
                                        <select
                                            required
                                            className="w-24 px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-teal-500 focus:border-teal-500"
                                            value={exp.endYear}
                                            onChange={(e) => handleWorkExperienceChange(index, 'endYear', e.target.value)}
                                        >
                                            <option value="now">Hozir</option>
                                            {years.map(year => (
                                                <option key={`end-${year}`} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <span className="text-sm text-gray-500">gacha</span>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Toshkent davlat universiteti dasturiy injiniring kafedrasi assistenti"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            value={exp.position}
                                            onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                                        />
                                        {workExperiences.length > 1 && (
                                            <button
                                                type="button"
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeWorkExperience(index)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                onClick={addWorkExperience}
                            >
                                + Ish joyi qo'shish
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                            >
                                ← Orqaga
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow"
                            >
                                Keyingisi →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Family Information */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Qarindoshlari haqida ma'lumot</h3>

                            {formData.qarindoshlar.map((qarindosh, index) => (
                                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h6 className="text-sm font-medium">
                                            {index + 1}. Qarindosh - <b>{qarindosh.qarindoshligi}</b>
                                        </h6>
                                        {formData.qarindoshlar.length > 1 && (
                                            <button
                                                type="button"
                                                className="text-red-500 text-sm hover:text-red-700"
                                                onClick={() => removeQarindoshField(index)}
                                            >
                                                O'chirish
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Qarindoshligi <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                value={qarindosh.qarindoshligi}
                                                onChange={(e) => handleQarindoshChange(index, 'qarindoshligi', e.target.value)}
                                            >
                                                <option value="Otasi">Otasi</option>
                                                <option value="Onasi">Onasi</option>
                                                <option value="Akasi">Akasi</option>
                                                <option value="Ukasi">Ukasi</option>
                                                <option value="Opasi">Opasi</option>
                                                <option value="Singlisi">Singlisi</option>
                                                <option value="Turmush o'rtog'i">Turmush o'rtog'i</option>
                                                <option value="O'g'li">O'g'li</option>
                                                <option value="Qizi">Qizi</option>
                                                <option value="Qaynotasi">Qaynotasi</option>
                                                <option value="Tog'asi">Tog'asi</option>
                                                <option value="Amakisi">Amakisi</option>
                                                <option value="Xolasi">Xolasi</option>
                                                <option value="Ammasi">Ammasi</option>
                                                <option value="Buvisi">Buvisi</option>
                                                <option value="Buvasi">Buvasi</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                F.I.Sh. <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Abdullayev Bahodir Salimovich"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                                value={qarindosh.fish}
                                                onChange={(e) => handleQarindoshChange(index, 'fish', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tug'ilgan yili va joyi <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="1941 yil, Samarqand shahri"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            value={qarindosh.tugilganYiliVaJoyi}
                                            onChange={(e) => handleQarindoshChange(index, 'tugilganYiliVaJoyi', e.target.value)}
                                        />
                                    </div>

                                    <label className="flex items-center gap-2 mb-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                            checked={qarindosh.vafotEtgan}
                                            onChange={(e) => handleQarindoshChange(index, 'vafotEtgan', e.target.checked)}
                                        />
                                        <span>Vafot etgan</span>
                                    </label>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ish joyi va lavozimi <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Pensiyada (Toshkent davlat iqtisodiyot universiteti o'qituvchisi)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            value={qarindosh.ishJoyiVaLavozimi}
                                            onChange={(e) => handleQarindoshChange(index, 'ishJoyiVaLavozimi', e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Turar joyi <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Toshkent shahri, Mirzo Ulug'bek tumani, B.Niyozov ko'chasi, 30-uy, 15-xonadon"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            value={qarindosh.turarJoyi}
                                            onChange={(e) => handleQarindoshChange(index, 'turarJoyi', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-teal-700 bg-white hover:bg-teal-50"
                                onClick={addQarindoshField}
                            >
                                + Qarindosh qo'shish
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                            >
                                ← Orqaga
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow"
                            >
                                Ma'lumotlarni yuborish
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PersonalInfoForm;