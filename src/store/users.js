export const usersStore = {
  initialUsers: [],
  users: [],
  subscribers: [],

  setInitialUsers(users) {
    this.initialUsers = users;
  },

  setUsers(setUsersFunction) {
    const modifiedUsers = setUsersFunction(this.users, this.initialUsers);
    this.users = modifiedUsers;
    this.notify();
  },

  getUser(userId) {
    return this.users.find((user) => user.id === userId) ?? null;
  },

  updateUser(userId, userData) {
    const updatedUsers = this.users.map((user) => {
      if (user.id === userId) {
        return userData;
      }

      return user;
    });

    this.users = updatedUsers;
    this.notify();
  },

  deactivateUser(userId) {
    const updatedUsers = this.users.map((user) => {
      if (user.id.toString() === userId.toString()) {
        return { ...user, active: false };
      }

      return user;
    });

    this.users = updatedUsers;
    this.notify();
  },

  subscribe(listener) {
    this.subscribers.push(listener);
  },

  notify() {
    this.subscribers?.forEach((element) => {
      element(this.users);
    });
  },
};
