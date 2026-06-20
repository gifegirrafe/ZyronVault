const ITEMS_KEY = "zyron_items";
const OLD_ITEMS_KEY = "items";

function getItems() {
  const saved = localStorage.getItem(ITEMS_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  const oldSaved = localStorage.getItem(OLD_ITEMS_KEY);

  if (oldSaved) {
    localStorage.setItem(ITEMS_KEY, oldSaved);
    localStorage.removeItem(OLD_ITEMS_KEY);
    return JSON.parse(oldSaved);
  }

  return [];
}

function saveItems(items) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

function addNewItem(item) {
  const items = getItems();

  const newItem = {
    id: item.id || Date.now(),
    name: item.name,
    game: item.game,
    category: item.category,
    price: Number(item.price),
    stock: Number(item.stock),
    image: item.image || ""
  };

  items.push(newItem);
  saveItems(items);

  return newItem;
}

function deleteItemById(id) {
  const updatedItems = getItems().filter(item => String(item.id) !== String(id));
  saveItems(updatedItems);
}

function clearAllSavedItems() {
  saveItems([]);
}