window.onload = () => {
  fetchData(10);
};

var data;
var categories = [];
var categoriesFetched = false;

document.getElementById("rowsToShow").addEventListener("change", (e) => {
  fetchData(e.target.value);
});

const fetchData = async (rows) => {
  data = await fetch(
    `http://filltext.com/?rows=${rows}&fname={firstName}&lname={lastName}&category=["category1","category2","category3"]&pretty=true`
  ).then((response) => response.json());

  renderData(data);
  !categoriesFetched && renderFilters();
};

const renderFilters = () => {
  let filtersWrapper = document.getElementById("filtersWrapper");

  categories.forEach((cat) => {
    filtersWrapper.innerHTML =
      filtersWrapper.innerHTML +
      ` <div class="categoryContainer text-white" onclick="filterCat('${cat}')">
                <p class="m-0 py-1 px-3">${cat}</p>
            </div>
        `;
  });
  categoriesFetched = true;
};

const renderData = (data) => {
  let wrapper = document.getElementById("wrapper");

  wrapper.innerHTML = "";

  data.forEach((el) => {
    !categories.includes(el.category) && categories.push(el.category);

    wrapper.innerHTML =
      wrapper.innerHTML +
      `
            <div class="card p-4 d-flex flex-row align-items-center mb-3">
                <div class="circle toCenter">
                    <span class="text-white">${
                      el.fname.charAt(0) + el.lname.charAt(0)
                    }</span>
                </div>
                <h2 class="username mx-4">${el.fname + " " + el.lname}</h2>
                <div class="categoryContainer text-white">
                    <p class="m-0 py-1 px-3">${el.category}</p>
                </div>
            </div>
          `;
  });
};

const filterCat = (val) => {
  const filteredData = data.filter((item) => item.category === val);
  //   data = filteredData;
  renderData(filteredData);
};
