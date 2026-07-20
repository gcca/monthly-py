import type { FC } from 'hono/jsx'
import type { Period, ReportKind } from '../types'

type SalesReportFormProps = {
    reportKind: ReportKind
    period: Period
    form: Record<string, string>
    errors: Record<string, string>
}

export const SalesReportForm: FC<SalesReportFormProps> = (props) => {
    const { reportKind, period } = props
    const { isDaily, reportsAmount, reportsTransactions, reportsModulesAmount, reportsModulesTransactions } = reportKind
    
    const days = new Date(period.year, period.month, 0).getDate()

    return (
        <form method="post">
            <table>
                {Array.from({ length: days }, (_, i) => (
                    <tr>
                        <th>Day {i + 1}</th>
                        {reportsAmount && (
                                <td>
                                    <input type="number" name={`amount-${i+1}`} value={props.form[`amount-${i+1}`] ?? ''} />
                                    {props.errors[`amount-${i+1}`] && <span>{props.errors[`amount-${i+1}`]}</span>}
                                </td>
                        )}
                        {reportsTransactions && (
                            <td>
                                <input type="number" name={`transactions-${i+1}`} value={props.form[`transactions-${i+1}`] ?? ''} />
                                {props.errors[`transactions-${i+1}`] && <span>{props.errors[`transactions-${i+1}`]}</span>}
                            </td>
                        )}
                        {reportsModulesAmount && (
                            <td>
                                <input type="number" name={`modulesAmount-${i+1}`} value={props.form[`modulesAmount-${i+1}`] ?? ''} />
                                {props.errors[`modulesAmount-${i+1}`] && <span>{props.errors[`modulesAmount-${i+1}`]}</span>}
                            </td>
                        )}
                        {reportsModulesTransactions && (
                            <td>
                                <input type="number" name={`modulesTransactions-${i+1}`} value={props.form[`modulesTransactions-${i+1}`] ?? ''} />
                                {props.errors[`modulesTransactions-${i+1}`] && <span>{props.errors[`modulesTransactions-${i+1}`]}</span>}
                            </td>
                        )}
                    </tr>
                ))}
            </table>
            <a href={`/year/${period.year}/month/${period.month}/tenant/list/`}><button type="button">Cancel</button></a>
            <button type="submit">Submit</button>
        </form>
    )
}