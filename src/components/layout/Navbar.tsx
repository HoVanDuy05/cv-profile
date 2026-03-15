import { useState, useEffect } from 'react';
import { Anchor, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { UI_CONSTANTS } from '@/constants';

const NavbarLinks = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useTranslation();
  const [activeHash, setActiveHash] = useState(window.location.hash || '#hero');

  useEffect(() => {
    const sections = UI_CONSTANTS.NAV_LINKS.map(link => link.link.replace('#', ''));
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjusted to trigger when section is in upper-mid screen
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const newHash = `#${id}`;
          setActiveHash(newHash);
          
          // Update URL hash without triggering scroll or page jump
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#hero');
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {UI_CONSTANTS.NAV_LINKS.map((link) => {
        const isActive = activeHash === link.link || (activeHash === '' && link.link === '#hero');
        
        return (
          <Box key={link.labelKey} style={{ position: 'relative' }}>
            <Anchor
              href={link.link}
              size="md"
              fw={isActive ? 700 : 500}
              c={isActive ? 'violet.6' : 'dimmed'}
              onClick={() => {
                setActiveHash(link.link);
                onClick?.();
              }}
              className={`nav-link ${isActive ? 'active' : ''}`}
              style={{ 
                letterSpacing: '0.8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {t(link.labelKey)}
            </Anchor>
          </Box>
        );
      })}
    </>
  );
};

export default NavbarLinks;
