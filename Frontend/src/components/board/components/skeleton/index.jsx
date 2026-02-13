import Skeleton from "../../../../common/components/Skeleton";

export const ColumnSkeleton = () => {
  return (
    <div className="bg-purple/20 p-4 rounded-lg flex flex-col min-h-100">

      <div className="flex justify-between items-center mb-6 p-4 ">
        <Skeleton width="100px" height="24px" />
        <div className="flex gap-2">
           <Skeleton variant="circle" width="20px" height="20px" />
        </div>
      </div>

      <>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-theme/50 p-4 rounded-lg border border-white/10 shadow-md">
            <Skeleton width="40%" height="12px" className="mb-4 opacity-50" />
            <Skeleton width="90%" height="20px" className="mb-2" />
            <Skeleton width="70%" height="16px" className="mb-6" />

            <div className="flex justify-between items-center mt-4">
               <Skeleton width="60px" height="24px" className="rounded-full" />
               <div className="flex ">
                  <Skeleton variant="circle" width="28px" height="28px" className="border-2 border-theme" />
               </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

const BoardSkeleton = () => {
  return (
    <div className="min-h-screen bg-theme p-5">
      <div className="min-h-auto border-white rounded shadow-lg p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mx-10 lg:mx-15">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </div>
    </div>
  );
};

export default BoardSkeleton;
