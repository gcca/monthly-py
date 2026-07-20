export type Tenant = {
    id: number
    tenantName: string
    documentNumber: string
    brandName: string
    locationName: string
}

export type Period = {
    month: number
    year: number
}

export type ReportKind = {
    id?: number
    name: string
    displayName: string
    isDaily: boolean
    reportsAmount: boolean
    reportsTransactions: boolean
    reportsModulesAmount: boolean
    reportsModulesTransactions: boolean
}

export type Sale = {
    id?: number
    tenantId: number
    period: Period
    amount?: number
    transactions?: number
    modulesAmount?: number
    modulesTransactions?: number
}

export type SaleDTO = {
    amount: number
    transactions?: number
    modulesAmount?: number
    modulesTransactions?: number
}

export const createPeriod = (month: number, year: number): Period => {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new Error("Invalid month. Month must be an integer between 1 and 12.")
    }
    if (!Number.isInteger(year) || year < 1990 || year > 2100) {
        throw new Error("Invalid year. Year must be a non-negative integer.")
    }
    return { month, year }
}