/**
 * FounderCountdown Component
 * 
 * Shows a prominent countdown timer for founder pricing deadline.
 * Updates every minute to show days, hours, minutes remaining.
 */

import { useState, useEffect } from 'react';
import { Clock, Timer } from 'lucide-react';
import { FOUNDER_DEADLINE, isFounderPricingActive, getSeatsRemainingText } from '../../services/subscription';

interface FounderCountdownProps {
  variant?: 'banner' | 'compact' | 'inline';
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeRemaining = (): TimeRemaining => {
  const diff = FOUNDER_DEADLINE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const FounderCountdown = ({ variant = 'banner', className = '' }: FounderCountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(getTimeRemaining());
  const seatsText = getSeatsRemainingText();

  // Update countdown every minute (or every second for last hour)
  useEffect(() => {
    const updateInterval = timeRemaining.days === 0 && timeRemaining.hours === 0 ? 1000 : 60000;
    
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [timeRemaining.days, timeRemaining.hours]);

  if (!isFounderPricingActive()) {
    return null;
  }

  const { days, hours, minutes } = timeRemaining;

  // Banner variant - full width, prominent
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 md:p-6 text-white ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Icon and title */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-lg">Founding Member Pricing</span>
          </div>
          
          {/* Countdown boxes */}
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
              <div className="text-2xl font-bold">{days}</div>
              <div className="text-xs uppercase opacity-80">Days</div>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
              <div className="text-2xl font-bold">{hours}</div>
              <div className="text-xs uppercase opacity-80">Hours</div>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
              <div className="text-2xl font-bold">{minutes}</div>
              <div className="text-xs uppercase opacity-80">Mins</div>
            </div>
          </div>

          {/* Value prop */}
          <div className="text-center md:text-left">
            <div className="font-semibold">Save over 40%</div>
            <div className="text-sm opacity-90">Rate locked for 2 years</div>
          </div>

          {/* Seats remaining (if enabled) */}
          {seatsText && (
            <div className="bg-red-600 px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
              {seatsText}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact variant - smaller, for sidebars or cards
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-3 text-white text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Timer className="w-4 h-4" />
          <span className="font-semibold text-sm">Founder pricing ends in</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-lg font-bold">
          <span>{days}d</span>
          <span>:</span>
          <span>{hours}h</span>
          <span>:</span>
          <span>{minutes}m</span>
        </div>
        {seatsText && (
          <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-0.5">
            {seatsText}
          </div>
        )}
      </div>
    );
  }

  // Inline variant - single line for headers
  return (
    <div className={`inline-flex items-center gap-2 bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-medium ${className}`}>
      <Clock className="w-4 h-4" />
      <span>Founder pricing: {days}d {hours}h {minutes}m left</span>
    </div>
  );
};

export default FounderCountdown;
