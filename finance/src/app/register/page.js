"use client";
import * as React from 'react';
//import { GoogleIcon, FacebookIcon} from './CustomIcons'; // Keep these as custom icons
import Link from 'next/link'; // Using Next.js Link instead of MUI's Link for routing
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import styles from "./page.module.css";
export default function Register() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const router = useRouter();
    const ref = useRef(null);
    const [error, setError] = useState();

    // Frontend validation function
    const validateForm = (formData) => {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        let errorMessages = [];

        // Basic validation checks
        if (!name || name.trim() === "") {
            errorMessages.push("Name is required.");
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errorMessages.push("Please enter a valid email address.");
        }
        if (!password || password.length < 6) {
            errorMessages.push("Password must be at least 6 characters long.");
        }

        if (errorMessages.length > 0) {
            setFormError(errorMessages);
            return false;
        }
        return true;
    };

    const handleSubmit = async (formData) => {
        const r = await register({
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name")
        });
        ref.current?.reset();
        if (r?.error) {
            setError(r.error);
            return;
        } else {
            return router.push("/login");
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Sign up</h1>

                <form className={styles.form}>
                    <div>
                        <label htmlFor="name" className={styles.label}>Username</label>
                        <input id="name" name="name" placeholder="Jon Snow" className={styles.input} required />
                    </div>

                    <div>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input id="email" name="email" placeholder="your@email.com" className={styles.input} required />
                    </div>

                    <div>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input id="password" name="password" type="password" placeholder="••••••" className={styles.input} required />
                    </div>

                    <div className={styles.checkboxContainer}>
                        <input type="checkbox" id="allowExtraEmails" className={styles.checkbox} />
                        <label htmlFor="allowExtraEmails" className={styles.label}>
                            I want to receive updates via email.
                        </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>Sign up</button>
                </form>

                <div className={styles.divider}>
                    <div className={styles.dividerLine}></div>
                    <span className={styles.dividerText}>or</span>
                    <div className={styles.dividerLine}></div>
                </div>

                <button className={styles.socialButton}>Sign up with Google</button>
                <button className={styles.socialButton}>Sign up with Facebook</button>

                <div className={styles.textCenter}>
                    <p>
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}