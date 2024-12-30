import { Eye, ShoppingCart, Users, User } from "lucide-react";

const CardOne = ({ title, count, percentage, type, tutor = false }) => {
  const getIcon = () => {
    switch (type) {
      case "eye":
        return <Eye className="h-6 w-6 text-blue-950" />;
      case "purchase":
        return <ShoppingCart className="h-6 w-6 text-blue-950" />;
      case "users":
        return <Users className="h-6 w-6 text-blue-950" />;
      case "tutor":
        return <User className="h-6 w-6 text-blue-950" />;
      default:
        return <Eye className="h-6 w-6 text-blue-950" />;
    }
  };
    return (
      <div className="rounded-lg border border-gray-300 bg-gradient-to-r from-indigo-600 to-blue-600 p-6 shadow-md">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-lg">
        {getIcon()}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-white">{count}</h4>
          <span className="text-xl font-semibold text-gray-100">{title}</span>
        </div>
        <span
          className={`text-sm font-medium ${
            percentage > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
        </span>
      </div>
    </div>
  );
};
  
  export default CardOne;