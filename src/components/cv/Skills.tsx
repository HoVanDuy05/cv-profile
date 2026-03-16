import { SimpleGrid, Progress, Text, Stack, Box, Badge, Group } from '@mantine/core';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills?: {
    technical: any[];
    language: any[];
    other: any[];
  } | null;
}

const Skills = ({ skills }: SkillsProps) => {
  const { t } = useTranslation();

  const technicalSkills = (skills?.technical && skills.technical.length > 0) ? skills.technical : [];
  const languages = skills?.language?.map(s => s.name) || [];
  const others = skills?.other?.map(s => s.name) || [];

  if (technicalSkills.length === 0 && languages.length === 0 && others.length === 0) {
    return (
      <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')}>
        <Text ta="center" c="dimmed">Chưa có kỹ năng nào được chia sẻ.</Text>
      </Section>
    );
  }

  return (
    <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <Stack gap="xl">
          <Text fw={600} size="xl" mb="md">{t('skills.technical')}</Text>
          {technicalSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Box mb="sm">
                <Group justify="space-between" mb={5}>
                  <Text fw={500}>{skill.name}</Text>
                  <Text size="sm" c="dimmed">{skill.level}%</Text>
                </Group>
                <Progress value={skill.level} size="lg" radius="xl" color="violet" />
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Stack gap="xl">
          <Box>
            <Text fw={600} size="xl" mb="md">{t('skills.languages')}</Text>
            <Group gap="sm">
              {languages.map((lang, index) => (
                <Badge key={index} size="lg" color="cyan" variant="filled">{lang}</Badge>
              ))}
            </Group>
          </Box>

          <Box mt="xl">
            <Text fw={600} size="xl" mb="md">{t('skills.others')}</Text>
            <Group gap="sm">
              {others.map((skill, index) => (
                <Badge key={index} size="lg" color="violet" variant="outline" radius="sm">{skill}</Badge>
              ))}
            </Group>
          </Box>
        </Stack>
      </SimpleGrid>
    </Section>
  );
};

export default Skills;
