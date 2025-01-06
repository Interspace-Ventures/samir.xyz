import { type FC } from "react";

export const Profile: FC = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold">
          Hey - I'm Samir.
        </h1>
        <h2 className="text-2xl sm:text-3xl">
          I drive business impact at fintechs.
        </h2>
      </section>

      <section className="max-w-3xl space-y-4 text-lg">
        <p>
          Today, I am building Strategic Finance at{" "}
          <a href="#" className="text-blue-600 hover:underline">HRT</a>{" "}
          where we're using algorithms to drive efficiency in markets. Previously, I was at{" "}
          <a href="#" className="text-blue-600 hover:underline">Unit</a>, 
          which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
          <a href="#" className="text-blue-600 hover:underline">Chime</a>. 
          Earlier, I was the first finance hire at{" "}
          <a href="#" className="text-blue-600 hover:underline">Sift</a>. 
          I got my start in investment banking in the Financial Institutions Group at{" "}
          <a href="#" className="text-blue-600 hover:underline">JP Morgan</a>{" "}
          covering market structure and asset management.
        </p>

        <p>
          In my free time, I write over-engineered threads on{" "}
          <a href="#" className="text-blue-600 hover:underline">Twitter</a>{" "}
          and fintech posts at{" "}
          <a href="#" className="text-blue-600 hover:underline">Interspace</a>.
        </p>
      </section>
    </div>
  );
}