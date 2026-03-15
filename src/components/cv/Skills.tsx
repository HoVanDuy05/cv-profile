import { SimpleGrid, Progress, Text, Stack, Box, Badge, Group } from '@mantine/core';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Skills = () => {
  const { t } = useTranslation();
  const technicalSkills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'Node.js / Express', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'PHP / Laravel', level: 85 },
    { name: 'PostgreSQL / MongoDB', level: 85 },
    { name: 'MySQL / Redis', level: 80 },
  ];

  const languages = ['Tiếng Việt (Bản ngữ)', 'Tiếng Anh (IELTS 7.5)', 'Tiếng Nhật (N3)'];
  const others = ['Git', 'Agile/Scrum', 'Figma', 'Problem Solving', 'Team Leadership'];

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
