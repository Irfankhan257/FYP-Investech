# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

import { Request, Response } from "express";
import { Company } from "../../Entities/Company"; // Adjust the path as necessary
import { getRepository } from "typeorm";

export const CompanyController = {
createCompany: async (req: Request, res: Response) => {
try {
// Extract fields from the request body
const { companyName, email, city, country, innovatorId, investorId } = req.body;

      const companyRepository = getRepository(Company);

      // Create a new company instance
      const company = new Company();
      company.companyName = companyName;
      company.email = email;
      company.city = city;
      company.country = country;

      // Only associate an innovator or investor if their respective ID is provided
      if (innovatorId) {
        // Here you would fetch the Innovator entity by its ID and set it
        // e.g., company.innovator = await innovatorRepository.findOne(innovatorId);
      }

      if (investorId) {
        // Similarly, fetch the Investor entity by its ID and set it
        // e.g., company.investor = await investorRepository.findOne(investorId);
      }

      // Save the company
      const newCompany = await companyRepository.save(company);

      return res.status(201).json(newCompany);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }

},
// ... other controller methods ...
};
