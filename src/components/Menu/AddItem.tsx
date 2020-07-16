import React, { ReactElement, useState } from "react";
import { ItemCallback } from "../../shared/shared";
import { Menu, Category } from "../../models/menu-model";

interface Props {
  menu: Menu;
  onSubmitItem: ItemCallback;
}

export default function AddItem({ menu, onSubmitItem }: Props): ReactElement {
  const [_id, setId] = useState(menu?._id);
  const [category, setCategory] = useState(menu.category[0]+"");
  const [imageUrl, setImageUrl] = useState(menu?.imageUrl);
  const [foodName, setFoodName] = useState(menu?.foodName);
  const [description, setDescription] = useState(menu?.description);
  const [allergens, setAllergens] = useState(menu?.allergens);
  const [quantity, setQuantity] = useState(menu?.quantity);
  const [price, setPrice] = useState(menu?.price);

  const handleCategories = () => {
    if (category === "0") {
      return [Category.WEEKLYSPECIALS];
    } else if (category === "1") {
      return [Category.APPETIZERS];
    } else if (category === "2") {
      return [Category.MAINDISHES];
    } else if (category === "3") {
      return [Category.DESSERTS];
    } else if (category === "4") {
      return [Category.BEVERAGES];
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = new Menu(
      _id,
      handleCategories(),
      imageUrl,
      foodName,
      description,
      allergens,
      quantity,
      price
    );
    onSubmitItem(result);
  };
  return (
    <div className="containerCenter bg-white">
      <p className="containerHeader">Add Menu Item</p>
      <form onSubmit={handleSubmit}>
        {/* <label className="categoryBox">
          Category:
          <select name="category">
            <option onClick={(e) => setCategory("0")}>Weekly Specials</option>
            <option onClick={(e) => setCategory("1")}>Appetizers</option>
            <option onClick={(e) => setCategory("2")}>Main Dishes</option>
            <option onClick={(e) => setCategory("3")}>Desserts</option>
            <option onClick={(e) => setCategory("4")}>Beverages</option>
          </select>
        </label> */}

<div className="radio">
        <label>Roles:</label>
        <div className="radiobox">
          <label>
            <input name="role" type="radio" value="0" defaultChecked={menu.category[0] === 0} onClick={(e) => setCategory("0")} />
            Weekly Specials
          </label>
          <label>
            <input name="role" type="radio" value="1" defaultChecked={menu.category[0] === 1} onClick={(e) => setCategory("1")}/>
            Appetizers
          </label>
          <label>
            <input name="role" type="radio" value="2" defaultChecked={menu.category[0] === 2} onClick={(e) => setCategory("2")}/>
            Main Dishes
          </label>
          <label>
            <input name="role" type="radio" value="3" defaultChecked={menu.category[0] === 2} onClick={(e) => setCategory("3")}/>
            Desserts
          </label>
          <label>
            <input name="role" type="radio" value="4" defaultChecked={menu.category[0] === 2} onClick={(e) => setCategory("4")}/>
            Beverages
          </label>
        </div>
        </div>

        <label>
          ImageUrl:
          <input
            value={imageUrl}
            type="url"
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Food Name:
          <input
            value={foodName}
            type="text"
            name="foodName"
            onChange={(e) => setFoodName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            value={description}
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Allergens:
          <input
            value={allergens}
            type="text"
            name="address"
            onChange={(e) => setAllergens(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            value={quantity}
            type="text"
            name="address"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            value={price}
            type="text"
            name="address"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
