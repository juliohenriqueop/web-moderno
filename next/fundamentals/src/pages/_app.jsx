import React from 'react'

import '../styles/globals.css'
import '../styles/app.css'

import Layout from '../components/Layout'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
