import { useState } from 'react';
import { Grid, TextInput, Textarea, Button, Stack, Text, Box, Group, ActionIcon, Alert } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import SocialInfo from '@/components/common/SocialInfo';
import { sendContactMessage } from '@/services/api';
import { useForm } from '@mantine/form';

interface ContactProps {
  profile?: any;
}

const Contact = ({ profile }: ContactProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : t('contact.form.invalidEmail')),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setStatus(null);
    try {
      await sendContactMessage(values);
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

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
                    <Text fw={500}>{profile?.email || 'N/A'}</Text>
                  </Box>
                </Group>

                <Group>
                  <ActionIcon size={40} radius="md" variant="light" color="violet">
                    <IconPhone size={20} />
                  </ActionIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('about.details.phone')}</Text>
                    <Text fw={500}>{profile?.phone || 'N/A'}</Text>
                  </Box>
                </Group>

                <Group>
                  <ActionIcon size={40} radius="md" variant="light" color="violet">
                    <IconMapPin size={20} />
                  </ActionIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('about.details.address')}</Text>
                    <Text fw={500}>{profile?.location || 'N/A'}</Text>
                  </Box>
                </Group>
              </Stack>

              <SocialInfo variant="filled" size="lg" gap="md" profile={profile} />
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
              onSubmit={form.onSubmit(handleSubmit)}
              p="xl"
              bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
              style={{
                borderRadius: 'var(--mantine-radius-lg)',
                border: '1px solid var(--mantine-color-default-border)',
                boxShadow: 'var(--mantine-shadow-sm)'
              }}
            >
              <Stack gap="md">
                {status === 'success' && (
                  <Alert icon={<IconCheck size={16} />} title="Success" color="green" variant="light" withCloseButton onClose={() => setStatus(null)}>
                    {t('contact.form.successMessage')}
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light" withCloseButton onClose={() => setStatus(null)}>
                    {t('contact.form.errorMessage')}
                  </Alert>
                )}
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label={t('contact.form.name')}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label={t('contact.form.email')}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                </Grid>
                <TextInput
                  label={t('contact.form.subject')}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                  {...form.getInputProps('subject')}
                />
                <Textarea
                  label={t('contact.form.message')}
                  placeholder={t('contact.form.messagePlaceholder')}
                  minRows={4}
                  required
                  {...form.getInputProps('message')}
                />
                <Button
                  type="submit"
                  size="lg"
                  color="violet"
                  mt="md"
                  fullWidth
                  loading={loading}
                >
                  {t('contact.form.send')}
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Grid.Col>
      </Grid>
    </Section>
  );
};

export default Contact;
