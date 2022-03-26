import http from "./httpService";
import { config } from "./authService";

const apiEndpointEntryMv = `${http.apiUrl}/movement_entry`;
const apiEndpointExitMv = `${http.apiUrl}/movement_out`;

export const entryMovement = async (currentPage, filter, season) => {
  switch (filter) {
    case "Tous":
      const { data: tous } = await http.get(
        `${apiEndpointEntryMv}?page=${currentPage}&season=${season}`,
        config()
      );
      return tous;
    case "Comptable":
      const { data: comptable } = await http.get(
        `${apiEndpointEntryMv}/comptable?page=${currentPage}&season=${season}`,
        config()
      );
      return comptable;

    case "Regie":
      const { data: regie } = await http.get(
        `${apiEndpointEntryMv}/regie?page=${currentPage}&season=${season}`,
        config()
      );
      return regie;

    default:
      return null;
  }
};

export const exitMovement = async (currentPage, filter, season) => {
  switch (filter) {
    case "Unités/Clients":
      const { data: uinte_client } = await http.get(
        `${apiEndpointExitMv}?page=${currentPage}&season=${season}`,
        config()
      );
      return uinte_client;
    case "Comptable":
      const { data: comptable } = await http.get(
        `${apiEndpointExitMv}/comptable?page=${currentPage}&season=${season}`,
        config()
      );
      return comptable;

    case "Regie":
      const { data: regie } = await http.get(
        `${apiEndpointExitMv}/regie?page=${currentPage}&season=${season}`,
        config()
      );
      return regie;

    default:
      return null;
  }
};
