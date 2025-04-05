import { useState } from 'react'
import "./App.css"
import { generateObyektivka } from './service'

function App() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    photo: null,
    currentJobDate: '',
    currentJobFull: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    education: '',
    specialization: '',
    party: '',

    // Dynamic sections
    educations: [{
      institution: '',
      year: '',
      degree: ''
    }],
    academicDegrees: [{
      degree: '',
      year: '',
      field: ''
    }],
    academicTitles: [{
      title: '',
      year: ''
    }],
    foreignLanguages: [{
      language: '',
      level: ''
    }],
    awards: [{
      award: '',
      year: ''
    }],
    workExperiences: [{
      position: '',
      organization: '',
      startDate: '',
      endDate: '',
      responsibilities: ''
    }],

    familyRelations: [{
      relationType: '',
      fullName: '',
      birthYear: '',
      birthPlace: '',
      workplace: '',
      position: '',
      address: '',
      isDead: false
    }]
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const addFamilyRelation = () => {
    setFormData({
      ...formData,
      familyRelations: [...formData.familyRelations, {
        relationType: '',
        fullName: '',
        birthYear: '',
        birthPlace: '',
        workplace: '',
        position: '',
        address: '',
        isDead: false
      }]
    })
  }

  const removeFamilyRelation = (index) => {
    const updatedRelations = formData.familyRelations.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      familyRelations: updatedRelations
    })
  }

  // Handle family relation changes
  const handleFamilyRelationChange = (index, field, value) => {
    const updatedRelations = [...formData.familyRelations]
    updatedRelations[index][field] = value
    setFormData({
      ...formData,
      familyRelations: updatedRelations
    })
  }

  // Handler for adding new education entry
  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [...formData.educations, {
        institution: '',
        year: '',
        degree: ''
      }]
    })
  }

  // Handler for removing education entry
  const removeEducation = (index) => {
    const updatedEducations = formData.educations.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      educations: updatedEducations
    })
  }

  // Handler for education field changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...formData.educations]
    updatedEducations[index][field] = value
    setFormData({
      ...formData,
      educations: updatedEducations
    })
  }

  // Academic Degree handlers
  const addAcademicDegree = () => {
    setFormData({
      ...formData,
      academicDegrees: [...formData.academicDegrees, {
        degree: '',
        year: '',
        field: ''
      }]
    })
  }

  const removeAcademicDegree = (index) => {
    const updatedDegrees = formData.academicDegrees.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      academicDegrees: updatedDegrees
    })
  }

  const handleAcademicDegreeChange = (index, field, value) => {
    const updatedDegrees = [...formData.academicDegrees]
    updatedDegrees[index][field] = value
    setFormData({
      ...formData,
      academicDegrees: updatedDegrees
    })
  }

  // Academic Title handlers
  const addAcademicTitle = () => {
    setFormData({
      ...formData,
      academicTitles: [...formData.academicTitles, {
        title: '',
        year: ''
      }]
    })
  }

  const removeAcademicTitle = (index) => {
    const updatedTitles = formData.academicTitles.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      academicTitles: updatedTitles
    })
  }

  const handleAcademicTitleChange = (index, field, value) => {
    const updatedTitles = [...formData.academicTitles]
    updatedTitles[index][field] = value
    setFormData({
      ...formData,
      academicTitles: updatedTitles
    })
  }

  // Foreign Language handlers
  const addForeignLanguage = () => {
    setFormData({
      ...formData,
      foreignLanguages: [...formData.foreignLanguages, {
        language: '',
        level: ''
      }]
    })
  }

  const removeForeignLanguage = (index) => {
    const updatedLanguages = formData.foreignLanguages.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      foreignLanguages: updatedLanguages
    })
  }

  const handleForeignLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.foreignLanguages]
    updatedLanguages[index][field] = value
    setFormData({
      ...formData,
      foreignLanguages: updatedLanguages
    })
  }

  // Award handlers
  const addAward = () => {
    setFormData({
      ...formData,
      awards: [...formData.awards, {
        award: '',
        year: ''
      }]
    })
  }

  const removeAward = (index) => {
    const updatedAwards = formData.awards.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      awards: updatedAwards
    })
  }

  const handleAwardChange = (index, field, value) => {
    const updatedAwards = [...formData.awards]
    updatedAwards[index][field] = value
    setFormData({
      ...formData,
      awards: updatedAwards
    })
  }

  // Work Experience handlers
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [...formData.workExperiences, {
        position: '',
        organization: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
      }]
    })
  }

  const removeWorkExperience = (index) => {
    const updatedExperiences = formData.workExperiences.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      workExperiences: updatedExperiences
    })
  }

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.workExperiences]
    updatedExperiences[index][field] = value
    setFormData({
      ...formData,
      workExperiences: updatedExperiences
    })
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFamilyChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      familyRelation: {
        ...formData.familyRelation,
        [name]: e.target.checked
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const newErrors = {}
      if (!formData.lastName) newErrors.lastName = 'Familya kiritilishi shart'
      if (!formData.firstName) newErrors.firstName = 'Ism kiritilishi shart'

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setIsSubmitting(false)
        // return
      }

      // Prepare form data for submission
      const data = new FormData()
      // Append basic info
      data.append('lastName', formData.lastName)
      data.append('firstName', formData.firstName)
      data.append('middleName', formData.middleName)
      if (formData.photo) data.append('photo', formData.photo)
      data.append('currentJobDate', formData.currentJobDate)
      data.append('currentJobFull', formData.currentJobFull)
      data.append('birthDate', formData.birthDate)
      data.append('birthPlace', formData.birthPlace)
      data.append('nationality', formData.nationality)

      // Append dynamic sections
      formData.educations.forEach((edu, index) => {
        data.append(`educations[${index}][institution]`, edu.institution)
        data.append(`educations[${index}][year]`, edu.year)
        data.append(`educations[${index}][degree]`, edu.degree)
      })

      formData.academicDegrees.forEach((degree, index) => {
        data.append(`academicDegrees[${index}][degree]`, degree.degree)
        data.append(`academicDegrees[${index}][year]`, degree.year)
        data.append(`academicDegrees[${index}][field]`, degree.field)
      })

      formData.academicTitles.forEach((title, index) => {
        data.append(`academicTitles[${index}][title]`, title.title)
        data.append(`academicTitles[${index}][year]`, title.year)
      })

      formData.foreignLanguages.forEach((lang, index) => {
        data.append(`foreignLanguages[${index}][language]`, lang.language)
        data.append(`foreignLanguages[${index}][level]`, lang.level)
      })

      formData.awards.forEach((award, index) => {
        data.append(`awards[${index}][award]`, award.award)
        data.append(`awards[${index}][year]`, award.year)
      })

      formData.workExperiences.forEach((exp, index) => {
        data.append(`workExperiences[${index}][position]`, exp.position)
        data.append(`workExperiences[${index}][organization]`, exp.organization)
        data.append(`workExperiences[${index}][startDate]`, exp.startDate)
        data.append(`workExperiences[${index}][endDate]`, exp.endDate)
        data.append(`workExperiences[${index}][responsibilities]`, exp.responsibilities)
      })

      // Append familyRelation's data
      formData.familyRelations.forEach((relation, index) => {
        data.append(`familyRelations[${index}][relationType]`, relation.relationType)
        data.append(`familyRelations[${index}][fullName]`, relation.fullName)
        data.append(`familyRelations[${index}][birthYear]`, relation.birthYear)
        data.append(`familyRelations[${index}][birthPlace]`, relation.birthPlace)
        data.append(`familyRelations[${index}][workplace]`, relation.workplace)
        data.append(`familyRelations[${index}][position]`, relation.position)
        data.append(`familyRelations[${index}][address]`, relation.address)
        data.append(`familyRelations[${index}][isDead]`, relation.isDead)
      })

      // Send to backend using fetch

      for (let pair of data.entries()) {
        console.log(pair)
      }

      generateObyektivka(formData);

      // const response = await fetch('http://localhost:8081/', {
      //   method: 'POST',
      //   body: data
      // })

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }

      // const result = await response.json()

      // if (result.success) {
        // setSubmitSuccess(true)
      // } else {
      //   setErrors({ submit: result.message || 'Yuborishda xatolik yuz berdi' })
      // }
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'Yuborishda xatolik yuz berdi. Iltimos, keyinroq urunib ko\'ring.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Muvaffaqiyatli yuborildi!</h2>
          <p className="text-gray-700">Ma'lumotlaringiz qabul qilindi. Rahmat!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Obyektivka.uz</h1>
          <p className="mt-2">Ushbu sayt orqali yangi va oson "obyektivka" yaratishingiz mumkin</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Shaxsiy ma'lumotlar</h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Familya <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Misol: Abdullayev"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Ism <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Misol: Botir"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                  Sharif <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Misol: Bahodirovich"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Rasm (3x4) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Format: jpg/jpeg/png</p>
            </div>

            <div className="mt-4">
              <label htmlFor="currentJobDate" className="block text-sm font-medium text-gray-700">
                Joriy lavozim sanasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="currentJobDate"
                name="currentJobDate"
                value={formData.currentJobDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: 2010 yil 06 sentabrdan"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="currentJobFull" className="block text-sm font-medium text-gray-700">
                Joriy lavozim to'liq <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="currentJobFull"
                name="currentJobFull"
                value={formData.currentJobFull}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: O2 bo'limi Milliy universitet milliy guruhi"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Tug'ilgan sana <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="mm/dd/yyyy"
              />
              <p className="mt-1 text-sm text-gray-500">Format: kun/oy/yil</p>
            </div>

            <div className="mt-4">
              <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">
                Tug'ilgan joyi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="birthPlace"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: Qashqadaryo viloyati, Nishon tumani"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                Millati <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: o'zbek"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Ma'lumoti <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: Oliy"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Ma'lumoti bo'yicha mutaxassisligi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: Oliy"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="party" className="block text-sm font-medium text-gray-700">
                Partiyaviyligi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="party"
                name="party"
                value={formData.party}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misol: O2 bo'limi Milliy universitet milliy guruhi"
              />
            </div>
          </div>

          {/* Tamomlagan (Education) section with dynamic fields */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Tamomlagan</h2>

            {formData.educations.map((education, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`education-institution-${index}`} className="block text-sm font-medium text-gray-700">
                      O'quv muassasasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`education-institution-${index}`}
                      value={education.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Toshkent davlat universiteti"
                    />
                  </div>

                  <div>
                    <label htmlFor={`education-year-${index}`} className="block text-sm font-medium text-gray-700">
                      Yili <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`education-year-${index}`}
                      value={education.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 1997"
                    />
                  </div>

                  <div>
                    <label htmlFor={`education-degree-${index}`} className="block text-sm font-medium text-gray-700">
                      Darajasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`education-degree-${index}`}
                      value={education.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Bakalavr"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>

          {/* Ilmiy darajasi (Academic Degrees) section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Ilmiy darajasi</h2>

            {formData.academicDegrees.map((degree, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAcademicDegree(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`degree-name-${index}`} className="block text-sm font-medium text-gray-700">
                      Daraja <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`degree-name-${index}`}
                      value={degree.degree}
                      onChange={(e) => handleAcademicDegreeChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Falsafa fanlari nomzodi"
                    />
                  </div>

                  <div>
                    <label htmlFor={`degree-year-${index}`} className="block text-sm font-medium text-gray-700">
                      Yili <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`degree-year-${index}`}
                      value={degree.year}
                      onChange={(e) => handleAcademicDegreeChange(index, 'year', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 2003"
                    />
                  </div>

                  <div>
                    <label htmlFor={`degree-field-${index}`} className="block text-sm font-medium text-gray-700">
                      Yo'nalishi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`degree-field-${index}`}
                      value={degree.field}
                      onChange={(e) => handleAcademicDegreeChange(index, 'field', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Falsafa"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAcademicDegree}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>

          {/* Ilmiy unvoni (Academic Titles) section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Ilmiy unvoni</h2>

            {formData.academicTitles.map((title, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAcademicTitle(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`title-name-${index}`} className="block text-sm font-medium text-gray-700">
                      Unvon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`title-name-${index}`}
                      value={title.title}
                      onChange={(e) => handleAcademicTitleChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Dotsent"
                    />
                  </div>

                  <div>
                    <label htmlFor={`title-year-${index}`} className="block text-sm font-medium text-gray-700">
                      Yili <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`title-year-${index}`}
                      value={title.year}
                      onChange={(e) => handleAcademicTitleChange(index, 'year', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 2005"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAcademicTitle}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>

          {/* Qaysi chet tillarini biladi (Foreign Languages) section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Qaysi chet tillarini biladi</h2>

            {formData.foreignLanguages.map((lang, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeForeignLanguage(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`language-name-${index}`} className="block text-sm font-medium text-gray-700">
                      Til <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`language-name-${index}`}
                      value={lang.language}
                      onChange={(e) => handleForeignLanguageChange(index, 'language', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Ingliz tili"
                    />
                  </div>

                  <div>
                    <label htmlFor={`language-level-${index}`} className="block text-sm font-medium text-gray-700">
                      Darajasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`language-level-${index}`}
                      value={lang.level}
                      onChange={(e) => handleForeignLanguageChange(index, 'level', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Erkin"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addForeignLanguage}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>

          {/* Davlat mukofotlari bilan taqdirlanganmi (Awards) section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Davlat mukofotlari bilan taqdirlanganmi</h2>

            {formData.awards.map((award, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAward(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`award-name-${index}`} className="block text-sm font-medium text-gray-700">
                      Mukofot <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`award-name-${index}`}
                      value={award.award}
                      onChange={(e) => handleAwardChange(index, 'award', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Mustaqillik ordeni"
                    />
                  </div>

                  <div>
                    <label htmlFor={`award-year-${index}`} className="block text-sm font-medium text-gray-700">
                      Yili <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`award-year-${index}`}
                      value={award.year}
                      onChange={(e) => handleAwardChange(index, 'year', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 2011"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAward}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>

          {/* Mehnat faoliyati (Work Experience) section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Mehnat faoliyati</h2>

            {formData.workExperiences.map((exp, index) => (
              <div key={index} className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`work-position-${index}`} className="block text-sm font-medium text-gray-700">
                      Lavozim <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`work-position-${index}`}
                      value={exp.position}
                      onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: O'qituvchi"
                    />
                  </div>

                  <div>
                    <label htmlFor={`work-organization-${index}`} className="block text-sm font-medium text-gray-700">
                      Tashkilot <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`work-organization-${index}`}
                      value={exp.organization}
                      onChange={(e) => handleWorkExperienceChange(index, 'organization', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Toshkent davlat universiteti"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`work-start-${index}`} className="block text-sm font-medium text-gray-700">
                      Boshlanish sanasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`work-start-${index}`}
                      value={exp.startDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 2010 yil"
                    />
                  </div>

                  <div>
                    <label htmlFor={`work-end-${index}`} className="block text-sm font-medium text-gray-700">
                      Tugash sanasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`work-end-${index}`}
                      value={exp.endDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: 2015 yil"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`work-responsibilities-${index}`} className="block text-sm font-medium text-gray-700">
                    Vazifalari
                  </label>
                  <textarea
                    id={`work-responsibilities-${index}`}
                    value={exp.responsibilities}
                    onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Misol: Dars berish, ilmiy ishlar"
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addWorkExperience}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qo'shish
            </button>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900">Qarindoshlari haqida ma'lumot</h2>

            {formData.familyRelations.map((relation, index) => (
              <div key={index} className="mt-6 border border-gray-200 p-4 rounded-lg relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFamilyRelation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`relationType-${index}`} className="block text-sm font-medium text-gray-700">
                      Qarindoshligi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`relationType-${index}`}
                      value={relation.relationType}
                      onChange={(e) => handleFamilyRelationChange(index, 'relationType', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Otasi"
                    />
                  </div>

                  <div>
                    <label htmlFor={`fullName-${index}`} className="block text-sm font-medium text-gray-700">
                      F.I.SH. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`fullName-${index}`}
                      value={relation.fullName}
                      onChange={(e) => handleFamilyRelationChange(index, 'fullName', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Misol: Abdullayev Bahodir Salimovich"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor={`birthYear-${index}`} className="block text-sm font-medium text-gray-700">
                    Tug'ilgan yili va joyi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`birthYear-${index}`}
                    value={relation.birthYear}
                    onChange={(e) => handleFamilyRelationChange(index, 'birthYear', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Misol: 1941 yil, Samarqand shahri"
                  />
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id={`isDead-${index}`}
                    checked={relation.isDead || false}
                    onChange={(e) => handleFamilyRelationChange(index, 'isDead', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`isDead-${index}`} className="ml-2 block text-sm text-gray-700">
                    Vafot etgan
                  </label>
                </div>

                <div className="mt-4">
                  <label htmlFor={`workplace-${index}`} className="block text-sm font-medium text-gray-700">
                    Ish joyi va lavozimi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`workplace-${index}`}
                    value={relation.workplace}
                    onChange={(e) => handleFamilyRelationChange(index, 'workplace', e.target.value)}
                    disabled={relation.isDead}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${relation.isDead ? 'bg-gray-100' : ''}`}
                    placeholder="Misol: Nafaqada (Toshkent davlat pedagogika universiteti o'qituvchisi)"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor={`address-${index}`} className="block text-sm font-medium text-gray-700">
                    Turar joyi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`address-${index}`}
                    value={relation.address}
                    onChange={(e) => handleFamilyRelationChange(index, 'address', e.target.value)}
                    disabled={relation.isDead}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${relation.isDead ? 'bg-gray-100' : ''}`}
                    placeholder="Misol: Toshkent shahri, Mirzo Ulug'bek tumani, B.Miyazov ko'chasi, 30-uy, 15-xonadon"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addFamilyRelation}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Qarindosh qo'shish
            </button>
          </div>

          {/* Submit button and error display */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
            </button>
          </div>

          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App