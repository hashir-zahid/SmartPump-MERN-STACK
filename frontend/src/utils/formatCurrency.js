const formatCurrency = (amount) => {
  return `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
};

export default formatCurrency;