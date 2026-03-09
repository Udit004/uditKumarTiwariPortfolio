'use client';
import { DarkModeProvider } from '../contexts/DarkModeContext';

export default function ClientLayout({ children }) {
  return (
    <DarkModeProvider>
      {children}
    </DarkModeProvider>
  );
}
