import { Link } from "react-router-dom";
import { Admin, Tutor, User } from "../../api/link";

const PageInfo = ({ pageName, tutor = false, admin = false }) => {
    return (
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-primary dark:text-gray-900">
          {pageName}
        </h2>
        <nav>
          <ol className="flex items-center">
            <li className="font-bold">
              <Link to={`${tutor ? Tutor : admin ? Admin : User} `}>
                Back
              </Link>
            </li>
            
          </ol>
        </nav>
      </div>
    );
  };
  export default PageInfo;
  