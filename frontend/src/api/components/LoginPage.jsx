import { useMutation, useQueryClient } from 'react-query'
import { login } from '../users/apiUsers'
import { Formik, Field, Form } from 'formik'

const LoginPage = () => {

  const loginMutation = useMutation({
    mutationFn: login,
  })

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          loginMutation.mutate({ ...values })
        }}
        >
        <Form>
          <Field id='email' name='email' placeholder='Email'/>
          <Field type='password' id='password' name='password' placeholder='password'/>
          <button type="submit">Login</button>
        </Form>
        </Formik>
    </div>
  )
}

export default LoginPage
