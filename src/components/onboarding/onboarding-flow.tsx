import { useState } from 'react';
import { JoinGroup } from './join-group';
import { UserProfile } from './user-profile';
import { GiftPreferences } from './gift-preferences';
import { AmazonIntegration } from './amazon-integration';
import { OnboardingComplete } from './onboarding-complete';

type OnboardingStep = 'join' | 'profile' | 'preferences' | 'amazon' | 'complete';

export function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('join');
  const [userData, setUserData] = useState({
    groupCode: '',
    name: '',
    avatar: '',
    preferences: [],
    amazonConnected: false,
  });

  const steps: Record<OnboardingStep, JSX.Element> = {
    join: (
      <JoinGroup
        onNext={(groupCode) => {
          setUserData({ ...userData, groupCode });
          setStep('profile');
        }}
      />
    ),
    profile: (
      <UserProfile
        onNext={(name, avatar) => {
          setUserData({ ...userData, name, avatar });
          setStep('preferences');
        }}
        onBack={() => setStep('join')}
      />
    ),
    preferences: (
      <GiftPreferences
        onNext={(preferences) => {
          setUserData({ ...userData, preferences });
          setStep('amazon');
        }}
        onBack={() => setStep('profile')}
      />
    ),
    amazon: (
      <AmazonIntegration
        onNext={(connected) => {
          setUserData({ ...userData, amazonConnected: connected });
          setStep('complete');
        }}
        onBack={() => setStep('preferences')}
      />
    ),
    complete: <OnboardingComplete userData={userData} />,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">{steps[step]}</div>
    </div>
  );
}