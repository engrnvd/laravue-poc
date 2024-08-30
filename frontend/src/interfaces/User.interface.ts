export interface User {
  id: number,
  name: string,
  email: string,
  avatar: string,
  company: string,
  is_admin: boolean,
  created_at: string,
  updated_at: string,
  email_verified_at: string,
  plan_status: string,
  next_bill_date: string,
  pivot: {
    role: 'Editor' | 'Commenter' | 'Viewer',
  },
  plan: Plan,
  is_member?: boolean,
  role?: 'Editor' | 'Commenter' | 'Viewer',
}
