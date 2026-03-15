import { Container, Grid, Title, Text, Button, Group, Box, rem } from '@mantine/core';
import { IconDownload, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '@/constants';
import SafeImage from '@/components/common/SafeImage';
import profileImg from '@/assets/images/profile.jpg';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <Box
      mih="calc(100vh - var(--mantine-other-navbarHeight))"
      display="flex"
      py={50}
      style={{ alignItems: 'center' }}
    >
      <Container w="100%">
        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Text
                fw={700}
                size="lg"
                mb="xs"
                c="violet.4"
                style={{ letterSpacing: 'rem(2)' }}
              >
                {t('hero.greeting')}
              </Text>
              <Title
                order={1}
                size="clamp(2.5rem, 8vw, 4rem)"
                fw={900}
                mb="xs"
                style={{ lineHeight: 1.1 }}
              >
                {APP_CONFIG.NAME.split(' ')[0]} <Text 
                  span 
                  variant="gradient" 
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }} 
                  inherit
                >
                  {APP_CONFIG.NAME.split(' ').slice(1).join(' ')}
                </Text>
              </Title>
              <Title order={2} fw={500} size="clamp(1.2rem, 3vw, 1.8rem)" c="dimmed" mb="xl">
                {t('hero.subtitle')}
              </Title>
              <Text size="lg" c="dimmed" mb={40} style={{ maxWidth: rem(500) }}>
                {t('hero.description')}
              </Text>

              <Group gap="md">
                <Button
                  size="lg"
                  component="a"
                  href="#projects"
                  rightSection={<IconArrowRight size={20} />}
                  variant="filled"
                  color="violet"
                >
                  {t('hero.viewProjects')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="violet"
                  leftSection={<IconDownload size={20} />}
                >
                  {t('hero.downloadCV')}
                </Button>
              </Group>
            </motion.div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box pos="relative">
                <Box 
                  pos="absolute"
                  top={20}
                  left={20}
                  w="100%"
                  h="100%"
                  bg="violet.6"
                  opacity={0.1}
                  style={{ borderRadius: 'var(--mantine-radius-lg)' }}
                />
                <SafeImage
                  src={profileImg}
                  radius="lg"
                  alt="Profile"
                  style={{ 
                    boxShadow: 'var(--mantine-shadow-xl)',
                    border: '8px solid white'
                  }}
                />
                <Box 
                  pos="absolute"
                  bottom={-20}
                  right={-20}
                  bg="var(--mantine-color-body)"
                  p="md"
                  display="flex"
                  style={{ 
                    alignItems: 'center', 
                    gap: 'var(--mantine-spacing-sm)', 
                    borderRadius: 'var(--mantine-radius-md)',
                    border: '1px solid var(--mantine-color-default-border)',
                    boxShadow: 'var(--mantine-shadow-md)'
                  }}
                >
                  <Box w={12} h={12} bg="green.6" style={{ borderRadius: 'var(--mantine-radius-xl)' }} />
                  <Text size="sm" fw={600}>{t('hero.ready')}</Text>
                </Box>
              </Box>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
