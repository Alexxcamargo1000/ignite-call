import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Register() {
  // async function handleRegister(data: RegisterFormData) {}

  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const hasSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong"> Conecte sua agenda! </Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {hasSignedIn ? (
            <Button variant="primary" size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size={'xs'}>
            Houve um erro ao conectar com o Google, verifique que você habilitou
            o calendário.
          </AuthError>
        )}
        <Button type="submit" disabled={!hasSignedIn}>
          Proximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
