import { useState, useEffect } from 'react';
import { Text, Box } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';

interface LogoProps {
  fontSize?: string | number | object;
}

const Logo = ({ fontSize = 'clamp(1.2rem, 4vw, 1.8rem)' }: LogoProps) => {
  const [key, setKey] = useState(0);
  const fullText = "VanDuy Dev";

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { display: 'none', opacity: 0 },
    visible: {
      display: 'inline',
      opacity: 1,
      transition: { duration: 0.01 }
    },
  };

  const cursorVariants: Variants = {
    blinking: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <Box style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      fontStyle: 'italic',
      display: 'flex',
      alignItems: 'center',
    }}>
      <motion.div
        key={key}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', alignItems: 'baseline' }}
      >
        <Text
          size={fontSize as any}
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 45 }}
          inherit
          style={{ display: 'flex' }}
        >
          {fullText.split('').map((char, index) => (
            <motion.span
              key={`${key}-${index}`}
              variants={letterVariants}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </Text>

        <motion.span
          variants={cursorVariants}
          animate="blinking"
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1.2em',
            backgroundColor: 'var(--mantine-color-violet-5)',
            marginLeft: '4px',
            alignSelf: 'center'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default Logo;
