function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // for each book, check if every borrow.returned === true
  // if true, push book to returned array. else, push to a borrowed array
  // construct new array with [ borrowed, returned ]
  let borrowed = books.reduce((inUse, book) => {
    if (book.borrows.some((borrow)=>borrow.returned === false)) {
      inUse.push(book);
    }
  return inUse;}, [])
  let returned = books.reduce((inStock, book) => {
    if (book.borrows.every((borrow)=>borrow.returned === true)) {
      inStock.push(book);
    }
  return inStock;}, [])
  const partitioned = [
    borrowed,
    returned
  ];
  return partitioned;
}

// return an array with accounts and info
function getBorrowersForBook(book, accounts) {
  const idNumbers = [];
  book.borrows.forEach((borrow)=> {
    idNumbers.push(borrow.id); //.filter() instead
  });
  let borrowers = accounts.filter((account)=> idNumbers.includes(account.id));

  const returnedOrNot = borrowers.reduce((result, borrower)=>{
    if (book.borrows[0].id === borrower.id) {
      if (book.borrows.some((borrow)=>borrow.returned === false)){
        borrower.returned = false;
        result.push(borrower);
      } else {
      borrower.returned = true;
      result.push(borrower);
    }} else {
      borrower.returned = true;
      result.push(borrower);
    }
  return result}, []);
  return returnedOrNot.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
