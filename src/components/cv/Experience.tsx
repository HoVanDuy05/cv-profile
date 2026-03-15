import { Timeline, Text, Box, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBriefcase, IconSchool } from '@tabler/icons-react';
import Section from '@/components/common/Section';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 48em)');
  const bulletSize = isMobile ? 32 : 40;
  const iconSize = isMobile ? 18 : 22;

  const workExperiences = [
    {
      title: 'Junior Fullstack Developer',
      company: 'Freelance / Personal Projects',
      period: '2023 - Present',
      description: 'Phát triển các ứng dụng web hiện đại sử dụng React, Node.js và Laravel. Tập trung vào tối ưu hóa mã nguồn và trải nghiệm người dùng.',
      type: 'work'
    }
  ];

  const educationExperiences = [
    {
      title: 'Lập trình Web (Full-stack)',
      company: 'Cao đẳng FPT Polytechnic',
      period: '2024 - 2026',
      description: 'Chuyên ngành Phát triển phần mềm, tập trung vào các công nghệ web hiện đại và quy trình phát triển sản phẩm thực tế.',
      type: 'edu'
    }
  ];

  const renderTimeline = (items: typeof workExperiences) => (
    <Timeline
      active={0}
      bulletSize={bulletSize}
      lineWidth={2}
      color="violet"
      mt={{ base: 'lg', sm: 'xl' }}
    >
      {items.map((exp, index) => (
        <Timeline.Item
          key={index}
          bullet={exp.type === 'work' ? <IconBriefcase size={iconSize} /> : <IconSchool size={iconSize} />}
          title={
            <Box>
              <Text fw={700} size="clamp(1rem, 3vw, 1.25rem)" style={{ lineHeight: 1.3 }}>{exp.title}</Text>
              <Text size="clamp(0.85rem, 2.5vw, 1rem)" c="violet.5" fw={600}>{exp.company}</Text>
            </Box>
          }
        >
          <Text c="dimmed" size="xs" mt={4} mb={8} fw={700}>{exp.period}</Text>
          <Text size="clamp(0.85rem, 2vw, 0.95rem)" style={{ lineHeight: 1.6 }}>{exp.description}</Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );

  return (
    <Section id="experience" title={t('experience.title')} subtitle={t('experience.subtitle')}>
      <Box maw={800} mx="auto">
        <Tabs defaultValue="work" color="violet" variant="outline" radius="md">
          <Tabs.List grow>
            <Tabs.Tab
              value="work"
              leftSection={<IconBriefcase size={16} />}
              style={{ fontWeight: 600, fontSize: 'var(--mantine-font-size-sm)' }}
            >
              <Text span visibleFrom="xs">{t('experience.professional')}</Text>
              <Text span hiddenFrom="xs">{t('experience.professional').split(' ').pop()}</Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="edu"
              leftSection={<IconSchool size={16} />}
              style={{ fontWeight: 600, fontSize: 'var(--mantine-font-size-sm)' }}
            >
              <Text span visibleFrom="xs">{t('experience.academic')}</Text>
              <Text span hiddenFrom="xs">{t('experience.academic').split(' ').pop()}</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="work">
            {renderTimeline(workExperiences)}
          </Tabs.Panel>

          <Tabs.Panel value="edu">
            {renderTimeline(educationExperiences)}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Section>
  );
};

export default Experience;
