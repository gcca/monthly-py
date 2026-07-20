import type { FC } from 'hono/jsx'
import { Tenant } from '../types';

type TenantRowProps = {
  tenant: Tenant,
  url: string
}

export const TenantRow: FC<TenantRowProps> = ({ tenant, url }) => {
  return (
    <tr>
      <td>{tenant.tenantName}</td>
      <td>{tenant.documentNumber}</td>
      <td>{tenant.brandName}</td>
      <td>{tenant.locationName}</td>
      <td><a href={url}>go</a></td>
    </tr>
  )
}