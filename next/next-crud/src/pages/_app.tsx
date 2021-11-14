import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import ClientContext from '../components/Client/ClientContext'
import ClientFirebaseRepository from '../repositories/ClientFirebaseRepository'
import ClientRepositoryContext from '../components/Client/ClientRepositoryContext'

export default function App({ Component, pageProps }) {
  return (
    <ClientContext>
      <ClientRepositoryContext repository={new ClientFirebaseRepository()}>
        <Component {...pageProps} />
      </ClientRepositoryContext>
    </ClientContext>
  )
}