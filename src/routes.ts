import { Router } from "express";
import { CustomerController } from "./controllers/CustomerController";

const routes = Router();
const customerController = new CustomerController();

// Define routes for customer operations
routes.get("/customers", customerController.findAll);
routes.get("/customers/:id", customerController.findById);
routes.post("/customers", customerController.create);
routes.put("/customers/:id", customerController.verifyIfExist, customerController.update);
routes.delete("/customers/:id", customerController.verifyIfExist, customerController.delete);

export { routes };
