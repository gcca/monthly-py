import { Hono, Context } from 'hono'

import { Layout } from '../components/Layout'

export function initialize_handlers(app: Hono) : void {
  app.get('/monthly-py/auth/signin', signin_get);
}

async function signin_get(c: Context): string {
  return c.html(
    <Layout>
      SignIn
    </Layout>
  );
}
