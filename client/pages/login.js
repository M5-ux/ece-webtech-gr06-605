import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import BoutonDeco from '../components/BoutonDeco'  ; 


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Login() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthenticated(!!session);
        if (session) {
          handleRedirect();
        }
      },
    );
  
    return () => authListener?.unsubscribe?.();
  }, []);
  
 
  const handleRedirect = () => {
    if (authenticated) {
      router.push('/profile');
    }
  };

  useEffect(() => {
    if (authenticated) {
      router.push('/profile');
    }
  }, [authenticated]);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
      />
      
      <BoutonDeco />

    </div>
  );
}
