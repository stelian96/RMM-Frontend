import React, { ReactElement, useState } from "react";
import { ItemCallback } from "../../shared/shared";
import { Menu, Category } from "../../models/menu-model";
import { useForm } from "react-hook-form";

interface Props {
  menu: Menu;
  onSubmitItem: ItemCallback;
}

export default function AddItem({ menu, onSubmitItem }: Props): ReactElement {
  const [category, setCategory] = useState(menu.category[0] + "");
  const { register, handleSubmit, errors } = useForm<Menu>();

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
    } else {
      return [Category.WEEKLYSPECIALS];
    }
  };
  const onSubmit = (data: Menu) => {
    data._id = menu._id?menu._id:"";
    data.category = handleCategories();
    onSubmitItem(data);
  };
  return (
    <div className="containerCenter">
      <p className="containerHeader">Add Menu Item</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <input
                name="category"
                type="radio"
                value="0"
                defaultChecked={menu.category[0] === 0}
                onClick={(e) => setCategory("0")}
              />
              Weekly Specials
            </label>
            <label>
              <input
                name="category"
                type="radio"
                value="1"
                defaultChecked={menu.category[0] === 1}
                onClick={(e) => setCategory("1")}
              />
              Appetizers
            </label>
            <label>
              <input
                name="category"
                type="radio"
                value="2"
                defaultChecked={menu.category[0] === 2}
                onClick={(e) => setCategory("2")}
              />
              Main Dishes
            </label>
            <label>
              <input
                name="category"
                type="radio"
                value="3"
                defaultChecked={menu.category[0] === 2}
                onClick={(e) => setCategory("3")}
              />
              Desserts
            </label>
            <label>
              <input
                name="category"
                type="radio"
                value="4"
                defaultChecked={menu.category[0] === 2}
                onClick={(e) => setCategory("4")}
              />
              Beverages
            </label>
          </div>
        </div>

        <label>
          ImageUrl:
          <input
            defaultValue={menu?.imageUrl}
            type="url"
            name="imageUrl"
            ref={register({ required: true })}
          />
          {errors.imageUrl && errors.imageUrl.type === "required" && (
            <div className="formError">Image Url is required.</div>
          )}
        </label>
        <label>
          Food Name:
          <input
            defaultValue={menu?.foodName}
            type="text"
            name="foodName"
            ref={register({ required: true, minLength: 5 })}
          />
          {errors.foodName && errors.foodName.type === "required" && (
            <div className="formError">Food name is required.</div>
          )}
          {errors.foodName && errors.foodName.type === "minLength" && (
            <div className="formError">Food name required lenght is min 6.</div>
          )}
        </label>

        <div className="textArea">
          <label>Description: </label>
          <textarea
            defaultValue={menu?.description}
            name="description"
            ref={register({ required: true, maxLength: 80 })}
          />
        </div>
        {errors.description && errors.description.type === "required" && (
          <div className="formError">Your must enter Address for delivery.</div>
        )}
        {errors.description && errors.description.type === "maxLength" && (
          <div className="formError">Should be less than 80 characters.</div>
        )}
        <label>
          Allergens:
          <input
            defaultValue={menu?.allergens}
            type="text"
            name="allergens"
            ref={register({ required: false, maxLength: 30 })}
          />
          {errors.allergens && errors.allergens.type === "maxLength" && (
            <div className="formError">Max lenth is 30.</div>
          )}
        </label>
        <label>
          Quantity:
          <input
            defaultValue={menu?.quantity}
            type="text"
            name="quantity"
            ref={register({ required: true, maxLength: 5 })}
          />
          {errors.quantity && errors.quantity.type === "required" && (
            <div className="formError">Quanity is required.</div>
          )}
          {errors.quantity && errors.quantity.type === "maxLength" && (
            <div className="formError">Max lenght is 5.</div>
          )}
        </label>
        <label>
          Price:
          <input
            defaultValue={menu?.price}
            type="text"
            name="price"
            ref={register({ required: true })}
          />
          {errors.price && errors.price.type === "required" && (
            <div className="formError">Price is required.</div>
          )}
        </label>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
