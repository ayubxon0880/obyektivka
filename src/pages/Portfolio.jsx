import React from 'react';

const Portfolio = () => {
    const data = {
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
    };



    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <header className="bg-gradient-to-r bg-teal-600 text-white py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-2xl">👤</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{data.personalInformation.fullName}</h1>
                            <p className="text-lg opacity-90">{data.summary.text}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center text-sm">
                        <a href={data.personalInformation.linkedin} target="_blank" rel="noopener" className="flex items-center gap-2 hover:opacity-80">
                            <LinkedInIcon className="w-5 h-5"/> LinkedIn
                        </a>
                        <a href={data.personalInformation.github} target="_blank" rel="noopener" className="flex items-center gap-2 hover:opacity-80">
                            <GitHubIcon className="w-5 h-5"/> GitHub
                        </a>
                        <a href={`mailto:${data.personalInformation.email}`} className="flex items-center gap-2 hover:opacity-80">
                            <MailIcon className="w-5 h-5"/> {data.personalInformation.email}
                        </a>
                        <div className="flex items-center gap-2">
                            <LocationIcon className="w-5 h-5"/> {data.personalInformation.location}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <Section title="Experience">
                            {data.experiences.map((exp, i) => (
                                <TimelineItem
                                    key={i}
                                    title={exp.position}
                                    subtitle={`${exp.company} • ${exp.location}`}
                                    date={`${exp.startDate} - ${exp.endDate}`}
                                    items={exp.description}
                                />
                            ))}
                        </Section>

                        <Section title="Projects">
                            <div className="grid gap-6">
                                {data.projects.map((project, i) => (
                                    <ProjectCard
                                        key={i}
                                        title={project.name}
                                        description={project.description}
                                        technologies={project.technologies}
                                        link={project.link}
                                    />
                                ))}
                            </div>
                        </Section>
                    </div>

                    <div className="space-y-8">
                        <Section title="Skills">
                            <div className="grid grid-cols-2 gap-3">
                                {data.skills.map((skill, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                        <span className="text-gray-700 font-medium">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Education">
                            {data.educations.map((edu, i) => (
                                <InfoCard
                                    key={i}
                                    title={`${edu.degree} in ${edu.field}`}
                                    subtitle={edu.university}
                                    meta={edu.location}
                                    date={`${edu.startDate} - ${edu.endDate}`}
                                />
                            ))}
                        </Section>

                        <Section title="Languages">
                            <div className="space-y-2">
                                {data.languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-gray-700">{lang.language}</span>
                                        <span className="text-gray-500 text-sm">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Certifications">
                            {data.certifications.map((cert, i) => (
                                <InfoCard
                                    key={i}
                                    title={cert.name}
                                    subtitle={cert.issuer}
                                    date={cert.date}
                                    link={cert.link}
                                />
                            ))}
                        </Section>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-100 py-6 text-center text-gray-600">
                © {new Date().getFullYear()} {data.personalInformation.fullName}
            </footer>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
        {children}
    </div>
);

const TimelineItem = ({ title, subtitle, date, items }) => (
    <div className="relative pl-6 border-l-2 border-blue-100 mb-6">
        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2"/>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-1">{subtitle}</p>
        <p className="text-gray-500 text-xs mb-3">{date}</p>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="text-gray-600 before:content-['•'] before:mr-2">{item}</li>
            ))}
        </ul>
    </div>
);

const ProjectCard = ({ title, description, technologies, link }) => (
    <div className="group border border-gray-100 rounded-lg p-4 hover:border-blue-100 hover:shadow-md transition-all">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
            {technologies.map((tech, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
          {tech}
        </span>
            ))}
        </div>
        <a href={link} target="_blank" rel="noopener" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            View Project <ExternalLinkIcon className="w-4 h-4"/>
        </a>
    </div>
);

const InfoCard = ({ title, subtitle, meta, date, link }) => (
    <div className="mb-4 last:mb-0">
        <h3 className="font-medium text-gray-800">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        {meta && <p className="text-gray-500 text-xs mt-1">{meta}</p>}
        {date && <p className="text-gray-500 text-xs">{date}</p>}
        {link && (
            <a href={link} target="_blank" rel="noopener" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                Verify Credential
            </a>
        )}
    </div>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd"/>
    </svg>
);


export default Portfolio;