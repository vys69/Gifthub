import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <OnboardingFlow />
        <Toaster position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;