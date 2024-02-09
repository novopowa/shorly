import { type Database } from './database'

type LinkEntity = Database['public']['Tables']['links']['Row']
type usersEntity = Database['public']['Tables']['users']['Row']
type statisticsEntity = Database['public']['Tables']['statistics']['Row']

export type LINK = LinkEntity
export type USER = usersEntity
export type STATISTIC = statisticsEntity
