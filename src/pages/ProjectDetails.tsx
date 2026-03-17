import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Grid,
  Box,
  Divider,
  LoadingOverlay,
  Breadcrumbs,
  Anchor,
  TypographyStylesProvider,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconExternalLink,
  IconBrandGithub,
  IconChevronLeft,
  IconCalendarEvent,
  IconCode
} from '@tabler/icons-react';
import { fetchProjectBySlug } from '@/services/api';
import { motion } from 'framer-motion';
import { CustomFieldRenderer } from '@/components/common/CustomFieldRenderer';
import { FolderTree } from '@/components/common/FolderTree';

const DEVICON_MAP: Record<string, string> = {
  // Frontend
  react: 'devicon-react-original',
  reactjs: 'devicon-react-original',
  vue: 'devicon-vuejs-plain',
  vuejs: 'devicon-vuejs-plain',
  angular: 'devicon-angularjs-plain',
  nextjs: 'devicon-nextjs-plain',
  nuxtjs: 'devicon-nuxtjs-plain',
  svelte: 'devicon-svelte-plain',
  typescript: 'devicon-typescript-plain',
  ts: 'devicon-typescript-plain',
  javascript: 'devicon-javascript-plain',
  js: 'devicon-javascript-plain',
  html: 'devicon-html5-plain',
  html5: 'devicon-html5-plain',
  css: 'devicon-css3-plain',
  css3: 'devicon-css3-plain',
  tailwind: 'devicon-tailwindcss-plain',
  tailwindcss: 'devicon-tailwindcss-plain',
  bootstrap: 'devicon-bootstrap-plain',
  sass: 'devicon-sass-original',
  redux: 'devicon-redux-original',
  
  // Backend
  node: 'devicon-nodejs-plain',
  nodejs: 'devicon-nodejs-plain',
  express: 'devicon-express-original',
  nestjs: 'devicon-nestjs-plain',
  php: 'devicon-php-plain',
  laravel: 'devicon-laravel-plain',
  python: 'devicon-python-plain',
  django: 'devicon-django-plain',
  flask: 'devicon-flask-original',
  go: 'devicon-go-original-wordmark',
  java: 'devicon-java-plain',
  springboot: 'devicon-spring-plain',
  rubyonrails: 'devicon-rails-plain',
  'c#': 'devicon-csharp-plain',
  csharp: 'devicon-csharp-plain',
  dotnet: 'devicon-dotnetcore-plain',

  // Database
  postgresql: 'devicon-postgresql-plain',
  postgres: 'devicon-postgresql-plain',
  mysql: 'devicon-mysql-plain',
  mongodb: 'devicon-mongodb-plain',
  mongo: 'devicon-mongodb-plain',
  redis: 'devicon-redis-plain',
  sqlite: 'devicon-sqlite-plain',
  firebase: 'devicon-firebase-plain',
  supabase: 'devicon-supabase-plain',

  // Mobile
  reactnative: 'devicon-react-original',
  flutter: 'devicon-flutter-plain',
  swift: 'devicon-swift-plain',
  kotlin: 'devicon-kotlin-plain',
  ionic: 'devicon-ionic-original',

  // DevOps & Tools
  docker: 'devicon-docker-plain',
  kubernetes: 'devicon-kubernetes-plain',
  aws: 'devicon-amazonwebservices-original',
  googlecloud: 'devicon-googlecloud-plain',
  azure: 'devicon-azure-plain',
  vercel: 'devicon-vercel-original',
  git: 'devicon-git-plain',
  github: 'devicon-github-original',
  githubactions: 'devicon-github-original',
  gitlab: 'devicon-gitlab-plain',
  nginx: 'devicon-nginx-original',
  figma: 'devicon-figma-plain',

  // Other
  graphql: 'devicon-graphql-plain',
  unity: 'devicon-unity-original'
};

function normalizeIconName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
}

