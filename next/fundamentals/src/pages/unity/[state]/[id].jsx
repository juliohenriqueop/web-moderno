import { useRouter } from 'next/router'

import styles from './styles.module.css'

export default function Client() {
  const router = useRouter()

  return (
    <div className={styles.client}>
      <h1>Estado: {router.query.state}</h1>
      <h2>Id: {router.query.id}</h2>
    </div>
  )
}