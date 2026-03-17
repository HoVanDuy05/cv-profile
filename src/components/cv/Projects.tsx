import { SimpleGrid, Card, Text, Badge, Button, Group, Box } from '@mantine/core';
import { IconExternalLink, IconCode } from '@tabler/icons-react';
import Section from '@/components/common/Section';
import SafeImage from '@/components/common/SafeImage';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/services/api';
import project1 from '@/assets/images/project1.png';

import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  content?: string;
  tags: string[];
  image: string;
  demo_link: string;
  github_link: string;
  live_link?: string;
  is_featured: boolean;
}

interface ProjectsProps {
  projects?: Project[] | null;
}

const Projects = ({ projects: dynamicProjects }: ProjectsProps) => {
  const { t } = useTranslation();
  
  const projects = dynamicProjects || [
    {
      id: 1,
      title: 'Hệ thống Quản lý Doanh nghiệp',
      slug: 'he-thong-quan-ly-doanh-nghiep',
      subtitle: 'ERP Solution',
      description: 'Nền tảng ERP tích hợp quản lý kho, nhân sự và tài chính.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      image: project1,
      demo_link: '#',
      github_link: '#',
      is_featured: true
    }
  ];

  if (!projects || projects.length === 0) {
    return (
      <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
        <Text ta="center" c="dimmed">Chưa có dự án nào được chia sẻ.</Text>
      </Section>
    );
  }

  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        {projects.map((project, index) => {
          const imageSrc = getImageUrl(project.image);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                shadow="sm" 
                padding="lg" 
                radius="md" 
                withBorder 
                display="flex"
                bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
                style={{ height: '100%', flexDirection: 'column' }}
              >
                <Card.Section>
                  <SafeImage 
                    src={imageSrc} 
                    h={220} 
                    alt={project.title} 
                    style={{ objectFit: 'cover' }}
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
                  <Box>
                    <Text fw={700} size="lg" lineClamp={1}>{project.title}</Text>
                    {project.subtitle && <Text size="xs" c="dimmed">{project.subtitle}</Text>}
                  </Box>
                  {project.is_featured && (
                    <Badge color="yellow" variant="filled" size="xs">Featured</Badge>
                  )}
                </Group>

                <Group gap={5} mb="md">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="light" color="violet">{tag}</Badge>
                  ))}
                </Group>

                <Text 
                  size="sm" 
                  c="dimmed" 
                  mb="xl" 
                  style={{ flex: 1 }}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: project.description || '' }}
                />

                <Group gap="sm" mt="auto">
                  <Button 
                    variant="light" 
                    color="violet" 
                    fullWidth 
                    leftSection={<IconExternalLink size={16} />}
                    component={Link}
                    to={`/projects/${project.slug}`}
                  >
                    {t('projects.viewDetails')}
                  </Button>
                  <Button 
                    variant="subtle" 
                    color="gray" 
                    fullWidth 
                    leftSection={<IconCode size={16} />}
                    component="a"
                    href={project.github_link}
                    target="_blank"
                  >
                    {t('projects.sourceCode')}
                  </Button>
                </Group>
              </Card>
            </motion.div>
          );
        })}
      </SimpleGrid>
    </Section>
  );
};

export default Projects;
