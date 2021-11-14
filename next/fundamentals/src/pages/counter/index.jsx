import { useState } from "react"
import Button from "../../components/Button"

import styles from './styles.module.css'

export default function Counter() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleDecrement() {
    setCount(count - 1)
  }

  return (
    <div className={styles.counter}>
      <h1>Contador: {count}</h1>
      <div className={styles.buttons}>
        <Button>
          <button className={styles.button} onClick={handleIncrement}>Incrementar</button>
        </Button>
        <Button>
          <button className={styles.button} onClick={handleDecrement}>Decrementar</button>
        </Button>
      </div>
    </div>
  )
}