import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Profile" },
    { name: "description", content: "Developer profile and information" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // This would typically fetch from an API or database
  return json({
    profile: {
      name: "Alex Developer",
      title: "Senior Software Engineer",
      bio: "Experienced software engineer specializing in web development, cloud architecture, and developer tools. Passionate about creating tools that improve developer productivity.",
      location: "San Francisco, CA",
      skills: [
        "JavaScript/TypeScript", 
        "React", 
        "Node.js", 
        "Remix", 
        "Cloud Architecture", 
        "API Design", 
        "UI/UX"
      ],
      experience: [
        {
          id: 1,
          role: "Senior Software Engineer",
          company: "TechCorp",
          period: "2020 - Present",
          description: "Leading development of developer productivity tools and platforms"
        },
        {
          id: 2,
          role: "Software Engineer",
          company: "WebSolutions",
          period: "2018 - 2020",
          description: "Developed front-end applications and developer-facing APIs"
        },
        {
          id: 3,
          role: "Junior Developer",
          company: "StartupInc",
          period: "2016 - 2018",
          description: "Full-stack development for web applications"
        }
      ],
      education: [
        {
          id: 1,
          degree: "M.S. Computer Science",
          institution: "Tech University",
          year: "2016"
        },
        {
          id: 2,
          degree: "B.S. Computer Science",
          institution: "State University",
          year: "2014"
        }
      ],
      contact: {
        email: "alex@example.com",
        github: "github.com/alexdev",
        linkedin: "linkedin.com/in/alexdev"
      }
    }
  });
}

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{profile.title}</p>
          <p className="text-gray-500">{profile.location}</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700">{profile.bio}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((job) => (
              <div key={job.id} className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <p className="text-gray-600">{job.company} | {job.period}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution} | {edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href={`mailto:${profile.contact.email}`} className="text-primary hover:underline">
              {profile.contact.email}
            </a>
            <a href={`https://${profile.contact.github}`} className="text-primary hover:underline">
              GitHub
            </a>
            <a href={`https://${profile.contact.linkedin}`} className="text-primary hover:underline">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}