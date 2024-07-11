import { CompanyDetails, CompanyEdit } from "../../Interfaces/ComapnyInterface";
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

  editCompanyDetails: async (
    companyDetails: CompanyEdit
  ) => {
    try {
       const companyRepository = AppDataSource.getRepository(Company);
      const companyToUpdate = await companyRepository.findOneBy({
         id: companyDetails.id,
      });

      if (!companyToUpdate) {
        return {
          statusCode: 404,
          data: {
            message: "Company not found",
          },
        };
      }

      companyToUpdate.companyName = companyDetails.companyName;
      companyToUpdate.email = companyDetails.email;
      companyToUpdate.city = companyDetails.city;
      companyToUpdate.country = companyDetails.country;

      if (companyDetails.userRole === "investor") {
        companyToUpdate.investor = companyDetails.userId;
      } else {
        companyToUpdate.innovator = companyDetails.userId;
      }

      await AppDataSource.manager.save(companyToUpdate);

      return {
        statusCode: 200,
        data: {
          message: "Successfully updated",
          company: companyToUpdate, 
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: "Internal server error",
          error: error.message,
        },
      };
    }
  },
};
