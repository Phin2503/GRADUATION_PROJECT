type Role = 'USER' | 'ADMIN'
export interface User {
  id: string
  fullName: string
  username: string
  phoneNumber: string
  email: string
  dateOfBirth: Date
  role: Role
}
