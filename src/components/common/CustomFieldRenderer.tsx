import React from 'react';
import { Box, Text, Anchor } from '@mantine/core';

interface CustomFieldRendererProps {
  field: any;
}

export const CustomFieldRenderer: React.FC<CustomFieldRendererProps> = ({ field }) => {
  if (!field || field.hidden || !field.is_active) return null;

  const renderValue = () => {
    switch (field.type) {
      case 'url':
        return (
          <Anchor href={field.value} target="_blank" size="sm" c="blue.7" style={{ wordBreak: 'break-all' }}>
            {field.value}
          </Anchor>
        );
      case 'date':
        return (
          <Text component="span" size="sm" c="dark.7">
            {new Date(field.value).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </Text>
        );
      case 'number':
        return (
          <Text component="span" size="sm" c="dark.7">
            {Number(field.value).toLocaleString('en-US')}
          </Text>
        );
      case 'textarea':
        return (
          <Text size="sm" c="dark.7" style={{ whiteSpace: 'pre-wrap', display: 'block', marginTop: 4 }}>
            {field.value}
          </Text>
        );
      default:
        if (field.display_as === 'textarea') {
          return (
            <Text size="sm" c="dark.7" style={{ whiteSpace: 'pre-wrap', display: 'block', marginTop: 4 }}>
              {field.value}
            </Text>
          );
        }
        return (
          <Text component="span" size="sm" c="dark.7">
            {field.value}
          </Text>
        );
    }
  };

  return (
    <Box mb="sm">
      <Text component="span" fw={700} c="dark.8" size="sm">{field.name}: </Text>
      {renderValue()}
    </Box>
  );
};
