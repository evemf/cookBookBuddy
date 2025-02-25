import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RecipePage from "@/pages/recipe";
import EditRecipe from "@/pages/edit-recipe";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recipe/:id" component={RecipePage} />
      <Route path="/new" component={EditRecipe} />
      <Route path="/edit/:id" component={EditRecipe} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
