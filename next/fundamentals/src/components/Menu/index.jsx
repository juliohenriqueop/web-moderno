import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from "../../components/Button"

import styles from './styles.module.css'

export default function Menu() {
  const router = useRouter()

  function getRandomUnityId() {
    const randomNumber = Math.random()
    return Math.ceil(randomNumber * 99)
  }

  function getRandomState() {
    const states = [
      "Goiás",
      "Bahia",
      "Sergipe",
      "Pernambuco",
      "Amazonas"
    ]

    const randomNumber = Math.random()
    const randomIndex = Math.floor(randomNumber * states.length)

    return states[randomIndex]
  }

  function getRandomUnityURL() {
    return `/unity/${getRandomState()}/${getRandomUnityId()}`
  }

  function handleUnityURLChange() {
    router.push(getRandomUnityURL())
  }

  function getRandomClientId() {
    const randomNumber = Math.random()
    return Math.ceil(randomNumber * 3)
  }

  function getRandomClientURL() {
    return `/clients/${getRandomClientId()}`
  }

  function handleClientURLChange() {
    router.push(getRandomClientURL())
  }

  return (
    <nav className={styles.menu}>
      <Button>
        <Link href="/">Início</Link>
      </Button>
      <Button>
        <Link href="/stylish">Stylish</Link>
      </Button>
      <Button>
        <Link href="/jsx">JSX</Link>
      </Button>
      <Button>
        <a onClick={handleUnityURLChange}>Unidade</a>
      </Button>
      <Button>
        <Link href="/counter">Contador</Link>
      </Button>
      <Button>
        <Link href="/clients">Clientes</Link>
      </Button>
      <Button>
        <a onClick={handleClientURLChange}>Cliente</a>
      </Button>
      <Button>
        <Link href="/ssg">SSG</Link>
      </Button>
      <Button>
        <Link href="/ssr">SSR</Link>
      </Button>
    </nav>
  )
}