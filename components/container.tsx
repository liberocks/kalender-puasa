export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative mx-auto flex h-[100%] min-h-[100vh] max-w-2xl flex-col overflow-x-hidden bg-[#F6F4F0] px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};
