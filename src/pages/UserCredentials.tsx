import Layout from '../Layout/Layout'
import Form from '../components/Form/Form'

function UserCredentials(): JSX.Element {
  return (
    <Layout>
      <Form
        id="user"
        title="User Credentials"
        inputs={{
          name: {
            fieldName: 'name',
            value: '',
            validation: {
              isRequired: true,
              type: 'isString',
            },
            valid: false,
            error: '',
          },
          address: {
            fieldName: 'address',
            value: '',
            validation: {
              isRequired: true,
              type: 'isString',
            },
            valid: false,
            error: '',
          },
          phone: {
            fieldName: 'phone',
            value: '',
            validation: {
              isRequired: true,
              type: 'isPhone',
            },
            valid: false,
            error: '',
          },
        }}
      />
    </Layout>
  )
}

export default UserCredentials
