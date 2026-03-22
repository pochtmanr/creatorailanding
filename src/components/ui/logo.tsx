type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className = "", size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 723 699"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M690.253 286.992C732.065 317.339 732.065 379.661 690.253 410.008L317.641 680.441C267.399 716.906 197 681.013 197 618.934V78.0662C197 15.9865 267.399 -19.9058 317.641 16.5586L690.253 286.992Z"
        fill="url(#logo-grad-orange)"
      />
      <path
        d="M493.253 286.992C535.065 317.339 535.065 379.661 493.253 410.008L120.641 680.441C70.3992 716.906 0 681.013 0 618.934V78.0662C0 15.9865 70.3991 -19.9058 120.641 16.5586L493.253 286.992Z"
        fill="url(#logo-grad-blue)"
      />
      <rect x="516" y="436" width="90" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <rect x="470" y="436" width="34" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <rect x="408" y="516" width="90" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <rect x="362" y="516" width="34" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <rect x="417" y="476" width="135" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <rect x="308" y="556" width="135" height="24" rx="12" fill="#F8F9F4" fillOpacity={0.69} />
      <defs>
        <linearGradient id="logo-grad-orange" x1="486" y1="-71" x2="486" y2="768" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E77C35" />
          <stop offset="1" stopColor="#E23F30" />
        </linearGradient>
        <linearGradient id="logo-grad-blue" x1="289" y1="-71" x2="289" y2="768" gradientUnits="userSpaceOnUse">
          <stop stopColor="#27B1DE" />
          <stop offset="1" stopColor="#2560BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoMono({ className = "", size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 723 699"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M690.253 286.992C732.065 317.339 732.065 379.661 690.253 410.008L317.641 680.441C267.399 716.906 197 681.013 197 618.934V78.0662C197 15.9865 267.399 -19.9058 317.641 16.5586L690.253 286.992Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M493.253 286.992C535.065 317.339 535.065 379.661 493.253 410.008L120.641 680.441C70.3992 716.906 0 681.013 0 618.934V78.0662C0 15.9865 70.3991 -19.9058 120.641 16.5586L493.253 286.992Z"
        fill="currentColor"
        opacity={0.7}
      />
      <rect x="516" y="436" width="90" height="24" rx="12" fill="currentColor" opacity={0.2} />
      <rect x="470" y="436" width="34" height="24" rx="12" fill="currentColor" opacity={0.2} />
      <rect x="408" y="516" width="90" height="24" rx="12" fill="currentColor" opacity={0.2} />
      <rect x="362" y="516" width="34" height="24" rx="12" fill="currentColor" opacity={0.2} />
      <rect x="417" y="476" width="135" height="24" rx="12" fill="currentColor" opacity={0.2} />
      <rect x="308" y="556" width="135" height="24" rx="12" fill="currentColor" opacity={0.2} />
    </svg>
  );
}
