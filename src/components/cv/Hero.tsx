import { Container, Grid, Title, Text, Button, Group, Box, rem } from '@mantine/core';
import { IconDownload, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '@/constants';
import SafeImage from '@/components/common/SafeImage';
import profileImg from '@/assets/images/profile.jpg';

interface HeroProps {
  profile?: any;
}

const Hero = ({ profile }: HeroProps) => {
  const { t } = useTranslation();

  const name = profile?.name || APP_CONFIG.NAME;
  const title = profile?.title || t('hero.subtitle');
  const bio = profile?.bio || t('hero.description');
  const avatar = profile?.avatar ? `https://profile-be-js9l.onrender.com${profile.avatar}` : profileImg;

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
                {name.split(' ')[0]} <Text
                  span
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                  inherit
                >
                  {name.split(' ').slice(1).join(' ')}
                </Text>
              </Title>
              <Title order={2} fw={500} size="clamp(1.2rem, 3vw, 1.8rem)" c="dimmed" mb="xl">
                {title}
              </Title>
              <Text size="lg" c="dimmed" mb={40} style={{ maxWidth: rem(500) }}>
                {bio}
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
              <Box pos="relative" maw={rem(450)} mx="auto">
                <Box
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: 'var(--mantine-radius-lg)',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    boxShadow: 'var(--mantine-shadow-xl)',
                    border: '4px solid var(--mantine-color-body)',
                  }}
                >
                  <SafeImage
                    src={avatar}
                    alt="Profile"
                    w="100%"
                    h="100%"
                    style={{
                      objectFit: 'cover',
                    }}
                  />

                  {/* Subtle overlay for better text contrast/premium feel */}
                  <Box
                    pos="absolute"
                    inset={0}
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                      pointerEvents: 'none'
                    }}
                  />
                </Box>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Box
                    pos="absolute"
                    bottom={20}
                    right={-15}
                    bg="var(--mantine-color-body)"
                    px="lg"
                    py="sm"
                    display="flex"
                    style={{
                      alignItems: 'center',
                      gap: 'var(--mantine-spacing-sm)',
                      borderRadius: 'var(--mantine-radius-xl)',
                      border: '1px solid var(--mantine-color-violet-light)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      zIndex: 2
                    }}
                  >
                    <Box
                      w={10}
                      h={10}
                      bg="green.6"
                      style={{
                        borderRadius: '50%',
                        boxShadow: '0 0 8px var(--mantine-color-green-default)'
                      }}
                    />
                    <Text size="sm" fw={700} c="dimmed">{t('hero.ready')}</Text>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
