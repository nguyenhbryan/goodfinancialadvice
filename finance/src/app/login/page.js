"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as React from 'react';
import styles from "./page.module.css"
//import { GoogleIcon, FacebookIcon } from './CustomIcons';

export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {


    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    }
    else if (res?.ok) {
      return router.push("/");
    }
  };



  return (
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign in</h1>

          <form className={styles.form} onSubmit={handleSubmit}>


            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                name="email"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              />
              {emailError && <p className={styles.errorMessage}>{emailErrorMessage}</p>}
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••"
                name="password"
                required
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
              />
              {passwordError && <p className={styles.errorMessage}>{passwordErrorMessage}</p>}
            </div>

            <button type="submit" className={styles.submitButton}>Sign In</button>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <Link href="/" onClick={handleClickOpen} className={styles.linkButton}>
              Forgot your password?
            </Link>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>

          <div className={styles.form}>
            <button type="button" className={styles.socialButton} onClick={() => alert('Sign in with Google')}>
              Sign in with Google
            </button>

            <button type="button" className={styles.socialButton} onClick={() => alert('Sign in with Facebook')}>
              Sign in with Facebook
            </button>
          </div>

          <p className={styles.textCenter}>
            Don&apos;t have an account?
            <Link href="/register" className={styles.linkButton}>
              Sign up
            </Link>
          </p>

        </div>
        </div>
  );
};