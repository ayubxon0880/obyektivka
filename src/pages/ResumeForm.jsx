import React, { useState } from 'react';
import CopyButton from '../component/Button';
import axios from "axios";

// Input validation patterns
const VALIDATIONS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s-]{10,}$/,
    url: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
    date: /^([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$|^Present$/,
    name: /^.{2,}$/,
    text: /^.{2,}$/,
};

// Sanitize input to prevent XSS
const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '');
};

function ResumeForm() {
    const [formData, setFormData] = useState({
        personalInformation: {
            fullName: '',
            phoneNumber: '',
            email: '',
            location: '',
            linkedin: '',
            github: '',
            portfolio: ''
        },
        summary: {
            text: ''
        },
        skills: [],
        experiences: [{
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ['']
        }],
        educations: [{
            degree: '',
            field: '',
            university: '',
            location: '',
            startDate: '',
            endDate: ''
        }],
        projects: [{
            name: '',
            description: '',
            technologies: [],
            link: ''
        }],
        certifications: [{
            name: '',
            issuer: '',
            date: '',
            link: ''
        }],
        languages: [{
            language: '',
            level: ''
        }]
    });

    const [newSkill, setNewSkill] = useState('');
    const [newTech, setNewTech] = useState('');
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [errors, setErrors] = useState({});

    // Fill form with default values
    const fillDefaults = () => {
        setFormData({
            personalInformation: {
                fullName: 'John Doe',
                phoneNumber: '+1234567890',
                email: 'john.doe@example.com',
                location: 'New York, USA',
                linkedin: 'https://linkedin.com/in/johndoe',
                github: 'https://github.com/johndoe',
                portfolio: 'https://johndoe.com'
            },
            summary: {
                text: 'Experienced software developer with 5+ years in web development, specializing in React and Node.js.'
            },
            skills: ['JavaScript', 'React', 'Node.js', 'Python'],
            experiences: [{
                position: 'Senior Developer',
                company: 'Tech Corp',
                location: 'San Francisco, CA',
                startDate: '01/2020',
                endDate: 'Present',
                description: ['Led development of core platform', 'Mentored junior developers']
            }],
            educations: [{
                degree: 'BSc',
                field: 'Computer Science',
                university: 'State University',
                location: 'Boston, MA',
                startDate: '09/2015',
                endDate: '05/2019'
            }],
            projects: [{
                name: 'Portfolio Website',
                description: 'Personal portfolio showcasing projects',
                technologies: ['React', 'Tailwind CSS'],
                link: 'https://johndoe.com'
            }],
            certifications: [{
                name: 'AWS Certified Developer',
                issuer: 'Amazon',
                date: '06/2022',
                link: 'https://aws.amazon.com/certification'
            }],
            languages: [{
                language: 'English',
                level: 'Native'
            }, {
                language: 'Spanish',
                level: 'Intermediate'
            }]
        });
        setErrors({});
    };

    const validateField = (field, value, section) => {
        if (section === 'personalInformation') {
            if (field === 'email' && !VALIDATIONS.email.test(value)) return 'Invalid email format';
            if (field === 'phoneNumber' && !VALIDATIONS.phone.test(value)) return 'Invalid phone number';
            if ((field === 'linkedin' || field === 'github' || field === 'portfolio') && value && !VALIDATIONS.url.test(value)) return 'Invalid URL';
            if (field === 'fullName' && !VALIDATIONS.name.test(value)) return 'Name must be at least 2 characters';
            if (field === 'location' && !VALIDATIONS.text.test(value)) return 'Location must be at least 2 characters';
        }
        if (section === 'summary' && !VALIDATIONS.text.test(value)) return 'Summary must be at least 2 characters';
        if (['experiences', 'educations', 'projects', 'certifications', 'languages'].includes(section)) {
            if (['startDate', 'endDate', 'date'].includes(field) && value && !VALIDATIONS.date.test(value)) return 'Invalid date format (MM/YYYY or Present)';
            if (['position', 'company', 'degree', 'field', 'university', 'name', 'description', 'issuer', 'language'].includes(field) && !VALIDATIONS.text.test(value)) return 'Must be at least 2 characters';
            if (['link'].includes(field) && value && !VALIDATIONS.url.test(value)) return 'Invalid URL';
        }
        return '';
    };

    const handleInputChange = (section, field, value, index = null) => {
        const sanitizedValue = sanitizeInput(value);
        let newErrors = { ...errors };

        if (index !== null) {
            const updatedArray = [...formData[section]];
            updatedArray[index] = { ...updatedArray[index], [field]: sanitizedValue };
            setFormData({ ...formData, [section]: updatedArray });
            newErrors[`${section}.${index}.${field}`] = validateField(field, sanitizedValue, section);
        } else if (section.includes('.')) {
            const [parent, child] = section.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: sanitizedValue
                }
            });
            newErrors[`${parent}.${child}`] = validateField(child, sanitizedValue, parent);
        } else {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: sanitizedValue
                }
            });
            newErrors[`${section}.${field}`] = validateField(field, sanitizedValue, section);
        }

        setErrors(newErrors);
    };

    const handleArrayInputChange = (section, index, field, value) => {
        const sanitizedValue = sanitizeInput(value);
        const updatedArray = [...formData[section]];
        updatedArray[index][field] = sanitizedValue;
        setFormData({ ...formData, [section]: updatedArray });

        setErrors({
            ...errors,
            [`${section}.${index}.${field}`]: validateField(field, sanitizedValue, section)
        });
    };

    const handleDescriptionChange = (expIndex, descIndex, value) => {
        const sanitizedValue = sanitizeInput(value);
        const updatedExperience = [...formData.experiences];
        const updatedDescriptions = [...updatedExperience[expIndex].description];
        updatedDescriptions[descIndex] = sanitizedValue;
        updatedExperience[expIndex].description = updatedDescriptions;
        setFormData({ ...formData, experiences: updatedExperience });

        setErrors({
            ...errors,
            [`experiences.${expIndex}.description.${descIndex}`]: validateField('description', sanitizedValue, 'experiences')
        });
    };

    const addSkill = () => {
        const sanitizedSkill = sanitizeInput(newSkill);
        if (sanitizedSkill.trim() && !formData.skills.includes(sanitizedSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, sanitizedSkill.trim()]
            });
            setNewSkill('');
            setErrors({ ...errors, newSkill: '' });
        } else {
            setErrors({ ...errors, newSkill: 'Skill already exists or is invalid' });
        }
    };

    const removeSkill = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({ ...formData, skills: updatedSkills });
    };

    const addTechToProject = () => {
        const sanitizedTech = sanitizeInput(newTech);
        if (sanitizedTech.trim()) {
            const updatedProjects = [...formData.projects];
            if (!updatedProjects[currentProjectIndex].technologies.includes(sanitizedTech.trim())) {
                updatedProjects[currentProjectIndex].technologies = [
                    ...updatedProjects[currentProjectIndex].technologies,
                    sanitizedTech.trim()
                ];
                setFormData({ ...formData, projects: updatedProjects });
                setNewTech('');
                setErrors({ ...errors, newTech: '' });
            } else {
                setErrors({ ...errors, newTech: 'Technology already added' });
            }
        }
    };

    const removeTechFromProject = (projectIndex, techIndex) => {
        const updatedProjects = [...formData.projects];
        const updatedTechs = [...updatedProjects[projectIndex].technologies];
        updatedTechs.splice(techIndex, 1);
        updatedProjects[projectIndex].technologies = updatedTechs;
        setFormData({ ...formData, projects: updatedProjects });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experiences: [
                ...formData.experiences,
                {
                    position: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: ['']
                }
            ]
        });
    };

    const removeExperience = (index) => {
        const updatedExperience = [...formData.experiences];
        updatedExperience.splice(index, 1);
        setFormData({ ...formData, experiences: updatedExperience });
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`experiences.${index}.`)) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const addDescription = (expIndex) => {
        const updatedExperience = [...formData.experiences];
        updatedExperience[expIndex].description.push('');
        setFormData({ ...formData, experiences: updatedExperience });
    };

    const removeDescription = (expIndex, descIndex) => {
        const updatedExperience = [...formData.experiences];
        const updatedDescriptions = [...updatedExperience[expIndex].description];
        updatedDescriptions.splice(descIndex, 1);
        updatedExperience[expIndex].description = updatedDescriptions;
        setFormData({ ...formData, experiences: updatedExperience });
        setErrors({
            ...errors,
            [`experiences.${expIndex}.description.${descIndex}`]: undefined
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            educations: [
                ...formData.educations,
                {
                    degree: '',
                    field: '',
                    university: '',
                    location: '',
                    startDate: '',
                    endDate: ''
                }
            ]
        });
    };

    const removeEducation = (index) => {
        const updatedEducation = [...formData.educations];
        updatedEducation.splice(index, 1);
        setFormData({ ...formData, educations: updatedEducation });
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`educations.${index}.`)) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [
                ...formData.projects,
                {
                    name: '',
                    description: '',
                    technologies: [],
                    link: ''
                }
            ]
        });
        setCurrentProjectIndex(formData.projects.length);
    };

    const removeProject = (index) => {
        const updatedProjects = [...formData.projects];
        updatedProjects.splice(index, 1);
        setFormData({ ...formData, projects: updatedProjects });
        if (currentProjectIndex >= index) {
            setCurrentProjectIndex(Math.max(0, currentProjectIndex - 1));
        }
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`projects.${index}.`)) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const addCertification = () => {
        setFormData({
            ...formData,
            certifications: [
                ...formData.certifications,
                {
                    name: '',
                    issuer: '',
                    date: '',
                    link: ''
                }
            ]
        });
    };

    const removeCertification = (index) => {
        const updatedCertifications = [...formData.certifications];
        updatedCertifications.splice(index, 1);
        setFormData({ ...formData, certifications: updatedCertifications });
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`certifications.${index}.`)) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [
                ...formData.languages,
                {
                    language: '',
                    level: ''
                }
            ]
        });
    };

    const removeLanguage = (index) => {
        const updatedLanguages = [...formData.languages];
        updatedLanguages.splice(index, 1);
        setFormData({ ...formData, languages: updatedLanguages });
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`languages.${index}.`)) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData.personalInformation).forEach(field => {
            const error = validateField(field, formData.personalInformation[field], 'personalInformation');
            if (error) newErrors[`personalInformation.${field}`] = error;
        });
        if (!VALIDATIONS.text.test(formData.summary.text)) {
            newErrors['summary.text'] = 'Summary must be at least 2 characters';
        }
        formData.experiences.forEach((exp, index) => {
            ['position', 'company', 'startDate', 'endDate'].forEach(field => {
                const error = validateField(field, exp[field], 'experiences');
                if (error) newErrors[`experiences.${index}.${field}`] = error;
            });
            exp.description.forEach((desc, descIndex) => {
                if (!VALIDATIONS.text.test(desc)) {
                    newErrors[`experiences.${index}.description.${descIndex}`] = 'Description must be at least 2 characters';
                }
            });
        });
        formData.educations.forEach((edu, index) => {
            ['degree', 'field', 'university', 'startDate', 'endDate'].forEach(field => {
                const error = validateField(field, edu[field], 'educations');
                if (error) newErrors[`educations.${index}.${field}`] = error;
            });
        });
        formData.projects.forEach((project, index) => {
            ['name', 'description'].forEach(field => {
                const error = validateField(field, project[field], 'projects');
                if (error) newErrors[`projects.${index}.${field}`] = error;
            });
            if (project.link && !VALIDATIONS.url.test(project.link)) {
                newErrors[`projects.${index}.link`] = 'Invalid URL';
            }
        });
        formData.certifications.forEach((cert, index) => {
            ['name', 'issuer'].forEach(field => {
                const error = validateField(field, cert[field], 'certifications');
                if (error) newErrors[`certifications.${index}.${field}`] = error;
            });
            if (cert.date && !VALIDATIONS.date.test(cert.date)) {
                newErrors[`certifications.${index}.date`] = 'Invalid date format';
            }
            if (cert.link && !VALIDATIONS.url.test(cert.link)) {
                newErrors[`certifications.${index}.link`] = 'Invalid URL';
            }
        });
        formData.languages.forEach((lang, index) => {
            ['language', 'level'].forEach(field => {
                const error = validateField(field, lang[field], 'languages');
                if (error) newErrors[`languages.${index}.${field}`] = error;
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fix the validation errors before submitting');
            return;
        }

        try {
            const response = await axios.post(
                'https://qaxvachi.uz/api/v1/resume/generate',
                { ...formData, summary: formData.summary.text },
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating resume:', error);
            alert('Error generating resume. Please check your input and try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-teal-600 text-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h1 className="text-2xl font-bold">Resume360.uz</h1>
                <p className="mt-2">Ushbu sayt orqali yangi va oson resume yaratishingiz mumkin</p>
                <div>Loihani qo'llab quvatlash uchun <CopyButton /></div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={fillDefaults}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Fill with Defaults
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", key: "fullName", type: "text", required: true },
                            { label: "Phone Number", key: "phoneNumber", type: "tel", required: true },
                            { label: "Email", key: "email", type: "email", required: true },
                            { label: "Location (City, Country)", key: "location", type: "text", required: true },
                            { label: "LinkedIn Profile", key: "linkedin", type: "text" },
                            { label: "GitHub Profile", key: "github", type: "text" },
                            { label: "Portfolio Website", key: "portfolio", type: "text", fullWidth: true },
                        ].map((field) => (
                            <div key={field.key} className={field.fullWidth ? "md:col-span-2" : ""}>
                                <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    className={`w-full px-3 py-2 border ${errors[`personalInformation.${field.key}`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                    value={formData.personalInformation[field.key]}
                                    onChange={(e) => handleInputChange('personalInformation', field.key, e.target.value)}
                                    required={field.required}
                                />
                                {errors[`personalInformation.${field.key}`] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[`personalInformation.${field.key}`]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Professional Summary</h2>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Briefly describe your professional background (3-4 sentences)</label>
                    <textarea
                        className={`w-full px-3 py-2 border ${errors['summary.text'] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 min-h-[120px]`}
                        value={formData.summary.text}
                        onChange={(e) => handleInputChange('summary', 'text', e.target.value)}
                        required
                    />
                    {errors['summary.text'] && (
                        <p className="text-red-500 text-xs mt-1">{errors['summary.text']}</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full flex items-center border border-gray-200">
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className={`flex-grow px-3 py-2 border ${errors.newSkill ? 'border-red-500' : 'border-gray-200'} rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    {errors.newSkill && (
                        <p className="text-red-500 text-xs mt-1">{errors.newSkill}</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Work Experience</h2>
                    {formData.experiences.map((exp, expIndex) => (
                        <div key={expIndex} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {[
                                    { label: "Position", key: "position", required: true },
                                    { label: "Company", key: "company", required: true },
                                    { label: "Location", key: "location" },
                                    {
                                        custom: (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Date (MM/YYYY)</label>
                                                    <input
                                                        type="text"
                                                        className={`w-full px-3 py-2 border ${errors[`experiences.${expIndex}.startDate`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                                        value={exp.startDate}
                                                        onChange={(e) => handleArrayInputChange('experiences', expIndex, 'startDate', e.target.value)}
                                                        placeholder="MM/YYYY"
                                                        required
                                                    />
                                                    {errors[`experiences.${expIndex}.startDate`] && (
                                                        <p className="text-red-500 text-xs mt-1">{errors[`experiences.${expIndex}.startDate`]}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">End Date (MM/YYYY)</label>
                                                    <input
                                                        type="text"
                                                        className={`w-full px-3 py-2 border ${errors[`experiences.${expIndex}.endDate`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                                        value={exp.endDate}
                                                        onChange={(e) => handleArrayInputChange('experiences', expIndex, 'endDate', e.target.value)}
                                                        placeholder="MM/YYYY or Present"
                                                        required
                                                    />
                                                    {errors[`experiences.${expIndex}.endDate`] && (
                                                        <p className="text-red-500 text-xs mt-1">{errors[`experiences.${expIndex}.endDate`]}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                ].map((field, i) => field.custom || (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border ${errors[`experiences.${expIndex}.${field.key}`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                            value={exp[field.key]}
                                            onChange={(e) => handleArrayInputChange('experiences', expIndex, field.key, e.target.value)}
                                            required={field.required}
                                        />
                                        {errors[`experiences.${expIndex}.${field.key}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`experiences.${expIndex}.${field.key}`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Responsibilities & Achievements</label>
                                {exp.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="flex mb-2">
                                        <input
                                            type="text"
                                            className={`flex-grow px-3 py-2 border ${errors[`experiences.${expIndex}.description.${descIndex}`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                            value={desc}
                                            onChange={(e) => handleDescriptionChange(expIndex, descIndex, e.target.value)}
                                            required
                                        />
                                        {exp.description.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDescription(expIndex, descIndex)}
                                                className="ml-2 text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                        {errors[`experiences.${expIndex}.description.${descIndex}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`experiences.${expIndex}.description.${descIndex}`]}</p>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addDescription(expIndex)}
                                    className="mt-2 text-sm text-teal-600 hover:text-teal-800 transition-colors"
                                >
                                    + Add Responsibility
                                </button>
                            </div>

                            {formData.experiences.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExperience(expIndex)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Remove Experience
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addExperience}
                        className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-teal-600 hover:text-teal-600 transition-colors"
                    >
                        + Add Work Experience
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Education</h2>
                    {formData.educations.map((edu, eduIndex) => (
                        <div key={eduIndex} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {[
                                    { label: "Degree", key: "degree", required: true },
                                    { label: "Field of Study", key: "field", required: true },
                                    { label: "University", key: "university", required: true },
                                    { label: "Location", key: "location" },
                                    { label: "Start Date (MM/YYYY)", key: "startDate", required: true },
                                    { label: "End Date (MM/YYYY)", key: "endDate", required: true },
                                ].map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border ${errors[`educations.${eduIndex}.${field.key}`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                            value={edu[field.key]}
                                            onChange={(e) => handleArrayInputChange('educations', eduIndex, field.key, e.target.value)}
                                            required={field.required}
                                        />
                                        {errors[`educations.${eduIndex}.${field.key}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations.${eduIndex}.${field.key}`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {formData.educations.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEducation(eduIndex)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Remove Education
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addEducation}
                        className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-teal-600 hover:text-teal-600 transition-colors"
                    >
                        + Add Education
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Projects</h2>
                    <div className="mb-4 flex flex-wrap gap-2">
                        {formData.projects.map((project, projectIndex) => (
                            <button
                                key={projectIndex}
                                type="button"
                                onClick={() => setCurrentProjectIndex(projectIndex)}
                                className={`px-3 py-1 rounded-md text-sm ${currentProjectIndex === projectIndex ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            >
                                Project {projectIndex + 1}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={addProject}
                            className="px-3 py-1 rounded-md text-sm bg-gray-50 text-gray-600 hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>

                    {formData.projects.length > 0 && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border ${errors[`projects.${currentProjectIndex}.name`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                        value={formData.projects[currentProjectIndex].name}
                                        onChange={(e) => handleArrayInputChange('projects', currentProjectIndex, 'name', e.target.value)}
                                        required
                                    />
                                    {errors[`projects.${currentProjectIndex}.name`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`projects.${currentProjectIndex}.name`]}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Project Link</label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border ${errors[`projects.${currentProjectIndex}.link`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                        value={formData.projects[currentProjectIndex].link}
                                        onChange={(e) => handleArrayInputChange('projects', currentProjectIndex, 'link', e.target.value)}
                                    />
                                    {errors[`projects.${currentProjectIndex}.link`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`projects.${currentProjectIndex}.link`]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Project Description</label>
                                <textarea
                                    className={`w-full px-3 py-2 border ${errors[`projects.${currentProjectIndex}.description`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 min-h-[100px]`}
                                    value={formData.projects[currentProjectIndex].description}
                                    onChange={(e) => handleArrayInputChange('projects', currentProjectIndex, 'description', e.target.value)}
                                    required
                                />
                                {errors[`projects.${currentProjectIndex}.description`] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[`projects.${currentProjectIndex}.description`]}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Technologies Used</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.projects[currentProjectIndex].technologies.map((tech, techIndex) => (
                                        <div key={techIndex} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full flex items-center border border-gray-200">
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => removeTechFromProject(currentProjectIndex, techIndex)}
                                                className="ml-2 text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        className={`flex-grow px-3 py-2 border ${errors.newTech ? 'border-red-500' : 'border-gray-200'} rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                        placeholder="Add a technology"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTechToProject}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.newTech && (
                                    <p className="text-red-500 text-xs mt-1">{errors.newTech}</p>
                                )}
                            </div>

                            {formData.projects.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeProject(currentProjectIndex)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Remove Project
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Certifications</h2>
                    {formData.certifications.map((cert, certIndex) => (
                        <div key={certIndex} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {[
                                    { label: "Certification Name", key: "name", required: true },
                                    { label: "Issuer", key: "issuer", required: true },
                                    { label: "Date (MM/YYYY)", key: "date" },
                                    { label: "Link", key: "link" },
                                ].map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border ${errors[`certifications.${certIndex}.${field.key}`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                            value={cert[field.key]}
                                            onChange={(e) => handleArrayInputChange('certifications', certIndex, field.key, e.target.value)}
                                            required={field.required}
                                        />
                                        {errors[`certifications.${certIndex}.${field.key}`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`certifications.${certIndex}.${field.key}`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {formData.certifications.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCertification(certIndex)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Remove Certification
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCertification}
                        className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-teal-600 hover:text-teal-600 transition-colors"
                    >
                        + Add Certification
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-100">Languages</h2>
                    {formData.languages.map((lang, langIndex) => (
                        <div key={langIndex} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Language</label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border ${errors[`languages.${langIndex}.language`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                        value={lang.language}
                                        onChange={(e) => handleArrayInputChange('languages', langIndex, 'language', e.target.value)}
                                        required
                                    />
                                    {errors[`languages.${langIndex}.language`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`languages.${langIndex}.language`]}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Proficiency Level</label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border ${errors[`languages.${langIndex}.level`] ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600`}
                                        value={lang.level}
                                        onChange={(e) => handleArrayInputChange('languages', langIndex, 'level', e.target.value)}
                                        required
                                    />
                                    {errors[`languages.${langIndex}.level`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`languages.${langIndex}.level`]}</p>
                                    )}
                                </div>
                            </div>
                            {formData.languages.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeLanguage(langIndex)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Remove Language
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addLanguage}
                        className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-teal-600 hover:text-teal-600 transition-colors"
                    >
                        + Add Language
                    </button>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 text-lg font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Generate Resume
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ResumeForm;