import { Request, Response, Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  const message = {
    message: "API DoWhile 21, by Alexander",
    supportedRoutes: `/authenticate, /profile, /messages, /messages/last3`
  }
  return response.json(message)
})

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new Get3LastMessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
