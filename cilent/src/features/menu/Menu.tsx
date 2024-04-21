import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { IPizza } from "../../types/types";

function Menu() {
  const menu = useLoaderData() as IPizza[];

    return (
      <ul>
        {menu.map((pizza: IPizza) => <MenuItem pizza={pizza} key={pizza.id} />)}
      </ul>
    );
  }
  

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;