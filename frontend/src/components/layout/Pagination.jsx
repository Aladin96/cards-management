import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ path, currentPage, pages, changePage, range }) => {
  let middlePagination;

  if (pages <= range) {
    middlePagination = [...Array(pages)].map((_, index) => (
      <li
        key={index + 1}
        className={
          currentPage === index + 1 ? "page-item disabled" : "page-item"
        }
        onClick={() => changePage(index + 1)}
      >
        <Link className="page-link" to={`/${path}/page/${index + 1}`}>
          {index + 1}
        </Link>
      </li>
    ));
  } else {
    const startValue = Math.floor((currentPage - 1) / range) * range;

    middlePagination = (
      <>
        {[...Array(range)].map((_, index) => (
          <li
            key={index + 1}
            className={
              currentPage === startValue + index + 1
                ? "page-item disabled"
                : "page-item"
            }
            onClick={() => changePage(startValue + index + 1)}
          >
            <Link
              className="page-link"
              to={`/${path}/page/${startValue + index + 1}`}
            >
              {startValue + index + 1}
            </Link>
          </li>
        ))}
        <li className="page-item disabled"></li>
        <li className="page-item" onClick={() => changePage(pages)}>
          <Link className="page-link" to={`/${path}/page/${pages}`}>
            {pages}
          </Link>
        </li>
      </>
    );

    if (currentPage > range) {
      if (pages - currentPage >= range) {
        middlePagination = (
          <>
            <li className="page-item" onClick={() => changePage(1)}>
              <Link className="page-link" to={`/${path}/page/1`}>
                1
              </Link>
            </li>

            <li className="page-item disabled"></li>

            <li className="page-item" onClick={() => changePage(startValue)}>
              <Link className="page-link" to={`/${path}/page/${startValue}`}>
                {startValue}
              </Link>
            </li>

            {[...Array(range)].map((_, index) => (
              <li
                key={index + 1}
                className={
                  currentPage === startValue + index + 1
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => changePage(startValue + index + 1)}
              >
                <Link
                  className="page-link"
                  to={`/${path}/page/${startValue + index + 1}`}
                >
                  {startValue + index + 1}
                </Link>
              </li>
            ))}

            <li className="page-item disabled"></li>

            <li className="page-item" onClick={() => changePage(pages)}>
              <Link className="page-link" to={`/${path}/page/${pages}`}>
                {pages}
              </Link>
            </li>
          </>
        );
      } else {
        let amountLeft = pages - currentPage + range;
        middlePagination = (
          <>
            <li className="page-item" onClick={() => changePage(1)}>
              <Link className="page-link" to={`/${path}/page/1`}>
                1
              </Link>
            </li>

            <li className="page-item disabled"></li>

            <li className="page-item" onClick={() => changePage(startValue)}>
              <Link className="page-link" to={`/${path}/page/${startValue}`}>
                {startValue}
              </Link>
            </li>

            {[...Array(amountLeft)].map((_, index) => (
              <li
                key={index + 1}
                className={
                  currentPage === startValue + index + 1
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => changePage(startValue + index + 1)}
                style={
                  pages < startValue + index + 1 ? { display: "none" } : null
                }
              >
                <Link
                  className="page-link"
                  to={`/${path}/page/${startValue + index + 1}`}
                >
                  {startValue + index + 1}
                </Link>
              </li>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <nav aria-label="..." className="">
        <ul className="pagination pagination-md">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
            onClick={() =>
              currentPage === 1 ? false : changePage(currentPage - 1)
            }
          >
            <Link className="page-link" to={`/${path}/page/${currentPage - 1}`}>
              Précédent
            </Link>
          </li>

          {middlePagination}

          <li
            className={
              currentPage === pages ? "page-item disabled" : "page-item"
            }
            onClick={() =>
              currentPage === pages ? false : changePage(currentPage + 1)
            }
          >
            <Link className="page-link" to={`/${path}/page/${currentPage + 1}`}>
              Suivant
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Pagination;
