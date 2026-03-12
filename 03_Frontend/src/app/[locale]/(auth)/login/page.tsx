'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isQaBypass = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_QA_BYPASS_LOGIN !== 'false';
  const redirectParam = searchParams.get('redirect');
  const redirectTarget =
    redirectParam && redirectParam.startsWith('/') && !redirectParam.startsWith('//')
      ? redirectParam
      : '/models';

  useEffect(() => {
    if (isQaBypass) {
      router.replace(redirectTarget);
    }
  }, [isQaBypass, redirectTarget, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: simulate login
    setError(null);
    router.push(redirectTarget);
  };

  return (
    <div className={styles.card}>
      <div className={styles.brandMark}>
        <Shield size={32} />
        <h1 className={styles.title}>Masuk ke AI Sandbox</h1>
        <p className={styles.subtitle}>Platform evaluasi keamanan model AI</p>
      </div>

      <button className={styles.ssoBtn} type="button">
        <LogIn size={18} />
        Login dengan SSO
      </button>

      <div className={styles.divider}>
        <span>atau</span>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="nama@perusahaan.co.id" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Kata Sandi</label>
          <div className={styles.passwordWrap}>
            <input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className={styles.remember}>
          <label>
            <input type="checkbox" /> Ingat saya
          </label>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Masuk
        </button>
      </form>
    </div>
  );
}
