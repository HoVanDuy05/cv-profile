import React, { useState } from 'react';
import { Group, Text, UnstyledButton, Collapse, rem } from '@mantine/core';
import { IconFolder, IconFolderOpen, IconFile, IconChevronRight, IconChevronDown } from '@tabler/icons-react';

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface FolderTreeProps {
  nodes: TreeNode[];
  readOnly?: boolean;
}

const Node = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
  const [opened, setOpened] = useState(false);
  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <>
      <UnstyledButton
        onClick={() => node.type === 'folder' && setOpened(!opened)}
        style={{
          display: 'block',
          width: '100%',
          paddingLeft: `calc(${level} * ${rem(20)} + ${rem(8)})`,
          paddingRight: rem(8),
          paddingTop: rem(4),
          paddingBottom: rem(4),
          borderRadius: rem(4),
          '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-0)',
          },
        }}
      >
        <Group gap={8} wrap="nowrap">
          {node.type === 'folder' ? (
            hasChildren ? (
              opened ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />
            ) : <IconChevronRight size={14} style={{ opacity: 0 }} />
          ) : (
            <IconFile size={14} style={{ opacity: 0 }} />
          )}

          {node.type === 'folder' ? (
            opened ? <IconFolderOpen size={16} color="var(--mantine-color-yellow-6)" /> : <IconFolder size={16} color="var(--mantine-color-yellow-6)" />
          ) : (
            <IconFile size={16} color="var(--mantine-color-gray-6)" />
          )}
          
          <Text size="sm" component="span" style={{ whiteSpace: 'nowrap' }}>
            {node.name}
          </Text>
        </Group>
      </UnstyledButton>

      {hasChildren && (
        <Collapse in={opened}>
          {node.children!.map((child) => (
            <Node key={child.id} node={child} level={level + 1} />
          ))}
        </Collapse>
      )}
    </>
  );
};

export const FolderTree = ({ nodes }: FolderTreeProps) => {
  if (!nodes || nodes.length === 0) return <Text size="sm" c="dimmed" ta="center" py="xl">Cấu trúc thư mục trống</Text>;

  return (
    <div>
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};
