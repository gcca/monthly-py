import { db } from '../db'
import { ReportKind, Tenant } from '../types'


type ReportKindRow = {
    id: number
    name: string
    displayName: string
    isDaily: number
    reportsAmount: number
    reportsTransactions: number
    reportsModulesAmount: number
    reportsModulesTransactions: number
}


const mapReportKind = (row: ReportKindRow): ReportKind => {
    return {
        id: row.id,
        name: row.name,
        displayName: row.displayName,
        isDaily: !!row.isDaily,
        reportsAmount: !!row.reportsAmount,
        reportsTransactions: !!row.reportsTransactions,
        reportsModulesAmount: !!row.reportsModulesAmount,
        reportsModulesTransactions: !!row.reportsModulesTransactions,
    }
}

export const TenantRepository = {
    list: (): Tenant[] => {
        const query = `
        select
            id,
            tenant_name as tenantName,
            document_number as documentNumber,
            brand_name as brandName,
            location_name as locationName
        from tenant limit 50`
        return db.query(query).all() as Tenant[]
    },
    get: (tenantId: number): Tenant | null => {
        const query = `
        select
            id,
            tenant_name as tenantName,
            document_number as documentNumber,
            brand_name as brandName,
            location_name as locationName
        from tenant where id = $tenantId
        limit 1`
        return db.query(query).get({ $tenantId: tenantId}) as Tenant | null
    },
    getTenantReportKind: (tenantId: number): ReportKind => {
        const query = `
        select
            id,
            name,
            display_name as displayName,
            is_daily as isDaily,
            reports_amount as reportsAmount,
            reports_transactions as reportsTransactions,
            reports_modules_amount as reportsModulesAmount,
            reports_modules_transactions as reportsModulesTransactions
        from report_kind
        where id = (select report_kind from tenant where id = $tenantId limit 1)
        limit 1`
        const row = db.query(query).get({ $tenantId: tenantId }) as ReportKindRow
        return mapReportKind(row)
    }
}
