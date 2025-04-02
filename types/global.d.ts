// Add TypeScript declarations for the VANTA global
interface Window {
  VANTA: {
    HALO: (options: any) => any;
    [key: string]: any;
  };
}
