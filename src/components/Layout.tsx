import type { FC, Child } from 'hono/jsx'

type LayoutProps = {
    title?: string
    children?: Child
}


const Title: FC = () => {
  return (
    <h1>Hello, World Test!</h1>
  )
}


export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Monthly Py</title>
      </head>
      <body>
        <Title></Title>
        {children}
      </body>
    </html>
  )
}