import { useState, useEffect, Fragment, FormEvent } from "react";

import Client from "../../core/Client/Client";
import Form from "../Form/Form";
import Input from "../Form/Input";
import RectangularButton from "../Buttons/RectangularButton";

export type ClientFormProps = {
  client: Client,
  onSaveClick: (client: Client) => void,
  onCancelClick: () => void
}

export default function ClientForm(props: ClientFormProps) {
  const [name, setName] = useState<string>()
  const [age, setAge] = useState<number>()

  useEffect(() => {
    setName(props.client.name)
    setAge(props.client.age)
  }, [props.client.age, props.client.name])

  function handleNameChange(name: string) {
    setName(name)
  }

  function handleAgeChange(age: string) {
    const ageNumber = parseInt(age)
    ageNumber > 0 ? setAge(ageNumber) : setAge(0)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleSaveClick() {
    const client = new Client(name, age, props.client.id)
    props.onSaveClick(client)
  }

  function renderInputs() {
    return (
      <Fragment>
        <Input type="text" label="ID" readOnly={true} value={props.client.id || 'Nenhum'} />
        <Input type="text" label="Nome" value={name} onChange={handleNameChange} />
        <Input type="number" label="Idade" value={age} onChange={handleAgeChange} />
      </Fragment>
    )
  }

  function renderButtons() {
    return (
      <Fragment>
        <RectangularButton variant="blue"
          onClick={handleSaveClick}>Salvar</RectangularButton>
        <RectangularButton className="ml-2"
          onClick={props.onCancelClick}>Cancelar</RectangularButton>
      </Fragment>
    )
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      {renderInputs()}
      <div className="flex justify-end mt-4">
        {renderButtons()}
      </div>
    </Form>
  )
}