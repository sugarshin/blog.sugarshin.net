import clsx from 'clsx';
import ThemeSwitcher from './ThemeSwitcher';

export default function SideMenuThemeSwitch({
  className,
}: { className?: string }) {
  return (
    <div className={clsx('ml-auto', className)}>
      <ThemeSwitcher />
    </div>
  );
}
