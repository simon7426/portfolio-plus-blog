import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { readFileSync } from 'fs';
import { join } from 'path';

const fontPath = join(process.cwd(), 'public/fonts/inter-regular.ttf');

let fontBuffer: Buffer | null = null;
let wasmInitialized = false;

async function ensureWasm() {
  if (!wasmInitialized) {
    const wasmPath = join(process.cwd(), 'node_modules/@resvg/resvg-wasm/index_bg.wasm');
    const wasmBuffer = readFileSync(wasmPath);
    await initWasm(wasmBuffer);
    wasmInitialized = true;
  }
}

function getFont(): Buffer {
  if (!fontBuffer) {
    fontBuffer = readFileSync(fontPath);
  }
  return fontBuffer;
}

export async function generateOgImage(title: string): Promise<Buffer> {
  await ensureWasm();
  const font = getFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 1200,
          height: 630,
          padding: '60px 80px',
          backgroundColor: '#111111',
          color: '#e8e8e8',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#777777',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    },
                    children: 'simonislam.com',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      maxWidth: '900px',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '18px',
                color: '#777777',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '40px',
                      height: '2px',
                      backgroundColor: '#444444',
                    },
                  },
                },
                {
                  type: 'span',
                  props: {
                    children: 'Solutions architect & cloud engineer',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const resvgInstance = new Resvg(svg, {
    fitTo: { mode: 'original' },
  });

  const pngData = resvgInstance.render();
  return Buffer.from(pngData.asPng());
}
