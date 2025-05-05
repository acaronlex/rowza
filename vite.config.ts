import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // ajoute `"types"` dans "exports"
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Rowza',
      fileName: (format) => `rowza.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@tanstack/react-table',
        'lucide-react',
        '@radix-ui/react-slot',
        '@radix-ui/react-select',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-table': 'ReactTable',
          'lucide-react': 'LucideReact',
          '@radix-ui/react-slot': 'RadixSlot',
          '@radix-ui/react-select': 'RadixSelect',
          'class-variance-authority': 'ClassVarianceAuthority',
          'clsx': 'clsx',
          'tailwind-merge': 'TailwindMerge',
        },
      },
    },
  },
});
