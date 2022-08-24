function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  const { id } = account;
  for (let book of books) {
    const { borrows } = book;
    borrows.forEach((borrow) => {
      if (borrow.id === id) totalBorrows++;
      return totalBorrows;
    } )
  }
  return totalBorrows;
}

// helper function to filter currently checked out books for a given account
function accountCheckOut(account, books){
  // const acctId= account.id;
  return books.filter((book) => book.borrows.some(borrow => !borrow.returned && borrow.id === account.id));
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = accountCheckOut(account, books); // determine books checked out
  booksPossessed.map(book => book['author'] = authors.find(author => author.id === book.authorId)); // nested array methods
  return booksPossessed } // maps book['author'] to each book, value is person where ids match


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
