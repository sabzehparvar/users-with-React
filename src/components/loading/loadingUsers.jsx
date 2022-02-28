import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingUsers = () => {
  return Array(6)
    .fill({})
    .map(() => {
      return (
        <div className="col-4 text-center p-5">
          <Skeleton className="mb-5" circle={true} height={100} width={100} />
          <div className="row">
            <div className="col-6">
              <Skeleton className=" mb-2" height={30} width={70} />
            </div>
            <div className="col-6">
              <Skeleton className=" mb-2" height={30} width={70} />
            </div>
          </div>
        </div>
      );
    });
};

export default LoadingUsers;
