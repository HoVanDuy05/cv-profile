import { Group, ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

interface SocialInfoProps {
  size?: ActionIconProps['size'];
  variant?: ActionIconProps['variant'];
  gap?: string | number;
  profile?: any;
}

const SocialInfo = ({ size = 'lg', variant = 'light', gap = 'md', profile }: SocialInfoProps) => {
  return (
    <Group gap={gap}>
      <ActionIcon 
        size={size} 
        radius="xl" 
        variant={variant} 
        color="blue" 
        component="a" 
        href={profile?.linkedin || '#'}
        target="_blank"
      >
        <IconBrandLinkedin size={20} />
      </ActionIcon>
      <ActionIcon 
        size={size} 
        radius="xl" 
        variant={variant} 
        color="dark" 
        component="a" 
        href={profile?.github || '#'}
        target="_blank"
      >
        <IconBrandGithub size={20} />
      </ActionIcon>
    </Group>
  );
};

export default SocialInfo;
