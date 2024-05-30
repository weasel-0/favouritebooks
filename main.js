import "./style.css";
import "./src/tailwind.css";

const token = import.meta.env.VITE_API_ACCESS_TOKEN;
const endpoint = "https://literal.club/graphql/";
const shelfSlug = "favs-39n1d16";
const booksElement = document.querySelector(".books");
const refreshBtn = document.querySelector("#refreshBooks");

const query = `query getShelfBySlug($shelfSlug: String!) {
  shelf(where: { slug: $shelfSlug }) {
    id
    slug
    title
    description
    profileId
    books {
      id
      slug
      title
      description
      pageCount
      publishedDate
      authors {
        name
      }
    }
  }
}`;

async function fetchBooks() {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        shelfSlug,
      },
    }),
  });

  const { data } = await response.json();
  console.log(data.shelf.books);

  const allBooks = data.shelf.books;
  generate(allBooks);
}

function generate(books) {
  booksElement.innerHTML = "";
  books.forEach((book) => {
    booksElement.innerHTML += `
      <div
          class="grid grid-cols-12 gap-2 font-display font-normal mb-1"
      >
          <div class="col-span-4">${book.title}</div>
          <div class="col-span-3">${book.authors ? book.authors[0].name : ""}</div>
          <div class="col-span-3">${book.publishedDate ? book.publishedDate.substring(0, 4) : ""}</div>
          <div class="col-span-2">${book.pageCount}</div>
      </div>
      <div
          class="border-t border-sky-900 border-opacity-50 leading-none text-base md:text-xl"
      >`;
  });
}
refreshBtn.addEventListener("click", fetchBooks);
fetchBooks();
