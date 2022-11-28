import { Text, Group, Image, Container, Tabs, createStyles, Autocomplete, Grid, Title, Center, Menu, Button, UnstyledButton, Drawer, ActionIcon, Space } from '@mantine/core';

import { IconBasket, IconSearch, IconSettings, IconShoppingCart, IconStar, IconTransferOut, IconTrash, IconUser, IconUserCircle } from '@tabler/icons';

import { useViewportSize } from '@mantine/hooks';
import { useProduct } from '../../../context/product-context';
import { useState } from 'react';
import { useAccount } from '../../../context/account-context';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
        }`,
        marginBottom: 50,
      },

    mainSection: {
        paddingBottom: theme.spacing.sm,
      },
    
    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none.'
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: 38,
        backgroundColor: 'transparent',
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
    
        '&[data-active]': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
      },

}));


const HomeHeader = () => {
    const { classes } = useStyles();

    let tabs = ['Menú', 'Ofertas del día', 'Envío Gratis', 'Entrega en Centro de Trabajo'];
    
    const { categories } = useProduct();

    const [opened, setOpened] = useState(false);

    const { currentCustomer } = useAccount();

    return (
      <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Register"
          padding="xl"
          size="xl"
          position="right"
        >
          {/* Drawer content */}
        </Drawer>
        <Grid justify="center" align="center">
          <Grid.Col span={1}>
            <Image
              radius="md"
              height={50}
              width='inherit'
              fit="contain"
              src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png"
              alt="Random unsplash image"
              sx={({ padding: 10 })}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" sx={{width: '100%'}}>
                    Menú
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Categorías</Menu.Label>
                {
                  categories.map((category)=>(
                    <Menu.Item icon={category.icon} >{category.name}</Menu.Item>
                  ))
                }
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
          <Grid.Col span={9}>
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              icon={<IconSearch size={16} stroke={1.5} />}
              data={['Tienda1', 'Tienda2', 'Producto1', 'Producto2']}
              
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Button.Group>
              <Menu position="bottom-end" shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon size="lg">
                    <IconUser
                      size={30}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label sx={{ fontSize: 16 }}>Hola, {currentCustomer.name}</Menu.Label>
                  <Menu.Item icon={<IconUserCircle size={14} />}>Mi cuenta</Menu.Item>
                  <Menu.Item icon={<IconBasket size={14} />}>Mis compras</Menu.Item>
                  <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                  <Menu.Item icon={<IconTransferOut size={14} />}>Cerrar sesión</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Space w="md" />
              <ActionIcon onClick={() => setOpened(true)} size="lg">
                <IconShoppingCart
                  size={30}
                  stroke={1.5}
                />
              </ActionIcon>
            </Button.Group>
            {/* <Text>Hola, {currentCustomer.name}</Text> */}
          </Grid.Col>
          {/* <Grid.Col span={1}>
          </Grid.Col> */}
        </Grid>
        <Group position="apart" grow>
          <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
                root: classes.tabs,
                tabsList: classes.tabsList,
                tab: classes.tab,
            }}
          >
            <Tabs.List grow>{
              tabs.map((tab) => (
                <Tabs.Tab value={tab} key={tab}>
                  {tab}
                </Tabs.Tab>
              ))
            }</Tabs.List>
          </Tabs>
        </Group>
      </>
    )
  }
  
  export default HomeHeader
  