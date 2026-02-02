/**
 * Environment Indicator Component
 * 
 * Shows a visual indicator of which environment the app is connected to.
 * Only visible in development and staging to prevent production confusion.
 */

import React from 'react';

type Environment = 'development' | 'staging' | 'production';

interface EnvironmentConfig {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  show: boolean;
}

const ENVIRONMENT_CONFIG: Record<Environment, EnvironmentConfig> = {
  development: {
    label: '🔧 DEV',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
    borderColor: 'border-green-600',
    show: true,
  },
  staging: {
    label: '🧪 STAGING',
    bgColor: 'bg-yellow-500',
    textColor: 'text-black',
    borderColor: 'border-yellow-600',
    show: true,
  },
  production: {
    label: 'PROD',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    borderColor: 'border-red-600',
    show: false, // Hidden in production by default
  },
};

function getEnvironment(): Environment {
  const env = import.meta.env.VITE_ENVIRONMENT as string;
  
  if (env === 'staging') return 'staging';
  if (env === 'production') return 'production';
  
  // Default to development for safety
  return 'development';
}

function getProjectId(): string {
  return import.meta.env.VITE_FIREBASE_PROJECT_ID || 'unknown';
}

export const EnvironmentIndicator: React.FC = () => {
  const environment = getEnvironment();
  const config = ENVIRONMENT_CONFIG[environment];
  const projectId = getProjectId();
  
  // Don't show in production (unless explicitly enabled for debugging)
  if (!config.show && import.meta.env.VITE_SHOW_ENV_INDICATOR !== 'true') {
    return null;
  }
  
  return (
    <div
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg border-2 ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      title={`Connected to: ${projectId}`}
    >
      <span>{config.label}</span>
      <span className="text-[10px] opacity-75 hidden sm:inline">
        ({projectId.split('-').pop()})
      </span>
    </div>
  );
};

/**
 * Hook to get current environment info
 */
export function useEnvironment() {
  const environment = getEnvironment();
  const projectId = getProjectId();
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';
  const isStaging = environment === 'staging';
  
  return {
    environment,
    projectId,
    isProduction,
    isDevelopment,
    isStaging,
    // Helper for conditional logging
    debugLog: (...args: unknown[]) => {
      if (!isProduction) {
        console.log(`[${environment.toUpperCase()}]`, ...args);
      }
    },
  };
}

export default EnvironmentIndicator;
