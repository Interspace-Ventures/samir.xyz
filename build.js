import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import postcss from 'esbuild-postcss';

const isDev = process.env.NODE_ENV !== 'production';

async function build() {
  try {
    // Build the client-side application
    await esbuild.build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      outdir: 'dist',
      minify: !isDev,
      sourcemap: isDev,
      format: 'esm',
      target: ['es2020'],
      loader: {
        '.png': 'file',
        '.svg': 'file',
        '.jpg': 'file',
        '.gif': 'file'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      plugins: [
        postcss(),
        copy({
          assets: [
            {
              from: ['client/index.html'],
              to: ['./'],
            },
            {
              from: ['client/public/**/*'],
              to: ['./'],
            }
          ]
        })
      ]
    });

    console.log('⚡ Build complete! ⚡');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();