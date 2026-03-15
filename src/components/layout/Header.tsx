import {
  Group,
  Container,
  Box,
  ActionIcon,
  useMantineColorScheme,
  Burger,
  SegmentedControl
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/common/Logo';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  const { i18n } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const currentLanguage = i18n.language || 'vi';

  return (
    <Box 
      component="header" 
      className="glass-navbar" 
      h="var(--mantine-other-navbarHeight)"
      mih="var(--mantine-other-navbarHeight)"
    >
      <Container h="100%">
        <Group justify="space-between" h="100%" py="md">
          <Logo />

          <Group gap="xs">
            {/* Nav links integrated in desktop view */}
            <Group gap={25} visibleFrom="md" mr={20}>
              <NavbarLinks />
            </Group>

            <SegmentedControl
              value={currentLanguage}
              onChange={(v) => i18n.changeLanguage(v)}
              data={[
                { label: 'VI', value: 'vi' },
                { label: 'EN', value: 'en' },
              ]}
              size="sm"
              radius="xl"
              color="violet"
              variant="light"
              visibleFrom="sm"
            />

            <ActionIcon
              variant="light"
              color={dark ? 'yellow' : 'violet'}
              onClick={() => toggleColorScheme()}
              size="lg"
              radius="md"
            >
              {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
            />
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

import NavbarLinks from './Navbar';
export default Header;
