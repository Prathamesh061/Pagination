const pageNumbers = document.querySelector(".pageNumbers");
const paginationList = document.getElementById("paginationList");
const listItems = paginationList.querySelectorAll("li");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const contentLimit = 5;
const pageCount = Math.ceil(listItems.length / contentLimit);
let currentPage = 1;

const displayPageNumbers = (index) => {
  const pageNumber = document.createElement("a");
  pageNumber.innerText = index;
  pageNumber.setAttribute("href", "#");
  pageNumber.setAttribute("index", index);
  pageNumbers.appendChild(pageNumber);
};

const getPageNumbers = () => {
  if (pageCount <= 7) {
    // If there are 7 or fewer pages, display all page numbers without ellipsis.
    for (let i = 1; i <= pageCount; i++) {
      displayPageNumbers(i);
    }
  } else {
    // If there are more than 7 pages, display ellipsis at the appropriate locations.
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        displayPageNumbers(i);
      }
      pageNumbers.appendChild(document.createTextNode("..."));
      displayPageNumbers(pageCount);
    } else if (currentPage >= pageCount - 3) {
      displayPageNumbers(1);
      pageNumbers.appendChild(document.createTextNode("..."));
      for (let i = pageCount - 4; i <= pageCount; i++) {
        displayPageNumbers(i);
      }
    } else {
      displayPageNumbers(1);
      pageNumbers.appendChild(document.createTextNode("..."));
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        displayPageNumbers(i);
      }
      pageNumbers.appendChild(document.createTextNode("..."));
      displayPageNumbers(pageCount);
    }
  }
};

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const controlButtonsStatus = () => {
  if (currentPage == 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount == currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll("a").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  controlButtonsStatus();

  const prevRange = (pageNum - 1) * contentLimit;
  const currRange = pageNum * contentLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });

  // Clear the existing page numbers and generate new ones with ellipsis.
  pageNumbers.innerHTML = "";
  getPageNumbers();
};

window.addEventListener("load", () => {
  getPageNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  // Use event delegation to handle clicks on page numbers
  pageNumbers.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      const pageIndex = Number(target.getAttribute("index"));
      setCurrentPage(pageIndex);
    }
  });
});
