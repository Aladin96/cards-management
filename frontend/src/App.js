import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/dashboard/home/Home";
import AddCards from "./components/dashboard/cards/AddCards";
import DeliverCards from "./components/dashboard/cards/DeliverCards";
import BrowseCards from "./components/dashboard/cards/BrowseCards";
import RestoreCards from "./components/dashboard/cards/RestoreCards";
import EntryMovements from "./components/dashboard/movements/EntryMovements";
import ExitMovements from "./components/dashboard/movements/ExitMovements";
import AddUnits from "./components/dashboard/units/AddUnits";
import BrowseUnits from "./components/dashboard/units/BrowseUnits";
import AddClients from "./components/dashboard/clients/AddClients";
import AddDisciplines from "./components/dashboard/disciplines/AddDisciplines";
import BrowseDisciplines from "./components/dashboard/disciplines/BrowseDisciplines";

import AddSeasons from "./components/dashboard/options/AddSeasons";
import AddColors from "./components/dashboard/options/AddColors";

import Login from "./components/login/Login";
import PrivateRoute from "./components/routes/PrivateRoute";
import BrowseClients from "./components/dashboard/clients/BrowseClients";

// Permission
import { ROLE } from "./permission/roleEnum";
import Statistics from "./components/dashboard/statistics/Statistics";
import DeleteCards from "./components/dashboard/cards/DeleteCards";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />

        <PrivateRoute
          path="/home"
          exact
          component={Home}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_cards"
          exact
          component={AddCards}
          permission={[ROLE.COMPTABLE]}
        />
        <PrivateRoute
          path="/deliver_cards"
          exact
          component={DeliverCards}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/browse_cards/page/:numPage"
          exact
          component={BrowseCards}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/browse_cards"
          exact
          component={BrowseCards}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/restore_cards"
          exact
          component={RestoreCards}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/delete_cards"
          exact
          component={DeleteCards}
          permission={[ROLE.COMPTABLE]}
        />

        <PrivateRoute
          path="/entry_movements/page/:numPage"
          exact
          component={EntryMovements}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/entry_movements"
          exact
          component={EntryMovements}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/exit_movements/page/:numPage"
          exact
          component={ExitMovements}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/exit_movements"
          exact
          component={ExitMovements}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_units"
          exact
          component={AddUnits}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/browse_units/page/:numPage"
          exact
          component={BrowseUnits}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/browse_units"
          exact
          component={BrowseUnits}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_client"
          exact
          component={AddClients}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/browse_clients/page/:numPage"
          exact
          component={BrowseClients}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/browse_clients"
          exact
          component={BrowseClients}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/browse_disciplines/page/:numPage"
          exact
          component={BrowseDisciplines}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
        <PrivateRoute
          path="/browse_disciplines"
          exact
          component={BrowseDisciplines}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_discipline"
          exact
          component={AddDisciplines}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_season"
          exact
          component={AddSeasons}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/add_colors"
          exact
          component={AddColors}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />

        <PrivateRoute
          path="/statistics"
          exact
          component={Statistics}
          permission={[ROLE.COMPTABLE, ROLE.REGIE]}
        />
      </Switch>
    </div>
  );
}

export default App;
