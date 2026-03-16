import { Group, ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import { APP_CONFIG } from '@/constants';

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
        href={profile?.linkedin || APP_CONFIG.SOCIAL.LINKEDIN}
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
        href={profile?.github || APP_CONFIG.SOCIAL.GITHUB}
        target="_blank"
      >
        <IconBrandGithub size={20} />
      </ActionIcon>
    </Group>
  );
};

export default SocialInfo;
