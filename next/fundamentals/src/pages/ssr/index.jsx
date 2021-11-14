import styles from './styles.module.css'

export function getServerSideProps() {
  return {
    props: {
      randomNumber: Math.floor(Math.random() * 100)
    }
  }
}

export default function ssr(props) {
  return <h1 className={styles.ssr}>{props.randomNumber}</h1>
}