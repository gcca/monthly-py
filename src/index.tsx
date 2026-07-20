import { Hono } from 'hono'
import { Layout } from './components/Layout'
import { db } from './db'
import { TenantService } from './services/tenant.service'
import { TenantRow } from './components/TenantRow';
import { SalesReportForm } from './components/SalesReportForm';
import { createPeriod, Period, ReportKind, Sale, SaleDTO } from './types'

const app = new Hono()

app.get('/healthcheck/', (c) => {
  return c.json({ status: 'ok', message: 'cheers 🍻' })
})

app.get('/year/:year/month/:month/tenant/list/', async (c) => {
  const { year, month } = c.req.param()
  const period = createPeriod(Number(month), Number(year))
  const tenants = TenantService.listTenants()
  console.log(tenants)
  return c.html(
    <table>
      <thead>
      <th>Razon Social</th>
      <th>RUC</th>
      <th>Nombre Comercial</th>
      <th>Ubicación</th>
      <th>Acciones</th>
      </thead>
      <tbody>
        {tenants.map((tenant) => (
          <TenantRow tenant={tenant} url={`/year/${period.year}/month/${period.month}/tenant/${tenant.id}/sales-report/create/`} ></TenantRow>
        ))}
      </tbody>
    </table>
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