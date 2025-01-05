import * as esbuild from 'esbuild';

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      outdir: 'dist/public',
      minify: false,
      sourcemap: true,
      format: 'esm',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
      },
      define: {
        'process.env.NODE_ENV': '"development"'
      }
    });

    console.log('⚡ Build complete! ⚡');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();