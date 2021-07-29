import Layout from '../Layout/Layout'
import Form from '../components/Form/Form'

function PaymentInfo(): JSX.Element {
  return (
    <Layout prevButton={{ route: '/menu' }}>
      <Form
        id="card"
        title="Check your card"
        inputs={{
          cardNum: {
            fieldName: 'Credit card number (for demo: 4111111111111111)',
            value: '',
            validation: {
              isRequired: true,
              type: 'cardNumber',
            },
            valid: false,
            error: '',
          },
          expDate: {
            fieldName: 'Expiration date MM/YY',
            value: '',
            validation: {
              isRequired: true,
              type: 'expDate',
            },
            valid: false,
            error: '',
          },
          code: {
            fieldName: 'Security Code (CVV)',
            value: '',
            validation: {
              isRequired: true,
              type: 'code',
            },
            valid: false,
            error: '',
          },
        }}
      />
    </Layout>
  )
}

export default PaymentInfo
