import { Hono } from 'hono'
import { Layout } from './components/Layout'
import { db } from './db'
import { TenantService } from './services/tenant.service'
import { TenantRow } from './components/TenantRow';
import { SalesReportForm } from './components/SalesReportForm';
import { createPeriod, Period, ReportKind, Sale, SaleDTO } from './types'

const app = new Hono()


app.get('/', (c) => {
  return c.redirect('/year/2025/month/08/tenant/list/');
});


app.get('/healthcheck/', (c) => {
  return c.json({ status: 'ok', message: 'cheers 🍻' })
})


app.get('/year/:year/month/:month/tenant/list/', async (c) => {
  const { year, month } = c.req.param()
  const period = createPeriod(Number(month), Number(year))
  const tenants = TenantService.listTenants()
  return c.html(
    <html lang="es" data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Monthly Py</title>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
      </head>
      <body class="min-h-screen bg-base-200 p-6">
        <div class="mx-auto max-w-7xl">
          <div class="mb-6">
            <h1 class="text-3xl font-bold">Locales — {period.month}/{period.year}</h1>
            <p class="mt-1 opacity-60">Selecciona un local para registrar su reporte de ventas</p>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body gap-4">
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Razón Social</th>
                      <th>RUC</th>
                      <th>Nombre Comercial</th>
                      <th>Ubicación</th>
                      <th class="text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((tenant) => (
                      <TenantRow tenant={tenant} url={`/year/${period.year}/month/${period.month}/tenant/${tenant.id}/sales-report/create/`}></TenantRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
})


app.get('/year/:year/month/:month/tenant/:tenantId/sales-report/create/', async (c) => {
  const { tenantId, year, month } = c.req.param()
  const period = createPeriod(Number(month), Number(year))
  const tenant = TenantService.getTenantById(Number(tenantId))
  const reportKind = TenantService.getTenantReportKind(Number(tenantId))

  const formProps = {
    reportKind: reportKind,
    period: period,
    form: {},
    errors: {},
  }

  return c.html(<SalesReportForm {...formProps}></SalesReportForm>)
})


const validateAndParseDailyReportForm = (period: Period, reportKind: ReportKind, formData: FormData): { data: Map<Date, SaleDTO>, errors: Record<string, string> } => {
  const totalForms = new Date(period.year, period.month, 0).getDate()
  const data: Map<Date, SaleDTO> = new Map()
  const errors: Record<string, string> = {}

  for (let i = 1; i <= totalForms; i++) {
    const sale: SaleDTO = {
      amount: 0
    }
    const date = new Date(period.year, period.month - 1, i)

    if (reportKind.reportsAmount) {
      const formAmount = formData.get(`amount-${i}`)
      if (formAmount === null || formAmount === '') {
        errors[`amount-${i}`] = 'Amount is required'
      }

      const amount = Number(formAmount)
      if (isNaN(amount)) {
        errors[`amount-${i}`] = 'Invalid amount'
      } else {
        sale.amount = amount
      }
    }

    if (reportKind.reportsTransactions) {
      const formTransactions = formData.get(`transactions-${i}`)
      if (formTransactions === null || formTransactions === '') {
        errors[`transactions-${i}`] = 'Transactions is required'
      }
      const transactions = Number(formTransactions)
      if (isNaN(transactions)) {
        errors[`transactions-${i}`] = 'Invalid transactions'
      } else {
        sale.transactions = transactions
      }
    }

    if (reportKind.reportsModulesAmount) {
      const formModulesAmount = formData.get(`modulesAmount-${i}`)
      if (formModulesAmount === null || formModulesAmount === '') {
        errors[`modulesAmount-${i}`] = 'Modules amount is required'
      }
      const modulesAmount = Number(formModulesAmount)
      if (isNaN(modulesAmount)) {
        errors[`modulesAmount-${i}`] = 'Invalid modules amount'
      } else {
        sale.modulesAmount = modulesAmount
      }
    }

    if (reportKind.reportsModulesTransactions) {
      const formModulesTransactions = formData.get(`modulesTransactions-${i}`)
      if (formModulesTransactions === null || formModulesTransactions === '') {
        errors[`modulesTransactions-${i}`] = 'Modules transactions is required'
      }
      const modulesTransactions = Number(formModulesTransactions)
      if (isNaN(modulesTransactions)) {
        errors[`modulesTransactions-${i}`] = 'Invalid modules transactions'
      } else {
        sale.modulesTransactions = modulesTransactions
      }
    }

    data.set(date, sale)
  }
  return { data, errors }
}

app.post('/year/:year/month/:month/tenant/:tenantId/sales-report/create/', async (c) => {
  const { tenantId, year, month } = c.req.param()
  const period = createPeriod(Number(month), Number(year))
  const reportKind = TenantService.getTenantReportKind(Number(tenantId))
  const formData = await c.req.formData()


  const { data, errors } = validateAndParseDailyReportForm(period, reportKind, formData)

  if (Object.keys(errors).length > 0) {
    const formProps = {
      reportKind: reportKind,
      period: period,
      form: Object.fromEntries(formData.entries()),
      errors: errors,
    }
    return c.html(<SalesReportForm {...formProps}></SalesReportForm>)
  }

  console.log('Validated data:', data)

  return c.json({ status: 'ok', message: 'cheers 🍻' })
})

export default app
