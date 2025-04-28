import { useState } from "react";
import { buildAbility } from "./guards/ability";
import { GuardContext } from "./guards/GuardContext";
import { getAbilitiesByUser, UserType } from "./guards/userAbilities";
import { useState } from "react";
import { buildAbility } from "./guards/ability";
import { GuardContext } from "./guards/GuardContext";
import { getAbilitiesByUser, UserType } from "./guards/userAbilities";
import { Home } from "./pages/Home";

function App() {
  const [user, setUser] = useState<UserType>('user')
  const userAbilities = getAbilitiesByUser(user)
  const ability = buildAbility(userAbilities)

  return (
    <GuardContext.Provider value={ability}>
    <div className="App">
      <div className="flex justify-center gap-4 mt-3">
        <button className="border p-4" onClick={() => setUser('user')}>User</button>
        <button className="border p-4" onClick={() => setUser('admin')}>Admin</button>
      </div>
      <Home />
    </div>

    </GuardContext.Provider>
  );
}

export default App;
