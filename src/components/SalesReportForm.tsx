import type { FC } from 'hono/jsx'
import type { Period, ReportKind, Tenant } from '../types'

type SalesReportFormProps = {
    tenant: Tenant
    reportKind: ReportKind
    period: Period
    form: Record<string, string>
    errors: Record<string, string>
}

export const SalesReportForm: FC<SalesReportFormProps> = (props) => {
    const { tenant, reportKind, period } = props
    const { reportsAmount, reportsTransactions, reportsModulesAmount, reportsModulesTransactions } = reportKind

    const days = new Date(period.year, period.month, 0).getDate()

    const inputClass = (field: string) =>
        `input input-sm w-28${props.errors[field] ? ' input-error' : ''}`

    return (
        <div class="mx-auto max-w-7xl">
            <div class="mb-6">
                <h1 class="text-3xl font-bold">Reporte de Ventas — {period.month}/{period.year}</h1>
                <p class="mt-1 opacity-60">{tenant.tenantName} · {reportKind.displayName}</p>
            </div>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body gap-4">
                    <form method="post">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Día</th>
                                        {reportsAmount && <th>Monto</th>}
                                        {reportsTransactions && <th>Transacciones</th>}
                                        {reportsModulesAmount && <th>Monto Módulos</th>}
                                        {reportsModulesTransactions && <th>Transacciones Módulos</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: days }, (_, i) => (
                                        <tr class="hover">
                                            <th>{i + 1}</th>
                                            {reportsAmount && (
                                                <td>
                                                    <input type="number" name={`amount-${i + 1}`} value={props.form[`amount-${i + 1}`] ?? ''} class={inputClass(`amount-${i + 1}`)} />
                                                    {props.errors[`amount-${i + 1}`] && <p class="mt-1 text-xs text-error">{props.errors[`amount-${i + 1}`]}</p>}
                                                </td>
                                            )}
                                            {reportsTransactions && (
                                                <td>
                                                    <input type="number" name={`transactions-${i + 1}`} value={props.form[`transactions-${i + 1}`] ?? ''} class={inputClass(`transactions-${i + 1}`)} />
                                                    {props.errors[`transactions-${i + 1}`] && <p class="mt-1 text-xs text-error">{props.errors[`transactions-${i + 1}`]}</p>}
                                                </td>
                                            )}
                                            {reportsModulesAmount && (
                                                <td>
                                                    <input type="number" name={`modulesAmount-${i + 1}`} value={props.form[`modulesAmount-${i + 1}`] ?? ''} class={inputClass(`modulesAmount-${i + 1}`)} />
                                                    {props.errors[`modulesAmount-${i + 1}`] && <p class="mt-1 text-xs text-error">{props.errors[`modulesAmount-${i + 1}`]}</p>}
                                                </td>
                                            )}
                                            {reportsModulesTransactions && (
                                                <td>
                                                    <input type="number" name={`modulesTransactions-${i + 1}`} value={props.form[`modulesTransactions-${i + 1}`] ?? ''} class={inputClass(`modulesTransactions-${i + 1}`)} />
                                                    {props.errors[`modulesTransactions-${i + 1}`] && <p class="mt-1 text-xs text-error">{props.errors[`modulesTransactions-${i + 1}`]}</p>}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-4 flex justify-end gap-2">
                            <a href={`/year/${period.year}/month/${period.month}/tenant/list/`} class="btn btn-ghost">Cancelar</a>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}