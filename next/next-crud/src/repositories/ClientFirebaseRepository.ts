import { FirebaseApp } from '@firebase/app'

import { getFirestore } from '@firebase/firestore'
import { collection } from '@firebase/firestore'
import { doc } from '@firebase/firestore'
import { addDoc } from '@firebase/firestore'
import { setDoc } from '@firebase/firestore'
import { getDoc } from '@firebase/firestore'
import { deleteDoc } from '@firebase/firestore'
import { collectionGroup } from '@firebase/firestore'
import { getDocs } from '@firebase/firestore'
import { Firestore } from '@firebase/firestore'
import { FirestoreDataConverter } from '@firebase/firestore'
import { QueryDocumentSnapshot } from '@firebase/firestore'
import { DocumentData } from '@firebase/firestore'
import { CollectionReference } from '@firebase/firestore'

import { getFirebaseApp } from "../config/FireBaseApp"
import ClientRepository from "../core/Client/ClientRepository";
import Client from "../core/Client/Client"

class FirestoreClientAdapter implements FirestoreDataConverter<Client> {
  toFirestore(client: Client): DocumentData {
    return {
      name: client.name,
      age: client.age
    }
  }

  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Client {
    const clientDocument: DocumentData = snapshot.data()
    const firebaseGeneratedClientId = snapshot.ref.id

    return new Client(
      clientDocument.name,
      clientDocument.age,
      firebaseGeneratedClientId
    )
  }
}

export default class ClientFirebaseRepository implements ClientRepository {
  private firebaseApp: FirebaseApp
  private firestoreInstance: Firestore
  private firestoreClientAdapter: FirestoreClientAdapter
  private clientsCollection: CollectionReference<DocumentData>

  constructor() {
    this.firebaseApp = getFirebaseApp()
    this.firestoreInstance = getFirestore(this.firebaseApp)
    this.firestoreClientAdapter = new FirestoreClientAdapter()

    this.clientsCollection = collection(this.firestoreInstance, 'clients')
      .withConverter(this.firestoreClientAdapter)
  }

  async create(client: Client): Promise<Client> {
    const clientDocument = await addDoc(
      this.clientsCollection,
      client
    )

    const convertedClientDocument = clientDocument
      .withConverter(this.firestoreClientAdapter)

    const clientSnapshot = await getDoc(convertedClientDocument)
    const createdClient = clientSnapshot.data() || new Client()

    return createdClient
  }

  private async getClientDocument(client: Client) {
    if (!client.id) throw new Error('A client with an id is required.')

    return doc(this.firestoreInstance, this.clientsCollection.path, client.id)
      .withConverter(this.firestoreClientAdapter)
  }

  async update(client: Client): Promise<Client> {
    const clientDocument = await this.getClientDocument(client)
    await setDoc(clientDocument, client)

    const clientSnapshot = await getDoc(clientDocument)
    const updatedClient = clientSnapshot.data() || new Client()

    return updatedClient
  }

  async delete(client: Client): Promise<void> {
    const clientDocument = await this.getClientDocument(client)
    return deleteDoc(clientDocument)
  }

  async getAll(): Promise<Client[]> {
    const clientsQuery = collectionGroup(
      this.firestoreInstance,
      this.clientsCollection.path
    ).withConverter(this.firestoreClientAdapter)

    const clientsSnapshot = await getDocs(clientsQuery)

    const clients = clientsSnapshot.docs.map(client => client.data())
    return clients
  }
}