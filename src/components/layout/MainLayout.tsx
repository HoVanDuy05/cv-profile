import { Box, Drawer, Stack, Text, SegmentedControl } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import NavbarLinks from './Navbar';
import Logo from '@/components/common/Logo';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { i18n } = useTranslation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const currentLanguage = i18n.language || 'vi';

  return (
    <Box bg="var(--mantine-color-body)" c="var(--mantine-color-text)" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header opened={opened} toggle={toggle} />
      
      <Box component="main" style={{ flex: 1 }}>
        {children}
      </Box>

      <Footer />

      <Drawer
        opened={opened}
        onClose={close}
        size="md"
        padding="xl"
        title={<Logo fontSize="1.25rem" />}
        hiddenFrom="md"
      >
        <Stack gap={40} mt="xl">
          <Box>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="lg">Language</Text>
            <SegmentedControl
              value={currentLanguage}
              onChange={(v) => i18n.changeLanguage(v)}
              data={[
                { label: 'Tiếng Việt', value: 'vi' },
                { label: 'English', value: 'en' },
              ]}
              fullWidth
              size="md"
              radius="md"
              color="violet"
            />
          </Box>
          <Box>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="lg">Navigation</Text>
            <Stack gap="lg">
              <NavbarLinks onClick={close} />
            </Stack>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default MainLayout;
