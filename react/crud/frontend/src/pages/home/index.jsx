import React from 'react'
import Header from '../../components/header'
import Content from '../../components/content'
import './style.css'

export default function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <Header
          icon="home"
          title="Início"
          description="Segundo exercício do capítulo de React"
        />
      </div>
      <div className="home__content">
        <Content>
          <div className="h3">Bem vindo !</div>
          <hr />
          <p>Sistema para exemplificar a construção de um cadastro de usuário feito em React.</p>
        </Content>
      </div>
    </div>
  )
}