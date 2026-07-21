import type { FC, Child } from 'hono/jsx'

type LayoutProps = {
  title?: string
  lang?: string
  theme?: string
  children?: Child
}

export const Layout: FC<LayoutProps> = ({ title = 'Monthly Py', lang = 'es', theme = 'light', children }) => {
  return (
    <html lang={lang} data-theme={theme}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
      </head>
      <body class="min-h-screen bg-base-200 p-6">
        {children}
      </body>
    </html>
  )
}
