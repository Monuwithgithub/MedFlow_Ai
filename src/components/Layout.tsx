import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useSidebar } from '../hooks/useSidebar';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isOpen, isMobile, toggle, close } = useSidebar();
  const { isDark, toggle: toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0d1117]">
      <Sidebar isOpen={isOpen} isMobile={isMobile} onClose={close} />
      <Navbar
        onMenuToggle={toggle}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        sidebarOpen={isOpen && !isMobile}
      />
      <main className={cn(
        'transition-all duration-300 pt-16 min-h-screen',
        isOpen && !isMobile ? 'ml-64' : isMobile ? 'ml-0' : 'ml-16'
      )}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
