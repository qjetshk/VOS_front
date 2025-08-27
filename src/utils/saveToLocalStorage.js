export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (e) {
    console.warn("Не получилось загрузить user из локалстораджа(", e);
    return null;
  }
};

export const saveState = (state) => {
  try {
    if (state) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("user", serializedState);
    } else {
      localStorage.removeItem("user");
    }
  } catch (e) {
    console.warn("Не получилось сохранить user в локалсторадж(", e);
  }
};