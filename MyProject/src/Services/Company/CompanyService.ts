import { CompanyDetails } from "../../Interfaces/ComapnyInterface";
import { Company } from "../../Models/Comapany-details";
import { AppDataSource } from "../../data-source";

export const CompanyService = {
  AddCompanyDetails: async (companyDetails: CompanyDetails) => {
    if (companyDetails.userRole == "investor") {
      const addCompanyDetail = new Company();
      addCompanyDetail.companyName = companyDetails.companyName;
      addCompanyDetail.email = companyDetails.email;
      addCompanyDetail.city = companyDetails.city;
      addCompanyDetail.country = companyDetails.country;
      addCompanyDetail.investor = companyDetails.userId;
      await AppDataSource.manager.save(addCompanyDetail);

      return {
        statusCode: 201,
        data: {
          message: "Successfully created",
        },
      };
    } else {
      const addCompanyDetail = new Company();
      addCompanyDetail.companyName = companyDetails.companyName;
      addCompanyDetail.email = companyDetails.email;
      addCompanyDetail.city = companyDetails.city;
      addCompanyDetail.country = companyDetails.country;
      addCompanyDetail.innovator = companyDetails.userId;
      await AppDataSource.manager.save(addCompanyDetail);

      return {
        statusCode: 201,
        data: {
          message: "Successfully created",
        },
      };
    }
  },


  
};
