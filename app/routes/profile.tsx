import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "samir.xyz - Profile" },
    { name: "description", content: "Samir's professional profile and background" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // This would typically fetch from an API or database
  return json({
    profile: {
      name: "Samir",
      title: "Strategic Finance at fintech companies",
      bio: "I drive business impact at fintechs. Currently leading Strategic Finance for the Financial Partnerships team at Cash App where we're expanding financial access to help users do more with their money.",
      location: "San Francisco, CA",
      skills: [
        "Strategic Finance", 
        "Financial Partnerships", 
        "Fintech", 
        "Financial Analysis", 
        "Business Strategy", 
        "Product Strategy", 
        "Growth"
      ],
      experience: [
        {
          id: 1,
          role: "Strategic Finance Lead",
          company: "Cash App",
          period: "2023 - Present",
          description: "Leading Strategic Finance for the Financial Partnerships team, expanding financial access for users."
        },
        {
          id: 2,
          role: "Financial Partnerships",
          company: "Unit",
          period: "2021 - 2023",
          description: "Drove financial partnerships at Unit, embedding financial features into products."
        },
        {
          id: 3,
          role: "Strategic Finance Lead",
          company: "Chime",
          period: "2019 - 2021",
          description: "Built and led the Strategic Finance function."
        }
      ],
      education: [
        {
          id: 1,
          degree: "MBA, Finance",
          institution: "Top Business School",
          year: "2018"
        },
        {
          id: 2,
          degree: "B.S. Finance",
          institution: "University",
          year: "2014"
        }
      ],
      contact: {
        email: "samir@example.com",
        twitter: "twitter.com",
        interspace: "interspace.sh"
      }
    }
  });
}

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Hey - I'm {profile.name}</h1>
          <p className="text-xl text-gray-600 mb-2">I drive business impact at fintechs</p>
        </header>

        <section className="mb-10 max-w-3xl">
          <p className="text-gray-700 mb-4">
            Today, I am leading Strategic Finance for the Financial Partnerships team at{" "}
            <a href="https://cash.app" className="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">
              Cash App
            </a>{" "}
            where we're expanding financial access to help users do more with their money.
          </p>
          
          <p className="text-gray-700 mb-4">
            Prior to that, I drove financial partnerships at{" "}
            <a href="https://unit.co" className="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">
              Unit
            </a>
            , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
            <a href="https://chime.com" className="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">
              Chime
            </a>.
          </p>
          
          <p className="text-gray-700">
            Outside of work, I write over-engineered fintech threads on{" "}
            <a href="https://twitter.com" className="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>{" "}
            and write fintech & stratfin posts at{" "}
            <a href="https://interspace.sh" className="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">
              Interspace
            </a>.
          </p>
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
              <div key={job.id} className="border-l-4 border-purple-700 pl-4">
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
          <h2 className="text-2xl font-bold mb-4">Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href={`mailto:${profile.contact.email}`} className="text-purple-700 hover:underline">
              Email
            </a>
            <a href={`https://${profile.contact.twitter}`} className="text-purple-700 hover:underline">
              Twitter
            </a>
            <a href={`https://${profile.contact.interspace}`} className="text-purple-700 hover:underline">
              Interspace
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}