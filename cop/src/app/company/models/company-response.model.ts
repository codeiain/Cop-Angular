import { Company, Address, Person } from '../../api/company/models';

export class CompanyResponseModel implements Company  {
  public companyId: string | undefined;
  public companyName: string | undefined | null;
  public companyAddress: Address | undefined;
  public companyContact: Person | undefined;


}