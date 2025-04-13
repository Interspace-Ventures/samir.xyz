import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ventures - Samir's Investments" },
    { name: "description", content: "Explore Samir's venture investments and entrepreneurial projects." },
  ];
};

export default function Ventures() {
  return (
    <div>
      <h1>Ventures</h1>
      <p>Explore my venture investments and entrepreneurial projects.</p>
      
      <div className="ventures-container">
        <div className="venture-card">
          <div className="venture-header">
            <h2>Fintech Accelerator</h2>
            <span className="stage-badge">Active</span>
          </div>
          <p>
            An accelerator program focused on helping early-stage fintech startups gain traction and secure funding.
            Currently supporting 12 companies through their growth journey.
          </p>
        </div>
        
        <div className="venture-card">
          <div className="venture-header">
            <h2>Banking API Platform</h2>
            <span className="stage-badge">Seed Stage</span>
          </div>
          <p>
            A platform that provides banking APIs for developers to build and embed financial services
            into their applications. Currently in development with beta testing scheduled for Q3.
          </p>
        </div>
        
        <div className="venture-card">
          <div className="venture-header">
            <h2>Financial Education Initiative</h2>
            <span className="stage-badge">Launched</span>
          </div>
          <p>
            A non-profit initiative to improve financial literacy through free educational resources
            and workshops targeted at underserved communities.
          </p>
        </div>
        
        <div className="venture-card">
          <div className="venture-header">
            <h2>Crypto Payment Gateway</h2>
            <span className="stage-badge">In Development</span>
          </div>
          <p>
            A payment gateway that enables businesses to accept cryptocurrencies as payment
            with seamless conversion to fiat currencies.
          </p>
        </div>
      </div>
    </div>
  );
}