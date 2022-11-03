import React from "react";
import style from "../about/About.module.css";
import { Link } from "react-router-dom";
import Logo from "../../Image/natural-1281596-removebg-preview (1).png";
import github from "../../Image/github.png";
import linkedin from "../../Image/linkedin.png";
import email from "../../Image/email.png";

export default function About() {
  return (
    <div className={style.bgImg}>
      <div className={style.bg}>
        <div className={style.nav}>
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <Link to="/recipes">
              <button>Back</button>
            </Link>
          </div>
        </div>
        <div className={style.position} z-index="60">
          <div className={style.bgDetail}>
            <h1>About me</h1>
            <div className={style.contenido}>
              <h3>
                My name is Melissa Hellrigl, I'm developer full stack and this is my first project
                created for the bootcamp Henry in the year 2022.
              </h3>
              <h2>Tech Stack</h2>
              <h3>
                ReactJS - Redux - CSS puro - Figma - NodeJS - Express - Sequelize - PostegreSQL
              </h3>
              <h2>Contact me</h2>
              <div className={style.contact}>
                <Link
                  className={style.circle}
                  target="_blank"
                  href="https://github.com/MelHellrigl"
                >
                  <img src={github} alt="Logo" />
                  <h4>Github</h4>
                </Link>
                <Link
                  className={style.circle}
                  target="_blank"
                  href="https://www.linkedin.com/in/melissa-hellrigl-908441134/"
                >
                  <img src={linkedin} alt="Logo" />
                  <h4>LinkedIn</h4>
                </Link>
                <Link
                  className={style.circle}
                  target="_blank"
                  href="mailto:hellriglandreamelissa@gmail.com"
                >
                  <img src={email} alt="Logo" />
                  <h4>hellriglandreamelissa@gmail.com</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
