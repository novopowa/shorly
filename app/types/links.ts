import { type Database } from './database'

type LinkEntity = Database['public']['Tables']['links']['Row']
type usersEntity = Database['public']['Tables']['users']['Row']

export type LINK = LinkEntity
export type USER = usersEntity
