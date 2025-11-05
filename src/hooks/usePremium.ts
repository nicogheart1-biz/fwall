"use client";

import { useState, useEffect, useCallback } from 'react';
import { PremiumService } from '@/src/services/premium.service';
import { PremiumSessionI } from '@/src/types/premium.types';

export const usePremium = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [session, setSession] = useState<PremiumSessionI | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const checkAccess = useCallback(() => {
    const currentSession = PremiumService.getSession();
    const currentAccess = PremiumService.hasAccess();
    const remaining = PremiumService.getTimeRemaining();
    
    setSession(currentSession);
    setHasAccess(currentAccess);
    setTimeRemaining(remaining);
    setIsLoading(false);
  }, []);

  const refreshAccess = useCallback(() => {
    checkAccess();
  }, [checkAccess]);

  const clearAccess = useCallback(() => {
    PremiumService.clearSession();
    setSession(null);
    setHasAccess(false);
    setTimeRemaining(0);
  }, []);

  useEffect(() => {
    checkAccess();
    
    // Aggiorna ogni minuto per controllare la scadenza
    const interval = setInterval(checkAccess, 60000);
    
    return () => clearInterval(interval);
  }, [checkAccess]);

  return {
    hasAccess,
    session,
    timeRemaining,
    isLoading,
    refreshAccess,
    clearAccess,
    formatTimeRemaining: PremiumService.formatTimeRemaining,
  };
};
