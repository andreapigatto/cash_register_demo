import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import valid from 'card-validator'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

import Button from '../Button/Button'
import orderAtom from '../../atoms/OrderAtom'

type ValidationTypes =
  | 'isString'
  | 'isPhone'
  | 'cardNumber'
  | 'expDate'
  | 'code'

type InputForm = Record<
  string,
  {
    fieldName: string
    value: string
    validation: {
      isRequired: boolean
      type?: ValidationTypes
    }
    valid: boolean
    error: string
  }
>

type ComponentProps = {
  id: 'user' | 'card'
  title: string
  inputs: InputForm
}

function Form({ id, title, inputs }: ComponentProps): JSX.Element {
  const [formState, setFormState] = useState(inputs)
  const [formIsValid, setFormIsValid] = useState(false)
  const [order, setOrder] = useRecoilState(orderAtom)

  const history = useHistory()

  useEffect(() => {
    if (Object.keys(formState).every((key) => formState[key].valid)) {
      setFormIsValid(true)
    } else if (formIsValid) {
      setFormIsValid(false)
    }
  }, [formState])

  useEffect(() => {
    if (id === 'card' && formIsValid) {
      history.push('/order-confirmed')
    }
  }, [order])

  function checkValidity(
    value: string,
    validRules: {
      isRequired: boolean
      type?: ValidationTypes
    }
  ) {
    let isValid = true
    let error = ''

    if (validRules.type === 'isString') {
      isValid = value.length >= 10 && isValid
      error = !(value.length >= 10) ? 'too short! min 10 chars' : error
    }

    if (validRules.type === 'isPhone') {
      const pattern = /^([+]?\d{1,3}[. \s]?)?(\d{9}?)$/
      isValid = pattern.test(value) && isValid
      error = !pattern.test(value) ? 'is not a valid phone number' : error
    }

    if (validRules.isRequired) {
      isValid = value.trim() !== '' && isValid
      error = !(value.trim() !== '') ? 'is Required!' : error
    }
    return { isValid, error }
  }

  function checkCard() {
    let cardValid = true
    Object.keys(formState).forEach((key) => {
      const { value, validation } = formState[key]
      if (validation.type === 'cardNumber') {
        cardValid = valid.number(value).isValid && cardValid
        if (!valid.number(value).isValid) {
          setFormState({
            ...formState,
            [key]: {
              ...formState[key],
              valid: false,
              error: 'cardNumber is not correct',
            },
          })
        }
      }
      if (validation.type === 'expDate') {
        cardValid = valid.expirationDate(value).isValid && cardValid
        if (!valid.expirationDate(value).isValid) {
          setFormState({
            ...formState,
            [key]: {
              ...formState[key],
              valid: false,
              error: 'expDate is not correct',
            },
          })
        }
      }
      if (validation.type === 'code') {
        cardValid = valid.cvv(value).isValid && cardValid
        if (!valid.cvv(value).isValid) {
          setFormState({
            ...formState,
            [key]: {
              ...formState[key],
              valid: false,
              error: 'cvv is not correct (3 digits required)',
            },
          })
        }
      }
    })

    return cardValid
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const check = checkValidity(
      event.target.value,
      formState[event.target.id].validation
    )
    setFormState({
      ...formState,
      [event.target.id]: {
        ...formState[event.target.id],
        value: event.target.value,
        valid: check.isValid,
        error: check.error,
      },
    })
  }

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (id === 'user') {
      setOrder({
        ...order,
        user: Object.keys(formState).reduce(
          (agg, key) => ({ ...agg, [key]: formState[key].value }),
          {}
        ),
      })
      history.push('/menu')
    } else if (id === 'card') {
      const cardValid = checkCard()
      setFormIsValid(cardValid)
      if (cardValid) {
        setOrder({
          ...order,
          card: Object.keys(formState).reduce(
            (agg, key) => ({ ...agg, [key]: formState[key].value }),
            {}
          ),
        })
      } else {
        alert('Card NOT valid. Please try again.')
      }
    }
  }

  return (
    <form id={id} className="w-60 mx-auto" onSubmit={onSubmitHandler}>
      <p className="text-center mb-4">{title}</p>
      {Object.keys(formState).map((key, index) => (
        <div className="flex flex-col" key={key}>
          <label>{formState[key].fieldName}</label>
          <input
            className="border-2"
            id={key}
            value={formState[key].value}
            onChange={onChangeHandler}
          />
          <p className="mb-4 text-sm text-red-500">{formState[key].error}</p>
        </div>
      ))}
      <div className="text-center mt-4">
        <Button name="CONFIRM" type="submit" disabled={!formIsValid} />
      </div>
    </form>
  )
}

export default Form
