import { Box, Container, Group, Text, ActionIcon, Stack, Divider } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconArrowUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '@/constants';
import Logo from '@/components/common/Logo';
import SocialInfo from '@/components/common/SocialInfo';

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      component="footer" 
      bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
      pt={60}
      pb={30}
      style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
    >
      <Container>
        <Grid gutter={40} mb={40}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xs">
              <Logo fontSize="1.5rem" />
              <Text size="sm" c="dimmed">
                {t('hero.description')}
              </Text>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="sm">
              <Text fw={700} mb="xs">{t('contact.title')}</Text>
              <Group gap="sm" wrap="nowrap" align="center">
                <IconMail size={18} className="text-gradient" />
                <Text size="sm" c="dimmed">{APP_CONFIG.EMAIL}</Text>
              </Group>
              <Group gap="sm" wrap="nowrap" align="center">
                <IconPhone size={18} className="text-gradient" />
                <Text size="sm" c="dimmed">{APP_CONFIG.PHONE}</Text>
              </Group>
              <Group gap="sm" wrap="nowrap" align="center">
                <IconMapPin size={18} className="text-gradient" />
                <Text size="sm" c="dimmed">{APP_CONFIG.LOCATION}</Text>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xs" align="flex-start">
              <Text fw={700} mb="xs">Follow Me</Text>
              <SocialInfo />
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider mb={30} opacity={0.5} />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            © 2026 {APP_CONFIG.NAME}. {t('footer.rights')}
          </Text>
          <ActionIcon 
            variant="filled" 
            color="violet" 
            radius="xl" 
            size="lg" 
            onClick={scrollToTop}
          >
            <IconArrowUp size={20} />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
};

import { Grid } from '@mantine/core';
export default Footer;
