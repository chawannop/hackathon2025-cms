// import Image from 'next/image';

// interface LogoProps {
//   width?: number;
//   height?: number;
//   className?: string;
// }

// export function Logo({ width = 200, height = 50, className = '' }: LogoProps) {
//   return (
//     <div className={className}>
//       <Image
//         src="/images/logo.svg"
//         alt="BizSense Logo"
//         width={width}
//         height={height}
//         priority
//         style={{
//           maxWidth: '100%',
//           height: 'auto',
//         }}
//       />
//     </div>
//   );
// } 
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 200, height = 50, className = '' }: LogoProps) {
  return (
    <div style={{
      width:'100px'
    }}>
      <img
        src="/images/logo2.png"
        alt="BizSense Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
} 