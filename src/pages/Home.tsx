import { Card, CardContent } from "@components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-4xl mx-4">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Professional Portfolio
          </h1>
          <p className="text-muted-foreground">
            Welcome to my professional portfolio showcasing my work experience and projects.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}