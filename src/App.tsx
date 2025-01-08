import { FC } from "react";
import { Switch, Route, Redirect } from "wouter";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";
import { Portfolio } from "./pages/Portfolio";

const App: FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/profile" />} />
        <Route path="/profile" component={Profile} />
        <Route path="/portfolio" component={Portfolio} />
        <Route>
          {/* 404 fallback */}
          <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground">404</h1>
              <p className="text-muted-foreground mt-2">Page not found</p>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;