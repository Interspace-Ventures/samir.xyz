const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Hey - I'm Samir.</h1>
      
      <h2 className="text-2xl font-medium mb-6">
        I drive business impact at fintechs.
      </h2>
      
      <div className="space-y-4 text-lg">
        <p>
          Today, I am building Strategic Finance at{" "}
          <a href="https://hrt.com" className="text-blue-600 hover:underline">
            HRT
          </a>{" "}
          where we're using algorithms to drive efficiency in markets. Previously, I was at{" "}
          <a href="https://unit.co" className="text-blue-600 hover:underline">
            Unit
          </a>
          , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
          <a href="https://chime.com" className="text-blue-600 hover:underline">
            Chime
          </a>
          . Earlier, I was the first finance hire at{" "}
          <a href="https://sift.com" className="text-blue-600 hover:underline">
            Sift
          </a>
          . I got my start in investment banking in the Financial Institutions Group at{" "}
          <a href="https://jpmorgan.com" className="text-blue-600 hover:underline">
            JP Morgan
          </a>{" "}
          covering market structure and asset management.
        </p>
        
        <p>
          In my free time, I write over-engineered threads on{" "}
          <a
            href="https://twitter.com/samirm"
            className="text-blue-600 hover:underline"
          >
            Twitter
          </a>{" "}
          and fintech posts at{" "}
          <a
            href="https://interspace.samir.xyz"
            className="text-blue-600 hover:underline"
          >
            Interspace
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Profile;
