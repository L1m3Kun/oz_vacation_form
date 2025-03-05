const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
