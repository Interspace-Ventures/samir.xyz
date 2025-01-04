import { Switch, Route } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Profile from "@/pages/Profile"; 
import Portfolio from "@/pages/Portfolio";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-20">
        <Switch>
          <Route path="/" component={Profile} />
          <Route path="/profile" component={Profile} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/interspace">
            {() => {
              window.location.href = "https://interspace.samir.xyz";
              return null;
            }}
          </Route>
          <Route path="/perspectives">
            {() => {
              window.location.href = "https://perspectives.samir.xyz";
              return null;
            }}
          </Route>
          <Route>
            <Profile />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
