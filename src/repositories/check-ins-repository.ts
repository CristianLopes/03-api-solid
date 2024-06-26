import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
