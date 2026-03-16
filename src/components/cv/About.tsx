import { Grid, Text, Card, Group, ThemeIcon, Stack } from '@mantine/core';
import { IconDeviceLaptop, IconCode, IconRocket } from '@tabler/icons-react';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

interface AboutProps {
  profile?: any;
}

const About = ({ profile }: AboutProps) => {
  const { t } = useTranslation();
  const stats = [
    { icon: <IconDeviceLaptop size={24} />, title: profile?.experience_years || '0', subtitle: t('about.stats.exp') },
    { icon: <IconCode size={24} />, title: profile?.projects_count || '0', subtitle: t('about.stats.projects') },
    { icon: <IconRocket size={24} />, title: profile?.clients_count || '0', subtitle: t('about.stats.clients') },
  ];

  return (
    <Section id="about" title={t('about.title')} subtitle={t('about.subtitle')}>
      <Grid gutter={40}>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="md">
            <Text size="lg">
              {profile?.bio || ''}
            </Text>
          </Stack>

          <Grid gutter="md" mt={50}>
            {stats.map((stat, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    padding="lg" 
                    ta="center"
                    bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
                  >
                    <ThemeIcon 
                      size={50} 
                      radius="md" 
                      variant="light" 
                      color="violet" 
                      mx="auto" 
                      mb="sm"
                    >
                      {stat.icon}
                    </ThemeIcon>
                    <Text size="xl" fw={800}>{stat.title}</Text>
                    <Text size="sm" c="dimmed">{stat.subtitle}</Text>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card 
            padding="xl" 
            radius="lg"
            bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
          >
            <Stack gap="sm">
              <Text fw={600} size="lg">{t('about.details.title')}</Text>
              <Group justify="space-between">
                <Text c="dimmed">{t('about.details.email')}:</Text>
                <Text fw={500}>{profile?.email || 'N/A'}</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">{t('about.details.phone')}:</Text>
                <Text fw={500}>{profile?.phone || 'N/A'}</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">{t('about.details.address')}:</Text>
                <Text fw={500}>{profile?.location || 'N/A'}</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">{t('about.details.education')}:</Text>
                <Text fw={500}>{profile?.education || 'N/A'}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

export default About;
