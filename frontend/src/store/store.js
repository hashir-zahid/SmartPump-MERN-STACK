// Placeholder store setup for global transaction state or UI persistence
const store = {
  currentTransaction: null,
  setTransaction: (txn) => {
    store.currentTransaction = txn;
    sessionStorage.setItem('currentTxn', JSON.stringify(txn));
  },
  getTransaction: () => {
    if (!store.currentTransaction) {
      const saved = sessionStorage.getItem('currentTxn');
      if (saved) store.currentTransaction = JSON.parse(saved);
    }
    return store.currentTransaction;
  },
  clearTransaction: () => {
    store.currentTransaction = null;
    sessionStorage.removeItem('currentTxn');
  }
};

export default store;