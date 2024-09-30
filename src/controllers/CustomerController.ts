import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

interface Customer {
  id?: string;
  name: string;
  email: string;
  document: string;
}

interface CustomerId {
  id: string;
}

interface ErrorResponse {
  error: any;
}

interface NotFoundResponse {
  msg: string;
}

class CustomerController {
  async update(req: Request, res: Response) {
    try {
      const customer: Customer = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
      };

      const customerUpdated = await prisma.customers.update({
        where: { id: customer.id },
        data: {
          name: customer.name,
          email: customer.email,
          document: customer.document,
        },
      });
      return res.status(200).json(customerUpdated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const customer: Customer = {
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
      };

      const newCustomer = await prisma.customers.create({
        data: {
          name: customer.name,
          email: customer.email,
          document: customer.document,
        },
      });
      return res.status(201).json(newCustomer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const customerId: CustomerId = { id: req.params.id };

      await prisma.customers.delete({
        where: { id: customerId.id },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const customerId: CustomerId = { id: req.params.id };
      const foundCustomer = await prisma.customers.findUnique({
        where: { id: customerId.id },
      });
      if (!foundCustomer) {
        return res.status(404).json({ msg: "Not found." } as NotFoundResponse);
      }
      return res.status(200).json(foundCustomer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }

  async verifyIfExist(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId: CustomerId = { id: req.params.id };
      const foundCustomer = await prisma.customers.findUnique({
        where: { id: customerId.id },
      });
      if (!foundCustomer) {
        return res.status(404).json({ msg: "Not found." } as NotFoundResponse);
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const customers = await prisma.customers.findMany();
      return res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error } as ErrorResponse);
    }
  }
}

export { CustomerController };
