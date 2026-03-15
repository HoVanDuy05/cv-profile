import { Container, Title, Box, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  bg?: string;
}

const Section = ({ id, title, subtitle, children, bg }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      py={{ base: 40, md: 80 }}
      bg={bg}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box mb={60} ta="center" pos="relative">
            <Text
              size="xs"
              fw={800}
              tt="uppercase"
              c="violet.6"
              style={{ letterSpacing: '0.2em', opacity: 0.8 }}
              mb={8}
            >
              {id}
            </Text>
            <Title
              order={2}
              size="clamp(1.75rem, 5vw, 2.25rem)"
              fw={900}
              mb="md"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </Title>
            {subtitle && (
              <Text
                size="sm"
                c="dimmed"
                fw={500}
                style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}
              >
                {subtitle}
              </Text>
            )}
            <Box
              w={40}
              h={3}
              bg="violet.6"
              mx="auto"
              mt="xl"
              style={{ borderRadius: '2px', opacity: 0.6 }}
            />
          </Box>
        </motion.div>
        {children}
      </Container>
    </Box>
  );
};

export default Section;
