import styles from './styles.module.css'

export function getStaticProps() {
  return {
    props: {
      randomNumber: Math.floor(Math.random() * 100)
    }
  }
}

export default function ssg(props) {
  return <h1 className={styles.ssg}>{props.randomNumber}</h1>
}