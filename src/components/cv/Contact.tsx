import { Grid, TextInput, Textarea, Button, Stack, Text, Box, Group, ActionIcon } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '@/constants';
import { motion } from 'framer-motion';
import SocialInfo from '@/components/common/SocialInfo';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <Grid gutter={50}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Stack gap="xl">
              <Text size="lg">
                {t('contact.description')}
              </Text>

              <Stack gap="lg">
                <Group>
                  <ActionIcon size={40} radius="md" variant="light" color="violet">
                    <IconMail size={20} />
                  </ActionIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('contact.form.email')}</Text>
                    <Text fw={500}>{APP_CONFIG.EMAIL}</Text>
                  </Box>
                </Group>

                <Group>
                  <ActionIcon size={40} radius="md" variant="light" color="violet">
                    <IconPhone size={20} />
                  </ActionIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('about.details.phone')}</Text>
                    <Text fw={500}>{APP_CONFIG.PHONE}</Text>
                  </Box>
                </Group>

                <Group>
                  <ActionIcon size={40} radius="md" variant="light" color="violet">
                    <IconMapPin size={20} />
                  </ActionIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('about.details.address')}</Text>
                    <Text fw={500}>{APP_CONFIG.LOCATION}</Text>
                  </Box>
                </Group>
              </Stack>

              <SocialInfo variant="filled" size="lg" gap="md" />
            </Stack>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              component="form"
              p="xl"
              bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
              style={{
                borderRadius: 'var(--mantine-radius-lg)',
                border: '1px solid var(--mantine-color-default-border)',
                boxShadow: 'var(--mantine-shadow-sm)'
              }}
            >
              <Stack gap="md">
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label={t('contact.form.name')} placeholder={t('contact.form.namePlaceholder')} required />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label={t('contact.form.email')} placeholder={t('contact.form.emailPlaceholder')} required />
                  </Grid.Col>
                </Grid>
                <TextInput label={t('contact.form.subject')} placeholder={t('contact.form.subjectPlaceholder')} required />
                <Textarea label={t('contact.form.message')} placeholder={t('contact.form.messagePlaceholder')} minRows={4} required />
                <Button size="lg" color="violet" mt="md" fullWidth>{t('contact.form.send')}</Button>
              </Stack>
            </Box>
          </motion.div>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

export default Contact;
