import { Address, Company, Person } from '../../api/company/models';

export class CompanyRequestModel implements Company {
  public companyId: string  | undefined;
  public companyName: string  | undefined | null;
  public companyAddress: Address  | undefined;
  public companyContact: Person  | undefined;
}