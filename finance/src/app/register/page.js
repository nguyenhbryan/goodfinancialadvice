"use client";
import * as React from 'react';
//import { GoogleIcon, FacebookIcon} from './CustomIcons'; // Keep these as custom icons
import Link from 'next/link'; // Using Next.js Link instead of MUI's Link for routing
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
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
        <div className="">
            <div className="">
                <h1 className="">
                    Sign up
                </h1>

                <form ref={ref} action={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="">Username</label>
                        <input
                            autoComplete="name"
                            name="name"
                            required
                            id="name"
                            placeholder="Jon Snow"
                            className=''
                        />
                        {nameError && <p className="">{nameErrorMessage}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="">Email</label>
                        <input
                            required
                            id="email"
                            placeholder="your@email.com"
                            name="email"
                            autoComplete="email"
                            className=''
                        />
                        {emailError && <p className="">{emailErrorMessage}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="">Password</label>
                        <input
                            required
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            className=''
                        />
                        {passwordError && <p className="">{passwordErrorMessage}</p>}
                    </div>

                    <div className="">
                        <input
                            type="checkbox"
                            value="allowExtraEmails"
                            id="allowExtraEmails"
                            className=""
                        />
                        <label htmlFor="allowExtraEmails" className="">I want to receive updates via email.</label>
                    </div>

                    <button
                        type="submit"
                        className=""
                    >
                        Sign up
                    </button>
                </form>

                <div className="my-6">
                    <div className="">
                        <div className=""></div>
                        <span className="">or</span>
                        <div className=""></div>
                    </div>
                </div>

                <div className="">
                    <button
                        className=""
                        onClick={() => alert('Sign up with Google')}
                    >
                        
                        <span>Sign up with Google</span>
                    </button>

                    <button
                        className=""
                        onClick={() => alert('Sign up with Facebook')}
                    >
                        
                        <span>Sign up with Facebook</span>
                    </button>
                </div>

                <div className="">
                    <p className="">
                        Already have an account?{" "}
                        <Link href="/login" className="">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}