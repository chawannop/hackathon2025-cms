import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 200, height = 50, className = '' }: LogoProps) {
  return (
    <div className={className}>
      <Image
        src="/images/logo.svg"
        alt="BizSense Logo"
        width={width}
        height={height}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
} 