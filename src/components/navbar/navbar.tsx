import React, { ReactEventHandler, useState } from "react";
import styles from "./navbar.module.css";

import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  username: string;
};

export default function Navbar(props: Props) {
  const { username } = props;

  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome: ReactEventHandler = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList: ReactEventHandler = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown: ReactEventHandler = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>Netflix</div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link href="/login" className={styles.linkName}>
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}