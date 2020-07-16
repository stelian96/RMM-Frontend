import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import { Switch, Route, useHistory } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import { User } from "./models/user-model";
import UserService from "./service/user-service";
import MenuService from "./service/menu-service";
import { UserCallback, ItemCallback, OrderCallback } from "./shared/shared";
import SignIn from "./components/SignIn/SignIn";
import { Credentials, LoggedUser } from "./models/auth";
import authService from "./service/auth-service";
import { getErrorMessage } from "./service/service-utils";
import UserManage from "./components/UserManage/UserManage";
import EditUser from "./components/EditUser/EditUser";
import { Menu, Category } from "./models/menu-model";
import MenuContainer from "./components/Menu/MenuContainer";
import AddItem from "./components/Menu/AddItem";
import Cart from "./components/Cart/Cart";
import orderService from "./service/order-service";
import { OrderInfo } from "./models/orderinfo-model";
import Profile from "./components/Profile/Profile";
import OrdersList from "./components/OrdersList/OrdersList";

function App() {
  //  -------------- USERS ----------
  const [users, setUsers] = useState<User[]>([]);
  const [editedUser, setEditedUser] = useState<User>(
    new User("", "", "", "", "", "", "")
  );
  const history = useHistory();

  useEffect(() => {
    UserService.getAllUsers().then((users) => setUsers(users));
  }, []);

  const handleEditUser: UserCallback = (user) => {
    setEditedUser(user);
    history.push(`/editUser/${user._id}`);
  };

  const handleDeleteUser: UserCallback = (user) => {
    UserService.deleteUser(user._id, token).then((deleted) => {
      setUsers(users.filter((u) => u._id !== deleted._id));
      console.log(users);
    });
  };

  const handleSubmitUser: UserCallback = (user) => {
    if (user._id) {
      //Edit
      UserService.updateUser(user, token).then((edited) => {
        setUsers(users.map((u) => (u._id === edited._id ? user : u)));
      });
      history.push(`/usermanage`);
    } else {
      //Create
      UserService.createNewUser(user).then((created) => {
        setUsers(users.concat(created));
      });
      const username = user.username;
      const password = user.password;
      const credentials: Credentials = { username, password };
      handleLogin(credentials);
      history.push("/");
    }
  };

  // Should not be from User Service
  const handleChangeUserInfo: UserCallback = (user) => {
    UserService.updateUser(user, token).then((edited) => {
      setUsers(users.map((u) => (u._id === edited._id ? user : u)));
    });
    history.push(`/profile`);
  };

  // -----Login and Logout-----------
  const userData = () => {
    let data = localStorage.getItem("loggeduser");
    if (data !== null) {
      const objectData: LoggedUser = JSON.parse(data);
      return objectData;
      console.log(objectData);
    } else {
      return undefined;
    }
  };
  const [loggedUser, setLoggedUser] = useState<undefined | LoggedUser>(
    userData()
  );
  const [token, setToken] = useState<string>("");

  React.useEffect(() => {
    if (loggedUser !== undefined) {
      localStorage.setItem("loggeduser", JSON.stringify(loggedUser));
    }
  }, [loggedUser]);

  const handleLogin = async (credentials: Credentials) => {
    try {
      const loggedUser = await authService.login(credentials);
      setToken(loggedUser.token);
      setLoggedUser(loggedUser);
      history.push("/");
    } catch (err) {
      getErrorMessage(err);
    }
  };

  const handleSignOut = () => {
    setLoggedUser(undefined);
    localStorage.clear();
  };

  // --------- Menu ----------
  const [menu, setMenu] = useState<Menu[]>([]);
  const [editedItem, setEditedItem] = useState<Menu>(
    new Menu("", [Category.WEEKLYSPECIALS], "", "", "", "", "", "")
  );

  useEffect(() => {
    MenuService.getAllItems().then((menu) => setMenu(menu));
  }, []);

  const handleEditItem: ItemCallback = (item) => {
    setEditedItem(item);
    history.push(`/addItem/${item._id}`);
  };

  const handleDeleteItem: ItemCallback = (item) => {
    MenuService.deleteItem(item._id).then((deleted) => {
      setMenu(menu.filter((i) => i._id !== deleted._id));
    });
  };

  const handleSubmitItem: ItemCallback = (item) => {
    if (item._id) {
      //Edit
      MenuService.updateItem(item).then((edited) => {
        setMenu(menu.map((i) => (i._id === edited._id ? item : i)));
      });
      setEditedItem(
        new Menu("", [Category.WEEKLYSPECIALS], "", "", "", "", "", "")
      );
      history.push(`/menu`);
    } else {
      //Create
      MenuService.createNewItem(item).then((created) => {
        setMenu(menu.concat(created));
      });
      history.push("/menu");
    }
  };

  // ---------- Cart -------------
  const [orderList, setOrderList] = useState<Menu[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0.00");

  const handleBuyItem: ItemCallback = (item) => {
    if (loggedUser !== undefined) {
      setOrderList((curr) => [...curr, item]);
      setTotalPrice(
        (Number(totalPrice) + Number(item.price)).toFixed(2).toString()
      );
    } else {
      history.push("/login");
    }
  };

  const handleDeleteOrder: ItemCallback = (item) => {
    const outputArray = [];
    let foundCount = 0;
    const searchValue = item._id;
    console.log(searchValue);

    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i]._id === searchValue && foundCount === 0) {
        foundCount++;
      } else {
        outputArray.push(orderList[i]);
      }
    }
    setTotalPrice(
      (Number(totalPrice) - Number(item.price)).toFixed(2).toString()
    );
    setOrderList(outputArray);
  };

  // -------------- All Orders -----------------
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  useEffect(() => {
    orderService.getAllOrders().then((orders) => setOrders(orders));
  }, []);

  const handleOrderSubmit: OrderCallback = (order) => {
    orderService.createNewOrder(order).then((created) => {
      setOrders(orders.concat(created));
    });
    history.push("/menu");
  };
  const handleOrderChange: OrderCallback = (order) => {
    orderService.updateOrder(order).then((edited) => {
      setOrders(orders.map((o) => (o._id === edited._id ? order : o)));
    });
  };

  return (
    <div className="App">
      <Nav loggedUser={loggedUser} onSignOut={handleSignOut} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/menu">
          <MenuContainer
            menu={menu}
            loggedUser={loggedUser}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
            onBuyItem={handleBuyItem}
          />
        </Route>
        <Route path="/profile">
          <Profile
            loggedUser={loggedUser}
            onChangeUserInfo={handleChangeUserInfo}
          />
        </Route>
        <Route path="/addItem">
          {loggedUser?.user.roles[0] === 1 ||
          loggedUser?.user.roles[0] === 2 ? (
            <AddItem menu={editedItem} onSubmitItem={handleSubmitItem} />
          ) : (
            () => history.push("/")
          )}
        </Route>
        <Route path="/orders">
          {loggedUser?.user.roles[0] === 1 ||
          loggedUser?.user.roles[0] === 2 ? (
            <OrdersList orders={orders} onStatusChange={handleOrderChange} />
          ) : (
            () => history.push("/")
          )}
        </Route>
        <Route path="/login">
          <SignIn SubmitLogin={handleLogin} />
        </Route>
        <Route path="/register">
          <Register onSubmitUser={handleSubmitUser} />
        </Route>
        <Route path="/cart">
          <Cart
            loggedUser={loggedUser}
            orderList={orderList}
            onDeleteOrder={handleDeleteOrder}
            totalPrice={totalPrice}
            onSubmitOrder={handleOrderSubmit}
          />
        </Route>
        <Route path="/usermanage">
          {loggedUser?.user.roles[0] === 2 ? (
            <UserManage
              users={users}
              onDeleteUser={handleDeleteUser}
              onEditUser={handleEditUser}
            />
          ) : (
            () => history.push("/")
          )}
        </Route>
        <Route path="/editUser">
          {loggedUser?.user.roles[0] === 2 ? (
            <EditUser user={editedUser} onSubmitUser={handleSubmitUser} />
          ) : (
            () => history.push("/")
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
