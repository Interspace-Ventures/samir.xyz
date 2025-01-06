import { type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const Portfolio: FC = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold">
          Portfolio
        </h1>
        <p className="text-xl sm:text-2xl max-w-3xl">
          I advise and invest in ambitious teams building innovative products who focus on 
          unit economics optimized business models.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First Row */}
        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/afar.svg" alt="AFAR" className="w-32 h-auto" />
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/aon3d.svg" alt="AON3D" className="w-32 h-auto" />
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/aura.svg" alt="AURA" className="w-32 h-auto" />
          </CardContent>
        </Card>

        {/* Second Row */}
        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/backpack.svg" alt="Backpack" className="w-32 h-auto" />
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/caliber.svg" alt="CALIBER" className="w-32 h-auto" />
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6 flex items-center justify-center h-40">
            <img src="/logos/gem.svg" alt="GEM" className="w-32 h-auto" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};