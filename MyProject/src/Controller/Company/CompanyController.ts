import { Request, Response } from "express";
import { CompanyDetails } from "../../Interfaces/ComapnyInterface";
import { CompanyService } from "../../Services/Company/CompanyService";

export const CompanyController =  {
  CompanyDetails: [
    async (req: Request, res: Response) => {
      try {
        const { email, companyName, city, country, userEmail } = req.body;
        const companyDetails: CompanyDetails = {
          email: email,
          companyName: companyName,
          city: city,
          country: country,
          userEmail: userEmail,
        };
        const result = await CompanyService.AddCompanyDetails(companyDetails);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ]
};
