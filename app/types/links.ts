import { type Database } from './database'

type LinkEntity = Database['public']['Tables']['links']['Row']
type usersEntity = Database['public']['Tables']['users']['Row']
type statisticsEntity = Database['public']['Tables']['statistics']['Row']

export interface LINK extends LinkEntity {
	statistics?: statisticsEntity[]
}
export type USER = usersEntity