function getDeviconClass(techName: string) {
  const key = normalizeIconName(techName);
  return DEVICON_MAP[key] || null;
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchProjectBySlug(slug)
        .then(data => {
          setProject(data);
          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch(err => {
          console.error('Error fetching project:', err);
          notifications.show({ title: 'Lỗi', message: 'Không tìm thấy dự án', color: 'red' });
          navigate('/');
        });
    }
  }, [slug]);

  if (loading || !project) {
    return (
      <Box h="100vh" pos="relative" bg="white">
        <LoadingOverlay visible={true} loaderProps={{ color: 'dark', type: 'bars' }} />
      </Box>
    );
  }

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/#projects' },
    { title: project.title, href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index} size="xs" c="dimmed" fw={500}>
      {item.title}
    </Anchor>
  ));

  const hasContent = project.content && project.content.trim() !== '<p></p>';
  const displayContent = hasContent ? project.content : project.description;

  // Render text-based custom fields for a clean CV look
  const customFieldsRender = project.custom_fields
    ? [...project.custom_fields]
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((field: any, index: number) => (
        <CustomFieldRenderer key={field.id || index} field={field} />
      ))
    : null;

  return (
    <Box pb={60} bg="#fdfdfd" mih="100vh" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Container size="md" pt={40}>

        {/* Navigation */}
        <Group mb="xl" justify="space-between">
          <Group gap="xs">
            <ActionIcon variant="subtle" color="dark" component={Link} to="/#projects" size="sm">
              <IconChevronLeft size={16} />
            </ActionIcon>
            <Breadcrumbs separator="›">{items}</Breadcrumbs>
          </Group>
        </Group>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header Section */}
          <Box mb={40}>
            <Group justify="space-between" align="flex-start" mb="xs">
              <Title
                order={1}
                fz={28}
                fw={800}
                c="dark.9"
                style={{ lineHeight: 1.2, letterSpacing: '-0.5px' }}
              >
                Project: {project.title} {project.subtitle && `– ${project.subtitle}`}
              </Title>
            </Group>

            <Text c="dark.6" size="sm" mb="lg">
              {project.is_featured ? 'Featured Project' : 'Individual'}
            </Text>

            <Box mb="md">
              <Text component="span" fw={700} c="dark.8" size="sm">Technologies: </Text>
              <Group gap="xs" style={{ display: 'inline-flex' }}>
                {project.tags && project.tags.map((tag: string) => {
                  const deviconClass = getDeviconClass(tag);
                  
                  return (
                    <Badge 
                      key={tag} 
                      size="md" 
                      variant="light" 
                      color="dark.6" 
                      style={{ textTransform: 'none' }}
                      leftSection={
                         deviconClass ? (
                           <i className={deviconClass} style={{ fontSize: '13px', marginRight: '4px', verticalAlign: 'middle' }} />
                         ) : (
                           <IconCode size={13} style={{ marginRight: '4px' }} />
                         )
                      }
                    >
                      {tag}
                    </Badge>
                  )
                })}
              </Group>
            </Box>

            {/* Links */}
            <Group gap="md" mb="xl">
              {(project.demo_link || project.live_link) && (
                <Button
                  component="a"
                  href={project.live_link || project.demo_link}
                  target="_blank"
                  variant="outline"
                  color="dark"
                  radius="xl"
                  size="xs"
                  leftSection={<IconExternalLink size={14} />}
                >
                  View Project
                </Button>
              )}
              {project.github_link && (
                <Button
                  component="a"
                  href={project.github_link}
                  target="_blank"
                  variant="subtle"
                  color="dark"
                  radius="xl"
                  size="xs"
                  leftSection={<IconBrandGithub size={14} />}
                >
                  Source Code
                </Button>
              )}
            </Group>
          </Box>

          <Divider mb={30} color="gray.3" />

          {/* Main Content Area */}
          <Grid gutter={40}>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                <Box>
                  <Title order={3} fz={18} fw={700} c="dark.9" mb="md">Project Description:</Title>
                  <TypographyStylesProvider>
                    <Box
                      className="cv-rich-text"
                      dangerouslySetInnerHTML={{ __html: displayContent || '' }}
                      style={{
                        lineHeight: 1.7,
                        fontSize: '15px',
                        color: 'var(--mantine-color-dark-8)',
                      }}
                    />
                  </TypographyStylesProvider>
                </Box>

                {project.folder_structure && project.folder_structure.length > 0 && (
                  <Box mt="xl">
                    <Title order={3} fz={18} fw={700} c="dark.9" mb="md">Technical Structure:</Title>
                    <Box p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px', background: 'var(--mantine-color-gray-0)' }}>
                      <FolderTree nodes={project.folder_structure} readOnly={true} />
                    </Box>
                  </Box>
                )}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="xl">
                {/* Custom Fields (Rendered as clean list) */}
                {customFieldsRender && customFieldsRender.length > 0 && (
                  <Box>
                    <Title order={4} fz={16} fw={700} c="dark.9" mb="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)', paddingBottom: '8px' }}>
                      Additional Details
                    </Title>
                    {customFieldsRender}
                  </Box>
                )}

                {/* Fallback info if nothing else is present */}
                {(!customFieldsRender || customFieldsRender.length === 0) && (
                  <Text size="sm" c="dimmed" fs="italic">No additional details provided.</Text>
                )}
              </Stack>
            </Grid.Col>
          </Grid>
        </motion.div>
      </Container>

      {/* CSS Override for CV style typography inside the rich text */}
      <style>{`
        .cv-rich-text ul {
          padding-left: 20px;
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .cv-rich-text li {
          margin-bottom: 8px;
          color: var(--mantine-color-dark-7);
        }
        .cv-rich-text p {
          margin-bottom: 12px;
        }
        .cv-rich-text pre {
          background-color: var(--mantine-color-gray-1);
          border: 1px solid var(--mantine-color-gray-3);
          border-radius: 4px;
          padding: 12px;
          font-size: 13px;
        }
      `}</style>
    </Box>
  );
}
