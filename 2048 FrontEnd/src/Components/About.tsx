import styles from "../Styles/About.module.css";
const About = () => {
  return (
    <div className={styles.AboutContainer}>
      <p>Hi my name is Nir!</p>{" "}
      <p>
        I have decided to create my own version of the famous game 2048 in order
        to improve my React and web devlopment skills .
      </p>
      <p>Here you can play 2048 but with goofy dogs instead of numbers🐶</p>
    </div>
  );
};

export default About;
