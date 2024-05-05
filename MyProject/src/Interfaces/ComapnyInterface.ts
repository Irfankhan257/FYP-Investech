export interface CompanyDetails {
  companyName: string;
  email: string;
  city: string;
  country: string;
  userId: number;
  userRole: string;
}

export interface CompanyEdit {
  id: number;
  companyName: string;
  email: string;
  city: string;
  country: string;
  userId: number;
  userRole: string;
}
