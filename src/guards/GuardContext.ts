import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { MongoAbility } from "@casl/ability";
import { Action, Subject } from "./ability";

type ContextAbility = MongoAbility<[Action, Subject]>

export const GuardContext = createContext<ContextAbility>({} as ContextAbility)
export const Can = createContextualCan(GuardContext.Consumer)