import { BackgroundImage, Center, Text, Grid, Group, Stack, Button, TextInput, PasswordInput, Box, Anchor, Image, Space, Title, LoadingOverlay } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useAccount } from '../context/account-context';
import { useEffect } from 'react';


const Login = () => {
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });
    const router = useRouter()
    const { handleLogin, checkSession, status } = useAccount()

    useEffect(() => {
        if (checkSession()) {
            router.push("/home")
        }
    });

    return (
      <>
      <LoadingOverlay visible={status != "unauthenticated"} overlayBlur={2} overlayOpacity={0.9}/>
      <Grid>
            <Grid.Col span={6} sx={({ padding: 0 })} >
            <BackgroundImage
                src="https://rdb.rw/wp-content/uploads/2018/01/default-placeholder.png"
                radius="xs"
                sx={({ height: height - 8, display: "flex", justifyContent: "center", alignItems: "center" })}
            >
                <Stack align="center" justify="flex-end">
                    <Title order={3}>Bienvenido(a) a:</Title>
                    <Title order={3}>Tu tienda de Beneficios (*)</Title>
                </Stack>
            </BackgroundImage>
            </Grid.Col>
            <Grid.Col
                span={6}
                sx={({ height: height - 8, display: "flex", justifyContent: "center", alignItems: "center" })}
            >
                <Box sx={({ width: width/3 })}>
                    <Image
                        radius="md"
                        height={100}
                        fit="contain"
                        src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png"
                        alt="Random unsplash image"
                        sx={({ padding: 30 })}
                    />
                    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                        <Stack spacing="xl">
                            <TextInput
                            placeholder="Correo electr??nico / DNI"
                            radius="xs"
                            size="lg"
                            />
                            <PasswordInput
                            placeholder="Password"
                            radius="xs"
                            size="lg"
                            />
                            <Button color="gray" fullWidth size="lg" type="submit">Submit</Button>
                        </Stack>
                        <Space h="md" />
                        <Stack align="center" spacing="xs">
                            <Anchor href="" target="_blank">
                                ??Olvidaste tu contrase??a?
                            </Anchor>
                            <Text>??No tienes una cuenta? <Anchor href="" inherit>Solic??tala aqu??</Anchor>.</Text>
                        </Stack>
                    </form>
                </Box>
            </Grid.Col>
        </Grid>
      </>
    )
  }
  
  export default Login
  