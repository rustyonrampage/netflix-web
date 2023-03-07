import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";

import styles from "@/styles/Login.module.css";
import { useState, useEffect } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  
  const handleOnChangeEmail = (e: any) => {
    setUserMsg("");
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };
  const handleLoginWithEmail = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (email) {
      // route to dashboard
      if (email === "kulkarni.ankita09@gmail.com") {
        try {
          if (magic !== false) {
            const didToken = await magic?.auth?.loginWithMagicLink?.({
              email,
            });
            if (didToken) {
              router.push("/");
            }
          } else {
            throw new Error();
          }
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
        }
      } else {
        console.log("Something went wrong logging in");
      }
    } else {
      // show user message
      setUserMsg("Enter a valid email address");
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>
            {isLoading ? "Loading..." : "Sign In"}
          </h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
